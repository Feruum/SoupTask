import {test,expect} from '@playwright/test'

test('moving source markers does not invalidate unrelated overlay pixels',async({page})=>{
 await page.addInitScript(()=>{
  const state=window as Window&{__captureCursorClears?:boolean;__cursorClearFractions?:number[]}
  const clear=CanvasRenderingContext2D.prototype.clearRect
  CanvasRenderingContext2D.prototype.clearRect=function(x,y,w,h){
   if(state.__captureCursorClears&&this.canvas.classList.contains('cursor-overlay'))(state.__cursorClearFractions??=[]).push(w*h/(this.canvas.width*this.canvas.height))
   return clear.call(this,x,y,w,h)
  }
 })
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true',{timeout:60000})
 const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded()
 const box=await surface.boundingBox();if(!box)throw Error('Missing plot')
 await page.mouse.move(box.x+box.width*.25,box.y+box.height*.5)
 await expect(page.locator('[data-testid="comparison-cursor-readout"] .chart-hover-value')).toBeVisible()
 await page.evaluate(()=>{const s=window as Window&{__captureCursorClears?:boolean;__cursorClearFractions?:number[]};s.__captureCursorClears=true;s.__cursorClearFractions=[]})
 await page.mouse.move(box.x+box.width*.75,box.y+box.height*.5)
 await expect.poll(()=>page.evaluate(()=>(window as Window&{__cursorClearFractions?:number[]}).__cursorClearFractions?.length??0)).toBeGreaterThan(0)
 const fractions=await page.evaluate(()=>(window as Window&{__cursorClearFractions?:number[]}).__cursorClearFractions??[])
 expect(Math.max(...fractions)).toBeLessThan(.05)
})

test('moving the numeric cursor updates persistent source rows without replacing observation DOM',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true',{timeout:60000})
 await page.getByLabel('From step',{exact:true}).fill('100')
 await page.getByLabel('To step',{exact:true}).fill('200')
 await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-range-min','100')
 const surface=page.locator('[data-testid="comparison-loss"] .u-over')
 await surface.scrollIntoViewIfNeeded()
 const box=await surface.boundingBox();if(!box)throw Error('Missing plot')
 await page.mouse.move(box.x+box.width*.25,box.y+box.height*.5)
 const facts=page.locator('[data-testid="comparison-cursor-readout"] [title^="Exact source value"]').first()
 await expect(facts).toBeVisible()
 const first=await facts.textContent()
 await facts.evaluate(element=>{(window as Window&{__observation?:Element}).__observation=element})
 await page.mouse.move(box.x+box.width*.75,box.y+box.height*.5)
 await expect(facts).not.toHaveText(first!)
 expect(await facts.evaluate(element=>(window as Window&{__observation?:Element}).__observation===element)).toBe(true)
 await page.getByRole('button',{name:/Pin row/}).first().click()
 await expect(page.getByRole('heading',{name:'Pinned source row'})).toBeVisible()
})

test('zoom does not recompute immutable whole-run comparison summaries',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true',{timeout:60000})
 const before=await page.evaluate(()=>performance.getEntriesByName('soup:compare-summaries-render').length)
 const pageBefore=await page.evaluate(()=>performance.getEntriesByName('soup:compare-page-commit').length)
 await page.getByLabel('From step',{exact:true}).fill('100')
 await page.getByLabel('To step',{exact:true}).fill('200')
 await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-range-min','100')
 expect(await page.evaluate(()=>performance.getEntriesByName('soup:compare-summaries-render').length)).toBe(before)
 expect(await page.evaluate(()=>performance.getEntriesByName('soup:compare-page-commit').length)).toBe(pageBefore)
})

test('source cursor updates keep React out of the settled observation hot path',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true',{timeout:60000})
 const surface=page.locator('[data-testid="comparison-loss"] .u-over')
 await surface.scrollIntoViewIfNeeded()
 const box=await surface.boundingBox();if(!box)throw Error('Missing plot')
 async function move(fraction:number){
  const seq=await page.evaluate(()=>window.__soupEvidence?.acceptedHoverSeq??0)
  await page.mouse.move(box!.x+box!.width*fraction,box!.y+box!.height*.5)
  await page.waitForFunction(seq=>{const e=window.__soupEvidence;return e&&e.acceptedHoverSeq>seq&&(performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark|undefined)?.detail.hoverSeq===e.acceptedHoverSeq},seq)
 }
 await move(.2)
 const before=await page.evaluate(()=>performance.getEntriesByName('soup:source-readout-render').length)
 for(const fraction of [.3,.4,.6])await move(fraction)
 expect(await page.evaluate(()=>performance.getEntriesByName('soup:source-readout-render').length)).toBe(before)
})
