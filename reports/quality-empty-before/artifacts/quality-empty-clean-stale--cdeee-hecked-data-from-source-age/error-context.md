# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: quality-empty.spec.ts >> clean stale snapshot separates checked data from source age
- Location: e2e\quality-empty.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.issue-detail').getByRole('heading', { name: 'No source data issues', exact: true })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.issue-detail').getByRole('heading', { name: 'No source data issues', exact: true }) with timeout 15000ms
  - waiting for locator('.issue-detail').getByRole('heading', { name: 'No source data issues', exact: true })

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
    - option "kazakh-sft-007"
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
    - option "kazakh-sft-020" [selected]
  - text: Metric
  - combobox "Metric":
    - option "All metrics" [selected]
    - option "Loss"
    - option "Learning rate"
    - option "Gradient norm"
  - text: Issue type
  - combobox "Issue type":
    - option "All issue types" [selected]
    - option "NaN"
    - option "+Infinity"
    - option "−Infinity"
    - option "Duplicate steps"
    - option "Conflicting measurements"
    - option "Invalid step coordinates"
    - option "Out-of-order source"
    - option "Known cadence gaps"
  - text: Page 1 · findings in the loaded page · recorded step →
  - heading "No matching findings" [level=3]
  - paragraph: This snapshot has no source issues matching these filters.
  - button "Previous findings" [disabled]
  - text: Page 1
  - button "Next findings" [disabled]
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | test('clean stale snapshot separates checked data from source age', async ({ page }, info) => {
  4  |   await page.clock.setFixedTime(new Date('2026-11-10T00:00:00Z'));
  5  |   await page.setViewportSize({ width: 1440, height: 1000 });
  6  |   await page.goto('/data-quality?run=kazakh-sft-020');
  7  |   const ledger = page.locator('.issue-detail');
> 8  |   await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toBeVisible({ timeout: 15000 });
     |                                                                                             ^ Error: expect(locator).toBeVisible() failed
  9  |   await expect(ledger).toContainText('8,192 source rows');
  10 |   await expect(ledger).toContainText('Loss, Learning rate and Gradient norm');
  11 |   await expect(ledger.getByTestId('source-age')).toHaveText('Stale source snapshot');
  12 |   await expect(ledger.locator('time[datetime="2026-11-03T00:00:00Z"]')).toContainText('UTC');
  13 |   await expect(ledger.getByLabel('Issue locations by recorded step')).toHaveCount(0);
  14 |   await expect(ledger.getByRole('button', { name: 'Previous findings', exact: true })).toHaveCount(0);
  15 |   await expect(ledger.getByRole('button', { name: 'Next findings', exact: true })).toHaveCount(0);
  16 |   await expect(ledger.getByText('Page 1', { exact: true })).toHaveCount(0);
  17 |   const ladle = ledger.locator('[data-soup-art="ladle"] img');
  18 |   await expect(ladle).toBeVisible();
  19 |   await ladle.evaluate(image => (image as HTMLImageElement).decode());
  20 |   await page.screenshot({ path: info.outputPath('stale-clean-desktop.png'), fullPage: true, animations: 'disabled' });
  21 | });
  22 | 
  23 | test('filtered miss explains scope and clearing keeps the selected run', async ({ page }, info) => {
  24 |   await page.addInitScript(() => localStorage.setItem('soup-theme', 'light'));
  25 |   await page.setViewportSize({ width: 390, height: 1000 });
  26 |   await page.goto('/data-quality?run=kazakh-sft-006&metric=lr&kind=nan');
  27 |   const ledger = page.locator('.issue-detail');
  28 |   await expect(ledger.getByRole('heading', { name: 'No matching findings', exact: true })).toBeVisible({ timeout: 15000 });
  29 |   await expect(ledger).toContainText('Learning rate');
  30 |   await expect(ledger).toContainText('NaN');
  31 |   await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toHaveCount(0);
  32 |   await expect(ledger.getByLabel('Issue locations by recorded step')).toHaveCount(0);
  33 |   await expect(ledger.getByRole('button', { name: 'Next findings', exact: true })).toHaveCount(0);
  34 |   await page.screenshot({ path: info.outputPath('filtered-miss-mobile.png'), fullPage: true, animations: 'disabled' });
  35 |   await ledger.getByRole('button', { name: 'Clear issue filters', exact: true }).click();
  36 |   await expect(ledger.getByLabel('Run', { exact: true })).toHaveValue('kazakh-sft-006');
  37 |   await expect(ledger.getByLabel('Metric', { exact: true })).toHaveValue('all');
  38 |   await expect(ledger.getByLabel('Issue type', { exact: true })).toHaveValue('all');
  39 |   await expect(ledger.locator('.issue-ledger-table tbody tr')).toHaveCount(2);
  40 |   await expect(ledger.getByRole('button', { name: 'Clear issue filters', exact: true })).toHaveCount(0);
  41 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  42 | });
  43 | 
  44 | test('unfiltered clean run shows the checked scope without stale warning', async ({ page }) => {
  45 |   await page.clock.setFixedTime(new Date('2026-11-10T00:00:00Z'));
  46 |   await page.goto('/data-quality?run=kazakh-sft-001');
  47 |   const ledger = page.locator('.issue-detail');
  48 |   await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toBeVisible({ timeout: 15000 });
  49 |   await expect(ledger).toContainText('8,192 source rows');
  50 |   await expect(ledger.getByTestId('source-age')).toHaveText('Source snapshot age: under 24 hours');
  51 |   await expect(ledger.getByRole('button', { name: 'Clear issue filters', exact: true })).toHaveCount(0);
  52 | });
  53 | 
  54 | test('a page beyond the updated total offers the first page without claiming a clean run', async ({ page }) => {
  55 |   // Controlled paging fault only: retain real issue rows, then let the total shrink.
  56 |   await page.route('**/*training.worker*.js', async route => {
  57 |     const response = await route.fetch();
  58 |     const source = await response.text();
  59 |     await route.fulfill({ response, body: `${source}\n{
  60 |       const send = self.postMessage.bind(self);
  61 |       let firstIssuePage = true;
  62 |       self.postMessage = (message, transfer) => {
  63 |         if (message.kind === 'issues' && firstIssuePage && message.rows.length) {
  64 |           firstIssuePage = false;
  65 |           message = { ...message, total: 51 };
  66 |         }
  67 |         send(message, transfer);
  68 |       };
  69 |     }` });
  70 |   });
  71 |   await page.goto('/data-quality?run=kazakh-sft-009');
  72 |   const ledger = page.locator('.issue-detail');
  73 |   await expect(ledger.locator('.issue-ledger-table tbody tr')).toHaveCount(11, { timeout: 15000 });
  74 |   await ledger.getByRole('button', { name: 'Next findings', exact: true }).click();
  75 |   await expect(ledger.getByRole('heading', { name: 'No findings on this page', exact: true })).toBeVisible();
  76 |   await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toHaveCount(0);
  77 |   await expect(ledger.getByLabel('Issue locations by recorded step')).toHaveCount(0);
  78 |   await ledger.getByRole('button', { name: 'Go to first page', exact: true }).click();
  79 |   await expect(ledger.locator('.issue-ledger-table tbody tr')).toHaveCount(11);
  80 |   await expect(ledger.getByText('Page 1', { exact: true })).toBeVisible();
  81 | });
  82 | 
  83 | 
```