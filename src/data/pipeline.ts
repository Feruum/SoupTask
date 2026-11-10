import { normalize, sampleView } from '../core/engine';
import type { Metric, MetricSummary, PlotData, RawColumns } from './types';
export function summarize(raw: RawColumns, metric: Metric): MetricSummary {
  return normalize(raw).summaries[metric];
}
/** Compatibility for small fixture callers. Production charts consume the complete RenderView (overlays and gaps included). */
export function toPlotData(raw: RawColumns, metric: Metric): PlotData {
  const n = normalize(raw);
  if (!n.domain) return [[], []];
  const view = sampleView(n, metric, n.domain.min, n.domain.max, 2048);
  const slots = new Map<number, number | null>();
  for (const p of view.points) slots.set(p.step, p.value);
  for (let g = 0; g < n.x.length; g++) if (n.states[metric][g] !== 0) slots.set(n.x[g], null);
  const x = [...slots.keys()].sort((a, b) => a - b);
  return [x, x.map(step => slots.get(step) ?? null)];
}
