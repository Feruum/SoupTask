/// <reference lib="webworker" />
import { generateRun } from '@/data/generator'
import { normalize, sampleView, inspectSource, inspectStep, inspectGroup, sourcePage, issuePage, allocationBytes, lowerBound, upperBound } from '@/core/engine'
import { METRICS } from '@/data/catalog'
import { buildRunIndex, sampleIndexed } from '@/sampling/block-index'
import type { RunBlockIndex } from '@/sampling/block-index'
import type { NormalizedRun } from '@/core/engine'
import { matchesWorkspace } from './protocol'
import { packReply } from './wire'
import type { WorkerRequest, WorkerReply, WorkerPayload, WorkspaceIdentity, RunMetadata } from './protocol'
const scope = self as unknown as DedicatedWorkerGlobalScope
const stores = new Map<string, NormalizedRun>()
const indexes = new Map<string, RunBlockIndex>()
let active: WorkspaceIdentity | null = null
let hoverRange = { min: 0, max: 1 }, hoverWidth = 800
function nearestRows(n: NormalizedRun, target: number) {
  if (!Number.isFinite(target) || !n.x.length || target < hoverRange.min || target > hoverRange.max || target < n.x[0] || target > n.x[n.x.length - 1]) return []
  const begin = lowerBound(n.x, hoverRange.min), end = upperBound(n.x, hoverRange.max)
  if (begin === end) return []
  let low = 0, high = n.x.length; while (low < high) { const mid = (low + high) >>> 1; if (n.x[mid] < target) low = mid + 1; else high = mid }
  if (n.x[low] === target) return inspectStep(n, target)
  if (low > 0 && low < n.x.length && n.cadence !== undefined && n.x[low] - n.x[low - 1] > n.cadence) return []
  const nearest = low === n.x.length ? low - 1 : low > 0 && target - n.x[low - 1] <= n.x[low] - target ? low - 1 : low
  const index = Math.max(begin, Math.min(end - 1, nearest))
  if (Math.abs(n.x[index] - target) > (hoverRange.max - hoverRange.min) / hoverWidth * 8) return []
  return inspectStep(n, n.x[index])
}
scope.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const request = event.data
  const correlation = { identity: request.identity, requestId: request.requestId, viewSeq: request.viewSeq, hoverSeq: request.hoverSeq, inspectSeq: request.inspectSeq }
  const reply = (payload: WorkerPayload) => {
    const packed = packReply({ ...correlation, ...payload } satisfies WorkerReply)
    scope.postMessage(packed.message, packed.transfer)
  }
  try {
    if (request.kind === 'activate') {
      if (request.runs.length > 4 || new Set(request.runs.map(run => run.id)).size !== request.runs.length) throw new Error('Choose at most four distinct runs.')
      stores.clear(); indexes.clear(); active = request.identity
      const runs: Record<string, RunMetadata> = {}
      let min = Infinity, max = -Infinity
      for (const run of request.runs) {
        if (!request.identity.members.some(item => item.runId === run.id && item.revision === run.revision)) throw new Error('Run revision does not match the workspace.')
        const generationStart = performance.now()
        const raw = generateRun(run)
        const generationMs = performance.now() - generationStart, normalizationStart = performance.now()
        const normalized = normalize(raw, run)
        const normalizationMs = performance.now() - normalizationStart
        stores.set(run.id, normalized)
        const index = request.mode === 'indexed' ? buildRunIndex(normalized) : undefined
        if (index) indexes.set(run.id, index)
        runs[run.id] = { run, summaries: normalized.summaries, quality: normalized.quality, domain: normalized.domain, allocationBytes: allocationBytes(normalized) + (index?.byteLength ?? 0), generationMs, normalizationMs, indexBuildMs: index?.buildMs ?? 0, indexBufferBytes: index?.byteLength ?? 0, indexVersion: index?.version, rawBufferBytes: Object.values(normalized.raw).reduce((total, column) => total + column.byteLength, 0) }
        if (normalized.domain) { min = Math.min(min, normalized.domain.min); max = Math.max(max, normalized.domain.max) }
      }
      reply({ kind: 'activated', runs, domain: Number.isFinite(min) ? { min, max } : null })
      return
    }
    if (!active || !matchesWorkspace(active, request.identity)) throw new Error('Workspace is no longer active.')
    if (request.kind === 'view') {
      hoverRange = request.range; hoverWidth = Math.max(request.width, ...Object.values(request.widths ?? {}).filter((value): value is number => typeof value === "number"))
      const runs = Object.fromEntries([...stores].map(([id, normalized]) => {
        const index = indexes.get(id)
        if (request.mode === 'indexed' && !index) throw new Error('The exact index was not activated. Retry this workspace.')
        return [id, Object.fromEntries(METRICS.map(metric => [metric, request.mode === 'indexed' && index ? sampleIndexed(normalized, index, metric, request.range.min, request.range.max, request.widths?.[metric] ?? request.width) : sampleView(normalized, metric, request.range.min, request.range.max, request.widths?.[metric] ?? request.width, request.mode === 'scan' ? 'scan' : 'stream')]))]
      })) as Extract<WorkerPayload, { kind: 'view' }>['view']['runs']
      reply({ kind: 'view', view: { viewSeq: request.viewSeq, range: request.range, runs } })
    } else if (request.kind === 'hover') {
      reply({ kind: 'hover', step: request.step, observations: Object.fromEntries([...stores].map(([id, normalized]) => [id, nearestRows(normalized, request.step)])) })
    } else {
      const normalized = stores.get(request.runId)
      if (!normalized) throw new Error('This run is not in the active workspace.')
      if (request.kind === 'inspect') {
        const page = request.query.page ?? 0
        const result = request.query.sourceIndex !== undefined ? { rows: [inspectSource(normalized, request.query.sourceIndex)], total: 1 } : inspectGroup(normalized, request.query.step ?? Number.NaN, page, 50)
        reply({ kind: 'inspect', ...result, page })
      } else if (request.kind === 'rows') reply({ kind: 'rows', rows: sourcePage(normalized, request.page, 50), page: request.page, runId: request.runId })
      else {
        const query = { ...request.query, page: request.query.page ?? 0, pageSize: request.query.pageSize ?? 50 }
        const result = issuePage(normalized, query)
        reply({ kind: 'issues', ...result, query, runId: request.runId })
      }
    }
  } catch (error) { reply({ kind: 'error', operation: request.kind, message: error instanceof Error ? error.message : 'Worker request failed.' }) }
}




