import {expect,it} from 'vitest'
import {packReply,unpackReply} from './wire'
import type {WorkerReply} from './protocol'
import type {MetricRenderView} from '@/data/types'
const metric=(steps:number[],values:number[]):MetricRenderView=>({points:steps.map((step,i)=>({sourceIndex:i,step,value:values[i],segment:i})),conflicts:[],breaks:[],mode:'line',min:Math.min(...values),max:Math.max(...values),rawCount:steps.length,representedCount:steps.length})
const view=():Extract<WorkerReply,{kind:'view'}>=>{
 const a=metric([0,10],[-0,100]),b=metric([5,15],[3,4])
 return {kind:'view',identity:{workspaceEpoch:1,selectionKey:'A:one|B:one',members:['A','B'].map(runId=>({runId,revision:'one',activationEpoch:1}))},requestId:1,viewSeq:1,hoverSeq:0,inspectSeq:0,view:{viewSeq:1,range:{min:0,max:15},runs:{A:{loss:a,lr:a,grad_norm:a},B:{loss:b,lr:b,grad_norm:b}}}}
}
it('prepares bounded comparison alignment in the Worker and preserves foreign slots through transfer',()=>{
 const packed=packReply(view())
 if(packed.message.kind!=='view-packed')throw Error('Missing view packet')
 expect(packed.message.view).toHaveProperty('alignment')
 const decoded=unpackReply(structuredClone(packed.message,{transfer:packed.transfer}))
 expect(decoded.kind).toBe('view')
 if(decoded.kind!=='view')return
 const data=decoded.view.alignment!.loss
 expect(Array.from(data[0])).toEqual([0,5,10,15])
 expect(data[1]).toEqual([-0,undefined,100,undefined])
 expect(data[2]).toEqual([undefined,3,undefined,4])
 expect(Object.is(data[1][0],-0)).toBe(true)
})
it('rejects a fabricated zero, altered peak, dropped source and false gap in prepared data',()=>{
 const packed=()=>{const result=packReply(view()).message;if(result.kind!=='view-packed')throw Error('Missing packet');return result}
 const zero=packed();zero.view.alignment.loss.flags[0][1]=2;zero.view.alignment.loss.values[0][1]=0
 expect(()=>unpackReply(zero)).toThrow(/matching source/)
 const peak=packed();peak.view.alignment.loss.values[0][2]=99
 expect(()=>unpackReply(peak)).toThrow(/matching source/)
 const dropped=packed();dropped.view.alignment.loss.flags[0][2]=0
 expect(()=>unpackReply(dropped)).toThrow(/dropped/)
 const gap=packed();gap.view.alignment.loss.flags[0][1]=1
 expect(()=>unpackReply(gap)).toThrow(/fabricated a gap/)
})
