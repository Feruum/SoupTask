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

test('leaving during a chart drag removes the native document mouseup listener',async({page})=>{
 const cdp=await page.context().newCDPSession(page)
 const mouseups=async()=>{
  const {result}=await cdp.send('Runtime.evaluate',{expression:'document',objectGroup:'listener-audit'})
  const {listeners}=await cdp.send('DOMDebugger.getEventListeners',{objectId:result.objectId!})
  const count=listeners.filter(listener=>listener.type==='mouseup').length
  for(const listener of listeners)for(const ref of [listener.handler,listener.originalHandler])if(ref?.objectId)await cdp.send('Runtime.releaseObject',{objectId:ref.objectId})
  await cdp.send('Runtime.releaseObjectGroup',{objectGroup:'listener-audit'})
  return count
 }
 await page.goto('/runs/kazakh-sft-005')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 const before=await mouseups(),over=page.getByTestId('loss-chart').locator('.u-over')
 await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
 await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5);await page.mouse.down()
 expect(await mouseups()).toBeGreaterThan(before)
 try{
  await page.evaluate(()=>{history.pushState(null,'','/interrupted-drag-baseline');dispatchEvent(new PopStateEvent('popstate'))})
  await expect(page.locator('h1')).toHaveText('Not found')
  expect(await mouseups(),'retired uPlot must not remain rooted through document mouseup').toBe(before)
 }finally{await page.mouse.up();await cdp.detach()}
})

test('small decorative UI artwork does not decode a full-size source bitmap',async({page})=>{
 await page.goto('/runs/kazakh-sft-001')
 await page.getByRole('button',{name:'Run information',exact:true}).click()
 const image=page.locator('.recipe-heading [data-soup-art] img')
 await expect(image).toBeVisible()
 const src=await image.evaluate(node=>(node as HTMLImageElement).currentSrc||(node as HTMLImageElement).src)
 const response=await page.request.get(src),bytes=await response.body()
 expect(bytes.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a')
 expect(bytes.readUInt32BE(16),'DPR1 artwork is at most128 CSS pixels; avoid1254px decode surfaces').toBeLessThanOrEqual(128)
 expect(bytes.readUInt32BE(20)).toBeLessThanOrEqual(128)
})
