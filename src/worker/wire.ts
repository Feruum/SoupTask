import { METRICS } from '@/data/catalog'
import type { Metric, MetricRenderView, RenderPoint } from '@/data/types'
import type { WorkerReply, WorkspaceView } from './protocol'

type ViewReply = Extract<WorkerReply, { kind: 'view' }>
export type PackedMetricView = Omit<MetricRenderView, 'points' | 'conflicts'> & {
  /** Interleaved immutable sourceIndex, step, value, segment. Disposable copies only. */
  pointColumns: Float64Array
  conflictColumns: Float64Array
}
export type PackedViewReply = Omit<ViewReply, 'kind' | 'view'> & {
  kind: 'view-packed'
  renderBufferBytes: number
  view: Omit<WorkspaceView, 'runs'> & { runs: Record<string, Record<Metric, PackedMetricView>> }
}
export type WireReply = Exclude<WorkerReply, { kind: 'view' }> | PackedViewReply
const MAX_POINTS = 65536
function packPoints(points: RenderPoint[]): Float64Array {
  const columns = new Float64Array(points.length * 4)
  for (let i = 0; i < points.length; i++) {
    const point = points[i], offset = i * 4
    columns[offset] = point.sourceIndex; columns[offset + 1] = point.step
    columns[offset + 2] = point.value; columns[offset + 3] = point.segment
  }
  return columns
}
export function packReply(reply: WorkerReply): { message: WireReply; transfer: ArrayBuffer[] } {
  if (reply.kind !== 'view') return { message: reply, transfer: [] }
  const transfer: ArrayBuffer[] = []
  const runs = Object.fromEntries(Object.entries(reply.view.runs).map(([id, views]) => [id, Object.fromEntries(METRICS.map(metric => {
    const { points, conflicts, ...header } = views[metric]
    const pointColumns = packPoints(points), conflictColumns = packPoints(conflicts)
    transfer.push(pointColumns.buffer as ArrayBuffer, conflictColumns.buffer as ArrayBuffer)
    return [metric, { ...header, pointColumns, conflictColumns }]
  }))])) as PackedViewReply['view']['runs']
  const renderBufferBytes = transfer.reduce((sum, buffer) => sum + buffer.byteLength, 0)
  return { message: { ...reply, kind: 'view-packed', renderBufferBytes, view: { ...reply.view, runs } }, transfer }
}
function unpackPoints(columns: Float64Array, min: number, max: number, ordered: boolean): RenderPoint[] {
  if (!(columns instanceof Float64Array) || columns.length % 4 || columns.length > MAX_POINTS * 4) throw new TypeError('Invalid render columns')
  const points: RenderPoint[] = []
  for (let offset = 0; offset < columns.length; offset += 4) {
    const sourceIndex = columns[offset], step = columns[offset + 1], value = columns[offset + 2], segment = columns[offset + 3]
    if (!Number.isSafeInteger(sourceIndex) || sourceIndex < 0 || !Number.isSafeInteger(segment) || segment < 0 || !Number.isFinite(value) || !Number.isFinite(step) || step < min || step > max) throw new TypeError('Invalid source point in render columns')
    if (ordered && points.length && points[points.length - 1].step >= step) throw new TypeError('Line steps must be strictly increasing')
    points.push({ sourceIndex, step, value, segment })
  }
  return points
}
export function unpackReply(message: WireReply): WorkerReply {
  if (message.kind !== 'view-packed') return message
  const { min, max } = message.view.range
  if (![min, max, max - min].every(Number.isFinite) || min > max || !Number.isSafeInteger(message.viewSeq) || message.viewSeq !== message.view.viewSeq) throw new TypeError('Invalid render view header')
  const members = message.identity.members.map(member => member.runId)
  if (members.length > 4 || Object.keys(message.view.runs).length !== members.length || members.some(id => !Object.hasOwn(message.view.runs, id))) throw new TypeError('Render workspace membership mismatch')
  let renderBufferBytes = 0
  const runs = Object.fromEntries(members.map(id => [id, Object.fromEntries(METRICS.map(metric => {
    const packed = message.view.runs[id][metric]
    if (!packed || !['line', 'disconnected-extrema'].includes(packed.mode) || !Array.isArray(packed.breaks) || packed.breaks.length > MAX_POINTS) throw new TypeError('Invalid metric render header')
    const { pointColumns, conflictColumns, ...header } = packed
    const points = unpackPoints(pointColumns, min, max, true), conflicts = unpackPoints(conflictColumns, min, max, false)
    if (!Number.isSafeInteger(header.rawCount) || header.rawCount < 0 || header.representedCount !== points.length + conflicts.length || header.representedCount > header.rawCount) throw new TypeError('Invalid render observation counts')
    for (const gap of header.breaks) if (![gap.from, gap.to].every(Number.isFinite) || gap.from > gap.to || typeof gap.kind !== 'string') throw new TypeError('Invalid render gap')
    let expectedMin: number | null = null, expectedMax: number | null = null
    for (const point of [...points, ...conflicts]) { expectedMin = expectedMin === null ? point.value : Math.min(expectedMin, point.value); expectedMax = expectedMax === null ? point.value : Math.max(expectedMax, point.value) }
    if (header.min !== expectedMin || header.max !== expectedMax) throw new TypeError('Render extrema disagree with source columns')
    renderBufferBytes += pointColumns.byteLength + conflictColumns.byteLength
    return [metric, { ...header, points, conflicts }]
  }))])) as WorkspaceView['runs']
  if (renderBufferBytes !== message.renderBufferBytes) throw new TypeError('Render buffer byte count mismatch')
  const { renderBufferBytes: _bytes, ...header } = message
  return { ...header, kind: 'view', view: { ...message.view, runs } }
}
