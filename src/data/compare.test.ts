import { it, expect } from 'vitest';
import { alignDemoRuns } from './compare';
it('aligns distinct recorded steps without inventing numerical observations', () => {
  const raw = (x: number[], y: number[]) => ({
    step: Float64Array.from(x),
    loss: Float64Array.from(y),
    lr: Float64Array.from(y),
    grad_norm: Float64Array.from(y)
  });
  const data = alignDemoRuns([raw([0, 2], [1, 3]), raw([1, 3], [4, 5])], 'loss');
  expect(data[0]).toEqual([0, 1, 2, 3]);
  expect(data[1][0]).toBe(1);
  expect(data[1][2]).toBe(3);
  expect(data[2][1]).toBe(4);
});
it('foreign steps are undefined while observed NaN is a real null gap', () => {
  const a = {
      step: Float64Array.of(0, 2, 4),
      loss: Float64Array.of(1, NaN, 3),
      lr: Float64Array.of(0, 0, 0),
      grad_norm: Float64Array.of(1, 1, 1)
    },
    b = {
      step: Float64Array.of(1, 3),
      loss: Float64Array.of(4, 5),
      lr: Float64Array.of(0, 0),
      grad_norm: Float64Array.of(1, 1)
    };
  const data = alignDemoRuns([a, b], 'loss');
  expect(data[1]).toEqual([1, undefined, null, undefined, 3]);
  expect(data[2]).toEqual([undefined, 4, undefined, 5, undefined]);
});
