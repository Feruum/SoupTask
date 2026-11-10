import { describe, it, expect } from 'vitest'
import { WorkspaceController } from './controller'
import type { WorkerRequest, WorkerReply, WorkspaceIdentity } from './protocol'
const identity = (epoch = 1, runId = 'A'): WorkspaceIdentity => ({ workspaceEpoch: epoch, selectionKey: `${runId}:same`, members: [{ runId, revision: 'same', activationEpoch: epoch }] })
function harness(scope = identity()) {
 const sent: WorkerRequest[] = [], accepted: WorkerReply[] = []
 const client = new WorkspaceController(scope, request => sent.push(request), reply => accepted.push(reply))
 const reply = (request: WorkerRequest, failure = false): WorkerReply => ({ identity: request.identity, requestId: request.requestId, viewSeq: request.viewSeq, hoverSeq: request.hoverSeq, inspectSeq: request.inspectSeq, ...(failure ? { kind: 'error' as const, operation: request.kind, message: 'controlled failure' } : { kind: 'rows' as const, rows: [] }) })
 return { client, sent, accepted, reply }
}
const view = (min: number) => ({ kind: 'view' as const, range: { min, max: min + 100 }, width: 800, mode: 'stream' as const })
describe('controlled asynchronous workspace', () => {
 it('bounds posts to one running and one latest view; rejects stale success and failure', () => {
  const h = harness(); h.client.request(view(0)); const old = h.sent[0]
  for (let i = 1; i <= 100; i++) h.client.request(view(i))
  expect(h.sent).toHaveLength(1); expect(h.client.queuedCount).toBe(2)
  h.client.receive(h.reply(old, true))
  expect(h.accepted).toHaveLength(0); expect(h.sent).toHaveLength(2); expect(h.sent[1].kind).toBe('view')
  expect(h.sent[1]).toMatchObject({ range: { min: 100 } })
  h.client.receive(h.reply(h.sent[1])); expect(h.accepted).toHaveLength(1)
  h.client.receive(h.reply(old)); expect(h.accepted).toHaveLength(1); expect(h.client.queuedCount).toBe(0)
 })
 it('protects same-revision A -> B -> A and every success/error identity', () => {
  const old = harness(identity(1)), b = harness(identity(2, 'B')), current = harness(identity(3))
  old.client.request(view(0)); b.client.request(view(0)); current.client.request(view(0))
  current.client.receive(old.reply(old.sent[0])); current.client.receive(b.reply(b.sent[0], true))
  expect(current.accepted).toHaveLength(0); expect(current.client.queuedCount).toBe(1)
  current.client.receive(current.reply(current.sent[0])); expect(current.accepted).toHaveLength(1)
 })
 it('stale hover never overwrites newer inspection and cannot displace a pending view', () => {
  const h = harness(); h.client.request({ kind: 'hover', step: 10 }); const old = h.sent[0]
  h.client.request(view(0)); h.client.request({ kind: 'hover', step: 20 })
  h.client.receive(h.reply(old)); expect(h.accepted).toHaveLength(0)
  expect(h.sent[1].kind).toBe('view'); h.client.receive(h.reply(h.sent[1]))
  h.client.request({ kind: 'hover', step: 30 }); const first = h.sent[2]
  h.client.request({ kind: 'hover', step: 31 }); h.client.receive(h.reply(first)); expect(h.accepted).toHaveLength(1)
  h.client.receive(h.reply(h.sent[3])); expect(h.accepted).toHaveLength(2)
 })
 it('ignores replies and errors after disposal even when transport ignores abort', () => {
  const h = harness(); h.client.request(view(0)); h.client.request(view(1)); const old = h.sent[0]
  h.client.dispose(); h.client.receive(h.reply(old, true)); h.client.request(view(2))
  expect(h.sent).toHaveLength(1); expect(h.accepted).toHaveLength(0); expect(h.client.queuedCount).toBe(0)
 })
 it('refuses a busy explicit inspection without silently evicting it, and permits retry', () => {
  const h = harness(); h.client.request({ kind: 'inspect', runId: 'A', query: { sourceIndex: 1 } })
  expect(h.client.request({ kind: 'inspect', runId: 'A', query: { sourceIndex: 2 } })).toBe(false)
  h.client.receive(h.reply(h.sent[0])); expect(h.accepted).toHaveLength(1)
  expect(h.client.request({ kind: 'inspect', runId: 'A', query: { sourceIndex: 2 } })).toBe(true)
  h.client.receive(h.reply(h.sent[1])); expect(h.accepted).toHaveLength(2)
 })
 it('returns an operation-correlated error and frees its slot if postMessage throws', () => {
  const accepted: WorkerReply[] = []
  const client = new WorkspaceController(identity(), () => { throw new Error('controlled clone failure') }, reply => accepted.push(reply))
  client.request(view(0))
  expect(accepted).toHaveLength(1); expect(accepted[0]).toMatchObject({ kind: 'error', operation: 'view', viewSeq: 1, message: 'controlled clone failure' })
  expect(client.queuedCount).toBe(0)
 })
 it('refuses an issue query behind an in-flight zoom instead of accepting and later losing it', () => {
  const h = harness(); h.client.request(view(0))
  expect(h.client.request({ kind: 'issues', runId: 'A', query: { page: 0 } })).toBe(false)
  h.client.request(view(1)); h.client.receive(h.reply(h.sent[0]))
  expect(h.sent).toHaveLength(2); expect(h.sent[1]).toMatchObject({ kind: 'view', range: { min: 1 } })
  h.client.receive(h.reply(h.sent[1]))
  expect(h.client.request({ kind: 'issues', runId: 'A', query: { page: 0 } })).toBe(true)
  expect(h.sent[2].kind).toBe('issues')
 })
 it('resize supersedes zoom and a duplicate reply cannot release a newer slot', () => {
  const h = harness(); h.client.request(view(0)); const old = h.sent[0]
  h.client.request({ ...view(1), width: 320 }); h.client.receive(h.reply(old))
  h.client.receive(h.reply(old)); expect(h.client.queuedCount).toBe(1)
  h.client.receive(h.reply(h.sent[1])); expect(h.accepted).toHaveLength(1)
 })
})
