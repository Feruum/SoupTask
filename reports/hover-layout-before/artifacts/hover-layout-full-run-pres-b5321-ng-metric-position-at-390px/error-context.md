# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-layout.spec.ts >> full run preserves the following metric position at 390px
- Location: e2e\hover-layout.spec.ts:39:74

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 1565.46875
Received: 1715.96875

Expected precision:    0
Expected difference: < 0.5
Received difference:   150.5
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to content" [ref=e4] [cursor=pointer]:
    - /url: "#main-content"
  - complementary "Workspace" [ref=e5]:
    - navigation "Main navigation" [ref=e6]:
      - link "Dashboard" [ref=e7] [cursor=pointer]:
        - /url: /dashboard
      - link "Training runs" [ref=e14] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=e19] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=e22] [cursor=pointer]:
        - /url: /data-quality
  - generic [ref=e26]:
    - banner [ref=e27]:
      - generic [ref=e28]:
        - generic [ref=e29]: Workspace
        - generic [aria-hidden] [ref=e30]: /
        - generic [ref=e31]: qwen-kazakh
      - generic [ref=e32]:
        - link "Docs" [ref=e33] [cursor=pointer]:
          - /url: https://souplanding-omega.vercel.app/docs/
        - button "Switch to light theme" [ref=e37] [cursor=pointer]
    - main [ref=e49]:
      - link "← All training runs" [ref=e50] [cursor=pointer]:
        - /url: /runs
      - generic [ref=e51]:
        - generic [ref=e52]:
          - heading "kazakh-sft-005" [level=1] [ref=e53]
          - paragraph [ref=e54]: Qwen2.5-3B · DPO · Running · Snapshot Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
        - generic [ref=e55]: Demo snapshot · Smoothing off
      - navigation "Run sections" [ref=e56]:
        - button "Metrics" [pressed] [ref=e57] [cursor=pointer]
        - button "Data quality" [ref=e58] [cursor=pointer]
        - button "Source" [ref=e59] [cursor=pointer]
        - button "Run information" [ref=e60] [cursor=pointer]
      - generic [ref=e61]:
        - generic [ref=e62]:
          - term [ref=e63]: Latest loss
          - definition [ref=e64]: "0.201573"
          - definition [ref=e65]: Highest recorded step 999,999
        - generic [ref=e66]:
          - term [ref=e67]: Minimum loss
          - definition [ref=e68]: "0.200327"
          - definition [ref=e69]: Whole snapshot · step 989,070
        - generic [ref=e70]:
          - term [ref=e71]: Peak loss
          - definition [ref=e72]: "100.000"
          - definition [ref=e73]: Whole snapshot · step 500,001
        - generic [ref=e74]:
          - term [ref=e75]: Raw observations
          - definition [ref=e76]: 1,000,000
          - definition [ref=e77]: Immutable source rows
      - generic [ref=e78]:
        - group [ref=e79]:
          - generic "Adjust chart range Step 500,000 – 500,002" [ref=e80] [cursor=pointer]:
            - generic [ref=e81]:
              - strong [ref=e82]: Adjust chart range
              - generic [ref=e83]: Step 500,000 – 500,002
          - generic [ref=e87]:
            - generic [ref=e88]:
              - generic [ref=e89]:
                - generic [ref=e90]: From step
                - spinbutton "From step" [ref=e91]: "500000"
              - generic [ref=e92]:
                - generic [ref=e93]: To step
                - spinbutton "To step" [ref=e94]: "500002"
              - button "Apply range" [active] [ref=e95] [cursor=pointer]
            - generic [ref=e99]:
              - button "Zoom in" [ref=e100] [cursor=pointer]
              - button "Zoom out" [ref=e104] [cursor=pointer]
              - button "Reset view" [ref=e108] [cursor=pointer]
            - paragraph [ref=e112]: Step 500,000 to 500,002
        - generic [ref=e113]:
          - generic [ref=e114]:
            - generic [ref=e115]:
              - generic [ref=e116]:
                - heading "Loss" [level=2] [ref=e117]
                - paragraph [ref=e118]: Recorded step · Linear scale · Original values
              - generic [ref=e119]: 3 displayed
            - figure "Highlight kazakh-sft-005 0.237258 – 100.000 Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll. Cursor step 500,001 kazakh-sft-005 step 500,001 · Loss 100.000 · Δstep 0 Pin row 500001" [ref=e120]:
              - generic [ref=e130]:
                - generic [ref=e132]:
                  - button "Highlight kazakh-sft-005" [ref=e133] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e135]: 0.237258 – 100.000
                - paragraph [ref=e136]: Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll.
                - generic [ref=e137]:
                  - text: Cursor step 500,001
                  - generic [ref=e138]:
                    - strong [ref=e140]: kazakh-sft-005
                    - generic "Exact source value 100" [ref=e141]:
                      - text: step 500,001 · Loss 100.000 · Δstep 0
                      - button "Pin row 500001" [ref=e142] [cursor=pointer]
          - generic [ref=e143]:
            - generic [ref=e144]:
              - generic [ref=e145]:
                - heading "Learning rate" [level=2] [ref=e146]
                - paragraph [ref=e147]: Recorded step · Linear scale · Original values
              - generic [ref=e148]: 3 displayed
            - figure "Highlight kazakh-sft-005 9.99995E-6 – 9.99999E-6 Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll. Cursor step 500,001 kazakh-sft-005 step 500,001 · Learning rate 9.99997E-6 · Δstep 0 Pin row 500001" [ref=e149]:
              - generic [ref=e159]:
                - generic [ref=e161]:
                  - button "Highlight kazakh-sft-005" [ref=e162] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e164]: 9.99995E-6 – 9.99999E-6
                - paragraph [ref=e165]: Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll.
                - generic [ref=e166]:
                  - text: Cursor step 500,001
                  - generic [ref=e167]:
                    - strong [ref=e169]: kazakh-sft-005
                    - generic "Exact source value 0.00000999996999997" [ref=e170]:
                      - text: step 500,001 · Learning rate 9.99997E-6 · Δstep 0
                      - button "Pin row 500001" [ref=e171] [cursor=pointer]
          - generic [ref=e172]:
            - generic [ref=e173]:
              - generic [ref=e174]:
                - heading "Gradient norm" [level=2] [ref=e175]
                - paragraph [ref=e176]: Recorded step · Linear scale · Original values
              - generic [ref=e177]: 3 displayed
            - figure "Highlight kazakh-sft-005 0.16854 – 0.233255 Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll. Cursor step 500,001 kazakh-sft-005 step 500,001 · Gradient norm 0.16854 · Δstep 0 Pin row 500001" [ref=e178]:
              - generic [ref=e188]:
                - generic [ref=e190]:
                  - button "Highlight kazakh-sft-005" [ref=e191] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e193]: 0.16854 – 0.233255
                - paragraph [ref=e194]: Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll.
                - generic [ref=e195]:
                  - text: Cursor step 500,001
                  - generic [ref=e196]:
                    - strong [ref=e198]: kazakh-sft-005
                    - generic "Exact source value 0.16853975002653898" [ref=e199]:
                      - text: step 500,001 · Gradient norm 0.16854 · Δstep 0
                      - button "Pin row 500001" [ref=e200] [cursor=pointer]
        - paragraph [ref=e201]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e202]: Demo snapshot. No live training or automatic stopping recommendation.
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