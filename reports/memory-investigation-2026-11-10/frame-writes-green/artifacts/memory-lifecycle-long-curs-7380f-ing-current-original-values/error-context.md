# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: memory-lifecycle.spec.ts >> long cursor sessions bound application timing entries without losing current original values
- Location: e2e\memory-lifecycle.spec.ts:3:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
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
          - heading "kazakh-sft-005" [level=1] [ref=e67]
          - paragraph [ref=e68]: Qwen2.5-3B · DPO · Running · Snapshot Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
        - generic [ref=e69]: Demo snapshot · Smoothing off
      - navigation "Run sections" [ref=e70]:
        - button "Metrics" [pressed] [ref=e71] [cursor=pointer]
        - button "Data quality" [ref=e72] [cursor=pointer]
        - button "Source" [ref=e73] [cursor=pointer]
        - button "Run information" [ref=e74] [cursor=pointer]
      - generic [ref=e75]:
        - generic [ref=e76]:
          - term [ref=e77]: Latest loss
          - definition [ref=e78]: "0.201573"
          - definition [ref=e79]: Highest recorded step 999,999
        - generic [ref=e80]:
          - term [ref=e81]: Minimum loss
          - definition [ref=e82]: "0.200327"
          - definition [ref=e83]: Whole snapshot · step 989,070
        - generic [ref=e84]:
          - term [ref=e85]: Peak loss
          - definition [ref=e86]: "100.000"
          - definition [ref=e87]: Whole snapshot · step 500,001
        - generic [ref=e88]:
          - term [ref=e89]: Raw observations
          - definition [ref=e90]: 1,000,000
          - definition [ref=e91]: Immutable source rows
      - paragraph [ref=e92]: Stale source snapshot · older than 24 hours. Refreshing this demo does not change its source timestamp.
      - generic [ref=e93]:
        - group [ref=e94]:
          - generic [ref=e96]:
            - generic [ref=e97]:
              - generic [ref=e98]:
                - generic [ref=e99]: From step
                - spinbutton "From step" [ref=e100]: "0"
              - generic [ref=e101]:
                - generic [ref=e102]: To step
                - spinbutton "To step" [ref=e103]: "999999"
              - button "Apply range" [ref=e104] [cursor=pointer]
            - generic [ref=e108]:
              - button "Zoom in" [ref=e109] [cursor=pointer]
              - button "Zoom out" [ref=e113] [cursor=pointer]
              - button "Reset view" [ref=e117] [cursor=pointer]
            - paragraph [ref=e121]: Step 0 to 999,999
        - generic [ref=e122]:
          - generic [ref=e123]:
            - generic [ref=e124]:
              - generic [ref=e125]:
                - heading "Loss" [level=2] [ref=e126]
                - paragraph [ref=e127]: Recorded step · Linear scale · Original values
              - generic [ref=e128]: 3500 displayed
            - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike Original source values" [ref=e129]':
              - generic [ref=e139]:
                - generic [ref=e141]:
                  - button "Highlight kazakh-sft-005" [ref=e142] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e144]: 0.200327 – 100.000
                - paragraph [ref=e145]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e147]:
                  - paragraph [ref=e148]: "Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline."
                  - generic [ref=e149]:
                    - link "Inspect original spike" [ref=e150] [cursor=pointer]:
                      - /url: /runs/kazakh-sft-005?sourceIndex=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
                    - button "Zoom around spike" [ref=e151] [cursor=pointer]
                - region "Original source values" [ref=e155]:
                  - generic [ref=e156]:
                    - paragraph [ref=e157]: Cursor step 549,773.205882 · All metrics
                    - region "Source table" [ref=e158]:
                      - table "Original observations at cursor step" [ref=e159]:
                        - caption [ref=e160]: Original observations at cursor step
                        - rowgroup [ref=e161]:
                          - row [ref=e162]:
                            - columnheader "Run" [ref=e163]
                            - columnheader "Recorded step" [ref=e164]
                            - columnheader "Loss" [ref=e165]
                            - columnheader "Learning rate" [ref=e166]
                            - columnheader "Gradient norm" [ref=e167]
                            - columnheader "Δstep" [ref=e168]
                            - columnheader "Source" [ref=e169]
                        - rowgroup "Original observations for kazakh-sft-005" [ref=e170]:
                          - row [ref=e171]:
                            - rowheader "kazakh-sft-005" [ref=e172]:
                              - strong [ref=e175]: kazakh-sft-005
                            - cell "549,773" [ref=e176]
                            - cell "0.203061" [ref=e177]
                            - cell "9.00453E-6" [ref=e178]
                            - cell "0.14054" [ref=e179]
                            - cell "0.205882" [ref=e180]
                            - cell [ref=e181]:
                              - button "Pin row 549773" [ref=e182] [cursor=pointer]: "Pin #549773"
                    - paragraph [ref=e183]: Scroll for more rows and metrics. Groups show the first 2 observations.
          - generic [ref=e184]:
            - generic [ref=e185]:
              - generic [ref=e186]:
                - heading "Learning rate" [level=2] [ref=e187]
                - paragraph [ref=e188]: Recorded step · Linear scale · Original values
              - generic [ref=e189]: 1752 displayed
            - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e190]':
              - generic [ref=e200]:
                - generic [ref=e202]:
                  - button "Highlight kazakh-sft-005" [ref=e203] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e205]: 0E0 – 1.83333E-5
                - paragraph [ref=e206]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - generic [ref=e207]:
            - generic [ref=e208]:
              - generic [ref=e209]:
                - heading "Gradient norm" [level=2] [ref=e210]
                - paragraph [ref=e211]: Recorded step · Linear scale · Original values
              - generic [ref=e212]: 3502 displayed
            - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e213]':
              - generic [ref=e223]:
                - generic [ref=e225]:
                  - button "Highlight kazakh-sft-005" [ref=e226] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e228]: 0.140 – 0.240
                - paragraph [ref=e229]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
        - paragraph [ref=e230]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e231]: Demo snapshot. No live training or automatic stopping recommendation.
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
> 12 |  expect(Object.values(result).every(count=>count>0)).toBe(true)
     |                                                      ^ Error: expect(received).toBe(expected) // Object.is equality
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
  77 |  await expect(content).toHaveAttribute('data-hover-seq',/\d+/)
  78 |  expect(await appearance(),'source-state marker must not change inherited numeric font or paint clip').toEqual(before)
  79 | })
  80 | 
```