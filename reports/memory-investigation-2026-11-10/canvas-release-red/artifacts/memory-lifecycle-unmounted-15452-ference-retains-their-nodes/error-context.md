# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: memory-lifecycle.spec.ts >> unmounted plots release owned Canvas bitmaps even while an external reference retains their nodes
- Location: e2e\memory-lifecycle.spec.ts:18:1

# Error details

```
Error: removed canvases must release bitmap dimensions without waiting for GC

expect(received).toBe(expected) // Object.is equality

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
        - button "Metrics" [ref=e71] [cursor=pointer]
        - button "Data quality" [ref=e72] [cursor=pointer]
        - button "Source" [active] [pressed] [ref=e73] [cursor=pointer]
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
      - generic [ref=e94]:
        - generic [ref=e96]:
          - heading "Source inspector" [level=2] [ref=e97]
          - paragraph [ref=e98]: Exact measurements in original arrival order. No interpolation.
        - generic [ref=e99]:
          - combobox "Inspect by" [ref=e100] [cursor=pointer]:
            - option "Recorded step" [selected]
            - option "Source index"
          - generic [ref=e101]:
            - generic [ref=e102]:
              - generic [ref=e103]: Source step
              - spinbutton "Source step" [ref=e104]: "0"
            - button "Inspect step" [ref=e105] [cursor=pointer]
        - group [ref=e109]:
          - generic "Browse source rows" [ref=e110] [cursor=pointer]
      - paragraph [ref=e111]: Demo snapshot. No live training or automatic stopping recommendation.
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
> 27 |   expect(retired.every(canvas=>canvas.width===0&&canvas.height===0),'removed canvases must release bitmap dimensions without waiting for GC').toBe(true)
     |                                                                                                                                               ^ Error: removed canvases must release bitmap dimensions without waiting for GC
  28 |  }finally{await page.evaluate(()=>delete(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases)}
  29 |  await page.getByRole('button',{name:'Metrics',exact:true}).click()
  30 |  await expect(page.getByTestId('loss-chart').locator('.uplot')).toHaveCount(1)
  31 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  32 | })
  33 | 
```