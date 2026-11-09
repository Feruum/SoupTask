import { useCallback, useEffect, useRef, useState } from 'react'
import { RUNS } from '@/data/catalog'
import type { SourceRow, QualityIssue, Metric } from '@/data/types'
import { WorkspaceController } from './controller'
import { matchesWorkspace } from './protocol'
import { unpackReply } from './wire'
import type { WireReply } from './wire'
import type { StepRange, RunMetadata, WorkspaceView, SourceQuery, IssueQuery, AcceptedIssueQuery, WorkspaceIdentity } from './protocol'
declare global { interface Window { __soupEvidence?: { rawBufferBytes: number; allocationBytes: number; renderBufferBytes?: number; workspaceEpoch: number; viewSeq: number; acceptedHoverSeq: number; members: string[]; sampler: string; workerTimings: Record<string, { generationMs: number; normalizationMs: number; indexBuildMs: number; indexBufferBytes: number }> } } }
export interface WorkspaceState {
  kind: 'loading' | 'ready' | 'refreshing' | 'stale' | 'error' | 'empty'
  selectionKey: string
  message?: string
  runs: Record<string, RunMetadata>
  view: WorkspaceView | null
  range: StepRange | null
  inspection: SourceRow[]
  inspectionTotal: number
  inspectionPage: number
  rows: SourceRow[]
  rowsPage: number | null
  rowsRunId: string | null
  rowsPending: boolean
  issues: QualityIssue[]
  issuesQuery: AcceptedIssueQuery | null
  issuesPending: boolean
  issueTotal: number
  hoverStep: number | null
  hover: Record<string, SourceRow[]>
}
let epoch = 0
const mode = import.meta.env.VITE_SAMPLER_MODE === 'scan' ? 'scan' : import.meta.env.VITE_SAMPLER_MODE === 'stream' ? 'stream' : 'indexed'
const initial = (selectionKey: string): WorkspaceState => ({ kind: selectionKey ? 'loading' : 'empty', selectionKey, runs: {}, view: null, range: null, inspection: [], inspectionTotal: 0, inspectionPage: 0, rows: [], rowsPage: null, rowsRunId: null, rowsPending: false, issues: [], issuesQuery: null, issuesPending: false, issueTotal: 0, hoverStep: null, hover: {} })
export function useWorkspace(runIds: string[]) {
  const key = runIds.join(',')
  const [stored, setState] = useState<WorkspaceState>(() => initial(key))
  const [attempt, setAttempt] = useState(0)
  const controller = useRef<WorkspaceController | null>(null)
  const width = useRef(800)
  const widths = useRef<Partial<Record<Metric, number>>>({})
  const range = useRef<StepRange | null>(null)
  const domain = useRef<StepRange | null>(null)
  const requestedViewSeq = useRef(0)
  const state = stored.selectionKey === key ? stored : initial(key)
  useEffect(() => {
    // Every activation is new, even an identical revision after A -> B -> A.
    const ids = key ? key.split(',') : []
    const runs = ids.map(id => RUNS.find(run => run.id === id))
    range.current = null; domain.current = null; requestedViewSeq.current = 0
    // oxlint-disable-next-line react/set-state-in-effect -- An external Worker workspace must reset its old identity atomically on activation.
    setState(initial(key))
    if (!ids.length) return
    if (ids.length > 4 || new Set(ids).size !== ids.length || runs.some(run => !run)) {
      setState({ ...initial(key), kind: 'error', message: 'Choose one to four distinct, known run IDs.' }); return
    }
    const descriptors = runs.filter(run => !!run)
    const activation = ++epoch
    const identity: WorkspaceIdentity = { workspaceEpoch: activation, selectionKey: descriptors.map(run => `${run.id}:${run.revision}`).join('|'), members: descriptors.map(run => ({ runId: run.id, revision: run.revision, activationEpoch: activation })) }
    let disposed = false
    let worker: Worker | undefined
    let client: WorkspaceController | undefined
    let activeRequestId: number | null = null
    const fail = (message: string) => { if (!disposed) setState(current => ({ ...current, kind: current.view ? 'stale' : 'error', message, rowsPending: false, issuesPending: false })) }
    try {
      performance.mark('soup:workspace-start')
      worker = new Worker(new URL('./training.worker.ts', import.meta.url), { type: 'module' })
      const transport = worker
      client = new WorkspaceController(identity, request => { activeRequestId = request.requestId; transport.postMessage(request) }, reply => {
        if (disposed) return
        if (reply.kind === 'error') { if (reply.operation === 'activate' || reply.operation === 'view') fail(reply.message); else setState(current => ({ ...current, message: reply.message, ...(reply.operation === 'rows' ? { rowsPending: false } : {}), ...(reply.operation === 'issues' ? { issuesPending: false } : {}) })); return }
        if (reply.kind === 'activated') {
          domain.current = reply.domain; range.current = reply.domain
          performance.mark('soup:data-ready')
          window.__soupEvidence = { workspaceEpoch: activation, members: descriptors.map(run => run.id), sampler: mode, rawBufferBytes: Object.values(reply.runs).reduce((sum, run) => sum + run.rawBufferBytes, 0), allocationBytes: Object.values(reply.runs).reduce((sum, run) => sum + run.allocationBytes, 0), viewSeq: 0, acceptedHoverSeq: 0, workerTimings: Object.fromEntries(Object.entries(reply.runs).map(([id, run]) => [id, { generationMs: run.generationMs, normalizationMs: run.normalizationMs, indexBuildMs: run.indexBuildMs ?? 0, indexBufferBytes: run.indexBufferBytes ?? 0 }])) }
          performance.mark('soup:view-start')
          setState(current => ({ ...current, runs: reply.runs, range: reply.domain, kind: reply.domain ? 'loading' : 'empty' }))
          if (reply.domain) { requestedViewSeq.current++; client?.request({ kind: 'view', range: reply.domain, width: width.current, widths: { ...widths.current }, mode }) }
        } else if (reply.kind === 'view') {
          performance.mark('soup:view-ready'); performance.measure('soup:view', 'soup:view-start', 'soup:view-ready')
          if (window.__soupEvidence?.workspaceEpoch === activation) window.__soupEvidence.viewSeq = reply.viewSeq
          setState(current => ({ ...current, kind: 'ready', message: undefined, view: reply.view, range: reply.view.range, hoverStep: null, hover: {} }))
        } else if (reply.kind === 'inspect') { performance.mark('soup:inspector-ready'); setState(current => ({ ...current, inspection: reply.rows, inspectionTotal: reply.total, inspectionPage: reply.page, message: undefined })) }
        else if (reply.kind === 'rows') setState(current => ({ ...current, rows: reply.rows, rowsPage: reply.page ?? null, rowsRunId: reply.runId ?? null, rowsPending: false, message: undefined }))
        else if (reply.kind === 'issues') setState(current => ({ ...current, issues: reply.rows, issuesQuery: reply.query && reply.runId ? { ...reply.query, runId: reply.runId, page: reply.query.page ?? 0, pageSize: reply.query.pageSize ?? 50 } : null, issuesPending: false, issueTotal: reply.total, message: undefined }))
        else if (reply.kind === 'hover') { performance.mark('soup:hover-ready'); performance.measure('soup:hover', 'soup:hover-start', 'soup:hover-ready'); if (window.__soupEvidence?.workspaceEpoch === activation) window.__soupEvidence.acceptedHoverSeq = reply.hoverSeq; setState(current => ({ ...current, hoverStep: reply.step, hover: reply.observations })) }
      })
      controller.current = client
      worker.onmessage = (event: MessageEvent<WireReply>) => {
        const message = event.data
        if (disposed || !matchesWorkspace(identity, message.identity) || message.requestId !== activeRequestId) return
        activeRequestId = null
        const correlation = { identity: message.identity, requestId: message.requestId, viewSeq: message.viewSeq, hoverSeq: message.hoverSeq, inspectSeq: message.inspectSeq }
        if (message.kind === 'view-packed' && message.viewSeq !== requestedViewSeq.current) {
          // Release the obsolete in-flight slot, without decoding its disposable buffers.
          client?.receive({ ...correlation, kind: 'error', operation: 'view', message: 'Superseded view.' })
          return
        }
        try {
          const decoded = unpackReply(message)
          if (message.kind === 'view-packed' && window.__soupEvidence?.workspaceEpoch === activation) window.__soupEvidence.renderBufferBytes = message.renderBufferBytes
          client?.receive(decoded)
        } catch (error) { client?.receive({ ...correlation, kind: 'error', operation: 'view', message: error instanceof Error ? error.message : 'Invalid render payload.' }) }
      }
      worker.onerror = () => fail('The data Worker could not load. Retry this workspace.')
      worker.onmessageerror = () => fail('The Worker response could not be read. Retry this workspace.')
      client.request({ kind: 'activate', runs: descriptors, mode })
    } catch { fail('Web Workers are unavailable. Allow Workers and retry this workspace.') }
    return () => { if (window.__soupEvidence?.workspaceEpoch === activation) delete window.__soupEvidence; disposed = true; client?.dispose(); if (controller.current === client) controller.current = null; if (worker) { worker.onmessage = null; worker.onerror = null; worker.onmessageerror = null; worker.terminate() } }
  }, [key, attempt])
  const setRange = useCallback((next: StepRange) => {
    if (![next.min, next.max, next.max - next.min].every(Number.isFinite) || next.min > next.max) { setState(current => ({ ...current, message: 'Enter a finite step range with From no greater than To.' })); return }
    if (!domain.current) return
    range.current = next
    requestedViewSeq.current++
    performance.mark('soup:view-start')
    setState(current => ({ ...current, kind: current.view ? 'refreshing' : 'loading', message: undefined, hoverStep: null, hover: {} }))
    controller.current?.request({ kind: 'view', range: next, width: width.current, widths: { ...widths.current }, mode })
  }, [])
  const setWidth = useCallback((next: number) => { if (!Number.isFinite(next) || next <= 0) return; const rounded = Math.max(1, Math.floor(next)); if (rounded === width.current) return; width.current = rounded; if (range.current) setRange(range.current) }, [setRange])
  const setMetricWidth = useCallback((metric: Metric, next: number) => { if (!Number.isFinite(next) || next <= 0) return; const rounded = Math.max(1, Math.floor(next)); if (widths.current[metric] === rounded) return; widths.current[metric] = rounded; if (range.current) setRange(range.current) }, [setRange])
  const zoom = useCallback((factor: number) => { const current = range.current, full = domain.current; if (!current || !full || !Number.isFinite(factor) || factor <= 0) return; const center = current.min + (current.max - current.min) / 2, half = Math.max(0.5, (current.max - current.min) * factor / 2); setRange({ min: Math.max(full.min, center - half), max: Math.min(full.max, center + half) }) }, [setRange])
  const reset = useCallback(() => { if (domain.current) setRange(domain.current) }, [setRange])
  const retry = useCallback(() => setAttempt(value => value + 1), [])
  const inspect = useCallback((runId: string, query: SourceQuery) => { if (controller.current?.request({ kind: 'inspect', runId, query }) === false) setState(current => ({ ...current, message: 'The view is changing. Retry this source query after it finishes.' })) }, [])
  const loadRows = useCallback((runId: string, page: number): boolean => {
    const client = controller.current
    if (!client || client.queuedCount > 0) { setState(current => ({ ...current, message: 'The view is changing. Retry this source page after it finishes.' })); return false }
    // Set before dispatch so even a synchronous postMessage error clears this flag last.
    setState(current => ({ ...current, rowsPending: true, message: undefined }))
    const accepted = client.request({ kind: 'rows', runId, page })
    if (!accepted) setState(current => ({ ...current, rowsPending: false, message: 'The view is changing. Retry this source page after it finishes.' }))
    return accepted
  }, [])
  const loadIssues = useCallback((runId: string, query: IssueQuery = {}): boolean => {
    const client = controller.current
    if (!client || client.queuedCount > 0) { setState(current => ({ ...current, message: 'The view is changing. Retry this issue page after it finishes.' })); return false }
    setState(current => ({ ...current, issuesPending: true, message: undefined }))
    const accepted = client.request({ kind: 'issues', runId, query })
    if (!accepted) setState(current => ({ ...current, issuesPending: false, message: 'The view is changing. Retry this issue page after it finishes.' }))
    return accepted
  }, [])
  const hover = useCallback((step: number) => { if (range.current) { performance.mark('soup:hover-start'); controller.current?.request({ kind: 'hover', step }) } }, [])
  return { state, setRange, setWidth, setMetricWidth, zoom, reset, retry, inspect, loadRows, loadIssues, hover }
}




