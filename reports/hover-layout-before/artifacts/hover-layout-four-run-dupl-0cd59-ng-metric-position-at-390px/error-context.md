# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-layout.spec.ts >> four-run duplicate comparison preserves the following metric position at 390px
- Location: e2e\hover-layout.spec.ts:39:74

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 1589.1875
Received: 2452.6875

Expected precision:    0
Expected difference: < 0.5
Received difference:   863.5
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
      - link "Compare" [ref=e18] [cursor=pointer]:
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
      - generic [ref=e50]:
        - generic [ref=e51]:
          - heading "Compare runs" [level=1] [ref=e52]
          - paragraph [ref=e53]: 4 runs selected · Aligned by original recorded step
        - generic [ref=e54]: Demo snapshot · Smoothing off
      - region "Comparison selection" [ref=e55]:
        - paragraph [ref=e56]: Selected experiments
        - list [ref=e57]:
          - listitem [ref=e58]:
            - button "Remove kazakh-sft-005 from comparison" [ref=e59] [cursor=pointer]: kazakh-sft-005
          - listitem [ref=e63]:
            - button "Remove kazakh-sft-009 from comparison" [ref=e64] [cursor=pointer]: kazakh-sft-009
          - listitem [ref=e68]:
            - button "Remove kazakh-sft-010 from comparison" [ref=e69] [cursor=pointer]: kazakh-sft-010
          - listitem [ref=e73]:
            - button "Remove kazakh-sft-001 from comparison" [ref=e74] [cursor=pointer]: kazakh-sft-001
      - generic [ref=e78]:
        - complementary [ref=e79]:
          - group [ref=e80]:
            - generic "Edit comparison runs 4/4 selected" [ref=e81] [cursor=pointer]:
              - generic [ref=e82]:
                - strong [ref=e83]: Edit comparison runs
                - generic [ref=e84]: 4/4 selected
        - generic [ref=e87]:
          - navigation "Visible metrics" [ref=e88]:
            - button "All metrics" [pressed] [ref=e89] [cursor=pointer]
            - button "Loss" [ref=e90] [cursor=pointer]
            - button "Learning rate" [ref=e91] [cursor=pointer]
            - button "Gradient norm" [ref=e92] [cursor=pointer]
          - group [ref=e93]:
            - generic "Adjust chart range Step 98 – 100" [ref=e94] [cursor=pointer]:
              - generic [ref=e95]:
                - strong [ref=e96]: Adjust chart range
                - generic [ref=e97]: Step 98 – 100
            - generic [ref=e101]:
              - generic [ref=e102]:
                - generic [ref=e103]:
                  - generic [ref=e104]: From step
                  - spinbutton "From step" [ref=e105]: "98"
                - generic [ref=e106]:
                  - generic [ref=e107]: To step
                  - spinbutton "To step" [ref=e108]: "100"
                - button "Apply range" [active] [ref=e109] [cursor=pointer]
              - generic [ref=e113]:
                - button "Zoom in" [ref=e114] [cursor=pointer]
                - button "Zoom out" [ref=e118] [cursor=pointer]
                - button "Reset view" [ref=e122] [cursor=pointer]
              - paragraph [ref=e126]: Step 98 to 100
          - generic [ref=e127]:
            - generic [ref=e128]:
              - generic [ref=e129]:
                - generic [ref=e130]:
                  - heading "Loss" [level=2] [ref=e131]
                  - paragraph [ref=e132]: Recorded step · Linear scale · Original values
                - generic [ref=e133]: 12 displayed
              - figure [ref=e134]:
                - generic [ref=e144]:
                  - generic [ref=e145]:
                    - generic [ref=e146]:
                      - button "Highlight kazakh-sft-005" [ref=e147] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e149]: 1.832639 – 1.838472
                    - generic [ref=e150]:
                      - button "Highlight kazakh-sft-009" [ref=e151] [cursor=pointer]: kazakh-sft-009
                      - generic [ref=e153]: 1.812318 – 1.851895
                    - generic [ref=e154]:
                      - button "Highlight kazakh-sft-010" [ref=e155] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e157]: 1.818151 – 12.000
                    - generic [ref=e158]:
                      - button "Highlight kazakh-sft-001" [ref=e159] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e161]: 1.81543 – 1.835924
                  - paragraph [ref=e162]: Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll.
                  - generic [ref=e163]:
                    - text: Cursor step 99
                    - generic [ref=e164]:
                      - strong [ref=e166]: kazakh-sft-005
                      - generic "Exact source value 1.8384721750137045" [ref=e167]:
                        - text: step 99 · Loss 1.838472 · Δstep 0
                        - button "Pin row 99" [ref=e168] [cursor=pointer]
                    - generic [ref=e169]:
                      - strong [ref=e171]: kazakh-sft-009
                      - generic "Exact source value 1.8123179425694629" [ref=e172]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 99" [ref=e173] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e174]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 100" [ref=e175] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e176]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 101" [ref=e177] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e178]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 102" [ref=e179] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e180]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 103" [ref=e181] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e182]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 104" [ref=e183] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e184]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 105" [ref=e185] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e186]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 106" [ref=e187] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e188]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 107" [ref=e189] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e190]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 108" [ref=e191] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e192]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 109" [ref=e193] [cursor=pointer]
                    - generic [ref=e194]:
                      - strong [ref=e196]: kazakh-sft-010
                      - generic "Exact source value 1.843662141340284" [ref=e197]:
                        - text: step 99 · Loss 1.843662 · Δstep 0
                        - button "Pin row 99" [ref=e198] [cursor=pointer]
                    - generic [ref=e199]:
                      - strong [ref=e201]: kazakh-sft-001
                      - generic "Exact source value 1.8154303981759234" [ref=e202]:
                        - text: step 99 · Loss 1.81543 · Δstep 0
                        - button "Pin row 99" [ref=e203] [cursor=pointer]
            - generic [ref=e204]:
              - generic [ref=e205]:
                - generic [ref=e206]:
                  - heading "Learning rate" [level=2] [ref=e207]
                  - paragraph [ref=e208]: Recorded step · Linear scale · Original values
                - generic [ref=e209]: 12 displayed
              - figure [ref=e210]:
                - generic [ref=e220]:
                  - generic [ref=e221]:
                    - generic [ref=e222]:
                      - button "Highlight kazakh-sft-005" [ref=e223] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e225]: 2.35177E-8 – 2.39976E-8
                    - generic [ref=e226]:
                      - button "Highlight kazakh-sft-009" [ref=e227] [cursor=pointer]: kazakh-sft-009
                      - generic [ref=e229]: 2.83709E-6 – 2.86569E-6
                    - generic [ref=e230]:
                      - button "Highlight kazakh-sft-010" [ref=e231] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e233]: 2.83709E-6 – 2.92286E-6
                    - generic [ref=e234]:
                      - button "Highlight kazakh-sft-001" [ref=e235] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e237]: 2.83709E-6 – 2.89427E-6
                  - paragraph [ref=e238]: Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll.
                  - generic [ref=e239]:
                    - text: Cursor step 99
                    - generic [ref=e240]:
                      - strong [ref=e242]: kazakh-sft-005
                      - generic "Exact source value 2.3757671515319275e-8" [ref=e243]:
                        - text: step 99 · Learning rate 2.37577E-8 · Δstep 0
                        - button "Pin row 99" [ref=e244] [cursor=pointer]
                    - generic [ref=e245]:
                      - strong [ref=e247]: kazakh-sft-009
                      - generic "Exact source value 0.000002865685053441384" [ref=e248]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 99" [ref=e249] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e250]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 100" [ref=e251] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e252]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 101" [ref=e253] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e254]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 102" [ref=e255] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e256]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 103" [ref=e257] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e258]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 104" [ref=e259] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e260]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 105" [ref=e261] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e262]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 106" [ref=e263] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e264]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 107" [ref=e265] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e266]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 108" [ref=e267] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e268]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 109" [ref=e269] [cursor=pointer]
                    - generic [ref=e270]:
                      - strong [ref=e272]: kazakh-sft-010
                      - generic "Exact source value 0.000002865685053441384" [ref=e273]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 99" [ref=e274] [cursor=pointer]
                    - generic [ref=e275]:
                      - strong [ref=e277]: kazakh-sft-001
                      - generic "Exact source value 0.000002865685053441384" [ref=e278]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 99" [ref=e279] [cursor=pointer]
            - generic [ref=e280]:
              - generic [ref=e281]:
                - generic [ref=e282]:
                  - heading "Gradient norm" [level=2] [ref=e283]
                  - paragraph [ref=e284]: Recorded step · Linear scale · Original values
                - generic [ref=e285]: 12 displayed
              - figure [ref=e286]:
                - generic [ref=e296]:
                  - generic [ref=e297]:
                    - generic [ref=e298]:
                      - button "Highlight kazakh-sft-005" [ref=e299] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e301]: 0.203161 – 0.239146
                    - generic [ref=e302]:
                      - button "Highlight kazakh-sft-009" [ref=e303] [cursor=pointer]: kazakh-sft-009
                      - generic [ref=e305]: 0.213264 – 0.237536
                    - generic [ref=e306]:
                      - button "Highlight kazakh-sft-010" [ref=e307] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e309]: 0.190018 – 0.233712
                    - generic [ref=e310]:
                      - button "Highlight kazakh-sft-001" [ref=e311] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e313]: 0.141555 – 0.21611
                  - paragraph [ref=e314]: Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll.
                  - generic [ref=e315]:
                    - text: Cursor step 99
                    - generic [ref=e316]:
                      - strong [ref=e318]: kazakh-sft-005
                      - generic "Exact source value 0.23914566122461112" [ref=e319]:
                        - text: step 99 · Gradient norm 0.239146 · Δstep 0
                        - button "Pin row 99" [ref=e320] [cursor=pointer]
                    - generic [ref=e321]:
                      - strong [ref=e323]: kazakh-sft-009
                      - generic "Exact source value 0.21326351571828128" [ref=e324]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 99" [ref=e325] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e326]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 100" [ref=e327] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e328]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 101" [ref=e329] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e330]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 102" [ref=e331] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e332]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 103" [ref=e333] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e334]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 104" [ref=e335] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e336]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 105" [ref=e337] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e338]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 106" [ref=e339] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e340]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 107" [ref=e341] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e342]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 108" [ref=e343] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e344]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 109" [ref=e345] [cursor=pointer]
                    - generic [ref=e346]:
                      - strong [ref=e348]: kazakh-sft-010
                      - generic "Exact source value 0.20099927197210493" [ref=e349]:
                        - text: step 99 · Gradient norm 0.200999 · Δstep 0
                        - button "Pin row 99" [ref=e350] [cursor=pointer]
                    - generic [ref=e351]:
                      - strong [ref=e353]: kazakh-sft-001
                      - generic "Exact source value 0.1487488753022626" [ref=e354]:
                        - text: step 99 · Gradient norm 0.148749 · Δstep 0
                        - button "Pin row 99" [ref=e355] [cursor=pointer]
          - group [ref=e356]:
            - strong [ref=e359] [cursor=pointer]: Whole-run summaries
            - option "Loss" [selected]
            - option "Learning rate"
            - option "Gradient norm"
          - generic [ref=e362]:
            - generic [ref=e363]:
              - heading "Cursor source values" [level=2] [ref=e364]
              - paragraph [ref=e365]: Nearest recorded step shown separately for each run.
            - generic [ref=e366]:
              - strong [ref=e367]: kazakh-sft-005
              - generic [ref=e368]: step 99 · loss 1.838472 · source 99
            - generic [ref=e369]:
              - strong [ref=e370]: kazakh-sft-009
              - generic [ref=e371]: step 99 · loss 1.812318 · source 99
              - generic [ref=e372]: step 99 · loss 1.812318 · source 100
              - generic [ref=e373]: step 99 · loss 1.812318 · source 101
              - generic [ref=e374]: step 99 · loss 1.812318 · source 102
              - generic [ref=e375]: step 99 · loss 1.812318 · source 103
              - generic [ref=e376]: step 99 · loss 1.812318 · source 104
              - generic [ref=e377]: step 99 · loss 1.812318 · source 105
              - generic [ref=e378]: step 99 · loss 1.812318 · source 106
              - generic [ref=e379]: step 99 · loss 1.812318 · source 107
              - generic [ref=e380]: step 99 · loss 1.812318 · source 108
              - generic [ref=e381]: step 99 · loss 1.812318 · source 109
            - generic [ref=e382]:
              - strong [ref=e383]: kazakh-sft-010
              - generic [ref=e384]: step 99 · loss 1.843662 · source 99
            - generic [ref=e385]:
              - strong [ref=e386]: kazakh-sft-001
              - generic [ref=e387]: step 99 · loss 1.81543 · source 99
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