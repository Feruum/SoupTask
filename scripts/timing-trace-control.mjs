import {chromium} from '@playwright/test'
import {spawn} from 'node:child_process'
import {mkdir,writeFile,readFile} from 'node:fs/promises'
import {gzipSync} from 'node:zlib'
import {createHash} from 'node:crypto'
import assert from 'node:assert/strict'
const out=process.env.TIMING_TRACE_OUT??'reports/memory-investigation-2026-11-10/timing-trace'
const metadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
await mkdir(out,{recursive:true});await writeFile(`${out}/run-start.json`,JSON.stringify({startedAt:new Date().toISOString()}),{flag:'wx'})
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4197'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
let browser
try{
 browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:900}})
 await page.goto('http://127.0.0.1:4197/runs/kazakh-sft-005')
 await page.waitForFunction(()=>window.__soupEvidence?.hoverCacheTargets&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 const over=page.getByTestId('loss-chart').locator('.u-over');await over.scrollIntoViewIfNeeded()
 await browser.startTracing(page,{categories:['blink.user_timing']})
 const retained=await over.evaluate(element=>{const r=element.getBoundingClientRect();for(let i=0;i<400;i++)element.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:r.left+r.width*(i%2?.55:.45),clientY:r.top+r.height/2}));return performance.getEntriesByName('soup:hover-start').length})
 const raw=await browser.stopTracing(),trace=JSON.parse(raw.toString()),emitted=trace.traceEvents.filter(e=>e.name==='soup:hover-start').length,compressed=gzipSync(raw)
 await writeFile(`${out}/timing-chrome-trace.json.gz`,compressed)
 assert(retained<=128);assert.equal(emitted,400,'Clearing the page timing buffer must not erase already emitted Chrome trace events')
 const sha=b=>createHash('sha256').update(b).digest('hex')
 await writeFile(`${out}/results.json`,JSON.stringify({verified:true,sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,inputEvents:400,retainedPageMarks:retained,chromeTraceEvents:emitted,scope:'Separate correctness control, no latency claim. Browser User Timing is capped while all400 emitted trace events survive.',trace:{file:'timing-chrome-trace.json.gz',rawSha256:sha(raw),compressedSha256:sha(compressed)}},null,2));console.log(`Timing trace preserved all${emitted} events; page retained${retained}.`)
}finally{await browser?.close();server.kill()}
