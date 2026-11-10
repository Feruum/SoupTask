import {expect,test} from '@playwright/test'

test('long cursor sessions bound application timing entries without losing current original values',async({page})=>{
 await page.goto('/runs/kazakh-sft-005')
 await page.waitForFunction(()=>window.__soupEvidence?.hoverCacheTargets&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 const over=page.getByTestId('loss-chart').locator('.u-over');await over.scrollIntoViewIfNeeded()
 const result=await over.evaluate(element=>{
  const rect=element.getBoundingClientRect()
  for(let i=0;i<400;i++)element.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:rect.left+rect.width*(i%2?.55:.45),clientY:rect.top+rect.height/2}))
  return Object.fromEntries(['soup:hover-start','soup:hover-ready','soup:hover','soup:hover-dom-commit','soup:hover-draw'].map(name=>[name,performance.getEntriesByName(name).length]))
 })
 expect(Object.values(result).every(count=>count>0)).toBe(true)
 for(const [name,count]of Object.entries(result))expect(count,`${name} must retain at most128 recent entries`).toBeLessThanOrEqual(128)
 await expect(page.getByTestId('cursor-readout-loss').locator('[data-source-metric="loss"]').first()).not.toBeEmpty()
 expect(await page.evaluate(()=>window.__soupEvidence?.members)).toEqual(['kazakh-sft-005'])
})

test('unmounted plots release owned Canvas bitmaps even while an external reference retains their nodes',async({page})=>{
 await page.goto('/runs/kazakh-sft-005')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 await page.evaluate(()=>{(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases=[...document.querySelectorAll<HTMLCanvasElement>('.plot-stack canvas')]})
 try{
  await page.getByRole('button',{name:'Source',exact:true}).click()
  const retired=await page.evaluate(()=>(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases!.map(canvas=>({connected:canvas.isConnected,width:canvas.width,height:canvas.height})))
  expect(retired).toHaveLength(6)
  expect(retired.every(canvas=>!canvas.connected)).toBe(true)
  expect(retired.every(canvas=>canvas.width===0&&canvas.height===0),'removed canvases must release bitmap dimensions without waiting for GC').toBe(true)
 }finally{await page.evaluate(()=>delete(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases)}
 await page.getByRole('button',{name:'Metrics',exact:true}).click()
 await expect(page.getByTestId('loss-chart').locator('.uplot')).toHaveCount(1)
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
})
