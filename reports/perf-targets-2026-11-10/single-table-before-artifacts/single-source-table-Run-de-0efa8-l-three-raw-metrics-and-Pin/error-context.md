# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: single-source-table.spec.ts >> Run details updates one original-row readout while retaining all three raw metrics and Pin
- Location: e2e\single-source-table.spec.ts:3:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('table', { name: 'Original observations at cursor step', exact: true })
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('table', { name: 'Original observations at cursor step', exact: true }) with timeout 5000ms
  - waiting for getByRole('table', { name: 'Original observations at cursor step', exact: true })
    14 × locator resolved to 0 elements
       - unexpected value "0"

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
                - spinbutton "From step" [ref=e100]: "100"
              - generic [ref=e101]:
                - generic [ref=e102]: To step
                - spinbutton "To step" [ref=e103]: "200"
              - button "Apply range" [active] [ref=e104] [cursor=pointer]
            - generic [ref=e108]:
              - button "Zoom in" [ref=e109] [cursor=pointer]
              - button "Zoom out" [ref=e113] [cursor=pointer]
              - button "Reset view" [ref=e117] [cursor=pointer]
            - paragraph [ref=e121]: Step 100 to 200
        - generic [ref=e122]:
          - generic [ref=e123]:
            - generic [ref=e124]:
              - generic [ref=e125]:
                - heading "Loss" [level=2] [ref=e126]
                - paragraph [ref=e127]: Recorded step · Linear scale · Original values
              - generic [ref=e128]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 1.27935 – 1.832639 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Loss source readout" [ref=e129]':
              - generic [ref=e139]:
                - generic [ref=e141]:
                  - button "Highlight kazakh-sft-005" [ref=e142] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e144]: 1.27935 – 1.832639
                - paragraph [ref=e145]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Loss source readout" [ref=e146]:
                  - generic [ref=e147]:
                    - paragraph [ref=e148]: Cursor step 113.574661
                    - generic [ref=e150]:
                      - strong [ref=e153]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e154]:
                        - generic [ref=e155]:
                          - generic "Exact source value 1.706966486443879" [ref=e156]: step 114 · Loss 1.706966 · Δstep 0.425339
                          - button "Pin row 114" [ref=e157] [cursor=pointer]: Pin row
          - generic [ref=e158]:
            - generic [ref=e159]:
              - generic [ref=e160]:
                - heading "Learning rate" [level=2] [ref=e161]
                - paragraph [ref=e162]: Recorded step · Linear scale · Original values
              - generic [ref=e163]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 2.39976E-8 – 4.79904E-8 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout" [ref=e164]':
              - generic [ref=e174]:
                - generic [ref=e176]:
                  - button "Highlight kazakh-sft-005" [ref=e177] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e179]: 2.39976E-8 – 4.79904E-8
                - paragraph [ref=e180]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Learning rate source readout" [ref=e181]:
                  - generic [ref=e182]:
                    - paragraph [ref=e183]: Cursor step 113.574661
                    - generic [ref=e185]:
                      - strong [ref=e188]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e189]:
                        - generic [ref=e190]:
                          - generic "Exact source value 2.7356908313789276e-8" [ref=e191]: step 114 · Learning rate 2.73569E-8 · Δstep 0.425339
                          - button "Pin row 114" [ref=e192] [cursor=pointer]: Pin row
          - generic [ref=e193]:
            - generic [ref=e194]:
              - generic [ref=e195]:
                - heading "Gradient norm" [level=2] [ref=e196]
                - paragraph [ref=e197]: Recorded step · Linear scale · Original values
              - generic [ref=e198]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 0.140376 – 0.237665 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout" [ref=e199]':
              - generic [ref=e209]:
                - generic [ref=e211]:
                  - button "Highlight kazakh-sft-005" [ref=e212] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e214]: 0.140376 – 0.237665
                - paragraph [ref=e215]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Gradient norm source readout" [ref=e216]:
                  - generic [ref=e217]:
                    - paragraph [ref=e218]: Cursor step 113.574661
                    - generic [ref=e220]:
                      - strong [ref=e223]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e224]:
                        - generic [ref=e225]:
                          - generic "Exact source value 0.184098421279341" [ref=e226]: step 114 · Gradient norm 0.184098 · Δstep 0.425339
                          - button "Pin row 114" [ref=e227] [cursor=pointer]: Pin row
        - paragraph [ref=e228]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e229]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('Run details updates one original-row readout while retaining all three raw metrics and Pin',async({page})=>{
  4  |  await page.goto('/runs/kazakh-sft-005')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  7  |  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min','100')
  8  |  const surface=page.locator('[data-testid="loss-chart"] .u-over');await surface.scrollIntoViewIfNeeded();await surface.hover({position:{x:120,y:2}})
  9  |  const table=page.getByRole('table',{name:'Original observations at cursor step',exact:true})
> 10 |  await expect(table).toHaveCount(1)
     |                      ^ Error: expect(locator).toHaveCount(expected) failed
  11 |  await expect(page.locator('.chart-hover-value')).toHaveCount(1)
  12 |  const values:Record<string,string>={}
  13 |  for(const metric of ['loss','lr','grad_norm'])values[metric]=(await table.locator(`[data-source-metric="${metric}"]`).first().getAttribute('title'))!.replace('Exact source value ','')
  14 |  await table.getByRole('button',{name:/Pin row/}).first().click()
  15 |  for(const metric of ['loss','lr','grad_norm'])await expect(page.getByTestId(`pinned-${metric}`)).toHaveText(values[metric])
  16 | })
  17 | 
```