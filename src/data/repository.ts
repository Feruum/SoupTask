import { RUN_MANIFEST } from './manifest';
import type { RunDescriptor, RunManifestEntry } from './types';

export interface RunRepository {
  list(options: { signal: AbortSignal }): Promise<RunManifestEntry[]>;
  getDescriptor(id: string, options: { signal: AbortSignal }): Promise<RunDescriptor | null>;
}

export type ManifestLoader = (signal: AbortSignal) => Promise<readonly RunManifestEntry[]>;

function abortError(): DOMException {
  return new DOMException('The manifest request was aborted.', 'AbortError');
}

/** Metadata only. Cancellation remains correct when an injected loader ignores it. */
export function createRepository(
  loader: ManifestLoader = async () => RUN_MANIFEST,
): RunRepository {
  const read = (signal: AbortSignal): Promise<RunManifestEntry[]> => {
    if (signal.aborted) return Promise.reject(abortError());
    return new Promise((resolve, reject) => {
      let settled = false;
      const cleanup = () => signal.removeEventListener('abort', onAbort);
      const onAbort = () => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(abortError());
      };
      signal.addEventListener('abort', onAbort, { once: true });
      Promise.resolve().then(() => {
        if (signal.aborted) throw abortError();
        return loader(signal);
      }).then(entries => {
        if (settled) return;
        let snapshot: RunManifestEntry[];
        try {
          snapshot = structuredClone([...entries]);
        } catch (error) {
          settled = true;
          cleanup();
          reject(error);
          return;
        }
        settled = true;
        cleanup();
        // A consumer cannot mutate the shared source manifest or another request.
        resolve(snapshot);
      }, error => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(error);
      });
    });
  };

  return {
    list: ({ signal }) => read(signal),
    async getDescriptor(id, { signal }) {
      const entry = (await read(signal)).find(run => run.id === id);
      if (!entry) return null;
      return {
        id: entry.id,
        name: entry.name,
        model: entry.model,
        method: entry.method,
        scenario: entry.scenario,
        seed: entry.seed,
        rowCount: entry.rowCount,
        revision: entry.revision,
        generatorVersion: entry.generatorVersion,
        scenarioVersion: entry.scenarioVersion,
        status: entry.status,
        sourceUpdatedAt: entry.sourceUpdatedAt,
        ...(entry.expectedCadence === undefined ? {} : { expectedCadence: entry.expectedCadence }),
      };
    },
  };
}

export const runRepository = createRepository();
