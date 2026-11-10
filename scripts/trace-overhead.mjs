import {chromium} from '@playwright/test'
import {spawn} from 'node:child_process'
import {mkdir,writeFile} from 'node:fs/promises'
const out=process.env.TRACE_OVERHEAD_OUT??'reports/perf-targets-2026-11-10/trace-overhead'
await mkdir(out,{recursive:true})
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4197'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
const browser=await chromium.launch(),results=[]
try{
 for(const mode of ['full','timeline','none']){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,locale:'en-US',timezoneId:'Asia/Qyzylorda'})
  const page=await context.newPage(),cdp=await context.newCDPSession(page)
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4})
  await page.addInitScript(()=>window.addEventListener('pointermove',event=>{window.__lastProbeInput=event.timeStamp},{capture:true,passive:true}))
  await page.goto('http://127.0.0.1:4197/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  await page.waitForFunction(()=>document.querySelector('.plot-host')?.dataset.rangeMin==='100'&&window.__soupEvidence?.hoverCacheTargets>0)
  const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded();const box=await surface.boundingBox()
  if(mode!=='none')await browser.startTracing(page,{path:`${out}/${mode}-chrome-trace.json`,screenshots:mode==='full',categories:mode==='full'?['devtools.timeline','disabled-by-default-devtools.timeline','blink.user_timing','v8','toplevel']:['devtools.timeline','blink.user_timing']})
  const samples=[]
  for(let i=0;i<32;i++){
   const before=await page.evaluate(()=>window.__soupEvidence.acceptedHoverSeq)
   await page.mouse.move(box.x+box.width*(.1+i*.024),box.y+box.height*.5)
   await page.waitForFunction(seq=>{const last=performance.getEntriesByName('soup:hover-frame').at(-1);return last?.detail.hoverSeq>seq&&last.detail.hoverSeq===window.__soupEvidence.acceptedHoverSeq},before)
   const sample=await page.evaluate(()=>{const frame=performance.getEntriesByName('soup:hover-frame').at(-1);return{inputToFrame:frame.startTime-window.__lastProbeInput,requestToFrame:frame.detail.requestToFrameMs}})
   if(i>=2)samples.push(sample)
  }
  if(mode!=='none')await browser.stopTracing()
  const sorted=samples.map(s=>s.inputToFrame).sort((a,b)=>a-b),entry={mode,samples,p50:sorted[14],p95:sorted[28]}
  results.push(entry);await writeFile(`${out}/results.json`,JSON.stringify({scope:'Observer-overhead diagnostic only: settled Compare window100-200, CPU4 main, identical30 samples and pointer-timestamp through two-frame endpoint. Not a complete load/zoom acceptance run.',browser:browser.version(),results},null,2));console.log({mode,p50:entry.p50,p95:entry.p95})
  await context.close()
 }
}finally{await browser.close();server.kill()}
