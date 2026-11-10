# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visible-hover.spec.ts >> desktop source readout reserves chart space while preserving complete44px source actions
- Location: e2e\visible-hover.spec.ts:157:1

# Error details

```
Error: desktop readout should leave room for the chart

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 340
Received:    382
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
                      - paragraph [ref=e261]: Original source values · All metrics
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
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e280]
                          - rowgroup "Original observations for kazakh-sft-001" [ref=e281]:
                            - row [ref=e282]:
                              - rowheader "kazakh-sft-001" [ref=e283]:
                                - strong [ref=e286]: kazakh-sft-001
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e287]
                          - rowgroup "Original observations for kazakh-sft-002" [ref=e288]:
                            - row [ref=e289]:
                              - rowheader "kazakh-sft-002" [ref=e290]:
                                - strong [ref=e293]: kazakh-sft-002
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e294]
                          - rowgroup "Original observations for kazakh-sft-006" [ref=e295]:
                            - row [ref=e296]:
                              - rowheader "kazakh-sft-006" [ref=e297]:
                                - strong [ref=e300]: kazakh-sft-006
                              - cell "Point at any chart to inspect the original row and all three metrics." [ref=e301]
                      - paragraph [ref=e302]: Scroll for more rows and metrics. Groups show the first 2 observations.
            - generic [ref=e303]:
              - generic [ref=e304]:
                - generic [ref=e305]:
                  - heading "Learning rate" [level=2] [ref=e306]
                  - paragraph [ref=e307]: Recorded step · Linear scale · Original values
                - generic [ref=e308]: 642 displayed
              - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Highlight kazakh-sft-001 0E0 – 1.83323E-5 Highlight kazakh-sft-002 0E0 – 1.83323E-5 Highlight kazakh-sft-006 0E0 – 1.83323E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e309]':
                - generic [ref=e319]:
                  - generic [ref=e320]:
                    - generic [ref=e321]:
                      - button "Highlight kazakh-sft-005" [ref=e322] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e324]: 0E0 – 1.83333E-5
                    - generic [ref=e325]:
                      - button "Highlight kazakh-sft-001" [ref=e326] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e328]: 0E0 – 1.83323E-5
                    - generic [ref=e329]:
                      - button "Highlight kazakh-sft-002" [ref=e330] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e332]: 0E0 – 1.83323E-5
                    - generic [ref=e333]:
                      - button "Highlight kazakh-sft-006" [ref=e334] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e336]: 0E0 – 1.83323E-5
                  - paragraph [ref=e337]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
            - generic [ref=e338]:
              - generic [ref=e339]:
                - generic [ref=e340]:
                  - heading "Gradient norm" [level=2] [ref=e341]
                  - paragraph [ref=e342]: Recorded step · Linear scale · Original values
                - generic [ref=e343]: 1276 displayed
              - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Highlight kazakh-sft-001 0.140004 – 0.239962 Highlight kazakh-sft-002 0.140024 – 0.239986 Highlight kazakh-sft-006 0.140005 – 0.239992 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e344]':
                - generic [ref=e354]:
                  - generic [ref=e355]:
                    - generic [ref=e356]:
                      - button "Highlight kazakh-sft-005" [ref=e357] [cursor=pointer]: kazakh-sft-005
                      - generic [ref=e359]: 0.140 – 0.240
                    - generic [ref=e360]:
                      - button "Highlight kazakh-sft-001" [ref=e361] [cursor=pointer]: kazakh-sft-001
                      - generic [ref=e363]: 0.140004 – 0.239962
                    - generic [ref=e364]:
                      - button "Highlight kazakh-sft-002" [ref=e365] [cursor=pointer]: kazakh-sft-002
                      - generic [ref=e367]: 0.140024 – 0.239986
                    - generic [ref=e368]:
                      - button "Highlight kazakh-sft-006" [ref=e369] [cursor=pointer]: kazakh-sft-006
                      - generic [ref=e371]: 0.140005 – 0.239992
                  - paragraph [ref=e372]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - group [ref=e373]:
            - generic [ref=e375]:
              - generic [ref=e376]:
                - generic [ref=e377]:
                  - heading "Loss summaries" [level=2] [ref=e378]
                  - paragraph [ref=e379]: Computed from all original observations, independent of zoom.
                - generic [ref=e380]:
                  - text: Summary metric
                  - combobox "Summary metric" [ref=e381] [cursor=pointer]:
                    - option "Loss" [selected]
                    - option "Learning rate"
                    - option "Gradient norm"
              - table "Whole-run Loss values and their actual steps" [ref=e383]:
                - caption [ref=e384]: Whole-run Loss values and their actual steps
                - rowgroup [ref=e385]:
                  - row [ref=e386]:
                    - columnheader "Run" [ref=e387]
                    - columnheader "Latest" [ref=e388]
                    - columnheader "Minimum" [ref=e389]
                    - columnheader "Maximum" [ref=e390]
                    - columnheader "Observations" [ref=e391]
                    - columnheader "Metric quality" [ref=e392]
                - rowgroup [ref=e393]:
                  - row [ref=e394]:
                    - rowheader "kazakh-sft-005" [ref=e395]:
                      - link "kazakh-sft-005" [ref=e396] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-005
                    - cell "0.201573 step 999,999" [ref=e397]:
                      - strong [ref=e398]: "0.201573"
                      - generic [ref=e399]: step 999,999
                    - cell "0.200327 step 989,070" [ref=e400]:
                      - strong [ref=e401]: "0.200327"
                      - generic [ref=e402]: step 989,070
                    - cell "100.000 step 500,001" [ref=e403]:
                      - strong [ref=e404]: "100.000"
                      - generic [ref=e405]: step 500,001
                    - cell "1,000,000 raw rows 1,000,000 finite Loss observations" [ref=e406]:
                      - text: 1,000,000 raw rows
                      - generic [ref=e407]: 1,000,000 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e408]:
                      - link "0 invalid observations" [ref=e409] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-005&metric=loss
                      - generic [ref=e410]: 0 conflicting groups · 0 known gaps
                  - row [ref=e411]:
                    - rowheader "kazakh-sft-001" [ref=e412]:
                      - link "kazakh-sft-001" [ref=e413] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-001
                    - cell "0.269841 step 8,191" [ref=e414]:
                      - strong [ref=e415]: "0.269841"
                      - generic [ref=e416]: step 8,191
                    - cell "0.23887 step 8,185" [ref=e417]:
                      - strong [ref=e418]: "0.23887"
                      - generic [ref=e419]: step 8,185
                    - cell "3.431808 step 0" [ref=e420]:
                      - strong [ref=e421]: "3.431808"
                      - generic [ref=e422]: step 0
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e423]:
                      - text: 8,192 raw rows
                      - generic [ref=e424]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e425]:
                      - link "0 invalid observations" [ref=e426] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-001&metric=loss
                      - generic [ref=e427]: 0 conflicting groups · 0 known gaps
                  - row [ref=e428]:
                    - rowheader "kazakh-sft-002" [ref=e429]:
                      - link "kazakh-sft-002" [ref=e430] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-002
                    - cell "0.484209 step 8,191" [ref=e431]:
                      - strong [ref=e432]: "0.484209"
                      - generic [ref=e433]: step 8,191
                    - cell "0.454091 step 8,129" [ref=e434]:
                      - strong [ref=e435]: "0.454091"
                      - generic [ref=e436]: step 8,129
                    - cell "3.417161 step 2" [ref=e437]:
                      - strong [ref=e438]: "3.417161"
                      - generic [ref=e439]: step 2
                    - cell "8,192 raw rows 8,192 finite Loss observations" [ref=e440]:
                      - text: 8,192 raw rows
                      - generic [ref=e441]: 8,192 finite Loss observations
                    - cell "0 invalid observations 0 conflicting groups · 0 known gaps" [ref=e442]:
                      - link "0 invalid observations" [ref=e443] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-002&metric=loss
                      - generic [ref=e444]: 0 conflicting groups · 0 known gaps
                  - row [ref=e445]:
                    - rowheader "kazakh-sft-006" [ref=e446]:
                      - link "kazakh-sft-006" [ref=e447] [cursor=pointer]:
                        - /url: /runs/kazakh-sft-006
                    - 'cell "Invalid latest measurement step 8,191 Earlier finite: 0.265264 at step 8,190 source index 8190" [ref=e448]':
                      - strong [ref=e449]: Invalid latest measurement
                      - generic [ref=e450]: step 8,191
                      - paragraph [ref=e451]:
                        - text: "Earlier finite: 0.265264 at step 8,190"
                        - generic [ref=e452]: source index 8190
                    - cell "0.238795 step 8,157" [ref=e453]:
                      - strong [ref=e454]: "0.238795"
                      - generic [ref=e455]: step 8,157
                    - cell "3.416736 step 0" [ref=e456]:
                      - strong [ref=e457]: "3.416736"
                      - generic [ref=e458]: step 0
                    - cell "8,192 raw rows 8,190 finite Loss observations" [ref=e459]:
                      - text: 8,192 raw rows
                      - generic [ref=e460]: 8,190 finite Loss observations
                    - cell "2 invalid observations 0 conflicting groups · 0 known gaps" [ref=e461]:
                      - link "2 invalid observations" [ref=e462] [cursor=pointer]:
                        - /url: /data-quality?run=kazakh-sft-006&metric=loss
                      - generic [ref=e463]: 0 conflicting groups · 0 known gaps
```

# Test source

```ts
  61  |  const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  62  |  await page.mouse.move(box!.x+box!.width*.3,box!.y+box!.height*.5)
  63  |  await page.waitForFunction(()=>{const frame=performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark|undefined;return frame?.detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq})
  64  |  await page.getByTestId('cursor-readout-loss').evaluate(node=>{(node as HTMLElement).style.opacity='0'})
  65  |  await page.mouse.move(box!.x+box!.width*.6,box!.y+box!.height*.5)
  66  |  await page.waitForFunction(()=>performance.getEntriesByName('soup:hover-not-visible').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))
  67  |  expect(await page.evaluate(()=>performance.getEntriesByName('soup:hover-frame').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))).toBe(false)
  68  | })
  69  | 
  70  | test('moving to another original row reuses source text nodes instead of replacing the layout subtree',async({page})=>{
  71  |  await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
  72  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  73  |  const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  74  |  await page.mouse.move(box!.x+box!.width*.3,box!.y+box!.height*.5)
  75  |  const step=page.locator('[data-source-step]').first();await expect(step).not.toBeEmpty()
  76  |  const previous=await step.textContent(),leaf=await step.evaluateHandle(node=>node.firstChild)
  77  |  await page.mouse.move(box!.x+box!.width*.6,box!.y+box!.height*.5)
  78  |  await expect(step).not.toHaveText(previous!)
  79  |  expect(await step.evaluate((node,old)=>node.firstChild===old,leaf),'changed source text should mutate its existing Text node').toBe(true)
  80  |  await leaf.dispose()
  81  | })
  82  | 
  83  | test('native crosshair hides on leave without removing its layout geometry',async({page})=>{
  84  |  await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
  85  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  86  |  const plot=page.getByTestId('loss-chart'),over=plot.locator('.u-over');await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
  87  |  await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
  88  |  const crosshairs=plot.locator('.u-cursor-x,.u-cursor-y');await expect(crosshairs).toHaveCount(2)
  89  |  for(const cursor of await crosshairs.all())await expect(cursor).toBeVisible()
  90  |  await page.mouse.move(30,30)
  91  |  for(const cursor of await crosshairs.all()){
  92  |   await expect(cursor).toBeHidden()
  93  |   expect(await cursor.evaluate(node=>getComputedStyle(node).display),'leaving must not remove native cursor nodes from layout').not.toBe('none')
  94  |  }
  95  | })
  96  | 
  97  | test('source DOM writes coalesce after pointer handlers and commit before both paint checks',async({page})=>{
  98  |  await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
  99  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  100 |  const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  101 |  await page.mouse.move(box!.x+box!.width*.3,box!.y+box!.height*.5)
  102 |  const step=page.locator('[data-source-step]').first();await expect(step).not.toBeEmpty()
  103 |  const previous=await step.textContent(),sequence=await page.evaluate(()=>window.__soupEvidence?.acceptedHoverSeq??0),pin=page.getByTestId('cursor-readout-loss').getByRole('button',{name:/^Pin row /}).first(),pinName=await pin.getAttribute('aria-label')
  104 |  await page.evaluate(()=>{
  105 |   const original=queueMicrotask,queued:VoidFunction[]=[]
  106 |   window.queueMicrotask=callback=>{queued.push(callback)}
  107 |   Object.assign(window,{__releaseSourceFrames:()=>{window.queueMicrotask=original;for(const callback of queued)original(callback);queued.length=0}})
  108 |  })
  109 |  try{
  110 |   await page.mouse.move(box!.x+box!.width*.6,box!.y+box!.height*.5)
  111 |   await page.waitForFunction(previous=>(window.__soupEvidence?.acceptedHoverSeq??0)>previous,sequence,{polling:20})
  112 |   expect(await step.textContent(),'accepted cursor data should not dirty layout inside the pointer handler').toBe(previous)
  113 |   // A click must pin the row actually labelled in the DOM, even while newer data waits.
  114 |   await pin.evaluate(button=>(button as HTMLButtonElement).click())
  115 |  }finally{await page.evaluate(()=>(window as unknown as Window&{__releaseSourceFrames:()=>void}).__releaseSourceFrames())}
  116 |  await expect(step).not.toHaveText(previous!)
  117 |  await expect(page.locator('.pinned-source')).toContainText(`sourceIndex ${pinName!.replace('Pin row ','')}`)
  118 |  await page.waitForFunction(()=>{
  119 |   const frame=performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark|undefined,commit=performance.getEntriesByName('soup:hover-dom-commit').at(-1)
  120 |   return !!frame&&frame.detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq&&!!commit&&commit.startTime<=frame.detail.firstCheckedAt&&frame.detail.firstCheckedAt<frame.startTime
  121 |  })
  122 | })
  123 | 
  124 | test('Pin works when the same source identity reappears after a view reset',async({page})=>{
  125 |  await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
  126 |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  127 |  for(let round=0;round<2;round++){
  128 |   const before=await page.evaluate(()=>window.__soupEvidence?.viewSeq??0)
  129 |   await page.getByLabel('From step',{exact:true}).fill('500001');await page.getByLabel('To step',{exact:true}).fill('500001');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  130 |   await page.waitForFunction(previous=>(window.__soupEvidence?.viewSeq??0)>previous&&!!document.querySelector('.metric-grid[data-view-ready="true"]'),before)
  131 |   const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  132 |   await page.mouse.move(box!.x+box!.width*.5,box!.y+box!.height*.5)
  133 |   await expect(page.getByRole('button',{name:'Pin row 500001',exact:true})).toBeVisible()
  134 |  }
  135 |  await page.getByRole('button',{name:'Pin row 500001',exact:true}).click()
  136 |  await expect(page.getByTestId('pinned-loss')).toHaveText('100')
  137 | })
  138 | 
  139 | test('source layout ownership changes only with workspace membership and cleans up on departure',async({page})=>{
  140 |  await page.setViewportSize({width:1440,height:900})
  141 |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  142 |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  143 |  const main=page.locator('#main-content');await expect(main).toHaveAttribute('data-source-dock-members','4')
  144 |  const mode=await main.getAttribute('data-source-dock-owner')
  145 |  const over=page.getByTestId('comparison-loss').locator('.u-over');await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
  146 |  await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
  147 |  await expect(main).toHaveAttribute('data-source-dock-owner',mode!)
  148 |  await page.getByRole('checkbox',{name:'Compare kazakh-sft-006',exact:true}).uncheck()
  149 |  await expect(main).toHaveAttribute('data-source-dock-members','3')
  150 |  await page.getByRole('link',{name:'Data quality',exact:true}).click()
  151 |  await expect(page.locator('h1')).toHaveText('Data quality')
  152 |  await expect(main).not.toHaveAttribute('data-source-dock-members')
  153 |  await expect(main).not.toHaveAttribute('data-source-dock-owner')
  154 |  expect(await main.evaluate(node=>getComputedStyle(node).overflowY)).toBe('visible')
  155 | })
  156 | 
  157 | test('desktop source readout reserves chart space while preserving complete44px source actions',async({page})=>{
  158 |  await page.setViewportSize({width:1440,height:900});await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  159 |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  160 |  const rail=page.getByTestId('comparison-cursor-readout')
> 161 |  expect((await rail.boundingBox())!.height,'desktop readout should leave room for the chart').toBeLessThanOrEqual(340)
      |                                                                                               ^ Error: desktop readout should leave room for the chart
  162 |  await page.getByLabel('From step',{exact:true}).fill('0');await page.getByLabel('To step',{exact:true}).fill('8191');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  163 |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  164 |  const over=page.getByTestId('comparison-loss').locator('.u-over');await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
  165 |  await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
  166 |  const pins=rail.getByRole('button',{name:/^Pin row /});await expect(pins).toHaveCount(4)
  167 |  const actions=await pins.evaluateAll(nodes=>nodes.map(node=>{const rect=node.getBoundingClientRect(),parent=node.closest('[role="region"]')!.getBoundingClientRect();return{height:rect.height,top:rect.top,bottom:rect.bottom,viewportTop:parent.top,viewportBottom:parent.bottom}}))
  168 |  expect(actions.every(action=>action.height>=44&&action.top>=action.viewportTop&&action.bottom<=action.viewportBottom)).toBe(true)
  169 | })
  170 | 
```