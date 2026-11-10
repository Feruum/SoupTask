import {performanceMark} from '@/app/performance'
import {useLayoutEffect} from 'react'
import {inspectHoverVisibility} from './hover-visibility'
type Frame={key:string;epoch:number;viewSeq:number;hoverSeq:number;step:number;committed:boolean;first:number;second:number;firstCheckedAt:number;cancel:()=>void}
let pending:Frame|null=null,lastAcknowledged=''
function arm(viewSeq:number,hoverSeq:number,hoverStep:number|null):Frame|undefined {
 const evidence=window.__soupEvidence,timing=evidence?.hoverTiming
 if(!evidence||!timing||hoverStep===null||!hoverSeq||timing.hoverSeq!==hoverSeq||timing.viewSeq!==viewSeq)return
 const key=`${evidence.workspaceEpoch}:${viewSeq}:${hoverSeq}`
 if(key===lastAcknowledged)return
 if(pending?.key===key)return pending
 pending?.cancel()
 const frame:Frame={key,epoch:evidence.workspaceEpoch,viewSeq,hoverSeq,step:hoverStep,committed:false,first:0,second:0,firstCheckedAt:0,cancel:()=>{cancelAnimationFrame(frame.first);cancelAnimationFrame(frame.second);if(pending===frame)pending=null}}
 pending=frame
 frame.first=requestAnimationFrame(()=>{
  // Scheduling is early; the endpoint still requires DOM commit before BOTH frame callbacks.
  if(!frame.committed){frame.cancel();return}
  frame.firstCheckedAt=performance.now()
  frame.second=requestAnimationFrame(()=>{
   const current=window.__soupEvidence
   if(current?.workspaceEpoch!==frame.epoch||current.viewSeq!==viewSeq||current.acceptedHoverSeq!==hoverSeq){frame.cancel();return}
   const tooltips=[...document.querySelectorAll<HTMLElement>(`.chart-hover-value[data-hover-seq="${hoverSeq}"]`)]
   const verificationStarted=performance.now(),visibility=tooltips.map(inspectHoverVisibility),verificationMs=performance.now()-verificationStarted
   if(!tooltips.length||visibility.some(result=>!result.visible)){performanceMark('soup:hover-not-visible',{detail:{workspaceEpoch:frame.epoch,viewSeq,hoverSeq,visibility}});frame.cancel();return}
   performanceMark('soup:hover-frame',{detail:{workspaceEpoch:frame.epoch,viewSeq,hoverSeq,step:hoverStep,requestToAcceptedMs:timing.acceptedAt-timing.requestStartedAt,requestToFrameMs:performance.now()-timing.requestStartedAt,firstCheckedAt:frame.firstCheckedAt,tooltipCount:tooltips.length,verificationMs,visibility}})
   lastAcknowledged=key;frame.cancel()
  })
 })
 return frame
}
/** Queue the frame before synchronous leaf writes, without acknowledging an uncommitted DOM. */
export function beginHoverPaint(viewSeq:number,hoverSeq:number,hoverStep:number|null){arm(viewSeq,hoverSeq,hoverStep)}
export function recordHoverPaint(viewSeq:number,hoverSeq:number,hoverStep:number|null){
 const frame=arm(viewSeq,hoverSeq,hoverStep);if(!frame)return
 frame.committed=true
 performanceMark('soup:hover-dom-commit',{detail:{workspaceEpoch:frame.epoch,viewSeq,hoverSeq,step:hoverStep}})
 return frame.cancel
}
export function useHoverPaint(selectionKey:string,viewSeq:number,hoverSeq:number,hoverStep:number|null){
 useLayoutEffect(()=>recordHoverPaint(viewSeq,hoverSeq,hoverStep),[selectionKey,viewSeq,hoverSeq,hoverStep])
}
