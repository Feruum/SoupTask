# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: review-fixes.spec.ts >> quality filters and findings use readable names while URL query values stay stable
- Location: e2e\review-fixes.spec.ts:46:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByRole('combobox', { name: 'Issue type', exact: true }).getByRole('option', { name: '+Infinity', exact: true })
Expected: "posInf"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" getByRole('combobox', { name: 'Issue type', exact: true }).getByRole('option', { name: '+Infinity', exact: true }) with timeout 5000ms
  - waiting for getByRole('combobox', { name: 'Issue type', exact: true }).getByRole('option', { name: '+Infinity', exact: true })

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
  - heading "Data quality" [level=1]
  - paragraph: Every finding links back to an immutable source observation.
  - text: Demo snapshot · Smoothing off
  - term: Runs audited
  - definition: "20"
  - term: Runs with findings
  - definition: "8"
  - term: Invalid observations
  - definition: "8"
  - term: Conflicting groups
  - definition: "9"
  - group:
    - region "Issue types across the workspace":
      - heading "Issue types across the workspace" [level=2]
      - paragraph: Source-derived counts with explicit units.
      - table "Categories overlap. Counts with different units do not sum to affected rows.":
        - caption: Categories overlap. Counts with different units do not sum to affected rows.
        - rowgroup:
          - row "Category Count Unit":
            - columnheader "Category"
            - columnheader "Count"
            - columnheader "Unit"
        - rowgroup:
          - row "NaN 4 metric observations":
            - rowheader "NaN":
              - link "NaN":
                - /url: /data-quality?kind=nan
            - cell "4"
            - cell "metric observations"
          - row "+Infinity 2 metric observations":
            - rowheader "+Infinity":
              - link "+Infinity":
                - /url: /data-quality?kind=posInf
            - cell "2"
            - cell "metric observations"
          - row "−Infinity 2 metric observations":
            - rowheader "−Infinity":
              - link "−Infinity":
                - /url: /data-quality?kind=negInf
            - cell "2"
            - cell "metric observations"
          - row "Additional duplicate rows 13 raw rows beyond the first group member":
            - rowheader "Additional duplicate rows":
              - link "Additional duplicate rows":
                - /url: /data-quality?kind=duplicate
            - cell "13"
            - cell "raw rows beyond the first group member"
          - row "Duplicate steps 4 step groups":
            - rowheader "Duplicate steps":
              - link "Duplicate steps":
                - /url: /data-quality?kind=duplicate
            - cell "4"
            - cell "step groups"
          - row "Conflicting measurements 9 metric groups":
            - rowheader "Conflicting measurements":
              - link "Conflicting measurements":
                - /url: /data-quality?kind=conflict
            - cell "9"
            - cell "metric groups"
          - row "Invalid step coordinates 0 raw rows":
            - rowheader "Invalid step coordinates":
              - link "Invalid step coordinates":
                - /url: /data-quality?kind=invalidX
            - cell "0"
            - cell "raw rows"
          - row "Out-of-order source 2 descending source-order transitions":
            - rowheader "Out-of-order source":
              - link "Out-of-order source":
                - /url: /data-quality?kind=outOfOrder
            - cell "2"
            - cell "descending source-order transitions"
          - row "Known cadence gaps 4 missing intervals":
            - rowheader "Known cadence gaps":
              - link "Known cadence gaps":
                - /url: /data-quality?kind=gap
            - cell "4"
            - cell "missing intervals"
  - group:
    - heading "Source quality matrix" [level=2]
    - paragraph: Execution status and data quality are independent.
    - table "Counts per run and metric. Select a cell to inspect findings.":
      - caption: Counts per run and metric. Select a cell to inspect findings.
      - rowgroup:
        - row "Run Loss Learning rate Gradient norm Duplicates Out of order Missing intervals":
          - columnheader "Run"
          - columnheader "Loss"
          - columnheader "Learning rate"
          - columnheader "Gradient norm"
          - columnheader "Duplicates"
          - columnheader "Out of order"
          - columnheader "Missing intervals"
      - rowgroup:
        - row "kazakh-sft-001 Running Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-001 Running":
            - link "kazakh-sft-001":
              - /url: /data-quality?run=kazakh-sft-001
            - text: Running
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-001&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-001&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-001&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-002 Completed Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-002 Completed":
            - link "kazakh-sft-002":
              - /url: /data-quality?run=kazakh-sft-002
            - text: Completed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-002&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-002&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-002&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-003 Completed Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-003 Completed":
            - link "kazakh-sft-003":
              - /url: /data-quality?run=kazakh-sft-003
            - text: Completed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-003&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-003&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-003&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-004 Failed Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-004 Failed":
            - link "kazakh-sft-004":
              - /url: /data-quality?run=kazakh-sft-004
            - text: Failed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-004&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-004&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-004&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-005 Running Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-005 Running":
            - link "kazakh-sft-005":
              - /url: /data-quality?run=kazakh-sft-005
            - text: Running
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-005&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-005&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-005&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-006 Running 2 findings Clean Clean 0 0 0":
          - rowheader "kazakh-sft-006 Running":
            - link "kazakh-sft-006":
              - /url: /data-quality?run=kazakh-sft-006
            - text: Running
          - cell "2 findings":
            - link "2 findings":
              - /url: /data-quality?run=kazakh-sft-006&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-006&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-006&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-007 Completed 1 findings Clean Clean 0 0 0":
          - rowheader "kazakh-sft-007 Completed":
            - link "kazakh-sft-007":
              - /url: /data-quality?run=kazakh-sft-007
            - text: Completed
          - cell "1 findings":
            - link "1 findings":
              - /url: /data-quality?run=kazakh-sft-007&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-007&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-007&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-008 Completed 1 findings Clean Clean 0 0 0":
          - rowheader "kazakh-sft-008 Completed":
            - link "kazakh-sft-008":
              - /url: /data-quality?run=kazakh-sft-008
            - text: Completed
          - cell "1 findings":
            - link "1 findings":
              - /url: /data-quality?run=kazakh-sft-008&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-008&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-008&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-009 Completed 1 findings 1 findings 1 findings 10 0 1":
          - rowheader "kazakh-sft-009 Completed":
            - link "kazakh-sft-009":
              - /url: /data-quality?run=kazakh-sft-009
            - text: Completed
          - cell "1 findings":
            - link "1 findings":
              - /url: /data-quality?run=kazakh-sft-009&metric=loss
          - cell "1 findings":
            - link "1 findings":
              - /url: /data-quality?run=kazakh-sft-009&metric=lr
          - cell "1 findings":
            - link "1 findings":
              - /url: /data-quality?run=kazakh-sft-009&metric=grad_norm
          - cell "10"
          - cell "0"
          - cell "1"
        - row "kazakh-sft-010 Running 4 findings 3 findings 3 findings 2 0 1":
          - rowheader "kazakh-sft-010 Running":
            - link "kazakh-sft-010":
              - /url: /data-quality?run=kazakh-sft-010
            - text: Running
          - cell "4 findings":
            - link "4 findings":
              - /url: /data-quality?run=kazakh-sft-010&metric=loss
          - cell "3 findings":
            - link "3 findings":
              - /url: /data-quality?run=kazakh-sft-010&metric=lr
          - cell "3 findings":
            - link "3 findings":
              - /url: /data-quality?run=kazakh-sft-010&metric=grad_norm
          - cell "2"
          - cell "0"
          - cell "1"
        - row "kazakh-sft-011 Completed Clean Clean Clean 0 2 0":
          - rowheader "kazakh-sft-011 Completed":
            - link "kazakh-sft-011":
              - /url: /data-quality?run=kazakh-sft-011
            - text: Completed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-011&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-011&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-011&metric=grad_norm
          - cell "0"
          - cell "2"
          - cell "0"
        - row "kazakh-sft-012 Completed 1 findings 1 findings 1 findings 0 0 1":
          - rowheader "kazakh-sft-012 Completed":
            - link "kazakh-sft-012":
              - /url: /data-quality?run=kazakh-sft-012
            - text: Completed
          - cell "1 findings":
            - link "1 findings":
              - /url: /data-quality?run=kazakh-sft-012&metric=loss
          - cell "1 findings":
            - link "1 findings":
              - /url: /data-quality?run=kazakh-sft-012&metric=lr
          - cell "1 findings":
            - link "1 findings":
              - /url: /data-quality?run=kazakh-sft-012&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "1"
        - row "kazakh-sft-013 Completed Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-013 Completed":
            - link "kazakh-sft-013":
              - /url: /data-quality?run=kazakh-sft-013
            - text: Completed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-013&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-013&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-013&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-014 Completed Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-014 Completed":
            - link "kazakh-sft-014":
              - /url: /data-quality?run=kazakh-sft-014
            - text: Completed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-014&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-014&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-014&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-015 Completed Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-015 Completed":
            - link "kazakh-sft-015":
              - /url: /data-quality?run=kazakh-sft-015
            - text: Completed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-015&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-015&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-015&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-016 Completed Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-016 Completed":
            - link "kazakh-sft-016":
              - /url: /data-quality?run=kazakh-sft-016
            - text: Completed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-016&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-016&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-016&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-017 Failed 3 findings 3 findings 3 findings 1 0 1":
          - rowheader "kazakh-sft-017 Failed":
            - link "kazakh-sft-017":
              - /url: /data-quality?run=kazakh-sft-017
            - text: Failed
          - cell "3 findings":
            - link "3 findings":
              - /url: /data-quality?run=kazakh-sft-017&metric=loss
          - cell "3 findings":
            - link "3 findings":
              - /url: /data-quality?run=kazakh-sft-017&metric=lr
          - cell "3 findings":
            - link "3 findings":
              - /url: /data-quality?run=kazakh-sft-017&metric=grad_norm
          - cell "1"
          - cell "0"
          - cell "1"
        - row "kazakh-sft-018 Cancelled Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-018 Cancelled":
            - link "kazakh-sft-018":
              - /url: /data-quality?run=kazakh-sft-018
            - text: Cancelled
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-018&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-018&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-018&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-019 Completed Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-019 Completed":
            - link "kazakh-sft-019":
              - /url: /data-quality?run=kazakh-sft-019
            - text: Completed
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-019&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-019&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-019&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
        - row "kazakh-sft-020 Cancelled Clean Clean Clean 0 0 0":
          - rowheader "kazakh-sft-020 Cancelled":
            - link "kazakh-sft-020":
              - /url: /data-quality?run=kazakh-sft-020
            - text: Cancelled
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-020&metric=loss
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-020&metric=lr
          - cell "Clean":
            - link "Clean":
              - /url: /data-quality?run=kazakh-sft-020&metric=grad_norm
          - cell "0"
          - cell "0"
          - cell "0"
  - heading "Source issue ledger" [level=2]
  - paragraph: Choose a run to inspect original observations and their findings.
  - text: Run
  - combobox "Run":
    - option "Select a run"
    - option "kazakh-sft-001"
    - option "kazakh-sft-002"
    - option "kazakh-sft-003"
    - option "kazakh-sft-004"
    - option "kazakh-sft-005"
    - option "kazakh-sft-006"
    - option "kazakh-sft-007" [selected]
    - option "kazakh-sft-008"
    - option "kazakh-sft-009"
    - option "kazakh-sft-010"
    - option "kazakh-sft-011"
    - option "kazakh-sft-012"
    - option "kazakh-sft-013"
    - option "kazakh-sft-014"
    - option "kazakh-sft-015"
    - option "kazakh-sft-016"
    - option "kazakh-sft-017"
    - option "kazakh-sft-018"
    - option "kazakh-sft-019"
    - option "kazakh-sft-020"
  - text: Metric
  - combobox "Metric":
    - option "All metrics" [selected]
    - option "Loss"
    - option "Learning rate"
    - option "Gradient norm"
  - text: Issue type
  - combobox "Issue type":
    - option "All issue types"
    - option "nan"
    - option "posInf" [selected]
    - option "negInf"
    - option "duplicate"
    - option "conflict"
    - option "invalidX"
    - option "outOfOrder"
    - option "gap"
  - link "posInf at step 4096, source 4096":
    - /url: /runs/kazakh-sft-007?sourceIndex=4096&revision=soup-1.0.0%3Apos-inf%401%3Aseed%3D1006%3An%3D8192%3Acadence%3D1
  - text: Page 1 · findings in the loaded page · recorded step →
  - table "Page 1 · 1 findings · original data unchanged":
    - caption: Page 1 · 1 findings · original data unchanged
    - rowgroup:
      - row "Type Metric Step Source Raw value Details":
        - columnheader "Type"
        - columnheader "Metric"
        - columnheader "Step"
        - columnheader "Source"
        - columnheader "Raw value"
        - columnheader "Details"
    - rowgroup:
      - row "posInf Loss 4,096 4096 +Infinity Inspect source → Non-finite measurement; never replaced with zero":
        - rowheader "posInf"
        - cell "Loss"
        - cell "4,096"
        - cell "4096"
        - cell "+Infinity"
        - cell "Inspect source → Non-finite measurement; never replaced with zero":
          - link "Inspect source →":
            - /url: /runs/kazakh-sft-007?sourceIndex=4096&revision=soup-1.0.0%3Apos-inf%401%3Aseed%3D1006%3An%3D8192%3Acadence%3D1
          - text: Non-finite measurement; never replaced with zero
  - button "Previous findings" [disabled]
  - text: Page 1
  - button "Next findings" [disabled]
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
  10 |   await expect(status).toContainText('No observation at recorded step 1,000,001')
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
> 49 |   await expect(filter.getByRole('option', { name: '+Infinity', exact: true })).toHaveAttribute('value', 'posInf')
     |                                                                                ^ Error: expect(locator).toHaveAttribute(expected) failed
  50 |   await expect(filter.getByRole('option', { name: 'Invalid step coordinates', exact: true })).toHaveAttribute('value', 'invalidX')
  51 |   await expect(page.locator('.issue-ledger-table').getByRole('rowheader', { name: '+Infinity', exact: true })).toBeVisible()
  52 |   await expect(page.locator('.issue-strip').getByRole('link').first()).toHaveAccessibleName(/\+Infinity at step/)
  53 |   await filter.selectOption('outOfOrder')
  54 |   await expect(page).toHaveURL(/kind=outOfOrder/)
  55 |   await expect(filter.getByRole('option', { name: 'Out-of-order source', exact: true })).toBeChecked()
  56 | })
  57 | 
```