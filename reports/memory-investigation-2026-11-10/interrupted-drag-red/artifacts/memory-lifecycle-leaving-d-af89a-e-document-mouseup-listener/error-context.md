# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: memory-lifecycle.spec.ts >> leaving during a chart drag removes the native document mouseup listener
- Location: e2e\memory-lifecycle.spec.ts:34:1

# Error details

```
Error: retired uPlot must not remain rooted through document mouseup

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 1
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to content" [ref=e4] [cursor=pointer]:
    - /url: "#main-content"
  - complementary "Workspace" [ref=e5]:
    - link "Soup home" [ref=e6] [cursor=pointer]:
      - /url: /dashboard
      - generic [ref=e7]: Soup.
    - generic [ref=e8]: Almaty Lab
    - navigation "Main navigation" [ref=e12]:
      - link "Dashboard" [ref=e13] [cursor=pointer]:
        - /url: /dashboard
      - link "Training runs" [ref=e20] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=e24] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=e27] [cursor=pointer]:
        - /url: /data-quality
    - generic [ref=e31]:
      - link "Soup documentation" [ref=e32] [cursor=pointer]:
        - /url: https://souplanding-omega.vercel.app/docs/
      - figure "BUILT IN KAZAKHSTAN" [ref=e36]
  - generic [ref=e38]:
    - banner [ref=e39]:
      - generic [ref=e40]:
        - generic [ref=e41]: Workspace
        - generic [aria-hidden] [ref=e42]: /
        - generic [ref=e43]: qwen-kazakh
      - generic [ref=e44]:
        - generic [ref=e45]: Demo data
        - button "Switch to light theme" [ref=e50] [cursor=pointer]
    - main [ref=e62]:
      - heading "Not found" [active] [level=1] [ref=e63]
      - paragraph [ref=e64]: This page does not exist.
      - link "Back to dashboard" [ref=e65] [cursor=pointer]:
        - /url: /dashboard
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
> 53 |   expect(await mouseups(),'retired uPlot must not remain rooted through document mouseup').toBe(before)
     |                                                                                            ^ Error: retired uPlot must not remain rooted through document mouseup
  54 |  }finally{await page.mouse.up();await cdp.detach()}
  55 | })
  56 | 
```