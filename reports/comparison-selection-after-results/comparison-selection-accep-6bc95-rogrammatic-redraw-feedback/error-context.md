# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: comparison-selection.spec.ts >> accepted hover remains idle without programmatic redraw feedback
- Location: e2e\comparison-selection.spec.ts:85:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.chart-hover-value').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.chart-hover-value').first() with timeout 5000ms
  - waiting for locator('.chart-hover-value').first()

```

```yaml
- link "Skip to content":
  - /url: "#main-content"
- complementary "Workspace":
  - link "Soup home":
    - /url: /dashboard
    - text: Soup.
  - text: Almaty Lab
  - navigation "Main navigation":
    - link "Dashboard":
      - /url: /dashboard
    - link "Training runs":
      - /url: /runs
    - link "Compare":
      - /url: /compare
    - link "Data quality":
      - /url: /data-quality
  - link "Soup documentation":
    - /url: https://souplanding-omega.vercel.app/docs/
  - figure "BUILT IN KAZAKHSTAN"
- banner:
  - text: Workspace qwen-kazakh Demo data
  - button "Switch to light theme"
- main:
  - link "← All training runs":
    - /url: /runs
  - paragraph: SOUP / EXPERIMENT WORKSPACE
  - heading "kazakh-sft-005" [level=1]
  - paragraph: Qwen2.5-3B · DPO · Running · Snapshot Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
  - text: Demo snapshot · Smoothing off
  - navigation "Run sections":
    - button "Metrics" [pressed]
    - button "Data quality"
    - button "Source"
    - button "Run information"
  - term: Latest loss
  - definition: "0.201573"
  - definition: Highest recorded step 999,999
  - term: Minimum loss
  - definition: "0.200327"
  - definition: Whole snapshot · step 989,070
  - term: Peak loss
  - definition: "100.000"
  - definition: Whole snapshot · step 500,001
  - term: Raw observations
  - definition: 1,000,000
  - definition: Immutable source rows
  - text: From step
  - spinbutton "From step": "0"
  - text: To step
  - spinbutton "To step": "999999"
  - button "Apply range"
  - button "Zoom in"
  - button "Zoom out"
  - button "Reset view"
  - paragraph: Step 0 to 999,999
  - heading "Loss" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 4140 displayed
  - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.200327 – 100.000
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
  - heading "Learning rate" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 893 displayed
  - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0E0 – 1.83333E-5
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
  - heading "Gradient norm" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 1784 displayed
  - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.140 – 0.240
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
  - paragraph: Source values remain unchanged. Whole-run cards do not change with zoom.
  - paragraph: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | const chosen = ['005', '001', '002', '006'];
  3   | const name = (id: string) => `kazakh-sft-${id}`;
  4   | test('CPU4 comparison checkbox updates immediately and preserves rapid intent plus back/forward', async ({
  5   |   page
  6   | }) => {
  7   |   const cdp = await page.context().newCDPSession(page);
  8   |   await cdp.send('Emulation.setCPUThrottlingRate', {
  9   |     rate: 4
  10  |   });
  11  |   try {
  12  |     for (let attempt = 0; attempt < 3; attempt++) {
  13  |       await page.goto('/compare');
  14  |       await expect(page.getByRole('heading', {
  15  |         name: 'Compare runs',
  16  |         exact: true
  17  |       })).toBeVisible();
  18  |       for (const id of chosen) {
  19  |         await page.getByRole('checkbox', {
  20  |           name: `Compare ${name(id)}`,
  21  |           exact: true
  22  |         }).check();
  23  |         await expect(page.getByRole('checkbox', {
  24  |           name: `Compare ${name(id)}`,
  25  |           exact: true
  26  |         })).toBeChecked();
  27  |       }
  28  |       await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(chosen.map(name).join(','));
  29  |       await page.getByRole('checkbox', {
  30  |         name: `Compare ${name('001')}`,
  31  |         exact: true
  32  |       }).uncheck();
  33  |       await page.getByRole('checkbox', {
  34  |         name: `Compare ${name('001')}`,
  35  |         exact: true
  36  |       }).check();
  37  |       await page.getByRole('checkbox', {
  38  |         name: `Compare ${name('005')}`,
  39  |         exact: true
  40  |       }).uncheck();
  41  |       await page.getByRole('checkbox', {
  42  |         name: `Compare ${name('019')}`,
  43  |         exact: true
  44  |       }).check();
  45  |       await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(['002', '006', '001', '019'].map(name).join(','));
  46  |       await page.goBack();
  47  |       await expect(page.getByRole('checkbox', {
  48  |         name: `Compare ${name('019')}`,
  49  |         exact: true
  50  |       })).not.toBeChecked();
  51  |       await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(['002', '006', '001'].map(name).join(','));
  52  |       await page.goForward();
  53  |       await expect(page.getByRole('checkbox', {
  54  |         name: `Compare ${name('019')}`,
  55  |         exact: true
  56  |       })).toBeChecked();
  57  |     }
  58  |   } finally {
  59  |     await cdp.send('Emulation.setCPUThrottlingRate', {
  60  |       rate: 1
  61  |     });
  62  |   }
  63  | });
  64  | test('unknown URL identifiers remain explicit while selection is edited', async ({
  65  |   page
  66  | }) => {
  67  |   await page.goto('/compare?runs=unknown-run');
  68  |   await expect(page.getByRole('alert')).toContainText('Unknown run identifiers');
  69  |   await page.getByRole('checkbox', {
  70  |     name: `Compare ${name('001')}`,
  71  |     exact: true
  72  |   }).check();
  73  |   await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(`unknown-run,${name('001')}`);
  74  |   await expect(page.getByRole('alert')).toContainText('unknown-run');
  75  |   await page.getByRole('button', {
  76  |     name: 'Clear selection',
  77  |     exact: true
  78  |   }).click();
  79  |   await expect(page.getByRole('heading', {
  80  |     name: 'Select runs to compare',
  81  |     exact: true
  82  |   })).toBeVisible();
  83  |   await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(null);
  84  | });
  85  | test('accepted hover remains idle without programmatic redraw feedback', async ({
  86  |   page
  87  | }) => {
  88  |   await page.goto('/runs/kazakh-sft-005');
  89  |   await page.evaluate(() => document.fonts.ready);
  90  |   const plot = page.getByTestId('loss-chart');
  91  |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true');
  92  |   await plot.scrollIntoViewIfNeeded();
  93  |   await plot.locator('.u-over').hover();
> 94  |   await expect(page.locator('.chart-hover-value').first()).toBeVisible();
      |                                                            ^ Error: expect(locator).toBeVisible() failed
  95  |   const before = await page.evaluate(() => performance.getEntriesByName('soup:hover').length),
  96  |     draws = await plot.getAttribute('data-draw-count');
  97  |   // This fixed idle-observation window detects the previous response -> redraw -> request loop; it does not arrange an async race.
  98  |   await page.waitForTimeout(400);
  99  |   expect(await page.evaluate(() => performance.getEntriesByName('soup:hover').length)).toBe(before);
  100 |   expect(await plot.getAttribute('data-draw-count')).toBe(draws);
  101 | });
  102 | 
```