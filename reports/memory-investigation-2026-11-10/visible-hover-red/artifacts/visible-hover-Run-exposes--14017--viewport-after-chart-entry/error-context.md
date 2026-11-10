# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visible-hover.spec.ts >> Run exposes actual step and all metric cells inside the viewport after chart entry
- Location: e2e\visible-hover.spec.ts:3:38

# Error details

```
Error: Every actual-step and metric text must be on screen, unclipped and unobscured

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
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
      - link "Compare" [ref=e25] [cursor=pointer]:
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
      - link "← All training runs" [ref=e64] [cursor=pointer]:
        - /url: /runs
      - generic [ref=e65]:
        - generic [ref=e66]:
          - heading "kazakh-sft-005" [level=1] [ref=e67]
          - paragraph [ref=e68]: Qwen2.5-3B · DPO · Running · Snapshot Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
        - generic [ref=e69]: Demo snapshot · Smoothing off
      - navigation "Run sections" [ref=e70]:
        - button "Metrics" [pressed] [ref=e71] [cursor=pointer]
        - button "Data quality" [ref=e72] [cursor=pointer]
        - button "Source" [ref=e73] [cursor=pointer]
        - button "Run information" [ref=e74] [cursor=pointer]
      - generic [ref=e75]:
        - generic [ref=e76]:
          - term [ref=e77]: Latest loss
          - definition [ref=e78]: "0.201573"
          - definition [ref=e79]: Highest recorded step 999,999
        - generic [ref=e80]:
          - term [ref=e81]: Minimum loss
          - definition [ref=e82]: "0.200327"
          - definition [ref=e83]: Whole snapshot · step 989,070
        - generic [ref=e84]:
          - term [ref=e85]: Peak loss
          - definition [ref=e86]: "100.000"
          - definition [ref=e87]: Whole snapshot · step 500,001
        - generic [ref=e88]:
          - term [ref=e89]: Raw observations
          - definition [ref=e90]: 1,000,000
          - definition [ref=e91]: Immutable source rows
      - paragraph [ref=e92]: Stale source snapshot · older than 24 hours. Refreshing this demo does not change its source timestamp.
      - generic [ref=e93]:
        - group [ref=e94]:
          - generic [ref=e96]:
            - generic [ref=e97]:
              - generic [ref=e98]:
                - generic [ref=e99]: From step
                - spinbutton "From step" [ref=e100]: "0"
              - generic [ref=e101]:
                - generic [ref=e102]: To step
                - spinbutton "To step" [ref=e103]: "999999"
              - button "Apply range" [ref=e104] [cursor=pointer]
            - generic [ref=e108]:
              - button "Zoom in" [ref=e109] [cursor=pointer]
              - button "Zoom out" [ref=e113] [cursor=pointer]
              - button "Reset view" [ref=e117] [cursor=pointer]
            - paragraph [ref=e121]: Step 0 to 999,999
        - generic [ref=e122]:
          - generic [ref=e123]:
            - generic [ref=e124]:
              - generic [ref=e125]:
                - heading "Loss" [level=2] [ref=e126]
                - paragraph [ref=e127]: Recorded step · Linear scale · Original values
              - generic [ref=e128]: 4140 displayed
            - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike Original source values" [ref=e129]':
              - generic [ref=e139]:
                - generic [ref=e141]:
                  - button "Highlight kazakh-sft-005" [ref=e142] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e144]: 0.200327 – 100.000
                - paragraph [ref=e145]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - generic [ref=e147]:
                  - paragraph [ref=e148]: "Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline."
                  - generic [ref=e149]:
                    - link "Inspect original spike" [ref=e150] [cursor=pointer]:
                      - /url: /runs/kazakh-sft-005?sourceIndex=500001&revision=soup-1.0.0%3Aspike%401%3Aseed%3D42%3An%3D1000000%3Acadence%3D1
                    - button "Zoom around spike" [ref=e151] [cursor=pointer]
                - region "Original source values" [ref=e155]:
                  - generic [ref=e156]:
                    - paragraph [ref=e157]: Cursor step 450,191.12069 · All metrics
                    - region "Source table" [ref=e158]:
                      - table "Original observations at cursor step" [ref=e159]:
                        - caption [ref=e160]: Original observations at cursor step
                        - rowgroup [ref=e161]:
                          - row [ref=e162]:
                            - columnheader "Run" [ref=e163]
                            - columnheader "Recorded step" [ref=e164]
                            - columnheader "Loss" [ref=e165]
                            - columnheader "Learning rate" [ref=e166]
                            - columnheader "Gradient norm" [ref=e167]
                            - columnheader "Δstep" [ref=e168]
                            - columnheader "Source" [ref=e169]
                        - rowgroup "Original observations for kazakh-sft-005" [ref=e170]:
                          - row [ref=e171]:
                            - rowheader "kazakh-sft-005" [ref=e172]:
                              - strong [ref=e175]: kazakh-sft-005
                            - cell "450,191" [ref=e176]
                            - cell "0.212538" [ref=e177]
                            - cell "1.09962E-5" [ref=e178]
                            - cell "0.233396" [ref=e179]
                            - cell "0.12069" [ref=e180]
                            - cell [ref=e181]:
                              - button "Pin row 450191" [ref=e182] [cursor=pointer]: "Pin #450191"
                    - paragraph [ref=e183]: Scroll for more rows and metrics. Groups show the first 2 observations.
          - generic [ref=e184]:
            - generic [ref=e185]:
              - generic [ref=e186]:
                - heading "Learning rate" [level=2] [ref=e187]
                - paragraph [ref=e188]: Recorded step · Linear scale · Original values
              - generic [ref=e189]: 893 displayed
            - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e190]':
              - generic [ref=e200]:
                - generic [ref=e202]:
                  - button "Highlight kazakh-sft-005" [ref=e203] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e205]: 0E0 – 1.83333E-5
                - paragraph [ref=e206]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
          - generic [ref=e207]:
            - generic [ref=e208]:
              - generic [ref=e209]:
                - heading "Gradient norm" [level=2] [ref=e210]
                - paragraph [ref=e211]: Recorded step · Linear scale · Original values
              - generic [ref=e212]: 1784 displayed
            - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range" [ref=e213]':
              - generic [ref=e223]:
                - generic [ref=e225]:
                  - button "Highlight kazakh-sft-005" [ref=e226] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e228]: 0.140 – 0.240
                - paragraph [ref=e229]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
        - paragraph [ref=e230]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e231]: Demo snapshot. No live training or automatic stopping recommendation.
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
  27 |  expect(cells).toHaveLength(comparison?16:4)
> 28 |  expect(cells.every(cell=>cell.visible),'Every actual-step and metric text must be on screen, unclipped and unobscured').toBe(true)
     |                                                                                                                          ^ Error: Every actual-step and metric text must be on screen, unclipped and unobscured
  29 |  await page.screenshot({path:info.outputPath('visible-source-values.png')})
  30 | })
  31 | 
```