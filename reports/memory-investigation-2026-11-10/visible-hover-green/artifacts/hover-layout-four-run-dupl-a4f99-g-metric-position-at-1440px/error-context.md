# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-layout.spec.ts >> four-run duplicate comparison preserves the following metric position at 1440px
- Location: e2e\hover-layout.spec.ts:64:74

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
          - paragraph [ref=e67]: 4 runs selected · Aligned by original recorded step
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
                  - checkbox "Compare kazakh-sft-002" [disabled] [ref=e89]
                  - generic [ref=e90]:
                    - text: kazakh-sft-002
                    - generic [ref=e91]: Qwen2.5-3B · Completed
                - generic [ref=e92] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-003" [disabled] [ref=e93]
                  - generic [ref=e94]:
                    - text: kazakh-sft-003
                    - generic [ref=e95]: Qwen2.5-3B · Completed
                - generic [ref=e96] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-004" [disabled] [ref=e97]
                  - generic [ref=e98]:
                    - text: kazakh-sft-004
                    - generic [ref=e99]: Qwen2.5-1.5B · Failed
                - generic [ref=e100] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-005" [checked] [ref=e101]
                  - generic [ref=e102]:
                    - text: kazakh-sft-005
                    - generic [ref=e103]: Qwen2.5-3B · Running
                - generic [ref=e104] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-006" [disabled] [ref=e105]
                  - generic [ref=e106]:
                    - text: kazakh-sft-006
                    - generic [ref=e107]: Qwen2.5-3B · Running
                - generic [ref=e108] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-007" [disabled] [ref=e109]
                  - generic [ref=e110]:
                    - text: kazakh-sft-007
                    - generic [ref=e111]: Qwen2.5-1.5B · Completed
                - generic [ref=e112] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-008" [disabled] [ref=e113]
                  - generic [ref=e114]:
                    - text: kazakh-sft-008
                    - generic [ref=e115]: Qwen2.5-3B · Completed
                - generic [ref=e116] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-009" [checked] [ref=e117]
                  - generic [ref=e118]:
                    - text: kazakh-sft-009
                    - generic [ref=e119]: Qwen2.5-3B · Completed
                - generic [ref=e120] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-010" [checked] [ref=e121]
                  - generic [ref=e122]:
                    - text: kazakh-sft-010
                    - generic [ref=e123]: Qwen2.5-1.5B · Running
                - generic [ref=e124] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-011" [disabled] [ref=e125]
                  - generic [ref=e126]:
                    - text: kazakh-sft-011
                    - generic [ref=e127]: Qwen2.5-3B · Completed
                - generic [ref=e128] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-012" [disabled] [ref=e129]
                  - generic [ref=e130]:
                    - text: kazakh-sft-012
                    - generic [ref=e131]: Qwen2.5-3B · Completed
                - generic [ref=e132] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-013" [disabled] [ref=e133]
                  - generic [ref=e134]:
                    - text: kazakh-sft-013
                    - generic [ref=e135]: Qwen2.5-1.5B · Completed
                - generic [ref=e136] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-014" [disabled] [ref=e137]
                  - generic [ref=e138]:
                    - text: kazakh-sft-014
                    - generic [ref=e139]: Qwen2.5-3B · Completed
                - generic [ref=e140] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-015" [disabled] [ref=e141]
                  - generic [ref=e142]:
                    - text: kazakh-sft-015
                    - generic [ref=e143]: Qwen2.5-3B · Completed
                - generic [ref=e144] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-016" [disabled] [ref=e145]
                  - generic [ref=e146]:
                    - text: kazakh-sft-016
                    - generic [ref=e147]: Qwen2.5-1.5B · Completed
                - generic [ref=e148] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-017" [disabled] [ref=e149]
                  - generic [ref=e150]:
                    - text: kazakh-sft-017
                    - generic [ref=e151]: Qwen2.5-3B · Failed
                - generic [ref=e152] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-018" [disabled] [ref=e153]
                  - generic [ref=e154]:
                    - text: kazakh-sft-018
                    - generic [ref=e155]: Qwen2.5-3B · Cancelled
                - generic [ref=e156] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-019" [disabled] [ref=e157]
                  - generic [ref=e158]:
                    - text: kazakh-sft-019
                    - generic [ref=e159]: Qwen2.5-1.5B · Completed
                - generic [ref=e160] [cursor=pointer]:
                  - checkbox "Compare kazakh-sft-020" [disabled] [ref=e161]
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
                  - spinbutton "From step" [ref=e189]: "98"
                - generic [ref=e190]:
                  - generic [ref=e191]: To step
                  - spinbutton "To step" [ref=e192]: "100"
                - button "Apply range" [active] [ref=e193] [cursor=pointer]
              - generic [ref=e197]:
                - button "Zoom in" [ref=e198] [cursor=pointer]
                - button "Zoom out" [ref=e202] [cursor=pointer]
                - button "Reset view" [ref=e206] [cursor=pointer]
              - paragraph [ref=e210]: Step 98 to 100
          - generic [ref=e211]:
            - generic [ref=e212]:
              - generic [ref=e213]:
                - generic [ref=e214]:
                  - heading "Loss" [level=2] [ref=e215]
                  - paragraph [ref=e216]: Recorded step · Linear scale · Original values
                - generic [ref=e217]: 12 displayed
              - 'figure "Highlight kazakh-sft-005 1.832639 – 1.838472 Highlight kazakh-sft-009 1.812318 – 1.851895 Highlight kazakh-sft-010 1.818151 – 12.000 Highlight kazakh-sft-001 1.81543 – 1.835924 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-010 · This snapshot contains 1 NaN observation; recorded invalid values create gaps, never zero. Inspect data quality . Compared source values" [ref=e218]':
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - generic [ref=e230]:
                      - button "Highlight kazakh-sft-005" [ref=e231] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e233]: 1.832639 – 1.838472
                    - generic [ref=e234]:
                      - button "Highlight kazakh-sft-009" [ref=e235] [cursor=pointer]: kazakh-sft-009
                      - generic [ref=e237]: 1.812318 – 1.851895
                    - generic [ref=e238]:
                      - button "Highlight kazakh-sft-010" [ref=e239] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e241]: 1.818151 – 12.000
                    - generic [ref=e242]:
                      - button "Highlight kazakh-sft-001" [ref=e243] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e245]: 1.81543 – 1.835924
                  - paragraph [ref=e246]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - paragraph [ref=e248]:
                    - text: kazakh-sft-010 · This snapshot contains 1 NaN observation; recorded invalid values create gaps, never zero.
                    - link "Inspect data quality" [ref=e249] [cursor=pointer]:
                      - /url: /data-quality?run=kazakh-sft-010&metric=loss
                    - text: .
                  - region "Compared source values" [ref=e250]:
                    - generic [ref=e251]:
                      - paragraph [ref=e252]: Original source values · All metrics
                      - region "Compared source table" [ref=e253]:
                        - table "Original observations at cursor step" [ref=e254]:
                          - caption [ref=e255]: Original observations at cursor step
                          - rowgroup [ref=e256]:
                            - row [ref=e257]:
                              - columnheader "Run" [ref=e258]
                              - columnheader "Recorded step" [ref=e259]
                              - columnheader "Loss" [ref=e260]
                              - columnheader "Learning rate" [ref=e261]
                              - columnheader "Gradient norm" [ref=e262]
                              - columnheader "Δstep" [ref=e263]
                              - columnheader "Source" [ref=e264]
                          - rowgroup "Original observations for kazakh-sft-005" [ref=e265]:
                            - row [ref=e266]:
                              - rowheader "kazakh-sft-005" [ref=e267]:
                                - strong [ref=e270]: kazakh-sft-005
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e271]
                          - rowgroup "Original observations for kazakh-sft-009" [ref=e272]:
                            - row [ref=e273]:
                              - rowheader "kazakh-sft-009" [ref=e274]:
                                - strong [ref=e277]: kazakh-sft-009
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e278]
                          - rowgroup "Original observations for kazakh-sft-010" [ref=e279]:
                            - row [ref=e280]:
                              - rowheader "kazakh-sft-010" [ref=e281]:
                                - strong [ref=e284]: kazakh-sft-010
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e285]
                          - rowgroup "Original observations for kazakh-sft-001" [ref=e286]:
                            - row [ref=e287]:
                              - rowheader "kazakh-sft-001" [ref=e288]:
                                - strong [ref=e291]: kazakh-sft-001
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e292]
                      - paragraph [ref=e293]: Scroll for more rows and metrics. Groups show the first 2 observations.
            - generic [ref=e294]:
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - heading "Learning rate" [level=2] [ref=e297]
                  - paragraph [ref=e298]: Recorded step · Linear scale · Original values
                - generic [ref=e299]: 12 displayed
              - 'figure "Highlight kazakh-sft-005 2.35177E-8 – 2.39976E-8 Highlight kazakh-sft-009 2.83709E-6 – 2.86569E-6 Highlight kazakh-sft-010 2.83709E-6 – 2.92286E-6 Highlight kazakh-sft-001 2.83709E-6 – 2.89427E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e300]':
                - generic [ref=e310]:
                  - generic [ref=e311]:
                    - generic [ref=e312]:
                      - button "Highlight kazakh-sft-005" [ref=e313] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e315]: 2.35177E-8 – 2.39976E-8
                    - generic [ref=e316]:
                      - button "Highlight kazakh-sft-009" [ref=e317] [cursor=pointer]: kazakh-sft-009
                      - generic [ref=e319]: 2.83709E-6 – 2.86569E-6
                    - generic [ref=e320]:
                      - button "Highlight kazakh-sft-010" [ref=e321] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e323]: 2.83709E-6 – 2.92286E-6
                    - generic [ref=e324]:
                      - button "Highlight kazakh-sft-001" [ref=e325] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e327]: 2.83709E-6 – 2.89427E-6
                  - paragraph [ref=e328]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
            - generic [ref=e329]:
              - generic [ref=e330]:
                - generic [ref=e331]:
                  - heading "Gradient norm" [level=2] [ref=e332]
                  - paragraph [ref=e333]: Recorded step · Linear scale · Original values
                - generic [ref=e334]: 12 displayed
              - 'figure "Highlight kazakh-sft-005 0.203161 – 0.239146 Highlight kazakh-sft-009 0.213264 – 0.237536 Highlight kazakh-sft-010 0.190018 – 0.233712 Highlight kazakh-sft-001 0.141555 – 0.21611 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e335]':
                - generic [ref=e345]:
                  - generic [ref=e346]:
                    - generic [ref=e347]:
                      - button "Highlight kazakh-sft-005" [ref=e348] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e350]: 0.203161 – 0.239146
                    - generic [ref=e351]:
                      - button "Highlight kazakh-sft-009" [ref=e352] [cursor=pointer]: kazakh-sft-009
                      - generic [ref=e354]: 0.213264 – 0.237536
                    - generic [ref=e355]:
                      - button "Highlight kazakh-sft-010" [ref=e356] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e358]: 0.190018 – 0.233712
                    - generic [ref=e359]:
                      - button "Highlight kazakh-sft-001" [ref=e360] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e362]: 0.141555 – 0.21611
                  - paragraph [ref=e363]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - group [ref=e364]:
            - generic [ref=e366]:
              - generic [ref=e367]:
                - generic [ref=e368]:
                  - heading "Loss summaries" [level=2] [ref=e369]
                  - paragraph [ref=e370]: Computed from all original observations, independent of zoom.
                - generic [ref=e371]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e372] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e374]:
                - caption [ref=e375]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e376]:
                  - row [ref=e377]:
                    - columnheader "Run" [ref=e378]
                    - columnheader "Latest" [ref=e379]
                    - columnheader "Minimum" [ref=e380]
                    - columnheader "Maximum" [ref=e381]
                    - columnheader "Observations" [ref=e382]
                    - columnheader "Metric quality" [ref=e383]
                - rowgroup [ref=e384]:
                  - row [ref=e385]:
                    - rowheader "kazakh-sft-005" [ref=e386]:
                      - link "kazakh-sft-005" [ref=e387] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e388]:
                      - strong [ref=e389]: "0.201573"
                      - generic [ref=e390]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e391]:
                      - strong [ref=e392]: "0.200327"
                      - generic [ref=e393]: step 989,070
                    - cell "100.000 step 500,001" [ref=e394]:
                      - strong [ref=e395]: "100.000"
                      - generic [ref=e396]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e397]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e398]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e399]:
                      - link "0 invalid observations" [ref=e400] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e401]: 0 conflicting groups · 0 known gaps
                  - row [ref=e402]:
                    - rowheader "kazakh-sft-009" [ref=e403]:
                      - link "kazakh-sft-009" [ref=e404] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-009
                    - cell "0.256026 step 8,191" [ref=e405]:
                      - strong [ref=e406]: "0.256026"
                      - generic [ref=e407]: step 8,191
                    - cell "0.238756 step 8,177" [ref=e408]:
                      - strong [ref=e409]: "0.238756"
                      - generic [ref=e410]: step 8,177
                    - cell "3.430801 step 0" [ref=e411]:
                      - strong [ref=e412]: "3.430801"
                      - generic [ref=e413]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e414]:
                      - text: 8,192 raw rows
                      - generic [ref=e415]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 1 known gaps" [ref=e416]:
                      - link "0 invalid observations" [ref=e417] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-009&metric=loss
                      - generic [ref=e418]: 0 conflicting groups · 1 known gaps
                  - row [ref=e419]:
                    - rowheader "kazakh-sft-010" [ref=e420]:
                      - link "kazakh-sft-010" [ref=e421] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-010
                    - 'cell "Conflicting latest measurements step 8,190 Earlier finite: 0.244188 at step 8,189 source index 8189" [ref=e422]':
                      - strong [ref=e423]: Conflicting latest measurements
                      - generic [ref=e424]: step 8,190
                      - paragraph [ref=e425]:
                        - text: "Earlier finite: 0.244188 at step 8,189"
                        - generic [ref=e426]: source index 8189
                    - cell "0.23927 step 8,107" [ref=e427]:
                      - strong [ref=e428]: "0.23927"
                      - generic [ref=e429]: step 8,107
                    - cell "12.000 step 100" [ref=e430]:
                      - strong [ref=e431]: "12.000"
                      - generic [ref=e432]: step 100
                    - cell "8,192 raw rows 8,191 finite Loss observations" [ref=e433]:
                      - text: 8,192 raw rows
                      - generic [ref=e434]: 8,191 finite Loss observations
                    - cell "1 invalid observations 2 conflicting groups · 1 known gaps" [ref=e435]:
                      - link "1 invalid observations" [ref=e436] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-010&metric=loss
                      - generic [ref=e437]: 2 conflicting groups · 1 known gaps
                  - row [ref=e438]:
                    - rowheader "kazakh-sft-001" [ref=e439]:
                      - link "kazakh-sft-001" [ref=e440] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e441]:
                      - strong [ref=e442]: "0.269841"
                      - generic [ref=e443]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e444]:
                      - strong [ref=e445]: "0.23887"
                      - generic [ref=e446]: step 8,185
                    - cell "3.431808 step 0" [ref=e447]:
                      - strong [ref=e448]: "3.431808"
                      - generic [ref=e449]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e450]:
                      - text: 8,192 raw rows
                      - generic [ref=e451]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e452]:
                      - link "0 invalid observations" [ref=e453] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e454]: 0 conflicting groups · 0 known gaps
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | async function documentTop(locator: Locator) {
  3   |   return locator.evaluate(element => element.getBoundingClientRect().top + scrollY);
  4   | }
  5   | async function pointAtCenter(page: Page, plot: Locator) {
  6   |   await plot.locator('.u-over').scrollIntoViewIfNeeded();
  7   |   const box = await plot.locator('.u-over').boundingBox();
  8   |   if (!box) throw new Error('Missing chart input surface');
  9   |   const sequence = await page.evaluate(() => (window as Window & {
  10  |     __soupEvidence?: {
  11  |       acceptedHoverSeq: number;
  12  |     };
  13  |   }).__soupEvidence?.acceptedHoverSeq ?? 0);
  14  |   await page.mouse.move(box.x + box.width / 2 - 1, box.y + box.height / 2);
  15  |   await expect.poll(() => page.evaluate(() => (window as Window & {
  16  |     __soupEvidence?: {
  17  |       acceptedHoverSeq: number;
  18  |     };
> 19  |   }).__soupEvidence?.acceptedHoverSeq ?? 0)).toBeGreaterThan(sequence);
      |                                              ^ Error: expect(received).toBeGreaterThan(expected)
  20  | }
  21  | async function setRange(page: Page, min: number, max: number) {
  22  |   const from = page.getByLabel('From step', {
  23  |     exact: true
  24  |   });
  25  |   if (!(await from.isVisible())) await page.locator('.range-disclosure > summary').click();
  26  |   await from.fill(String(min));
  27  |   await page.getByLabel('To step', {
  28  |     exact: true
  29  |   }).fill(String(max));
  30  |   await page.getByRole('button', {
  31  |     name: 'Apply range',
  32  |     exact: true
  33  |   }).click();
  34  |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true');
  35  | }
  36  | for (const route of ['/dashboard', '/runs']) test(`${route} keeps source actions in place while the cursor updates`, async ({
  37  |   page
  38  | }, info) => {
  39  |   await page.setViewportSize({
  40  |     width: 1280,
  41  |     height: 900
  42  |   });
  43  |   await page.goto(route);
  44  |   const plot = page.getByTestId('loss-chart');
  45  |   await expect(plot).toHaveAttribute('data-view-ready', 'true');
  46  |   const next = page.locator(route === '/dashboard' ? '.calm-source-quality' : '.preview-facts');
  47  |   const before = await documentTop(next);
  48  |   await pointAtCenter(page, plot);
  49  |   const after = await documentTop(next);
  50  |   await info.attach('preview-layout', {
  51  |     body: JSON.stringify({
  52  |       route,
  53  |       before,
  54  |       after
  55  |     }),
  56  |     contentType: 'application/json'
  57  |   });
  58  |   expect.soft(after).toBeCloseTo(before, 0);
  59  |   if (route === '/dashboard') await expect(page.locator('.calm-chart .chart-hover-value')).toBeVisible();
  60  |   else await expect(page.locator('.preview-charts .chart-hover-value')).toHaveCount(0);
  61  |   await expect(plot).toHaveAttribute('data-cursor-point-count', /[1-9]/);
  62  |   if (route === '/runs') await expect(page.locator('.preview-charts')).toContainText('inspect original values and adjust range');
  63  | });
  64  | for (const width of [390, 1440]) for (const comparison of [false, true]) test(`${comparison ? 'four-run duplicate comparison' : 'full run'} preserves the following metric position at ${width}px`, async ({
  65  |   page
  66  | }, info) => {
  67  |   await page.setViewportSize({
  68  |     width,
  69  |     height: 900
  70  |   });
  71  |   await page.goto(comparison ? '/compare?runs=kazakh-sft-005,kazakh-sft-009,kazakh-sft-010,kazakh-sft-001' : '/runs/kazakh-sft-005');
  72  |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true');
  73  |   await setRange(page, comparison ? 98 : 500000, comparison ? 100 : 500002);
  74  |   const plot = page.locator('.metric-loss .plot-host'),
  75  |     following = page.locator('.metric-lr'),
  76  |     before = await documentTop(following);
  77  |   await pointAtCenter(page, plot);
  78  |   await expect(page.locator('.metric-loss .chart-hover-value')).toBeVisible();
  79  |   const after = await documentTop(following);
  80  |   await info.attach('full-chart-layout', {
  81  |     body: JSON.stringify({
  82  |       width,
  83  |       comparison,
  84  |       before,
  85  |       after
  86  |     }),
  87  |     contentType: 'application/json'
  88  |   });
  89  |   expect(after).toBeCloseTo(before, 0);
  90  |   await expect(page.getByTestId(comparison ? 'comparison-cursor-readout' : 'cursor-readout-loss')).toHaveAttribute('data-reserved', 'true');
  91  |   if (comparison) {
  92  |     const source = page.getByTestId('comparison-cursor-readout');
  93  |     await expect(source.locator('tbody')).toHaveCount(4);
  94  |     const group = source.locator('tbody[aria-label="Original observations for kazakh-sft-009"]');
  95  |     await expect(group).toContainText('11 returned observations');
  96  |     await expect(group.getByRole('link', {
  97  |       name: 'Inspect full source group', exact: true
  98  |     })).toHaveAttribute('href', /step=99&revision=/);
  99  |   } else {
  100 |     const pin = page.locator('.metric-loss').getByRole('button', {
  101 |       name: 'Pin row 500001',
  102 |       exact: true
  103 |     });
  104 |     await pin.focus();
  105 |     await page.keyboard.press('Enter');
  106 |     await expect(page.getByTestId('pinned-loss')).toHaveText('100');
  107 |   }
  108 |   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  109 | });
  110 | test('the visible recorded spike explains the linear axis and zoom keeps its exact source', async ({
  111 |   page
  112 | }) => {
  113 |   await page.goto('/runs/kazakh-sft-005');
  114 |   const note = page.getByTestId('spike-explanation');
  115 |   await expect(note).toContainText('Recorded spike: loss 100 at step 500,001');
  116 |   await expect(note).toContainText('linear scale includes this peak');
  117 |   await expect(note.getByRole('link', {
  118 |     name: 'Inspect original spike',
  119 |     exact: true
```