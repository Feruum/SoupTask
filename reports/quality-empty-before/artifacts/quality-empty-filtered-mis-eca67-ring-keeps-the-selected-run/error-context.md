# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: quality-empty.spec.ts >> filtered miss explains scope and clearing keeps the selected run
- Location: e2e\quality-empty.spec.ts:23:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.issue-detail').getByLabel('Issue locations by recorded step')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('.issue-detail').getByLabel('Issue locations by recorded step') with timeout 5000ms
  - waiting for locator('.issue-detail').getByLabel('Issue locations by recorded step')
    14 × locator resolved to 1 element
       - unexpected value "1"

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
      - link "Data quality" [ref=e21] [cursor=pointer]:
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
        - button "Switch to dark theme" [ref=e37] [cursor=pointer]
    - main [ref=e45]:
      - generic [ref=e46]:
        - generic [ref=e47]:
          - heading "Data quality" [level=1] [ref=e48]
          - paragraph [ref=e49]: Every finding links back to an immutable source observation.
        - generic [ref=e50]: Demo snapshot · Smoothing off
      - generic [ref=e51]:
        - generic [ref=e52]:
          - term [ref=e53]: Runs audited
          - definition [ref=e54]: "20"
        - generic [ref=e55]:
          - term [ref=e56]: Runs with findings
          - definition [ref=e57]: "8"
        - generic [ref=e58]:
          - term [ref=e59]: Invalid observations
          - definition [ref=e60]: "8"
        - generic [ref=e61]:
          - term [ref=e62]: Conflicting groups
          - definition [ref=e63]: "9"
      - group [ref=e64]:
        - generic "Issue type counts Observations, rows and groups" [ref=e65] [cursor=pointer]:
          - generic [ref=e66]:
            - strong [ref=e67]: Issue type counts
            - generic [ref=e68]: Observations, rows and groups
      - group [ref=e71]:
        - generic "Source quality matrix All runs and metrics" [ref=e72] [cursor=pointer]:
          - generic [ref=e73]:
            - strong [ref=e74]: Source quality matrix
            - generic [ref=e75]: All runs and metrics
      - generic [ref=e78]:
        - generic [ref=e80]:
          - heading "Source issue ledger" [level=2] [ref=e81]
          - paragraph [ref=e82]: Choose a run to inspect original observations and their findings.
        - generic [ref=e83]:
          - generic [ref=e84]:
            - text: Run
            - combobox "Run" [ref=e85] [cursor=pointer]:
              - option "Select a run"
              - option "kazakh-sft-001"
              - option "kazakh-sft-002"
              - option "kazakh-sft-003"
              - option "kazakh-sft-004"
              - option "kazakh-sft-005"
              - option "kazakh-sft-006" [selected]
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
              - option "kazakh-sft-020"
          - generic [ref=e86]:
            - text: Metric
            - combobox "Metric" [ref=e87] [cursor=pointer]:
              - option "All metrics"
              - option "Loss"
              - option "Learning rate" [selected]
              - option "Gradient norm"
          - generic [ref=e88]:
            - text: Issue type
            - combobox "Issue type" [ref=e89] [cursor=pointer]:
              - option "All issue types"
              - option "NaN" [selected]
              - option "+Infinity"
              - option "−Infinity"
              - option "Duplicate steps"
              - option "Conflicting measurements"
              - option "Invalid step coordinates"
              - option "Out-of-order source"
              - option "Known cadence gaps"
        - generic "Issue locations by recorded step" [ref=e90]: Page 1 · findings in the loaded page · recorded step →
        - generic [ref=e92]:
          - heading "No matching findings" [level=3] [ref=e94]
          - paragraph [ref=e95]: This snapshot has no source issues matching these filters.
        - generic [ref=e96]:
          - button "Previous findings" [disabled] [ref=e97]
          - generic [ref=e101]: Page 1
          - button "Next findings" [disabled] [ref=e102]
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
  8  |   await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toBeVisible({ timeout: 15000 });
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
> 32 |   await expect(ledger.getByLabel('Issue locations by recorded step')).toHaveCount(0);
     |                                                                       ^ Error: expect(locator).toHaveCount(expected) failed
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