# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: review-fixes.spec.ts >> an accepted source lookup with zero matches announces its recorded step and recovery
- Location: e2e\review-fixes.spec.ts:3:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('inspection-status')
Expected substring: "No observation at recorded step 1,000,001"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" getByTestId('inspection-status') with timeout 5000ms
  - waiting for getByTestId('inspection-status')

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
  - heading "kazakh-sft-005" [level=1]
  - paragraph: Qwen2.5-3B · DPO · Running · Snapshot Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
  - text: Demo snapshot · Smoothing off
  - navigation "Run sections":
    - button "Metrics"
    - button "Data quality"
    - button "Source" [pressed]
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
  - heading "Source inspector" [level=2]
  - paragraph: Exact measurements in original arrival order. No interpolation.
  - combobox "Inspect by":
    - option "Recorded step" [selected]
    - option "Source index"
  - text: Source step
  - spinbutton "Source step": "1000001"
  - button "Inspect step"
  - group: Browse source rows
  - paragraph: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | test('an accepted source lookup with zero matches announces its recorded step and recovery', async ({ page }) => {
  4  |   await page.goto('/runs/kazakh-sft-005')
  5  |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true')
  6  |   await page.getByRole('button', { name: 'Source', exact: true }).click()
  7  |   await page.getByLabel('Source step', { exact: true }).fill('1000001')
  8  |   await page.getByRole('button', { name: 'Inspect step', exact: true }).click()
  9  |   const status = page.getByTestId('inspection-status')
> 10 |   await expect(status).toContainText('No observation at recorded step 1,000,001')
     |                        ^ Error: expect(locator).toContainText(expected) failed
  11 |   await page.getByLabel('Source step', { exact: true }).fill('500001')
  12 |   await expect(status).toContainText('No observation at recorded step 1,000,001')
  13 |   await page.getByRole('button', { name: 'Browse source rows', exact: true }).click()
  14 |   await expect(page.locator('.source-details')).toHaveAttribute('open', '')
  15 |   await page.getByRole('button', { name: 'Inspect step', exact: true }).click()
  16 |   await expect(page.getByTestId('inspected-loss')).toHaveText('100.000')
  17 |   await expect(status).toContainText('recorded step 500,001')
  18 | })
  19 | 
  20 | for (const width of [1024, 1280, 1400]) test(`stacked preview at ${width}px brings its selected run into view and focuses its heading`, async ({ page }) => {
  21 |   await page.setViewportSize({ width, height: 900 })
  22 |   await page.goto('/runs')
  23 |   await page.getByRole('button', { name: 'Preview kazakh-sft-002', exact: true }).click()
  24 |   const heading = page.locator('.run-preview').getByRole('heading', { name: 'kazakh-sft-002', exact: true })
  25 |   await expect(heading).toBeFocused()
  26 |   const box = await heading.boundingBox()
  27 |   expect(box).not.toBeNull()
  28 |   expect(box!.y).toBeGreaterThanOrEqual(0)
  29 |   expect(box!.y).toBeLessThan(300)
  30 | })
  31 | 
  32 | test('compact preview help links to real range controls on both preview hosts', async ({ page }) => {
  33 |   await page.setViewportSize({ width: 390, height: 844 })
  34 |   for (const route of ['/dashboard', '/runs']) {
  35 |     await page.goto(route)
  36 |     if (route === '/runs') await page.getByRole('button', { name: 'Preview kazakh-sft-002', exact: true }).click()
  37 |     const preview = page.locator('.preview-charts')
  38 |     await expect(preview).toBeVisible()
  39 |     await expect(preview).not.toContainText('Use Adjust chart range to zoom')
  40 |     await preview.getByRole('link', { name: 'Open run and adjust range', exact: true }).click()
  41 |     await expect(page).toHaveURL(/\/runs\/kazakh-sft-\d{3}$/)
  42 |     await expect(page.getByText('Adjust chart range', { exact: true })).toBeVisible()
  43 |   }
  44 | })
  45 | 
  46 | test('quality filters and findings use readable names while URL query values stay stable', async ({ page }) => {
  47 |   await page.goto('/data-quality?run=kazakh-sft-007&kind=posInf')
  48 |   const filter = page.getByRole('combobox', { name: 'Issue type', exact: true })
  49 |   await expect(filter.getByRole('option', { name: '+Infinity', exact: true })).toHaveAttribute('value', 'posInf')
  50 |   await expect(filter.getByRole('option', { name: 'Invalid step coordinates', exact: true })).toHaveAttribute('value', 'invalidX')
  51 |   await expect(page.locator('.issue-ledger-table').getByRole('rowheader', { name: '+Infinity', exact: true })).toBeVisible()
  52 |   await expect(page.locator('.issue-strip').getByRole('link').first()).toHaveAccessibleName(/\+Infinity at step/)
  53 |   await filter.selectOption('outOfOrder')
  54 |   await expect(page).toHaveURL(/kind=outOfOrder/)
  55 |   await expect(filter.getByRole('option', { name: 'Out-of-order source', exact: true })).toBeChecked()
  56 | })
  57 | 
```