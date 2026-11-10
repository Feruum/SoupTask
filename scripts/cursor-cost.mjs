import {chromium} from '@playwright/test'
import {spawn} from 'node:child_process'
import {mkdir,writeFile} from 'node:fs/promises'
const out=process.env.CURSOR_COST_OUT??'reports/perf-targets-2026-11-10/cursor-cost'
await mkdir(out,{recursive:true})
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4197'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
const browser=await chromium.launch(),results=[]
try{
 for(const mode of ['native','muted']){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,locale:'en-US',timezoneId:'Asia/Qyzylorda'})
  await context.addInitScript(muted=>{
   const add=EventTarget.prototype.addEventListener,remove=EventTarget.prototype.removeEventListener,bindings=new WeakMap()
   window.__nativeCursorCost=[]
   EventTarget.prototype.addEventListener=function(type,listener,options){
    if(type==='mousemove'&&this instanceof HTMLElement&&this.classList.contains('u-over')&&typeof listener==='function'){
     const wrapped=function(event){if(muted&&!event.buttons)return;const start=performance.now();try{return listener.call(this,event)}finally{window.__nativeCursorCost.push(performance.now()-start)}}
     let current=bindings.get(this);if(!current){current=new Map();bindings.set(this,current)}current.set(listener,wrapped)
     return add.call(this,type,wrapped,options)
    }
    return add.call(this,type,listener,options)
   }
   EventTarget.prototype.removeEventListener=function(type,listener,options){return remove.call(this,type,type==='mousemove'?(bindings.get(this)?.get(listener)??listener):listener,options)}
   window.addEventListener('pointermove',event=>window.__probeInput=event.timeStamp,{capture:true,passive:true})
  },mode==='muted')
  const page=await context.newPage(),cdp=await context.newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4})
  await page.goto('http://127.0.0.1:4197/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  await page.waitForFunction(()=>document.querySelector('.plot-host')?.dataset.rangeMin==='100'&&window.__soupEvidence?.hoverCacheTargets>0)
  const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded();const box=await surface.boundingBox(),samples=[]
  await page.evaluate(()=>window.__nativeCursorCost=[])
  for(let i=0;i<32;i++){
   const before=await page.evaluate(()=>window.__soupEvidence.acceptedHoverSeq)
   await page.mouse.move(box.x+box.width*(.1+i*.024),box.y+box.height*.5)
   await page.waitForFunction(seq=>{const frame=performance.getEntriesByName('soup:hover-frame').at(-1);return frame?.detail.hoverSeq>seq&&frame.detail.hoverSeq===window.__soupEvidence.acceptedHoverSeq},before)
   const sample=await page.evaluate(()=>{const frame=performance.getEntriesByName('soup:hover-frame').at(-1);return{inputToFrame:frame.startTime-window.__probeInput,requestToFrame:frame.detail.requestToFrameMs}})
   if(i>=2)samples.push(sample)
  }
  const costs=await page.evaluate(()=>window.__nativeCursorCost),p95=values=>values.sort((a,b)=>a-b)[Math.ceil(values.length*.95)-1]??null
  const result={mode,samples,nativeHandlerMs:costs,nativeHandlerP95:p95([...costs]),inputToFrameP95:p95(samples.map(s=>s.inputToFrame))}
  results.push(result);console.log({mode,nativeHandlerP95:result.nativeHandlerP95,inputToFrameP95:result.inputToFrameP95})
  await context.close()
 }
 await writeFile(`${out}/results.json`,JSON.stringify({scope:'Diagnostic cost isolation, not acceptance: settled four-run Compare, main CPU4, Worker unthrottled, 30 moves after2 warmups. Muted mode intentionally suppresses native hover crosshair only and is NOT a shippable implementation; drag handlers still run. Does not change the app source or production benchmark.',browser:browser.version(),results},null,2))
}finally{await browser.close();server.kill()}
