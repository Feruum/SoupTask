# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visible-hover.spec.ts >> source layout ownership changes only with workspace membership and cleans up on departure
- Location: e2e\visible-hover.spec.ts:124:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('#main-content')
Expected: "4"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" locator('#main-content') with timeout 5000ms
  - waiting for locator('#main-content')
    11 × locator resolved to <main tabindex="-1" id="main-content" class="page-content">…</main>
       - unexpected value "null"

```

```yaml
- main:
  - heading "Compare runs" [level=1]
  - paragraph: 4 runs selected · Aligned by original recorded step
  - text: Demo snapshot · Smoothing off
  - complementary
  - navigation "Visible metrics"
  - group
  - heading "Loss" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 3136 displayed
  - 'figure "Highlight kazakh-sft-005 0.200327 – 100.000 Highlight kazakh-sft-001 0.23887 – 3.431808 Highlight kazakh-sft-002 0.454091 – 3.417161 Highlight kazakh-sft-006 0.238795 – 3.416736 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-005 · Recorded spike: loss 100 at step 500,001. The linear scale includes this peak, so smaller measurements appear near the baseline. Inspect original spike Zoom around spike kazakh-sft-006 · This snapshot contains 2 NaN observations; recorded invalid values create gaps, never zero. Inspect data quality . Compared source values"'
  - heading "Learning rate" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 642 displayed
  - 'figure "Highlight kazakh-sft-005 0E0 – 1.83333E-5 Highlight kazakh-sft-001 0E0 – 1.83323E-5 Highlight kazakh-sft-002 0E0 – 1.83323E-5 Highlight kazakh-sft-006 0E0 – 1.83323E-5 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"'
  - heading "Gradient norm" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 1276 displayed
  - 'figure "Highlight kazakh-sft-005 0.140 – 0.240 Highlight kazakh-sft-001 0.140004 – 0.239962 Highlight kazakh-sft-002 0.140024 – 0.239986 Highlight kazakh-sft-006 0.140005 – 0.239992 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"'
  - group
```

# Test source

```ts
  28  |    const hit=document.elementFromPoint((rect.left+rect.right)/2,(rect.top+rect.bottom)/2)
  29  |    return{text:cell.textContent,rect:rect.toJSON(),clip:{left,top,right,bottom},visible:rect.width>0&&rect.height>0&&rect.left>=left&&rect.right<=right&&rect.top>=top&&rect.bottom<=bottom&&!!hit&&cell.contains(hit)}
  30  |   })
  31  |  }))
  32  |  await info.attach('actual-source-cell-visibility',{body:JSON.stringify(cells),contentType:'application/json'})
  33  |  expect(cells).toHaveLength(comparison?16:4)
  34  |  expect(cells.every(cell=>cell.visible),'Every actual-step and metric text must be on screen, unclipped and unobscured').toBe(true)
  35  |  await page.screenshot({path:info.outputPath('visible-source-values.png')})
  36  | })
  37  | 
  38  | for(const fault of ['offscreen','clipped','occluded'])test(`visible-frame acknowledgement rejects ${fault} source cells`,async({page})=>{
  39  |  await page.setViewportSize({width:1440,height:900})
  40  |  await page.goto('/runs/kazakh-sft-005')
  41  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  42  |  const plot=page.getByTestId('loss-chart').locator('.u-over')
  43  |  await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  44  |  await page.evaluate(kind=>{
  45  |   const rail=document.querySelector<HTMLElement>('[data-testid="cursor-readout-loss"]')!
  46  |   if(kind==='offscreen')rail.style.transform='translateY(100vh)'
  47  |   else if(kind==='clipped'){const content=rail.firstElementChild as HTMLElement;content.style.width='40px';content.style.overflow='hidden'}
  48  |   else{const overlay=document.createElement('div');overlay.id='visibility-fault';const bounds=rail.getBoundingClientRect();Object.assign(overlay.style,{position:'fixed',zIndex:'99',left:`${bounds.left}px`,top:`${bounds.top}px`,width:`${bounds.width}px`,height:`${bounds.height}px`,background:'black'});document.body.append(overlay)}
  49  |  },fault)
  50  |  await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
  51  |  await page.waitForFunction(()=>performance.getEntriesByName('soup:hover-not-visible').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))
  52  |  expect(await page.evaluate(()=>performance.getEntriesByName('soup:hover-frame').some(entry=>(entry as PerformanceMark).detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq))).toBe(false)
  53  | })
  54  | 
  55  | test('moving to another original row reuses source text nodes instead of replacing the layout subtree',async({page})=>{
  56  |  await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
  57  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  58  |  const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  59  |  await page.mouse.move(box!.x+box!.width*.3,box!.y+box!.height*.5)
  60  |  const step=page.locator('[data-source-step]').first();await expect(step).not.toBeEmpty()
  61  |  const previous=await step.textContent(),leaf=await step.evaluateHandle(node=>node.firstChild)
  62  |  await page.mouse.move(box!.x+box!.width*.6,box!.y+box!.height*.5)
  63  |  await expect(step).not.toHaveText(previous!)
  64  |  expect(await step.evaluate((node,old)=>node.firstChild===old,leaf),'changed source text should mutate its existing Text node').toBe(true)
  65  |  await leaf.dispose()
  66  | })
  67  | 
  68  | test('native crosshair hides on leave without removing its layout geometry',async({page})=>{
  69  |  await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
  70  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  71  |  const plot=page.getByTestId('loss-chart'),over=plot.locator('.u-over');await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
  72  |  await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
  73  |  const crosshairs=plot.locator('.u-cursor-x,.u-cursor-y');await expect(crosshairs).toHaveCount(2)
  74  |  for(const cursor of await crosshairs.all())await expect(cursor).toBeVisible()
  75  |  await page.mouse.move(30,30)
  76  |  for(const cursor of await crosshairs.all()){
  77  |   await expect(cursor).toBeHidden()
  78  |   expect(await cursor.evaluate(node=>getComputedStyle(node).display),'leaving must not remove native cursor nodes from layout').not.toBe('none')
  79  |  }
  80  | })
  81  | 
  82  | test('source DOM writes wait for the next frame and commit before both paint checks',async({page})=>{
  83  |  await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
  84  |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  85  |  const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  86  |  await page.mouse.move(box!.x+box!.width*.3,box!.y+box!.height*.5)
  87  |  const step=page.locator('[data-source-step]').first();await expect(step).not.toBeEmpty()
  88  |  const previous=await step.textContent(),sequence=await page.evaluate(()=>window.__soupEvidence?.acceptedHoverSeq??0),pin=page.getByTestId('cursor-readout-loss').getByRole('button',{name:/^Pin row /}).first(),pinName=await pin.getAttribute('aria-label')
  89  |  await page.evaluate(()=>{
  90  |   const originalRequest=requestAnimationFrame,originalCancel=cancelAnimationFrame,queued=new Map<number,FrameRequestCallback>();let id=100000
  91  |   window.requestAnimationFrame=callback=>{queued.set(++id,callback);return id};window.cancelAnimationFrame=token=>{queued.delete(token)}
  92  |   Object.assign(window,{__releaseSourceFrames:()=>{window.requestAnimationFrame=originalRequest;window.cancelAnimationFrame=originalCancel;for(const callback of queued.values())originalRequest(callback);queued.clear()}})
  93  |  })
  94  |  try{
  95  |   await page.mouse.move(box!.x+box!.width*.6,box!.y+box!.height*.5)
  96  |   await page.waitForFunction(previous=>(window.__soupEvidence?.acceptedHoverSeq??0)>previous,sequence,{polling:20})
  97  |   expect(await step.textContent(),'accepted cursor data should not dirty layout before native pointer-entry reads').toBe(previous)
  98  |   // A click must pin the row actually labelled in the DOM, even while newer data waits.
  99  |   await pin.evaluate(button=>(button as HTMLButtonElement).click())
  100 |  }finally{await page.evaluate(()=>(window as unknown as Window&{__releaseSourceFrames:()=>void}).__releaseSourceFrames())}
  101 |  await expect(step).not.toHaveText(previous!)
  102 |  await expect(page.locator('.pinned-source')).toContainText(`sourceIndex ${pinName!.replace('Pin row ','')}`)
  103 |  await page.waitForFunction(()=>{
  104 |   const frame=performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark|undefined,commit=performance.getEntriesByName('soup:hover-dom-commit').at(-1)
  105 |   return !!frame&&frame.detail.hoverSeq===window.__soupEvidence?.acceptedHoverSeq&&!!commit&&commit.startTime<=frame.detail.firstCheckedAt&&frame.detail.firstCheckedAt<frame.startTime
  106 |  })
  107 | })
  108 | 
  109 | test('Pin works when the same source identity reappears after a view reset',async({page})=>{
  110 |  await page.setViewportSize({width:1440,height:900});await page.goto('/runs/kazakh-sft-005')
  111 |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
  112 |  for(let round=0;round<2;round++){
  113 |   const before=await page.evaluate(()=>window.__soupEvidence?.viewSeq??0)
  114 |   await page.getByLabel('From step',{exact:true}).fill('500001');await page.getByLabel('To step',{exact:true}).fill('500001');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  115 |   await page.waitForFunction(previous=>(window.__soupEvidence?.viewSeq??0)>previous&&!!document.querySelector('.metric-grid[data-view-ready="true"]'),before)
  116 |   const plot=page.getByTestId('loss-chart').locator('.u-over');await plot.scrollIntoViewIfNeeded();const box=await plot.boundingBox();expect(box).not.toBeNull()
  117 |   await page.mouse.move(box!.x+box!.width*.5,box!.y+box!.height*.5)
  118 |   await expect(page.getByRole('button',{name:'Pin row 500001',exact:true})).toBeVisible()
  119 |  }
  120 |  await page.getByRole('button',{name:'Pin row 500001',exact:true}).click()
  121 |  await expect(page.getByTestId('pinned-loss')).toHaveText('100')
  122 | })
  123 | 
  124 | test('source layout ownership changes only with workspace membership and cleans up on departure',async({page})=>{
  125 |  await page.setViewportSize({width:1440,height:900})
  126 |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  127 |  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true')
> 128 |  const main=page.locator('#main-content');await expect(main).toHaveAttribute('data-source-dock-members','4')
      |                                                              ^ Error: expect(locator).toHaveAttribute(expected) failed
  129 |  const mode=await main.getAttribute('data-source-dock-owner')
  130 |  const over=page.getByTestId('comparison-loss').locator('.u-over');await over.scrollIntoViewIfNeeded();const box=await over.boundingBox();expect(box).not.toBeNull()
  131 |  await page.mouse.move(box!.x+box!.width*.4,box!.y+box!.height*.5)
  132 |  await expect(main).toHaveAttribute('data-source-dock-owner',mode!)
  133 |  await page.getByRole('checkbox',{name:'Compare kazakh-sft-006',exact:true}).uncheck()
  134 |  await expect(main).toHaveAttribute('data-source-dock-members','3')
  135 |  await page.getByRole('link',{name:'Data quality',exact:true}).click()
  136 |  await expect(page.locator('h1')).toHaveText('Data quality')
  137 |  await expect(main).not.toHaveAttribute('data-source-dock-members')
  138 |  await expect(main).not.toHaveAttribute('data-source-dock-owner')
  139 |  expect(await main.evaluate(node=>getComputedStyle(node).overflowY)).toBe('visible')
  140 | })
  141 | 
```