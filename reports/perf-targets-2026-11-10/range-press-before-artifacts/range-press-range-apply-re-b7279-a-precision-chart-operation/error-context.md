# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: range-press.spec.ts >> range apply retains its geometry during a precision chart operation
- Location: e2e\range-press.spec.ts:3:1

# Error details

```
Error: numeric range controls must keep their press rectangle stable

expect(received).toBeLessThan(expected)

Expected: < 0.25
Received:   3.23046875
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
                - button "Apply range" [active] [ref=e193] [cursor=pointer]
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
                - generic [ref=e217]: 2432 displayed
              - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Highlight kazakh-sft-001 0.23887 – 3.431808 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike Loss source readout" [ref=e218]':
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - generic [ref=e230]:
                      - button "Highlight kazakh-sft-005" [ref=e231] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e233]: 0.200327 – 100.000
                    - generic [ref=e234]:
                      - button "Highlight kazakh-sft-001" [ref=e235] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e237]: 0.23887 – 3.431808
                  - paragraph [ref=e238]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - generic [ref=e240]:
                    - paragraph [ref=e241]: "kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline."
                    - generic [ref=e242]:
                      - link "Inspect original spike" [ref=e243] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005?sourceIndex=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
                      - button "Zoom around spike" [ref=e244] [cursor=pointer]
                  - region "Loss source readout" [ref=e248]:
                    - generic [ref=e249]:
                      - paragraph [ref=e250]: Original source values
                      - generic [ref=e251]:
                        - generic [ref=e252]:
                          - strong [ref=e255]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e256]:
                            - paragraph [ref=e257]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
                        - generic [ref=e258]:
                          - strong [ref=e261]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e262]:
                            - paragraph [ref=e263]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
            - generic [ref=e264]:
              - generic [ref=e265]:
                - generic [ref=e266]:
                  - heading "Learning rate" [level=2] [ref=e267]
                  - paragraph [ref=e268]: Recorded step · Linear scale · Original values
                - generic [ref=e269]: 1220 displayed
              - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Highlight kazakh-sft-001 0E0 – 1.83323E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout" [ref=e270]':
                - generic [ref=e280]:
                  - generic [ref=e281]:
                    - generic [ref=e282]:
                      - button "Highlight kazakh-sft-005" [ref=e283] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e285]: 0E0 – 1.83333E-5
                    - generic [ref=e286]:
                      - button "Highlight kazakh-sft-001" [ref=e287] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e289]: 0E0 – 1.83323E-5
                  - paragraph [ref=e290]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - region "Learning rate source readout" [ref=e291]:
                    - generic [ref=e292]:
                      - paragraph [ref=e293]: Original source values
                      - generic [ref=e294]:
                        - generic [ref=e295]:
                          - strong [ref=e298]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e299]:
                            - paragraph [ref=e300]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
                        - generic [ref=e301]:
                          - strong [ref=e304]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e305]:
                            - paragraph [ref=e306]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
            - generic [ref=e307]:
              - generic [ref=e308]:
                - generic [ref=e309]:
                  - heading "Gradient norm" [level=2] [ref=e310]
                  - paragraph [ref=e311]: Recorded step · Linear scale · Original values
                - generic [ref=e312]: 2435 displayed
              - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Highlight kazakh-sft-001 0.140004 – 0.239962 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout" [ref=e313]':
                - generic [ref=e323]:
                  - generic [ref=e324]:
                    - generic [ref=e325]:
                      - button "Highlight kazakh-sft-005" [ref=e326] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e328]: 0.140 – 0.240
                    - generic [ref=e329]:
                      - button "Highlight kazakh-sft-001" [ref=e330] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e332]: 0.140004 – 0.239962
                  - paragraph [ref=e333]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - region "Gradient norm source readout" [ref=e334]:
                    - generic [ref=e335]:
                      - paragraph [ref=e336]: Original source values
                      - generic [ref=e337]:
                        - generic [ref=e338]:
                          - strong [ref=e341]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e342]:
                            - paragraph [ref=e343]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
                        - generic [ref=e344]:
                          - strong [ref=e347]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e348]:
                            - paragraph [ref=e349]: Point at a chart to inspect its original source values. Pin a row to keep it for inspection.
          - group [ref=e350]:
            - generic [ref=e352]:
              - generic [ref=e353]:
                - generic [ref=e354]:
                  - heading "Loss summaries" [level=2] [ref=e355]
                  - paragraph [ref=e356]: Computed from all original observations, independent of zoom.
                - generic [ref=e357]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e358] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e360]:
                - caption [ref=e361]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e362]:
                  - row [ref=e363]:
                    - columnheader "Run" [ref=e364]
                    - columnheader "Latest" [ref=e365]
                    - columnheader "Minimum" [ref=e366]
                    - columnheader "Maximum" [ref=e367]
                    - columnheader "Observations" [ref=e368]
                    - columnheader "Metric quality" [ref=e369]
                - rowgroup [ref=e370]:
                  - row [ref=e371]:
                    - rowheader "kazakh-sft-005" [ref=e372]:
                      - link "kazakh-sft-005" [ref=e373] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e374]:
                      - strong [ref=e375]: "0.201573"
                      - generic [ref=e376]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e377]:
                      - strong [ref=e378]: "0.200327"
                      - generic [ref=e379]: step 989,070
                    - cell "100.000 step 500,001" [ref=e380]:
                      - strong [ref=e381]: "100.000"
                      - generic [ref=e382]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e383]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e384]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e385]:
                      - link "0 invalid observations" [ref=e386] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e387]: 0 conflicting groups · 0 known gaps
                  - row [ref=e388]:
                    - rowheader "kazakh-sft-001" [ref=e389]:
                      - link "kazakh-sft-001" [ref=e390] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e391]:
                      - strong [ref=e392]: "0.269841"
                      - generic [ref=e393]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e394]:
                      - strong [ref=e395]: "0.23887"
                      - generic [ref=e396]: step 8,185
                    - cell "3.431808 step 0" [ref=e397]:
                      - strong [ref=e398]: "3.431808"
                      - generic [ref=e399]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e400]:
                      - text: 8,192 raw rows
                      - generic [ref=e401]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e402]:
                      - link "0 invalid observations" [ref=e403] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e404]: 0 conflicting groups · 0 known gaps
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('range apply retains its geometry during a precision chart operation',async({page})=>{
  4  |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  const button=page.getByRole('button',{name:'Apply range',exact:true});await button.scrollIntoViewIfNeeded()
  7  |  const before=(await button.boundingBox())!
  8  |  await page.mouse.move(before.x+before.width/2,before.y+before.height/2);await page.mouse.down()
  9  |  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
  10 |  const pressed=(await button.boundingBox())!
  11 |  await page.mouse.up()
> 12 |  expect(Math.abs(pressed.width-before.width),'numeric range controls must keep their press rectangle stable').toBeLessThan(.25)
     |                                                                                                               ^ Error: numeric range controls must keep their press rectangle stable
  13 | })
  14 | 
```