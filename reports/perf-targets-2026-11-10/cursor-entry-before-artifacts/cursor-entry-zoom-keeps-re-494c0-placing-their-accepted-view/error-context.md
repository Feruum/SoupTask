# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cursor-entry.spec.ts >> zoom keeps readout source nodes and their focus identity while replacing their accepted view
- Location: e2e\cursor-entry.spec.ts:16:1

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
      - generic [ref=e92]:
        - group [ref=e93]:
          - generic [ref=e95]:
            - generic [ref=e96]:
              - generic [ref=e97]:
                - generic [ref=e98]: From step
                - spinbutton "From step" [ref=e99]: "100"
              - generic [ref=e100]:
                - generic [ref=e101]: To step
                - spinbutton "To step" [ref=e102]: "200"
              - button "Apply range" [active] [ref=e103] [cursor=pointer]
            - generic [ref=e107]:
              - button "Zoom in" [ref=e108] [cursor=pointer]
              - button "Zoom out" [ref=e112] [cursor=pointer]
              - button "Reset view" [ref=e116] [cursor=pointer]
            - paragraph [ref=e120]: Step 100 to 200
        - generic [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]:
              - generic [ref=e124]:
                - heading "Loss" [level=2] [ref=e125]
                - paragraph [ref=e126]: Recorded step · Linear scale · Original values
              - generic [ref=e127]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 1.27935 – 1.832639 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Loss source readout" [ref=e128]':
              - generic [ref=e138]:
                - generic [ref=e140]:
                  - button "Highlight kazakh-sft-005" [ref=e141] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e143]: 1.27935 – 1.832639
                - paragraph [ref=e144]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Loss source readout" [ref=e145]:
                  - generic [ref=e146]:
                    - paragraph [ref=e147]: Cursor step 113.574661
                    - generic [ref=e149]:
                      - strong [ref=e152]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e153]:
                        - generic [ref=e154]:
                          - generic "Exact source value 1.706966486443879" [ref=e155]:
                            - generic [ref=e156]: step 114
                            - generic [ref=e157]: Loss 1.706966
                            - generic [ref=e158]: Δstep 0.425339
                          - button "Pin row 114" [ref=e159] [cursor=pointer]
          - generic [ref=e160]:
            - generic [ref=e161]:
              - generic [ref=e162]:
                - heading "Learning rate" [level=2] [ref=e163]
                - paragraph [ref=e164]: Recorded step · Linear scale · Original values
              - generic [ref=e165]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 2.39976E-8 – 4.79904E-8 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout" [ref=e166]':
              - generic [ref=e176]:
                - generic [ref=e178]:
                  - button "Highlight kazakh-sft-005" [ref=e179] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e181]: 2.39976E-8 – 4.79904E-8
                - paragraph [ref=e182]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Learning rate source readout" [ref=e183]:
                  - generic [ref=e184]:
                    - paragraph [ref=e185]: Cursor step 113.574661
                    - generic [ref=e187]:
                      - strong [ref=e190]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e191]:
                        - generic [ref=e192]:
                          - generic "Exact source value 2.7356908313789276e-8" [ref=e193]:
                            - generic [ref=e194]: step 114
                            - generic [ref=e195]: Learning rate 2.73569E-8
                            - generic [ref=e196]: Δstep 0.425339
                          - button "Pin row 114" [ref=e197] [cursor=pointer]
          - generic [ref=e198]:
            - generic [ref=e199]:
              - generic [ref=e200]:
                - heading "Gradient norm" [level=2] [ref=e201]
                - paragraph [ref=e202]: Recorded step · Linear scale · Original values
              - generic [ref=e203]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 0.140376 – 0.237665 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout" [ref=e204]':
              - generic [ref=e214]:
                - generic [ref=e216]:
                  - button "Highlight kazakh-sft-005" [ref=e217] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e219]: 0.140376 – 0.237665
                - paragraph [ref=e220]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Gradient norm source readout" [ref=e221]:
                  - generic [ref=e222]:
                    - paragraph [ref=e223]: Cursor step 113.574661
                    - generic [ref=e225]:
                      - strong [ref=e228]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e229]:
                        - generic [ref=e230]:
                          - generic "Exact source value 0.184098421279341" [ref=e231]:
                            - generic [ref=e232]: step 114
                            - generic [ref=e233]: Gradient norm 0.184098
                            - generic [ref=e234]: Δstep 0.425339
                          - button "Pin row 114" [ref=e235] [cursor=pointer]
        - paragraph [ref=e236]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e237]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('entering and leaving a chart keeps the chart React tree out of cursor work',async({page})=>{
  4  |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
  6  |  const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded()
  7  |  const box=(await surface.boundingBox())!
  8  |  const before=await page.evaluate(()=>performance.getEntriesByName('soup:charts-render').length)
  9  |  await page.mouse.move(box.x+box.width*.3,box.y+box.height*.5)
  10 |  await expect(page.locator('[data-testid="cursor-readout-loss"] .chart-hover-value')).toBeVisible()
  11 |  await page.mouse.move(8,8)
  12 |  await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-cursor-point-count','0')
  13 |  expect(await page.evaluate(()=>performance.getEntriesByName('soup:charts-render').length)).toBe(before)
  14 | })
  15 | 
  16 | test('zoom keeps readout source nodes and their focus identity while replacing their accepted view',async({page})=>{
  17 |  await page.goto('/runs/kazakh-sft-005')
  18 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  19 |  const node=page.locator('[data-testid="cursor-readout-loss"] [title^="Exact source value"]').first()
  20 |  const surface=page.locator('[data-testid="loss-chart"] .u-over');await surface.scrollIntoViewIfNeeded()
  21 |  await surface.hover({position:{x:120,y:100}});await expect(node).toBeVisible()
  22 |  await node.evaluate(element=>{(window as Window&{__persistentReadout?:Element}).__persistentReadout=element})
  23 |  await page.getByLabel('From step',{exact:true}).fill('100')
  24 |  await page.getByLabel('To step',{exact:true}).fill('200')
  25 |  await page.getByRole('button',{name:'Apply range',exact:true}).click()
  26 |  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min','100')
  27 |  await surface.hover({position:{x:120,y:100}});await expect(node).toBeVisible()
> 28 |  expect(await node.evaluate(element=>(window as Window&{__persistentReadout?:Element}).__persistentReadout===element)).toBe(true)
     |                                                                                                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  29 | })
  30 | 
```