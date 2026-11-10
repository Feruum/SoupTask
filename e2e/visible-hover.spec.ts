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

for(const fault of ['offscreen','clipped','occluded'])test(`visible-frame acknowledgement rejects ${fault} source cells`,async({page})=>{
 await page.setViewportSize({width:1440,height:900})
 await page.goto('/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
 const plot=page.getByTestId('loss-chart').locator('.u-over')
 await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
 await page.evaluate(kind=>{
  const rail=document.querySelector<HTMLElement>('[data-testid="cursor-readout-loss"]')!
  if(kind==='offscreen')rail.style.transform='translateY(100vh)'
  else if(kind==='clipped'){const content=rail.firstElementChild as HTMLElement;content.style.width='40px';content.style.overflow='hidden'}
  else{const overlay=document.createElement('div');overlay.id='visibility-fault';const bounds=rail.getBoundingClientRect();Object.assign(overlay.style,{position:'fixed',zIndex:'99',left:`${bounds.left}px`,top:`${bounds.top}px`,width:`${bounds.width}px`,height:`${bounds.height}px`,background:'black'});document.body.append(overlay)}
 },fault)
 await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
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
