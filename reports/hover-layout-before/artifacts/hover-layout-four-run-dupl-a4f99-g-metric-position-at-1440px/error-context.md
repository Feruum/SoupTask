# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-layout.spec.ts >> four-run duplicate comparison preserves the following metric position at 1440px
- Location: e2e\hover-layout.spec.ts:39:74

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 1006.28125
Received: 1862.28125

Expected precision:    0
Expected difference: < 0.5
Received difference:   856
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
              - figure [ref=e218]:
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
                  - generic [ref=e247]:
                    - text: Cursor step 99
                    - generic [ref=e248]:
                      - strong [ref=e250]: kazakh-sft-005
                      - generic "Exact source value 1.8384721750137045" [ref=e251]:
                        - text: step 99 · Loss 1.838472 · Δstep 0
                        - button "Pin row 99" [ref=e252] [cursor=pointer]
                    - generic [ref=e253]:
                      - strong [ref=e255]: kazakh-sft-009
                      - generic "Exact source value 1.8123179425694629" [ref=e256]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 99" [ref=e257] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e258]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 100" [ref=e259] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e260]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 101" [ref=e261] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e262]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 102" [ref=e263] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e264]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 103" [ref=e265] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e266]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 104" [ref=e267] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e268]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 105" [ref=e269] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e270]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 106" [ref=e271] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e272]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 107" [ref=e273] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e274]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 108" [ref=e275] [cursor=pointer]
                      - generic "Exact source value 1.8123179425694629" [ref=e276]:
                        - text: step 99 · Loss 1.812318 · Δstep 0
                        - button "Pin row 109" [ref=e277] [cursor=pointer]
                    - generic [ref=e278]:
                      - strong [ref=e280]: kazakh-sft-010
                      - generic "Exact source value 1.843662141340284" [ref=e281]:
                        - text: step 99 · Loss 1.843662 · Δstep 0
                        - button "Pin row 99" [ref=e282] [cursor=pointer]
                    - generic [ref=e283]:
                      - strong [ref=e285]: kazakh-sft-001
                      - generic "Exact source value 1.8154303981759234" [ref=e286]:
                        - text: step 99 · Loss 1.81543 · Δstep 0
                        - button "Pin row 99" [ref=e287] [cursor=pointer]
            - generic [ref=e288]:
              - generic [ref=e289]:
                - generic [ref=e290]:
                  - heading "Learning rate" [level=2] [ref=e291]
                  - paragraph [ref=e292]: Recorded step · Linear scale · Original values
                - generic [ref=e293]: 12 displayed
              - figure [ref=e294]:
                - generic [ref=e304]:
                  - generic [ref=e305]:
                    - generic [ref=e306]:
                      - button "Highlight kazakh-sft-005" [ref=e307] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e309]: 2.35177E-8 – 2.39976E-8
                    - generic [ref=e310]:
                      - button "Highlight kazakh-sft-009" [ref=e311] [cursor=pointer]: kazakh-sft-009
                      - generic [ref=e313]: 2.83709E-6 – 2.86569E-6
                    - generic [ref=e314]:
                      - button "Highlight kazakh-sft-010" [ref=e315] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e317]: 2.83709E-6 – 2.92286E-6
                    - generic [ref=e318]:
                      - button "Highlight kazakh-sft-001" [ref=e319] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e321]: 2.83709E-6 – 2.89427E-6
                  - paragraph [ref=e322]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - generic [ref=e323]:
                    - text: Cursor step 99
                    - generic [ref=e324]:
                      - strong [ref=e326]: kazakh-sft-005
                      - generic "Exact source value 2.3757671515319275e-8" [ref=e327]:
                        - text: step 99 · Learning rate 2.37577E-8 · Δstep 0
                        - button "Pin row 99" [ref=e328] [cursor=pointer]
                    - generic [ref=e329]:
                      - strong [ref=e331]: kazakh-sft-009
                      - generic "Exact source value 0.000002865685053441384" [ref=e332]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 99" [ref=e333] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e334]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 100" [ref=e335] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e336]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 101" [ref=e337] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e338]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 102" [ref=e339] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e340]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 103" [ref=e341] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e342]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 104" [ref=e343] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e344]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 105" [ref=e345] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e346]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 106" [ref=e347] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e348]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 107" [ref=e349] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e350]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 108" [ref=e351] [cursor=pointer]
                      - generic "Exact source value 0.000002865685053441384" [ref=e352]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 109" [ref=e353] [cursor=pointer]
                    - generic [ref=e354]:
                      - strong [ref=e356]: kazakh-sft-010
                      - generic "Exact source value 0.000002865685053441384" [ref=e357]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 99" [ref=e358] [cursor=pointer]
                    - generic [ref=e359]:
                      - strong [ref=e361]: kazakh-sft-001
                      - generic "Exact source value 0.000002865685053441384" [ref=e362]:
                        - text: step 99 · Learning rate 2.86569E-6 · Δstep 0
                        - button "Pin row 99" [ref=e363] [cursor=pointer]
            - generic [ref=e364]:
              - generic [ref=e365]:
                - generic [ref=e366]:
                  - heading "Gradient norm" [level=2] [ref=e367]
                  - paragraph [ref=e368]: Recorded step · Linear scale · Original values
                - generic [ref=e369]: 12 displayed
              - figure [ref=e370]:
                - generic [ref=e380]:
                  - generic [ref=e381]:
                    - generic [ref=e382]:
                      - button "Highlight kazakh-sft-005" [ref=e383] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e385]: 0.203161 – 0.239146
                    - generic [ref=e386]:
                      - button "Highlight kazakh-sft-009" [ref=e387] [cursor=pointer]: kazakh-sft-009
                      - generic [ref=e389]: 0.213264 – 0.237536
                    - generic [ref=e390]:
                      - button "Highlight kazakh-sft-010" [ref=e391] [cursor=pointer]: kazakh-sft-010
                      - generic [ref=e393]: 0.190018 – 0.233712
                    - generic [ref=e394]:
                      - button "Highlight kazakh-sft-001" [ref=e395] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e397]: 0.141555 – 0.21611
                  - paragraph [ref=e398]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                  - generic [ref=e399]:
                    - text: Cursor step 99
                    - generic [ref=e400]:
                      - strong [ref=e402]: kazakh-sft-005
                      - generic "Exact source value 0.23914566122461112" [ref=e403]:
                        - text: step 99 · Gradient norm 0.239146 · Δstep 0
                        - button "Pin row 99" [ref=e404] [cursor=pointer]
                    - generic [ref=e405]:
                      - strong [ref=e407]: kazakh-sft-009
                      - generic "Exact source value 0.21326351571828128" [ref=e408]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 99" [ref=e409] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e410]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 100" [ref=e411] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e412]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 101" [ref=e413] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e414]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 102" [ref=e415] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e416]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 103" [ref=e417] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e418]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 104" [ref=e419] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e420]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 105" [ref=e421] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e422]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 106" [ref=e423] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e424]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 107" [ref=e425] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e426]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 108" [ref=e427] [cursor=pointer]
                      - generic "Exact source value 0.21326351571828128" [ref=e428]:
                        - text: step 99 · Gradient norm 0.213264 · Δstep 0
                        - button "Pin row 109" [ref=e429] [cursor=pointer]
                    - generic [ref=e430]:
                      - strong [ref=e432]: kazakh-sft-010
                      - generic "Exact source value 0.20099927197210493" [ref=e433]:
                        - text: step 99 · Gradient norm 0.200999 · Δstep 0
                        - button "Pin row 99" [ref=e434] [cursor=pointer]
                    - generic [ref=e435]:
                      - strong [ref=e437]: kazakh-sft-001
                      - generic "Exact source value 0.1487488753022626" [ref=e438]:
                        - text: step 99 · Gradient norm 0.148749 · Δstep 0
                        - button "Pin row 99" [ref=e439] [cursor=pointer]
          - group [ref=e440]:
            - generic [ref=e442]:
              - generic [ref=e443]:
                - generic [ref=e444]:
                  - heading "Loss summaries" [level=2] [ref=e445]
                  - paragraph [ref=e446]: Computed from all original observations, independent of zoom.
                - generic [ref=e447]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e448] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e450]:
                - caption [ref=e451]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e452]:
                  - row [ref=e453]:
                    - columnheader "Run" [ref=e454]
                    - columnheader "Latest" [ref=e455]
                    - columnheader "Minimum" [ref=e456]
                    - columnheader "Maximum" [ref=e457]
                    - columnheader "Observations" [ref=e458]
                    - columnheader "Metric quality" [ref=e459]
                - rowgroup [ref=e460]:
                  - row [ref=e461]:
                    - rowheader "kazakh-sft-005" [ref=e462]:
                      - link "kazakh-sft-005" [ref=e463] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e464]:
                      - strong [ref=e465]: "0.201573"
                      - generic [ref=e466]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e467]:
                      - strong [ref=e468]: "0.200327"
                      - generic [ref=e469]: step 989,070
                    - cell "100.000 step 500,001" [ref=e470]:
                      - strong [ref=e471]: "100.000"
                      - generic [ref=e472]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e473]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e474]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e475]:
                      - link "0 invalid observations" [ref=e476] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e477]: 0 conflicting groups · 0 known gaps
                  - row [ref=e478]:
                    - rowheader "kazakh-sft-009" [ref=e479]:
                      - link "kazakh-sft-009" [ref=e480] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-009
                    - cell "0.256026 step 8,191" [ref=e481]:
                      - strong [ref=e482]: "0.256026"
                      - generic [ref=e483]: step 8,191
                    - cell "0.238756 step 8,177" [ref=e484]:
                      - strong [ref=e485]: "0.238756"
                      - generic [ref=e486]: step 8,177
                    - cell "3.430801 step 0" [ref=e487]:
                      - strong [ref=e488]: "3.430801"
                      - generic [ref=e489]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e490]:
                      - text: 8,192 raw rows
                      - generic [ref=e491]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 1 known gaps" [ref=e492]:
                      - link "0 invalid observations" [ref=e493] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-009&metric=loss
                      - generic [ref=e494]: 0 conflicting groups · 1 known gaps
                  - row [ref=e495]:
                    - rowheader "kazakh-sft-010" [ref=e496]:
                      - link "kazakh-sft-010" [ref=e497] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-010
                    - 'cell "Conflicting latest measurements step 8,190 Earlier finite: 0.244188 at step 8,189 source index 8189" [ref=e498]':
                      - strong [ref=e499]: Conflicting latest measurements
                      - generic [ref=e500]: step 8,190
                      - paragraph [ref=e501]:
                        - text: "Earlier finite: 0.244188 at step 8,189"
                        - generic [ref=e502]: source index 8189
                    - cell "0.23927 step 8,107" [ref=e503]:
                      - strong [ref=e504]: "0.23927"
                      - generic [ref=e505]: step 8,107
                    - cell "12.000 step 100" [ref=e506]:
                      - strong [ref=e507]: "12.000"
                      - generic [ref=e508]: step 100
                    - cell "8,192 raw rows 8,191 finite Loss observations" [ref=e509]:
                      - text: 8,192 raw rows
                      - generic [ref=e510]: 8,191 finite Loss observations
                    - cell "1 invalid observations 2 conflicting groups · 1 known gaps" [ref=e511]:
                      - link "1 invalid observations" [ref=e512] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-010&metric=loss
                      - generic [ref=e513]: 2 conflicting groups · 1 known gaps
                  - row [ref=e514]:
                    - rowheader "kazakh-sft-001" [ref=e515]:
                      - link "kazakh-sft-001" [ref=e516] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e517]:
                      - strong [ref=e518]: "0.269841"
                      - generic [ref=e519]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e520]:
                      - strong [ref=e521]: "0.23887"
                      - generic [ref=e522]: step 8,185
                    - cell "3.431808 step 0" [ref=e523]:
                      - strong [ref=e524]: "3.431808"
                      - generic [ref=e525]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e526]:
                      - text: 8,192 raw rows
                      - generic [ref=e527]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e528]:
                      - link "0 invalid observations" [ref=e529] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e530]: 0 conflicting groups · 0 known gaps
          - generic [ref=e531]:
            - generic [ref=e532]:
              - heading "Cursor source values" [level=2] [ref=e533]
              - paragraph [ref=e534]: Nearest recorded step shown separately for each run.
            - generic [ref=e535]:
              - strong [ref=e536]: kazakh-sft-005
              - generic [ref=e537]: step 99 · loss 1.838472 · source 99
            - generic [ref=e538]:
              - strong [ref=e539]: kazakh-sft-009
              - generic [ref=e540]: step 99 · loss 1.812318 · source 99
              - generic [ref=e541]: step 99 · loss 1.812318 · source 100
              - generic [ref=e542]: step 99 · loss 1.812318 · source 101
              - generic [ref=e543]: step 99 · loss 1.812318 · source 102
              - generic [ref=e544]: step 99 · loss 1.812318 · source 103
              - generic [ref=e545]: step 99 · loss 1.812318 · source 104
              - generic [ref=e546]: step 99 · loss 1.812318 · source 105
              - generic [ref=e547]: step 99 · loss 1.812318 · source 106
              - generic [ref=e548]: step 99 · loss 1.812318 · source 107
              - generic [ref=e549]: step 99 · loss 1.812318 · source 108
              - generic [ref=e550]: step 99 · loss 1.812318 · source 109
            - generic [ref=e551]:
              - strong [ref=e552]: kazakh-sft-010
              - generic [ref=e553]: step 99 · loss 1.843662 · source 99
            - generic [ref=e554]:
              - strong [ref=e555]: kazakh-sft-001
              - generic [ref=e556]: step 99 · loss 1.81543 · source 99
```

# Test source

```ts
  1  | import { expect, test, type Locator, type Page } from '@playwright/test'
  2  | 
  3  | async function documentTop(locator: Locator) {
  4  |   return locator.evaluate(element => element.getBoundingClientRect().top + scrollY)
  5  | }
  6  | async function pointAtCenter(page: Page, plot: Locator) {
  7  |   await plot.locator('.u-over').scrollIntoViewIfNeeded()
  8  |   const box = await plot.locator('.u-over').boundingBox()
  9  |   if (!box) throw new Error('Missing chart input surface')
  10 |   const sequence = await page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)
  11 |   await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  12 |   await expect.poll(() => page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)).toBeGreaterThan(sequence)
  13 | }
  14 | async function setRange(page: Page, min: number, max: number) {
  15 |   const from = page.getByLabel('From step', { exact: true })
  16 |   if (!await from.isVisible()) await page.locator('.range-disclosure > summary').click()
  17 |   await from.fill(String(min))
  18 |   await page.getByLabel('To step', { exact: true }).fill(String(max))
  19 |   await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  20 |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true')
  21 | }
  22 | 
  23 | for (const route of ['/dashboard', '/runs']) test(`compact ${route} keeps explicit actions in place without automatic coordinates`, async ({ page }, info) => {
  24 |   await page.setViewportSize({ width: 1280, height: 900 })
  25 |   await page.goto(route)
  26 |   const plot = page.getByTestId('loss-chart')
  27 |   await expect(plot).toHaveAttribute('data-view-ready', 'true')
  28 |   const next = page.locator(route === '/dashboard' ? '.dashboard-source-link' : '.preview-facts')
  29 |   const before = await documentTop(next)
  30 |   await pointAtCenter(page, plot)
  31 |   const after = await documentTop(next)
  32 |   await info.attach('preview-layout', { body: JSON.stringify({ route, before, after }), contentType: 'application/json' })
  33 |   expect.soft(after).toBeCloseTo(before, 0)
  34 |   await expect(page.locator('.preview-charts .chart-hover-value')).toHaveCount(0)
  35 |   await expect(plot).toHaveAttribute('data-cursor-point-count', /[1-9]/)
  36 |   await expect(page.locator('.preview-charts')).toContainText('inspect original values and adjust range')
  37 | })
  38 | 
  39 | for (const width of [390, 1440]) for (const comparison of [false, true]) test(`${comparison ? 'four-run duplicate comparison' : 'full run'} preserves the following metric position at ${width}px`, async ({ page }, info) => {
  40 |   await page.setViewportSize({ width, height: 900 })
  41 |   await page.goto(comparison ? '/compare?runs=kazakh-sft-005,kazakh-sft-009,kazakh-sft-010,kazakh-sft-001' : '/runs/kazakh-sft-005')
  42 |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true')
  43 |   await setRange(page, comparison ? 98 : 500000, comparison ? 100 : 500002)
  44 |   const plot = page.locator('.metric-loss .plot-host'), following = page.locator('.metric-lr'), before = await documentTop(following)
  45 |   await pointAtCenter(page, plot)
  46 |   await expect(page.locator('.metric-loss .chart-hover-value')).toBeVisible()
  47 |   const after = await documentTop(following)
  48 |   await info.attach('full-chart-layout', { body: JSON.stringify({ width, comparison, before, after }), contentType: 'application/json' })
> 49 |   expect(after).toBeCloseTo(before, 0)
     |                 ^ Error: expect(received).toBeCloseTo(expected, precision)
  50 |   await expect(page.getByTestId('cursor-readout-loss')).toHaveAttribute('data-reserved', 'true')
  51 |   if (comparison) {
  52 |     await expect(page.locator('.metric-loss .tooltip-series')).toHaveCount(4)
  53 |     await expect(page.locator('.metric-loss .tooltip-series').filter({ hasText: 'kazakh-sft-009' })).toContainText('Showing first 2 returned observations')
  54 |     await expect(page.locator('.metric-loss .tooltip-series').filter({ hasText: 'kazakh-sft-009' }).getByRole('link', { name: 'Inspect full source group', exact: true })).toHaveAttribute('href', /step=99&revision=/)
  55 |   } else {
  56 |     const pin = page.locator('.metric-loss').getByRole('button', { name: 'Pin row 500001', exact: true })
  57 |     await pin.focus()
  58 |     await page.keyboard.press('Enter')
  59 |     await expect(page.getByTestId('pinned-loss')).toHaveText('100')
  60 |   }
  61 |   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  62 | })
  63 | 
  64 | test('the visible recorded spike explains the linear axis and zoom keeps its exact source', async ({ page }) => {
  65 |   await page.goto('/runs/kazakh-sft-005')
  66 |   const note = page.getByTestId('spike-explanation')
  67 |   await expect(note).toContainText('Recorded spike: loss 100 at step 500,001')
  68 |   await expect(note).toContainText('linear scale includes this peak')
  69 |   await expect(note.getByRole('link', { name: 'Inspect original spike', exact: true })).toHaveAttribute('href', /sourceIndex=500001&revision=/)
  70 |   await note.getByRole('button', { name: 'Zoom around spike', exact: true }).click()
  71 |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min', '499991')
  72 |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-max', '500011')
  73 |   await expect(note).toBeVisible()
  74 |   await setRange(page, 0, 100)
  75 |   await expect(note).toHaveCount(0)
  76 | })
  77 | 
  78 | test('recorded nonfinite measurements explain their snapshot counts and gap semantics', async ({ page }) => {
  79 |   for (const [id, expected] of [['006', '2 NaN observations'], ['007', '1 +Infinity observation'], ['008', '1 −Infinity observation']]) {
  80 |     await page.goto(`/runs/kazakh-sft-${id}`)
  81 |     const note = page.locator('.metric-loss').getByTestId('invalid-explanation')
  82 |     await expect(note).toContainText(`This snapshot contains ${expected}`)
  83 |     await expect(note).toContainText('invalid values create gaps, never zero')
  84 |     await expect(note.getByRole('link', { name: 'Inspect data quality', exact: true })).toHaveAttribute('href', `/data-quality?run=kazakh-sft-${id}&metric=loss`)
  85 |   }
  86 | })
  87 | 
```