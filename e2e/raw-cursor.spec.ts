import {test,expect} from '@playwright/test'

test('early raw pointer input resolves exact observations before a coalesced pointermove arrives',async({page})=>{
 await page.goto('/runs/kazakh-sft-005')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
 const surface=page.locator('[data-testid="loss-chart"] .u-over')
 const before=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)
 await surface.evaluate(element=>{
  const box=element.getBoundingClientRect()
  element.dispatchEvent(new PointerEvent('pointerrawupdate',{bubbles:true,pointerType:'mouse',clientX:box.x+box.width*.36,clientY:box.y+box.height*.5}))
 })
 await expect.poll(()=>page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)).toBeGreaterThan(before)
 await expect(page.locator('[data-testid="cursor-readout-loss"]')).toContainText('Pin row')
 const accepted=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)
 await surface.evaluate(element=>{
  const box=element.getBoundingClientRect()
  element.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:box.x+box.width*.36,clientY:box.y+box.height*.5}))
 })
 expect(await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)).toBe(accepted)
})
