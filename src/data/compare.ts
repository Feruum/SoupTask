import type { Metric, RawColumns } from './types';
import { toPlotData } from './pipeline';
export type ComparisonData = [number[], ...(number | null | undefined)[][]];
/** Align only small render views; undefined is an alignment slot, null is a real break. */
export function alignDemoRuns(runs: RawColumns[], metric: Metric): ComparisonData {
  const views = runs.map(run => toPlotData(run, metric));
  const steps = [...new Set(views.flatMap(view => view[0]))].sort((a, b) => a - b);
  return [steps, ...views.map(([x, y]) => {
    const values = new Map(x.map((step, j) => [step, y[j]]));
    return steps.map(step => values.has(step) ? values.get(step) : undefined);
  })];
}
