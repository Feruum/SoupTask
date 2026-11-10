import {test,expect} from '@playwright/test'

test('moving over the same original row changes distance without rewriting source identity or empty slots',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200')
 await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await page.waitForFunction(()=>document.querySelector('.plot-host')?.getAttribute('data-range-min')==='100'&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
 const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded();const box=(await surface.boundingBox())!
 await page.mouse.move(box.x+Math.round(box.width*.5)+1,box.y+2)
 const facts=page.locator('[data-testid="comparison-cursor-readout"] [data-source-distance]').first();await expect(facts).toBeVisible()
 const first=await facts.textContent()
 await page.evaluate(()=>{
  const state=window as Window&{__redundantSourceWrites?:string[]};state.__redundantSourceWrites=[]
  const observer=new MutationObserver(records=>{for(const record of records)if(record.type==='attributes')state.__redundantSourceWrites!.push(record.attributeName!)})
  for(const element of document.querySelectorAll('[aria-label^="Original observations for"]'))observer.observe(element,{subtree:true,attributes:true,attributeFilter:['hidden','title','aria-label','href']})
 })
 const before=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)
 await page.mouse.move(box.x+Math.round(box.width*.5)+2,box.y+2)
 await page.waitForFunction(seq=>window.__soupEvidence!.acceptedHoverSeq>seq,before)
 await expect(facts).not.toHaveText(first!)
 expect(await page.evaluate(()=>(window as Window&{__redundantSourceWrites?:string[]}).__redundantSourceWrites)).toEqual([])
})
