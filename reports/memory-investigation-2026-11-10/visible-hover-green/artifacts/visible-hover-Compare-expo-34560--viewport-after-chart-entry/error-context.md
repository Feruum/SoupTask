# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visible-hover.spec.ts >> Compare exposes actual step and all metric cells inside the viewport after chart entry
- Location: e2e\visible-hover.spec.ts:3:38

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('comparison-cursor-readout').locator('.chart-hover-value')
Expected pattern: /\d+/
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" getByTestId('comparison-cursor-readout').locator('.chart-hover-value') with timeout 5000ms
  - waiting for getByTestId('comparison-cursor-readout').locator('.chart-hover-value')

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
    - spinbutton "From step": "0"
    - text: To step
    - spinbutton "To step": "8191"
    - button "Apply range"
    - button "Zoom in"
    - button "Zoom out"
    - button "Reset view"
    - paragraph: Step 0 to 8,191
  - heading "Loss" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 10994 displayed
  - 'figure "Highlight kazakh-sft-005 0.238881 – 3.424044 Highlight kazakh-sft-001 0.23887 – 3.431808 Highlight kazakh-sft-002 0.454091 – 3.417161 Highlight kazakh-sft-006 0.238795 – 3.416736 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero. Inspect data quality . Compared source values"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.238881 – 3.424044
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: 0.23887 – 3.431808
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: 0.454091 – 3.417161
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: 0.238795 – 3.416736
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
  - text: 2483 displayed
  - 'figure "Highlight kazakh-sft-005 0E0 – 1.94974E-6 Highlight kazakh-sft-001 0E0 – 1.83323E-5 Highlight kazakh-sft-002 0E0 – 1.83323E-5 Highlight kazakh-sft-006 0E0 – 1.83323E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0E0 – 1.94974E-6
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: 0E0 – 1.83323E-5
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: 0E0 – 1.83323E-5
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: 0E0 – 1.83323E-5
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
  - heading "Gradient norm" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 4794 displayed
  - 'figure "Highlight kazakh-sft-005 0.140007 – 0.239999 Highlight kazakh-sft-001 0.140004 – 0.239962 Highlight kazakh-sft-002 0.140024 – 0.239986 Highlight kazakh-sft-006 0.140005 – 0.239992 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.140007 – 0.239999
    - button "Highlight kazakh-sft-001": kazakh-sft-001
    - text: 0.140004 – 0.239962
    - button "Highlight kazakh-sft-002": kazakh-sft-002
    - text: 0.140024 – 0.239986
    - button "Highlight kazakh-sft-006": kazakh-sft-006
    - text: 0.140005 – 0.239992
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
  1  | import {expect,test} from '@playwright/test'
  2  | 
  3  | for(const comparison of [false,true])test(`${comparison?'Compare':'Run'} exposes actual step and all metric cells inside the viewport after chart entry`,async({page},info)=>{
  4  |  await page.setViewportSize({width:1440,height:900})
  5  |  await page.goto(comparison?'/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006':'/runs/kazakh-sft-005')
  6  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  7  |  await page.getByLabel('From step',{exact:true}).fill('0')
  8  |  await page.getByLabel('To step',{exact:true}).fill('8191')
  9  |  await page.getByRole('button',{name:'Apply range',exact:true}).click()
  10 |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  11 |  const plot=page.getByTestId(comparison?'comparison-loss':'loss-chart').locator('.u-over')
  12 |  await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  13 |  await page.mouse.move(box!.x+box!.width*.45,box!.y+box!.height*.5)
  14 |  const readout=page.getByTestId(comparison?'comparison-cursor-readout':'cursor-readout-loss')
> 15 |  await expect(readout.locator('.chart-hover-value')).toHaveAttribute('data-hover-seq',/\d+/)
     |                                                      ^ Error: expect(locator).toHaveAttribute(expected) failed
  16 |  const cells=await readout.locator('tbody').evaluateAll(bodies=>bodies.flatMap(body=>{
  17 |   const row=body.querySelector('tr:not([hidden])')!
  18 |   return [...row.querySelectorAll('td')].slice(0,4).map(cell=>{
  19 |    const range=document.createRange();range.selectNodeContents(cell);const rect=range.getBoundingClientRect()
  20 |    let left=0,top=0,right=innerWidth,bottom=innerHeight
  21 |    for(let parent:Element|null=cell.parentElement;parent;parent=parent.parentElement){
  22 |     const css=getComputedStyle(parent),bounds=parent.getBoundingClientRect()
  23 |     if(/auto|scroll|hidden|clip/.test(css.overflowX)||/paint|strict|content/.test(css.contain)){left=Math.max(left,bounds.left+parent.clientLeft);right=Math.min(right,bounds.left+parent.clientLeft+parent.clientWidth)}
  24 |     if(/auto|scroll|hidden|clip/.test(css.overflowY)||/paint|strict|content/.test(css.contain)){top=Math.max(top,bounds.top+parent.clientTop);bottom=Math.min(bottom,bounds.top+parent.clientTop+parent.clientHeight)}
  25 |    }
  26 |    const hit=document.elementFromPoint((rect.left+rect.right)/2,(rect.top+rect.bottom)/2)
  27 |    return{text:cell.textContent,rect:rect.toJSON(),clip:{left,top,right,bottom},visible:rect.width>0&&rect.height>0&&rect.left>=left&&rect.right<=right&&rect.top>=top&&rect.bottom<=bottom&&!!hit&&cell.contains(hit)}
  28 |   })
  29 |  }))
  30 |  await info.attach('actual-source-cell-visibility',{body:JSON.stringify(cells),contentType:'application/json'})
  31 |  expect(cells).toHaveLength(comparison?16:4)
  32 |  expect(cells.every(cell=>cell.visible),'Every actual-step and metric text must be on screen, unclipped and unobscured').toBe(true)
  33 |  await page.screenshot({path:info.outputPath('visible-source-values.png')})
  34 | })
  35 | 
```