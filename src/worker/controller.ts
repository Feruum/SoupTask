/// <reference types="vite/client" />
import { matchesWorkspace, priority } from './protocol'
import type { Operation, WorkerReply, WorkerRequest, WorkspaceIdentity } from './protocol'
/** Dispatch is bounded before postMessage, not inside an already flooded Worker. */
export class WorkspaceController {
  private inFlight: WorkerRequest | null = null
  private pending: WorkerRequest | null = null
  private requestId = 0
  private viewSeq = 0
  private hoverSeq = 0
  private inspectSeq = 0
  private disposed = false
  readonly identity: WorkspaceIdentity
  private send: (request: WorkerRequest) => void
  private accept: (reply: WorkerReply) => void
  constructor(identity: WorkspaceIdentity, send: (request: WorkerRequest) => void, accept: (reply: WorkerReply) => void) { this.identity = identity; this.send = send; this.accept = accept }
  request(operation: Operation): boolean {
    if (this.disposed) return false
    // Refusing a second explicit request must not invalidate the already accepted one.
    if ((operation.kind === 'inspect' || operation.kind === 'rows' || operation.kind === 'issues') && (this.inFlight || this.pending)) return false
    if (operation.kind === 'view') { this.viewSeq++; this.hoverSeq++ }
    if (operation.kind === 'hover') this.hoverSeq++
    if (operation.kind === 'inspect' || operation.kind === 'rows' || operation.kind === 'issues') this.inspectSeq++
    // An explicit source request cannot be silently evicted by a later zoom.
    // Refuse it while busy so the hook can report a stable, actionable retry message.
    const request: WorkerRequest = { ...operation, identity: this.identity, requestId: ++this.requestId, viewSeq: this.viewSeq, hoverSeq: this.hoverSeq, inspectSeq: this.inspectSeq }
    if (!this.inFlight) { this.dispatch(request); return true }
    if (!this.pending || priority(operation) >= priority(this.pending)) { this.pending = request; return true }
    return false
  }
  private dispatch(request: WorkerRequest) {
    this.inFlight = request
    try { this.send(request) }
    catch (error) { this.receive({ identity: request.identity, requestId: request.requestId, viewSeq: request.viewSeq, hoverSeq: request.hoverSeq, inspectSeq: request.inspectSeq, kind: 'error', operation: request.kind, message: error instanceof Error ? error.message : 'Worker transport failed.' }) }
  }
  receive(reply: WorkerReply): void {
    if (this.disposed || !matchesWorkspace(this.identity, reply.identity)) return
    if (!this.inFlight || reply.requestId !== this.inFlight.requestId) return
    const operation = this.inFlight.kind
    const current = operation === 'view' ? reply.viewSeq === this.viewSeq : operation === 'hover' ? reply.viewSeq === this.viewSeq && reply.hoverSeq === this.hoverSeq : operation === 'activate' || reply.inspectSeq === this.inspectSeq
    this.inFlight = null
    const next = this.pending
    this.pending = null
    if (next) this.dispatch(next)
    // Deliberately broken test-only variant proves the race assertions detect stale commits.
    const acceptStale = import.meta.env.MODE === 'test' && import.meta.env.VITE_ASYNC_FAULT === 'accept-stale'
    if (current || acceptStale) this.accept(reply)
  }
  dispose(): void { this.disposed = true; this.pending = null; this.inFlight = null }
  get queuedCount(): number { return Number(!!this.inFlight) + Number(!!this.pending) }
}

