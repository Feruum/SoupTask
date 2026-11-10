import {lowerBound,upperBound,inspectStep} from '@/core/engine'
import type {NormalizedRun} from '@/core/engine'
import type {SourceRow} from '@/data/types'
import type {StepRange,HoverSamples} from './protocol'
export const MAX_HOVER_TARGETS=8192
export const MAX_HOVER_ROWS=16384
export function nearestSourceStep(n:NormalizedRun,target:number,range:StepRange,width:number):number|null {
 if(!Number.isFinite(target)||!n.x.length||target<range.min||target>range.max||target<n.x[0]||target>n.x[n.x.length-1])return null
 const begin=lowerBound(n.x,range.min),end=upperBound(n.x,range.max)
 if(begin===end)return null
 const low=lowerBound(n.x,target)
 if(n.x[low]===target)return target
 if(low>0&&low<n.x.length&&n.cadence!==undefined&&n.x[low]-n.x[low-1]>n.cadence)return null
 const nearest=low===n.x.length?low-1:low>0&&target-n.x[low-1]<=n.x[low]-target?low-1:low
 const index=Math.max(begin,Math.min(end-1,nearest))
 return Math.abs(n.x[index]-target)>(range.max-range.min)/width*8?null:n.x[index]
}
export function nearestRows(n:NormalizedRun,target:number,range:StepRange,width:number):SourceRow[]{
 const step=nearestSourceStep(n,target,range,width);return step===null?[]:inspectStep(n,step)
}
/** One accepted viewport only. Exact source rows, never metric interpolation or a raw-column copy. */
export function prepareHoverSamples(stores:Map<string,NormalizedRun>,steps:number[],range:StepRange,width:number){
 if(steps.length>MAX_HOVER_TARGETS||steps.some(step=>!Number.isFinite(step)))throw Error('Invalid source cursor targets')
 const samples:HoverSamples=new Map(),rowsByRun=new Map<string,Map<number,SourceRow[]>>()
 let rowCount=0
 for(const step of new Set(steps)){
  const observations:Record<string,SourceRow[]>={};let complete=true
  for(const [id,n]of stores){
   const sourceStep=nearestSourceStep(n,step,range,width)
   if(sourceStep===null){observations[id]=[];continue}
   let byStep=rowsByRun.get(id);if(!byStep){byStep=new Map();rowsByRun.set(id,byStep)}
   let rows=byStep.get(sourceStep)
   if(!rows){rows=inspectStep(n,sourceStep);if(rowCount+rows.length>MAX_HOVER_ROWS){complete=false;break}rowCount+=rows.length;byStep.set(sourceStep,rows)}
   observations[id]=rows
  }
  if(complete)samples.set(step,observations)
 }
 const returned=new Set<SourceRow>();for(const record of samples.values())for(const rows of Object.values(record))for(const row of rows)returned.add(row)
 return {samples,rowCount:returned.size}
}
