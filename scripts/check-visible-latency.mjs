import assert from 'node:assert/strict'
import {readFile,writeFile} from 'node:fs/promises'
const args=process.argv.slice(2),files=args.filter(value=>!value.startsWith('--')),single=args.includes('--single')
const output=args.find(value=>value.startsWith('--out='))?.slice(6)
assert(output,'Provide --out=<fresh.json>');assert.equal(files.length,single?1:2,'Use two confirmation runs, or explicit --single diagnosis')
const load=async file=>JSON.parse(await readFile(file,'utf8'))
const reports=await Promise.all(files.map(load)),starts=await Promise.all(files.map(file=>load(file.replace(/results\.json$/,'run-start.json'))))
const percentile=values=>[...values].sort((a,b)=>a-b)[Math.ceil(values.length*.95)-1]
for(const [index,report]of reports.entries()){
 assert.equal(report.sourceUnchanged,true);assert.equal(report.environment.traceMode,'full');assert.equal(report.environment.cpuRate,4)
 assert.equal(report.environment.viewport,'1440x900');assert.equal(report.environment.dpr,1)
 assert.equal(report.sourceHash,reports[0].sourceHash);assert.equal(starts[index].harnessHash,starts[0].harnessHash)
 const summary=report.summary.indexed
 assert.equal(summary.cold.count,5);assert.equal(summary.hoverInputFrame.count,30);assert.equal(summary.compare.hoverInputFrame.count,30)
 assert.equal(summary.continuous.count,30);assert.equal(summary.compare.continuous.count,30)
 for(const workspace of [report.samples.find(sample=>sample.interactions.length),report.comparisons[0]]){
  assert.equal(workspace.interactions.length,30);assert.equal(workspace.continuous.length,30)
  for(const record of [...workspace.interactions.map(item=>item.frameEvidence),...workspace.continuous]){
   assert(record.cells.length&&record.cells.every(cell=>cell.visible&&cell.text?.trim()),'Actual source text must pass independent viewport/clipping/center checks')
   const frame=record.frame,detail=frame.detail
   assert(detail.visibility.length&&detail.visibility.every(result=>result.visible),'Frame visibility acknowledgement missing')
   assert.equal(detail.hoverSeq,record.hoverSeq)
   assert(record.commit.startTime<=detail.firstCheckedAt&&detail.firstCheckedAt<frame.startTime,'Committed current DOM must precede BOTH frame checks')
  }
 }
 assert.equal(summary.hoverInputFrame.p95,percentile(report.samples.flatMap(sample=>sample.hoverInputFrame)))
 assert.equal(summary.compare.hoverInputFrame.p95,percentile(report.comparisons[0].hoverInputFrame))
}
const extract=report=>{const s=report.summary.indexed;return{cold:s.cold.p95,detailZoom:s.zoom.p95,detailHover:s.hoverInputFrame.p95,compareZoom:s.compare.zoom.p95,compareHover:s.compare.hoverInputFrame.p95,detailContinuous:s.continuous.hoverInputFrame.p95,compareContinuous:s.compare.continuous.hoverInputFrame.p95}}
const values=reports.map(extract),limits={cold:3000,detailZoom:200,detailHover:50,compareZoom:200,compareHover:50,detailContinuous:50,compareContinuous:50}
const targets=Object.fromEntries(Object.entries(limits).map(([name,limitMs])=>[name,{limitMs,actualMs:Math.max(...values.map(value=>value[name]))}]))
const misses=Object.entries(targets).filter(([,value])=>value.actualMs>value.limitMs).map(([name])=>name)
const result={verified:true,confirmed:!single,inputs:files,sourceHash:reports[0].sourceHash,harnessHash:starts[0].harnessHash,values,targets,misses,scope:'Nearest-rank p95. Worst of independently reported same-source full Chrome traces; no pooling. Current source DOM before BOTH RAF checks, complete text bounds and sampled cell-center occlusion. Continuous movement remains separate from range-form -> chart entry. Single-run mode is diagnostic only.'}
await writeFile(output,JSON.stringify(result,null,2),{flag:'wx'})
console.log(JSON.stringify({confirmed:result.confirmed,targets,misses},null,2));if(misses.length)process.exitCode=1
