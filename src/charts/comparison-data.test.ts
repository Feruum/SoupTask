import { expect, it } from 'vitest';
import type { MetricRenderView } from '@/data/types';
import { alignedRenderData } from './comparison-data';
function view(steps: number[], values: number[]): MetricRenderView {
  return {
    points: steps.map((step, index) => ({
      sourceIndex: index,
      step,
      value: values[index],
      segment: 0
    })),
    conflicts: [],
    breaks: [],
    mode: 'line',
    min: Math.min(...values),
    max: Math.max(...values),
    rawCount: steps.length,
    representedCount: steps.length
  };
}
it('does not manufacture null gaps at coordinates contributed by another run', () => {
  const a = view([0, 2, 4], [1, 100, -3]),
    b = view([1, 3], [7, 8]),
    data = alignedRenderData([a, b]);
  expect(data[0]).toEqual([0, 1, 2, 3, 4]);
  expect(data[1]).toEqual([1, undefined, 100, undefined, -3]);
  expect(data[2]).toEqual([undefined, 7, undefined, 8, undefined]);
  expect(data[1]).not.toContain(null);
  expect(a.points[1]).toEqual({
    sourceIndex: 1,
    step: 2,
    value: 100,
    segment: 0
  });
});
it('keeps real connectivity gaps independent of alignment and omits disconnected overview lines', () => {
  const a = view([0, 4], [1, 2]);
  a.breaks = [{
    from: 0,
    to: 4,
    kind: 'nan'
  }];
  const before = structuredClone(a);
  alignedRenderData([a, view([1, 3], [3, 4])]);
  expect(a).toEqual(before);
  a.mode = 'disconnected-extrema';
  expect(alignedRenderData([a])[1]).toEqual([undefined, undefined]);
});
