# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: memory-lifecycle.spec.ts >> activating source observations does not change inherited font or paint containment geometry
- Location: e2e\memory-lifecycle.spec.ts:69:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('comparison-cursor-readout').locator(':scope > div')
Expected pattern: /\d+/
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toHaveAttribute" getByTestId('comparison-cursor-readout').locator(':scope > div') with timeout 5000ms
  - waiting for getByTestId('comparison-cursor-readout').locator(':scope > div')
    14 × locator resolved to <div class="_content_16fvc_18">…</div>
       - unexpected value "null"

```

```yaml
- paragraph: Original source values · All metrics
- region "Compared source table":
  - table "Original observations at cursor step"
- paragraph: Scroll for more rows and metrics. Groups show the first 2 observations.
```

# Test source

```ts
  1  | import {expect,test} from '@playwright/test'
  2  | 
  3  | test('long cursor sessions bound application timing entries without losing current original values',async({page})=>{
  4  |  await page.goto('/runs/kazakh-sft-005')
  5  |  await page.waitForFunction(()=>window.__soupEvidence?.hoverCacheTargets&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  const over=page.getByTestId('loss-chart').locator('.u-over');await over.scrollIntoViewIfNeeded()
  7  |  const result=await over.evaluate(element=>{
  8  |   const rect=element.getBoundingClientRect()
  9  |   for(let i=0;i<400;i++)element.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:rect.left+rect.width*(i%2?.55:.45),clientY:rect.top+rect.height/2}))
  10 |   return Object.fromEntries(['soup:hover-start','soup:hover-ready','soup:hover','soup:hover-dom-commit','soup:hover-draw'].map(name=>[name,performance.getEntriesByName(name).length]))
  11 |  })
  12 |  expect(Object.values(result).every(count=>count>0)).toBe(true)
  13 |  for(const [name,count]of Object.entries(result))expect(count,`${name} must retain at most128 recent entries`).toBeLessThanOrEqual(128)
  14 |  await expect(page.getByTestId('cursor-readout-loss').locator('[data-source-metric="loss"]').first()).not.toBeEmpty()
  15 |  expect(await page.evaluate(()=>window.__soupEvidence?.members)).toEqual(['kazakh-sft-005'])
  16 | })
  17 | 
  18 | test('unmounted plots release owned Canvas bitmaps even while an external reference retains their nodes',async({page})=>{
  19 |  await page.goto('/runs/kazakh-sft-005')
  20 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  21 |  await page.evaluate(()=>{(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases=[...document.querySelectorAll<HTMLCanvasElement>('.plot-stack canvas')]})
  22 |  try{
  23 |   await page.getByRole('button',{name:'Source',exact:true}).click()
  24 |   const retired=await page.evaluate(()=>(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases!.map(canvas=>({connected:canvas.isConnected,width:canvas.width,height:canvas.height})))
  25 |   expect(retired).toHaveLength(6)
  26 |   expect(retired.every(canvas=>!canvas.connected)).toBe(true)
  27 |   expect(retired.every(canvas=>canvas.width===0&&canvas.height===0),'removed canvases must release bitmap dimensions without waiting for GC').toBe(true)
  28 |  }finally{await page.evaluate(()=>delete(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases)}
  29 |  await page.getByRole('button',{name:'Metrics',exact:true}).click()
  30 |  await expect(page.getByTestId('loss-chart').locator('.uplot')).toHaveCount(1)
  31 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  32 | })
  33 | 
  34 | test('leaving during a chart drag removes the native document mouseup listener',async({page})=>{
  35 |  const cdp=await page.context().newCDPSession(page)
  36 |  const mouseups=async()=>{
  37 |   const {result}=await cdp.send('Runtime.evaluate',{expression:'document',objectGroup:'listener-audit'})
  38 |   const {listeners}=await cdp.send('DOMDebugger.getEventListeners',{objectId:result.objectId!})
  39 |   const count=listeners.filter(listener=>listener.type==='mouseup').length
  40 |   for(const listener of listeners)for(const ref of [listener.handler,listener.originalHandler])if(ref?.objectId)await cdp.send('Runtime.releaseObject',{objectId:ref.objectId})
  41 |   await cdp.send('Runtime.releaseObjectGroup',{objectGroup:'listener-audit'})
  42 |   return count
  43 |  }
  44 |  await page.goto('/runs/kazakh-sft-005')
  45 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  46 |  const before=await mouseups(),over=page.getByTestId('loss-chart').locator('.u-over')
  47 |  await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
  48 |  await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5);await page.mouse.down()
  49 |  expect(await mouseups()).toBeGreaterThan(before)
  50 |  try{
  51 |   await page.evaluate(()=>{history.pushState(null,'','/interrupted-drag-baseline');dispatchEvent(new PopStateEvent('popstate'))})
  52 |   await expect(page.locator('h1')).toHaveText('Not found')
  53 |   expect(await mouseups(),'retired uPlot must not remain rooted through document mouseup').toBe(before)
  54 |  }finally{await page.mouse.up();await cdp.detach()}
  55 | })
  56 | 
  57 | test('small decorative UI artwork does not decode a full-size source bitmap',async({page})=>{
  58 |  await page.goto('/runs/kazakh-sft-001')
  59 |  await page.getByRole('button',{name:'Run information',exact:true}).click()
  60 |  const image=page.locator('.recipe-heading [data-soup-art] img')
  61 |  await expect(image).toBeVisible()
  62 |  const src=await image.evaluate(node=>(node as HTMLImageElement).currentSrc||(node as HTMLImageElement).src)
  63 |  const response=await page.request.get(src),bytes=await response.body()
  64 |  expect(bytes.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a')
  65 |  expect(bytes.readUInt32BE(16),'DPR1 artwork is at most128 CSS pixels; avoid1254px decode surfaces').toBeLessThanOrEqual(128)
  66 |  expect(bytes.readUInt32BE(20)).toBeLessThanOrEqual(128)
  67 | })
  68 | 
  69 | test('activating source observations does not change inherited font or paint containment geometry',async({page})=>{
  70 |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  71 |  await page.waitForFunction(()=>window.__soupEvidence?.hoverCacheTargets&&window.__soupEvidence.members.length===4&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  72 |  const content=page.getByTestId('comparison-cursor-readout').locator(':scope > div')
  73 |  const appearance=()=>content.evaluate(element=>{const css=getComputedStyle(element);return{numeric:css.fontVariantNumeric,radius:css.borderRadius,padding:css.padding,margin:css.margin,fontSize:css.fontSize}})
  74 |  const before=await appearance(),over=page.getByTestId('comparison-loss').locator('.u-over')
  75 |  await over.scrollIntoViewIfNeeded();const rect=await over.boundingBox();expect(rect).not.toBeNull()
  76 |  await page.mouse.move(rect!.x+rect!.width*.45,rect!.y+rect!.height*.5)
> 77 |  await expect(content).toHaveAttribute('data-hover-seq',/\d+/)
     |                        ^ Error: expect(locator).toHaveAttribute(expected) failed
  78 |  expect(await appearance(),'source-state marker must not change inherited numeric font or paint clip').toEqual(before)
  79 | })
  80 | 
```