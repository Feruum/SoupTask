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

Locator: locator('[data-testid="cursor-readout-loss"] [title^="Exact source value"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('[data-testid="cursor-readout-loss"] [title^="Exact source value"]').first() with timeout 5000ms
  - waiting for locator('[data-testid="cursor-readout-loss"] [title^="Exact source value"]').first()

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
    - spinbutton "From step": "500001"
    - text: To step
    - spinbutton "To step": "500001"
    - button "Apply range"
    - button "Zoom in"
    - button "Zoom out"
    - button "Reset view"
    - paragraph: Step 500,001 to 500,001
  - heading "Loss" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 1 displayed
  - 'figure "Highlight kazakh-sft-005 100.000 – 100.000 Highlight kazakh-sft-001 Unavailable – Unavailable Highlight kazakh-sft-002 Unavailable – Unavailable Highlight kazakh-sft-006 Unavailable – Unavailable Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero. Inspect data quality . Loss source readout"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 100.000 – 100.000
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: Unavailable – Unavailable
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: Unavailable – Unavailable
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: Unavailable – Unavailable
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - paragraph: "kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline."
    - link "Inspect original spike":
      - /url: /runs/kazakh-sft-005?sourceIndex=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
    - button "Zoom around spike"
    - paragraph:
      - text: kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero.
      - link "Inspect data quality":
        - /url: /data-quality?run=kazakh-sft-006&metric=loss
      - text: .
    - region "Loss source readout":
      - paragraph: Cursor step 499,801.653196
      - strong: kazakh-sft-005
      - region "Original observations for kazakh-sft-005":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-001
      - region "Original observations for kazakh-sft-001":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-002
      - region "Original observations for kazakh-sft-002":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-006
      - region "Original observations for kazakh-sft-006":
        - paragraph: No recorded value at this cursor location.
  - heading "Learning rate" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 1 displayed
  - 'figure "Highlight kazakh-sft-005 9.99997E-6 – 9.99997E-6 Highlight kazakh-sft-001 Unavailable – Unavailable Highlight kazakh-sft-002 Unavailable – Unavailable Highlight kazakh-sft-006 Unavailable – Unavailable Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 9.99997E-6 – 9.99997E-6
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: Unavailable – Unavailable
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: Unavailable – Unavailable
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: Unavailable – Unavailable
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - region "Learning rate source readout":
      - paragraph: Cursor step 499,801.653196
      - strong: kazakh-sft-005
      - region "Original observations for kazakh-sft-005":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-001
      - region "Original observations for kazakh-sft-001":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-002
      - region "Original observations for kazakh-sft-002":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-006
      - region "Original observations for kazakh-sft-006":
        - paragraph: No recorded value at this cursor location.
  - heading "Gradient norm" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 1 displayed
  - 'figure "Highlight kazakh-sft-005 0.16854 – 0.16854 Highlight kazakh-sft-001 Unavailable – Unavailable Highlight kazakh-sft-002 Unavailable – Unavailable Highlight kazakh-sft-006 Unavailable – Unavailable Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.16854 – 0.16854
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: Unavailable – Unavailable
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: Unavailable – Unavailable
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: Unavailable – Unavailable
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - region "Gradient norm source readout":
      - paragraph: Cursor step 499,801.653196
      - strong: kazakh-sft-005
      - region "Original observations for kazakh-sft-005":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-001
      - region "Original observations for kazakh-sft-001":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-002
      - region "Original observations for kazakh-sft-002":
        - paragraph: No recorded value at this cursor location.
      - strong: kazakh-sft-006
      - region "Original observations for kazakh-sft-006":
        - paragraph: No recorded value at this cursor location.
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
  6  |  await page.getByLabel('From step',{exact:true}).fill('500001');await page.getByLabel('To step',{exact:true}).fill('500001')
  7  |  await page.getByRole('button',{name:'Apply range',exact:true}).click()
  8  |  await page.waitForFunction(()=>document.querySelector('.plot-host')?.getAttribute('data-range-min')==='500001'&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
  9  |  const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded();const box=(await surface.boundingBox())!
  10 |  await page.mouse.move(box.x+box.width*.3,box.y+box.height*.5)
> 11 |  const facts=page.locator('[data-testid="cursor-readout-loss"] [title^="Exact source value"]').first();await expect(facts).toBeVisible()
     |                                                                                                                            ^ Error: expect(locator).toBeVisible() failed
  12 |  const first=await facts.textContent()
  13 |  await page.evaluate(()=>{
  14 |   const state=window as Window&{__redundantSourceWrites?:string[]};state.__redundantSourceWrites=[]
  15 |   const observer=new MutationObserver(records=>{for(const record of records)if(record.type==='attributes')state.__redundantSourceWrites!.push(record.attributeName!)})
  16 |   for(const element of document.querySelectorAll('[aria-label^="Original observations for"]'))observer.observe(element,{subtree:true,attributes:true,attributeFilter:['hidden','title','aria-label','href']})
  17 |  })
  18 |  const before=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)
  19 |  await page.mouse.move(box.x+box.width*.7,box.y+box.height*.5)
  20 |  await page.waitForFunction(seq=>window.__soupEvidence!.acceptedHoverSeq>seq,before)
  21 |  await expect(facts).not.toHaveText(first!)
  22 |  expect(await page.evaluate(()=>(window as Window&{__redundantSourceWrites?:string[]}).__redundantSourceWrites)).toEqual([])
  23 | })
  24 | 
```