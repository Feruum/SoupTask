import {chromium} from '@playwright/test'
import {mkdir,writeFile} from 'node:fs/promises'
const out=process.env.HOVER_FLOOR_OUT??'reports/perf-targets-2026-11-10/hover-floor'
await mkdir(out,{recursive:true})
const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1440,height:900}}),cdp=await page.context().newCDPSession(page)
try{
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4})
 await page.setContent('<div id="surface" style="width:1000px;height:340px;background:#222"></div><output id="source"></output>')
 await page.evaluate(()=>{
  const worker=new Worker(URL.createObjectURL(new Blob(['onmessage=e=>postMessage(e.data)'],{type:'text/javascript'})))
  window.__floorSamples=[]
  let eventAt=0,start=0
  document.getElementById('surface').onpointermove=e=>{eventAt=e.timeStamp;start=performance.now();worker.postMessage(e.clientX)}
  worker.onmessage=e=>{
   const accepted=performance.now()-start
   document.getElementById('source').textContent=`Echo ${e.data}`
   requestAnimationFrame(()=>requestAnimationFrame(()=>window.__floorSamples.push({accepted,inputToFrame:performance.now()-eventAt})))
  }
 })
 for(let i=0;i<32;i++){await page.mouse.move(50+i*25,120);await page.waitForFunction(count=>window.__floorSamples.length>count,i)}
 const samples=await page.evaluate(()=>window.__floorSamples.slice(2)),p95=key=>samples.map(s=>s[key]).sort((a,b)=>a-b)[Math.ceil(samples.length*.95)-1]
 const report={scope:'Diagnostic lower-cost control: empty page, vanilla persistent text node, Blob Worker echo, same main CPU4, pointer input timestamp and two-RAF endpoint. No Soup data and not an acceptance result.',samples,p95:{accepted:p95('accepted'),inputToFrame:p95('inputToFrame')}}
 await writeFile(`${out}/results.json`,JSON.stringify(report,null,2));console.log(report.p95)
}finally{await browser.close()}
