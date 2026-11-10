# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: calm-monitor.spec.ts >> selected run and metric survive details, browser Back and reload
- Location: e2e\calm-monitor.spec.ts:74:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByRole('button', { name: 'Learning rate', exact: true })
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" getByRole('button', { name: 'Learning rate', exact: true }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Learning rate', exact: true })
    14 × locator resolved to <button type="button" aria-pressed="false">Learning rate</button>
       - unexpected value "false"

```

```yaml
- button "Learning rate"
```

# Test source

```ts
  1   | import AxeBuilder from '@axe-core/playwright'
  2   | import { expect, test } from '@playwright/test'
  3   | import { assertSpikePainted } from '../scripts/canvas-controls.mjs'
  4   | 
  5   | test('monitor gives the selected run and genuine Loss a single primary workspace', async ({ page }) => {
  6   |   await page.goto('/dashboard')
  7   |   await expect(page.getByRole('heading', { name: 'Training overview', exact: true })).toBeVisible()
  8   |   await expect(page.getByRole('navigation', { name: 'Dashboard views' }).getByRole('link', { name: 'Monitor', exact: true })).toHaveAttribute('aria-current', 'page')
  9   |   await expect(page.locator('.experiment-map')).toHaveCount(0)
  10  |   await expect(page.getByTestId('cursor-readout-loss')).not.toBeVisible()
  11  |   await expect(page.getByRole('heading', { name: 'Experiment groups', exact: true })).toHaveCount(0)
  12  |   await expect(page.locator('.dashboard-findings-rail')).toHaveCount(0)
  13  |   await assertSpikePainted(page)
  14  |   await expect(page.getByTestId('selected-experiment')).toContainText('1,000,000')
  15  |   await expect(page.getByTestId('selected-experiment')).toContainText('500,001')
  16  |   await page.getByRole('button', { name: /^Select kazakh-sft-006\b/ }).click()
  17  |   await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-006')
  18  |   await expect(page.getByTestId('selected-metric')).toContainText('2 invalid')
  19  |   await page.getByRole('button', { name: 'Learning rate', exact: true }).click()
  20  |   await expect(page.getByTestId('lr-chart')).toHaveAttribute('data-view-ready', 'true')
  21  |   await expect(page.getByTestId('selected-metric')).toContainText('Learning rate')
  22  | })
  23  | 
  24  | test('map and groups retain selection, keyboard operation and exact source navigation', async ({ page }) => {
  25  |   await page.goto('/dashboard?view=map')
  26  |   const sector = page.getByRole('button', { name: 'kazakh-sft-006, Loss quality', exact: true })
  27  |   await sector.click()
  28  |   await sector.focus()
  29  |   await page.keyboard.press('ArrowDown')
  30  |   await expect(page.getByRole('button', { name: 'kazakh-sft-006, Learning rate quality', exact: true })).toBeFocused()
  31  |   await page.getByRole('link', { name: 'Monitor selected run', exact: true }).click()
  32  |   await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-006')
  33  |   await expect(page.getByTestId('lr-chart')).toHaveAttribute('data-view-ready', 'true')
  34  |   await expect(page.getByRole('link', { name: 'Inspect issues', exact: true })).toHaveAttribute('href', '/data-quality?run=kazakh-sft-006&metric=lr')
  35  |   await page.getByRole('navigation', { name: 'Dashboard views' }).getByRole('link', { name: 'Groups', exact: true }).click()
  36  |   await page.getByRole('button', { name: /Select kazakh-sft-001 from/ }).click()
  37  |   await page.getByRole('link', { name: 'Monitor selected run', exact: true }).click()
  38  |   await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-001')
  39  | })
  40  | 
  41  | test('navigator searches the whole catalog and filters findings without changing selected data', async ({ page }) => {
  42  |   await page.goto('/dashboard')
  43  |   await page.getByRole('searchbox', { name: 'Search runs', exact: true }).fill('020')
  44  |   await page.getByRole('button', { name: /^Select kazakh-sft-020\b/ }).click()
  45  |   await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-020')
  46  |   await page.getByRole('searchbox', { name: 'Search runs', exact: true }).fill('no-such-run')
  47  |   await expect(page.getByText('No matching runs', { exact: true })).toBeVisible()
  48  |   await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-020')
  49  |   await page.getByRole('button', { name: 'Clear run filters', exact: true }).click()
  50  |   await page.getByRole('button', { name: 'Filter runs', exact: true }).click()
  51  |   await page.getByRole('combobox', { name: 'Run filter', exact: true }).selectOption('findings')
  52  |   await expect(page.getByRole('button', { name: /^Select kazakh-sft-006\b/ })).toBeVisible()
  53  |   await expect(page.getByRole('button', { name: /^Select kazakh-sft-001\b/ })).toHaveCount(0)
  54  | })
  55  | 
  56  | test('chart settings update the real numeric range and Escape restores focus', async ({ page }) => {
  57  |   await page.goto('/dashboard')
  58  |   const plot = page.getByTestId('loss-chart')
  59  |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  60  |   const settings = page.locator('.calm-settings > summary')
  61  |   await settings.focus()
  62  |   await page.keyboard.press('Enter')
  63  |   await page.getByRole('spinbutton', { name: 'From step', exact: true }).fill('500000')
  64  |   await page.getByRole('spinbutton', { name: 'To step', exact: true }).fill('500002')
  65  |   await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  66  |   await expect(plot).toHaveAttribute('data-range-min', '500000')
  67  |   await expect(plot).toHaveAttribute('data-range-max', '500002')
  68  |   await page.keyboard.press('Escape')
  69  |   await expect(page.locator('.calm-settings')).not.toHaveAttribute('open', '')
  70  |   await expect(settings).toBeFocused()
  71  |   await assertSpikePainted(page)
  72  | })
  73  | 
  74  | test('selected run and metric survive details, browser Back and reload', async ({ page }) => {
  75  |   await page.goto('/dashboard')
  76  |   await page.getByRole('button', { name: /^Select kazakh-sft-006\b/ }).click()
  77  |   await page.getByRole('button', { name: 'Learning rate', exact: true }).click()
  78  |   await expect(page.getByTestId('lr-chart')).toHaveAttribute('data-view-ready', 'true')
  79  |   await page.getByRole('link', { name: 'Open run', exact: true }).click()
  80  |   await expect(page).toHaveURL(/\/runs\/kazakh-sft-006$/)
  81  |   await page.goBack()
  82  |   await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-006')
> 83  |   await expect(page.getByRole('button', { name: 'Learning rate', exact: true })).toHaveAttribute('aria-pressed', 'true')
      |                                                                                  ^ Error: expect(locator).toHaveAttribute(expected) failed
  84  |   await page.reload()
  85  |   await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-006')
  86  |   await expect(page.getByTestId('lr-chart')).toHaveAttribute('data-view-ready', 'true')
  87  | })
  88  | 
  89  | for (const theme of ['dark', 'light'] as const) for (const width of [320, 390, 768, 1440]) {
  90  |   test(`${theme} ${width}px monitor fits and stays accessible`, async ({ page }, info) => {
  91  |     await page.setViewportSize({ width, height: width < 800 ? 844 : 1000 })
  92  |     await page.emulateMedia({ reducedMotion: 'reduce' })
  93  |     await page.addInitScript(value => localStorage.setItem('soup-theme', value), theme)
  94  |     await page.goto('/dashboard')
  95  |     await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true')
  96  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  97  |     if (width < 1000) {
  98  |       await expect(page.locator('.calm-navigator')).not.toHaveAttribute('open', '')
  99  |       const run = await page.getByTestId('selected-experiment').boundingBox()
  100 |       expect(run!.y).toBeLessThan(360)
  101 |     }
  102 |     const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  103 |     expect(audit.violations).toEqual([])
  104 |     await page.screenshot({ path: `reports/calm-monitor/${theme}-${width}.png`, fullPage: true })
  105 |     await info.attach('axe', { body: JSON.stringify(audit.violations), contentType: 'application/json' })
  106 |   })
  107 | }
  108 | 
  109 | test('phone run switching collapses the chooser and the chart remains touch scrollable', async ({ browser }) => {
  110 |   const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  111 |   const page = await context.newPage()
  112 |   await page.goto('/dashboard')
  113 |   await page.locator('.calm-navigator > summary').tap()
  114 |   await page.getByRole('combobox', { name: 'Selected experiment', exact: true }).selectOption('kazakh-sft-006')
  115 |   await expect(page.locator('.calm-navigator')).not.toHaveAttribute('open', '')
  116 |   await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-006')
  117 |   const plot = page.getByTestId('loss-chart')
  118 |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  119 |   await plot.locator('.u-over').tap()
  120 |   await expect(page.locator('.chart-hover-value').first()).toBeVisible()
  121 |   const box = await plot.locator('.u-over').boundingBox()
  122 |   const before = await page.evaluate(() => scrollY)
  123 |   const cdp = await context.newCDPSession(page)
  124 |   const x = box!.x + 20, y = box!.y + box!.height - 24
  125 |   await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
  126 |   for (let offset = 20; offset <= 140; offset += 20) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - offset }] })
  127 |   await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  128 |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 40)
  129 |   await cdp.detach()
  130 |   await context.close()
  131 | })
  132 | 
```