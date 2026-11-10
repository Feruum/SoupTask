import { expect, it } from 'vitest'
import { WorkspaceController } from './controller'
import type { WorkerRequest, WorkerReply, WorkspaceIdentity } from './protocol'

function scope(epoch: number, ids: string[], revision = 'r1'): WorkspaceIdentity {
  return { workspaceEpoch: epoch, selectionKey: ids.map(id => `${id}:${revision}`).join('|'), members: ids.map(runId => ({ runId, revision, activationEpoch: epoch })) }
}
function gate(identity: WorkspaceIdentity) {
  const posted: WorkerRequest[] = [], committed: WorkerReply[] = []
  const controller = new WorkspaceController(identity, request => posted.push(request), reply => committed.push(reply))
  const resolve = (request: WorkerRequest, error = false) => controller.receive({ identity: request.identity, requestId: request.requestId, viewSeq: request.viewSeq, hoverSeq: request.hoverSeq, inspectSeq: request.inspectSeq, ...(error ? { kind: 'error', operation: request.kind, message: 'late controlled error' } : { kind: 'rows', rows: [] }) })
  const view = () => controller.request({ kind: 'view', range: { min: 0, max: 10 }, width: 320, mode: 'indexed' })
  return { controller, posted, committed, resolve, view }
}

it('A to B to C accepts only the final workspace, including late errors', () => {
  const workspaces = [gate(scope(1, ['A'])), gate(scope(2, ['B'])), gate(scope(3, ['C']))]
  workspaces.forEach(item => item.view())
  const current = workspaces[2]
  current.resolve(workspaces[0].posted[0]); current.resolve(workspaces[1].posted[0], true)
  expect(current.committed).toEqual([])
  current.resolve(current.posted[0]); expect(current.committed).toHaveLength(1)
  current.resolve(workspaces[0].posted[0], true); expect(current.committed).toHaveLength(1)
})

it('a revision change rejects a response even when epoch and run ID coincide', () => {
  const previous = gate(scope(7, ['A'], 'old')), current = gate(scope(7, ['A'], 'new'))
  previous.view(); current.view()
  current.resolve(previous.posted[0]); current.resolve(previous.posted[0], true)
  expect(current.committed).toEqual([])
  current.resolve(current.posted[0]); expect(current.committed).toHaveLength(1)
})

it('Compare add/remove and return to the same members cannot commit the old batch', () => {
  const original = gate(scope(10, ['A', 'B'])), expanded = gate(scope(11, ['A', 'B', 'C'])), reduced = gate(scope(12, ['A', 'B']))
  original.view(); expanded.view(); reduced.view()
  reduced.resolve(expanded.posted[0]); reduced.resolve(original.posted[0], true)
  expect(reduced.committed).toEqual([])
  reduced.resolve(reduced.posted[0]); expect(reduced.committed).toHaveLength(1)
  reduced.resolve(expanded.posted[0], true); expect(reduced.committed).toHaveLength(1)
})

it('late error after current success and responses after unmount preserve accepted state', () => {
  const current = gate(scope(21, ['A', 'B']))
  current.view(); const view = current.posted[0]
  current.resolve(view); current.resolve(view, true)
  expect(current.committed).toHaveLength(1)
  current.controller.request({ kind: 'hover', step: 4 })
  const hover = current.posted[1]
  current.controller.dispose(); current.resolve(hover); current.resolve(hover, true)
  expect(current.committed).toHaveLength(1)
  expect(current.controller.queuedCount).toBe(0)
})
