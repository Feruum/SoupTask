import {test,expect} from '@playwright/test'

test('offscreen cursor canvases defer work and paint the latest exact source when revealed',async({page})=>{
 await page.setViewportSize({width:1440,height:500})
 await page.addInitScript(()=>{
  const state=window as Window&{__captureCursorArcs?:boolean;__cursorArcPlots?:string[]}
  const arc=CanvasRenderingContext2D.prototype.arc
  CanvasRenderingContext2D.prototype.arc=function(x,y,r,start,end,counterclockwise){
   if(state.__captureCursorArcs&&this.canvas.classList.contains('cursor-overlay')){
    const plot=this.canvas.parentElement?.querySelector<HTMLElement>('.plot-host')?.dataset.testid
    if(plot)(state.__cursorArcPlots??=[]).push(plot)
   }
   return arc.call(this,x,y,r,start,end,counterclockwise)
  }
 })
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200');await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await page.waitForFunction(()=>document.querySelector('.plot-host')?.getAttribute('data-range-min')==='100'&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
 const loss=page.locator('[data-testid="comparison-loss"] .u-over'),lr=page.locator('[data-testid="comparison-lr"] .u-over')
 await loss.scrollIntoViewIfNeeded();await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
 await page.mouse.move(8,8)
 await page.evaluate(()=>{const state=window as Window&{__captureCursorArcs?:boolean;__cursorArcPlots?:string[]};state.__captureCursorArcs=true;state.__cursorArcPlots=[]})
 // Synthetic input isolates source publication from physical pointer hit-testing during scroll.
 await loss.evaluate(element=>{const box=element.getBoundingClientRect();element.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:box.x+box.width*.5,clientY:box.y+2}))})
 await expect(page.locator('[data-testid="comparison-cursor-readout"] .chart-hover-value')).toBeVisible()
 const plots=await page.evaluate(()=>(window as Window&{__cursorArcPlots?:string[]}).__cursorArcPlots??[])
 expect([...new Set(plots)],'only the visible canvas should process source marker paths').toEqual(['comparison-loss'])
 await lr.scrollIntoViewIfNeeded()
 await expect(page.getByTestId('comparison-lr')).toHaveAttribute('data-cursor-point-count','4')
 const source=page.locator('[data-testid="comparison-cursor-readout"] tbody').first().locator('[data-source-metric="lr"]').first()
 const value=Number((await source.getAttribute('title'))!.replace('Exact source value ',''))
 const ink=await page.getByTestId('comparison-lr').evaluate((element,value)=>{
  const host=element as HTMLElement,canvas=host.parentElement!.querySelector<HTMLCanvasElement>('.cursor-overlay')!,ctx=canvas.getContext('2d')!
  const x=Number(host.dataset.plotLeft)+Number(host.dataset.plotWidth)*.5
  const y=Number(host.dataset.plotTop)+Number(host.dataset.plotHeight)*(Number(host.dataset.yMax)-value)/(Number(host.dataset.yMax)-Number(host.dataset.yMin))
  const pixels=ctx.getImageData(Math.round(x)-3,Math.round(y)-3,7,7).data
  return Array.from(pixels).some((alpha,index)=>index%4===3&&alpha>128)
 },value)
 expect(ink,'the newly visible LR marker is actually painted at the latest original source coordinate').toBe(true)
})
