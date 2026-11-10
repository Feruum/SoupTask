import {alignedRenderData} from '@/charts/comparison-data'
import type {MetricRenderView} from '@/data/types'
import type {AlignedMetricData} from './protocol'
export interface PackedAlignment {x:Float64Array;values:Float64Array[];flags:Uint8Array[]}
export function packAlignment(views:MetricRenderView[]){
 const [sourceX,...sourceY]=alignedRenderData(views),x=Float64Array.from(sourceX),values:Float64Array[]=[],flags:Uint8Array[]=[]
 const transfer:ArrayBuffer[]=[x.buffer]
 for(const row of sourceY){
  const numbers=new Float64Array(x.length),tags=new Uint8Array(x.length)
  for(let i=0;i<x.length;i++){const value=row[i];if(value!==undefined){tags[i]=value===null?1:2;if(value!==null)numbers[i]=value}}
  values.push(numbers);flags.push(tags);transfer.push(numbers.buffer,tags.buffer)
 }
 return {data:{x,values,flags},transfer}
}
/** Linear provenance validation, without main-thread Set/Map construction or sorting. */
export function unpackAlignment(packed:PackedAlignment,views:MetricRenderView[]):{data:AlignedMetricData;bytes:number}{
 if(!packed||!(packed.x instanceof Float64Array)||packed.x.length<2||packed.x.length>262146||packed.values.length!==views.length||packed.flags.length!==views.length)throw Error('Invalid prepared alignment shape')
 const {x}=packed,sourceAt=new Uint8Array(x.length),rows:(number|null|undefined)[][]=[]
 let bytes=x.byteLength
 for(let i=0;i<x.length;i++)if(!Number.isFinite(x[i])||(i>0&&x[i]<=x[i-1]))throw Error('Invalid prepared alignment X')
 for(let s=0;s<views.length;s++){
  const numbers=packed.values[s],tags=packed.flags[s],view=views[s],row:(number|null|undefined)[]=new Array(x.length)
  if(!(numbers instanceof Float64Array)||!(tags instanceof Uint8Array)||numbers.length!==x.length||tags.length!==x.length)throw Error('Invalid prepared alignment columns')
  let p=0
  for(let i=0;i<x.length;i++){
   const point=view.points[p]
   if(point&&point.step<x[i])throw Error('Prepared alignment omitted an original point')
   const present=point?.step===x[i]
   if(present){sourceAt[i]=1;p++}
   const expected=present&&view.mode!=='disconnected-extrema'?point.value:undefined
   if(tags[i]===2){if(expected===undefined||!Number.isFinite(numbers[i])||!Object.is(numbers[i],expected))throw Error('Prepared alignment value has no matching source');row[i]=numbers[i]}
   else if(tags[i]===0){if(expected!==undefined)throw Error('Prepared alignment dropped an original source value');row[i]=undefined}
   else if(tags[i]===1){if(present||!view.breaks.some(gap=>gap.from<x[i]&&x[i]<gap.to))throw Error('Prepared alignment fabricated a gap');row[i]=null}
   else throw Error('Invalid prepared alignment flag')
  }
  if(p!==view.points.length)throw Error('Prepared alignment omitted original points')
  rows.push(row);bytes+=numbers.byteLength+tags.byteLength
 }
 const first=views.find(view=>view.points.length)?.points[0]?.step
 const empty=first===undefined,one=first!==undefined&&views.every(view=>view.points.every(point=>point.step===first))
 const padding=first===undefined?0:Math.max(1,Math.abs(first)*.001)
 if(empty){if(x.length!==2||x[0]!==0||x[1]!==1)throw Error('Invalid empty alignment domain')}
 else if(one){if(x.length!==3||x[0]!==first!-padding||x[1]!==first||x[2]!==first!+padding)throw Error('Invalid singleton alignment padding')}
 else if(sourceAt.some(present=>!present))throw Error('Prepared alignment fabricated a coordinate')
 return {data:[x,...rows],bytes}
}
