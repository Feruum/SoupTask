import {expect,it} from 'vitest'
import {WorkspaceController} from './controller'
import type {WorkerRequest,WorkerReply,WorkspaceIdentity} from './protocol'
const identity=(epoch=1):WorkspaceIdentity=>({workspaceEpoch:epoch,selectionKey:'A:one',members:[{runId:'A',revision:'one',activationEpoch:epoch}]})
it('publishes exact prepared source rows only for an idle matching accepted workspace/view',()=>{
 const sent:WorkerRequest[]=[],accepted:WorkerReply[]=[],scope=identity(),client=new WorkspaceController(scope,r=>sent.push(r),r=>accepted.push(r))
 const cache=client as WorkspaceController&{hoverFromCache?:(identity:WorkspaceIdentity,viewSeq:number,step:number,rows:Record<string,{sourceIndex:number;step:number;loss:number;lr:number;grad_norm:number}[]>)=>boolean}
 expect(cache.hoverFromCache).toBeTypeOf('function')
 if(!cache.hoverFromCache)return
 const rows={A:[{sourceIndex:12,step:12,loss:0,lr:1e-10,grad_norm:NaN}]}
 expect(cache.hoverFromCache(scope,0,12,rows)).toBe(false)
 client.request({kind:'view',range:{min:0,max:100},width:800,mode:'indexed'})
 const request=sent[0]
 client.receive({...request,kind:'view',view:{viewSeq:request.viewSeq,range:{min:0,max:100},runs:{}}} as WorkerReply)
 expect(cache.hoverFromCache(identity(3),request.viewSeq,12,rows)).toBe(false)
 expect(cache.hoverFromCache(scope,request.viewSeq,12,rows)).toBe(true)
 expect(sent).toHaveLength(1)
 expect(accepted.at(-1)).toMatchObject({kind:'hover',step:12,observations:rows})
 client.request({kind:'view',range:{min:200,max:300},width:800,mode:'indexed'})
 expect(cache.hoverFromCache(scope,request.viewSeq,12,rows)).toBe(false)
 client.dispose();expect(cache.hoverFromCache(scope,request.viewSeq,12,rows)).toBe(false)
})
