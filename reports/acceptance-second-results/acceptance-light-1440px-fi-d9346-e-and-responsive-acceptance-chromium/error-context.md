# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance.spec.ts >> light 1440px five-screen axe and responsive acceptance
- Location: e2e\acceptance.spec.ts:51:76

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 64

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#e0e9e5",
+               "contrastRatio": 4.37,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#24766a",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.37 (foreground color: #24766a, background color: #e0e9e5, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<span class=\"status-pill status-running\">Running</span>",
+                 "target": Array [
+                   ".status-pill",
+                 ],
+               },
+               Object {
+                 "html": "<section class=\"source-panel selected-experiment\">",
+                 "target": Array [
+                   ".selected-experiment",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.37 (foreground color: #24766a, background color: #e0e9e5, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"status-pill status-running\">Running</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".status-pill",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
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
      - link "Training runs" [ref=e21] [cursor=pointer]:
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
        - button "Switch to dark theme" [ref=e51] [cursor=pointer]
    - main [ref=e59]:
      - generic [ref=e60]:
        - generic [ref=e61]:
          - paragraph [ref=e62]: SOUP / EXPERIMENT WORKSPACE
          - heading "Workspace overview" [level=1] [ref=e63]
          - paragraph [ref=e64]: qwen-kazakh · Twenty reproducible experiments, one source of truth.
        - generic [ref=e65]: Demo snapshot · Smoothing off
      - generic [ref=e66]:
        - generic [ref=e67]:
          - term [ref=e68]: Training runs
          - definition [ref=e69]: "20"
          - definition [ref=e70]: Seeded snapshots
        - generic [ref=e71]:
          - term [ref=e72]: Running
          - definition [ref=e73]: "4"
          - definition [ref=e74]: Fixture execution status
        - generic [ref=e75]:
          - term [ref=e76]: Need attention
          - definition [ref=e77]: "8"
          - definition [ref=e78]: Runs with source findings
        - generic [ref=e79]:
          - term [ref=e80]: Raw observations
          - definition [ref=e81]: 1,147,457
          - definition [ref=e82]: Four numeric columns
      - generic [ref=e83]:
        - generic [ref=e84]:
          - generic [ref=e85]:
            - generic [ref=e86]:
              - heading "Experiment constellation" [level=2] [ref=e87]
              - paragraph [ref=e88]: Each sector is a run. Rings represent metric quality.
            - generic [ref=e89]: 20 × 3
          - img "Quality map of twenty training runs Three rings represent Loss, Learning rate and Gradient norm. Teal means no metric findings, amber indicates findings. Use the run selector or accessible table for exact counts." [ref=e90]:
            - generic "kazakh-sft-001 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e95]
            - generic "kazakh-sft-001 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e96]
            - generic "kazakh-sft-001 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e97]
            - generic "kazakh-sft-002 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e98]
            - generic "kazakh-sft-002 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e99]
            - generic "kazakh-sft-002 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e100]
            - generic "kazakh-sft-003 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e101]
            - generic "kazakh-sft-003 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e102]
            - generic "kazakh-sft-003 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e103]
            - generic "kazakh-sft-004 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e104]
            - generic "kazakh-sft-004 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e105]
            - generic "kazakh-sft-004 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e106]
            - generic "kazakh-sft-005 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e107]
            - generic "kazakh-sft-005 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e108]
            - generic "kazakh-sft-005 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e109]
            - generic "kazakh-sft-006 · Loss · 2 invalid · 0 conflicts · 0 gaps" [ref=e110]
            - generic "kazakh-sft-006 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e111]
            - generic "kazakh-sft-006 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e112]
            - generic "kazakh-sft-007 · Loss · 1 invalid · 0 conflicts · 0 gaps" [ref=e113]
            - generic "kazakh-sft-007 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e114]
            - generic "kazakh-sft-007 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e115]
            - generic "kazakh-sft-008 · Loss · 1 invalid · 0 conflicts · 0 gaps" [ref=e116]
            - generic "kazakh-sft-008 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e117]
            - generic "kazakh-sft-008 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e118]
            - generic "kazakh-sft-009 · Loss · 0 invalid · 0 conflicts · 1 gaps" [ref=e119]
            - generic "kazakh-sft-009 · Learning rate · 0 invalid · 0 conflicts · 1 gaps" [ref=e120]
            - generic "kazakh-sft-009 · Gradient norm · 0 invalid · 0 conflicts · 1 gaps" [ref=e121]
            - generic "kazakh-sft-010 · Loss · 1 invalid · 2 conflicts · 1 gaps" [ref=e122]
            - generic "kazakh-sft-010 · Learning rate · 0 invalid · 2 conflicts · 1 gaps" [ref=e123]
            - generic "kazakh-sft-010 · Gradient norm · 0 invalid · 2 conflicts · 1 gaps" [ref=e124]
            - generic "kazakh-sft-011 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e125]
            - generic "kazakh-sft-011 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e126]
            - generic "kazakh-sft-011 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e127]
            - generic "kazakh-sft-012 · Loss · 0 invalid · 0 conflicts · 1 gaps" [ref=e128]
            - generic "kazakh-sft-012 · Learning rate · 0 invalid · 0 conflicts · 1 gaps" [ref=e129]
            - generic "kazakh-sft-012 · Gradient norm · 0 invalid · 0 conflicts · 1 gaps" [ref=e130]
            - generic "kazakh-sft-013 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e131]
            - generic "kazakh-sft-013 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e132]
            - generic "kazakh-sft-013 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e133]
            - generic "kazakh-sft-014 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e134]
            - generic "kazakh-sft-014 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e135]
            - generic "kazakh-sft-014 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e136]
            - generic "kazakh-sft-015 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e137]
            - generic "kazakh-sft-015 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e138]
            - generic "kazakh-sft-015 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e139]
            - generic "kazakh-sft-016 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e140]
            - generic "kazakh-sft-016 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e141]
            - generic "kazakh-sft-016 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e142]
            - generic "kazakh-sft-017 · Loss · 1 invalid · 1 conflicts · 1 gaps" [ref=e143]
            - generic "kazakh-sft-017 · Learning rate · 1 invalid · 1 conflicts · 1 gaps" [ref=e144]
            - generic "kazakh-sft-017 · Gradient norm · 1 invalid · 1 conflicts · 1 gaps" [ref=e145]
            - generic "kazakh-sft-018 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e146]
            - generic "kazakh-sft-018 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e147]
            - generic "kazakh-sft-018 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e148]
            - generic "kazakh-sft-019 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e149]
            - generic "kazakh-sft-019 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e150]
            - generic "kazakh-sft-019 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e151]
            - generic "kazakh-sft-020 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e152]
            - generic "kazakh-sft-020 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e153]
            - generic "kazakh-sft-020 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e154]
            - generic [ref=e156]: "20"
            - generic [ref=e157]: EXPERIMENTS
            - generic [ref=e158]: "01"
            - generic [ref=e159]: "02"
            - generic [ref=e160]: "03"
            - generic [ref=e161]: "04"
            - generic [ref=e162]: "05"
            - generic [ref=e163]: "06"
            - generic [ref=e164]: "07"
            - generic [ref=e165]: "08"
            - generic [ref=e166]: "09"
            - generic [ref=e167]: "10"
            - generic [ref=e168]: "11"
            - generic [ref=e169]: "12"
            - generic [ref=e170]: "13"
            - generic [ref=e171]: "14"
            - generic [ref=e172]: "15"
            - generic [ref=e173]: "16"
            - generic [ref=e174]: "17"
            - generic [ref=e175]: "18"
            - generic [ref=e176]: "19"
            - generic [ref=e177]: "20"
          - generic [ref=e178]:
            - generic [ref=e179]: No metric findings
            - generic [ref=e181]: Inspect findings
          - generic [ref=e184]:
            - text: Inspect experiment
            - combobox "Inspect experiment" [ref=e185] [cursor=pointer]:
              - option "kazakh-sft-001"
              - option "kazakh-sft-002"
              - option "kazakh-sft-003"
              - option "kazakh-sft-004"
              - option "kazakh-sft-005" [selected]
              - option "kazakh-sft-006"
              - option "kazakh-sft-007"
              - option "kazakh-sft-008"
              - option "kazakh-sft-009"
              - option "kazakh-sft-010"
              - option "kazakh-sft-011"
              - option "kazakh-sft-012"
              - option "kazakh-sft-013"
              - option "kazakh-sft-014"
              - option "kazakh-sft-015"
              - option "kazakh-sft-016"
              - option "kazakh-sft-017"
              - option "kazakh-sft-018"
              - option "kazakh-sft-019"
              - option "kazakh-sft-020"
          - group [ref=e186]:
            - generic "Accessible quality table" [ref=e187] [cursor=pointer]
        - generic [ref=e188]:
          - generic [ref=e189]:
            - generic [ref=e191]:
              - heading "Source findings" [level=2] [ref=e192]
              - paragraph [ref=e193]: Counts describe different issue categories.
            - generic [ref=e194]:
              - generic [ref=e195]:
                - generic [ref=e196]: NaN
                - strong [ref=e197]: "4"
              - generic [ref=e200]:
                - generic [ref=e201]: "Infinity"
                - strong [ref=e202]: "4"
              - generic [ref=e205]:
                - generic [ref=e206]: Conflicts
                - strong [ref=e207]: "9"
              - generic [ref=e210]:
                - generic [ref=e211]: Duplicate rows
                - strong [ref=e212]: "13"
              - generic [ref=e215]:
                - generic [ref=e216]: Known gaps
                - strong [ref=e217]: "4"
            - link "Explore data quality →" [ref=e220] [cursor=pointer]:
              - /url: /data-quality
          - generic [ref=e221]:
            - generic [ref=e222]:
              - heading "Selected experiment" [level=2] [ref=e223]
              - generic [ref=e224]: Running
            - generic [ref=e225]:
              - paragraph [ref=e226]: Qwen2.5-3B / DPO
              - heading "kazakh-sft-005" [level=3] [ref=e227]
              - generic [ref=e228]:
                - generic [ref=e229]:
                  - term [ref=e230]: Raw observations
                  - definition [ref=e231]: 1,000,000
                - generic [ref=e232]:
                  - term [ref=e233]: Peak loss
                  - definition [ref=e234]: "100.000"
                - generic [ref=e235]:
                  - term [ref=e236]: Data findings
                  - definition [ref=e237]: "0"
              - generic [ref=e238]:
                - link "Open run ↗" [ref=e239] [cursor=pointer]:
                  - /url: /runs/kazakh-sft-005
                - link "Compare →" [ref=e240] [cursor=pointer]:
                  - /url: /compare?runs=kazakh-sft-005
                - link "Inspect issues →" [ref=e241] [cursor=pointer]:
                  - /url: /data-quality?run=kazakh-sft-005
        - complementary [ref=e242]:
          - generic [ref=e244]:
            - heading "Snapshot findings" [level=2] [ref=e245]
            - paragraph [ref=e246]: Source observations, not live activity.
          - link "kazakh-sft-006 missing · 2 findings 2 nonfinite · 0 conflicts" [ref=e247] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-006
            - generic [ref=e249]:
              - strong [ref=e250]: kazakh-sft-006
              - paragraph [ref=e251]: missing · 2 findings
              - generic [ref=e252]: 2 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e253]: ↗
          - link "kazakh-sft-007 pos-inf · 1 findings 1 nonfinite · 0 conflicts" [ref=e254] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-007
            - generic [ref=e256]:
              - strong [ref=e257]: kazakh-sft-007
              - paragraph [ref=e258]: pos-inf · 1 findings
              - generic [ref=e259]: 1 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e260]: ↗
          - link "kazakh-sft-008 neg-inf · 1 findings 1 nonfinite · 0 conflicts" [ref=e261] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-008
            - generic [ref=e263]:
              - strong [ref=e264]: kazakh-sft-008
              - paragraph [ref=e265]: neg-inf · 1 findings
              - generic [ref=e266]: 1 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e267]: ↗
          - link "kazakh-sft-009 duplicates · 11 findings 0 nonfinite · 0 conflicts" [ref=e268] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-009
            - generic [ref=e270]:
              - strong [ref=e271]: kazakh-sft-009
              - paragraph [ref=e272]: duplicates · 11 findings
              - generic [ref=e273]: 0 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e274]: ↗
          - link "kazakh-sft-010 conflicts · 10 findings 1 nonfinite · 6 conflicts" [ref=e275] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-010
            - generic [ref=e277]:
              - strong [ref=e278]: kazakh-sft-010
              - paragraph [ref=e279]: conflicts · 10 findings
              - generic [ref=e280]: 1 nonfinite · 6 conflicts
            - generic [aria-hidden] [ref=e281]: ↗
          - link "kazakh-sft-011 unsorted · 2 findings 0 nonfinite · 0 conflicts" [ref=e282] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-011
            - generic [ref=e284]:
              - strong [ref=e285]: kazakh-sft-011
              - paragraph [ref=e286]: unsorted · 2 findings
              - generic [ref=e287]: 0 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e288]: ↗
          - link "kazakh-sft-012 gaps · 1 findings 0 nonfinite · 0 conflicts" [ref=e289] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-012
            - generic [ref=e291]:
              - strong [ref=e292]: kazakh-sft-012
              - paragraph [ref=e293]: gaps · 1 findings
              - generic [ref=e294]: 0 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e295]: ↗
          - link "kazakh-sft-017 mixed · 8 findings 3 nonfinite · 3 conflicts" [ref=e296] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-017
            - generic [ref=e298]:
              - strong [ref=e299]: kazakh-sft-017
              - paragraph [ref=e300]: mixed · 8 findings
              - generic [ref=e301]: 3 nonfinite · 3 conflicts
            - generic [aria-hidden] [ref=e302]: ↗
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright'
  2  | import { expect, test } from '@playwright/test'
  3  | 
  4  | const spikeRun='/runs/kazakh-sft-005'
  5  | test('million-point source identity, three charts and keyboard range',async({page})=>{
  6  |  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message))
  7  |  await page.goto(spikeRun)
  8  |  await expect(page.getByTestId('loss-chart').locator('canvas')).toBeVisible({timeout:60000})
  9  |  await expect(page.getByTestId('lr-chart').locator('canvas')).toBeVisible()
  10 |  await expect(page.getByTestId('grad-chart').locator('canvas')).toBeVisible()
  11 |  await page.getByRole('button',{name:'Source',exact:true}).click()
  12 |  await page.getByLabel('Inspect by').selectOption('sourceIndex')
  13 |  await page.getByLabel('Source index',{exact:true}).fill('500001')
  14 |  await page.getByRole('button',{name:'Inspect source',exact:true}).click()
  15 |  await expect(page.getByTestId('inspected-loss')).toHaveText('100.000')
  16 |  await page.getByRole('button',{name:'Metrics',exact:true}).click()
  17 |  await page.getByRole('button',{name:'Zoom in',exact:true}).focus();await page.keyboard.press('Enter')
  18 |  await expect(page.locator('[data-view-ready="true"]').first()).toBeVisible()
  19 |  await page.getByRole('button',{name:'Reset view',exact:true}).click()
  20 |  expect(errors).toEqual([])
  21 | })
  22 | 
  23 | test('source spike is actually painted at the source coordinate',async({page})=>{
  24 |  await page.goto(spikeRun)
  25 |  const host=page.getByTestId('loss-chart')
  26 |  await expect(host).toHaveAttribute('data-spike-source-index','500001',{timeout:60000})
  27 |  const painted=await host.evaluate(element=>{
  28 |   const canvas=element.querySelector('canvas')!,context=canvas.getContext('2d')!
  29 |   const x=Number(element.getAttribute('data-spike-x')),y=Number(element.getAttribute('data-spike-y'))
  30 |   const color=getComputedStyle(document.documentElement).getPropertyValue('--chart-line').trim()
  31 |   const rgb=color.match(/[a-f\d]{2}/gi)!.map(v=>parseInt(v,16))
  32 |   const bytes=context.getImageData(Math.max(0,Math.round(x)-5),Math.max(0,Math.round(y)-5),11,11).data
  33 |   let count=0;for(let i=0;i<bytes.length;i+=4)if(bytes[i+3]>0&&rgb.every((v,j)=>Math.abs(v-bytes[i+j])<35))count++
  34 |   return count
  35 |  })
  36 |  expect(painted,'critical maximum marker must exist in Canvas pixels').toBeGreaterThan(2)
  37 | })
  38 | 
  39 | test('routes, filters and invalid comparison selections recover explicitly',async({page})=>{
  40 |  await page.goto('/');await expect(page).toHaveURL(/\/dashboard$/)
  41 |  await expect(page.getByRole('heading',{name:'Workspace overview',exact:true})).toBeVisible()
  42 |  await page.goto('/runs');await page.getByRole('searchbox',{name:'Search runs',exact:true}).fill('no-such-run')
  43 |  await expect(page.getByText('No matching runs',{exact:true})).toBeVisible()
  44 |  await page.goto('/compare?runs=unknown');await expect(page.getByText(/known run|Unknown run|Invalid run|not found/i).first()).toBeVisible()
  45 |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-006')
  46 |  await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  47 |  await page.goto('/runs/unknown');await expect(page.getByRole('heading',{name:'Run not found',exact:true})).toBeVisible()
  48 |  await page.goto('/no-such-page');await expect(page.getByRole('heading',{name:'Not found',exact:true})).toBeVisible()
  49 | })
  50 | 
  51 | for(const theme of ['dark','light'] as const)for(const width of [320,1440])test(`${theme} ${width}px five-screen axe and responsive acceptance`,async({page},info)=>{
  52 |  await page.emulateMedia({reducedMotion:'reduce'})
  53 |  await page.setViewportSize({width,height:1000})
  54 |  await page.addInitScript(value=>localStorage.setItem('soup-theme',value),theme)
  55 |  for(const route of ['/dashboard','/runs',spikeRun,'/compare?runs=kazakh-sft-005,kazakh-sft-006','/data-quality']){
  56 |   await page.goto(route)
  57 |   await expect(page.locator('h1')).toBeVisible()
  58 |   if(route.includes('005'))await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  59 |   await expect(page.locator('html')).toHaveAttribute('data-theme',theme)
  60 |   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()
  61 |   await info.attach(`${route.replace(/[^a-z\d]/gi,'-')}-axe`,{body:JSON.stringify(audit,null,2),contentType:'application/json'})
> 62 |   expect(audit.violations).toEqual([])
     |                            ^ Error: expect(received).toEqual(expected) // deep equality
  63 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  64 |   await page.screenshot({path:info.outputPath(`${route.replace(/[^a-z\d]/gi,'-')}.png`),fullPage:true})
  65 |  }
  66 | })
  67 | 
  68 | for(const locale of ['en-US','de-DE','ru-RU'])test(`${locale} numeric source survives timezone changes`,async({browser})=>{
  69 |  for(const timezoneId of ['UTC','Asia/Qyzylorda','America/Los_Angeles']){
  70 |   const context=await browser.newContext({locale,timezoneId});const page=await context.newPage()
  71 |   await page.goto(spikeRun);await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  72 |   await page.getByRole('button',{name:'Source',exact:true}).click()
  73 |   await page.getByLabel('Inspect by').selectOption('sourceIndex');await page.getByLabel('Source index',{exact:true}).fill('500001')
  74 |   await page.getByRole('button',{name:'Inspect source',exact:true}).click()
  75 |   await expect(page.getByTestId('inspected-loss')).toHaveText(locale==='en-US'?'100.000':'100,000')
  76 |   await context.close()
  77 |  }
  78 | })
  79 | 
```