# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: quality-responsive.spec.ts >> quality selectors fit their own cells at 390px in light
- Location: e2e\quality-responsive.spec.ts:4:3

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 390
Received:    442
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
              - option "Select a run" [selected]
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
              - option "kazakh-sft-020"
          - generic [ref=e86]:
            - text: Metric
            - combobox "Metric" [ref=e87] [cursor=pointer]:
              - option "All metrics" [selected]
              - option "Loss"
              - option "Learning rate"
              - option "Gradient norm"
          - generic [ref=e88]:
            - text: Issue type
            - combobox "Issue type" [ref=e89] [cursor=pointer]:
              - option "All issue types" [selected]
              - option "NaN"
              - option "+Infinity"
              - option "−Infinity"
              - option "Duplicate steps"
              - option "Conflicting measurements"
              - option "Invalid step coordinates"
              - option "Out-of-order source"
              - option "Known cadence gaps"
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | for (const theme of ['dark', 'light'] as const) for (const width of [320, 390]) {
  4  |   test(`quality selectors fit their own cells at ${width}px in ${theme}`, async ({ page }, info) => {
  5  |     await page.setViewportSize({ width, height: 844 })
  6  |     await page.addInitScript(value => localStorage.setItem('soup-theme', value), theme)
  7  |     await page.goto('/data-quality')
  8  |     await expect(page.getByRole('combobox', { name: 'Issue type', exact: true })).toBeVisible()
  9  |     const dimensions = await page.locator('.quality-filters').evaluate(element => ({
  10 |       viewport: innerWidth,
  11 |       pageWidth: document.documentElement.scrollWidth,
  12 |       filters: element.getBoundingClientRect().toJSON(),
  13 |       controls: Array.from(element.querySelectorAll('label,select')).map(control => {
  14 |         const css = getComputedStyle(control)
  15 |         return { tag: control.tagName, text: control.tagName === 'LABEL' ? control.firstChild?.textContent : (control as HTMLSelectElement).selectedOptions[0].textContent, box: control.getBoundingClientRect().toJSON(), minWidth: css.minWidth, width: css.width, maxWidth: css.maxWidth, gridColumns: css.gridTemplateColumns }
  16 |       }),
  17 |     }))
  18 |     await info.attach('quality-filter-dimensions', { body: JSON.stringify(dimensions, null, 2), contentType: 'application/json' })
> 19 |     expect(dimensions.pageWidth).toBeLessThanOrEqual(width)
     |                                  ^ Error: expect(received).toBeLessThanOrEqual(expected)
  20 |     for (const value of ['all', 'conflict', 'invalidX', 'outOfOrder']) {
  21 |       await page.getByRole('combobox', { name: 'Issue type', exact: true }).selectOption(value)
  22 |       const controls = await page.locator('.quality-filters select').evaluateAll(selects => selects.map(select => ({ right: select.getBoundingClientRect().right, labelRight: select.parentElement!.getBoundingClientRect().right, width: select.getBoundingClientRect().width, labelWidth: select.parentElement!.getBoundingClientRect().width })))
  23 |       for (const control of controls) {
  24 |         expect(control.width).toBeLessThanOrEqual(control.labelWidth + 1)
  25 |         expect(control.right).toBeLessThanOrEqual(control.labelRight + 1)
  26 |       }
  27 |       expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  28 |     }
  29 |     await page.screenshot({ path: info.outputPath('quality-contained-controls.png'), fullPage: true })
  30 |   })
  31 | }
  32 | 
```