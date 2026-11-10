// Focused diagnosis, separate from the five-cold/30+30 acceptance protocol.
import {chromium} from '@playwright/test'
import {spawn} from 'node:child_process'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
const out=process.env.INVALIDATION_OUT??'reports/memory-investigation-2026-11-10/hover-invalidation'
await mkdir(out,{recursive:true})
const metadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
await writeFile(`${out}/run-start.json`,JSON.stringify({startedAt:new Date().toISOString(),metadata,scope:'Focused30 range-form -> Compare-entry samples; extra invalidation/stack tracing. Not the standard full-trace performance acceptance.'},null,2),{flag:'wx'})
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4197'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
const browser=await chromium.launch();let tracing=false
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},locale:'en-US',timezoneId:'Asia/Qyzylorda'}),cdp=await page.context().newCDPSession(page)
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('DOM.enable')
 await page.goto('http://127.0.0.1:4197/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3&&document.querySelector('.metric-grid[data-view-ready="true"]'))
 await browser.startTracing(page,{path:`${out}/chrome-trace.json`,screenshots:true,categories:['devtools.timeline','disabled-by-default-devtools.timeline','disabled-by-default-devtools.timeline.invalidationTracking','disabled-by-default-devtools.timeline.stack','blink.user_timing','v8','toplevel']});tracing=true
 const samples=[],cases=[[0,999999],[499990,500010],[100,200],[500001,500001],[0,8191]]
 for(let i=0;i<30;i++){
  const [min,max]=cases[i%cases.length],before=await page.evaluate(()=>window.__soupEvidence.viewSeq)
  await page.getByLabel('From step',{exact:true}).fill(String(min));await page.getByLabel('To step',{exact:true}).fill(String(max));await page.getByRole('button',{name:'Apply range',exact:true}).click()
  await page.waitForFunction(previous=>window.__soupEvidence.viewSeq>previous&&!!document.querySelector('.metric-grid[data-view-ready="true"]'),before)
  const plot=page.getByTestId('comparison-loss').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();if(!box)throw Error('Missing plot')
  const hover=await page.evaluate(()=>window.__soupEvidence.acceptedHoverSeq)
  await page.mouse.move(box.x+box.width*(.18+(i%25)*.025),box.y+box.height/2)
  await page.waitForFunction(previous=>{const frame=performance.getEntriesByName('soup:hover-frame').at(-1);return frame?.detail.hoverSeq>previous&&frame.detail.hoverSeq===window.__soupEvidence.acceptedHoverSeq},hover)
  samples.push(await page.evaluate(()=>{const frame=performance.getEntriesByName('soup:hover-frame').at(-1);return{...frame.toJSON(),detail:frame.detail}}))
 }
 await browser.stopTracing();tracing=false
 const document=await cdp.send('DOM.getDocument',{depth:-1,pierce:true})
 await writeFile(`${out}/results.json`,JSON.stringify({sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,scope:'Diagnostic extra invalidation tracing, CPU4 main only;30 samples; no cold-load or continuous-movement target claim',samples},null,2))
 await writeFile(`${out}/dom-nodes.json`,JSON.stringify(document))
 console.log(`Saved30 samples and detailed invalidation trace to ${out}`)
}finally{if(tracing)await browser.stopTracing().catch(()=>{});await browser.close();server.kill()}
