import { describe, expect, it } from 'vitest'
import { packReply, unpackReply } from './wire'
import type { PackedViewReply } from './wire'
import type { WorkerReply } from './protocol'
import type { MetricRenderView } from '@/data/types'
const metric = (): MetricRenderView => ({ points: [{ sourceIndex:0,step:0,value:-0,segment:0 },{ sourceIndex:500001,step:500001,value:100,segment:1 }], conflicts:[{sourceIndex:500002,step:500002,value:1e-300,segment:1}], breaks:[{from:1,to:2,kind:'invalid'}], mode:'line', min:-0,max:100,rawCount:6,representedCount:3 })
const view = (): Extract<WorkerReply,{kind:'view'}> => ({ kind:'view', identity:{workspaceEpoch:1,selectionKey:'A:1',members:[{runId:'A',revision:'1',activationEpoch:1}]},requestId:2,viewSeq:3,hoverSeq:4,inspectSeq:5,view:{viewSeq:3,range:{min:0,max:999999},runs:{A:{loss:metric(),lr:metric(),grad_norm:metric()}}} })
describe('disposable render wire buffers',()=>{
 it('transfers the actual numeric columns and preserves exact provenance including signed zero',()=>{
  const original=view(),packed=packReply(original)
  expect(packed.transfer).toHaveLength(15)
  expect(packed.message.kind).toBe('view-packed')
  const message=packed.message as PackedViewReply
  expect(message.view.runs.A.loss).not.toHaveProperty('points')
  expect(message.view.runs.A.loss.pointColumns).toBeInstanceOf(Float64Array)
  const expectedBytes=packed.transfer.reduce((sum,buffer)=>sum+buffer.byteLength,0)
  expect(message.renderBufferBytes).toBe(expectedBytes)
  const received=structuredClone(message,{transfer:packed.transfer})
  expect(packed.transfer.every(buffer=>buffer.byteLength===0)).toBe(true)
  const decoded=unpackReply(received)
  expect(decoded).toMatchObject(original)
  if(decoded.kind!=='view')throw Error('Missing view')
  expect(Object.is(decoded.view.runs.A.loss.points[0].value,-0)).toBe(true)
  expect(original.view.runs.A.loss.points[1].value).toBe(100)
 })
 it('does not encode or transfer source rows, activation metadata or errors',()=>{
  const original=view()
  const error:WorkerReply={...original,kind:'error',operation:'view',message:'expected'}
  expect(packReply(error)).toEqual({message:error,transfer:[]})
  expect(unpackReply(error)).toBe(error)
 })
 it('rejects malformed lengths, nonfinite values, wrong membership and dishonest counts',()=>{
  const packed=()=>packReply(view()).message as PackedViewReply
  const length=packed();length.view.runs.A.loss.pointColumns=new Float64Array(3)
  expect(()=>unpackReply(length)).toThrow(/columns/)
  const nonfinite=packed();nonfinite.view.runs.A.loss.pointColumns[2]=NaN
  expect(()=>unpackReply(nonfinite)).toThrow(/source point/)
  const membership=packed();membership.identity.members=[]
  expect(()=>unpackReply(membership)).toThrow(/membership/)
  const counts=packed();counts.view.runs.A.loss.representedCount=99
  expect(()=>unpackReply(counts)).toThrow(/counts/)
  const extrema=packed();extrema.view.runs.A.loss.max=101
  expect(()=>unpackReply(extrema)).toThrow(/extrema/)
 })
})
