# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shared-readout.spec.ts >> shared readout preserves NaN, duplicate provenance and contained scrolling: dark 1440
- Location: e2e\shared-readout.spec.ts:34:67

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('region', { name: 'Compared source values', exact: true }).locator('tbody[aria-label="Original observations for kazakh-sft-009"]').getByRole('button', { name: 'Pin row 99', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('region', { name: 'Compared source values', exact: true }).locator('tbody[aria-label="Original observations for kazakh-sft-009"]').getByRole('button', { name: 'Pin row 99', exact: true }) with timeout 5000ms
  - waiting for getByRole('region', { name: 'Compared source values', exact: true }).locator('tbody[aria-label="Original observations for kazakh-sft-009"]').getByRole('button', { name: 'Pin row 99', exact: true })

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
  - paragraph: 2 runs selected · Aligned by original recorded step
  - text: Demo snapshot · Smoothing off
  - complementary:
    - group:
      - heading "Selected runs" [level=2]
      - text: Search runs
      - searchbox "Search runs"
      - group "Choose up to four runs":
        - text: Choose up to four runs
        - checkbox "Compare kazakh-sft-001"
        - text: kazakh-sft-001 Qwen2.5-1.5B · Running
        - checkbox "Compare kazakh-sft-002"
        - text: kazakh-sft-002 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-003"
        - text: kazakh-sft-003 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-004"
        - text: kazakh-sft-004 Qwen2.5-1.5B · Failed
        - checkbox "Compare kazakh-sft-005"
        - text: kazakh-sft-005 Qwen2.5-3B · Running
        - checkbox "Compare kazakh-sft-006"
        - text: kazakh-sft-006 Qwen2.5-3B · Running
        - checkbox "Compare kazakh-sft-007"
        - text: kazakh-sft-007 Qwen2.5-1.5B · Completed
        - checkbox "Compare kazakh-sft-008"
        - text: kazakh-sft-008 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-009" [checked]
        - text: kazakh-sft-009 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-010"
        - text: kazakh-sft-010 Qwen2.5-1.5B · Running
        - checkbox "Compare kazakh-sft-011"
        - text: kazakh-sft-011 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-012"
        - text: kazakh-sft-012 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-013"
        - text: kazakh-sft-013 Qwen2.5-1.5B · Completed
        - checkbox "Compare kazakh-sft-014"
        - text: kazakh-sft-014 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-015"
        - text: kazakh-sft-015 Qwen2.5-3B · Completed
        - checkbox "Compare kazakh-sft-016"
        - text: kazakh-sft-016 Qwen2.5-1.5B · Completed
        - checkbox "Compare kazakh-sft-017" [checked]
        - text: kazakh-sft-017 Qwen2.5-3B · Failed
        - checkbox "Compare kazakh-sft-018"
        - text: kazakh-sft-018 Qwen2.5-3B · Cancelled
        - checkbox "Compare kazakh-sft-019"
        - text: kazakh-sft-019 Qwen2.5-1.5B · Completed
        - checkbox "Compare kazakh-sft-020"
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
    - spinbutton "To step": "110"
    - button "Apply range"
    - button "Zoom in"
    - button "Zoom out"
    - button "Reset view"
    - paragraph: Step 0 to 110
  - heading "Loss" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 211 displayed
  - 'figure "Highlight kazakh-sft-009 1.743902 – 3.430801 Highlight kazakh-sft-017 1.731237 – 8.000 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-017 · This snapshot contains 1 NaN observation; recorded invalid values create gaps, never zero. Inspect data quality . Compared source values"':
    - button "Highlight kazakh-sft-009": kazakh-sft-009
    - text: 1.743902 – 3.430801
    - button "Highlight kazakh-sft-017": kazakh-sft-017
    - text: 1.731237 – 8.000
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - paragraph:
      - text: kazakh-sft-017 · This snapshot contains 1 NaN observation; recorded invalid values create gaps, never zero.
      - link "Inspect data quality":
        - /url: /data-quality?run=kazakh-sft-017&metric=loss
      - text: .
    - region "Compared source values":
      - paragraph: Cursor step 99.028497 · All metrics
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
        - rowgroup "Original observations for kazakh-sft-009":
          - row "kazakh-sft-009 No recorded value at this cursor location.":
            - rowheader "kazakh-sft-009":
              - strong: kazakh-sft-009
            - cell "No recorded value at this cursor location."
        - rowgroup "Original observations for kazakh-sft-017":
          - row "kazakh-sft-017 99 1.834674 2.86569E-6 0.220509 0.028497 Pin row 99":
            - rowheader "kazakh-sft-017":
              - strong: kazakh-sft-017
            - cell "99"
            - cell "1.834674"
            - cell "2.86569E-6"
            - cell "0.220509"
            - cell "0.028497"
            - cell "Pin row 99":
              - button "Pin row 99": Pin row
  - heading "Learning rate" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 211 displayed
  - 'figure "Highlight kazakh-sft-009 0E0 – 3.17977E-6 Highlight kazakh-sft-017 0E0 – 3.17977E-6 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-017 · This snapshot contains 1 +Infinity observation; recorded invalid values create gaps, never zero. Inspect data quality ."':
    - button "Highlight kazakh-sft-009": kazakh-sft-009
    - text: 0E0 – 3.17977E-6
    - button "Highlight kazakh-sft-017": kazakh-sft-017
    - text: 0E0 – 3.17977E-6
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - paragraph:
      - text: kazakh-sft-017 · This snapshot contains 1 +Infinity observation; recorded invalid values create gaps, never zero.
      - link "Inspect data quality":
        - /url: /data-quality?run=kazakh-sft-017&metric=lr
      - text: .
  - heading "Gradient norm" [level=2]
  - paragraph: Recorded step · Linear scale · Original values
  - text: 211 displayed
  - 'figure "Highlight kazakh-sft-009 0.140495 – 0.237536 Highlight kazakh-sft-017 0.141035 – 0.239695 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range kazakh-sft-017 · This snapshot contains 1 −Infinity observation; recorded invalid values create gaps, never zero. Inspect data quality ."':
    - button "Highlight kazakh-sft-009": kazakh-sft-009
    - text: 0.140495 – 0.237536
    - button "Highlight kazakh-sft-017": kazakh-sft-017
    - text: 0.141035 – 0.239695
    - paragraph: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
    - paragraph:
      - text: kazakh-sft-017 · This snapshot contains 1 −Infinity observation; recorded invalid values create gaps, never zero.
      - link "Inspect data quality":
        - /url: /data-quality?run=kazakh-sft-017&metric=grad_norm
      - text: .
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
        - row "kazakh-sft-009 0.256026 step 8,191 0.238756 step 8,177 3.430801 step 0 8,192 raw rows 8,192 finite Loss observations 0 invalid observations 0 conflicting groups · 1 known gaps":
          - rowheader "kazakh-sft-009":
            - link "kazakh-sft-009":
              - /url: /runs/kazakh-sft-009
          - cell "0.256026 step 8,191":
            - strong: "0.256026"
            - text: step 8,191
          - cell "0.238756 step 8,177":
            - strong: "0.238756"
            - text: step 8,177
          - cell "3.430801 step 0":
            - strong: "3.430801"
            - text: step 0
          - cell "8,192 raw rows 8,192 finite Loss observations"
          - cell "0 invalid observations 0 conflicting groups · 1 known gaps":
            - link "0 invalid observations":
              - /url: /data-quality?run=kazakh-sft-009&metric=loss
            - text: 0 conflicting groups · 1 known gaps
        - row "kazakh-sft-017 0.262553 step 8,191 0.238932 step 8,163 8.000 step 40 8,192 raw rows 8,191 finite Loss observations 1 invalid observations 1 conflicting groups · 1 known gaps":
          - rowheader "kazakh-sft-017":
            - link "kazakh-sft-017":
              - /url: /runs/kazakh-sft-017
          - cell "0.262553 step 8,191":
            - strong: "0.262553"
            - text: step 8,191
          - cell "0.238932 step 8,163":
            - strong: "0.238932"
            - text: step 8,163
          - cell "8.000 step 40":
            - strong: "8.000"
            - text: step 40
          - cell "8,192 raw rows 8,191 finite Loss observations"
          - cell "1 invalid observations 1 conflicting groups · 1 known gaps":
            - link "1 invalid observations":
              - /url: /data-quality?run=kazakh-sft-017&metric=loss
            - text: 1 conflicting groups · 1 known gaps
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('Compare has one shared original-row table with every metric and exact Pin provenance',async({page})=>{
  4  |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
  5  |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  6  |  await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200')
  7  |  await page.getByRole('button',{name:'Apply range',exact:true}).click()
  8  |  await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-range-min','100')
  9  |  const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded();await surface.hover({position:{x:120,y:100}})
  10 |  const region=page.getByRole('region',{name:'Compared source values',exact:true})
  11 |  await expect(region).toHaveCount(1)
  12 |  await expect(page.locator('.chart-hover-value')).toHaveCount(1)
  13 |  const table=region.getByRole('table',{name:'Original observations at cursor step',exact:true})
  14 |  for(const name of ['Run','Recorded step','Loss','Learning rate','Gradient norm','Δstep','Source'])await expect(table.getByRole('columnheader',{name,exact:true})).toBeVisible()
  15 |  const row=table.getByRole('row').filter({has:page.getByRole('button',{name:/Pin row/})}).filter({hasText:'kazakh-sft-005'}).first()
  16 |  await expect(row).toBeVisible()
  17 |  const loss=(await row.locator('[data-source-metric="loss"]').getAttribute('title'))!.replace('Exact source value ','')
  18 |  const lr=(await row.locator('[data-source-metric="lr"]').getAttribute('title'))!.replace('Exact source value ','')
  19 |  const grad=(await row.locator('[data-source-metric="grad_norm"]').getAttribute('title'))!.replace('Exact source value ','')
  20 |  await page.locator('[data-testid="comparison-loss"]').locator('..').locator('..').getByRole('button',{name:'Highlight kazakh-sft-005',exact:true}).focus()
  21 |  const reached=new Set<string>()
  22 |  for(let index=0;index<35&&reached.size<4;index++){
  23 |   await page.keyboard.press('Tab')
  24 |   const focused=await page.evaluate(()=>{const node=document.activeElement as HTMLElement|null;if(!node?.getAttribute('aria-label')?.startsWith('Pin row'))return null;const box=node.getBoundingClientRect();return{run:node.closest('tbody')?.getAttribute('aria-label'),visible:box.width>0&&box.height>0&&box.top<innerHeight&&box.bottom>0}})
  25 |   if(focused?.run){expect(focused.visible).toBe(true);reached.add(focused.run)}
  26 |  }
  27 |  expect(reached.size,'Tab reaches every compared run source action').toBe(4)
  28 |  await row.getByRole('button',{name:/Pin row/}).click()
  29 |  await expect(page.getByTestId('pinned-loss')).toHaveText(loss)
  30 |  await expect(page.getByTestId('pinned-lr')).toHaveText(lr)
  31 |  await expect(page.getByTestId('pinned-grad_norm')).toHaveText(grad)
  32 | })
  33 | 
  34 | for(const [theme,width] of [['dark',1440],['light',320]] as const)test(`shared readout preserves NaN, duplicate provenance and contained scrolling: ${theme} ${width}`,async({page})=>{
  35 |  await page.setViewportSize({width,height:900});await page.addInitScript(theme=>localStorage.setItem('soup-theme',theme),theme)
  36 |  await page.goto('/compare?runs=kazakh-sft-009,kazakh-sft-017')
  37 |  await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
  38 |  if(width<761)await page.locator('.range-disclosure > summary').click()
  39 |  await page.getByLabel('From step',{exact:true}).fill('0');await page.getByLabel('To step',{exact:true}).fill('110');await page.getByRole('button',{name:'Apply range',exact:true}).click()
  40 |  await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-range-max','110')
  41 |  const surface=page.locator('[data-testid="comparison-loss"] .u-over'),region=page.getByRole('region',{name:'Compared source values',exact:true})
  42 |  async function point(step:number){await surface.scrollIntoViewIfNeeded();const box=(await surface.boundingBox())!;const before=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq);await page.mouse.move(box.x+box.width*step/110,box.y+2);await page.waitForFunction(seq=>window.__soupEvidence!.acceptedHoverSeq>seq,before)}
  43 |  await point(10)
  44 |  await expect(region.locator('tbody[aria-label="Original observations for kazakh-sft-017"] [data-source-metric="loss"]').first()).toHaveText('NaN')
  45 |  await point(99)
  46 |  const duplicate=region.locator('tbody[aria-label="Original observations for kazakh-sft-009"]')
> 47 |  await expect(duplicate.getByRole('button',{name:'Pin row 99',exact:true})).toBeVisible()
     |                                                                             ^ Error: expect(locator).toBeVisible() failed
  48 |  await expect(duplicate.getByRole('button',{name:'Pin row 100',exact:true})).toBeVisible()
  49 |  await expect(duplicate).toContainText('11 returned observations')
  50 |  await expect(duplicate.getByRole('link',{name:'Inspect full source group'})).toHaveAttribute('href',/step=99&revision=/)
  51 |  await region.scrollIntoViewIfNeeded()
  52 |  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  53 |  await region.screenshot({path:`reports/perf-targets-2026-11-10/shared-readout-${theme}-${width}.png`})
  54 | })
  55 | 
```