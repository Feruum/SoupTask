import { it, expect } from 'vitest';
import { RUNS, revisionForRun } from './catalog';
import { RUN_MANIFEST } from './manifest';
import { NORMALIZER_VERSION } from '../core/engine';
it('revision changes for each generation input and includes cadence absence', () => {
  const run = RUNS[4];
  expect(revisionForRun(run)).toBe(run.revision);
  for (const change of [{
    seed: run.seed + 1
  }, {
    rowCount: run.rowCount - 1
  }, {
    scenarioVersion: '2'
  }, {
    generatorVersion: 'soup-2.0.0'
  }, {
    expectedCadence: 2
  }, {
    expectedCadence: undefined
  }, {
    scenario: 'zero' as const
  }]) expect(revisionForRun({
    ...run,
    ...change
  })).not.toBe(run.revision);
  expect(new Set(RUNS.map(entry => entry.revision)).size).toBe(20);
});
it('manifest declares the actual normalizer policy version', () => {
  expect(RUN_MANIFEST.every(run => run.normalizerVersion === NORMALIZER_VERSION)).toBe(true);
});
