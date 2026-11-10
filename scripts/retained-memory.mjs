import {chromium} from '@playwright/test'
import {spawn,spawnSync} from 'node:child_process'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {createWriteStream} from 'node:fs'
import {createGzip} from 'node:zlib'
import {finished} from 'node:stream/promises'
import {createHash} from 'node:crypto'

const out=process.env.RETAINED_OUT??'reports/memory-investigation-2026-11-10/before'
const build=process.env.RETAINED_BUILD??'dist',port=4196
await mkdir(out,{recursive:true})
await writeFile(`${out}/run-start.json`,JSON.stringify({startedAt:new Date().toISOString(),build,buildIndexSha256:createHash('sha256').update(await readFile(`${build}/index.html`)).digest('hex'),scope:'Separate retained-object diagnosis: forced GC and heap snapshots are explicit, never latency or natural-GC memory results.'},null,2),{flag:'wx'})
const server=spawn(process.execPath,['scripts/serve-build.mjs',build,String(port)],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(Error(`Preview exited ${code}`)))})
let browser
const samples=[]
try{
 browser=await chromium.launch({headless:true})
 const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,locale:'en-US',timezoneId:'Asia/Qyzylorda'})
 const page=await context.newPage(),cdp=await context.newCDPSession(page),root=await browser.newBrowserCDPSession()
 await cdp.send('Performance.enable');await cdp.send('HeapProfiler.enable')
 const ready=async()=>{await page.waitForFunction(()=>window.__soupEvidence?.viewSeq>0&&window.__soupEvidence?.hoverCacheTargets>0&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3,undefined,{timeout:60000});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))))}
 async function counters(label){
  const processes=(await root.send('SystemInfo.getProcessInfo')).processInfo
  const ids=processes.map(x=>x.id).filter(Number.isSafeInteger)
  const result=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',`Get-Process -Id ${ids.join(',')} -ErrorAction SilentlyContinue | Select-Object Id,ProcessName,WorkingSet64,PrivateMemorySize64 | ConvertTo-Json -Compress`],{encoding:'utf8',windowsHide:true})
  if(result.status!==0)throw Error(result.stderr)
  const sample={label,url:page.url(),heap:await cdp.send('Runtime.getHeapUsage'),dom:await cdp.send('Memory.getDOMCounters'),metrics:(await cdp.send('Performance.getMetrics')).metrics,workers:page.workers().length,processes,windowsProcesses:[JSON.parse(result.stdout)].flat(),page:await page.evaluate(()=>({charts:document.querySelectorAll('.uplot').length,marks:performance.getEntriesByType('mark').length,measures:performance.getEntriesByType('measure').length,workspace:window.__soupEvidence}))}
  samples.push(sample);await writeFile(`${out}/samples.partial.json`,JSON.stringify(samples,null,2));console.log(JSON.stringify({label,heap:sample.heap,dom:sample.dom,workers:sample.workers}))
 }
 async function snapshot(name){
  const gzip=createGzip(),file=createWriteStream(`${out}/${name}.heapsnapshot.gz`,{flags:'wx'});gzip.pipe(file)
  const chunk=({chunk})=>gzip.write(chunk)
  cdp.on('HeapProfiler.addHeapSnapshotChunk',chunk)
  try{await cdp.send('HeapProfiler.takeHeapSnapshot',{reportProgress:false})}finally{cdp.off('HeapProfiler.addHeapSnapshotChunk',chunk);gzip.end();await finished(file)}
 }
 await page.goto(`http://127.0.0.1:${port}/runs/kazakh-sft-005`);await ready()
 await counters('initial-natural');await cdp.send('HeapProfiler.collectGarbage');await counters('initial-after-explicit-GC');await snapshot('initial')
 for(let block=1;block<=3;block++){
  for(let i=0;i<20;i++){
   await page.getByRole('link',{name:'Training runs',exact:true}).click()
   const id=i%2?'kazakh-sft-005':'kazakh-sft-001'
   await page.locator(`a[href="/runs/${id}"]`).first().click();await ready()
  }
  await counters(`after-${block*20}-natural`)
  await cdp.send('HeapProfiler.collectGarbage');await counters(`after-${block*20}-explicit-GC`)
  if(block===1||block===3)await snapshot(`after-${block*20}`)
 }
 await page.evaluate(()=>{history.pushState(null,'','/memory-probe-not-found');dispatchEvent(new PopStateEvent('popstate'))})
 await page.waitForFunction(()=>!window.__soupEvidence&&document.querySelectorAll('.uplot').length===0)
 await page.waitForFunction(()=>document.querySelector('h1')?.textContent==='Not found')
 for(let attempt=0;page.workers().length&&attempt<30;attempt++)await page.waitForTimeout(50)
 if(page.workers().length)throw Error('Retired Worker did not close on an empty route')
 await cdp.send('HeapProfiler.collectGarbage');await counters('unmounted-explicit-GC');await snapshot('unmounted')
 await writeFile(`${out}/results.json`,JSON.stringify({browser:browser.version(),scope:'Diagnostic only: repeated20-transition batches, natural counters then explicit CDP GC; snapshots implicitly collect too. One isolated browser; renderer OS counters separately labelled, not universal tab/GPU totals. No continuous trace. No forced-GC number replaces the natural-GC primary experiment.',samples},null,2))
}finally{await browser?.close();server.kill()}
