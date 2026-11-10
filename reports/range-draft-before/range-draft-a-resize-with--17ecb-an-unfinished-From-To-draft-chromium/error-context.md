# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: range-draft.spec.ts >> a resize with unchanged numeric range does not overwrite an unfinished From/To draft
- Location: e2e\range-draft.spec.ts:3:1

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByLabel('From step', { exact: true })
Expected: "499990"
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" getByLabel('From step', { exact: true }) with timeout 5000ms
  - waiting for getByLabel('From step', { exact: true })
    14 × locator resolved to <input value="0" step="any" id="_r_5_" required="" type="number" class="_input_6ayfd_4"/>
       - unexpected value "0"

```

```yaml
- spinbutton "From step": "0"
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | test('a resize with unchanged numeric range does not overwrite an unfinished From/To draft', async ({ page }) => {
  4  |   await page.goto('/runs/kazakh-sft-005')
  5  |   const plot = page.getByTestId('loss-chart')
  6  |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  7  |   const from = page.getByLabel('From step', { exact: true })
  8  |   await from.fill('499990')
  9  |   const previous = await page.evaluate(() => (window as unknown as { __soupEvidence: { viewSeq: number } }).__soupEvidence.viewSeq)
  10 |   await page.setViewportSize({ width: 1360, height: 900 })
  11 |   await page.waitForFunction(before => (window as unknown as { __soupEvidence: { viewSeq: number } }).__soupEvidence.viewSeq > before, previous)
  12 |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
> 13 |   await expect(from).toHaveValue('499990')
     |                      ^ Error: expect(locator).toHaveValue(expected) failed
  14 |   await page.getByLabel('To step', { exact: true }).fill('500010')
  15 |   await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  16 |   await expect(plot).toHaveAttribute('data-range-min', '499990')
  17 |   await expect(plot).toHaveAttribute('data-range-max', '500010')
  18 | })
  19 | 
```