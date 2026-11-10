# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shared-readout-geometry.spec.ts >> source table columns stay fixed when placeholder rows become measured values
- Location: e2e\shared-readout-geometry.spec.ts:3:1

# Error details

```
Error: column widths must not reflow on source updates

expect(received).toBeLessThan(expected)

Expected: < 0.5
Received:   30.03125
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
              - 'figure "Highlight kazakh-sft-005 1.27935 – 1.832639 Highlight kazakh-sft-001 1.272431 – 1.835924 Highlight kazakh-sft-002 2.702589 – 3.035917 Highlight kazakh-sft-006 1.278277 – 1.818539 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero. Inspect data quality . Compared source values" [ref=e218]':
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
                  - region "Compared source values" [ref=e250]:
                    - generic [ref=e251]:
                      - paragraph [ref=e252]: Cursor step 121.24183 · All metrics
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
                            - cell "121" [ref=e271]
                            - cell "1.660268" [ref=e272]
                            - cell "2.90365E-8" [ref=e273]
                            - cell "0.154765" [ref=e274]
                            - cell "0.24183" [ref=e275]
                            - cell [ref=e276]:
                              - button "Pin row 121" [ref=e277] [cursor=pointer]: "Pin #121"
                        - rowgroup "Original observations for kazakh-sft-001" [ref=e278]:
                          - row [ref=e279]:
                            - rowheader "kazakh-sft-001" [ref=e280]:
                              - strong [ref=e283]: kazakh-sft-001
                            - cell "121" [ref=e284]
                            - cell "1.649548" [ref=e285]
                            - cell "3.49298E-6" [ref=e286]
                            - cell "0.217917" [ref=e287]
                            - cell "0.24183" [ref=e288]
                            - cell [ref=e289]:
                              - button "Pin row 121" [ref=e290] [cursor=pointer]: "Pin #121"
                        - rowgroup "Original observations for kazakh-sft-002" [ref=e291]:
                          - row [ref=e292]:
                            - rowheader "kazakh-sft-002" [ref=e293]:
                              - strong [ref=e296]: kazakh-sft-002
                            - cell "121" [ref=e297]
                            - cell "2.932731" [ref=e298]
                            - cell "3.49298E-6" [ref=e299]
                            - cell "0.231864" [ref=e300]
                            - cell "0.24183" [ref=e301]
                            - cell [ref=e302]:
                              - button "Pin row 121" [ref=e303] [cursor=pointer]: "Pin #121"
                        - rowgroup "Original observations for kazakh-sft-006" [ref=e304]:
                          - row [ref=e305]:
                            - rowheader "kazakh-sft-006" [ref=e306]:
                              - strong [ref=e309]: kazakh-sft-006
                            - cell "121" [ref=e310]
                            - cell "1.656078" [ref=e311]
                            - cell "3.49298E-6" [ref=e312]
                            - cell "0.191971" [ref=e313]
                            - cell "0.24183" [ref=e314]
                            - cell [ref=e315]:
                              - button "Pin row 121" [ref=e316] [cursor=pointer]: "Pin #121"
                      - paragraph [ref=e317]: Scroll for more rows and metrics. Groups show the first 2 observations.
            - generic [ref=e318]:
              - generic [ref=e319]:
                - generic [ref=e320]:
                  - heading "Learning rate" [level=2] [ref=e321]
                  - paragraph [ref=e322]: Recorded step · Linear scale · Original values
                - generic [ref=e323]: 404 displayed
              - 'figure "Highlight kazakh-sft-005 2.39976E-8 – 4.79904E-8 Highlight kazakh-sft-001 2.89427E-6 – 5.717E-6 Highlight kazakh-sft-002 2.89427E-6 – 5.717E-6 Highlight kazakh-sft-006 2.89427E-6 – 5.717E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e324]':
                - generic [ref=e334]:
                  - generic [ref=e335]:
                    - generic [ref=e336]:
                      - button "Highlight kazakh-sft-005" [ref=e337] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e339]: 2.39976E-8 – 4.79904E-8
                    - generic [ref=e340]:
                      - button "Highlight kazakh-sft-001" [ref=e341] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e343]: 2.89427E-6 – 5.717E-6
                    - generic [ref=e344]:
                      - button "Highlight kazakh-sft-002" [ref=e345] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e347]: 2.89427E-6 – 5.717E-6
                    - generic [ref=e348]:
                      - button "Highlight kazakh-sft-006" [ref=e349] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e351]: 2.89427E-6 – 5.717E-6
                  - paragraph [ref=e352]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
            - generic [ref=e353]:
              - generic [ref=e354]:
                - generic [ref=e355]:
                  - heading "Gradient norm" [level=2] [ref=e356]
                  - paragraph [ref=e357]: Recorded step · Linear scale · Original values
                - generic [ref=e358]: 404 displayed
              - 'figure "Highlight kazakh-sft-005 0.140376 – 0.237665 Highlight kazakh-sft-001 0.141555 – 0.239218 Highlight kazakh-sft-002 0.140848 – 0.239016 Highlight kazakh-sft-006 0.140791 – 0.237989 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e359]':
                - generic [ref=e369]:
                  - generic [ref=e370]:
                    - generic [ref=e371]:
                      - button "Highlight kazakh-sft-005" [ref=e372] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e374]: 0.140376 – 0.237665
                    - generic [ref=e375]:
                      - button "Highlight kazakh-sft-001" [ref=e376] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e378]: 0.141555 – 0.239218
                    - generic [ref=e379]:
                      - button "Highlight kazakh-sft-002" [ref=e380] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e382]: 0.140848 – 0.239016
                    - generic [ref=e383]:
                      - button "Highlight kazakh-sft-006" [ref=e384] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e386]: 0.140791 – 0.237989
                  - paragraph [ref=e387]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - group [ref=e388]:
            - generic [ref=e390]:
              - generic [ref=e391]:
                - generic [ref=e392]:
                  - heading "Loss summaries" [level=2] [ref=e393]
                  - paragraph [ref=e394]: Computed from all original observations, independent of zoom.
                - generic [ref=e395]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e396] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e398]:
                - caption [ref=e399]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e400]:
                  - row [ref=e401]:
                    - columnheader "Run" [ref=e402]
                    - columnheader "Latest" [ref=e403]
                    - columnheader "Minimum" [ref=e404]
                    - columnheader "Maximum" [ref=e405]
                    - columnheader "Observations" [ref=e406]
                    - columnheader "Metric quality" [ref=e407]
                - rowgroup [ref=e408]:
                  - row [ref=e409]:
                    - rowheader "kazakh-sft-005" [ref=e410]:
                      - link "kazakh-sft-005" [ref=e411] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e412]:
                      - strong [ref=e413]: "0.201573"
                      - generic [ref=e414]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e415]:
                      - strong [ref=e416]: "0.200327"
                      - generic [ref=e417]: step 989,070
                    - cell "100.000 step 500,001" [ref=e418]:
                      - strong [ref=e419]: "100.000"
                      - generic [ref=e420]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e421]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e422]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e423]:
                      - link "0 invalid observations" [ref=e424] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e425]: 0 conflicting groups · 0 known gaps
                  - row [ref=e426]:
                    - rowheader "kazakh-sft-001" [ref=e427]:
                      - link "kazakh-sft-001" [ref=e428] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e429]:
                      - strong [ref=e430]: "0.269841"
                      - generic [ref=e431]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e432]:
                      - strong [ref=e433]: "0.23887"
                      - generic [ref=e434]: step 8,185
                    - cell "3.431808 step 0" [ref=e435]:
                      - strong [ref=e436]: "3.431808"
                      - generic [ref=e437]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e438]:
                      - text: 8,192 raw rows
                      - generic [ref=e439]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e440]:
                      - link "0 invalid observations" [ref=e441] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e442]: 0 conflicting groups · 0 known gaps
                  - row [ref=e443]:
                    - rowheader "kazakh-sft-002" [ref=e444]:
                      - link "kazakh-sft-002" [ref=e445] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-002
                    - cell "0.484209 step 8,191" [ref=e446]:
                      - strong [ref=e447]: "0.484209"
                      - generic [ref=e448]: step 8,191
                    - cell "0.454091 step 8,129" [ref=e449]:
                      - strong [ref=e450]: "0.454091"
                      - generic [ref=e451]: step 8,129
                    - cell "3.417161 step 2" [ref=e452]:
                      - strong [ref=e453]: "3.417161"
                      - generic [ref=e454]: step 2
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e455]:
                      - text: 8,192 raw rows
                      - generic [ref=e456]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e457]:
                      - link "0 invalid observations" [ref=e458] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-002&metric=loss
                      - generic [ref=e459]: 0 conflicting groups · 0 known gaps
                  - row [ref=e460]:
                    - rowheader "kazakh-sft-006" [ref=e461]:
                      - link "kazakh-sft-006" [ref=e462] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-006
                    - 'cell "Invalid latest measurement step 8,191 Earlier finite: 0.265264 at step 8,190 source index 8190" [ref=e463]':
                      - strong [ref=e464]: Invalid latest measurement
                      - generic [ref=e465]: step 8,191
                      - paragraph [ref=e466]:
                        - text: "Earlier finite: 0.265264 at step 8,190"
                        - generic [ref=e467]: source index 8190
                    - cell "0.238795 step 8,157" [ref=e468]:
                      - strong [ref=e469]: "0.238795"
                      - generic [ref=e470]: step 8,157
                    - cell "3.416736 step 0" [ref=e471]:
                      - strong [ref=e472]: "3.416736"
                      - generic [ref=e473]: step 0
                    - cell "8,192 raw rows 8,190 finite Loss observations" [ref=e474]:
                      - text: 8,192 raw rows
                      - generic [ref=e475]: 8,190 finite Loss observations
                    - cell "2 invalid observations 0 conflicting groups · 0 known gaps" [ref=e476]:
                      - link "2 invalid observations" [ref=e477] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-006&metric=loss
                      - generic [ref=e478]: 0 conflicting groups · 0 known gaps
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('source table columns stay fixed when placeholder rows become measured values',async({page})=>{
  4  |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  7  |  await page.waitForFunction(()=>document.querySelector('.plot-host')?.getAttribute('data-range-min')==='100'&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
  8  |  const columns=page.locator('[data-testid="comparison-cursor-readout"] thead th')
  9  |  const sizes=()=>columns.evaluateAll(nodes=>nodes.map(node=>{const box=node.getBoundingClientRect();return{x:box.x,width:box.width}}))
  10 |  const before=await sizes(),surface=page.locator('[data-testid="comparison-loss"] .u-over')
  11 |  await surface.scrollIntoViewIfNeeded();await surface.hover({position:{x:130,y:2}})
  12 |  await expect(page.getByRole('region',{name:'Compared source values'}).getByRole('button',{name:/Pin row/}).first()).toBeVisible()
  13 |  const after=await sizes()
  14 |  expect(before).toHaveLength(7)
  15 |  for(let index=0;index<before.length;index++){
> 16 |   expect(Math.abs(before[index].width-after[index].width),'column widths must not reflow on source updates').toBeLessThan(.5)
     |                                                                                                              ^ Error: column widths must not reflow on source updates
  17 |   expect(Math.abs(before[index].x-after[index].x),'columns must not jump horizontally').toBeLessThan(.5)
  18 |  }
  19 | })
  20 | 
```