import { expect, it } from 'vitest';
import { normalize, sampleView } from './engine';
import { RUNS } from '../data/catalog';
const raw = (x: number[], y: number[]) => ({
  step: Float64Array.from(x),
  loss: Float64Array.from(y),
  lr: Float64Array.from(y),
  grad_norm: Float64Array.from(y)
});
it('isolated spike keeps both NaN breaks and distinct source segments', () => {
  const n = normalize(raw([0, 1, 2, 3, 4], [1, NaN, 100, NaN, 2]));
  const view = sampleView(n, 'loss', 0, 4, 1);
  expect(view.points.some(point => point.sourceIndex === 2 && point.step === 2 && point.value === 100)).toBe(true);
  expect(view.breaks).toEqual([{
    from: 0,
    to: 2,
    kind: 'invalid'
  }, {
    from: 2,
    to: 4,
    kind: 'invalid'
  }]);
  expect(new Set(view.points.map(point => point.segment)).size).toBe(3);
});
it('known cadence gap remains disconnected without a fabricated null row', () => {
  const n = normalize(raw([0, 1, 4, 5], [3, 2, 1, 2]), {
    ...RUNS[0],
    expectedCadence: 1
  });
  const view = sampleView(n, 'loss', 0, 5, 1);
  expect(view.breaks).toEqual([{
    from: 1,
    to: 4,
    kind: 'gap'
  }]);
  expect(new Set(view.points.map(point => point.segment)).size).toBe(2);
});
