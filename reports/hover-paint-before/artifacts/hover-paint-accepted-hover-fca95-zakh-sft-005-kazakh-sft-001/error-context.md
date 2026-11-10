# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-paint.spec.ts >> accepted hover reaches a rendered frame with original observations: /compare?runs=kazakh-sft-005,kazakh-sft-001
- Location: e2e\hover-paint.spec.ts:4:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
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
      - link "Compare" [ref=e24] [cursor=pointer]:
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
      - generic [ref=e64]:
        - generic [ref=e65]:
          - heading "Compare runs" [level=1] [ref=e66]
          - paragraph [ref=e67]: 2 runs selected · Aligned by original recorded step
        - generic [ref=e68]: Demo snapshot · Smoothing off
      - generic [ref=e69]:
        - complementary [ref=e70]:
          - group [ref=e71]:
            - generic [ref=e72]:
              - heading "Selected runs" [level=2] [ref=e73]
              - generic [ref=e74]:
                - generic [ref=e75]: Search runs
                - searchbox "Search runs" [ref=e80]
              - group "Choose up to four runs" [ref=e82]:
                - generic [ref=e84] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-001" [checked] [ref=e85]
                  - generic [ref=e86]:
                    - text: kazakh-sft-001
                    - generic [ref=e87]: Qwen2.5-1.5B · Running
                - generic [ref=e88] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-002" [ref=e89]
                  - generic [ref=e90]:
                    - text: kazakh-sft-002
                    - generic [ref=e91]: Qwen2.5-3B · Completed
                - generic [ref=e92] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-003" [ref=e93]
                  - generic [ref=e94]:
                    - text: kazakh-sft-003
                    - generic [ref=e95]: Qwen2.5-3B · Completed
                - generic [ref=e96] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-004" [ref=e97]
                  - generic [ref=e98]:
                    - text: kazakh-sft-004
                    - generic [ref=e99]: Qwen2.5-1.5B · Failed
                - generic [ref=e100] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-005" [checked] [ref=e101]
                  - generic [ref=e102]:
                    - text: kazakh-sft-005
                    - generic [ref=e103]: Qwen2.5-3B · Running
                - generic [ref=e104] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-006" [ref=e105]
                  - generic [ref=e106]:
                    - text: kazakh-sft-006
                    - generic [ref=e107]: Qwen2.5-3B · Running
                - generic [ref=e108] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-007" [ref=e109]
                  - generic [ref=e110]:
                    - text: kazakh-sft-007
                    - generic [ref=e111]: Qwen2.5-1.5B · Completed
                - generic [ref=e112] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-008" [ref=e113]
                  - generic [ref=e114]:
                    - text: kazakh-sft-008
                    - generic [ref=e115]: Qwen2.5-3B · Completed
                - generic [ref=e116] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-009" [ref=e117]
                  - generic [ref=e118]:
                    - text: kazakh-sft-009
                    - generic [ref=e119]: Qwen2.5-3B · Completed
                - generic [ref=e120] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-010" [ref=e121]
                  - generic [ref=e122]:
                    - text: kazakh-sft-010
                    - generic [ref=e123]: Qwen2.5-1.5B · Running
                - generic [ref=e124] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-011" [ref=e125]
                  - generic [ref=e126]:
                    - text: kazakh-sft-011
                    - generic [ref=e127]: Qwen2.5-3B · Completed
                - generic [ref=e128] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-012" [ref=e129]
                  - generic [ref=e130]:
                    - text: kazakh-sft-012
                    - generic [ref=e131]: Qwen2.5-3B · Completed
                - generic [ref=e132] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-013" [ref=e133]
                  - generic [ref=e134]:
                    - text: kazakh-sft-013
                    - generic [ref=e135]: Qwen2.5-1.5B · Completed
                - generic [ref=e136] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-014" [ref=e137]
                  - generic [ref=e138]:
                    - text: kazakh-sft-014
                    - generic [ref=e139]: Qwen2.5-3B · Completed
                - generic [ref=e140] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-015" [ref=e141]
                  - generic [ref=e142]:
                    - text: kazakh-sft-015
                    - generic [ref=e143]: Qwen2.5-3B · Completed
                - generic [ref=e144] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-016" [ref=e145]
                  - generic [ref=e146]:
                    - text: kazakh-sft-016
                    - generic [ref=e147]: Qwen2.5-1.5B · Completed
                - generic [ref=e148] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-017" [ref=e149]
                  - generic [ref=e150]:
                    - text: kazakh-sft-017
                    - generic [ref=e151]: Qwen2.5-3B · Failed
                - generic [ref=e152] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-018" [ref=e153]
                  - generic [ref=e154]:
                    - text: kazakh-sft-018
                    - generic [ref=e155]: Qwen2.5-3B · Cancelled
                - generic [ref=e156] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-019" [ref=e157]
                  - generic [ref=e158]:
                    - text: kazakh-sft-019
                    - generic [ref=e159]: Qwen2.5-1.5B · Completed
                - generic [ref=e160] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-020" [ref=e161]
                  - generic [ref=e162]:
                    - text: kazakh-sft-020
                    - generic [ref=e163]: Qwen2.5-3B · Cancelled
              - generic [ref=e164]:
                - generic [ref=e165]:
                  - term [ref=e166]: Align by
                  - definition [ref=e167]: Recorded step
                - generic [ref=e168]:
                  - term [ref=e169]: Y scale
                  - definition [ref=e170]: Linear · Shared per metric
                - generic [ref=e171]:
                  - term [ref=e172]: Smoothing
                  - definition [ref=e173]: Off · Original values
                - generic [ref=e174]:
                  - term [ref=e175]: Missing values
                  - definition [ref=e176]: Preserved as gaps
        - generic [ref=e177]:
          - navigation "Visible metrics" [ref=e178]:
            - button "All metrics" [pressed] [ref=e179] [cursor=pointer]
            - button "Loss" [ref=e180] [cursor=pointer]
            - button "Learning rate" [ref=e181] [cursor=pointer]
            - button "Gradient norm" [ref=e182] [cursor=pointer]
          - group [ref=e183]:
            - generic [ref=e185]:
              - generic [ref=e186]:
                - generic [ref=e187]:
                  - generic [ref=e188]: From step
                  - spinbutton "From step" [ref=e189]: "0"
                - generic [ref=e190]:
                  - generic [ref=e191]: To step
                  - spinbutton "To step" [ref=e192]: "999999"
                - button "Apply range" [ref=e193] [cursor=pointer]
              - generic [ref=e197]:
                - button "Zoom in" [ref=e198] [cursor=pointer]
                - button "Zoom out" [ref=e202] [cursor=pointer]
                - button "Reset view" [ref=e206] [cursor=pointer]
              - paragraph [ref=e210]: Step 0 to 999,999
          - generic [ref=e211]:
            - generic [ref=e212]:
              - generic [ref=e213]:
                - generic [ref=e214]:
                  - heading "Loss" [level=2] [ref=e215]
                  - paragraph [ref=e216]: Recorded step · Linear scale · Original values
                - generic [ref=e217]: 3079 displayed
              - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Highlight kazakh-sft-001 0.23887 – 3.431808 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 499,999.5 kazakh-sft-005 step 499,999 · Loss 0.227481 · Δstep 0.5 Pin row 499999 kazakh-sft-001 No recorded value at this location" [ref=e218]':
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - generic [ref=e230]:
                      - button "Highlight kazakh-sft-005" [ref=e231] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e233]: 0.200327 – 100.000
                    - generic [ref=e234]:
                      - button "Highlight kazakh-sft-001" [ref=e235] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e237]: 0.23887 – 3.431808
                  - paragraph [ref=e238]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - generic [ref=e239]:
                    - text: Cursor step 499,999.5
                    - generic [ref=e240]:
                      - strong [ref=e242]: kazakh-sft-005
                      - generic "Exact source value 0.22748138270315854" [ref=e243]:
                        - text: step 499,999 · Loss 0.227481 · Δstep 0.5
                        - button "Pin row 499999" [ref=e244] [cursor=pointer]
                    - generic [ref=e245]:
                      - strong [ref=e247]: kazakh-sft-001
                      - generic [ref=e248]: No recorded value at this location
            - generic [ref=e249]:
              - generic [ref=e250]:
                - generic [ref=e251]:
                  - heading "Learning rate" [level=2] [ref=e252]
                  - paragraph [ref=e253]: Recorded step · Linear scale · Original values
                - generic [ref=e254]: 628 displayed
              - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Highlight kazakh-sft-001 0E0 – 1.83323E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 499,999.5 kazakh-sft-005 step 499,999 · Learning rate 1E-5 · Δstep 0.5 Pin row 499999 kazakh-sft-001 No recorded value at this location" [ref=e255]':
                - generic [ref=e265]:
                  - generic [ref=e266]:
                    - generic [ref=e267]:
                      - button "Highlight kazakh-sft-005" [ref=e268] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e270]: 0E0 – 1.83333E-5
                    - generic [ref=e271]:
                      - button "Highlight kazakh-sft-001" [ref=e272] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e274]: 0E0 – 1.83323E-5
                  - paragraph [ref=e275]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - generic [ref=e276]:
                    - text: Cursor step 499,999.5
                    - generic [ref=e277]:
                      - strong [ref=e279]: kazakh-sft-005
                      - generic "Exact source value 0.000010000010000010002" [ref=e280]:
                        - text: step 499,999 · Learning rate 1E-5 · Δstep 0.5
                        - button "Pin row 499999" [ref=e281] [cursor=pointer]
                    - generic [ref=e282]:
                      - strong [ref=e284]: kazakh-sft-001
                      - generic [ref=e285]: No recorded value at this location
            - generic [ref=e286]:
              - generic [ref=e287]:
                - generic [ref=e288]:
                  - heading "Gradient norm" [level=2] [ref=e289]
                  - paragraph [ref=e290]: Recorded step · Linear scale · Original values
                - generic [ref=e291]: 1252 displayed
              - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Highlight kazakh-sft-001 0.140004 – 0.239962 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Cursor step 499,999.5 kazakh-sft-005 step 499,999 · Gradient norm 0.217161 · Δstep 0.5 Pin row 499999 kazakh-sft-001 No recorded value at this location" [ref=e292]':
                - generic [ref=e302]:
                  - generic [ref=e303]:
                    - generic [ref=e304]:
                      - button "Highlight kazakh-sft-005" [ref=e305] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e307]: 0.140 – 0.240
                    - generic [ref=e308]:
                      - button "Highlight kazakh-sft-001" [ref=e309] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e311]: 0.140004 – 0.239962
                  - paragraph [ref=e312]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - generic [ref=e313]:
                    - text: Cursor step 499,999.5
                    - generic [ref=e314]:
                      - strong [ref=e316]: kazakh-sft-005
                      - generic "Exact source value 0.21716141713317486" [ref=e317]:
                        - text: step 499,999 · Gradient norm 0.217161 · Δstep 0.5
                        - button "Pin row 499999" [ref=e318] [cursor=pointer]
                    - generic [ref=e319]:
                      - strong [ref=e321]: kazakh-sft-001
                      - generic [ref=e322]: No recorded value at this location
          - group [ref=e323]:
            - generic [ref=e325]:
              - generic [ref=e326]:
                - generic [ref=e327]:
                  - heading "Loss summaries" [level=2] [ref=e328]
                  - paragraph [ref=e329]: Computed from all original observations, independent of zoom.
                - generic [ref=e330]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e331] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e333]:
                - caption [ref=e334]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e335]:
                  - row [ref=e336]:
                    - columnheader "Run" [ref=e337]
                    - columnheader "Latest" [ref=e338]
                    - columnheader "Minimum" [ref=e339]
                    - columnheader "Maximum" [ref=e340]
                    - columnheader "Observations" [ref=e341]
                    - columnheader "Metric quality" [ref=e342]
                - rowgroup [ref=e343]:
                  - row [ref=e344]:
                    - rowheader "kazakh-sft-005" [ref=e345]:
                      - link "kazakh-sft-005" [ref=e346] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e347]:
                      - strong [ref=e348]: "0.201573"
                      - generic [ref=e349]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e350]:
                      - strong [ref=e351]: "0.200327"
                      - generic [ref=e352]: step 989,070
                    - cell "100.000 step 500,001" [ref=e353]:
                      - strong [ref=e354]: "100.000"
                      - generic [ref=e355]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e356]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e357]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e358]:
                      - link "0 invalid observations" [ref=e359] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e360]: 0 conflicting groups · 0 known gaps
                  - row [ref=e361]:
                    - rowheader "kazakh-sft-001" [ref=e362]:
                      - link "kazakh-sft-001" [ref=e363] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e364]:
                      - strong [ref=e365]: "0.269841"
                      - generic [ref=e366]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e367]:
                      - strong [ref=e368]: "0.23887"
                      - generic [ref=e369]: step 8,185
                    - cell "3.431808 step 0" [ref=e370]:
                      - strong [ref=e371]: "3.431808"
                      - generic [ref=e372]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e373]:
                      - text: 8,192 raw rows
                      - generic [ref=e374]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e375]:
                      - link "0 invalid observations" [ref=e376] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e377]: 0 conflicting groups · 0 known gaps
          - generic [ref=e378]:
            - generic [ref=e379]:
              - heading "Cursor source values" [level=2] [ref=e380]
              - paragraph [ref=e381]: Nearest recorded step shown separately for each run.
            - generic [ref=e382]:
              - strong [ref=e383]: kazakh-sft-005
              - generic [ref=e384]: step 499,999 · loss 0.227481 · source 499999
            - generic [ref=e385]:
              - strong [ref=e386]: kazakh-sft-001
              - generic [ref=e387]: No recorded value at this cursor location.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | for (const route of ['/runs/kazakh-sft-005', '/compare?runs=kazakh-sft-005,kazakh-sft-001']) {
  4  |   test(`accepted hover reaches a rendered frame with original observations: ${route}`, async ({ page }, info) => {
  5  |     const errors: string[] = []
  6  |     page.on('pageerror', error => errors.push(error.message))
  7  |     const cdp = await page.context().newCDPSession(page)
  8  |     await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
  9  |     await page.goto(route)
  10 |     const host = page.locator('.plot-host').first()
  11 |     await expect(host).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  12 |     const surface = host.locator('.u-over')
  13 |     await surface.scrollIntoViewIfNeeded()
  14 |     const box = await surface.boundingBox()
  15 |     if (!box) throw new Error('Missing real chart input surface')
  16 |     await page.mouse.move(box.x + box.width * .5, box.y + box.height * .5)
  17 |     const tooltip = page.locator('.chart-hover-value').first()
  18 |     await expect(tooltip).toContainText('kazakh-sft-005')
  19 |     await expect(tooltip).toContainText('step')
> 20 |     await expect.poll(() => page.evaluate(() => performance.getEntriesByName('soup:hover-frame').length)).toBeGreaterThan(0)
     |                                                                                                           ^ Error: expect(received).toBeGreaterThan(expected)
  21 |     const sample = await page.evaluate(() => {
  22 |       const frame = performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark
  23 |       const commit = performance.getEntriesByName('soup:hover-dom-commit').at(-1) as PerformanceMark
  24 |       return { frame: frame.toJSON(), commit: commit.toJSON(), accepted: window.__soupEvidence?.acceptedHoverSeq }
  25 |     })
  26 |     expect(sample.frame.detail.hoverSeq).toBe(sample.accepted)
  27 |     expect(sample.commit.detail.hoverSeq).toBe(sample.accepted)
  28 |     expect(sample.frame.startTime).toBeGreaterThan(sample.commit.startTime)
  29 |     expect(sample.frame.detail.requestToFrameMs).toBeGreaterThanOrEqual(sample.frame.detail.requestToAcceptedMs)
  30 |     await expect(tooltip).toHaveAttribute('data-hover-seq', String(sample.accepted))
  31 |     await expect(host).toHaveAttribute('data-cursor-point-count', /[1-9]/)
  32 |     await page.screenshot({ path: info.outputPath('accepted-hover-frame.png'), fullPage: true })
  33 |     await info.attach('accepted-hover-timing', { body: JSON.stringify(sample, null, 2), contentType: 'application/json' })
  34 |     expect(errors).toEqual([])
  35 |   })
  36 | }
  37 | 
```