# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: review-fixes.spec.ts >> an accepted source lookup with zero matches announces its recorded step and recovery
- Location: e2e\review-fixes.spec.ts:2:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.click: Test timeout of 45000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Browse source rows', exact: true })

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
        - button "Metrics" [ref=e71] [cursor=pointer]
        - button "Data quality" [ref=e72] [cursor=pointer]
        - button "Source" [pressed] [ref=e73] [cursor=pointer]
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
      - generic [ref=e93]:
        - generic [ref=e95]:
          - heading "Source inspector" [level=2] [ref=e96]
          - paragraph [ref=e97]: Exact measurements in original arrival order. No interpolation.
        - generic [ref=e98]:
          - combobox "Inspect by" [ref=e99] [cursor=pointer]:
            - option "Recorded step" [selected]
            - option "Source index"
          - generic [ref=e100]:
            - generic [ref=e101]:
              - generic [ref=e102]: Source step
              - spinbutton "Source step" [active] [ref=e103]: "500001"
            - button "Inspect step" [ref=e104] [cursor=pointer]
        - status [ref=e109]: No observation at recorded step 1,000,001. Try another query or choose Browse source rows below.
        - group [ref=e110]:
          - generic "Browse source rows" [ref=e111] [cursor=pointer]
      - paragraph [ref=e112]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | test('an accepted source lookup with zero matches announces its recorded step and recovery', async ({
  3   |   page
  4   | }) => {
  5   |   await page.goto('/runs/kazakh-sft-005');
  6   |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true');
  7   |   await page.getByRole('button', {
  8   |     name: 'Source',
  9   |     exact: true
  10  |   }).click();
  11  |   await page.getByLabel('Source step', {
  12  |     exact: true
  13  |   }).fill('1000001');
  14  |   await page.getByRole('button', {
  15  |     name: 'Inspect step',
  16  |     exact: true
  17  |   }).click();
  18  |   const status = page.getByTestId('inspection-status');
  19  |   await expect(status).toContainText('No observation at recorded step 1,000,001');
  20  |   await page.getByLabel('Source step', {
  21  |     exact: true
  22  |   }).fill('500001');
  23  |   await expect(status).toContainText('No observation at recorded step 1,000,001');
  24  |   await page.getByRole('button', {
  25  |     name: 'Browse source rows',
  26  |     exact: true
> 27  |   }).click();
      |      ^ Error: locator.click: Test timeout of 45000ms exceeded.
  28  |   await expect(page.locator('.source-details')).toHaveAttribute('open', '');
  29  |   await page.getByRole('button', {
  30  |     name: 'Inspect step',
  31  |     exact: true
  32  |   }).click();
  33  |   await expect(page.getByTestId('inspected-loss')).toHaveText('100.000');
  34  |   await expect(status).toContainText('recorded step 500,001');
  35  | });
  36  | for (const width of [1024, 1280, 1400]) test(`stacked preview at ${width}px brings its selected run into view and focuses its heading`, async ({
  37  |   page
  38  | }) => {
  39  |   await page.setViewportSize({
  40  |     width,
  41  |     height: 900
  42  |   });
  43  |   await page.goto('/runs');
  44  |   await page.getByRole('button', {
  45  |     name: 'Preview kazakh-sft-002',
  46  |     exact: true
  47  |   }).click();
  48  |   const heading = page.locator('.run-preview').getByRole('heading', {
  49  |     name: 'kazakh-sft-002',
  50  |     exact: true
  51  |   });
  52  |   await expect(heading).toBeFocused();
  53  |   const box = await heading.boundingBox();
  54  |   expect(box).not.toBeNull();
  55  |   expect(box!.y).toBeGreaterThanOrEqual(0);
  56  |   expect(box!.y).toBeLessThan(300);
  57  | });
  58  | test('compact preview help links to real range controls on both preview hosts', async ({
  59  |   page
  60  | }) => {
  61  |   await page.setViewportSize({
  62  |     width: 390,
  63  |     height: 844
  64  |   });
  65  |   for (const route of ['/dashboard', '/runs']) {
  66  |     await page.goto(route);
  67  |     if (route === '/runs') await page.getByRole('button', {
  68  |       name: 'Preview kazakh-sft-002',
  69  |       exact: true
  70  |     }).click();
  71  |     const preview = page.locator('.preview-charts');
  72  |     await expect(preview).toBeVisible();
  73  |     await expect(preview).not.toContainText('Use Adjust chart range to zoom');
  74  |     await preview.getByRole('link', {
  75  |       name: 'Open run and adjust range',
  76  |       exact: true
  77  |     }).click();
  78  |     await expect(page).toHaveURL(/\/runs\/kazakh-sft-\d{3}$/);
  79  |     await expect(page.getByText('Adjust chart range', {
  80  |       exact: true
  81  |     })).toBeVisible();
  82  |   }
  83  | });
  84  | test('quality filters and findings use readable names while URL query values stay stable', async ({
  85  |   page
  86  | }) => {
  87  |   await page.goto('/data-quality?run=kazakh-sft-007&kind=posInf');
  88  |   const filter = page.getByRole('combobox', {
  89  |     name: 'Issue type',
  90  |     exact: true
  91  |   });
  92  |   await expect(filter.getByRole('option', {
  93  |     name: '+Infinity',
  94  |     exact: true
  95  |   })).toHaveAttribute('value', 'posInf');
  96  |   await expect(filter.getByRole('option', {
  97  |     name: 'Invalid step coordinates',
  98  |     exact: true
  99  |   })).toHaveAttribute('value', 'invalidX');
  100 |   await expect(page.locator('.issue-ledger-table').getByRole('rowheader', {
  101 |     name: '+Infinity',
  102 |     exact: true
  103 |   })).toBeVisible();
  104 |   await expect(page.locator('.issue-strip').getByRole('link').first()).toHaveAccessibleName(/\+Infinity at step/);
  105 |   await filter.selectOption('outOfOrder');
  106 |   await expect(page).toHaveURL(/kind=outOfOrder/);
  107 |   await expect(filter.getByRole('option', {
  108 |     name: 'Out-of-order source',
  109 |     exact: true
  110 |   })).toHaveJSProperty('selected', true);
  111 | });
  112 | 
```