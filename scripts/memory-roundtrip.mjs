import {chromium} from '@playwright/test'
import {spawn} from 'node:child_process'
import {mkdir,writeFile,readFile} from 'node:fs/promises'
import {createWriteStream} from 'node:fs'
import {createGzip,gzipSync} from 'node:zlib'
import {finished} from 'node:stream/promises'
import {createHash} from 'node:crypto'
const out=process.env.ROUNDTRIP_OUT??'reports/memory-investigation-2026-11-10/roundtrip'
const counts=(process.env.ROUNDTRIP_CASES??'1,20,60').split(',').map(Number),drag=process.env.ROUNDTRIP_DRAG==='true'
if(counts.some(n=>!Number.isInteger(n)||n<1||n>60))throw Error('Use1..60 workload rounds')
await mkdir(out,{recursive:true})
const metadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
await writeFile(`${out}/run-start.json`,JSON.stringify({startedAt:new Date().toISOString(),sourceCommit:metadata.git.commit,sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,scope:'MemLab-style(B→T→F) candidate analysis plus MemoryInfra. Heap snapshots imply GC; never substitute this diagnostic for natural-GC footprint or latency.'},null,2),{flag:'wx'})
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4196'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
let browser,tracing=false
const samples=[],cases=[]
try{
 browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:900},locale:'en-US',timezoneId:'Asia/Qyzylorda'}),cdp=await page.context().newCDPSession(page),root=await browser.newBrowserCDPSession()
 await cdp.send('HeapProfiler.enable')
 const ids=['kazakh-sft-005','kazakh-sft-001','kazakh-sft-002','kazakh-sft-006']
 const base='/memory-roundtrip-baseline',compare=`/compare?runs=${ids.join(',')}`
 async function route(url,members){
  await page.evaluate(url=>{history.pushState(null,'',url);dispatchEvent(new PopStateEvent('popstate'))},url)
  if(members)await page.waitForFunction(expected=>window.__soupEvidence?.members.join(',')===expected&&window.__soupEvidence?.hoverCacheTargets&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3,members.join(','),{timeout:60000})
  else{await page.waitForFunction(()=>!window.__soupEvidence&&document.querySelector('h1')?.textContent==='Not found');for(let i=0;page.workers().length&&i<40;i++)await page.waitForTimeout(50);if(page.workers().length)throw Error('Worker retained after returning to baseline')}
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))))
 }
 async function snapshot(label){
  const gzip=createGzip(),file=createWriteStream(`${out}/${label}.heapsnapshot.gz`,{flags:'wx'});gzip.pipe(file)
  const listener=event=>gzip.write(event.chunk);cdp.on('HeapProfiler.addHeapSnapshotChunk',listener)
  try{await cdp.send('HeapProfiler.takeHeapSnapshot',{reportProgress:false})}finally{cdp.off('HeapProfiler.addHeapSnapshotChunk',listener);gzip.end();await finished(file)}
  const before=`soup:infra-begin:${label}`,after=`soup:infra-end:${label}`
  await page.evaluate(name=>performance.mark(name),before)
  const dump=await root.send('Tracing.requestMemoryDump',{deterministic:false,levelOfDetail:'detailed'});if(!dump.success)throw Error('MemoryInfra dump failed')
  await page.evaluate(name=>performance.mark(name),after)
  const sample={label,snapshot:`${label}.heapsnapshot.gz`,before,after,dump,heap:await cdp.send('Runtime.getHeapUsage'),dom:await cdp.send('Memory.getDOMCounters'),workers:page.workers().length,workspace:await page.evaluate(()=>window.__soupEvidence??null)}
  samples.push(sample);await writeFile(`${out}/samples.partial.json`,JSON.stringify(samples,null,2));console.log(`Captured ${label}, Workers${sample.workers}`)
 }
 await page.goto(`http://127.0.0.1:4196${base}`)
 // Warm route modules once; persistent loaded code is not a widget leak.
 await route('/runs/kazakh-sft-005',[ids[0]]);await route(compare,ids);await route(base)
 await browser.startTracing(page,{categories:['blink.user_timing','disabled-by-default-memory-infra']});tracing=true
 await snapshot('baseline')
 let baseline='baseline'
 for(const transitions of counts){
  for(let i=0;i<transitions;i++){
   await route('/runs/kazakh-sft-005',[ids[0]]);await route(compare,ids)
   if(drag){await page.getByTestId('comparison-loss').locator('.u-over').evaluate(element=>{const r=element.getBoundingClientRect();element.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,button:0,buttons:1,clientX:r.left+r.width*.4,clientY:r.top+r.height*.5}))});if(i<transitions-1)await route(base)}
  }
  const target=`target-${transitions}`,final=`returned-${transitions}`
  await snapshot(target);await route(base);await snapshot(final)
  cases.push({transitions,baseline,target,final});baseline=final
 }
 const raw=await browser.stopTracing();tracing=false
 const gzip=gzipSync(raw),sha=b=>createHash('sha256').update(b).digest('hex')
 await writeFile(`${out}/roundtrip-chrome-trace.json.gz`,gzip)
 const trace=JSON.parse(raw.toString()),native=[]
 for(const sample of samples){
  const begin=trace.traceEvents.find(e=>e.name===sample.before),end=trace.traceEvents.find(e=>e.name===sample.after)
  if(!begin||!end)throw Error('Missing diagnostic span markers')
  const events=trace.traceEvents.filter(e=>e.ph==='v'&&e.args?.dumps&&e.ts>=begin.ts&&e.ts<=end.ts)
  const dumpIds=[...new Set(events.map(e=>String(e.id??JSON.stringify(e.id2))))]
  if(dumpIds.length!==1)throw Error(`Ambiguous MemoryInfra span ${sample.label}: ${dumpIds}`)
  sample.rendererPid=begin.pid
  native.push({label:sample.label,rendererPid:begin.pid,beginTs:begin.ts,endTs:end.ts,cdpReturnedGuid:sample.dump.dumpGuid,traceDumpIds:dumpIds,association:'One unique native dump group within explicit request begin/end UserTiming span. Raw GUIDs retained; no assumption that trace IDs equal CDP-returned IDs.',events})
 }
 await writeFile(`${out}/memory-infra.json`,JSON.stringify({sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,samples:native},null,2))
 await writeFile(`${out}/results.json`,JSON.stringify({sourceCommit:metadata.git.commit,sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,browser:browser.version(),interruptedDrag:drag,cases,samples,trace:{file:'roundtrip-chrome-trace.json.gz',rawSha256:sha(raw),compressedSha256:sha(gzip)},scope:'Warm neutral baseline→1M detail/four-run Compare→same neutral baseline; B/T/F IDs from one persistent CDP heap profiler. Candidate set(T minus B) intersect F is a superset requiring retainer analysis, not automatic leak proof. Count is workload rounds; each opens detail and Compare. Interrupted-drag mode dispatches a native DOM mousedown and navigates away without mouseup; no physical-device claim.'},null,2))
}finally{if(tracing)await browser?.stopTracing().catch(()=>{});await browser?.close();server.kill()}
