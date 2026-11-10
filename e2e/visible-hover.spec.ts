import {expect,test} from '@playwright/test'

for(const comparison of [false,true])test(`${comparison?'Compare':'Run'} exposes actual step and all metric cells inside the viewport after chart entry`,async({page},info)=>{
 await page.setViewportSize({width:1440,height:900})
 await page.goto(comparison?'/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006':'/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 await page.getByLabel('From step',{exact:true}).fill('0')
 await page.getByLabel('To step',{exact:true}).fill('8191')
 await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 const plot=page.getByTestId(comparison?'comparison-loss':'loss-chart').locator('.u-over')
 await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
 await page.mouse.move(box!.x+box!.width*.45,box!.y+box!.height*.5)
 const readout=page.getByTestId(comparison?'comparison-cursor-readout':'cursor-readout-loss')
 await expect(readout.locator('.chart-hover-value')).toHaveAttribute('data-hover-seq',/\d+/)
 await page.waitForFunction(()=>performance.getEntriesByName('soup:hover-frame').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))
 const cells=await readout.locator('tbody').evaluateAll(bodies=>bodies.flatMap(body=>{
  const row=body.querySelector('tr:not([hidden])')!
  return [...row.querySelectorAll('td')].slice(0,4).map(cell=>{
   const range=document.createRange();range.selectNodeContents(cell);const rect=range.getBoundingClientRect()
   let left=0,top=0,right=innerWidth,bottom=innerHeight
   for(let parent:Element|null=cell.parentElement;parent;parent=parent.parentElement){
    const css=getComputedStyle(parent),bounds=parent.getBoundingClientRect()
    if(/auto|scroll|hidden|clip/.test(css.overflowX)||/paint|strict|content/.test(css.contain)){left=Math.max(left,bounds.left+parent.clientLeft);right=Math.min(right,bounds.left+parent.clientLeft+parent.clientWidth)}
    if(/auto|scroll|hidden|clip/.test(css.overflowY)||/paint|strict|content/.test(css.contain)){top=Math.max(top,bounds.top+parent.clientTop);bottom=Math.min(bottom,bounds.top+parent.clientTop+parent.clientHeight)}
    if(css.position==='fixed')break
   }
   const hit=document.elementFromPoint((rect.left+rect.right)/2,(rect.top+rect.bottom)/2)
   return{text:cell.textContent,rect:rect.toJSON(),clip:{left,top,right,bottom},visible:rect.width>0&&rect.height>0&&rect.left>=left&&rect.right<=right&&rect.top>=top&&rect.bottom<=bottom&&!!hit&&cell.contains(hit)}
  })
 }))
 await info.attach('actual-source-cell-visibility',{body:JSON.stringify(cells),contentType:'application/json'})
 expect(cells).toHaveLength(comparison?16:4)
 expect(cells.every(cell=>cell.visible),'Every actual-step and metric text must be on screen, unclipped and unobscured').toBe(true)
 await page.screenshot({path:info.outputPath('visible-source-values.png')})
})

for(const fault of ['offscreen','clipped','occluded','transparent','hidden'])test(`visible-frame acknowledgement rejects ${fault} source cells`,async({page})=>{
 await page.setViewportSize({width:1440,height:900})
 await page.goto('/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 const plot=page.getByTestId('loss-chart').locator('.u-over')
 await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
 await page.evaluate(kind=>{
  const rail=document.querySelector<HTMLElement>('[data-testid="cursor-readout-loss"]')!
  if(kind==='offscreen')rail.style.transform='translateY(100vh)'
  else if(kind==='clipped'){const content=rail.firstElementChild as HTMLElement;content.style.width='40px';content.style.overflow='hidden'}
  else if(kind==='transparent')rail.style.opacity='0'
  else if(kind==='hidden')rail.style.visibility='hidden'
  else{const overlay=document.createElement('div');overlay.id='visibility-fault';const bounds=rail.getBoundingClientRect();Object.assign(overlay.style,{position:'fixed',zIndex:'99',left:`${bounds.left}px`,top:`${bounds.top}px`,width:`${bounds.width}px`,height:`${bounds.height}px`,background:'black'});document.body.append(overlay)}
 },fault)
 await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
 await page.waitForFunction(()=>performance.getEntriesByName('soup:hover-not-visible').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))
 expect(await page.evaluate(()=>performance.getEntriesByName('soup:hover-frame').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))).toBe(false)
})

test('visibility checks preserve the computed-style fallback when native API is unavailable',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(Element.prototype,'checkVisibility',{value:undefined,configurable:true}))
 await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
 await page.mouse.move(box!.x+box!.width*.3,box!.y+box!.height*.5)
 await page.waitForFunction(()=>{const frame=performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark|undefined;return frame?.detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq})
 await page.getByTestId('cursor-readout-loss').evaluate(node=>{(node as HTMLElement).style.opacity='0'})
 await page.mouse.move(box!.x+box!.width*.6,box!.y+box!.height*.5)
 await page.waitForFunction(()=>performance.getEntriesByName('soup:hover-not-visible').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))
 expect(await page.evaluate(()=>performance.getEntriesByName('soup:hover-frame').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))).toBe(false)
})

test('moving to another original row reuses source text nodes instead of replacing the layout subtree',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
 await page.mouse.move(box!.x+box!.width*.3,box!.y+box!.height*.5)
 const step=page.locator('[data-source-step]').first();await expect(step).not.toBeEmpty()
 const previous=await step.textContent(),leaf=await step.evaluateHandle(node=>node.firstChild)
 await page.mouse.move(box!.x+box!.width*.6,box!.y+box!.height*.5)
 await expect(step).not.toHaveText(previous!)
 expect(await step.evaluate((node,old)=>node.firstChild===old,leaf),'changed source text should mutate its existing Text node').toBe(true)
 await leaf.dispose()
})

test('native crosshair hides on leave without removing its layout geometry',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 const plot=page.getByTestId('loss-chart'),over=plot.locator('.u-over');await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
 await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
 const crosshairs=plot.locator('.u-cursor-x,.u-cursor-y');await expect(crosshairs).toHaveCount(2)
 for(const cursor of await crosshairs.all())await expect(cursor).toBeVisible()
 await page.mouse.move(30,30)
 for(const cursor of await crosshairs.all()){
  await expect(cursor).toBeHidden()
  expect(await cursor.evaluate(node=>getComputedStyle(node).display),'leaving must not remove native cursor nodes from layout').not.toBe('none')
 }
})

test('source DOM writes wait for the next frame and commit before both paint checks',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
 await page.mouse.move(box!.x+box!.width*.3,box!.y+box!.height*.5)
 const step=page.locator('[data-source-step]').first();await expect(step).not.toBeEmpty()
 const previous=await step.textContent(),sequence=await page.evaluate(()=>window.__soupEvidence?.acceptedHoverSeq??0),pin=page.getByTestId('cursor-readout-loss').getByRole('button',{name:/^Pin row /}).first(),pinName=await pin.getAttribute('aria-label')
 await page.evaluate(()=>{
  const originalRequest=requestAnimationFrame,originalCancel=cancelAnimationFrame,queued=new Map<number,FrameRequestCallback>();let id=100000
  window.requestAnimationFrame=callback=>{queued.set(++id,callback);return id};window.cancelAnimationFrame=token=>{queued.delete(token)}
  Object.assign(window,{__releaseSourceFrames:()=>{window.requestAnimationFrame=originalRequest;window.cancelAnimationFrame=originalCancel;for(const callback of queued.values())originalRequest(callback);queued.clear()}})
 })
 try{
  await page.mouse.move(box!.x+box!.width*.6,box!.y+box!.height*.5)
  await page.waitForFunction(previous=>(window.__soupEvidence?.acceptedHoverSeq??0)>previous,sequence,{polling:20})
  expect(await step.textContent(),'accepted cursor data should not dirty layout before native pointer-entry reads').toBe(previous)
  // A click must pin the row actually labelled in the DOM, even while newer data waits.
  await pin.evaluate(button=>(button as HTMLButtonElement).click())
 }finally{await page.evaluate(()=>(window as unknown as Window&{__releaseSourceFrames:()=>void}).__releaseSourceFrames())}
 await expect(step).not.toHaveText(previous!)
 await expect(page.locator('.pinned-source')).toContainText(`sourceIndex ${pinName!.replace('Pin row ','')}`)
 await page.waitForFunction(()=>{
  const frame=performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark|undefined,commit=performance.getEntriesByName('soup:hover-dom-commit').at(-1)
  return !!frame&&frame.detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq&&!!commit&&commit.startTime<=frame.detail.firstCheckedAt&&frame.detail.firstCheckedAt<frame.startTime
 })
})

test('Pin works when the same source identity reappears after a view reset',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 for(let round=0;round<2;round++){
  const before=await page.evaluate(()=>window.__soupEvidence?.viewSeq??0)
  await page.getByLabel('From step',{exact:true}).fill('500001');await page.getByLabel('To step',{exact:true}).fill('500001');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  await page.waitForFunction(previous=>(window.__soupEvidence?.viewSeq??0)>previous&&!!document.querySelector('.metric-grid[data-view-ready="true"]'),before)
  const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  await page.mouse.move(box!.x+box!.width*.5,box!.y+box!.height*.5)
  await expect(page.getByRole('button',{name:'Pin row 500001',exact:true})).toBeVisible()
 }
 await page.getByRole('button',{name:'Pin row 500001',exact:true}).click()
 await expect(page.getByTestId('pinned-loss')).toHaveText('100')
})

test('source layout ownership changes only with workspace membership and cleans up on departure',async({page})=>{
 await page.setViewportSize({width:1440,height:900})
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 const main=page.locator('#main-content');await expect(main).toHaveAttribute('data-source-dock-members','4')
 const mode=await main.getAttribute('data-source-dock-owner')
 const over=page.getByTestId('comparison-loss').locator('.u-over');await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
 await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
 await expect(main).toHaveAttribute('data-source-dock-owner',mode!)
 await page.getByRole('checkbox',{name:'Compare kazakh-sft-006',exact:true}).uncheck()
 await expect(main).toHaveAttribute('data-source-dock-members','3')
 await page.getByRole('link',{name:'Data quality',exact:true}).click()
 await expect(page.locator('h1')).toHaveText('Data quality')
 await expect(main).not.toHaveAttribute('data-source-dock-members')
 await expect(main).not.toHaveAttribute('data-source-dock-owner')
 expect(await main.evaluate(node=>getComputedStyle(node).overflowY)).toBe('visible')
})
