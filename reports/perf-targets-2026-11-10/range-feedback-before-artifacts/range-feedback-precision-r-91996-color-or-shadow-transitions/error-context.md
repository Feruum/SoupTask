# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: range-feedback.spec.ts >> precision range controls answer hover immediately without ongoing color or shadow transitions
- Location: e2e\range-feedback.spec.ts:3:1

# Error details

```
Error: hover feedback must not keep painting after the pointer reaches a chart

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "background-color",
+   "box-shadow",
+ ]
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
                - generic [ref=e217]: 2432 displayed
              - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Highlight kazakh-sft-001 0.23887 – 3.431808 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike Compared source values" [ref=e218]':
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
                  - region "Compared source values" [ref=e248]:
                    - generic [ref=e249]:
                      - paragraph [ref=e250]: Original source values · All metrics
                      - region "Compared source table" [ref=e251]:
                        - table "Original observations at cursor step" [ref=e252]:
                          - caption [ref=e253]: Original observations at cursor step
                          - rowgroup [ref=e254]:
                            - row [ref=e255]:
                              - columnheader "Run" [ref=e256]
                              - columnheader "Recorded step" [ref=e257]
                              - columnheader "Loss" [ref=e258]
                              - columnheader "Learning rate" [ref=e259]
                              - columnheader "Gradient norm" [ref=e260]
                              - columnheader "Δstep" [ref=e261]
                              - columnheader "Source" [ref=e262]
                          - rowgroup "Original observations for kazakh-sft-005" [ref=e263]:
                            - row [ref=e264]:
                              - rowheader "kazakh-sft-005" [ref=e265]:
                                - strong [ref=e268]: kazakh-sft-005
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e269]
                          - rowgroup "Original observations for kazakh-sft-001" [ref=e270]:
                            - row [ref=e271]:
                              - rowheader "kazakh-sft-001" [ref=e272]:
                                - strong [ref=e275]: kazakh-sft-001
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e276]
                      - paragraph [ref=e277]: Scroll for more rows and metrics. Groups show the first 2 observations.
            - generic [ref=e278]:
              - generic [ref=e279]:
                - generic [ref=e280]:
                  - heading "Learning rate" [level=2] [ref=e281]
                  - paragraph [ref=e282]: Recorded step · Linear scale · Original values
                - generic [ref=e283]: 1220 displayed
              - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Highlight kazakh-sft-001 0E0 – 1.83323E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e284]':
                - generic [ref=e294]:
                  - generic [ref=e295]:
                    - generic [ref=e296]:
                      - button "Highlight kazakh-sft-005" [ref=e297] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e299]: 0E0 – 1.83333E-5
                    - generic [ref=e300]:
                      - button "Highlight kazakh-sft-001" [ref=e301] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e303]: 0E0 – 1.83323E-5
                  - paragraph [ref=e304]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
            - generic [ref=e305]:
              - generic [ref=e306]:
                - generic [ref=e307]:
                  - heading "Gradient norm" [level=2] [ref=e308]
                  - paragraph [ref=e309]: Recorded step · Linear scale · Original values
                - generic [ref=e310]: 2435 displayed
              - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Highlight kazakh-sft-001 0.140004 – 0.239962 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e311]':
                - generic [ref=e321]:
                  - generic [ref=e322]:
                    - generic [ref=e323]:
                      - button "Highlight kazakh-sft-005" [ref=e324] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e326]: 0.140 – 0.240
                    - generic [ref=e327]:
                      - button "Highlight kazakh-sft-001" [ref=e328] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e330]: 0.140004 – 0.239962
                  - paragraph [ref=e331]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - group [ref=e332]:
            - generic [ref=e334]:
              - generic [ref=e335]:
                - generic [ref=e336]:
                  - heading "Loss summaries" [level=2] [ref=e337]
                  - paragraph [ref=e338]: Computed from all original observations, independent of zoom.
                - generic [ref=e339]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e340] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e342]:
                - caption [ref=e343]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e344]:
                  - row [ref=e345]:
                    - columnheader "Run" [ref=e346]
                    - columnheader "Latest" [ref=e347]
                    - columnheader "Minimum" [ref=e348]
                    - columnheader "Maximum" [ref=e349]
                    - columnheader "Observations" [ref=e350]
                    - columnheader "Metric quality" [ref=e351]
                - rowgroup [ref=e352]:
                  - row [ref=e353]:
                    - rowheader "kazakh-sft-005" [ref=e354]:
                      - link "kazakh-sft-005" [ref=e355] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e356]:
                      - strong [ref=e357]: "0.201573"
                      - generic [ref=e358]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e359]:
                      - strong [ref=e360]: "0.200327"
                      - generic [ref=e361]: step 989,070
                    - cell "100.000 step 500,001" [ref=e362]:
                      - strong [ref=e363]: "100.000"
                      - generic [ref=e364]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e365]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e366]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e367]:
                      - link "0 invalid observations" [ref=e368] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e369]: 0 conflicting groups · 0 known gaps
                  - row [ref=e370]:
                    - rowheader "kazakh-sft-001" [ref=e371]:
                      - link "kazakh-sft-001" [ref=e372] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e373]:
                      - strong [ref=e374]: "0.269841"
                      - generic [ref=e375]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e376]:
                      - strong [ref=e377]: "0.23887"
                      - generic [ref=e378]: step 8,185
                    - cell "3.431808 step 0" [ref=e379]:
                      - strong [ref=e380]: "3.431808"
                      - generic [ref=e381]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e382]:
                      - text: 8,192 raw rows
                      - generic [ref=e383]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e384]:
                      - link "0 invalid observations" [ref=e385] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e386]: 0 conflicting groups · 0 known gaps
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('precision range controls answer hover immediately without ongoing color or shadow transitions',async({page})=>{
  4  |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  const button=page.getByRole('button',{name:'Apply range',exact:true});await button.scrollIntoViewIfNeeded()
  7  |  await button.hover()
  8  |  const running=()=>page.locator('.range-toolbar').evaluate(element=>element.getAnimations({subtree:true}).filter(animation=>animation.playState==='running').map(animation=>animation instanceof CSSTransition?animation.transitionProperty:'other animation'))
> 9  |  expect(await running(),'hover feedback must not keep painting after the pointer reaches a chart').toEqual([])
     |                                                                                                    ^ Error: hover feedback must not keep painting after the pointer reaches a chart
  10 |  await page.locator('[data-testid="comparison-loss"] .u-over').hover({position:{x:100,y:20}})
  11 |  expect(await running(),'leaving a numeric control must not start return transitions').toEqual([])
  12 | })
  13 | 
```