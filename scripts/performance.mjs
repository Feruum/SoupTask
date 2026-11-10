import { chromium } from '@playwright/test'
import { mkdir,writeFile,readFile,readdir,stat } from 'node:fs/promises'
import { spawn,spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import os from 'node:os'
import path from 'node:path'
const out=process.env.PERF_OUT??'reports/performance'
const modes=(process.env.PERF_MODES??'scan,stream,indexed').split(',').map(mode=>mode.trim()).filter(Boolean)
if(!modes.length||new Set(modes).size!==modes.length||modes.some(mode=>!['scan','stream','indexed'].includes(mode)))throw Error('PERF_MODES must select distinct scan,stream,indexed modes')
async function sourceHash(directory='src'){const parts=[];for(const entry of (await readdir(directory,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const file=`${directory}/${entry.name}`;parts.push(entry.isDirectory()?await sourceHash(file):createHash('sha256').update(file).update(await readFile(file)).digest('hex'))}return createHash('sha256').update(parts.join('|')).digest('hex')}
const startingSourceHash=await sourceHash()
const harnessHash=createHash('sha256').update(await readFile('scripts/performance.mjs')).digest('hex')
await mkdir(out,{recursive:true})
await stat(`${out}/results.json`).then(()=>{throw Error(`Completed evidence already exists in ${out}; choose a new PERF_OUT`)},error=>{if(error.code!=='ENOENT')throw error})
await writeFile(`${out}/run-start.json`,JSON.stringify({startedAt:new Date().toISOString(),sourceHash:startingSourceHash,harnessHash,modes},null,2),{flag:'wx'})
const samples=[],comparisons=[],memory=[],builds=[]
let browserVersion=''
const percentile=(a,p)=>a.length?[...a].sort((x,y)=>x-y)[Math.ceil(a.length*p)-1]:null
const stats=values=>({count:values.length,p50:percentile(values,.5),p95:percentile(values,.95)})
const cases=[{label:'overview',min:0,max:999999,reset:true},{label:'spike',min:499990,max:500010},{label:'reset',min:0,max:999999,reset:true},{label:'excluded-spike',min:100,max:200},{label:'single-step',min:500001,max:500001}]
async function twoFrames(page){await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))))}
async function acceptedView(page,before=-1){
 await page.waitForFunction(previous=>{
  const current=window.__soupEvidence?.viewSeq??0
  const panels=[...document.querySelectorAll('[data-view-seq]')]
  const draw=performance.getEntriesByName('soup-chart-draw').at(-1)?.startTime??0
  const ready=performance.getEntriesByName('soup:view-ready').at(-1)?.startTime??Infinity
  return current>previous&&panels.length>=3&&panels.every(p=>Number(p.getAttribute('data-view-seq'))===current)&&!!document.querySelector('[data-view-ready="true"]')&&draw>=ready
 },before,{timeout:60000})
 await twoFrames(page)
}
async function workerCoverage(cdp){
 const workers=[],pending=new Map();let commandId=0
 cdp.on('Target.receivedMessageFromTarget',event=>{let message;try{message=JSON.parse(event.message)}catch{return}const key=`${event.sessionId}:${message.id}`;const gate=pending.get(key);if(gate){pending.delete(key);clearTimeout(gate.timer);gate.resolve(message)}})
 async function targetCommand(sessionId,method,params={}){
  const id=++commandId,key=`${sessionId}:${id}`
  const response=new Promise(resolve=>{const timer=setTimeout(()=>{pending.delete(key);resolve({error:{message:'No Worker command acknowledgement in 5 seconds'}})},5000);pending.set(key,{resolve,timer})})
  try{await cdp.send('Target.sendMessageToTarget',{sessionId,message:JSON.stringify({id,method,params})})}catch(error){const gate=pending.get(key);pending.delete(key);if(gate){clearTimeout(gate.timer);gate.resolve({error:{message:error.message}})}}
  return response
 }
 cdp.on('Target.attachedToTarget',async info=>{
  const entry={type:info.targetInfo.type,targetId:info.targetInfo.targetId,throttling:'pending'}
  if(info.targetInfo.type==='worker'){
   workers.push(entry)
   const result=await targetCommand(info.sessionId,'Emulation.setCPUThrottlingRate',{rate:4})
   entry.throttling=result.error?'unsupported':'command-acknowledged'
   entry.error=result.error?.message??null
  }
  await targetCommand(info.sessionId,'Runtime.runIfWaitingForDebugger')
 })
 await cdp.send('Target.setAutoAttach',{autoAttach:true,waitForDebuggerOnStart:true,flatten:false})
 return workers
}
async function snapshot(page,cdp,label,mode){
 const heap=await cdp.send('Runtime.getHeapUsage'),metrics=await cdp.send('Performance.getMetrics')
 const workspace=await page.evaluate(()=>window.__soupEvidence??null)
 memory.push({mode,label,heap,metrics,workspace})
 await writeFile(`${out}/memory.partial.json`,JSON.stringify(memory,null,2))
}
async function applyCase(page,entry){
 const host=page.locator('[data-testid="loss-chart"],[data-testid="comparison-loss"]').first()
 const beforeRange={min:Number(await host.getAttribute('data-range-min')),max:Number(await host.getAttribute('data-range-max'))}
 if(beforeRange.min===entry.min&&beforeRange.max===entry.max)throw Error(`Benchmark case ${entry.label} repeats the current range; preconditioning is invalid`)
 const before=await page.evaluate(()=>window.__soupEvidence.viewSeq),start=performance.now()
 if(entry.reset)await page.getByRole('button',{name:'Reset view',exact:true}).click()
 else{
  await page.getByLabel('From step',{exact:true}).fill(String(entry.min))
  await page.getByLabel('To step',{exact:true}).fill(String(entry.max))
  await page.getByRole('button',{name:'Apply range',exact:true}).click()
 }
 await acceptedView(page,before)
 const timing=await page.evaluate(()=>{const begin=performance.getEntriesByName('soup:view-start').at(-1)?.startTime,end=performance.getEntriesByName('soup-chart-draw').at(-1)?.startTime;return {requestToDraw:end-begin,viewSeq:window.__soupEvidence.viewSeq}})
 if(!Number.isFinite(timing.requestToDraw))throw Error('Missing accepted-view draw timing')
 return {case:entry.label,range:{min:entry.min,max:entry.max},beforeRange,requestToDraw:timing.requestToDraw,viewSeq:timing.viewSeq,actionUpperBound:performance.now()-start}
}
async function interactions(page,plotTestId,mode){
 const zoom=[],hover=[],hoverFrame=[],hoverInputFrame=[],hoverCommit=[],actionUpperBounds=[],labeled=[]
 await page.evaluate(()=>{
  if(window.__soupBenchmarkPointerInstalled)return
  window.__soupBenchmarkPointerInstalled=true
  window.addEventListener('pointermove',event=>{
   const target=event.target instanceof Element?event.target.closest('.plot-host'):null
   if(!target)return
   window.__soupBenchmarkPointer={serial:(window.__soupBenchmarkPointer?.serial??0)+1,timeStamp:event.timeStamp,observedAt:performance.now(),plot:target.dataset.testid,x:event.clientX,y:event.clientY}
   performance.mark('soup:benchmark-pointer-input',{detail:window.__soupBenchmarkPointer})
  },{capture:true,passive:true})
 })
 // Warmups end in excluded-spike, so every measured range differs from its predecessor.
 const sequence=[{...cases[1],warmup:true},{...cases[3],warmup:true},...Array.from({length:30},(_,i)=>({...cases[i%cases.length],warmup:false}))]
 for(let i=0;i<sequence.length;i++){
  const entry=sequence[i],zoomResult=await applyCase(page,entry)
  const plot=page.locator(`[data-testid="${plotTestId}"] .u-over`)
  await plot.scrollIntoViewIfNeeded()
  const box=await plot.boundingBox();if(!box)throw Error('Missing chart interaction surface')
  const before=await page.evaluate(()=>({hover:window.__soupEvidence.acceptedHoverSeq,pointer:window.__soupBenchmarkPointer?.serial??0})),previousHover=before.hover,hoverStart=performance.now()
  const fraction=.18+(i%25)*.025
  await page.mouse.move(box.x+box.width*fraction,box.y+box.height/2)
  await page.waitForFunction(previous=>(window.__soupEvidence?.acceptedHoverSeq??0)>previous,previousHover,{timeout:30000})
  await page.waitForFunction(previousPointer=>{
   const last=performance.getEntriesByName('soup:hover-frame').at(-1)
   const input=window.__soupBenchmarkPointer,timing=window.__soupEvidence?.hoverTiming
   return input?.serial>previousPointer&&timing?.requestStartedAt>=input.timeStamp&&last?.detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq&&last?.detail.viewSeq===window.__soupEvidence?.viewSeq&&last?.detail.workspaceEpoch===window.__soupEvidence?.workspaceEpoch
  },before.pointer,{timeout:30000})
  const accepted=await page.evaluate(()=>{
   const frame=performance.getEntriesByName('soup:hover-frame').at(-1),commit=performance.getEntriesByName('soup:hover-dom-commit').at(-1)
   const timing=window.__soupEvidence.hoverTiming
   const pointer=window.__soupBenchmarkPointer
   return {duration:performance.getEntriesByName('soup:hover').at(-1)?.duration,hoverSeq:window.__soupEvidence.acceptedHoverSeq,requestToFrame:frame?.detail.requestToFrameMs,inputToFrame:frame?.startTime-pointer.timeStamp,pointer,requestToCommit:commit?.startTime-timing.requestStartedAt,frame:frame?{...frame.toJSON(),detail:frame.detail}:null,commit:commit?{...commit.toJSON(),detail:commit.detail}:null,tooltips:[...document.querySelectorAll('.chart-hover-value')].map(node=>({text:node.textContent,sequence:node.dataset.hoverSeq,rect:node.getBoundingClientRect().toJSON()}))}
  })
  if(!Number.isFinite(accepted.duration))throw Error('Missing accepted hover measure')
  if(!Number.isFinite(accepted.requestToFrame)||accepted.frame.detail.hoverSeq!==accepted.hoverSeq||!accepted.tooltips.length||accepted.tooltips.some(t=>Number(t.sequence)!==accepted.hoverSeq||t.rect.width<=0||t.rect.height<=0))throw Error('Hover timing does not match visible committed source tooltips')
  if(i===2||i===sequence.length-1)await page.screenshot({path:`${out}/${mode}-${plotTestId}-${i}-hover-frame.png`,fullPage:true})
  if(!entry.warmup){
   zoom.push(zoomResult.requestToDraw);hover.push(accepted.duration)
   hoverFrame.push(accepted.requestToFrame);hoverCommit.push(accepted.requestToCommit)
   hoverInputFrame.push(accepted.inputToFrame)
   actionUpperBounds.push({case:entry.label,action:'zoom',duration:zoomResult.actionUpperBound},{case:entry.label,action:'hover',duration:performance.now()-hoverStart})
   labeled.push({...zoomResult,hoverAccepted:accepted.duration,hoverFrame:accepted.requestToFrame,hoverInputFrame:accepted.inputToFrame,hoverCommit:accepted.requestToCommit,frameEvidence:accepted,acceptedHoverSeq:accepted.hoverSeq,pointerFraction:fraction})
  }
 }
 return {zoom,hover,hoverFrame,hoverInputFrame,hoverCommit,actionUpperBounds,interactions:labeled,warmup:{count:2,ranges:['spike','excluded-spike']}}
}
function caseSummary(records){return Object.fromEntries(cases.map(entry=>{const selected=records.filter(record=>record.case===entry.label);return [entry.label,{zoom:stats(selected.map(record=>record.requestToDraw)),hover:stats(selected.map(record=>record.hoverAccepted)),hoverFrame:stats(selected.map(record=>record.hoverFrame)),hoverInputFrame:stats(selected.map(record=>record.hoverInputFrame)),hoverCommit:stats(selected.map(record=>record.hoverCommit))}]}))}
for(const mode of modes){
 const directory=`tmp/performance-${path.basename(out).replace(/[^a-zA-Z0-9_-]/g,'-')}-${mode}`
 const beforeBuildSource=await sourceHash()
 const build=spawnSync(process.execPath,['node_modules/vite/bin/vite.js','build','--outDir',directory],{env:{...process.env,VITE_SAMPLER_MODE:mode},encoding:'utf8'})
 await writeFile(`${out}/${mode}-build.log`,build.stdout+build.stderr)
 if(build.status!==0)throw Error(`${mode} build failed`)
 builds.push({mode,directory,sourceHashBefore:beforeBuildSource,sourceHashAfter:await sourceHash(),buildHash:await sourceHash(directory)})
 await writeFile(`${out}/builds.json`,JSON.stringify(builds,null,2))
 const port={scan:4181,stream:4182,indexed:4185}[mode]
 const server=spawn(process.execPath,['scripts/serve-build.mjs',directory,String(port)],{stdio:'pipe'})
 await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(Error(`Preview exited ${code}`)))})
 const browser=await chromium.launch();browserVersion=browser.version()
 let tracing=false
 const startTrace=async(page,file)=>{await browser.startTracing(page,{path:`${out}/${file}`,screenshots:true,categories:['devtools.timeline','disabled-by-default-devtools.timeline','blink.user_timing','v8','toplevel']});tracing=true}
 const stopTrace=async()=>{if(tracing){await browser.stopTracing();tracing=false}}
 try{
  for(let cold=0;cold<5;cold++){
   const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,locale:'en-US',timezoneId:'Asia/Qyzylorda'})
   const page=await context.newPage(),cdp=await context.newCDPSession(page)
   await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4})
   const workers=await workerCoverage(cdp)
   if(cold===0)await startTrace(page,`${mode}-chrome-trace.json`)
   const start=performance.now()
   await page.goto(`http://127.0.0.1:${port}/runs/kazakh-sft-005`)
   await acceptedView(page,0)
   const first=performance.now()-start
   const actualMode=await page.evaluate(()=>window.__soupEvidence.sampler)
   if(actualMode!==mode)throw Error(`Requested ${mode} build reports sampler ${actualMode}`)
   let measured={zoom:[],hover:[],hoverFrame:[],hoverInputFrame:[],hoverCommit:[],actionUpperBounds:[],interactions:[]}
   if(cold===0){
    await snapshot(page,cdp,'1M-loaded',mode)
    measured=await interactions(page,'loss-chart',mode)
    await stopTrace();await snapshot(page,cdp,'1M-after-interactions',mode)
   }
   const metrics=await cdp.send('Performance.getMetrics'),heap=await cdp.send('Runtime.getHeapUsage')
   const evidence=await page.evaluate(()=>({marks:performance.getEntriesByType('measure').map(e=>({name:e.name,duration:e.duration})),workspace:window.__soupEvidence??null}))
   samples.push({mode,cold,first,...measured,metrics,heap,workers,evidence})
   await writeFile(`${out}/samples.partial.json`,JSON.stringify(samples,null,2))
   await page.screenshot({path:`${out}/${mode}-${cold}.png`,fullPage:true})
   if(cold===0){
    for(let i=0;i<20;i++){
     await page.getByRole('link',{name:'Training runs',exact:true}).click()
     const id=i%2?'kazakh-sft-005':'kazakh-sft-001'
     await page.locator(`a[href="/runs/${id}"]`).first().click()
     await acceptedView(page,0)
     if([0,4,9,14,19].includes(i))await snapshot(page,cdp,`after-${i+1}-SPA-switches`,mode)
    }
    await startTrace(page,`${mode}-compare-chrome-trace.json`)
    const comparisonStart=performance.now()
    await page.getByRole('link',{name:'Compare',exact:true}).click()
    for(const id of ['005','001','002','006'])await page.getByRole('checkbox',{name:`Compare kazakh-sft-${id}`,exact:true}).check()
    await acceptedView(page,0)
    const activationUpperBound=performance.now()-comparisonStart
    const activationRequestToDraw=await page.evaluate(()=>performance.getEntriesByName('soup-chart-draw').at(-1).startTime-performance.getEntriesByName('soup:workspace-start').at(-1).startTime)
    await snapshot(page,cdp,'Compare-1M-plus-three-ordinary-runs',mode)
    const comparison=await interactions(page,'comparison-loss',mode)
    await stopTrace()
    await snapshot(page,cdp,'Compare-after-interactions',mode)
    const comparisonEvidence=await page.evaluate(()=>window.__soupEvidence??null)
    comparisons.push({mode,members:['kazakh-sft-005','kazakh-sft-001','kazakh-sft-002','kazakh-sft-006'],activationUpperBound,activationRequestToDraw,...comparison,evidence:comparisonEvidence,heap:await cdp.send('Runtime.getHeapUsage'),workers:structuredClone(workers)})
    await writeFile(`${out}/comparisons.partial.json`,JSON.stringify(comparisons,null,2))
    await page.screenshot({path:`${out}/${mode}-comparison-memory.png`,fullPage:true})
   }
   await context.close()
   console.log(`${mode}: cold load ${cold+1}/5; samples persisted`)
  }
 }finally{await stopTrace().catch(()=>{});await browser.close();server.kill()}
}
const summary=Object.fromEntries(modes.map(mode=>{
 const selected=samples.filter(sample=>sample.mode===mode),zoom=selected.flatMap(sample=>sample.zoom),hover=selected.flatMap(sample=>sample.hover),comparison=comparisons.find(sample=>sample.mode===mode)
 return [mode,{cold:stats(selected.map(sample=>sample.first)),zoom:stats(zoom),hover:stats(hover),hoverFrame:stats(selected.flatMap(sample=>sample.hoverFrame)),hoverInputFrame:stats(selected.flatMap(sample=>sample.hoverInputFrame)),hoverCommit:stats(selected.flatMap(sample=>sample.hoverCommit)),byRange:caseSummary(selected.flatMap(sample=>sample.interactions)),compare:comparison?{activationUpperBound:comparison.activationUpperBound,activationRequestToDraw:comparison.activationRequestToDraw,zoom:stats(comparison.zoom),hover:stats(comparison.hover),hoverFrame:stats(comparison.hoverFrame),hoverInputFrame:stats(comparison.hoverInputFrame),hoverCommit:stats(comparison.hoverCommit),byRange:caseSummary(comparison.interactions)}:null}]
}))
const sourceUnchanged=startingSourceHash===await sourceHash()&&builds.every(build=>build.sourceHashBefore===startingSourceHash&&build.sourceHashAfter===startingSourceHash)&&harnessHash===createHash('sha256').update(await readFile('scripts/performance.mjs')).digest('hex')
await writeFile(`${out}/results.json`,JSON.stringify({sourceHash:startingSourceHash,sourceUnchanged,builds,environment:{node:process.version,browser:browserVersion,os:os.platform(),release:os.release(),cpu:os.cpus()[0]?.model,lockHash:createHash('sha256').update(await readFile('package-lock.json')).digest('hex'),viewport:'1440x900',dpr:1,cpuRate:4,cpuScope:'Main renderer target rate4. Every Worker target receives an independent Emulation.setCPUThrottlingRate command before resuming; actual acknowledgements or unsupported errors are retained per target. Unsupported Worker Emulation means preprocessing is NOT established as CPU4. Command acknowledgement alone does not establish a precise physical slowdown.',timing:'Cold: navigation-to-three accepted-and-drawn charts plus two RAF, including activation. Zoom: main view-start through chart-draw hook. Hover: separate request-to-accepted, request-to-DOM-commit, request-to-two-RAF-frame and browser-pointer-event-timestamp-to-frame metrics. Frame mark requires current workspace/view/hover identity and visible committed tooltips; actual source tooltip screenshots and Chrome paint traces are retained. Two RAFs establish a rendering opportunity, not physical monitor presentation. Playwright action upper bounds include automation overhead. Single-run and Compare samples are separate. Trace rendering/paint evidence is retained; draw hooks alone are not pixel proof.',interactionProtocol:'Two unmeasured warmups, then 30 measured range/hover pairs: overview, spike, reset, excluded-spike, single-step repeated six times. Single and Compare follow the same sequence. Range form values are source numeric steps.',coldDefinition:'Fresh browser context per sample, same browser process; OS disk caches are not flushed. Compare activation is a separate warm SPA measurement, not a fifth/sixth cold sample.',tabMemory:'Separate scripts/tab-memory.mjs OS footprint experiment; heap and typed-buffer ledger are not process footprint',gc:'No forced GC'},summary,samples,comparisons,memory},null,2))
console.log(JSON.stringify(summary,null,2))
if(!sourceUnchanged)throw Error('Source changed during measurement; raw results retained but comparison is invalid')
