# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: raw-cursor.spec.ts >> early raw pointer input resolves exact observations before a coalesced pointermove arrives
- Location: e2e\raw-cursor.spec.ts:3:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
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
                - spinbutton "From step" [ref=e99]: "0"
              - generic [ref=e100]:
                - generic [ref=e101]: To step
                - spinbutton "To step" [ref=e102]: "999999"
              - button "Apply range" [ref=e103] [cursor=pointer]
            - generic [ref=e107]:
              - button "Zoom in" [ref=e108] [cursor=pointer]
              - button "Zoom out" [ref=e112] [cursor=pointer]
              - button "Reset view" [ref=e116] [cursor=pointer]
            - paragraph [ref=e120]: Step 0 to 999,999
        - generic [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]:
              - generic [ref=e124]:
                - heading "Loss" [level=2] [ref=e125]
                - paragraph [ref=e126]: Recorded step · Linear scale · Original values
              - generic [ref=e127]: 3500 displayed
            - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike Loss source readout" [ref=e128]':
              - generic [ref=e138]:
                - generic [ref=e140]:
                  - button "Highlight kazakh-sft-005" [ref=e141] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e143]: 0.200327 – 100.000
                - paragraph [ref=e144]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e146]:
                  - paragraph [ref=e147]: "Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline."
                  - generic [ref=e148]:
                    - link "Inspect original spike" [ref=e149] [cursor=pointer]:
                      - /url: /runs/kazakh-sft-005?sourceIndex=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
                    - button "Zoom around spike" [ref=e150] [cursor=pointer]
                - region "Loss source readout" [ref=e154]:
                  - generic [ref=e155]:
                    - paragraph [ref=e156]: Original source values
                    - generic [ref=e158]:
                      - strong [ref=e161]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e162]:
                        - paragraph [ref=e163]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
          - generic [ref=e164]:
            - generic [ref=e165]:
              - generic [ref=e166]:
                - heading "Learning rate" [level=2] [ref=e167]
                - paragraph [ref=e168]: Recorded step · Linear scale · Original values
              - generic [ref=e169]: 1752 displayed
            - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout" [ref=e170]':
              - generic [ref=e180]:
                - generic [ref=e182]:
                  - button "Highlight kazakh-sft-005" [ref=e183] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e185]: 0E0 – 1.83333E-5
                - paragraph [ref=e186]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Learning rate source readout" [ref=e187]:
                  - generic [ref=e188]:
                    - paragraph [ref=e189]: Original source values
                    - generic [ref=e191]:
                      - strong [ref=e194]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e195]:
                        - paragraph [ref=e196]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
          - generic [ref=e197]:
            - generic [ref=e198]:
              - generic [ref=e199]:
                - heading "Gradient norm" [level=2] [ref=e200]
                - paragraph [ref=e201]: Recorded step · Linear scale · Original values
              - generic [ref=e202]: 3502 displayed
            - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout" [ref=e203]':
              - generic [ref=e213]:
                - generic [ref=e215]:
                  - button "Highlight kazakh-sft-005" [ref=e216] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e218]: 0.140 – 0.240
                - paragraph [ref=e219]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Gradient norm source readout" [ref=e220]:
                  - generic [ref=e221]:
                    - paragraph [ref=e222]: Original source values
                    - generic [ref=e224]:
                      - strong [ref=e227]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e228]:
                        - paragraph [ref=e229]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
        - paragraph [ref=e230]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e231]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('early raw pointer input resolves exact observations before a coalesced pointermove arrives',async({page})=>{
  4  |  await page.goto('/runs/kazakh-sft-005')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
  6  |  const surface=page.locator('[data-testid="loss-chart"] .u-over')
  7  |  const before=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)
  8  |  await surface.evaluate(element=>{
  9  |   const box=element.getBoundingClientRect()
  10 |   element.dispatchEvent(new PointerEvent('pointerrawupdate',{bubbles:true,pointerType:'mouse',clientX:box.x+box.width*.36,clientY:box.y+box.height*.5}))
  11 |  })
> 12 |  await expect.poll(()=>page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)).toBeGreaterThan(before)
     |                                                                                    ^ Error: expect(received).toBeGreaterThan(expected)
  13 |  await expect(page.locator('[data-testid="cursor-readout-loss"]')).toContainText('Pin row')
  14 |  const accepted=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)
  15 |  await surface.evaluate(element=>{
  16 |   const box=element.getBoundingClientRect()
  17 |   element.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:box.x+box.width*.36,clientY:box.y+box.height*.5}))
  18 |  })
  19 |  expect(await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)).toBe(accepted)
  20 | })
  21 | 
```