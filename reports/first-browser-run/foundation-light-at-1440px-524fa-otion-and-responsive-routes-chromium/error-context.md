# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: foundation.spec.ts >> light at 1440px: axe, reduced motion and responsive routes
- Location: e2e\foundation.spec.ts:30:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 139

- Array []
+ Array [
+   Object {
+     "description": "Ensure <dl> elements are structured correctly",
+     "help": "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/definition-list?application=playwright",
+     "id": "definition-list",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   dl element has direct children that are not allowed: div > p",
+         "html": "<dl class=\"summary-grid list-summary\"><div><dt>Training runs</dt><dd>3</dd><p>Deterministic fixtures</p></div><div><dt>Raw observations</dt><dd>1,408</dd><p>Across all demo runs</p></div><div><dt>Metric columns</dt><dd>3</dd><p>Loss, learning rate, gradient norm</p></div></dl>",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "values": "div > p",
+             },
+             "id": "only-dlitems",
+             "impact": "serious",
+             "message": "dl element has direct children that are not allowed: div > p",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<p>Deterministic fixtures</p>",
+                 "target": Array [
+                   "dl > div:nth-child(1) > p",
+                 ],
+               },
+               Object {
+                 "html": "<p>Across all demo runs</p>",
+                 "target": Array [
+                   "div:nth-child(2) > p",
+                 ],
+               },
+               Object {
+                 "html": "<p>Loss, learning rate, gradient norm</p>",
+                 "target": Array [
+                   "div:nth-child(3) > p",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           "dl",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.structure",
+       "wcag2a",
+       "wcag131",
+       "EN-301-549",
+       "EN-9.1.3.1",
+       "RGAAv4",
+       "RGAA-9.3.3",
+     ],
+   },
+   Object {
+     "description": "Ensure that elements labelled through their content must have their visible text as part of their accessible name",
+     "help": "Elements must have their visible text as part of their accessible name",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/label-content-name-mismatch?application=playwright",
+     "id": "label-content-name-mismatch",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<a class=\"open-run\" aria-label=\"Open kazakh-sft-003\" href=\"/runs/kazakh-sft-003\" data-discover=\"true\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-label=\"Open kazakh-sft-003\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<a class=\"open-run\" aria-label=\"Open kazakh-sft-002\" href=\"/runs/kazakh-sft-002\" data-discover=\"true\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-label=\"Open kazakh-sft-002\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "label-content-name-mismatch",
+             "impact": "serious",
+             "message": "Text inside the element is not included in the accessible name",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Text inside the element is not included in the accessible name",
+         "html": "<a class=\"open-run\" aria-label=\"Open kazakh-sft-001\" href=\"/runs/kazakh-sft-001\" data-discover=\"true\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-label=\"Open kazakh-sft-001\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.semantics",
+       "wcag21a",
+       "wcag253",
+       "EN-301-549",
+       "EN-9.2.5.3",
+       "RGAAv4",
+       "RGAA-6.1.5",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - link "Skip to content" [ref=f1e4] [cursor=pointer]:
    - /url: "#main-content"
  - complementary "Workspace" [ref=f1e5]:
    - link "Soup home" [ref=f1e6] [cursor=pointer]:
      - /url: /runs
      - generic [ref=f1e7]: Soup.
    - generic [ref=f1e8]: Almaty Lab
    - navigation "Main navigation" [ref=f1e12]:
      - link "Training runs" [ref=f1e13] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=f1e16] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=f1e18] [cursor=pointer]:
        - /url: /data-quality
    - generic [ref=f1e21]:
      - link "Soup documentation" [ref=f1e22] [cursor=pointer]:
        - /url: https://souplanding-omega.vercel.app/docs/
      - img "Built in Kazakhstan. Pixel ram-horn ornament." [ref=f1e26]
  - generic [ref=f1e27]:
    - banner [ref=f1e28]:
      - generic [ref=f1e29]:
        - generic [ref=f1e30]: Workspace
        - generic [aria-hidden] [ref=f1e31]: /
        - generic [ref=f1e32]: qwen-kazakh
      - generic [ref=f1e33]:
        - generic [ref=f1e34]: Demo data
        - button "Switch to dark theme" [active] [ref=f1e39] [cursor=pointer]
    - main [ref=f1e45]:
      - generic [ref=f1e46]:
        - generic [ref=f1e47]:
          - heading "Training runs" [level=1] [ref=f1e48]
          - paragraph [ref=f1e49]: qwen-kazakh · Local experiment workspace
        - generic [ref=f1e50]: Foundation demo
      - generic [ref=f1e54]:
        - generic [ref=f1e55]:
          - term [ref=f1e56]: Training runs
          - definition [ref=f1e57]: "3"
          - paragraph [ref=f1e58]: Deterministic fixtures
        - generic [ref=f1e59]:
          - term [ref=f1e60]: Raw observations
          - definition [ref=f1e61]: 1,408
          - paragraph [ref=f1e62]: Across all demo runs
        - generic [ref=f1e63]:
          - term [ref=f1e64]: Metric columns
          - definition [ref=f1e65]: "3"
          - paragraph [ref=f1e66]: Loss, learning rate, gradient norm
      - region "Training run collection" [ref=f1e67]:
        - generic [ref=f1e68]:
          - generic [ref=f1e69]:
            - generic [ref=f1e70]: Search runs
            - searchbox "Search runs" [ref=f1e75]
          - generic [ref=f1e77]:
            - text: Sort by
            - combobox "Sort by" [ref=f1e78] [cursor=pointer]:
              - option "Run name" [selected]
              - option "Latest loss"
        - region "Training runs table" [ref=f1e79]:
          - table "Small seeded demonstration runs. Values are fixture observations, not live training." [ref=f1e80]:
            - caption [ref=f1e81]: Small seeded demonstration runs. Values are fixture observations, not live training.
            - rowgroup [ref=f1e82]:
              - row [ref=f1e83]:
                - columnheader "Run" [ref=f1e84]
                - columnheader "Scenario" [ref=f1e85]
                - columnheader "Latest loss" [ref=f1e86]
                - columnheader "Observations" [ref=f1e87]
                - columnheader "View" [ref=f1e88]
            - rowgroup [ref=f1e89]:
              - row [ref=f1e90]:
                - rowheader "kazakh-sft-003 Qwen2.5-3B SFT" [ref=f1e91]:
                  - link "kazakh-sft-003" [ref=f1e92] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-003
                  - generic [ref=f1e93]: Qwen2.5-3B · SFT
                - cell "Single loss spike" [ref=f1e94]
                - cell "0.364" [ref=f1e99]
                - cell "512" [ref=f1e100]
                - cell [ref=f1e101]:
                  - link "Open kazakh-sft-003" [ref=f1e102] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-003
                    - text: Open run
              - row [ref=f1e105]:
                - rowheader "kazakh-sft-002 Qwen2.5-3B SFT" [ref=f1e106]:
                  - link "kazakh-sft-002" [ref=f1e107] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-002
                  - generic [ref=f1e108]: Qwen2.5-3B · SFT
                - cell "Clean convergence" [ref=f1e109]
                - cell "0.390" [ref=f1e114]
                - cell "384" [ref=f1e115]
                - cell [ref=f1e116]:
                  - link "Open kazakh-sft-002" [ref=f1e117] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-002
                    - text: Open run
              - row [ref=f1e120]:
                - rowheader "kazakh-sft-001 Qwen2.5-3B SFT" [ref=f1e121]:
                  - link "kazakh-sft-001" [ref=f1e122] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-001
                  - generic [ref=f1e123]: Qwen2.5-3B · SFT
                - cell "Missing loss value" [ref=f1e124]
                - cell "0.342" [ref=f1e129]
                - cell "512" [ref=f1e130]
                - cell [ref=f1e131]:
                  - link "Open kazakh-sft-001" [ref=f1e132] [cursor=pointer]:
                    - /url: /runs/kazakh-sft-001
                    - text: Open run
        - generic [ref=f1e135]:
          - generic [ref=f1e136]: 3 of 3 demo runs
          - generic [ref=f1e137]: Generated locally
      - paragraph [ref=f1e147]: This foundation uses small, seeded snapshots. Open a run to inspect the raw loss chart and its source values.
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright'
  2  | import { expect, test } from '@playwright/test'
  3  | 
  4  | test('keyboard navigation opens a Worker-backed uPlot chart and handles an unknown run', async ({ page }) => {
  5  |   const pageErrors: string[] = []
  6  |   page.on('pageerror', error => pageErrors.push(error.message))
  7  |   await page.goto('/runs')
  8  |   await expect(page.getByRole('heading', { name: 'Training runs', exact: true })).toBeVisible()
  9  |   await page.getByRole('link', { name: 'Open kazakh-sft-003' }).focus()
  10 |   await page.keyboard.press('Enter')
  11 |   await expect(page).toHaveURL(/\/runs\/kazakh-sft-003$/)
  12 |   await expect(page.getByRole('heading', { name: 'kazakh-sft-003', exact: true })).toBeVisible()
  13 |   await expect(page.locator('[data-testid="loss-chart"] .uplot')).toHaveCount(1)
  14 |   await expect(page.getByTestId('peak-loss')).toHaveText('8.742')
  15 |   await page.getByLabel('Source step').fill('2560')
  16 |   await page.getByRole('button', { name: 'Inspect step', exact: true }).click()
  17 |   await expect(page.getByTestId('inspected-loss')).toHaveText('8.742')
  18 |   await page.getByRole('button', { name: 'Zoom in', exact: true }).focus()
  19 |   await page.keyboard.press('Enter')
  20 |   await expect(page.getByTestId('visible-range')).toContainText('1,277.5')
  21 |   await page.getByRole('button', { name: 'Reset view', exact: true }).click()
  22 |   await expect(page.getByTestId('visible-range')).toContainText('5,110')
  23 |   await page.goto('/runs/unknown')
  24 |   await expect(page.getByRole('heading', { name: 'Run not found' })).toBeVisible()
  25 |   expect(pageErrors).toEqual([])
  26 | })
  27 | 
  28 | for (const theme of ['dark', 'light'] as const) {
  29 |   for (const width of [320, 1440]) {
  30 |     test(`${theme} at ${width}px: axe, reduced motion and responsive routes`, async ({ page }, testInfo) => {
  31 |       await page.emulateMedia({ reducedMotion: 'reduce' })
  32 |       await page.setViewportSize({ width, height: 1000 })
  33 |       await page.goto('/runs')
  34 |       for (const route of ['/runs', '/runs/kazakh-sft-003', '/compare', '/data-quality']) {
  35 |         await page.goto(route)
  36 |         if (theme === 'light') await page.getByRole('button', { name: 'Switch to light theme' }).click()
  37 |         await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
  38 |         if (route.includes('003')) await expect(page.locator('[data-testid="loss-chart"] .uplot')).toHaveCount(1)
  39 |         const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  40 |         await testInfo.attach(`${theme}-${width}-${route.split('/').at(-1)}-axe`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' })
> 41 |         expect(results.violations).toEqual([])
     |                                    ^ Error: expect(received).toEqual(expected) // deep equality
  42 |         expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  43 |         expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
  44 |         await expect(page.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
  45 |         const moving = await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running' && animation.effect?.getTiming().iterations === Infinity).length)
  46 |         expect(moving).toBe(0)
  47 |         await page.screenshot({ path: testInfo.outputPath(`${theme}-${width}-${route.split('/').at(-1)}.png`), fullPage: true })
  48 |       }
  49 |     })
  50 |   }
  51 | }
  52 | 
  53 | test('search empty state and missing-value fixture remain explicit', async ({ page }) => {
  54 |   await page.goto('/runs')
  55 |   await page.getByRole('searchbox', { name: 'Search runs' }).fill('does-not-exist')
  56 |   await expect(page.getByRole('heading', { name: 'No matching runs' })).toBeVisible()
  57 |   await page.getByRole('button', { name: 'Clear filters', exact: true }).click()
  58 |   await expect(page.getByRole('link', { name: 'Open kazakh-sft-001' })).toBeVisible()
  59 |   await page.goto('/runs/kazakh-sft-001')
  60 |   await expect(page.locator('[data-testid="loss-chart"] .uplot')).toHaveCount(1)
  61 |   await page.getByLabel('Source step').fill('3200')
  62 |   await page.getByRole('button', { name: 'Inspect step', exact: true }).click()
  63 |   await expect(page.getByTestId('inspected-loss')).toHaveText('NaN')
  64 |   await expect(page.getByText('1 invalid loss observation. The chart leaves a gap.')).toBeVisible()
  65 | })
  66 | 
  67 | test('all generated navigation pages are connected and comparison uses real fixture data', async ({ page }) => {
  68 |   await page.goto('/runs')
  69 |   await page.getByRole('link', { name: 'Compare', exact: true }).click()
  70 |   await expect(page).toHaveURL(/\/compare$/)
  71 |   await expect(page.getByRole('heading', { name: 'Compare runs', exact: true })).toBeVisible()
  72 |   await expect(page.getByTestId('comparison-loss').locator('.uplot')).toHaveCount(1)
  73 |   await page.getByLabel('Compare kazakh-sft-003').uncheck()
  74 |   await expect(page.getByText('2 runs selected', { exact: true })).toBeVisible()
  75 |   await page.getByRole('link', { name: 'Data quality', exact: true }).click()
  76 |   await expect(page).toHaveURL(/\/data-quality$/)
  77 |   await expect(page.getByRole('heading', { name: 'Data quality', exact: true })).toBeVisible()
  78 |   await page.getByRole('link', { name: 'Inspect missing value' }).click()
  79 |   await expect(page).toHaveURL(/kazakh-sft-001\?step=3200$/)
  80 |   await expect(page.getByTestId('inspected-loss')).toHaveText('NaN')
  81 | })
  82 | 
```