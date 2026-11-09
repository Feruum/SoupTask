import type { Metric, RunDescriptor, Scenario } from './types.ts';
export const METRICS: readonly Metric[] = ['loss', 'lr', 'grad_norm'];
export const GENERATOR_VERSION = 'soup-1.0.0';
export function revisionForRun(run: Pick<RunDescriptor, 'generatorVersion' | 'scenario' | 'scenarioVersion' | 'seed' | 'rowCount' | 'expectedCadence'>): string {
  return `${run.generatorVersion}:${run.scenario}@${run.scenarioVersion}:seed=${run.seed}:n=${run.rowCount}:cadence=${run.expectedCadence ?? 'unspecified'}`;
}
const scenarios: Scenario[] = ['clean', 'slow', 'noisy', 'divergence', 'spike', 'missing', 'pos-inf', 'neg-inf', 'duplicates', 'conflicts', 'unsorted', 'gaps', 'zero', 'plateau', 'small-lr', 'grad-spike', 'mixed', 'sparse', 'singleton', 'stale'];
export const RUNS: readonly RunDescriptor[] = scenarios.map((scenario, i) => {
  const descriptor: Omit<RunDescriptor, 'revision'> = {
    id: `kazakh-sft-${String(i + 1).padStart(3, '0')}`,
    name: `kazakh-sft-${String(i + 1).padStart(3, '0')}`,
    model: i % 3 === 0 ? 'Qwen2.5-1.5B' : 'Qwen2.5-3B',
    method: i % 4 === 0 ? 'DPO' : 'SFT',
    scenario,
    seed: i === 4 ? 42 : 1000 + i,
    rowCount: i === 4 ? 1_000_000 : i === 18 ? 1 : 8192,
    generatorVersion: GENERATOR_VERSION,
    scenarioVersion: '1',
    status: [0, 4, 5, 9].includes(i) ? 'Running' : [3, 16].includes(i) ? 'Failed' : [17, 19].includes(i) ? 'Cancelled' : 'Completed',
    sourceUpdatedAt: i === 19 ? '2026-11-03T00:00:00Z' : '2026-11-09T12:00:00Z',
    ...(scenario === 'sparse' ? {} : {
      expectedCadence: 1
    })
  };
  return {
    ...descriptor,
    revision: revisionForRun(descriptor)
  };
});
