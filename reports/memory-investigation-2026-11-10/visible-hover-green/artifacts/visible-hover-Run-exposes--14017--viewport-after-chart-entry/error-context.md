# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visible-hover.spec.ts >> Run exposes actual step and all metric cells inside the viewport after chart entry
- Location: e2e\visible-hover.spec.ts:3:38

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('cursor-readout-loss').locator('.chart-hover-value')
Expected pattern: /\d+/
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" getByTestId('cursor-readout-loss').locator('.chart-hover-value') with timeout 5000ms
  - waiting for getByTestId('cursor-readout-loss').locator('.chart-hover-value')

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
  - link "← All training runs":
    - /url: /runs
  - heading "kazakh-sft-005" [level=1]
  - paragraph: Qwen2.5-3B · DPO · Running · Snapshot Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
  - text: Demo snapshot · Smoothing off
  - navigation "Run sections":
    - button "Metrics" [pressed]
    - button "Data quality"
    - button "Source"
    - button "Run information"
  - term: Latest loss
  - definition: "0.201573"
  - definition: Highest recorded step 999,999
  - term: Minimum loss
  - definition: "0.200327"
  - definition: Whole snapshot · step 989,070
  - term: Peak loss
  - definition: "100.000"
  - definition: Whole snapshot · step 500,001
  - term: Raw observations
  - definition: 1,000,000
  - definition: Immutable source rows
  - paragraph: Stale source snapshot · older than 24 hours. Refreshing this demo does not change its source timestamp.
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
  - text: 3577 displayed
  - 'figure "Highlight kazakh-sft-005 0.238881 – 3.424044 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Original source values"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.238881 – 3.424044
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - region "Original source values":
      - paragraph: Original source values · All metrics
      - region "Source table":
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
      - paragraph: Scroll for more rows and metrics. Groups show the first 2 observations.
  - heading "Learning rate" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 892 displayed
  - 'figure "Highlight kazakh-sft-005 0E0 – 1.94974E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0E0 – 1.94974E-6
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
  - heading "Gradient norm" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 1689 displayed
  - 'figure "Highlight kazakh-sft-005 0.140007 – 0.239999 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"':
    - button "Highlight kazakh-sft-005": kazakh-sft-005
    - text: 0.140007 – 0.239999
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
  - paragraph: Source values remain unchanged. Whole-run cards do not change with zoom.
  - paragraph: Demo snapshot. No live training or automatic stopping recommendation.
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