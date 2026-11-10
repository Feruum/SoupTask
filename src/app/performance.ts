/** Keep browser User Timing entries bounded; an active Chrome trace retains emitted events. */
export const TIMING_ENTRY_LIMIT = 128
const counts = new Map<string, number>()
function reserve(name: string, type: 'mark' | 'measure') {
  const key = `${type}:${name}`
  const count = counts.get(key) ?? 0
  if (count >= TIMING_ENTRY_LIMIT) {
    if (type === 'mark') performance.clearMarks(name)
    else performance.clearMeasures(name)
  }
  counts.set(key, count >= TIMING_ENTRY_LIMIT ? 1 : count + 1)
}
export function performanceMark(name: string, options?: PerformanceMarkOptions): PerformanceMark {
  reserve(name, 'mark')
  return performance.mark(name, options)
}
export function performanceMeasure(name: string, start: string | PerformanceMeasureOptions, end?: string): PerformanceMeasure {
  reserve(name, 'measure')
  return typeof start === 'string' ? performance.measure(name, start, end) : performance.measure(name, start)
}
