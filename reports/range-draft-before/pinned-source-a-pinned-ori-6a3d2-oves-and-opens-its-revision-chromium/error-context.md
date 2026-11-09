# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pinned-source.spec.ts >> a pinned original row keeps exact values after the cursor moves and opens its revision
- Location: e2e\pinned-source.spec.ts:3:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('loss-chart')
Expected: "500000"
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" getByTestId('loss-chart') with timeout 5000ms
  - waiting for getByTestId('loss-chart')
    14 × locator resolved to <div data-y-min="0" data-y-max="110" class="plot-host" data-drawn="true" data-range-min="0" aria-hidden="true" data-plot-top="16" data-focused-run="" data-draw-count="8" data-plot-left="52" data-plot-width="898" data-view-ready="true" data-spike-value="100" data-plot-height="279" data-range-max="500002" data-testid="loss-chart" data-spike-step="500001" data-cursor-point-count="0" data-spike-x="949.998204007184" data-spike-source-index="500001" data-spike-y="41.363636363636374">…</div>
       - unexpected value "0"

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
        - button "Metrics" [pressed] [ref=e71] [cursor=pointer]
        - button "Data quality" [ref=e72] [cursor=pointer]
        - button "Source" [ref=e73] [cursor=pointer]
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
      - generic [ref=e92]:
        - group [ref=e93]:
          - generic [ref=e95]:
            - generic [ref=e96]:
              - generic [ref=e97]:
                - generic [ref=e98]: From step
                - spinbutton "From step" [ref=e99]: "0"
              - generic [ref=e100]:
                - generic [ref=e101]: To step
                - spinbutton "To step" [ref=e102]: "500002"
              - button "Apply range" [active] [ref=e103] [cursor=pointer]
            - generic [ref=e107]:
              - button "Zoom in" [ref=e108] [cursor=pointer]
              - button "Zoom out" [ref=e112] [cursor=pointer]
              - button "Reset view" [ref=e116] [cursor=pointer]
            - paragraph [ref=e120]: Step 0 to 500,002
        - generic [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]:
              - generic [ref=e124]:
                - heading "Loss" [level=2] [ref=e125]
                - paragraph [ref=e126]: Recorded step · Linear scale · Original values
              - generic [ref=e127]: 3494 displayed
            - 'figure "Highlight kazakh-sft-005 0.200653 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e128]':
              - generic [ref=e138]:
                - generic [ref=e140]:
                  - button "Highlight kazakh-sft-005" [ref=e141] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e143]: 0.200653 – 100.000
                - paragraph [ref=e144]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - generic [ref=e145]:
            - generic [ref=e146]:
              - generic [ref=e147]:
                - heading "Learning rate" [level=2] [ref=e148]
                - paragraph [ref=e149]: Recorded step · Linear scale · Original values
              - generic [ref=e150]: 1752 displayed
            - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e151]':
              - generic [ref=e161]:
                - generic [ref=e163]:
                  - button "Highlight kazakh-sft-005" [ref=e164] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e166]: 0E0 – 1.83333E-5
                - paragraph [ref=e167]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - generic [ref=e168]:
            - generic [ref=e169]:
              - generic [ref=e170]:
                - heading "Gradient norm" [level=2] [ref=e171]
                - paragraph [ref=e172]: Recorded step · Linear scale · Original values
              - generic [ref=e173]: 3504 displayed
            - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e174]':
              - generic [ref=e184]:
                - generic [ref=e186]:
                  - button "Highlight kazakh-sft-005" [ref=e187] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e189]: 0.140 – 0.240
                - paragraph [ref=e190]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
        - paragraph [ref=e191]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e192]: Demo snapshot. No live training or automatic stopping recommendation.
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
> 10 |   await expect(plot).toHaveAttribute('data-range-min', '500000')
     |                      ^ Error: expect(locator).toHaveAttribute(expected) failed
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
  25 |   await expect(page.getByTestId('inspected-loss')).toHaveText('100.000')
  26 | })
  27 | 
```