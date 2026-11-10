import {test,expect} from '@playwright/test'

test('entering and leaving a chart keeps the chart React tree out of cursor work',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
 const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded()
 const box=(await surface.boundingBox())!
 const before=await page.evaluate(()=>performance.getEntriesByName('soup:charts-render').length)
 await page.mouse.move(box.x+box.width*.3,box.y+box.height*.5)
 await expect(page.locator('[data-testid="comparison-cursor-readout"] .chart-hover-value')).toBeVisible()
 await page.mouse.move(8,8)
 await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-cursor-point-count','0')
 expect(await page.evaluate(()=>performance.getEntriesByName('soup:charts-render').length)).toBe(before)
})

test('zoom keeps readout source nodes and their focus identity while replacing their accepted view',async({page})=>{
 await page.goto('/runs/kazakh-sft-005')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 const node=page.locator('[data-testid="cursor-readout-loss"] [title^="Exact source value"]').first()
 const surface=page.locator('[data-testid="loss-chart"] .u-over');await surface.scrollIntoViewIfNeeded()
 await surface.hover({position:{x:120,y:100}});await expect(node).toBeVisible()
 await node.evaluate(element=>{(window as Window&{__persistentReadout?:Element}).__persistentReadout=element})
 await page.getByLabel('From step',{exact:true}).fill('100')
 await page.getByLabel('To step',{exact:true}).fill('200')
 await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min','100')
 await surface.hover({position:{x:120,y:100}});await expect(node).toBeVisible()
 expect(await node.evaluate(element=>(window as Window&{__persistentReadout?:Element}).__persistentReadout===element)).toBe(true)
})
