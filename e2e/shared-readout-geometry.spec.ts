import {test,expect} from '@playwright/test'

test('source table columns stay fixed when placeholder rows become measured values',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200');await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await page.waitForFunction(()=>document.querySelector('.plot-host')?.getAttribute('data-range-min')==='100'&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
 const columns=page.locator('[data-testid="comparison-cursor-readout"] thead th')
 const sizes=()=>columns.evaluateAll(nodes=>nodes.map(node=>{const box=node.getBoundingClientRect();return{x:box.x,width:box.width}}))
 const before=await sizes(),surface=page.locator('[data-testid="comparison-loss"] .u-over')
 await surface.scrollIntoViewIfNeeded();await surface.hover({position:{x:130,y:2}})
 await expect(page.getByRole('region',{name:'Compared source values'}).getByRole('button',{name:/Pin row/}).first()).toBeVisible()
 const after=await sizes()
 expect(before).toHaveLength(7)
 for(let index=0;index<before.length;index++){
  expect(Math.abs(before[index].width-after[index].width),'column widths must not reflow on source updates').toBeLessThan(.5)
  expect(Math.abs(before[index].x-after[index].x),'columns must not jump horizontally').toBeLessThan(.5)
 }
})
