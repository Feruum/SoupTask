import { expect, it } from 'vitest';
import { gestureRange } from './gestures';
it('wheel zoom keeps the numeric pointer anchor and clamps to domain', () => {
  const range = gestureRange({
    min: 0,
    max: 100
  }, {
    min: 0,
    max: 200
  }, -100, .25);
  expect((25 - range.min) / (range.max - range.min)).toBeCloseTo(.25);
  expect(range.max - range.min).toBeLessThan(100);
  expect(gestureRange({
    min: 20,
    max: 80
  }, {
    min: 0,
    max: 100
  }, 600, .5)).toEqual({
    min: 0,
    max: 100
  });
});
it('shift pan and pinch remain finite and cannot leave the domain', () => {
  expect(gestureRange({
    min: 20,
    max: 80
  }, {
    min: 0,
    max: 100
  }, 1000, .5, true)).toEqual({
    min: 40,
    max: 100
  });
  const pinch = gestureRange({
    min: 0,
    max: 100
  }, {
    min: 0,
    max: 100
  }, -120, .5, false, true);
  expect(pinch.min).toBeGreaterThan(0);
  expect(pinch.max).toBeLessThan(100);
  expect(gestureRange({
    min: 4,
    max: 4
  }, {
    min: 4,
    max: 4
  }, 100, .5)).toEqual({
    min: 4,
    max: 4
  });
});
it('ignores malformed gesture coordinates without producing invalid ranges', () => {
  const range = {
    min: 0,
    max: 10
  };
  expect(gestureRange(range, {
    min: 0,
    max: 100
  }, 20, NaN)).toEqual(range);
  expect(gestureRange(range, {
    min: 0,
    max: Infinity
  }, 20, .5)).toEqual(range);
});
