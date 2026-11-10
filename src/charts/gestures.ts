export interface NumericRange {
  min: number;
  max: number;
}
export function gestureRange(current: NumericRange, domain: NumericRange, delta: number, anchor: number, pan = false, pinch = false): NumericRange {
  const extent = domain.max - domain.min,
    span = current.max - current.min;
  if (![delta, anchor, current.min, current.max, domain.min, domain.max, extent, span].every(Number.isFinite) || extent <= 0 || span <= 0) return current;
  const ratio = Math.max(0, Math.min(1, anchor));
  const nextSpan = pan ? Math.min(span, extent) : Math.max(Math.min(1e-6, extent), Math.min(extent, span * Math.exp(Math.max(-600, Math.min(600, delta)) * (pinch ? .004 : .002))));
  const point = current.min + span * ratio;
  let min = pan ? current.min + span * delta * .002 : point - nextSpan * ratio;
  min = Math.max(domain.min, Math.min(domain.max - nextSpan, min));
  return {
    min,
    max: min + nextSpan
  };
}
