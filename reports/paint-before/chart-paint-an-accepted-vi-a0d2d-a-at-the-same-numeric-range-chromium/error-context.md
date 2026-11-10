# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-paint.spec.ts >> an accepted view paints once, including replacement data at the same numeric range
- Location: e2e\chart-paint.spec.ts:33:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 3

  Array [
-   7,
-   7,
-   7,
+   8,
+   8,
+   8,
  ]
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
            - 'figure "Highlight kazakh-sft-005 0.237258 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e128]':
              - generic [ref=e138]:
                - generic [ref=e140]:
                  - button "Highlight kazakh-sft-005" [ref=e141] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e143]: 0.237258 – 100.000
                - paragraph [ref=e144]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - generic [ref=e145]:
            - generic [ref=e146]:
              - generic [ref=e147]:
                - heading "Learning rate" [level=2] [ref=e148]
                - paragraph [ref=e149]: Recorded step · Linear scale · Original values
              - generic [ref=e150]: 3 displayed
            - 'figure "Highlight kazakh-sft-005 9.99995E-6 – 9.99999E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e151]':
              - generic [ref=e161]:
                - generic [ref=e163]:
                  - button "Highlight kazakh-sft-005" [ref=e164] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e166]: 9.99995E-6 – 9.99999E-6
                - paragraph [ref=e167]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - generic [ref=e168]:
            - generic [ref=e169]:
              - generic [ref=e170]:
                - heading "Gradient norm" [level=2] [ref=e171]
                - paragraph [ref=e172]: Recorded step · Linear scale · Original values
              - generic [ref=e173]: 3 displayed
            - 'figure "Highlight kazakh-sft-005 0.16854 – 0.233255 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e174]':
              - generic [ref=e184]:
                - generic [ref=e186]:
                  - button "Highlight kazakh-sft-005" [ref=e187] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e189]: 0.16854 – 0.233255
                - paragraph [ref=e190]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
        - paragraph [ref=e191]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e192]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import { expect, test, type Locator, type Page } from '@playwright/test'
  2  | import { assertSpikePainted } from '../scripts/canvas-controls.mjs'
  3  | 
  4  | test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  5  | 
  6  | async function frames(page: Page) {
  7  |   await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  8  | }
  9  | 
  10 | async function paints(plot: Locator) {
  11 |   return Number(await plot.getAttribute('data-draw-count'))
  12 | }
  13 | 
  14 | async function spikePixels(plot: Locator) {
  15 |   return plot.evaluate(element => {
  16 |     const canvas = element.querySelector('canvas')!, ctx = canvas.getContext('2d')!,
  17 |       x = Number(element.getAttribute('data-spike-x')), y = Number(element.getAttribute('data-spike-y')),
  18 |       sample = document.createElement('canvas')
  19 |     sample.width = sample.height = 1
  20 |     const color = sample.getContext('2d')!
  21 |     color.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-line').trim()
  22 |     color.fillRect(0, 0, 1, 1)
  23 |     const expected = [...color.getImageData(0, 0, 1, 1).data].slice(0, 3),
  24 |       pixels = ctx.getImageData(Math.round(x) - 3, Math.round(y) - 3, 7, 7).data
  25 |     let alpha = 0
  26 |     for (let i = 0; i < pixels.length; i += 4) {
  27 |       if (expected.every((channel, j) => Math.abs(channel - pixels[i + j]) < 35)) alpha = Math.max(alpha, pixels[i + 3])
  28 |     }
  29 |     return { alpha, expected }
  30 |   })
  31 | }
  32 | 
  33 | test('an accepted view paints once, including replacement data at the same numeric range', async ({ page }) => {
  34 |   await page.goto('/runs/kazakh-sft-005')
  35 |   await page.evaluate(() => document.fonts.ready)
  36 |   const grid = page.locator('.metric-grid'), plot = page.getByTestId('loss-chart'),
  37 |     section = page.locator('.metric-loss'), charts = ['loss-chart', 'lr-chart', 'grad-chart'].map(id => page.getByTestId(id))
  38 |   await expect(grid).toHaveAttribute('data-view-ready', 'true')
  39 |   await frames(page)
  40 |   await page.getByLabel('From step', { exact: true }).fill('500000')
  41 |   await page.getByLabel('To step', { exact: true }).fill('500002')
  42 |   for (let replacement = 0; replacement < 2; replacement++) {
  43 |     const before = await Promise.all(charts.map(paints)), sequence = Number(await section.getAttribute('data-view-seq'))
  44 |     await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  45 |     await expect.poll(async () => Number(await section.getAttribute('data-view-seq'))).toBeGreaterThan(sequence)
  46 |     await expect(grid).toHaveAttribute('data-view-ready', 'true')
  47 |     await frames(page)
> 48 |     expect(await Promise.all(charts.map(paints))).toEqual(before.map(count => count + 1))
     |                                                   ^ Error: expect(received).toEqual(expected) // deep equality
  49 |     await expect(plot).toHaveAttribute('data-range-min', '500000')
  50 |     await expect(plot).toHaveAttribute('data-range-max', '500002')
  51 |     await assertSpikePainted(page)
  52 |   }
  53 | })
  54 | 
  55 | test('focus repaints only changed alpha while theme changes retain actual source paint', async ({ page }) => {
  56 |   await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001')
  57 |   await page.evaluate(() => document.fonts.ready)
  58 |   const plot = page.getByTestId('comparison-loss'), section = page.locator('.metric-loss')
  59 |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  60 |   await frames(page)
  61 |   expect((await spikePixels(plot)).alpha).toBeGreaterThan(240)
  62 |   const before = await paints(plot)
  63 |   const legend = section.getByRole('button', { name: 'Highlight kazakh-sft-001', exact: true })
  64 |   await legend.focus()
  65 |   await expect(plot).toHaveAttribute('data-focused-run', 'kazakh-sft-001')
  66 |   await frames(page)
  67 |   expect(await paints(plot)).toBe(before + 1)
  68 |   const dimmed = await spikePixels(plot)
  69 |   expect(dimmed.alpha).toBeGreaterThan(30)
  70 |   expect(dimmed.alpha).toBeLessThan(100)
  71 |   await page.getByRole('button', { name: 'Reset view', exact: true }).focus()
  72 |   await expect(plot).toHaveAttribute('data-focused-run', '')
  73 |   await frames(page)
  74 |   expect(await paints(plot)).toBe(before + 2)
  75 |   expect((await spikePixels(plot)).alpha).toBeGreaterThan(240)
  76 |   const dark = await spikePixels(plot)
  77 |   await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click()
  78 |   await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  79 |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  80 |   await frames(page)
  81 |   const light = await spikePixels(plot)
  82 |   expect(light.expected).not.toEqual(dark.expected)
  83 |   expect(light.alpha).toBeGreaterThan(240)
  84 | })
  85 | 
```