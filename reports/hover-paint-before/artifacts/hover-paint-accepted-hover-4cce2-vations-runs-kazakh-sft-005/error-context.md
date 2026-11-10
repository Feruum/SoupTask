# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-paint.spec.ts >> accepted hover reaches a rendered frame with original observations: /runs/kazakh-sft-005
- Location: e2e\hover-paint.spec.ts:4:3

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
              - generic [ref=e127]: 4140 displayed
            - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 499,999.5 kazakh-sft-005 step 499,999 · Loss 0.227481 · Δstep 0.5 Pin row 499999" [ref=e128]':
              - generic [ref=e138]:
                - generic [ref=e140]:
                  - button "Highlight kazakh-sft-005" [ref=e141] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e143]: 0.200327 – 100.000
                - paragraph [ref=e144]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e145]:
                  - text: Cursor step 499,999.5
                  - generic [ref=e146]:
                    - strong [ref=e148]: kazakh-sft-005
                    - generic "Exact source value 0.22748138270315854" [ref=e149]:
                      - text: step 499,999 · Loss 0.227481 · Δstep 0.5
                      - button "Pin row 499999" [ref=e150] [cursor=pointer]
          - generic [ref=e151]:
            - generic [ref=e152]:
              - generic [ref=e153]:
                - heading "Learning rate" [level=2] [ref=e154]
                - paragraph [ref=e155]: Recorded step · Linear scale · Original values
              - generic [ref=e156]: 893 displayed
            - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 499,999.5 kazakh-sft-005 step 499,999 · Learning rate 1E-5 · Δstep 0.5 Pin row 499999" [ref=e157]':
              - generic [ref=e167]:
                - generic [ref=e169]:
                  - button "Highlight kazakh-sft-005" [ref=e170] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e172]: 0E0 – 1.83333E-5
                - paragraph [ref=e173]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e174]:
                  - text: Cursor step 499,999.5
                  - generic [ref=e175]:
                    - strong [ref=e177]: kazakh-sft-005
                    - generic "Exact source value 0.000010000010000010002" [ref=e178]:
                      - text: step 499,999 · Learning rate 1E-5 · Δstep 0.5
                      - button "Pin row 499999" [ref=e179] [cursor=pointer]
          - generic [ref=e180]:
            - generic [ref=e181]:
              - generic [ref=e182]:
                - heading "Gradient norm" [level=2] [ref=e183]
                - paragraph [ref=e184]: Recorded step · Linear scale · Original values
              - generic [ref=e185]: 1784 displayed
            - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 499,999.5 kazakh-sft-005 step 499,999 · Gradient norm 0.217161 · Δstep 0.5 Pin row 499999" [ref=e186]':
              - generic [ref=e196]:
                - generic [ref=e198]:
                  - button "Highlight kazakh-sft-005" [ref=e199] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e201]: 0.140 – 0.240
                - paragraph [ref=e202]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e203]:
                  - text: Cursor step 499,999.5
                  - generic [ref=e204]:
                    - strong [ref=e206]: kazakh-sft-005
                    - generic "Exact source value 0.21716141713317486" [ref=e207]:
                      - text: step 499,999 · Gradient norm 0.217161 · Δstep 0.5
                      - button "Pin row 499999" [ref=e208] [cursor=pointer]
        - paragraph [ref=e209]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e210]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | for (const route of ['/runs/kazakh-sft-005', '/compare?runs=kazakh-sft-005,kazakh-sft-001']) {
  4  |   test(`accepted hover reaches a rendered frame with original observations: ${route}`, async ({ page }, info) => {
  5  |     const errors: string[] = []
  6  |     page.on('pageerror', error => errors.push(error.message))
  7  |     const cdp = await page.context().newCDPSession(page)
  8  |     await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
  9  |     await page.goto(route)
  10 |     const host = page.locator('.plot-host').first()
  11 |     await expect(host).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  12 |     const surface = host.locator('.u-over')
  13 |     await surface.scrollIntoViewIfNeeded()
  14 |     const box = await surface.boundingBox()
  15 |     if (!box) throw new Error('Missing real chart input surface')
  16 |     await page.mouse.move(box.x + box.width * .5, box.y + box.height * .5)
  17 |     const tooltip = page.locator('.chart-hover-value').first()
  18 |     await expect(tooltip).toContainText('kazakh-sft-005')
  19 |     await expect(tooltip).toContainText('step')
> 20 |     await expect.poll(() => page.evaluate(() => performance.getEntriesByName('soup:hover-frame').length)).toBeGreaterThan(0)
     |                                                                                                           ^ Error: expect(received).toBeGreaterThan(expected)
  21 |     const sample = await page.evaluate(() => {
  22 |       const frame = performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark
  23 |       const commit = performance.getEntriesByName('soup:hover-dom-commit').at(-1) as PerformanceMark
  24 |       return { frame: frame.toJSON(), commit: commit.toJSON(), accepted: window.__soupEvidence?.acceptedHoverSeq }
  25 |     })
  26 |     expect(sample.frame.detail.hoverSeq).toBe(sample.accepted)
  27 |     expect(sample.commit.detail.hoverSeq).toBe(sample.accepted)
  28 |     expect(sample.frame.startTime).toBeGreaterThan(sample.commit.startTime)
  29 |     expect(sample.frame.detail.requestToFrameMs).toBeGreaterThanOrEqual(sample.frame.detail.requestToAcceptedMs)
  30 |     await expect(tooltip).toHaveAttribute('data-hover-seq', String(sample.accepted))
  31 |     await expect(host).toHaveAttribute('data-cursor-point-count', /[1-9]/)
  32 |     await page.screenshot({ path: info.outputPath('accepted-hover-frame.png'), fullPage: true })
  33 |     await info.attach('accepted-hover-timing', { body: JSON.stringify(sample, null, 2), contentType: 'application/json' })
  34 |     expect(errors).toEqual([])
  35 |   })
  36 | }
  37 | 
```