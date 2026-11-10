# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pinned-source.spec.ts >> a pinned original row keeps exact values after the cursor moves and opens its revision
- Location: e2e\pinned-source.spec.ts:3:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('inspected-loss')
Expected: "100.000"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" getByTestId('inspected-loss') with timeout 5000ms
  - waiting for getByTestId('inspected-loss')

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
    - button "Metrics" [pressed]
    - button "Data quality"
    - button "Source"
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
  - group:
    - text: From step
    - spinbutton "From step": "500000"
    - text: To step
    - spinbutton "To step": "500002"
    - button "Apply range"
    - button "Zoom in"
    - button "Zoom out"
    - button "Reset view"
    - paragraph: Step 500,000 to 500,002
  - heading "Loss" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 3 displayed
  - 'figure "Highlight kazakh-sft-005 0.237258 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 500,000.2 kazakh-sft-005 No recorded value at this location"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.237258 – 100.000
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - text: Cursor step 500,000.2
    - strong: kazakh-sft-005
    - text: No recorded value at this location
  - heading "Learning rate" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 3 displayed
  - 'figure "Highlight kazakh-sft-005 9.99995E-6 – 9.99999E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 500,000.2 kazakh-sft-005 No recorded value at this location"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 9.99995E-6 – 9.99999E-6
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - text: Cursor step 500,000.2
    - strong: kazakh-sft-005
    - text: No recorded value at this location
  - heading "Gradient norm" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 3 displayed
  - 'figure "Highlight kazakh-sft-005 0.16854 – 0.233255 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 500,000.2 kazakh-sft-005 No recorded value at this location"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.16854 – 0.233255
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - text: Cursor step 500,000.2
    - strong: kazakh-sft-005
    - text: No recorded value at this location
  - region "Pinned source row":
    - heading "Pinned source row" [level=2]
    - paragraph: kazakh-sft-005 · sourceIndex 500001 · recorded step 500001
    - button "Unpin row"
    - term: Raw loss
    - definition: "100"
    - term: Raw learning rate
    - definition: "0.00000999996999997"
    - term: Raw gradient norm
    - definition: "0.16853975002653898"
    - link "Open exact source row →":
      - /url: /runs/kazakh-sft-005?sourceIndex=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
    - paragraph: Revision soup-1.0.0:spike@1:seed=42:n=1000000:cadence=1. The pinned source row stays fixed as the cursor moves.
  - paragraph: Source values remain unchanged. Whole-run cards do not change with zoom.
  - paragraph: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | test('a pinned original row keeps exact values after the cursor moves and opens its revision', async ({ page }) => {
  4  |   await page.goto('/runs/kazakh-sft-005')
  5  |   const plot = page.getByTestId('loss-chart')
  6  |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  7  |   await page.getByLabel('From step', { exact: true }).fill('500000')
  8  |   await page.getByLabel('To step', { exact: true }).fill('500002')
  9  |   await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  10 |   await expect(plot).toHaveAttribute('data-range-min', '500000')
  11 |   await plot.locator('.u-over').scrollIntoViewIfNeeded()
  12 |   const box = await plot.locator('.u-over').boundingBox()
  13 |   if (!box) throw new Error('Missing physical plot')
  14 |   await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  15 |   await page.getByRole('button', { name: 'Pin row 500001', exact: true }).first().click()
  16 |   const pinned = page.getByRole('region', { name: 'Pinned source row', exact: true })
  17 |   await expect(pinned.getByTestId('pinned-loss')).toHaveText('100')
  18 |   await plot.locator('.u-over').scrollIntoViewIfNeeded()
  19 |   const nextBox = await plot.locator('.u-over').boundingBox()
  20 |   if (!nextBox) throw new Error('Missing physical plot after pin')
  21 |   await page.mouse.move(nextBox.x + nextBox.width * .1, nextBox.y + nextBox.height / 2)
  22 |   await expect(pinned.getByTestId('pinned-loss')).toHaveText('100')
  23 |   await expect(pinned.getByRole('link', { name: 'Open exact source row' })).toHaveAttribute('href', /sourceIndex=500001&revision=/)
  24 |   await pinned.getByRole('link', { name: 'Open exact source row' }).click()
> 25 |   await expect(page.getByTestId('inspected-loss')).toHaveText('100.000')
     |                                                    ^ Error: expect(locator).toHaveText(expected) failed
  26 | })
  27 | 
```