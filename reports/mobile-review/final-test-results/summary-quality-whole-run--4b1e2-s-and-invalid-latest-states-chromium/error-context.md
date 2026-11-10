# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: summary-quality.spec.ts >> whole-run summaries expose each metric with source steps and invalid latest states
- Location: e2e\summary-quality.spec.ts:9:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.selectOption: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Summary metric', { exact: true })

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
                  - checkbox "Compare kazakh-sft-001" [disabled] [ref=e85]
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
                  - checkbox "Compare kazakh-sft-006" [checked] [ref=e105]
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
                  - checkbox "Compare kazakh-sft-009" [disabled] [ref=e117]
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
                  - checkbox "Compare kazakh-sft-015" [checked] [ref=e141]
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
                - generic [ref=e217]: 3143 displayed
              - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Highlight kazakh-sft-006 0.238795 – 3.416736 Highlight kazakh-sft-010 0.23927 – 12.000 Highlight kazakh-sft-015 0.238704 – 3.406297 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e218]':
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - generic [ref=e230]:
                      - button "Highlight kazakh-sft-005" [ref=e231] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e233]: 0.200327 – 100.000
                    - generic [ref=e234]:
                      - button "Highlight kazakh-sft-006" [ref=e235] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e237]: 0.238795 – 3.416736
                    - generic [ref=e238]:
                      - button "Highlight kazakh-sft-010" [ref=e239] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e241]: 0.23927 – 12.000
                    - generic [ref=e242]:
                      - button "Highlight kazakh-sft-015" [ref=e243] [cursor=pointer]: kazakh-sft-015
                      - generic [ref=e245]: 0.238704 – 3.406297
                  - paragraph [ref=e246]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
            - generic [ref=e247]:
              - generic [ref=e248]:
                - generic [ref=e249]:
                  - heading "Learning rate" [level=2] [ref=e250]
                  - paragraph [ref=e251]: Recorded step · Linear scale · Original values
                - generic [ref=e252]: 648 displayed
              - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Highlight kazakh-sft-006 0E0 – 1.83323E-5 Highlight kazakh-sft-010 0E0 – 1.83323E-5 Highlight kazakh-sft-015 0E0 – 1.83323E-9 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e253]':
                - generic [ref=e263]:
                  - generic [ref=e264]:
                    - generic [ref=e265]:
                      - button "Highlight kazakh-sft-005" [ref=e266] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e268]: 0E0 – 1.83333E-5
                    - generic [ref=e269]:
                      - button "Highlight kazakh-sft-006" [ref=e270] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e272]: 0E0 – 1.83323E-5
                    - generic [ref=e273]:
                      - button "Highlight kazakh-sft-010" [ref=e274] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e276]: 0E0 – 1.83323E-5
                    - generic [ref=e277]:
                      - button "Highlight kazakh-sft-015" [ref=e278] [cursor=pointer]: kazakh-sft-015
                      - generic [ref=e280]: 0E0 – 1.83323E-9
                  - paragraph [ref=e281]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
            - generic [ref=e282]:
              - generic [ref=e283]:
                - generic [ref=e284]:
                  - heading "Gradient norm" [level=2] [ref=e285]
                  - paragraph [ref=e286]: Recorded step · Linear scale · Original values
                - generic [ref=e287]: 1284 displayed
              - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Highlight kazakh-sft-006 0.140005 – 0.239992 Highlight kazakh-sft-010 0.140004 – 0.239994 Highlight kazakh-sft-015 0.140008 – 0.239994 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e288]':
                - generic [ref=e298]:
                  - generic [ref=e299]:
                    - generic [ref=e300]:
                      - button "Highlight kazakh-sft-005" [ref=e301] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e303]: 0.140 – 0.240
                    - generic [ref=e304]:
                      - button "Highlight kazakh-sft-006" [ref=e305] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e307]: 0.140005 – 0.239992
                    - generic [ref=e308]:
                      - button "Highlight kazakh-sft-010" [ref=e309] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e311]: 0.140004 – 0.239994
                    - generic [ref=e312]:
                      - button "Highlight kazakh-sft-015" [ref=e313] [cursor=pointer]: kazakh-sft-015
                      - generic [ref=e315]: 0.140008 – 0.239994
                  - paragraph [ref=e316]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - group [ref=e317]:
            - generic [ref=e319]:
              - generic [ref=e320]:
                - generic [ref=e321]:
                  - heading "Loss summaries" [level=2] [ref=e322]
                  - paragraph [ref=e323]: Computed from all original observations, independent of zoom.
                - generic [ref=e324]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e325] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e327]:
                - caption [ref=e328]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e329]:
                  - row [ref=e330]:
                    - columnheader "Run" [ref=e331]
                    - columnheader "Latest" [ref=e332]
                    - columnheader "Minimum" [ref=e333]
                    - columnheader "Maximum" [ref=e334]
                    - columnheader "Observations" [ref=e335]
                    - columnheader "Metric quality" [ref=e336]
                - rowgroup [ref=e337]:
                  - row [ref=e338]:
                    - rowheader "kazakh-sft-005" [ref=e339]:
                      - link "kazakh-sft-005" [ref=e340] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e341]:
                      - strong [ref=e342]: "0.201573"
                      - generic [ref=e343]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e344]:
                      - strong [ref=e345]: "0.200327"
                      - generic [ref=e346]: step 989,070
                    - cell "100.000 step 500,001" [ref=e347]:
                      - strong [ref=e348]: "100.000"
                      - generic [ref=e349]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e350]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e351]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e352]:
                      - link "0 invalid observations" [ref=e353] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e354]: 0 conflicting groups · 0 known gaps
                  - row [ref=e355]:
                    - rowheader "kazakh-sft-006" [ref=e356]:
                      - link "kazakh-sft-006" [ref=e357] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-006
                    - 'cell "Invalid latest measurement step 8,191 Earlier finite: 0.265264 at step 8,190 source index 8190" [ref=e358]':
                      - strong [ref=e359]: Invalid latest measurement
                      - generic [ref=e360]: step 8,191
                      - paragraph [ref=e361]:
                        - text: "Earlier finite: 0.265264 at step 8,190"
                        - generic [ref=e362]: source index 8190
                    - cell "0.238795 step 8,157" [ref=e363]:
                      - strong [ref=e364]: "0.238795"
                      - generic [ref=e365]: step 8,157
                    - cell "3.416736 step 0" [ref=e366]:
                      - strong [ref=e367]: "3.416736"
                      - generic [ref=e368]: step 0
                    - cell "8,192 raw rows 8,190 finite Loss observations" [ref=e369]:
                      - text: 8,192 raw rows
                      - generic [ref=e370]: 8,190 finite Loss observations
                    - cell "2 invalid observations 0 conflicting groups · 0 known gaps" [ref=e371]:
                      - link "2 invalid observations" [ref=e372] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-006&metric=loss
                      - generic [ref=e373]: 0 conflicting groups · 0 known gaps
                  - row [ref=e374]:
                    - rowheader "kazakh-sft-010" [ref=e375]:
                      - link "kazakh-sft-010" [ref=e376] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-010
                    - 'cell "Conflicting latest measurements step 8,190 Earlier finite: 0.244188 at step 8,189 source index 8189" [ref=e377]':
                      - strong [ref=e378]: Conflicting latest measurements
                      - generic [ref=e379]: step 8,190
                      - paragraph [ref=e380]:
                        - text: "Earlier finite: 0.244188 at step 8,189"
                        - generic [ref=e381]: source index 8189
                    - cell "0.23927 step 8,107" [ref=e382]:
                      - strong [ref=e383]: "0.23927"
                      - generic [ref=e384]: step 8,107
                    - cell "12.000 step 100" [ref=e385]:
                      - strong [ref=e386]: "12.000"
                      - generic [ref=e387]: step 100
                    - cell "8,192 raw rows 8,191 finite Loss observations" [ref=e388]:
                      - text: 8,192 raw rows
                      - generic [ref=e389]: 8,191 finite Loss observations
                    - cell "1 invalid observations 2 conflicting groups · 1 known gaps" [ref=e390]:
                      - link "1 invalid observations" [ref=e391] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-010&metric=loss
                      - generic [ref=e392]: 2 conflicting groups · 1 known gaps
                  - row [ref=e393]:
                    - rowheader "kazakh-sft-015" [ref=e394]:
                      - link "kazakh-sft-015" [ref=e395] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-015
                    - cell "0.261842 step 8,191" [ref=e396]:
                      - strong [ref=e397]: "0.261842"
                      - generic [ref=e398]: step 8,191
                    - cell "0.238704 step 8,187" [ref=e399]:
                      - strong [ref=e400]: "0.238704"
                      - generic [ref=e401]: step 8,187
                    - cell "3.406297 step 0" [ref=e402]:
                      - strong [ref=e403]: "3.406297"
                      - generic [ref=e404]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e405]:
                      - text: 8,192 raw rows
                      - generic [ref=e406]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e407]:
                      - link "0 invalid observations" [ref=e408] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-015&metric=loss
                      - generic [ref=e409]: 0 conflicting groups · 0 known gaps
          - generic [ref=e411]:
            - heading "Cursor source values" [level=2] [ref=e412]
            - paragraph [ref=e413]: Nearest recorded step shown separately for each run.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | test.use({
  3  |   viewport: {
  4  |     width: 1440,
  5  |     height: 900
  6  |   },
  7  |   locale: 'en-US'
  8  | });
  9  | test('whole-run summaries expose each metric with source steps and invalid latest states', async ({
  10 |   page
  11 | }) => {
  12 |   await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-006,kazakh-sft-010,kazakh-sft-015');
  13 |   const summary = page.getByTestId('comparison-summary');
  14 |   await expect(summary).toHaveAttribute('data-summary-metric', 'loss');
  15 |   await expect(page.getByTestId('summary-kazakh-sft-005-max')).toHaveText('100.000step 500,001');
  16 |   await expect(page.getByTestId('summary-kazakh-sft-005-min')).toContainText('step 989,070');
  17 |   const invalid = page.getByTestId('summary-kazakh-sft-006-latest');
  18 |   await expect(invalid).toContainText('Invalid latest measurementstep 8,191');
  19 |   await expect(invalid).toContainText('Earlier finite: 0.265264 at step 8,190');
  20 |   await expect(page.getByTestId('summary-kazakh-sft-006-min')).toContainText('step 8,157');
  21 |   const conflict = page.getByTestId('summary-kazakh-sft-010-latest');
  22 |   await expect(conflict).toContainText('Conflicting latest measurementsstep 8,190');
  23 |   await expect(conflict).toContainText('Earlier finite:');
  24 |   await expect(conflict).toContainText('at step 8,189');
  25 |   await expect(page.getByTestId('summary-row-kazakh-sft-005')).toContainText('1,000,000 raw rows');
  26 |   await page.getByLabel('Summary metric', {
  27 |     exact: true
> 28 |   }).selectOption('lr');
     |      ^ Error: locator.selectOption: Test timeout of 30000ms exceeded.
  29 |   await expect(summary).toHaveAttribute('data-summary-metric', 'lr');
  30 |   await expect(page.getByTestId('summary-kazakh-sft-015-max')).toHaveText('1.83323E-9step 683');
  31 |   await expect(page.getByTestId('summary-kazakh-sft-015-min')).toHaveText('0E0step 0');
  32 |   await expect(page.getByTestId('summary-kazakh-sft-006-latest')).toHaveText('0E0step 8,191');
  33 |   await expect(page.getByTestId('summary-row-kazakh-sft-006').getByRole('link', {
  34 |     name: '0 invalid observations'
  35 |   })).toHaveAttribute('href', '/data-quality?run=kazakh-sft-006&metric=lr');
  36 |   await page.getByLabel('Summary metric', {
  37 |     exact: true
  38 |   }).selectOption('grad_norm');
  39 |   await expect(summary).toHaveAttribute('data-summary-metric', 'grad_norm');
  40 |   await expect(page.getByTestId('summary-kazakh-sft-005-max')).toContainText('step 29,989');
  41 |   await expect(page.getByTestId('summary-kazakh-sft-005-min')).toContainText('step 945,702');
  42 | });
  43 | test('run quality exposes bounded findings and same-run links open the exact source row', async ({
  44 |   page
  45 | }) => {
  46 |   await page.goto('/runs/kazakh-sft-006');
  47 |   await page.getByRole('button', {
  48 |     name: 'Data quality',
  49 |     exact: true
  50 |   }).click();
  51 |   const counts = page.getByTestId('run-issue-types');
  52 |   await expect(counts.getByRole('row').filter({
  53 |     hasText: 'NaN'
  54 |   })).toContainText('2metric observations');
  55 |   const ledger = page.getByTestId('run-issue-ledger');
  56 |   await expect(ledger).toBeVisible();
  57 |   await expect(ledger.getByRole('row')).toHaveCount(3);
  58 |   await expect(page.getByTestId('run-issue-strip').getByRole('link')).toHaveCount(2);
  59 |   const source = ledger.getByRole('link', {
  60 |     name: 'Inspect source 8191',
  61 |     exact: true
  62 |   });
  63 |   await expect(source).toHaveAttribute('href', /sourceIndex=8191&revision=/);
  64 |   await source.click();
  65 |   await expect(page.getByRole('button', {
  66 |     name: 'Source',
  67 |     exact: true
  68 |   })).toHaveAttribute('aria-pressed', 'true');
  69 |   await expect(page.getByLabel('Source index', {
  70 |     exact: true
  71 |   })).toHaveValue('8191');
  72 |   await expect(page.getByTestId('inspected-loss')).toHaveText('NaN');
  73 | });
  74 | test('workspace issue totals keep observations, source rows and groups as separate units', async ({
  75 |   page
  76 | }) => {
  77 |   await page.goto('/data-quality');
  78 |   const counts = page.getByTestId('workspace-issue-types');
  79 |   await expect(counts.getByRole('row')).toHaveCount(10);
  80 |   await expect(counts.getByRole('row').filter({
  81 |     hasText: 'Additional duplicate rows'
  82 |   })).toContainText('raw rows beyond the first group member');
  83 |   await expect(counts.getByRole('row').filter({
  84 |     hasText: 'Duplicate steps'
  85 |   })).toContainText('step groups');
  86 |   await expect(counts.getByRole('row').filter({
  87 |     hasText: 'Conflicting measurements'
  88 |   })).toContainText('metric groups');
  89 |   await expect(counts.getByRole('row').filter({
  90 |     hasText: 'Known cadence gaps'
  91 |   })).toContainText('missing intervals');
  92 | });
  93 | 
```