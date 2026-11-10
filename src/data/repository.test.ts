import { describe, expect, it } from 'vitest';
import { RUN_MANIFEST } from './manifest';
import { createRepository, runRepository } from './repository';
import type { RunManifestEntry } from './types';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

describe('metadata repository', () => {
  it('returns all versioned runs and an exact descriptor without raw arrays', async () => {
    const signal = new AbortController().signal;
    const entries = await runRepository.list({ signal });
    expect(entries).toHaveLength(20);
    const descriptor = await runRepository.getDescriptor('kazakh-sft-005', { signal });
    expect(descriptor).toMatchObject({ id: 'kazakh-sft-005', rowCount: 1_000_000, scenario: 'spike' });
    expect(descriptor).not.toHaveProperty('summaries');
    expect(entries[4]).not.toHaveProperty('raw');
    expect(await runRepository.getDescriptor('unknown', { signal })).toBeNull();
  });

  it('isolates returned facts from mutations by consumers', async () => {
    const signal = new AbortController().signal;
    const first = await runRepository.list({ signal });
    first[0].name = 'modified';
    first[0].quality.metrics.loss.nan = 999;
    first.pop();
    const second = await runRepository.list({ signal });
    expect(second).toEqual(RUN_MANIFEST);
    expect(second).not.toBe(first);
  });

  it('keeps loading under an explicit response gate and supports empty results', async () => {
    const gate = deferred<readonly RunManifestEntry[]>();
    const repository = createRepository(() => gate.promise);
    let resolved = false;
    const promise = repository.list({ signal: new AbortController().signal }).then(value => {
      resolved = true;
      return value;
    });
    await Promise.resolve();
    expect(resolved).toBe(false);
    gate.resolve([]);
    expect(await promise).toEqual([]);
  });

  it('propagates a controlled source error and permits a later retry', async () => {
    const failure = new Error('Fixture metadata unavailable');
    let attempt = 0;
    const repository = createRepository(async () => {
      if (attempt++ === 0) throw failure;
      return RUN_MANIFEST;
    });
    const signal = new AbortController().signal;
    await expect(repository.list({ signal })).rejects.toBe(failure);
    expect(await repository.list({ signal })).toHaveLength(20);
  });

  it('does not invoke a loader for a pre-aborted request', async () => {
    let invoked = false;
    const repository = createRepository(async () => { invoked = true; return []; });
    const abort = new AbortController();
    abort.abort();
    await expect(repository.list({ signal: abort.signal })).rejects.toMatchObject({ name: 'AbortError' });
    expect(invoked).toBe(false);
  });

  it('rejects after abort even if the old loader resolves later, while a new request succeeds', async () => {
    const oldGate = deferred<readonly RunManifestEntry[]>();
    const newGate = deferred<readonly RunManifestEntry[]>();
    let call = 0;
    const repository = createRepository(() => call++ === 0 ? oldGate.promise : newGate.promise);
    const abort = new AbortController();
    const old = repository.list({ signal: abort.signal });
    const rejected = expect(old).rejects.toMatchObject({ name: 'AbortError' });
    await Promise.resolve();
    abort.abort();
    await rejected;
    const current = repository.list({ signal: new AbortController().signal });
    await Promise.resolve();
    newGate.resolve([RUN_MANIFEST[4]]);
    expect((await current).map(run => run.id)).toEqual(['kazakh-sft-005']);
    oldGate.resolve([RUN_MANIFEST[0]]);
    await Promise.resolve();
    await Promise.resolve();
    expect((await runRepository.list({ signal: new AbortController().signal }))).toHaveLength(20);
  });
});
