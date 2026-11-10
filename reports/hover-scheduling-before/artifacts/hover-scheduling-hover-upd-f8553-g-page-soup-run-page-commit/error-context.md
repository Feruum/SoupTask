# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-scheduling.spec.ts >> hover updates source readouts without recommitting the surrounding page: soup:run-page-commit
- Location: e2e\hover-scheduling.spec.ts:7:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 6
Received: 9
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
                    - paragraph [ref=e156]: Cursor step 499,999.5
                    - generic [ref=e158]:
                      - strong [ref=e161]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e162]:
                        - generic [ref=e163]:
                          - generic "Exact source value 0.22748138270315854" [ref=e164]:
                            - generic [ref=e165]: step 499,999
                            - generic [ref=e166]: Loss 0.227481
                            - generic [ref=e167]: Δstep 0.5
                          - button "Pin row 499999" [ref=e168] [cursor=pointer]
          - generic [ref=e169]:
            - generic [ref=e170]:
              - generic [ref=e171]:
                - heading "Learning rate" [level=2] [ref=e172]
                - paragraph [ref=e173]: Recorded step · Linear scale · Original values
              - generic [ref=e174]: 1752 displayed
            - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout" [ref=e175]':
              - generic [ref=e185]:
                - generic [ref=e187]:
                  - button "Highlight kazakh-sft-005" [ref=e188] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e190]: 0E0 – 1.83333E-5
                - paragraph [ref=e191]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Learning rate source readout" [ref=e192]:
                  - generic [ref=e193]:
                    - paragraph [ref=e194]: Cursor step 499,999.5
                    - generic [ref=e196]:
                      - strong [ref=e199]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e200]:
                        - generic [ref=e201]:
                          - generic "Exact source value 0.000010000010000010002" [ref=e202]:
                            - generic [ref=e203]: step 499,999
                            - generic [ref=e204]: Learning rate 1E-5
                            - generic [ref=e205]: Δstep 0.5
                          - button "Pin row 499999" [ref=e206] [cursor=pointer]
          - generic [ref=e207]:
            - generic [ref=e208]:
              - generic [ref=e209]:
                - heading "Gradient norm" [level=2] [ref=e210]
                - paragraph [ref=e211]: Recorded step · Linear scale · Original values
              - generic [ref=e212]: 3502 displayed
            - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout" [ref=e213]':
              - generic [ref=e223]:
                - generic [ref=e225]:
                  - button "Highlight kazakh-sft-005" [ref=e226] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e228]: 0.140 – 0.240
                - paragraph [ref=e229]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Gradient norm source readout" [ref=e230]:
                  - generic [ref=e231]:
                    - paragraph [ref=e232]: Cursor step 499,999.5
                    - generic [ref=e234]:
                      - strong [ref=e237]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e238]:
                        - generic [ref=e239]:
                          - generic "Exact source value 0.21716141713317486" [ref=e240]:
                            - generic [ref=e241]: step 499,999
                            - generic [ref=e242]: Gradient norm 0.217161
                            - generic [ref=e243]: Δstep 0.5
                          - button "Pin row 499999" [ref=e244] [cursor=pointer]
        - paragraph [ref=e245]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e246]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | for (const [route, mark] of [
  4  |   ['/runs/kazakh-sft-005', 'soup:run-page-commit'],
  5  |   ['/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006', 'soup:compare-page-commit']
  6  | ] as const) {
  7  |   test(`hover updates source readouts without recommitting the surrounding page: ${mark}`, async ({ page }) => {
  8  |     await page.goto(route)
  9  |     await expect(page.locator('.plot-host').first()).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  10 |     await page.evaluate(() => document.fonts.ready)
  11 |     const surface = page.locator('.u-over').first()
  12 |     await surface.scrollIntoViewIfNeeded()
  13 |     await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  14 |     const box = await surface.boundingBox()
  15 |     if (!box) throw Error('Missing actual chart input surface')
  16 |     const before = await page.evaluate(name => performance.getEntriesByName(name).length, mark)
  17 |     for (const fraction of [.3, .4, .5]) {
  18 |       const sequence = await page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)
  19 |       await page.mouse.move(box.x + box.width * fraction, box.y + box.height * .5)
  20 |       await expect.poll(() => page.evaluate(() => (performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark | undefined)?.detail?.hoverSeq ?? 0)).toBeGreaterThan(sequence)
  21 |       await expect(page.locator('.chart-hover-value').first()).toContainText('kazakh-sft-005')
  22 |     }
> 23 |     expect(await page.evaluate(name => performance.getEntriesByName(name).length, mark)).toBe(before)
     |                                                                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  24 |   })
  25 | }
  26 | 
```