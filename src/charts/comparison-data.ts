import type { MetricRenderView } from '@/data/types';
/** Alignment is confined to bounded sampled views. Undefined is a foreign coordinate, never a missing measurement. */
export function alignedRenderData(views: readonly MetricRenderView[]): [number[], ...(number | undefined)[][]] {
  const x = [...new Set(views.flatMap(view => view.points.map(point => point.step)))].sort((a, b) => a - b);
  if (x.length === 1) {
    const step = x[0],
      padding = Math.max(1, Math.abs(step) * .001);
    x.unshift(step - padding);
    x.push(step + padding);
  }
  if (!x.length) x.push(0, 1);
  return [x, ...views.map(view => {
    const lookup = new Map(view.points.map(point => [point.step, point.value]));
    return x.map(step => view.mode === 'disconnected-extrema' ? undefined : lookup.get(step));
  })];
}
