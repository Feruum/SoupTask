# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cursor-invariance.spec.ts >> moving over the same original row changes distance without rewriting source identity or empty slots
- Location: e2e\cursor-invariance.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('[data-testid="comparison-cursor-readout"] [data-source-distance]').first()
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" locator('[data-testid="comparison-cursor-readout"] [data-source-distance]').first() with timeout 5000ms
  - waiting for locator('[data-testid="comparison-cursor-readout"] [data-source-distance]').first()
    13 × locator resolved to <td data-source-distance="true"></td>
       - unexpected value "hidden"

```

```yaml
- link "Skip to content":
  - /url: "#main-content"
- complementary "Workspace":
  - link "Soup home":
    - /url: /dashboard
    - text: Soup.
  - text: Almaty Lab
  - navigation "Main navigation":
    - link "Dashboard":
      - /url: /dashboard
    - link "Training runs":
      - /url: /runs
    - link "Compare":
      - /url: /compare
    - link "Data quality":
      - /url: /data-quality
  - link "Soup documentation":
    - /url: https://souplanding-omega.vercel.app/docs/
  - figure "BUILT IN KAZAKHSTAN"
- banner:
  - text: Workspace qwen-kazakh Demo data
  - button "Switch to light theme"
- main:
  - heading "Compare runs" [level=1]
  - paragraph: 4 runs selected · Aligned by original recorded step
  - text: Demo snapshot · Smoothing off
  - complementary:
    - group:
      - heading "Selected runs" [level=2]
      - text: Search runs
      - searchbox "Search runs"
      - group "Choose up to four runs":
        - text: Choose up to four runs
        - checkbox "Compare kazakh-sft-001" [checked]
        - text: kazakh-sft-001 Qwen2.5-1.5B · Running
        - checkbox "Compare kazakh-sft-002" [checked]
        - text: kazakh-sft-002 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-003" [disabled]
        - text: kazakh-sft-003 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-004" [disabled]
        - text: kazakh-sft-004 Qwen2.5-1.5B · Failed
        - checkbox "Compare kazakh-sft-005" [checked]
        - text: kazakh-sft-005 Qwen2.5-3B · Running
        - checkbox "Compare kazakh-sft-006" [checked]
        - text: kazakh-sft-006 Qwen2.5-3B · Running
        - checkbox "Compare kazakh-sft-007" [disabled]
        - text: kazakh-sft-007 Qwen2.5-1.5B · Completed
        - checkbox "Compare kazakh-sft-008" [disabled]
        - text: kazakh-sft-008 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-009" [disabled]
        - text: kazakh-sft-009 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-010" [disabled]
        - text: kazakh-sft-010 Qwen2.5-1.5B · Running
        - checkbox "Compare kazakh-sft-011" [disabled]
        - text: kazakh-sft-011 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-012" [disabled]
        - text: kazakh-sft-012 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-013" [disabled]
        - text: kazakh-sft-013 Qwen2.5-1.5B · Completed
        - checkbox "Compare kazakh-sft-014" [disabled]
        - text: kazakh-sft-014 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-015" [disabled]
        - text: kazakh-sft-015 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-016" [disabled]
        - text: kazakh-sft-016 Qwen2.5-1.5B · Completed
        - checkbox "Compare kazakh-sft-017" [disabled]
        - text: kazakh-sft-017 Qwen2.5-3B · Failed
        - checkbox "Compare kazakh-sft-018" [disabled]
        - text: kazakh-sft-018 Qwen2.5-3B · Cancelled
        - checkbox "Compare kazakh-sft-019" [disabled]
        - text: kazakh-sft-019 Qwen2.5-1.5B · Completed
        - checkbox "Compare kazakh-sft-020" [disabled]
        - text: kazakh-sft-020 Qwen2.5-3B · Cancelled
      - term: Align by
      - definition: Recorded step
      - term: Y scale
      - definition: Linear · Shared per metric
      - term: Smoothing
      - definition: Off · Original values
      - term: Missing values
      - definition: Preserved as gaps
  - navigation "Visible metrics":
    - button "All metrics" [pressed]
    - button "Loss"
    - button "Learning rate"
    - button "Gradient norm"
  - group:
    - text: From step
    - spinbutton "From step": "100"
    - text: To step
    - spinbutton "To step": "200"
    - button "Apply range"
    - button "Zoom in"
    - button "Zoom out"
    - button "Reset view"
    - paragraph: Step 100 to 200
  - heading "Loss" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 404 displayed
  - 'figure "Highlight kazakh-sft-005 1.27935 – 1.832639 Highlight kazakh-sft-001 1.272431 – 1.835924 Highlight kazakh-sft-002 2.702589 – 3.035917 Highlight kazakh-sft-006 1.278277 – 1.818539 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero. Inspect data quality . Compared source values"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 1.27935 – 1.832639
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: 1.272431 – 1.835924
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: 2.702589 – 3.035917
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: 1.278277 – 1.818539
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - paragraph:
      - text: kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero.
      - link "Inspect data quality":
        - /url: /data-quality?run=kazakh-sft-006&metric=loss
      - text: .
    - region "Compared source values":
      - paragraph: Original source values · All metrics
      - region "Compared source table":
        - table "Original observations at cursor step":
          - caption: Original observations at cursor step
          - rowgroup:
            - row "Run Recorded step Loss Learning rate Gradient norm Δstep Source":
              - columnheader "Run"
              - columnheader "Recorded step"
              - columnheader "Loss"
              - columnheader "Learning rate"
              - columnheader "Gradient norm"
              - columnheader "Δstep"
              - columnheader "Source"
          - rowgroup "Original observations for kazakh-sft-005":
            - row "kazakh-sft-005 Point at any chart to inspect the original row and all three metrics.":
              - rowheader "kazakh-sft-005":
                - strong: kazakh-sft-005
              - cell "Point at any chart to inspect the original row and all three metrics."
          - rowgroup "Original observations for kazakh-sft-001":
            - row "kazakh-sft-001 Point at any chart to inspect the original row and all three metrics.":
              - rowheader "kazakh-sft-001":
                - strong: kazakh-sft-001
              - cell "Point at any chart to inspect the original row and all three metrics."
          - rowgroup "Original observations for kazakh-sft-002":
            - row "kazakh-sft-002 Point at any chart to inspect the original row and all three metrics.":
              - rowheader "kazakh-sft-002":
                - strong: kazakh-sft-002
              - cell "Point at any chart to inspect the original row and all three metrics."
          - rowgroup "Original observations for kazakh-sft-006":
            - row "kazakh-sft-006 Point at any chart to inspect the original row and all three metrics.":
              - rowheader "kazakh-sft-006":
                - strong: kazakh-sft-006
              - cell "Point at any chart to inspect the original row and all three metrics."
      - paragraph: Scroll for more rows and metrics. Groups show the first 2 observations.
  - heading "Learning rate" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 404 displayed
  - 'figure "Highlight kazakh-sft-005 2.39976E-8 – 4.79904E-8 Highlight kazakh-sft-001 2.89427E-6 – 5.717E-6 Highlight kazakh-sft-002 2.89427E-6 – 5.717E-6 Highlight kazakh-sft-006 2.89427E-6 – 5.717E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 2.39976E-8 – 4.79904E-8
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: 2.89427E-6 – 5.717E-6
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: 2.89427E-6 – 5.717E-6
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: 2.89427E-6 – 5.717E-6
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
  - heading "Gradient norm" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 404 displayed
  - 'figure "Highlight kazakh-sft-005 0.140376 – 0.237665 Highlight kazakh-sft-001 0.141555 – 0.239218 Highlight kazakh-sft-002 0.140848 – 0.239016 Highlight kazakh-sft-006 0.140791 – 0.237989 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.140376 – 0.237665
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: 0.141555 – 0.239218
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: 0.140848 – 0.239016
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: 0.140791 – 0.237989
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
  - group:
    - heading "Loss summaries" [level=2]
    - paragraph: Computed from all original observations, independent of zoom.
    - text: Summary metric
    - combobox "Summary metric":
      - option "Loss" [selected]
      - option "Learning rate"
      - option "Gradient norm"
    - table "Whole-run Loss values and their actual steps":
      - caption: Whole-run Loss values and their actual steps
      - rowgroup:
        - row "Run Latest Minimum Maximum Observations Metric quality":
          - columnheader "Run"
          - columnheader "Latest"
          - columnheader "Minimum"
          - columnheader "Maximum"
          - columnheader "Observations"
          - columnheader "Metric quality"
      - rowgroup:
        - row "kazakh-sft-005 0.201573 step 999,999 0.200327 step 989,070 100.000 step 500,001 1,000,000 raw rows 1,000,000 finite Loss observations 0 invalid observations 0 conflicting groups · 0 known gaps":
          - rowheader "kazakh-sft-005":
            - link "kazakh-sft-005":
              - /url: /runs/kazakh-sft-005
          - cell "0.201573 step 999,999":
            - strong: "0.201573"
            - text: step 999,999
          - cell "0.200327 step 989,070":
            - strong: "0.200327"
            - text: step 989,070
          - cell "100.000 step 500,001":
            - strong: "100.000"
            - text: step 500,001
          - cell "1,000,000 raw rows 1,000,000 finite Loss observations"
          - cell "0 invalid observations 0 conflicting groups · 0 known gaps":
            - link "0 invalid observations":
              - /url: /data-quality?run=kazakh-sft-005&metric=loss
            - text: 0 conflicting groups · 0 known gaps
        - row "kazakh-sft-001 0.269841 step 8,191 0.23887 step 8,185 3.431808 step 0 8,192 raw rows 8,192 finite Loss observations 0 invalid observations 0 conflicting groups · 0 known gaps":
          - rowheader "kazakh-sft-001":
            - link "kazakh-sft-001":
              - /url: /runs/kazakh-sft-001
          - cell "0.269841 step 8,191":
            - strong: "0.269841"
            - text: step 8,191
          - cell "0.23887 step 8,185":
            - strong: "0.23887"
            - text: step 8,185
          - cell "3.431808 step 0":
            - strong: "3.431808"
            - text: step 0
          - cell "8,192 raw rows 8,192 finite Loss observations"
          - cell "0 invalid observations 0 conflicting groups · 0 known gaps":
            - link "0 invalid observations":
              - /url: /data-quality?run=kazakh-sft-001&metric=loss
            - text: 0 conflicting groups · 0 known gaps
        - row "kazakh-sft-002 0.484209 step 8,191 0.454091 step 8,129 3.417161 step 2 8,192 raw rows 8,192 finite Loss observations 0 invalid observations 0 conflicting groups · 0 known gaps":
          - rowheader "kazakh-sft-002":
            - link "kazakh-sft-002":
              - /url: /runs/kazakh-sft-002
          - cell "0.484209 step 8,191":
            - strong: "0.484209"
            - text: step 8,191
          - cell "0.454091 step 8,129":
            - strong: "0.454091"
            - text: step 8,129
          - cell "3.417161 step 2":
            - strong: "3.417161"
            - text: step 2
          - cell "8,192 raw rows 8,192 finite Loss observations"
          - cell "0 invalid observations 0 conflicting groups · 0 known gaps":
            - link "0 invalid observations":
              - /url: /data-quality?run=kazakh-sft-002&metric=loss
            - text: 0 conflicting groups · 0 known gaps
        - 'row "kazakh-sft-006 Invalid latest measurement step 8,191 Earlier finite: 0.265264 at step 8,190 source index 8190 0.238795 step 8,157 3.416736 step 0 8,192 raw rows 8,190 finite Loss observations 2 invalid observations 0 conflicting groups · 0 known gaps"':
          - rowheader "kazakh-sft-006":
            - link "kazakh-sft-006":
              - /url: /runs/kazakh-sft-006
          - 'cell "Invalid latest measurement step 8,191 Earlier finite: 0.265264 at step 8,190 source index 8190"':
            - strong: Invalid latest measurement
            - text: step 8,191
            - paragraph: "Earlier finite: 0.265264 at step 8,190 source index 8190"
          - cell "0.238795 step 8,157":
            - strong: "0.238795"
            - text: step 8,157
          - cell "3.416736 step 0":
            - strong: "3.416736"
            - text: step 0
          - cell "8,192 raw rows 8,190 finite Loss observations"
          - cell "2 invalid observations 0 conflicting groups · 0 known gaps":
            - link "2 invalid observations":
              - /url: /data-quality?run=kazakh-sft-006&metric=loss
            - text: 0 conflicting groups · 0 known gaps
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('moving over the same original row changes distance without rewriting source identity or empty slots',async({page})=>{
  4  |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200')
  7  |  await page.getByRole('button',{name:'Apply range',exact:true}).click()
  8  |  await page.waitForFunction(()=>document.querySelector('.plot-host')?.getAttribute('data-range-min')==='100'&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
  9  |  const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded();const box=(await surface.boundingBox())!
  10 |  await page.mouse.move(box.x+Math.round(box.width*.5)+1,box.y+2)
> 11 |  const facts=page.locator('[data-testid="comparison-cursor-readout"] [data-source-distance]').first();await expect(facts).toBeVisible()
     |                                                                                                                           ^ Error: expect(locator).toBeVisible() failed
  12 |  const first=await facts.textContent()
  13 |  await page.evaluate(()=>{
  14 |   const state=window as Window&{__redundantSourceWrites?:string[]};state.__redundantSourceWrites=[]
  15 |   const observer=new MutationObserver(records=>{for(const record of records)if(record.type==='attributes')state.__redundantSourceWrites!.push(record.attributeName!)})
  16 |   for(const element of document.querySelectorAll('[aria-label^="Original observations for"]'))observer.observe(element,{subtree:true,attributes:true,attributeFilter:['hidden','title','aria-label','href']})
  17 |  })
  18 |  const before=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)
  19 |  await page.mouse.move(box.x+Math.round(box.width*.5)+2,box.y+2)
  20 |  await page.waitForFunction(seq=>window.__soupEvidence!.acceptedHoverSeq>seq,before)
  21 |  await expect(facts).not.toHaveText(first!)
  22 |  expect(await page.evaluate(()=>(window as Window&{__redundantSourceWrites?:string[]}).__redundantSourceWrites)).toEqual([])
  23 | })
  24 | 
```