import { expect, it } from 'vitest';
import { assignSeriesSlots } from './series-slots';
it('removal and reordered URL selection do not change retained run colors', () => {
  const initial = assignSeriesSlots({}, ['A', 'B', 'C']);
  expect(initial).toEqual({
    A: 0,
    B: 1,
    C: 2
  });
  const removed = assignSeriesSlots(initial, ['C', 'B']);
  expect(removed).toEqual({
    C: 2,
    B: 1
  });
  expect(assignSeriesSlots(removed, ['B', 'D', 'C'])).toEqual({
    B: 1,
    C: 2,
    D: 0
  });
});
it('enforces four distinct series slots', () => {
  expect(Object.values(assignSeriesSlots({}, ['A', 'B', 'C', 'D']))).toEqual([0, 1, 2, 3]);
  expect(() => assignSeriesSlots({}, ['A', 'B', 'C', 'D', 'E'])).toThrow(RangeError);
});
