# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-layout.spec.ts >> full run preserves the following metric position at 1440px
- Location: e2e\hover-layout.spec.ts:64:74

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
      - paragraph [ref=e92]: Stale source snapshot · older than 24 hours. Refreshing this demo does not change its source timestamp.
      - generic [ref=e93]:
        - group [ref=e94]:
          - generic [ref=e96]:
            - generic [ref=e97]:
              - generic [ref=e98]:
                - generic [ref=e99]: From step
                - spinbutton "From step" [ref=e100]: "500000"
              - generic [ref=e101]:
                - generic [ref=e102]: To step
                - spinbutton "To step" [ref=e103]: "500002"
              - button "Apply range" [active] [ref=e104] [cursor=pointer]
            - generic [ref=e108]:
              - button "Zoom in" [ref=e109] [cursor=pointer]
              - button "Zoom out" [ref=e113] [cursor=pointer]
              - button "Reset view" [ref=e117] [cursor=pointer]
            - paragraph [ref=e121]: Step 500,000 to 500,002
        - generic [ref=e122]:
          - generic [ref=e123]:
            - generic [ref=e124]:
              - generic [ref=e125]:
                - heading "Loss" [level=2] [ref=e126]
                - paragraph [ref=e127]: Recorded step · Linear scale · Original values
              - generic [ref=e128]: 3 displayed
            - 'figure "Highlight kazakh-sft-005 0.237258 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike Original source values" [ref=e129]':
              - generic [ref=e139]:
                - generic [ref=e141]:
                  - button "Highlight kazakh-sft-005" [ref=e142] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e144]: 0.237258 – 100.000
                - paragraph [ref=e145]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e147]:
                  - paragraph [ref=e148]: "Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline."
                  - generic [ref=e149]:
                    - link "Inspect original spike" [ref=e150] [cursor=pointer]:
                      - /url: /runs/kazakh-sft-005?sourceIndex=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
                    - button "Zoom around spike" [ref=e151] [cursor=pointer]
                - region "Original source values" [ref=e155]:
                  - generic [ref=e156]:
                    - paragraph [ref=e157]: Original source values · All metrics
                    - region "Source table" [ref=e158]:
                      - table "Original observations at cursor step" [ref=e159]:
                        - caption [ref=e160]: Original observations at cursor step
                        - rowgroup [ref=e161]:
                          - row [ref=e162]:
                            - columnheader "Run" [ref=e163]
                            - columnheader "Recorded step" [ref=e164]
                            - columnheader "Loss" [ref=e165]
                            - columnheader "Learning rate" [ref=e166]
                            - columnheader "Gradient norm" [ref=e167]
                            - columnheader "Δstep" [ref=e168]
                            - columnheader "Source" [ref=e169]
                        - rowgroup "Original observations for kazakh-sft-005" [ref=e170]:
                          - row [ref=e171]:
                            - rowheader "kazakh-sft-005" [ref=e172]:
                              - strong [ref=e175]: kazakh-sft-005
                            - cell "Point at any chart to inspect the original row and all three metrics." [ref=e176]
                    - paragraph [ref=e177]: Scroll for more rows and metrics. Groups show the first 2 observations.
          - generic [ref=e178]:
            - generic [ref=e179]:
              - generic [ref=e180]:
                - heading "Learning rate" [level=2] [ref=e181]
                - paragraph [ref=e182]: Recorded step · Linear scale · Original values
              - generic [ref=e183]: 3 displayed
            - 'figure "Highlight kazakh-sft-005 9.99995E-6 – 9.99999E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e184]':
              - generic [ref=e194]:
                - generic [ref=e196]:
                  - button "Highlight kazakh-sft-005" [ref=e197] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e199]: 9.99995E-6 – 9.99999E-6
                - paragraph [ref=e200]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - generic [ref=e201]:
            - generic [ref=e202]:
              - generic [ref=e203]:
                - heading "Gradient norm" [level=2] [ref=e204]
                - paragraph [ref=e205]: Recorded step · Linear scale · Original values
              - generic [ref=e206]: 3 displayed
            - 'figure "Highlight kazakh-sft-005 0.16854 – 0.233255 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e207]':
              - generic [ref=e217]:
                - generic [ref=e219]:
                  - button "Highlight kazakh-sft-005" [ref=e220] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e222]: 0.16854 – 0.233255
                - paragraph [ref=e223]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
        - paragraph [ref=e224]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e225]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | async function documentTop(locator: Locator) {
  3   |   return locator.evaluate(element => element.getBoundingClientRect().top + scrollY);
  4   | }
  5   | async function pointAtCenter(page: Page, plot: Locator) {
  6   |   await plot.locator('.u-over').scrollIntoViewIfNeeded();
  7   |   const box = await plot.locator('.u-over').boundingBox();
  8   |   if (!box) throw new Error('Missing chart input surface');
  9   |   const sequence = await page.evaluate(() => (window as Window & {
  10  |     __soupEvidence?: {
  11  |       acceptedHoverSeq: number;
  12  |     };
  13  |   }).__soupEvidence?.acceptedHoverSeq ?? 0);
  14  |   await page.mouse.move(box.x + box.width / 2 - 1, box.y + box.height / 2);
  15  |   await expect.poll(() => page.evaluate(() => (window as Window & {
  16  |     __soupEvidence?: {
  17  |       acceptedHoverSeq: number;
  18  |     };
> 19  |   }).__soupEvidence?.acceptedHoverSeq ?? 0)).toBeGreaterThan(sequence);
      |                                              ^ Error: expect(received).toBeGreaterThan(expected)
  20  | }
  21  | async function setRange(page: Page, min: number, max: number) {
  22  |   const from = page.getByLabel('From step', {
  23  |     exact: true
  24  |   });
  25  |   if (!(await from.isVisible())) await page.locator('.range-disclosure > summary').click();
  26  |   await from.fill(String(min));
  27  |   await page.getByLabel('To step', {
  28  |     exact: true
  29  |   }).fill(String(max));
  30  |   await page.getByRole('button', {
  31  |     name: 'Apply range',
  32  |     exact: true
  33  |   }).click();
  34  |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true');
  35  | }
  36  | for (const route of ['/dashboard', '/runs']) test(`${route} keeps source actions in place while the cursor updates`, async ({
  37  |   page
  38  | }, info) => {
  39  |   await page.setViewportSize({
  40  |     width: 1280,
  41  |     height: 900
  42  |   });
  43  |   await page.goto(route);
  44  |   const plot = page.getByTestId('loss-chart');
  45  |   await expect(plot).toHaveAttribute('data-view-ready', 'true');
  46  |   const next = page.locator(route === '/dashboard' ? '.calm-source-quality' : '.preview-facts');
  47  |   const before = await documentTop(next);
  48  |   await pointAtCenter(page, plot);
  49  |   const after = await documentTop(next);
  50  |   await info.attach('preview-layout', {
  51  |     body: JSON.stringify({
  52  |       route,
  53  |       before,
  54  |       after
  55  |     }),
  56  |     contentType: 'application/json'
  57  |   });
  58  |   expect.soft(after).toBeCloseTo(before, 0);
  59  |   if (route === '/dashboard') await expect(page.locator('.calm-chart .chart-hover-value')).toBeVisible();
  60  |   else await expect(page.locator('.preview-charts .chart-hover-value')).toHaveCount(0);
  61  |   await expect(plot).toHaveAttribute('data-cursor-point-count', /[1-9]/);
  62  |   if (route === '/runs') await expect(page.locator('.preview-charts')).toContainText('inspect original values and adjust range');
  63  | });
  64  | for (const width of [390, 1440]) for (const comparison of [false, true]) test(`${comparison ? 'four-run duplicate comparison' : 'full run'} preserves the following metric position at ${width}px`, async ({
  65  |   page
  66  | }, info) => {
  67  |   await page.setViewportSize({
  68  |     width,
  69  |     height: 900
  70  |   });
  71  |   await page.goto(comparison ? '/compare?runs=kazakh-sft-005,kazakh-sft-009,kazakh-sft-010,kazakh-sft-001' : '/runs/kazakh-sft-005');
  72  |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true');
  73  |   await setRange(page, comparison ? 98 : 500000, comparison ? 100 : 500002);
  74  |   const plot = page.locator('.metric-loss .plot-host'),
  75  |     following = page.locator('.metric-lr'),
  76  |     before = await documentTop(following);
  77  |   await pointAtCenter(page, plot);
  78  |   await expect(page.locator('.metric-loss .chart-hover-value')).toBeVisible();
  79  |   const after = await documentTop(following);
  80  |   await info.attach('full-chart-layout', {
  81  |     body: JSON.stringify({
  82  |       width,
  83  |       comparison,
  84  |       before,
  85  |       after
  86  |     }),
  87  |     contentType: 'application/json'
  88  |   });
  89  |   expect(after).toBeCloseTo(before, 0);
  90  |   await expect(page.getByTestId(comparison ? 'comparison-cursor-readout' : 'cursor-readout-loss')).toHaveAttribute('data-reserved', 'true');
  91  |   if (comparison) {
  92  |     const source = page.getByTestId('comparison-cursor-readout');
  93  |     await expect(source.locator('tbody')).toHaveCount(4);
  94  |     const group = source.locator('tbody[aria-label="Original observations for kazakh-sft-009"]');
  95  |     await expect(group).toContainText('11 returned observations');
  96  |     await expect(group.getByRole('link', {
  97  |       name: 'Inspect full source group', exact: true
  98  |     })).toHaveAttribute('href', /step=99&revision=/);
  99  |   } else {
  100 |     const pin = page.locator('.metric-loss').getByRole('button', {
  101 |       name: 'Pin row 500001',
  102 |       exact: true
  103 |     });
  104 |     await pin.focus();
  105 |     await page.keyboard.press('Enter');
  106 |     await expect(page.getByTestId('pinned-loss')).toHaveText('100');
  107 |   }
  108 |   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  109 | });
  110 | test('the visible recorded spike explains the linear axis and zoom keeps its exact source', async ({
  111 |   page
  112 | }) => {
  113 |   await page.goto('/runs/kazakh-sft-005');
  114 |   const note = page.getByTestId('spike-explanation');
  115 |   await expect(note).toContainText('Recorded spike: loss 100 at step 500,001');
  116 |   await expect(note).toContainText('linear scale includes this peak');
  117 |   await expect(note.getByRole('link', {
  118 |     name: 'Inspect original spike',
  119 |     exact: true
```