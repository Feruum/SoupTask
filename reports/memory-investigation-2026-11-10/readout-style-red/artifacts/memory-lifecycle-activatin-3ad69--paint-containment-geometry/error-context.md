# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: memory-lifecycle.spec.ts >> activating source observations does not change inherited font or paint containment geometry
- Location: e2e\memory-lifecycle.spec.ts:69:1

# Error details

```
Error: source-state marker must not change inherited numeric font or paint clip

expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Object {
    "fontSize": "12px",
    "margin": "0px",
-   "numeric": "normal",
+   "numeric": "tabular-nums",
    "padding": "0px",
-   "radius": "0px",
+   "radius": "6px",
  }
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
                  - checkbox "Compare kazakh-sft-002" [checked] [ref=e89]
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
                  - checkbox "Compare kazakh-sft-010" [disabled] [ref=e121]
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
                - generic [ref=e217]: 2475 displayed
              - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Highlight kazakh-sft-001 0.23887 – 3.431808 Highlight kazakh-sft-002 0.454091 – 3.417161 Highlight kazakh-sft-006 0.238795 – 3.416736 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero. Inspect data quality . Compared source values" [ref=e218]':
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - generic [ref=e230]:
                      - button "Highlight kazakh-sft-005" [ref=e231] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e233]: 0.200327 – 100.000
                    - generic [ref=e234]:
                      - button "Highlight kazakh-sft-001" [ref=e235] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e237]: 0.23887 – 3.431808
                    - generic [ref=e238]:
                      - button "Highlight kazakh-sft-002" [ref=e239] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e241]: 0.454091 – 3.417161
                    - generic [ref=e242]:
                      - button "Highlight kazakh-sft-006" [ref=e243] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e245]: 0.238795 – 3.416736
                  - paragraph [ref=e246]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - generic [ref=e248]:
                    - paragraph [ref=e249]: "kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline."
                    - generic [ref=e250]:
                      - link "Inspect original spike" [ref=e251] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005?sourceIndex=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
                      - button "Zoom around spike" [ref=e252] [cursor=pointer]
                  - paragraph [ref=e257]:
                    - text: kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero.
                    - link "Inspect data quality" [ref=e258] [cursor=pointer]:
                      - /url: /data-quality?run=kazakh-sft-006&metric=loss
                    - text: .
                  - region "Compared source values" [ref=e259]:
                    - generic [ref=e260]:
                      - paragraph [ref=e261]: Cursor step 449,345.955882 · All metrics
                      - region "Compared source table" [ref=e262]:
                        - table "Original observations at cursor step" [ref=e263]:
                          - caption [ref=e264]: Original observations at cursor step
                          - rowgroup [ref=e265]:
                            - row [ref=e266]:
                              - columnheader "Run" [ref=e267]
                              - columnheader "Recorded step" [ref=e268]
                              - columnheader "Loss" [ref=e269]
                              - columnheader "Learning rate" [ref=e270]
                              - columnheader "Gradient norm" [ref=e271]
                              - columnheader "Δstep" [ref=e272]
                              - columnheader "Source" [ref=e273]
                          - rowgroup "Original observations for kazakh-sft-005" [ref=e274]:
                            - row [ref=e275]:
                              - rowheader "kazakh-sft-005" [ref=e276]:
                                - strong [ref=e279]: kazakh-sft-005
                              - cell "449,346" [ref=e280]
                              - cell "0.206931" [ref=e281]
                              - cell "1.10131E-5" [ref=e282]
                              - cell "0.176642" [ref=e283]
                              - cell "0.044118" [ref=e284]
                              - cell [ref=e285]:
                                - button "Pin row 449346" [ref=e286] [cursor=pointer]: "Pin #449346"
                          - rowgroup "Original observations for kazakh-sft-001" [ref=e287]:
                            - row [ref=e288]:
                              - rowheader "kazakh-sft-001" [ref=e289]:
                                - strong [ref=e292]: kazakh-sft-001
                              - cell "No recorded value at this cursor location." [ref=e293]
                          - rowgroup "Original observations for kazakh-sft-002" [ref=e294]:
                            - row [ref=e295]:
                              - rowheader "kazakh-sft-002" [ref=e296]:
                                - strong [ref=e299]: kazakh-sft-002
                              - cell "No recorded value at this cursor location." [ref=e300]
                          - rowgroup "Original observations for kazakh-sft-006" [ref=e301]:
                            - row [ref=e302]:
                              - rowheader "kazakh-sft-006" [ref=e303]:
                                - strong [ref=e306]: kazakh-sft-006
                              - cell "No recorded value at this cursor location." [ref=e307]
                      - paragraph [ref=e308]: Scroll for more rows and metrics. Groups show the first 2 observations.
            - generic [ref=e309]:
              - generic [ref=e310]:
                - generic [ref=e311]:
                  - heading "Learning rate" [level=2] [ref=e312]
                  - paragraph [ref=e313]: Recorded step · Linear scale · Original values
                - generic [ref=e314]: 1242 displayed
              - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Highlight kazakh-sft-001 0E0 – 1.83323E-5 Highlight kazakh-sft-002 0E0 – 1.83323E-5 Highlight kazakh-sft-006 0E0 – 1.83323E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e315]':
                - generic [ref=e325]:
                  - generic [ref=e326]:
                    - generic [ref=e327]:
                      - button "Highlight kazakh-sft-005" [ref=e328] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e330]: 0E0 – 1.83333E-5
                    - generic [ref=e331]:
                      - button "Highlight kazakh-sft-001" [ref=e332] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e334]: 0E0 – 1.83323E-5
                    - generic [ref=e335]:
                      - button "Highlight kazakh-sft-002" [ref=e336] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e338]: 0E0 – 1.83323E-5
                    - generic [ref=e339]:
                      - button "Highlight kazakh-sft-006" [ref=e340] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e342]: 0E0 – 1.83323E-5
                  - paragraph [ref=e343]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
            - generic [ref=e344]:
              - generic [ref=e345]:
                - generic [ref=e346]:
                  - heading "Gradient norm" [level=2] [ref=e347]
                  - paragraph [ref=e348]: Recorded step · Linear scale · Original values
                - generic [ref=e349]: 2475 displayed
              - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Highlight kazakh-sft-001 0.140004 – 0.239962 Highlight kazakh-sft-002 0.140024 – 0.239986 Highlight kazakh-sft-006 0.140005 – 0.239992 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e350]':
                - generic [ref=e360]:
                  - generic [ref=e361]:
                    - generic [ref=e362]:
                      - button "Highlight kazakh-sft-005" [ref=e363] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e365]: 0.140 – 0.240
                    - generic [ref=e366]:
                      - button "Highlight kazakh-sft-001" [ref=e367] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e369]: 0.140004 – 0.239962
                    - generic [ref=e370]:
                      - button "Highlight kazakh-sft-002" [ref=e371] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e373]: 0.140024 – 0.239986
                    - generic [ref=e374]:
                      - button "Highlight kazakh-sft-006" [ref=e375] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e377]: 0.140005 – 0.239992
                  - paragraph [ref=e378]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - group [ref=e379]:
            - generic [ref=e381]:
              - generic [ref=e382]:
                - generic [ref=e383]:
                  - heading "Loss summaries" [level=2] [ref=e384]
                  - paragraph [ref=e385]: Computed from all original observations, independent of zoom.
                - generic [ref=e386]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e387] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e389]:
                - caption [ref=e390]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e391]:
                  - row [ref=e392]:
                    - columnheader "Run" [ref=e393]
                    - columnheader "Latest" [ref=e394]
                    - columnheader "Minimum" [ref=e395]
                    - columnheader "Maximum" [ref=e396]
                    - columnheader "Observations" [ref=e397]
                    - columnheader "Metric quality" [ref=e398]
                - rowgroup [ref=e399]:
                  - row [ref=e400]:
                    - rowheader "kazakh-sft-005" [ref=e401]:
                      - link "kazakh-sft-005" [ref=e402] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e403]:
                      - strong [ref=e404]: "0.201573"
                      - generic [ref=e405]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e406]:
                      - strong [ref=e407]: "0.200327"
                      - generic [ref=e408]: step 989,070
                    - cell "100.000 step 500,001" [ref=e409]:
                      - strong [ref=e410]: "100.000"
                      - generic [ref=e411]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e412]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e413]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e414]:
                      - link "0 invalid observations" [ref=e415] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e416]: 0 conflicting groups · 0 known gaps
                  - row [ref=e417]:
                    - rowheader "kazakh-sft-001" [ref=e418]:
                      - link "kazakh-sft-001" [ref=e419] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e420]:
                      - strong [ref=e421]: "0.269841"
                      - generic [ref=e422]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e423]:
                      - strong [ref=e424]: "0.23887"
                      - generic [ref=e425]: step 8,185
                    - cell "3.431808 step 0" [ref=e426]:
                      - strong [ref=e427]: "3.431808"
                      - generic [ref=e428]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e429]:
                      - text: 8,192 raw rows
                      - generic [ref=e430]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e431]:
                      - link "0 invalid observations" [ref=e432] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e433]: 0 conflicting groups · 0 known gaps
                  - row [ref=e434]:
                    - rowheader "kazakh-sft-002" [ref=e435]:
                      - link "kazakh-sft-002" [ref=e436] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-002
                    - cell "0.484209 step 8,191" [ref=e437]:
                      - strong [ref=e438]: "0.484209"
                      - generic [ref=e439]: step 8,191
                    - cell "0.454091 step 8,129" [ref=e440]:
                      - strong [ref=e441]: "0.454091"
                      - generic [ref=e442]: step 8,129
                    - cell "3.417161 step 2" [ref=e443]:
                      - strong [ref=e444]: "3.417161"
                      - generic [ref=e445]: step 2
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e446]:
                      - text: 8,192 raw rows
                      - generic [ref=e447]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e448]:
                      - link "0 invalid observations" [ref=e449] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-002&metric=loss
                      - generic [ref=e450]: 0 conflicting groups · 0 known gaps
                  - row [ref=e451]:
                    - rowheader "kazakh-sft-006" [ref=e452]:
                      - link "kazakh-sft-006" [ref=e453] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-006
                    - 'cell "Invalid latest measurement step 8,191 Earlier finite: 0.265264 at step 8,190 source index 8190" [ref=e454]':
                      - strong [ref=e455]: Invalid latest measurement
                      - generic [ref=e456]: step 8,191
                      - paragraph [ref=e457]:
                        - text: "Earlier finite: 0.265264 at step 8,190"
                        - generic [ref=e458]: source index 8190
                    - cell "0.238795 step 8,157" [ref=e459]:
                      - strong [ref=e460]: "0.238795"
                      - generic [ref=e461]: step 8,157
                    - cell "3.416736 step 0" [ref=e462]:
                      - strong [ref=e463]: "3.416736"
                      - generic [ref=e464]: step 0
                    - cell "8,192 raw rows 8,190 finite Loss observations" [ref=e465]:
                      - text: 8,192 raw rows
                      - generic [ref=e466]: 8,190 finite Loss observations
                    - cell "2 invalid observations 0 conflicting groups · 0 known gaps" [ref=e467]:
                      - link "2 invalid observations" [ref=e468] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-006&metric=loss
                      - generic [ref=e469]: 0 conflicting groups · 0 known gaps
```

# Test source

```ts
  1  | import {expect,test} from '@playwright/test'
  2  | 
  3  | test('long cursor sessions bound application timing entries without losing current original values',async({page})=>{
  4  |  await page.goto('/runs/kazakh-sft-005')
  5  |  await page.waitForFunction(()=>window.__soupEvidence?.hoverCacheTargets&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  const over=page.getByTestId('loss-chart').locator('.u-over');await over.scrollIntoViewIfNeeded()
  7  |  const result=await over.evaluate(element=>{
  8  |   const rect=element.getBoundingClientRect()
  9  |   for(let i=0;i<400;i++)element.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'mouse',clientX:rect.left+rect.width*(i%2?.55:.45),clientY:rect.top+rect.height/2}))
  10 |   return Object.fromEntries(['soup:hover-start','soup:hover-ready','soup:hover','soup:hover-dom-commit','soup:hover-draw'].map(name=>[name,performance.getEntriesByName(name).length]))
  11 |  })
  12 |  expect(Object.values(result).every(count=>count>0)).toBe(true)
  13 |  for(const [name,count]of Object.entries(result))expect(count,`${name} must retain at most128 recent entries`).toBeLessThanOrEqual(128)
  14 |  await expect(page.getByTestId('cursor-readout-loss').locator('[data-source-metric="loss"]').first()).not.toBeEmpty()
  15 |  expect(await page.evaluate(()=>window.__soupEvidence?.members)).toEqual(['kazakh-sft-005'])
  16 | })
  17 | 
  18 | test('unmounted plots release owned Canvas bitmaps even while an external reference retains their nodes',async({page})=>{
  19 |  await page.goto('/runs/kazakh-sft-005')
  20 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  21 |  await page.evaluate(()=>{(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases=[...document.querySelectorAll<HTMLCanvasElement>('.plot-stack canvas')]})
  22 |  try{
  23 |   await page.getByRole('button',{name:'Source',exact:true}).click()
  24 |   const retired=await page.evaluate(()=>(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases!.map(canvas=>({connected:canvas.isConnected,width:canvas.width,height:canvas.height})))
  25 |   expect(retired).toHaveLength(6)
  26 |   expect(retired.every(canvas=>!canvas.connected)).toBe(true)
  27 |   expect(retired.every(canvas=>canvas.width===0&&canvas.height===0),'removed canvases must release bitmap dimensions without waiting for GC').toBe(true)
  28 |  }finally{await page.evaluate(()=>delete(window as Window&{retiredCanvases?:HTMLCanvasElement[]}).retiredCanvases)}
  29 |  await page.getByRole('button',{name:'Metrics',exact:true}).click()
  30 |  await expect(page.getByTestId('loss-chart').locator('.uplot')).toHaveCount(1)
  31 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  32 | })
  33 | 
  34 | test('leaving during a chart drag removes the native document mouseup listener',async({page})=>{
  35 |  const cdp=await page.context().newCDPSession(page)
  36 |  const mouseups=async()=>{
  37 |   const {result}=await cdp.send('Runtime.evaluate',{expression:'document',objectGroup:'listener-audit'})
  38 |   const {listeners}=await cdp.send('DOMDebugger.getEventListeners',{objectId:result.objectId!})
  39 |   const count=listeners.filter(listener=>listener.type==='mouseup').length
  40 |   for(const listener of listeners)for(const ref of [listener.handler,listener.originalHandler])if(ref?.objectId)await cdp.send('Runtime.releaseObject',{objectId:ref.objectId})
  41 |   await cdp.send('Runtime.releaseObjectGroup',{objectGroup:'listener-audit'})
  42 |   return count
  43 |  }
  44 |  await page.goto('/runs/kazakh-sft-005')
  45 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  46 |  const before=await mouseups(),over=page.getByTestId('loss-chart').locator('.u-over')
  47 |  await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
  48 |  await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5);await page.mouse.down()
  49 |  expect(await mouseups()).toBeGreaterThan(before)
  50 |  try{
  51 |   await page.evaluate(()=>{history.pushState(null,'','/interrupted-drag-baseline');dispatchEvent(new PopStateEvent('popstate'))})
  52 |   await expect(page.locator('h1')).toHaveText('Not found')
  53 |   expect(await mouseups(),'retired uPlot must not remain rooted through document mouseup').toBe(before)
  54 |  }finally{await page.mouse.up();await cdp.detach()}
  55 | })
  56 | 
  57 | test('small decorative UI artwork does not decode a full-size source bitmap',async({page})=>{
  58 |  await page.goto('/runs/kazakh-sft-001')
  59 |  await page.getByRole('button',{name:'Run information',exact:true}).click()
  60 |  const image=page.locator('.recipe-heading [data-soup-art] img')
  61 |  await expect(image).toBeVisible()
  62 |  const src=await image.evaluate(node=>(node as HTMLImageElement).currentSrc||(node as HTMLImageElement).src)
  63 |  const response=await page.request.get(src),bytes=await response.body()
  64 |  expect(bytes.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a')
  65 |  expect(bytes.readUInt32BE(16),'DPR1 artwork is at most128 CSS pixels; avoid1254px decode surfaces').toBeLessThanOrEqual(128)
  66 |  expect(bytes.readUInt32BE(20)).toBeLessThanOrEqual(128)
  67 | })
  68 | 
  69 | test('activating source observations does not change inherited font or paint containment geometry',async({page})=>{
  70 |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  71 |  await page.waitForFunction(()=>window.__soupEvidence?.hoverCacheTargets&&window.__soupEvidence.members.length===4&&document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  72 |  const content=page.getByTestId('comparison-cursor-readout').locator(':scope > div')
  73 |  const appearance=()=>content.evaluate(element=>{const css=getComputedStyle(element);return{numeric:css.fontVariantNumeric,radius:css.borderRadius,padding:css.padding,margin:css.margin,fontSize:css.fontSize}})
  74 |  const before=await appearance(),over=page.getByTestId('comparison-loss').locator('.u-over')
  75 |  await over.scrollIntoViewIfNeeded();const rect=await over.boundingBox();expect(rect).not.toBeNull()
  76 |  await page.mouse.move(rect!.x+rect!.width*.45,rect!.y+rect!.height*.5)
  77 |  await expect(content).toHaveAttribute('data-hover-seq',/\d+/)
> 78 |  expect(await appearance(),'source-state marker must not change inherited numeric font or paint clip').toEqual(before)
     |                                                                                                        ^ Error: source-state marker must not change inherited numeric font or paint clip
  79 | })
  80 | 
```