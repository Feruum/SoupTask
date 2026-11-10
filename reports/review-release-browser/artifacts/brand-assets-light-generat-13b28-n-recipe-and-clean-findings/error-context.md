# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: brand-assets.spec.ts >> light: generated art fits empty search, run recipe and clean findings
- Location: e2e\brand-assets.spec.ts:4:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=f2e3]:
  - link "Skip to content" [ref=f2e4] [cursor=pointer]:
    - /url: "#main-content"
  - complementary "Workspace" [ref=f2e5]:
    - navigation "Main navigation" [ref=f2e6]:
      - link "Dashboard" [ref=f2e7] [cursor=pointer]:
        - /url: /dashboard
      - link "Training runs" [ref=f2e14] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=f2e18] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=f2e21] [cursor=pointer]:
        - /url: /data-quality
  - generic [ref=f2e26]:
    - banner [ref=f2e27]:
      - generic [ref=f2e28]:
        - generic [ref=f2e29]: Workspace
        - generic [aria-hidden] [ref=f2e30]: /
        - generic [ref=f2e31]: qwen-kazakh
      - generic [ref=f2e32]:
        - link "Docs" [ref=f2e33] [cursor=pointer]:
          - /url: https://souplanding-omega.vercel.app/docs/
        - button "Switch to dark theme" [ref=f2e37] [cursor=pointer]
    - main [ref=f2e45]:
      - generic [ref=f2e46]:
        - generic [ref=f2e47]:
          - heading "Data quality" [level=1] [ref=f2e48]
          - paragraph [ref=f2e49]: Every finding links back to an immutable source observation.
        - generic [ref=f2e50]: Demo snapshot · Smoothing off
      - generic [ref=f2e51]:
        - generic [ref=f2e52]:
          - term [ref=f2e53]: Runs audited
          - definition [ref=f2e54]: "20"
        - generic [ref=f2e55]:
          - term [ref=f2e56]: Runs with findings
          - definition [ref=f2e57]: "8"
        - generic [ref=f2e58]:
          - term [ref=f2e59]: Invalid observations
          - definition [ref=f2e60]: "8"
        - generic [ref=f2e61]:
          - term [ref=f2e62]: Conflicting groups
          - definition [ref=f2e63]: "9"
      - group [ref=f2e64]:
        - generic "Issue type counts Observations, rows and groups" [ref=f2e65] [cursor=pointer]:
          - generic [ref=f2e66]:
            - strong [ref=f2e67]: Issue type counts
            - generic [ref=f2e68]: Observations, rows and groups
      - group [ref=f2e71]:
        - generic "Source quality matrix All runs and metrics" [ref=f2e72] [cursor=pointer]:
          - generic [ref=f2e73]:
            - strong [ref=f2e74]: Source quality matrix
            - generic [ref=f2e75]: All runs and metrics
      - generic [ref=f2e78]:
        - generic [ref=f2e80]:
          - heading "Source issue ledger" [level=2] [ref=f2e81]
          - paragraph [ref=f2e82]: Choose a run to inspect original observations and their findings.
        - generic [ref=f2e83]:
          - generic [ref=f2e84]:
            - text: Run
            - combobox "Run" [ref=f2e85] [cursor=pointer]:
              - option "Select a run"
              - option "kazakh-sft-001" [selected]
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
              - option "kazakh-sft-020"
          - generic [ref=f2e86]:
            - text: Metric
            - combobox "Metric" [ref=f2e87] [cursor=pointer]:
              - option "All metrics" [selected]
              - option "Loss"
              - option "Learning rate"
              - option "Gradient norm"
          - generic [ref=f2e88]:
            - text: Issue type
            - combobox "Issue type" [ref=f2e89] [cursor=pointer]:
              - option "All issue types" [selected]
              - option "NaN"
              - option "+Infinity"
              - option "−Infinity"
              - option "Duplicate steps"
              - option "Conflicting measurements"
              - option "Invalid step coordinates"
              - option "Out-of-order source"
              - option "Known cadence gaps"
        - generic "Issue locations by recorded step" [ref=f2e90]: Page 1 · findings in the loaded page · recorded step →
        - generic [ref=f2e92]:
          - heading "No matching findings" [level=3] [ref=f2e94]
          - paragraph [ref=f2e95]: This snapshot has no source issues matching these filters.
        - generic [ref=f2e96]:
          - button "Previous findings" [disabled] [ref=f2e97]
          - generic [ref=f2e101]: Page 1
          - button "Next findings" [disabled] [ref=f2e102]
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | for (const theme of ['dark', 'light']) {
  4  |   test(`${theme}: generated art fits empty search, run recipe and clean findings`, async ({ page }, info) => {
  5  |     await page.addInitScript(value => localStorage.setItem('soup-theme', value), theme)
  6  |     await page.setViewportSize({ width: theme === 'dark' ? 1440 : 390, height: 1000 })
  7  |     await page.goto('/runs')
  8  |     await page.getByRole('searchbox', { name: 'Search runs', exact: true }).fill('no-such-soup-run')
  9  |     await expect(page.getByRole('heading', { name: 'No matching runs', exact: true })).toBeVisible()
  10 |     const bowl = page.locator('[data-soup-art="piala"] img').first()
  11 |     await expect(bowl).toBeVisible()
  12 |     await expect(bowl).toHaveAttribute('alt', '')
  13 |     await expect.poll(() => bowl.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  14 |     await bowl.evaluate(image => (image as HTMLImageElement).decode())
  15 |     await page.screenshot({ path: info.outputPath(`${theme}-empty-search.png`), fullPage: true, animations: 'disabled' })
  16 | 
  17 |     await page.goto('/runs/kazakh-sft-001')
  18 |     await page.getByRole('button', { name: 'Run information', exact: true }).click()
  19 |     const recipe = page.locator('[data-soup-art="recipe"] img')
  20 |     await expect(recipe).toBeVisible()
  21 |     await expect.poll(() => recipe.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  22 |     await recipe.evaluate(image => (image as HTMLImageElement).decode())
  23 |     await expect(page.getByRole('heading', { name: 'Run information', exact: true })).toBeVisible()
  24 |     await page.screenshot({ path: info.outputPath(`${theme}-recipe.png`), fullPage: true, animations: 'disabled' })
  25 | 
  26 |     await page.goto('/data-quality?run=kazakh-sft-001')
  27 |     await expect(page.getByRole('heading', { name: 'No matching findings', exact: true })).toBeVisible({ timeout: 60000 })
  28 |     const ladle = page.locator('[data-soup-art="ladle"] img')
  29 |     await expect(ladle).toBeVisible()
  30 |     await expect.poll(() => ladle.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  31 |     await ladle.evaluate(image => (image as HTMLImageElement).decode())
  32 |     await page.screenshot({ path: info.outputPath(`${theme}-clean-findings.png`), fullPage: true, animations: 'disabled' })
> 33 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
     |                                                                                           ^ Error: expect(received).toBe(expected) // Object.is equality
  34 |   })
  35 | }
  36 | 
  37 | test('loading animates only steam and respects reduced motion', async ({ page }, info) => {
  38 |   let releaseWorker = () => {}
  39 |   const workerGate = new Promise<void>(resolve => { releaseWorker = resolve })
  40 |   await page.route('**/*training.worker*.js', async route => {
  41 |     await workerGate
  42 |     await route.continue()
  43 |   })
  44 |   try {
  45 |     await page.goto('/runs/kazakh-sft-001')
  46 |     const loading = page.getByRole('region', { name: 'Loading measurements', exact: true })
  47 |     const steam = loading.locator('.soup-art-steam')
  48 |     await expect(steam).toBeVisible()
  49 |     await expect.poll(() => steam.evaluate(element => getComputedStyle(element).animationName)).toBe('soup-steam')
  50 |     await page.emulateMedia({ reducedMotion: 'reduce' })
  51 |     await expect(steam).toHaveCSS('animation-name', 'none')
  52 |     await expect(steam).toHaveCSS('transform', 'none')
  53 |     await steam.evaluate(image => (image as HTMLImageElement).decode())
  54 |     await page.screenshot({ path: info.outputPath('loading-reduced-motion.png'), fullPage: true })
  55 |   } finally {
  56 |     releaseWorker()
  57 |   }
  58 |   await expect(page.getByTestId('loss-chart').locator('canvas')).toBeVisible({ timeout: 60000 })
  59 | })
  60 | 
```