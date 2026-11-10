import { afterEach, describe, expect, it, vi } from 'vitest'
import { RUNS } from '@/data/catalog'
import type { WorkerReply, WorkerRequest, Operation, WorkspaceIdentity } from './protocol'
import { unpackReply } from './wire'
import type { WireReply } from './wire'
afterEach(() => vi.unstubAllGlobals())
describe('Worker ownership and small replies', () => {
 it('keeps the sole 1M source store after views and returns exact source rows, never raw columns', async () => {
  const replies: WorkerReply[] = []
  let transferredBytes = 0, detachedBuffers = 0
  const fake: { postMessage: (reply: WireReply, transfer: ArrayBuffer[]) => void; onmessage?: (event: { data: WorkerRequest }) => void } = { postMessage: (reply, transfer) => {
    transferredBytes += transfer.reduce((sum, buffer) => sum + buffer.byteLength, 0)
    const received = structuredClone(reply, { transfer })
    detachedBuffers += transfer.filter(buffer => buffer.byteLength === 0).length
    replies.push(unpackReply(received))
  } }
  vi.stubGlobal('self', fake)
  await import('./training.worker')
  const run = RUNS[4]
  const identity: WorkspaceIdentity = { workspaceEpoch: 101, selectionKey: run.id, members: [{ runId: run.id, revision: run.revision, activationEpoch: 101 }] }
  let requestId = 0
  const ask = (operation: Operation) => {
   fake.onmessage?.({ data: { ...operation, identity, requestId: ++requestId, viewSeq: 3, hoverSeq: 4, inspectSeq: 5 } })
   return replies[replies.length - 1]
  }
  const ready = ask({ kind: 'activate', runs: [run], mode: 'indexed' })
  expect(ready.kind).toBe('activated')
  if (ready.kind !== 'activated') throw new Error('Activation failed')
  expect(ready.runs[run.id].rawBufferBytes).toBe(32_000_000)
  expect(ready.runs[run.id].allocationBytes).toBeGreaterThanOrEqual(32_000_000)
  expect(ready.runs[run.id].indexBufferBytes).toBeGreaterThan(0)
  expect(ready.runs[run.id].indexBuildMs).toBeGreaterThanOrEqual(0)
  const view = ask({ kind: 'view', range: { min: 0, max: 999999 }, width: 320, mode: 'indexed' })
  expect(view.kind).toBe('view')
  expect(view).not.toHaveProperty('columns')
  expect(transferredBytes).toBeGreaterThan(0)
  expect(transferredBytes).toBeLessThan(32_000_000)
  expect(detachedBuffers).toBe(15) // six source-point columns plus nine prepared X/value/flag columns
  if (view.kind !== 'view') throw new Error('View failed')
  expect(view.view.runs[run.id].loss.points.length).toBeLessThanOrEqual(1280)
  expect(view.view.runs[run.id].loss.points).toContainEqual(expect.objectContaining({ sourceIndex: 500001, step: 500001, value: 100 }))
  const prepared=ask({kind:'prepare-hover',steps:[0,123.25,500001]})
  expect(prepared.kind).toBe('hover-prepared')
  if(prepared.kind!=='hover-prepared')throw Error('Source preparation failed')
  expect(prepared.samples.get(500001)?.[run.id][0]).toMatchObject({sourceIndex:500001,step:500001,loss:100})
  expect(prepared).not.toHaveProperty('raw')
  expect(detachedBuffers).toBe(15)
  const inspected = ask({ kind: 'inspect', runId: run.id, query: { sourceIndex: 500001 } })
  expect(inspected).toMatchObject({ kind: 'inspect', rows: [{ sourceIndex: 500001, step: 500001, loss: 100 }] })
  const rows = ask({ kind: 'rows', runId: run.id, page: 10000 })
  expect(rows.kind).toBe('rows')
  expect(rows).toMatchObject({ runId: run.id, page: 10000 })
  if (rows.kind === 'rows') { expect(rows.rows).toHaveLength(50); expect(rows.rows[0].sourceIndex).toBe(500000); expect(rows.rows[1].loss).toBe(100) }
  const issues = ask({ kind: 'issues', runId: run.id, query: { metric: 'loss', kind: 'nan', page: 3 } })
  expect(issues).toMatchObject({ kind: 'issues', runId: run.id, total: 0, rows: [], query: { metric: 'loss', kind: 'nan', page: 3, pageSize: 50 } })
  const failure = ask({ kind: 'view', range: { min: Number.NaN, max: 1 }, width: 320, mode: 'stream' })
  expect(failure).toMatchObject({ kind: 'error', identity, viewSeq: 3, hoverSeq: 4, inspectSeq: 5, requestId, operation: 'view' })
  const afterFailure = ask({ kind: 'inspect', runId: run.id, query: { sourceIndex: 500001 } })
  expect(afterFailure).toMatchObject({ kind: 'inspect', rows: [{ loss: 100 }] })
  ask({ kind: 'view', range: { min: 500001, max: 500001 }, width: 320, mode: 'indexed' })
  const outside = ask({ kind: 'hover', step: 500000 })
  expect(outside).toMatchObject({ kind: 'hover', observations: { [run.id]: [] } })
  expect(ask({ kind: 'hover', step: 500001 })).toMatchObject({ kind: 'hover', observations: { [run.id]: [{ sourceIndex: 500001, loss: 100 }] } })
  ask({ kind: 'view', range: { min: 500001.1, max: 999999 }, width: 320, mode: 'indexed' })
  expect(ask({ kind: 'hover', step: 500001.1 })).toMatchObject({ kind: 'hover', observations: { [run.id]: [{ sourceIndex: 500002 }] } })
  ask({ kind: 'view', range: { min: 500000.1, max: 500000.9 }, width: 320, mode: 'indexed' })
  expect(ask({ kind: 'hover', step: 500000.5 })).toMatchObject({ kind: 'hover', observations: { [run.id]: [] } })
  ask({ kind: 'activate', runs: [] })
 })
})
