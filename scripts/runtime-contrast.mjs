import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'
import { spawn } from 'node:child_process'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { assertSpikePainted } from './canvas-controls.mjs'
const directory=process.env.RUNTIME_REVIEW_OUT??'reports/manual'
const metadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
await mkdir(directory,{recursive:true})
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4187'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
const luminance=rgb=>rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
const results=[],lifecycle=[],browser=await chromium.launch()
try{
 for(const theme of ['dark','light']){
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'})
  await context.addInitScript(value=>localStorage.setItem('soup-theme',value),theme)
  const page=await context.newPage()
  await page.goto('http://127.0.0.1:4187/dashboard?view=map')
  await page.getByRole('heading',{name:'Experiment map',exact:true}).waitFor()
  const svg=await page.locator('.experiment-map').evaluate(element=>{
   const rgb=color=>color.match(/[\d.]+/g).slice(0,3).map(Number)
   let surface=element;while(surface&&getComputedStyle(surface).backgroundColor==='rgba(0, 0, 0, 0)')surface=surface.parentElement
   return {background:rgb(getComputedStyle(surface).backgroundColor),labels:[...element.querySelectorAll('text')].map(text=>({text:text.textContent,fill:rgb(getComputedStyle(text).fill)}))}
  })
  const svgContrasts=svg.labels.map(label=>({...label,contrast:ratio(label.fill,svg.background)}))
  assert.ok(svgContrasts.every(label=>label.contrast>=4.5),'Dashboard SVG text must reach 4.5:1 against its actual surface')
  await page.screenshot({path:`${directory}/dashboard-${theme}.png`,fullPage:true})
  await writeFile(`${directory}/dashboard-${theme}-accessibility.txt`,await page.locator('body').ariaSnapshot())
  await page.goto('http://127.0.0.1:4187/runs/kazakh-sft-005')
  const spike=await assertSpikePainted(page)
  const spikeContrast=ratio(spike.paintedRgb,spike.background.match(/[\d.]+/g).slice(0,3).map(Number))
  assert.ok(spikeContrast>=3,'Actual opaque spike pixels must reach 3:1')
  await page.goto('http://127.0.0.1:4187/compare?runs=kazakh-sft-001,kazakh-sft-002,kazakh-sft-003,kazakh-sft-004')
  const host=page.getByTestId('comparison-loss')
  await page.waitForFunction(()=>document.querySelector('[data-testid="comparison-loss"]')?.getAttribute('data-view-ready')==='true')
  const canvas=await host.evaluate(element=>{
   const canvas=element.querySelector('canvas'),bytes=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data
   const scratch=document.createElement('canvas');scratch.width=scratch.height=1;const ctx=scratch.getContext('2d')
   const palette=['--chart-line','--chart-teal','--chart-ochre','--chart-purple'].map(token=>{ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue(token).trim();ctx.fillRect(0,0,1,1);return {token,expected:[...ctx.getImageData(0,0,1,1).data].slice(0,3),pixel:null,count:0}})
   for(let i=0;i<bytes.length;i+=4)if(bytes[i+3]>=250)for(const color of palette)if(color.expected.every((value,index)=>Math.abs(value-bytes[i+index])<=5)){color.count++;color.pixel=[...bytes.slice(i,i+3)]}
   return {palette,background:getComputedStyle(element.closest('.chart-panel')).backgroundColor}
  })
  const background=canvas.background.match(/[\d.]+/g).slice(0,3).map(Number)
  for(const color of canvas.palette){assert.ok(color.count>0,`Actual Canvas must contain ${color.token} pixels`);color.contrast=ratio(color.pixel,background);assert.ok(color.contrast>=3,`${color.token} Canvas pixels must reach 3:1`)}
  await page.screenshot({path:`${directory}/comparison-${theme}.png`,fullPage:true})
  results.push({theme,svgContrasts,spike:{...spike,contrast:spikeContrast},comparison:canvas})
  await context.close()
 }
 const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage(),liveWorkers=new Set()
 page.on('worker',worker=>{liveWorkers.add(worker);worker.on('close',()=>liveWorkers.delete(worker))})
 await page.goto('http://127.0.0.1:4187/runs/kazakh-sft-005')
 for(let index=0;index<20;index++){
  await page.getByRole('link',{name:'Training runs',exact:true}).click()
  const id=index%2?'kazakh-sft-005':'kazakh-sft-001'
  await page.locator(`a[href="/runs/${id}"]`).first().click()
  await page.waitForFunction(()=>window.__soupEvidence?.viewSeq>0&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
  const observedBeforeSettlement=page.workers().length,settleStart=Date.now(),deadline=settleStart+5000
  while(page.workers().length!==1&&Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,20))
  const count=page.workers().length,charts=await page.locator('.plot-host .uplot').count()
  console.log(JSON.stringify({transition:index+1,observedBeforeSettlement,settleMs:Date.now()-settleStart,liveWorkers:count,charts,workerUrls:page.workers().map(worker=>worker.url())}))
  assert.equal(count,1,'Settled run detail must own exactly one live Worker after navigation')
  assert.equal(charts,3,'Settled run detail must own exactly three uPlot instances')
  lifecycle.push({transition:index+1,runId:id,observedBeforeSettlement,settleMs:Date.now()-settleStart,liveWorkers:count,charts,workspace:await page.evaluate(()=>window.__soupEvidence)})
 }
 await context.close()
 const deadline=Date.now()+5000
 while(liveWorkers.size&&Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,20))
 assert.equal(liveWorkers.size,0,'Closing the workspace context must release every observed Worker')
 lifecycle.push({contextClosed:true,liveWorkers:liveWorkers.size})
}finally{await browser.close();server.kill();await writeFile(`${directory}/runtime-contrast.json`,JSON.stringify({sourceCommit:metadata.git?.commit,sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,scope:'Assistant-run production runtime checks: real opaque Canvas pixels, computed SVG fill/surface, accessibility-tree inspection and 20 unthrottled SPA lifecycle transitions. Not human NVDA/VoiceOver certification or a memory budget benchmark. Inactive dimmed series are outside this unfocused-series contrast sample.',results,lifecycle},null,2))}
console.log('Both themes: actual Canvas series >=3:1; Dashboard SVG text >=4.5:1.')
