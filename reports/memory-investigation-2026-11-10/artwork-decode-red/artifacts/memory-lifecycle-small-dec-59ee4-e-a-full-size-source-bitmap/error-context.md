# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: memory-lifecycle.spec.ts >> small decorative UI artwork does not decode a full-size source bitmap
- Location: e2e\memory-lifecycle.spec.ts:57:1

# Error details

```
Error: DPR1 artwork is at most128 CSS pixels; avoid1254px decode surfaces

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 128
Received:    1254
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
      - link "Compare" [ref=e25] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=e28] [cursor=pointer]:
        - /url: /data-quality
    - generic [ref=e32]:
      - link "Soup documentation" [ref=e33] [cursor=pointer]:
        - /url: https://souplanding-omega.vercel.app/docs/
      - figure "BUILT IN KAZAKHSTAN" [ref=e37]
  - generic [ref=e39]:
    - banner [ref=e40]:
      - generic [ref=e41]:
        - generic [ref=e42]: Workspace
        - generic [aria-hidden] [ref=e43]: /
        - generic [ref=e44]: qwen-kazakh
      - generic [ref=e45]:
        - generic [ref=e46]: Demo data
        - button "Switch to light theme" [ref=e51] [cursor=pointer]
    - main [ref=e63]:
      - link "← All training runs" [ref=e64] [cursor=pointer]:
        - /url: /runs
      - generic [ref=e65]:
        - generic [ref=e66]:
          - heading "kazakh-sft-001" [level=1] [ref=e67]
          - paragraph [ref=e68]: Qwen2.5-1.5B · DPO · Running · Snapshot Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
        - generic [ref=e69]: Demo snapshot · Smoothing off
      - navigation "Run sections" [ref=e70]:
        - button "Metrics" [ref=e71] [cursor=pointer]
        - button "Data quality" [ref=e72] [cursor=pointer]
        - button "Source" [ref=e73] [cursor=pointer]
        - button "Run information" [active] [pressed] [ref=e74] [cursor=pointer]
      - generic [ref=e75]:
        - generic [ref=e76]:
          - term [ref=e77]: Latest loss
          - definition [ref=e78]: "0.269841"
          - definition [ref=e79]: Highest recorded step 8,191
        - generic [ref=e80]:
          - term [ref=e81]: Minimum loss
          - definition [ref=e82]: "0.23887"
          - definition [ref=e83]: Whole snapshot · step 8,185
        - generic [ref=e84]:
          - term [ref=e85]: Peak loss
          - definition [ref=e86]: "3.431808"
          - definition [ref=e87]: Whole snapshot · step 0
        - generic [ref=e88]:
          - term [ref=e89]: Raw observations
          - definition [ref=e90]: 8,192
          - definition [ref=e91]: Immutable source rows
      - paragraph [ref=e92]: Stale source snapshot · older than 24 hours. Refreshing this demo does not change its source timestamp.
      - generic [ref=e93]:
        - generic [ref=e95]:
          - heading "Run information" [level=2] [ref=e96]
          - paragraph [ref=e97]: The recipe behind this snapshot.
        - generic [ref=e99]:
          - generic [ref=e100]:
            - term [ref=e101]: Seed
            - definition [ref=e102]: "1000"
          - generic [ref=e103]:
            - term [ref=e104]: Generator
            - definition [ref=e105]: soup-1.0.0
          - generic [ref=e106]:
            - term [ref=e107]: Scenario
            - definition [ref=e108]: clean
          - generic [ref=e109]:
            - term [ref=e110]: Scenario version
            - definition [ref=e111]: "1"
          - generic [ref=e112]:
            - term [ref=e113]: Revision
            - definition [ref=e114]: soup-1.0.0:clean@1:seed=1000:n=8192:cadence=1
          - generic [ref=e115]:
            - term [ref=e116]: Expected cadence
            - definition [ref=e117]: "1"
          - generic [ref=e118]:
            - term [ref=e119]: Source snapshot
            - definition [ref=e120]: 2026-11-09T12:00:00Z
          - generic [ref=e121]:
            - term [ref=e122]: Raw rows
            - definition [ref=e123]: "8192"
          - generic [ref=e124]:
            - term [ref=e125]: Last source status
            - definition [ref=e126]: finite
      - paragraph [ref=e127]: Demo snapshot. No live training or automatic stopping recommendation.
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
> 65 |  expect(bytes.readUInt32BE(16),'DPR1 artwork is at most128 CSS pixels; avoid1254px decode surfaces').toBeLessThanOrEqual(128)
     |                                                                                                      ^ Error: DPR1 artwork is at most128 CSS pixels; avoid1254px decode surfaces
  66 |  expect(bytes.readUInt32BE(20)).toBeLessThanOrEqual(128)
  67 | })
  68 | 
```