# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-layout.spec.ts >> full run preserves the following metric position at 1440px
- Location: e2e\hover-layout.spec.ts:39:74

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 1225.28125
Received: 1353.28125

Expected precision:    0
Expected difference: < 0.5
Received difference:   128
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
                - spinbutton "From step" [ref=e99]: "500000"
              - generic [ref=e100]:
                - generic [ref=e101]: To step
                - spinbutton "To step" [ref=e102]: "500002"
              - button "Apply range" [active] [ref=e103] [cursor=pointer]
            - generic [ref=e107]:
              - button "Zoom in" [ref=e108] [cursor=pointer]
              - button "Zoom out" [ref=e112] [cursor=pointer]
              - button "Reset view" [ref=e116] [cursor=pointer]
            - paragraph [ref=e120]: Step 500,000 to 500,002
        - generic [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]:
              - generic [ref=e124]:
                - heading "Loss" [level=2] [ref=e125]
                - paragraph [ref=e126]: Recorded step · Linear scale · Original values
              - generic [ref=e127]: 3 displayed
            - 'figure "Highlight kazakh-sft-005 0.237258 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 500,001 kazakh-sft-005 step 500,001 · Loss 100.000 · Δstep 0 Pin row 500001" [ref=e128]':
              - generic [ref=e138]:
                - generic [ref=e140]:
                  - button "Highlight kazakh-sft-005" [ref=e141] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e143]: 0.237258 – 100.000
                - paragraph [ref=e144]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e145]:
                  - text: Cursor step 500,001
                  - generic [ref=e146]:
                    - strong [ref=e148]: kazakh-sft-005
                    - generic "Exact source value 100" [ref=e149]:
                      - text: step 500,001 · Loss 100.000 · Δstep 0
                      - button "Pin row 500001" [ref=e150] [cursor=pointer]
          - generic [ref=e151]:
            - generic [ref=e152]:
              - generic [ref=e153]:
                - heading "Learning rate" [level=2] [ref=e154]
                - paragraph [ref=e155]: Recorded step · Linear scale · Original values
              - generic [ref=e156]: 3 displayed
            - 'figure "Highlight kazakh-sft-005 9.99995E-6 – 9.99999E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 500,001 kazakh-sft-005 step 500,001 · Learning rate 9.99997E-6 · Δstep 0 Pin row 500001" [ref=e157]':
              - generic [ref=e167]:
                - generic [ref=e169]:
                  - button "Highlight kazakh-sft-005" [ref=e170] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e172]: 9.99995E-6 – 9.99999E-6
                - paragraph [ref=e173]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e174]:
                  - text: Cursor step 500,001
                  - generic [ref=e175]:
                    - strong [ref=e177]: kazakh-sft-005
                    - generic "Exact source value 0.00000999996999997" [ref=e178]:
                      - text: step 500,001 · Learning rate 9.99997E-6 · Δstep 0
                      - button "Pin row 500001" [ref=e179] [cursor=pointer]
          - generic [ref=e180]:
            - generic [ref=e181]:
              - generic [ref=e182]:
                - heading "Gradient norm" [level=2] [ref=e183]
                - paragraph [ref=e184]: Recorded step · Linear scale · Original values
              - generic [ref=e185]: 3 displayed
            - 'figure "Highlight kazakh-sft-005 0.16854 – 0.233255 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 500,001 kazakh-sft-005 step 500,001 · Gradient norm 0.16854 · Δstep 0 Pin row 500001" [ref=e186]':
              - generic [ref=e196]:
                - generic [ref=e198]:
                  - button "Highlight kazakh-sft-005" [ref=e199] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e201]: 0.16854 – 0.233255
                - paragraph [ref=e202]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e203]:
                  - text: Cursor step 500,001
                  - generic [ref=e204]:
                    - strong [ref=e206]: kazakh-sft-005
                    - generic "Exact source value 0.16853975002653898" [ref=e207]:
                      - text: step 500,001 · Gradient norm 0.16854 · Δstep 0
                      - button "Pin row 500001" [ref=e208] [cursor=pointer]
        - paragraph [ref=e209]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e210]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import { expect, test, type Locator, type Page } from '@playwright/test'
  2  | 
  3  | async function documentTop(locator: Locator) {
  4  |   return locator.evaluate(element => element.getBoundingClientRect().top + scrollY)
  5  | }
  6  | async function pointAtCenter(page: Page, plot: Locator) {
  7  |   await plot.locator('.u-over').scrollIntoViewIfNeeded()
  8  |   const box = await plot.locator('.u-over').boundingBox()
  9  |   if (!box) throw new Error('Missing chart input surface')
  10 |   const sequence = await page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)
  11 |   await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  12 |   await expect.poll(() => page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)).toBeGreaterThan(sequence)
  13 | }
  14 | async function setRange(page: Page, min: number, max: number) {
  15 |   const from = page.getByLabel('From step', { exact: true })
  16 |   if (!await from.isVisible()) await page.locator('.range-disclosure > summary').click()
  17 |   await from.fill(String(min))
  18 |   await page.getByLabel('To step', { exact: true }).fill(String(max))
  19 |   await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  20 |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true')
  21 | }
  22 | 
  23 | for (const route of ['/dashboard', '/runs']) test(`compact ${route} keeps explicit actions in place without automatic coordinates`, async ({ page }, info) => {
  24 |   await page.setViewportSize({ width: 1280, height: 900 })
  25 |   await page.goto(route)
  26 |   const plot = page.getByTestId('loss-chart')
  27 |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  28 |   const next = page.locator(route === '/dashboard' ? '.dashboard-source-link' : '.preview-facts')
  29 |   const before = await documentTop(next)
  30 |   await pointAtCenter(page, plot)
  31 |   const after = await documentTop(next)
  32 |   await info.attach('preview-layout', { body: JSON.stringify({ route, before, after }), contentType: 'application/json' })
  33 |   expect.soft(after).toBeCloseTo(before, 0)
  34 |   await expect(page.locator('.preview-charts .chart-hover-value')).toHaveCount(0)
  35 |   await expect(plot).toHaveAttribute('data-cursor-point-count', /[1-9]/)
  36 |   await expect(page.locator('.preview-charts')).toContainText('inspect original values and adjust range')
  37 | })
  38 | 
  39 | for (const width of [390, 1440]) for (const comparison of [false, true]) test(`${comparison ? 'four-run duplicate comparison' : 'full run'} preserves the following metric position at ${width}px`, async ({ page }, info) => {
  40 |   await page.setViewportSize({ width, height: 900 })
  41 |   await page.goto(comparison ? '/compare?runs=kazakh-sft-005,kazakh-sft-009,kazakh-sft-010,kazakh-sft-001' : '/runs/kazakh-sft-005')
  42 |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true')
  43 |   await setRange(page, comparison ? 98 : 500000, comparison ? 100 : 500002)
  44 |   const plot = page.locator('.metric-loss .plot-host'), following = page.locator('.metric-lr'), before = await documentTop(following)
  45 |   await pointAtCenter(page, plot)
  46 |   await expect(page.locator('.metric-loss .chart-hover-value')).toBeVisible()
  47 |   const after = await documentTop(following)
  48 |   await info.attach('full-chart-layout', { body: JSON.stringify({ width, comparison, before, after }), contentType: 'application/json' })
> 49 |   expect(after).toBeCloseTo(before, 0)
     |                 ^ Error: expect(received).toBeCloseTo(expected, precision)
  50 |   await expect(page.getByTestId('cursor-readout-loss')).toHaveAttribute('data-reserved', 'true')
  51 |   if (comparison) {
  52 |     await expect(page.locator('.metric-loss .tooltip-series')).toHaveCount(4)
  53 |     await expect(page.locator('.metric-loss .tooltip-series').filter({ hasText: 'kazakh-sft-009' })).toContainText('Showing first 2 returned observations')
  54 |     await expect(page.locator('.metric-loss .tooltip-series').filter({ hasText: 'kazakh-sft-009' }).getByRole('link', { name: 'Inspect full source group', exact: true })).toHaveAttribute('href', /step=99&revision=/)
  55 |   } else {
  56 |     const pin = page.locator('.metric-loss').getByRole('button', { name: 'Pin row 500001', exact: true })
  57 |     await pin.focus()
  58 |     await page.keyboard.press('Enter')
  59 |     await expect(page.getByTestId('pinned-loss')).toHaveText('100')
  60 |   }
  61 |   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  62 | })
  63 | 
  64 | test('the visible recorded spike explains the linear axis and zoom keeps its exact source', async ({ page }) => {
  65 |   await page.goto('/runs/kazakh-sft-005')
  66 |   const note = page.getByTestId('spike-explanation')
  67 |   await expect(note).toContainText('Recorded spike: loss 100 at step 500,001')
  68 |   await expect(note).toContainText('linear scale includes this peak')
  69 |   await expect(note.getByRole('link', { name: 'Inspect original spike', exact: true })).toHaveAttribute('href', /sourceIndex=500001&revision=/)
  70 |   await note.getByRole('button', { name: 'Zoom around spike', exact: true }).click()
  71 |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min', '499991')
  72 |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-max', '500011')
  73 |   await expect(note).toBeVisible()
  74 |   await setRange(page, 0, 100)
  75 |   await expect(note).toHaveCount(0)
  76 | })
  77 | 
  78 | test('recorded nonfinite measurements explain their snapshot counts and gap semantics', async ({ page }) => {
  79 |   for (const [id, expected] of [['006', '2 NaN observations'], ['007', '1 +Infinity observation'], ['008', '1 −Infinity observation']]) {
  80 |     await page.goto(`/runs/kazakh-sft-${id}`)
  81 |     const note = page.locator('.metric-loss').getByTestId('invalid-explanation')
  82 |     await expect(note).toContainText(`This snapshot contains ${expected}`)
  83 |     await expect(note).toContainText('invalid values create gaps, never zero')
  84 |     await expect(note.getByRole('link', { name: 'Inspect data quality', exact: true })).toHaveAttribute('href', `/data-quality?run=kazakh-sft-${id}&metric=loss`)
  85 |   }
  86 | })
  87 | 
```