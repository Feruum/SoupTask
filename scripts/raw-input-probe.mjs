import {chromium} from '@playwright/test'
import http from 'node:http'
import {mkdir,writeFile} from 'node:fs/promises'
const out=process.env.INPUT_PROBE_OUT??'reports/perf-targets-2026-11-10/raw-input-probe'
await mkdir(out,{recursive:true})
const server=http.createServer((_,res)=>res.end('<div id="pad" style="width:1100px;height:300px;background:#222"></div><output id="readout"></output>')).listen(4197,'127.0.0.1')
await new Promise(resolve=>server.once('listening',resolve))
const browser=await chromium.launch()
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),cdp=await page.context().newCDPSession(page)
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await page.goto('http://127.0.0.1:4197')
 await page.evaluate(()=>{
  window.__input=[]
  for(const kind of ['pointerrawupdate','pointermove'])document.getElementById('pad').addEventListener(kind,event=>{
   const entry={kind,timeStamp:event.timeStamp,received:performance.now(),x:event.clientX};window.__input.push(entry)
   document.getElementById('readout').textContent=String(event.clientX)
   requestAnimationFrame(()=>requestAnimationFrame(()=>entry.frame=performance.now()))
  })
 })
 for(let i=0;i<32;i++){
  await page.mouse.move(50+i*25,120)
  await page.waitForFunction(x=>window.__input.some(e=>e.kind==='pointermove'&&e.x===x&&e.frame),50+i*25)
 }
 const samples=await page.evaluate(()=>window.__input.slice(4)),p95=values=>values.sort((a,b)=>a-b)[Math.ceil(values.length*.95)-1]
 const summary=Object.fromEntries(['pointerrawupdate','pointermove'].map(kind=>{const selected=samples.filter(e=>e.kind===kind);return[kind,{count:selected.length,delayP95:p95(selected.map(e=>e.received-e.timeStamp)),frameP95:p95(selected.map(e=>e.frame-e.timeStamp))}]}))
 const result={scope:'Diagnostic empty-page event-dispatch comparison; not Soup acceptance. Identical pointer timestamps, main CPU4 and two RAF callbacks for both event types.',browser:browser.version(),samples,summary}
 await writeFile(`${out}/results.json`,JSON.stringify(result,null,2));console.log(summary)
}finally{await browser.close();server.close()}
