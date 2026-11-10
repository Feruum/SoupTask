# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-scheduling.spec.ts >> hover updates source readouts without recommitting the surrounding page: soup:compare-page-commit
- Location: e2e\hover-scheduling.spec.ts:7:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 6
Received: 9
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
              - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Highlight kazakh-sft-001 0.23887 – 3.431808 Highlight kazakh-sft-002 0.454091 – 3.417161 Highlight kazakh-sft-006 0.238795 – 3.416736 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero. Inspect data quality . Loss source readout" [ref=e218]':
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
                  - region "Loss source readout" [ref=e259]:
                    - generic [ref=e260]:
                      - paragraph [ref=e261]: Cursor step 499,999.5
                      - generic [ref=e262]:
                        - generic [ref=e263]:
                          - strong [ref=e266]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e267]:
                            - generic [ref=e268]:
                              - generic "Exact source value 0.22748138270315854" [ref=e269]:
                                - generic [ref=e270]: step 499,999
                                - generic [ref=e271]: Loss 0.227481
                                - generic [ref=e272]: Δstep 0.5
                              - button "Pin row 499999" [ref=e273] [cursor=pointer]
                        - generic [ref=e274]:
                          - strong [ref=e277]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e278]:
                            - paragraph [ref=e279]: No recorded value at this cursor location.
                        - generic [ref=e280]:
                          - strong [ref=e283]: kazakh-sft-002
                          - region "Original observations for kazakh-sft-002" [ref=e284]:
                            - paragraph [ref=e285]: No recorded value at this cursor location.
                        - generic [ref=e286]:
                          - strong [ref=e289]: kazakh-sft-006
                          - region "Original observations for kazakh-sft-006" [ref=e290]:
                            - paragraph [ref=e291]: No recorded value at this cursor location.
            - generic [ref=e292]:
              - generic [ref=e293]:
                - generic [ref=e294]:
                  - heading "Learning rate" [level=2] [ref=e295]
                  - paragraph [ref=e296]: Recorded step · Linear scale · Original values
                - generic [ref=e297]: 1242 displayed
              - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Highlight kazakh-sft-001 0E0 – 1.83323E-5 Highlight kazakh-sft-002 0E0 – 1.83323E-5 Highlight kazakh-sft-006 0E0 – 1.83323E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout" [ref=e298]':
                - generic [ref=e308]:
                  - generic [ref=e309]:
                    - generic [ref=e310]:
                      - button "Highlight kazakh-sft-005" [ref=e311] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e313]: 0E0 – 1.83333E-5
                    - generic [ref=e314]:
                      - button "Highlight kazakh-sft-001" [ref=e315] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e317]: 0E0 – 1.83323E-5
                    - generic [ref=e318]:
                      - button "Highlight kazakh-sft-002" [ref=e319] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e321]: 0E0 – 1.83323E-5
                    - generic [ref=e322]:
                      - button "Highlight kazakh-sft-006" [ref=e323] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e325]: 0E0 – 1.83323E-5
                  - paragraph [ref=e326]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - region "Learning rate source readout" [ref=e327]:
                    - generic [ref=e328]:
                      - paragraph [ref=e329]: Cursor step 499,999.5
                      - generic [ref=e330]:
                        - generic [ref=e331]:
                          - strong [ref=e334]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e335]:
                            - generic [ref=e336]:
                              - generic "Exact source value 0.000010000010000010002" [ref=e337]:
                                - generic [ref=e338]: step 499,999
                                - generic [ref=e339]: Learning rate 1E-5
                                - generic [ref=e340]: Δstep 0.5
                              - button "Pin row 499999" [ref=e341] [cursor=pointer]
                        - generic [ref=e342]:
                          - strong [ref=e345]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e346]:
                            - paragraph [ref=e347]: No recorded value at this cursor location.
                        - generic [ref=e348]:
                          - strong [ref=e351]: kazakh-sft-002
                          - region "Original observations for kazakh-sft-002" [ref=e352]:
                            - paragraph [ref=e353]: No recorded value at this cursor location.
                        - generic [ref=e354]:
                          - strong [ref=e357]: kazakh-sft-006
                          - region "Original observations for kazakh-sft-006" [ref=e358]:
                            - paragraph [ref=e359]: No recorded value at this cursor location.
            - generic [ref=e360]:
              - generic [ref=e361]:
                - generic [ref=e362]:
                  - heading "Gradient norm" [level=2] [ref=e363]
                  - paragraph [ref=e364]: Recorded step · Linear scale · Original values
                - generic [ref=e365]: 2475 displayed
              - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Highlight kazakh-sft-001 0.140004 – 0.239962 Highlight kazakh-sft-002 0.140024 – 0.239986 Highlight kazakh-sft-006 0.140005 – 0.239992 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout" [ref=e366]':
                - generic [ref=e376]:
                  - generic [ref=e377]:
                    - generic [ref=e378]:
                      - button "Highlight kazakh-sft-005" [ref=e379] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e381]: 0.140 – 0.240
                    - generic [ref=e382]:
                      - button "Highlight kazakh-sft-001" [ref=e383] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e385]: 0.140004 – 0.239962
                    - generic [ref=e386]:
                      - button "Highlight kazakh-sft-002" [ref=e387] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e389]: 0.140024 – 0.239986
                    - generic [ref=e390]:
                      - button "Highlight kazakh-sft-006" [ref=e391] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e393]: 0.140005 – 0.239992
                  - paragraph [ref=e394]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - region "Gradient norm source readout" [ref=e395]:
                    - generic [ref=e396]:
                      - paragraph [ref=e397]: Cursor step 499,999.5
                      - generic [ref=e398]:
                        - generic [ref=e399]:
                          - strong [ref=e402]: kazakh-sft-005
                          - region "Original observations for kazakh-sft-005" [ref=e403]:
                            - generic [ref=e404]:
                              - generic "Exact source value 0.21716141713317486" [ref=e405]:
                                - generic [ref=e406]: step 499,999
                                - generic [ref=e407]: Gradient norm 0.217161
                                - generic [ref=e408]: Δstep 0.5
                              - button "Pin row 499999" [ref=e409] [cursor=pointer]
                        - generic [ref=e410]:
                          - strong [ref=e413]: kazakh-sft-001
                          - region "Original observations for kazakh-sft-001" [ref=e414]:
                            - paragraph [ref=e415]: No recorded value at this cursor location.
                        - generic [ref=e416]:
                          - strong [ref=e419]: kazakh-sft-002
                          - region "Original observations for kazakh-sft-002" [ref=e420]:
                            - paragraph [ref=e421]: No recorded value at this cursor location.
                        - generic [ref=e422]:
                          - strong [ref=e425]: kazakh-sft-006
                          - region "Original observations for kazakh-sft-006" [ref=e426]:
                            - paragraph [ref=e427]: No recorded value at this cursor location.
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
          - generic [ref=e519]:
            - generic [ref=e520]:
              - heading "Cursor source values" [level=2] [ref=e521]
              - paragraph [ref=e522]: Nearest recorded step shown separately for each run.
            - generic [ref=e523]:
              - strong [ref=e524]: kazakh-sft-005
              - generic [ref=e525]: step 499,999 · loss 0.227481 · source 499999
            - generic [ref=e526]:
              - strong [ref=e527]: kazakh-sft-001
              - generic [ref=e528]: No recorded value at this cursor location.
            - generic [ref=e529]:
              - strong [ref=e530]: kazakh-sft-002
              - generic [ref=e531]: No recorded value at this cursor location.
            - generic [ref=e532]:
              - strong [ref=e533]: kazakh-sft-006
              - generic [ref=e534]: No recorded value at this cursor location.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | for (const [route, mark] of [
  4  |   ['/runs/kazakh-sft-005', 'soup:run-page-commit'],
  5  |   ['/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006', 'soup:compare-page-commit']
  6  | ] as const) {
  7  |   test(`hover updates source readouts without recommitting the surrounding page: ${mark}`, async ({ page }) => {
  8  |     await page.goto(route)
  9  |     await expect(page.locator('.plot-host').first()).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  10 |     await page.evaluate(() => document.fonts.ready)
  11 |     const surface = page.locator('.u-over').first()
  12 |     await surface.scrollIntoViewIfNeeded()
  13 |     await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  14 |     const box = await surface.boundingBox()
  15 |     if (!box) throw Error('Missing actual chart input surface')
  16 |     const before = await page.evaluate(name => performance.getEntriesByName(name).length, mark)
  17 |     for (const fraction of [.3, .4, .5]) {
  18 |       const sequence = await page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)
  19 |       await page.mouse.move(box.x + box.width * fraction, box.y + box.height * .5)
  20 |       await expect.poll(() => page.evaluate(() => (performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark | undefined)?.detail?.hoverSeq ?? 0)).toBeGreaterThan(sequence)
  21 |       await expect(page.locator('.chart-hover-value').first()).toContainText('kazakh-sft-005')
  22 |     }
> 23 |     expect(await page.evaluate(name => performance.getEntriesByName(name).length, mark)).toBe(before)
     |                                                                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  24 |   })
  25 | }
  26 | 
```