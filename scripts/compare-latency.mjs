import assert from 'node:assert/strict'
import {readFile,writeFile} from 'node:fs/promises'
const root=process.env.PERF_COMPARISON_ROOT??'reports/perf-targets-2026-11-10'
const inputs={before:process.env.PERF_COMPARISON_BEFORE??`${root}/before-trace-performance/results.json`,after:process.env.PERF_COMPARISON_AFTER??`${root}/one-row-performance/results.json`,confirmation:process.env.PERF_COMPARISON_CONFIRMATION??`${root}/final-trace-performance/results.json`,withoutRecording:process.env.PERF_COMPARISON_NO_TRACE??`${root}/final-latency-performance/results.json`}
const load=async file=>JSON.parse(await readFile(file,'utf8'))
const reports=Object.fromEntries(await Promise.all(Object.entries(inputs).map(async([name,file])=>[name,await load(file)])))
const starts=await Promise.all(['before','after','confirmation'].map(name=>load(inputs[name].replace('results.json','run-start.json'))))
for(const name of ['before','after','confirmation']){
 const report=reports[name],summary=report.summary.indexed
 assert.equal(report.sourceUnchanged,true,`${name}: source changed`)
 assert.equal(report.environment.traceMode,'full',`${name}: observer regimes must match`)
 for(const key of ['node','browser','os','release','cpu','lockHash','viewport','dpr','cpuRate'])assert.deepEqual(report.environment[key],reports.after.environment[key],`${name}: ${key} differs`)
 assert.equal(summary.cold.count,5);assert.equal(summary.zoom.count,30);assert.equal(summary.hoverInputFrame.count,30);assert.equal(summary.compare.zoom.count,30);assert.equal(summary.compare.hoverInputFrame.count,30)
 assert.equal(report.comparisons[0].members.join(','),'kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 const p95=values=>[...values].sort((a,b)=>a-b)[Math.ceil(values.length*.95)-1]
 assert.equal(summary.hoverInputFrame.p95,p95(report.samples.flatMap(sample=>sample.hoverInputFrame)))
 assert.equal(summary.compare.hoverInputFrame.p95,p95(report.comparisons[0].hoverInputFrame))
}
assert(starts.every(start=>start.harnessHash===starts[0].harnessHash),'Before/after/confirmation harnesses differ')
assert.equal(reports.after.sourceHash,reports.confirmation.sourceHash,'Confirmation application source differs')
assert.equal(reports.after.sourceHash,reports.withoutRecording.sourceHash,'Trace/no-trace application sources differ')
assert.equal(reports.withoutRecording.environment.traceMode,'off')
const extract=report=>{const s=report.summary.indexed;return{cold:s.cold.p95,zoom:s.zoom.p95,hover:s.hoverInputFrame.p95,compareZoom:s.compare.zoom.p95,compareHover:s.compare.hoverInputFrame.p95}}
const values=Object.fromEntries(Object.entries(reports).map(([name,report])=>[name,extract(report)])),limits={cold:3000,zoom:200,hover:50,compareZoom:200,compareHover:50}
const targets=Object.fromEntries(Object.entries(limits).map(([name,limitMs])=>[name,{limitMs,actualMs:Math.max(values.after[name],values.confirmation[name]),scope:'Worst of two separately reported nearest-rank p95 results; samples are not pooled'}]))
const misses=Object.entries(targets).filter(([,result])=>result.actualMs>result.limitMs).map(([name])=>name)
const result={verified:true,generatedAt:new Date().toISOString(),baselineGitCommit:process.env.PERF_BASELINE_COMMIT??'9206963ddca22dae4ee0086bf820edffd525a848',baselineScope:process.env.PERF_BASELINE_SCOPE??'Clean isolated build of the previous committed source using the same installed dependencies and current harness, rather than pretending it is the historical deployed asset build.',inputs,harnessHash:starts[0].harnessHash,sourceHashes:Object.fromEntries(Object.entries(reports).map(([name,report])=>[name,report.sourceHash])),environment:reports.after.environment,values,targets,engineeringTargetMisses:misses,scope:'Full Chrome recording including frame screenshots: CPU4 main renderer, Worker throttling unsupported. Same5 cold contexts and30 range/hover pairs per workspace, original pointer timestamp and committed source DOM before two RAF callbacks. Targets use the worse of two full-recording p95 results; samples are never pooled. A separate no-recording result uses exactly the same application source. Sequential shared-machine runs are not a randomized causal study.'}
await writeFile(`${root}/latency-comparison.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({verified:true,values,engineeringTargetMisses:misses},null,2))
if(misses.length)process.exitCode=1
