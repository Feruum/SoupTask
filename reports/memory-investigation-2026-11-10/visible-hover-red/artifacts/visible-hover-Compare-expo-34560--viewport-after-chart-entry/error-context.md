# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visible-hover.spec.ts >> Compare exposes actual step and all metric cells inside the viewport after chart entry
- Location: e2e\visible-hover.spec.ts:3:38

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 16
Received length: 7
Received array:  [{"clip": {"bottom": 900, "left": 558, "right": 1355, "top": 1180.28125}, "rect": {"bottom": 1261.78125, "height": 15, "left": 679.84375, "right": 728.78125, "top": 1246.78125, "width": 48.9375, "x": 679.84375, "y": 1246.78125}, "text": "449,481", "visible": false}, {"clip": {"bottom": 900, "left": 558, "right": 1355, "top": 1180.28125}, "rect": {"bottom": 1261.78125, "height": 15, "left": 793.6875, "right": 850.265625, "top": 1246.78125, "width": 56.578125, "x": 793.6875, "y": 1246.78125}, "text": "0.218853", "visible": false}, {"clip": {"bottom": 900, "left": 558, "right": 1355, "top": 1180.28125}, "rect": {"bottom": 1261.78125, "height": 15, "left": 907.53125, "right": 978.828125, "top": 1246.78125, "width": 71.296875, "x": 907.53125, "y": 1246.78125}, "text": "1.10104E-5", "visible": false}, {"clip": {"bottom": 900, "left": 558, "right": 1355, "top": 1180.28125}, "rect": {"bottom": 1261.78125, "height": 15, "left": 1021.375, "right": 1077.953125, "top": 1246.78125, "width": 56.578125, "x": 1021.375, "y": 1246.78125}, "text": "0.192387", "visible": false}, {"clip": {"bottom": 900, "left": 558, "right": 1355, "top": 1180.28125}, "rect": {"bottom": 1322.28125, "height": 15, "left": 679.84375, "right": 906.9375, "top": 1307.28125, "width": 227.09375, "x": 679.84375, "y": 1307.28125}, "text": "No recorded value at this cursor location.", "visible": false}, {"clip": {"bottom": 900, "left": 558, "right": 1355, "top": 1180.28125}, "rect": {"bottom": 1382.28125, "height": 15, "left": 679.84375, "right": 906.9375, "top": 1367.28125, "width": 227.09375, "x": 679.84375, "y": 1367.28125}, "text": "No recorded value at this cursor location.", "visible": false}, {"clip": {"bottom": 900, "left": 558, "right": 1355, "top": 1180.28125}, "rect": {"bottom": 1442.28125, "height": 15, "left": 679.84375, "right": 906.9375, "top": 1427.28125, "width": 227.09375, "x": 679.84375, "y": 1427.28125}, "text": "No recorded value at this cursor location.", "visible": false}]
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
                - generic [ref=e217]: 3136 displayed
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
                      - paragraph [ref=e261]: Cursor step 449,481.415803 · All metrics
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
                              - cell "449,481" [ref=e280]
                              - cell "0.218853" [ref=e281]
                              - cell "1.10104E-5" [ref=e282]
                              - cell "0.192387" [ref=e283]
                              - cell "0.415803" [ref=e284]
                              - cell [ref=e285]:
                                - button "Pin row 449481" [ref=e286] [cursor=pointer]: "Pin #449481"
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
                - generic [ref=e314]: 642 displayed
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
                - generic [ref=e349]: 1276 displayed
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
  3  | for(const comparison of [false,true])test(`${comparison?'Compare':'Run'} exposes actual step and all metric cells inside the viewport after chart entry`,async({page},info)=>{
  4  |  await page.setViewportSize({width:1440,height:900})
  5  |  await page.goto(comparison?'/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006':'/runs/kazakh-sft-005')
  6  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  7  |  const plot=page.getByTestId(comparison?'comparison-loss':'loss-chart').locator('.u-over')
  8  |  await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  9  |  await page.mouse.move(box!.x+box!.width*.45,box!.y+box!.height*.5)
  10 |  const readout=page.getByTestId(comparison?'comparison-cursor-readout':'cursor-readout-loss')
  11 |  await expect(readout.locator('.chart-hover-value')).toHaveAttribute('data-hover-seq',/\d+/)
  12 |  const cells=await readout.locator('tbody').evaluateAll(bodies=>bodies.flatMap(body=>{
  13 |   const row=body.querySelector('tr:not([hidden])')!
  14 |   return [...row.querySelectorAll('td')].slice(0,4).map(cell=>{
  15 |    const range=document.createRange();range.selectNodeContents(cell);const rect=range.getBoundingClientRect()
  16 |    let left=0,top=0,right=innerWidth,bottom=innerHeight
  17 |    for(let parent:Element|null=cell.parentElement;parent;parent=parent.parentElement){
  18 |     const css=getComputedStyle(parent),bounds=parent.getBoundingClientRect()
  19 |     if(/auto|scroll|hidden|clip/.test(css.overflowX)||/paint|strict|content/.test(css.contain)){left=Math.max(left,bounds.left+parent.clientLeft);right=Math.min(right,bounds.left+parent.clientLeft+parent.clientWidth)}
  20 |     if(/auto|scroll|hidden|clip/.test(css.overflowY)||/paint|strict|content/.test(css.contain)){top=Math.max(top,bounds.top+parent.clientTop);bottom=Math.min(bottom,bounds.top+parent.clientTop+parent.clientHeight)}
  21 |    }
  22 |    const hit=document.elementFromPoint((rect.left+rect.right)/2,(rect.top+rect.bottom)/2)
  23 |    return{text:cell.textContent,rect:rect.toJSON(),clip:{left,top,right,bottom},visible:rect.width>0&&rect.height>0&&rect.left>=left&&rect.right<=right&&rect.top>=top&&rect.bottom<=bottom&&!!hit&&cell.contains(hit)}
  24 |   })
  25 |  }))
  26 |  await info.attach('actual-source-cell-visibility',{body:JSON.stringify(cells),contentType:'application/json'})
> 27 |  expect(cells).toHaveLength(comparison?16:4)
     |                ^ Error: expect(received).toHaveLength(expected)
  28 |  expect(cells.every(cell=>cell.visible),'Every actual-step and metric text must be on screen, unclipped and unobscured').toBe(true)
  29 |  await page.screenshot({path:info.outputPath('visible-source-values.png')})
  30 | })
  31 | 
```