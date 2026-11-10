# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shared-readout.spec.ts >> Compare has one shared original-row table with every metric and exact Pin provenance
- Location: e2e\shared-readout.spec.ts:3:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('region', { name: 'Compared source values', exact: true })
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('region', { name: 'Compared source values', exact: true }) with timeout 5000ms
  - waiting for getByRole('region', { name: 'Compared source values', exact: true })
    14 × locator resolved to 0 elements
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
                  - spinbutton "From step" [ref=e189]: "100"
                - generic [ref=e190]:
                  - generic [ref=e191]: To step
                  - spinbutton "To step" [ref=e192]: "200"
                - button "Apply range" [active] [ref=e193] [cursor=pointer]
              - generic [ref=e197]:
                - button "Zoom in" [ref=e198] [cursor=pointer]
                - button "Zoom out" [ref=e202] [cursor=pointer]
                - button "Reset view" [ref=e206] [cursor=pointer]
              - paragraph [ref=e210]: Step 100 to 200
          - generic [ref=e211]:
            - generic [ref=e212]:
              - generic [ref=e213]:
                - generic [ref=e214]:
                  - heading "Loss" [level=2] [ref=e215]
                  - paragraph [ref=e216]: Recorded step · Linear scale · Original values
                - generic [ref=e217]: 404 displayed
              - 'figure "Highlight kazakh-sft-005 1.27935 – 1.832639 Highlight kazakh-sft-001 1.272431 – 1.835924 Highlight kazakh-sft-002 2.702589 – 3.035917 Highlight kazakh-sft-006 1.278277 – 1.818539 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero. Inspect data quality . Loss source readout" [ref=e218]':
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - generic [ref=e230]:
                      - button "Highlight kazakh-sft-005" [ref=e231] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e233]: 1.27935 – 1.832639
                    - generic [ref=e234]:
                      - button "Highlight kazakh-sft-001" [ref=e235] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e237]: 1.272431 – 1.835924
                    - generic [ref=e238]:
                      - button "Highlight kazakh-sft-002" [ref=e239] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e241]: 2.702589 – 3.035917
                    - generic [ref=e242]:
                      - button "Highlight kazakh-sft-006" [ref=e243] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e245]: 1.278277 – 1.818539
                  - paragraph [ref=e246]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - paragraph [ref=e248]:
                    - text: kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero.
                    - link "Inspect data quality" [ref=e249] [cursor=pointer]:
                      - /url: /data-quality?run=kazakh-sft-006&metric=loss
                    - text: .
                  - region "Loss source readout" [ref=e250]:
                    - generic [ref=e251]:
                      - paragraph [ref=e252]: Cursor step 119.607843
                      - generic [ref=e253]:
                        - generic [ref=e254]:
                          - strong [ref=e257]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e258]:
                            - generic [ref=e259]:
                              - generic "Exact source value 1.671547597092153" [ref=e260]: step 120 · Loss 1.671548 · Δstep 0.392157
                              - button "Pin row 120" [ref=e261] [cursor=pointer]: Pin row
                        - generic [ref=e262]:
                          - strong [ref=e265]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e266]:
                            - generic [ref=e267]:
                              - generic "Exact source value 1.6597967241839928" [ref=e268]: step 120 · Loss 1.659797 · Δstep 0.392157
                              - button "Pin row 120" [ref=e269] [cursor=pointer]: Pin row
                        - generic [ref=e270]:
                          - strong [ref=e273]: kazakh-sft-002
                          - region "Original observations for kazakh-sft-002" [ref=e274]:
                            - generic [ref=e275]:
                              - generic "Exact source value 2.9704027041125047" [ref=e276]: step 120 · Loss 2.970403 · Δstep 0.392157
                              - button "Pin row 120" [ref=e277] [cursor=pointer]: Pin row
                        - generic [ref=e278]:
                          - strong [ref=e281]: kazakh-sft-006
                          - region "Original observations for kazakh-sft-006" [ref=e282]:
                            - generic [ref=e283]:
                              - generic "Exact source value 1.6871720935726031" [ref=e284]: step 120 · Loss 1.687172 · Δstep 0.392157
                              - button "Pin row 120" [ref=e285] [cursor=pointer]: Pin row
            - generic [ref=e286]:
              - generic [ref=e287]:
                - generic [ref=e288]:
                  - heading "Learning rate" [level=2] [ref=e289]
                  - paragraph [ref=e290]: Recorded step · Linear scale · Original values
                - generic [ref=e291]: 404 displayed
              - 'figure "Highlight kazakh-sft-005 2.39976E-8 – 4.79904E-8 Highlight kazakh-sft-001 2.89427E-6 – 5.717E-6 Highlight kazakh-sft-002 2.89427E-6 – 5.717E-6 Highlight kazakh-sft-006 2.89427E-6 – 5.717E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout" [ref=e292]':
                - generic [ref=e302]:
                  - generic [ref=e303]:
                    - generic [ref=e304]:
                      - button "Highlight kazakh-sft-005" [ref=e305] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e307]: 2.39976E-8 – 4.79904E-8
                    - generic [ref=e308]:
                      - button "Highlight kazakh-sft-001" [ref=e309] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e311]: 2.89427E-6 – 5.717E-6
                    - generic [ref=e312]:
                      - button "Highlight kazakh-sft-002" [ref=e313] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e315]: 2.89427E-6 – 5.717E-6
                    - generic [ref=e316]:
                      - button "Highlight kazakh-sft-006" [ref=e317] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e319]: 2.89427E-6 – 5.717E-6
                  - paragraph [ref=e320]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - region "Learning rate source readout" [ref=e321]:
                    - generic [ref=e322]:
                      - paragraph [ref=e323]: Cursor step 119.607843
                      - generic [ref=e324]:
                        - generic [ref=e325]:
                          - strong [ref=e328]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e329]:
                            - generic [ref=e330]:
                              - generic "Exact source value 2.879657279311679e-8" [ref=e331]: step 120 · Learning rate 2.87966E-8 · Δstep 0.392157
                              - button "Pin row 120" [ref=e332] [cursor=pointer]: Pin row
                        - generic [ref=e333]:
                          - strong [ref=e336]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e337]:
                            - generic [ref=e338]:
                              - generic "Exact source value 0.000003464543217592446" [ref=e339]: step 120 · Learning rate 3.46454E-6 · Δstep 0.392157
                              - button "Pin row 120" [ref=e340] [cursor=pointer]: Pin row
                        - generic [ref=e341]:
                          - strong [ref=e344]: kazakh-sft-002
                          - region "Original observations for kazakh-sft-002" [ref=e345]:
                            - generic [ref=e346]:
                              - generic "Exact source value 0.000003464543217592446" [ref=e347]: step 120 · Learning rate 3.46454E-6 · Δstep 0.392157
                              - button "Pin row 120" [ref=e348] [cursor=pointer]: Pin row
                        - generic [ref=e349]:
                          - strong [ref=e352]: kazakh-sft-006
                          - region "Original observations for kazakh-sft-006" [ref=e353]:
                            - generic [ref=e354]:
                              - generic "Exact source value 0.000003464543217592446" [ref=e355]: step 120 · Learning rate 3.46454E-6 · Δstep 0.392157
                              - button "Pin row 120" [ref=e356] [cursor=pointer]: Pin row
            - generic [ref=e357]:
              - generic [ref=e358]:
                - generic [ref=e359]:
                  - heading "Gradient norm" [level=2] [ref=e360]
                  - paragraph [ref=e361]: Recorded step · Linear scale · Original values
                - generic [ref=e362]: 404 displayed
              - 'figure "Highlight kazakh-sft-005 0.140376 – 0.237665 Highlight kazakh-sft-001 0.141555 – 0.239218 Highlight kazakh-sft-002 0.140848 – 0.239016 Highlight kazakh-sft-006 0.140791 – 0.237989 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout" [ref=e363]':
                - generic [ref=e373]:
                  - generic [ref=e374]:
                    - generic [ref=e375]:
                      - button "Highlight kazakh-sft-005" [ref=e376] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e378]: 0.140376 – 0.237665
                    - generic [ref=e379]:
                      - button "Highlight kazakh-sft-001" [ref=e380] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e382]: 0.141555 – 0.239218
                    - generic [ref=e383]:
                      - button "Highlight kazakh-sft-002" [ref=e384] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e386]: 0.140848 – 0.239016
                    - generic [ref=e387]:
                      - button "Highlight kazakh-sft-006" [ref=e388] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e390]: 0.140791 – 0.237989
                  - paragraph [ref=e391]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - region "Gradient norm source readout" [ref=e392]:
                    - generic [ref=e393]:
                      - paragraph [ref=e394]: Cursor step 119.607843
                      - generic [ref=e395]:
                        - generic [ref=e396]:
                          - strong [ref=e399]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e400]:
                            - generic [ref=e401]:
                              - generic "Exact source value 0.1731921775825322" [ref=e402]: step 120 · Gradient norm 0.173192 · Δstep 0.392157
                              - button "Pin row 120" [ref=e403] [cursor=pointer]: Pin row
                        - generic [ref=e404]:
                          - strong [ref=e407]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e408]:
                            - generic [ref=e409]:
                              - generic "Exact source value 0.1808971794182435" [ref=e410]: step 120 · Gradient norm 0.180897 · Δstep 0.392157
                              - button "Pin row 120" [ref=e411] [cursor=pointer]: Pin row
                        - generic [ref=e412]:
                          - strong [ref=e415]: kazakh-sft-002
                          - region "Original observations for kazakh-sft-002" [ref=e416]:
                            - generic [ref=e417]:
                              - generic "Exact source value 0.16640596933197233" [ref=e418]: step 120 · Gradient norm 0.166406 · Δstep 0.392157
                              - button "Pin row 120" [ref=e419] [cursor=pointer]: Pin row
                        - generic [ref=e420]:
                          - strong [ref=e423]: kazakh-sft-006
                          - region "Original observations for kazakh-sft-006" [ref=e424]:
                            - generic [ref=e425]:
                              - generic "Exact source value 0.1420793040050194" [ref=e426]: step 120 · Gradient norm 0.142079 · Δstep 0.392157
                              - button "Pin row 120" [ref=e427] [cursor=pointer]: Pin row
          - group [ref=e428]:
            - generic [ref=e430]:
              - generic [ref=e431]:
                - generic [ref=e432]:
                  - heading "Loss summaries" [level=2] [ref=e433]
                  - paragraph [ref=e434]: Computed from all original observations, independent of zoom.
                - generic [ref=e435]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e436] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e438]:
                - caption [ref=e439]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e440]:
                  - row [ref=e441]:
                    - columnheader "Run" [ref=e442]
                    - columnheader "Latest" [ref=e443]
                    - columnheader "Minimum" [ref=e444]
                    - columnheader "Maximum" [ref=e445]
                    - columnheader "Observations" [ref=e446]
                    - columnheader "Metric quality" [ref=e447]
                - rowgroup [ref=e448]:
                  - row [ref=e449]:
                    - rowheader "kazakh-sft-005" [ref=e450]:
                      - link "kazakh-sft-005" [ref=e451] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e452]:
                      - strong [ref=e453]: "0.201573"
                      - generic [ref=e454]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e455]:
                      - strong [ref=e456]: "0.200327"
                      - generic [ref=e457]: step 989,070
                    - cell "100.000 step 500,001" [ref=e458]:
                      - strong [ref=e459]: "100.000"
                      - generic [ref=e460]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e461]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e462]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e463]:
                      - link "0 invalid observations" [ref=e464] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e465]: 0 conflicting groups · 0 known gaps
                  - row [ref=e466]:
                    - rowheader "kazakh-sft-001" [ref=e467]:
                      - link "kazakh-sft-001" [ref=e468] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e469]:
                      - strong [ref=e470]: "0.269841"
                      - generic [ref=e471]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e472]:
                      - strong [ref=e473]: "0.23887"
                      - generic [ref=e474]: step 8,185
                    - cell "3.431808 step 0" [ref=e475]:
                      - strong [ref=e476]: "3.431808"
                      - generic [ref=e477]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e478]:
                      - text: 8,192 raw rows
                      - generic [ref=e479]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e480]:
                      - link "0 invalid observations" [ref=e481] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e482]: 0 conflicting groups · 0 known gaps
                  - row [ref=e483]:
                    - rowheader "kazakh-sft-002" [ref=e484]:
                      - link "kazakh-sft-002" [ref=e485] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-002
                    - cell "0.484209 step 8,191" [ref=e486]:
                      - strong [ref=e487]: "0.484209"
                      - generic [ref=e488]: step 8,191
                    - cell "0.454091 step 8,129" [ref=e489]:
                      - strong [ref=e490]: "0.454091"
                      - generic [ref=e491]: step 8,129
                    - cell "3.417161 step 2" [ref=e492]:
                      - strong [ref=e493]: "3.417161"
                      - generic [ref=e494]: step 2
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e495]:
                      - text: 8,192 raw rows
                      - generic [ref=e496]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e497]:
                      - link "0 invalid observations" [ref=e498] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-002&metric=loss
                      - generic [ref=e499]: 0 conflicting groups · 0 known gaps
                  - row [ref=e500]:
                    - rowheader "kazakh-sft-006" [ref=e501]:
                      - link "kazakh-sft-006" [ref=e502] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-006
                    - 'cell "Invalid latest measurement step 8,191 Earlier finite: 0.265264 at step 8,190 source index 8190" [ref=e503]':
                      - strong [ref=e504]: Invalid latest measurement
                      - generic [ref=e505]: step 8,191
                      - paragraph [ref=e506]:
                        - text: "Earlier finite: 0.265264 at step 8,190"
                        - generic [ref=e507]: source index 8190
                    - cell "0.238795 step 8,157" [ref=e508]:
                      - strong [ref=e509]: "0.238795"
                      - generic [ref=e510]: step 8,157
                    - cell "3.416736 step 0" [ref=e511]:
                      - strong [ref=e512]: "3.416736"
                      - generic [ref=e513]: step 0
                    - cell "8,192 raw rows 8,190 finite Loss observations" [ref=e514]:
                      - text: 8,192 raw rows
                      - generic [ref=e515]: 8,190 finite Loss observations
                    - cell "2 invalid observations 0 conflicting groups · 0 known gaps" [ref=e516]:
                      - link "2 invalid observations" [ref=e517] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-006&metric=loss
                      - generic [ref=e518]: 0 conflicting groups · 0 known gaps
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('Compare has one shared original-row table with every metric and exact Pin provenance',async({page})=>{
  4  |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200')
  7  |  await page.getByRole('button',{name:'Apply range',exact:true}).click()
  8  |  await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-range-min','100')
  9  |  const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded();await surface.hover({position:{x:120,y:100}})
  10 |  const region=page.getByRole('region',{name:'Compared source values',exact:true})
> 11 |  await expect(region).toHaveCount(1)
     |                       ^ Error: expect(locator).toHaveCount(expected) failed
  12 |  await expect(page.locator('.chart-hover-value')).toHaveCount(1)
  13 |  const table=region.getByRole('table',{name:'Original observations at cursor step',exact:true})
  14 |  for(const name of ['Run','Recorded step','Loss','Learning rate','Gradient norm','Δstep','Source'])await expect(table.getByRole('columnheader',{name,exact:true})).toBeVisible()
  15 |  const row=table.getByRole('row').filter({has:table.getByRole('button',{name:/Pin row/})}).filter({hasText:'kazakh-sft-005'}).first()
  16 |  await expect(row).toBeVisible()
  17 |  const loss=(await row.locator('[data-source-metric="loss"]').getAttribute('title'))!.replace('Exact source value ','')
  18 |  const lr=(await row.locator('[data-source-metric="lr"]').getAttribute('title'))!.replace('Exact source value ','')
  19 |  const grad=(await row.locator('[data-source-metric="grad_norm"]').getAttribute('title'))!.replace('Exact source value ','')
  20 |  await row.getByRole('button',{name:/Pin row/}).click()
  21 |  await expect(page.getByTestId('pinned-loss')).toHaveText(loss)
  22 |  await expect(page.getByTestId('pinned-lr')).toHaveText(lr)
  23 |  await expect(page.getByTestId('pinned-grad_norm')).toHaveText(grad)
  24 | })
  25 | 
```