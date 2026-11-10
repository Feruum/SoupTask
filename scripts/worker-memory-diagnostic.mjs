import {chromium} from '@playwright/test'
import {spawn,spawnSync} from 'node:child_process'
import {mkdir,writeFile} from 'node:fs/promises'
const out=process.env.WORKER_MEMORY_OUT??'reports/memory-investigation-2026-11-10/worker-diagnostic'
await mkdir(out,{recursive:true});await writeFile(`${out}/run-start.json`,JSON.stringify({startedAt:new Date().toISOString(),scope:'Explicit main and Worker GC diagnosis, not natural-GC memory or latency.'}),{flag:'wx'})
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4196'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
let browser
const samples=[]
const blocks=Number(process.env.WORKER_MEMORY_BLOCKS??1)
if(!Number.isInteger(blocks)||blocks<1||blocks>8)throw Error('Use1..8 blocks of20 transitions')
try{
 browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:900}}),root=await browser.newBrowserCDPSession(),main=await page.context().newCDPSession(page)
 const ready=async()=>{await page.waitForFunction(()=>window.__soupEvidence?.hoverCacheTargets&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)}
 async function sample(label,worker){
  const processes=(await root.send('SystemInfo.getProcessInfo')).processInfo,ids=processes.map(x=>x.id).filter(Number.isSafeInteger)
  const counter=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',`Get-Process -Id ${ids.join(',')} -ErrorAction SilentlyContinue | Select-Object Id,PrivateMemorySize64,WorkingSet64 | ConvertTo-Json -Compress`],{encoding:'utf8',windowsHide:true});if(counter.status!==0)throw Error(counter.stderr)
  const value={label,mainHeap:await main.send('Runtime.getHeapUsage'),workerHeap:worker?await worker.send('Runtime.getHeapUsage'):null,workspace:await page.evaluate(()=>window.__soupEvidence),processes,windowsProcesses:[JSON.parse(counter.stdout)].flat()};samples.push(value);console.log(JSON.stringify({label,mainHeap:value.mainHeap,workerHeap:value.workerHeap}));await writeFile(`${out}/samples.partial.json`,JSON.stringify(samples,null,2))
 }
 async function attach(){
  const targets=(await root.send('Target.getTargets')).targetInfos.filter(t=>t.type==='worker'&&t.url.includes('training.worker-'));if(targets.length!==1)throw Error('Expected exactly one current Worker')
  const {sessionId}=await root.send('Target.attachToTarget',{targetId:targets[0].targetId,flatten:false});let id=0;const gates=new Map()
  const receive=event=>{if(event.sessionId!==sessionId)return;const data=JSON.parse(event.message);if(!data.id)return;const gate=gates.get(data.id);if(gate){gates.delete(data.id);clearTimeout(gate.timer);data.error?gate.reject(Error(data.error.message)):gate.resolve(data.result)}}
  root.on('Target.receivedMessageFromTarget',receive)
  return {send:async(method,params={})=>{const key=++id;const promise=new Promise((resolve,reject)=>{const timer=setTimeout(()=>{gates.delete(key);reject(Error(`Worker ${method} timeout`))},15000);gates.set(key,{resolve,reject,timer})});await root.send('Target.sendMessageToTarget',{sessionId,message:JSON.stringify({id:key,method,params})});return promise},close:async()=>{root.off('Target.receivedMessageFromTarget',receive);await root.send('Target.detachFromTarget',{sessionId})}}
 }
 await page.goto('http://127.0.0.1:4196/runs/kazakh-sft-005');await ready()
 for(let phase=0;phase<=blocks;phase++){
  if(phase)for(let i=0;i<20;i++){await page.getByRole('link',{name:'Training runs',exact:true}).click();await page.locator(`a[href="/runs/${i%2?'kazakh-sft-005':'kazakh-sft-001'}"]`).first().click();await ready()}
  const worker=await attach(),prefix=phase?`after${phase*20}`:'initial'
  try{
   await sample(`${prefix}-natural`,worker)
   await main.send('HeapProfiler.collectGarbage');await sample(`${prefix}-main-GC`,worker)
   await worker.send('HeapProfiler.collectGarbage');await sample(`${prefix}-main-and-Worker-GC`,worker)
   if(phase===blocks&&process.env.WORKER_MEMORY_PRESSURE==='true'){
    await root.send('Memory.simulatePressureNotification',{level:'critical'})
    await page.waitForTimeout(1000)
    await sample('critical-pressure-diagnostic',worker)
   }
  }finally{await worker.close()}
 }
 await writeFile(`${out}/results.json`,JSON.stringify({browser:browser.version(),scope:'Separate diagnostic of main versus active dedicated Worker heap/backing storage. Explicit GC cannot be used as a production memory or latency result; no forced GC is added to the app.',samples},null,2))
}finally{await browser?.close();server.kill()}
