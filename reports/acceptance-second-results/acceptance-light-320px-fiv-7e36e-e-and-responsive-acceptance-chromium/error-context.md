# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance.spec.ts >> light 320px five-screen axe and responsive acceptance
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
    - navigation "Main navigation" [ref=e8]:
      - link "Dashboard" [ref=e9] [cursor=pointer]:
        - /url: /dashboard
      - link "Training runs" [ref=e12] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=e14] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=e16] [cursor=pointer]:
        - /url: /data-quality
  - generic [ref=e18]:
    - banner [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e21]: Workspace
        - generic [aria-hidden] [ref=e22]: /
        - generic [ref=e23]: qwen-kazakh
      - generic [ref=e24]:
        - link "Docs" [ref=e25] [cursor=pointer]:
          - /url: https://souplanding-omega.vercel.app/docs/
        - button "Switch to dark theme" [ref=e29] [cursor=pointer]
    - main [ref=e37]:
      - generic [ref=e38]:
        - generic [ref=e39]:
          - paragraph [ref=e40]: SOUP / EXPERIMENT WORKSPACE
          - heading "Workspace overview" [level=1] [ref=e41]
          - paragraph [ref=e42]: qwen-kazakh · Twenty reproducible experiments, one source of truth.
        - generic [ref=e43]: Demo snapshot · Smoothing off
      - generic [ref=e44]:
        - generic [ref=e45]:
          - term [ref=e46]: Training runs
          - definition [ref=e47]: "20"
          - definition [ref=e48]: Seeded snapshots
        - generic [ref=e49]:
          - term [ref=e50]: Running
          - definition [ref=e51]: "4"
          - definition [ref=e52]: Fixture execution status
        - generic [ref=e53]:
          - term [ref=e54]: Need attention
          - definition [ref=e55]: "8"
          - definition [ref=e56]: Runs with source findings
        - generic [ref=e57]:
          - term [ref=e58]: Raw observations
          - definition [ref=e59]: 1,147,457
          - definition [ref=e60]: Four numeric columns
      - generic [ref=e61]:
        - generic [ref=e62]:
          - generic [ref=e63]:
            - generic [ref=e64]:
              - heading "Experiment constellation" [level=2] [ref=e65]
              - paragraph [ref=e66]: Each sector is a run. Rings represent metric quality.
            - generic [ref=e67]: 20 × 3
          - img "Quality map of twenty training runs Three rings represent Loss, Learning rate and Gradient norm. Teal means no metric findings, amber indicates findings. Use the run selector or accessible table for exact counts." [ref=e68]:
            - generic "kazakh-sft-001 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e73]
            - generic "kazakh-sft-001 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e74]
            - generic "kazakh-sft-001 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e75]
            - generic "kazakh-sft-002 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e76]
            - generic "kazakh-sft-002 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e77]
            - generic "kazakh-sft-002 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e78]
            - generic "kazakh-sft-003 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e79]
            - generic "kazakh-sft-003 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e80]
            - generic "kazakh-sft-003 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e81]
            - generic "kazakh-sft-004 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e82]
            - generic "kazakh-sft-004 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e83]
            - generic "kazakh-sft-004 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e84]
            - generic "kazakh-sft-005 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e85]
            - generic "kazakh-sft-005 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e86]
            - generic "kazakh-sft-005 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e87]
            - generic "kazakh-sft-006 · Loss · 2 invalid · 0 conflicts · 0 gaps" [ref=e88]
            - generic "kazakh-sft-006 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e89]
            - generic "kazakh-sft-006 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e90]
            - generic "kazakh-sft-007 · Loss · 1 invalid · 0 conflicts · 0 gaps" [ref=e91]
            - generic "kazakh-sft-007 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e92]
            - generic "kazakh-sft-007 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e93]
            - generic "kazakh-sft-008 · Loss · 1 invalid · 0 conflicts · 0 gaps" [ref=e94]
            - generic "kazakh-sft-008 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e95]
            - generic "kazakh-sft-008 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e96]
            - generic "kazakh-sft-009 · Loss · 0 invalid · 0 conflicts · 1 gaps" [ref=e97]
            - generic "kazakh-sft-009 · Learning rate · 0 invalid · 0 conflicts · 1 gaps" [ref=e98]
            - generic "kazakh-sft-009 · Gradient norm · 0 invalid · 0 conflicts · 1 gaps" [ref=e99]
            - generic "kazakh-sft-010 · Loss · 1 invalid · 2 conflicts · 1 gaps" [ref=e100]
            - generic "kazakh-sft-010 · Learning rate · 0 invalid · 2 conflicts · 1 gaps" [ref=e101]
            - generic "kazakh-sft-010 · Gradient norm · 0 invalid · 2 conflicts · 1 gaps" [ref=e102]
            - generic "kazakh-sft-011 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e103]
            - generic "kazakh-sft-011 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e104]
            - generic "kazakh-sft-011 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e105]
            - generic "kazakh-sft-012 · Loss · 0 invalid · 0 conflicts · 1 gaps" [ref=e106]
            - generic "kazakh-sft-012 · Learning rate · 0 invalid · 0 conflicts · 1 gaps" [ref=e107]
            - generic "kazakh-sft-012 · Gradient norm · 0 invalid · 0 conflicts · 1 gaps" [ref=e108]
            - generic "kazakh-sft-013 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e109]
            - generic "kazakh-sft-013 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e110]
            - generic "kazakh-sft-013 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e111]
            - generic "kazakh-sft-014 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e112]
            - generic "kazakh-sft-014 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e113]
            - generic "kazakh-sft-014 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e114]
            - generic "kazakh-sft-015 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e115]
            - generic "kazakh-sft-015 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e116]
            - generic "kazakh-sft-015 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e117]
            - generic "kazakh-sft-016 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e118]
            - generic "kazakh-sft-016 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e119]
            - generic "kazakh-sft-016 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e120]
            - generic "kazakh-sft-017 · Loss · 1 invalid · 1 conflicts · 1 gaps" [ref=e121]
            - generic "kazakh-sft-017 · Learning rate · 1 invalid · 1 conflicts · 1 gaps" [ref=e122]
            - generic "kazakh-sft-017 · Gradient norm · 1 invalid · 1 conflicts · 1 gaps" [ref=e123]
            - generic "kazakh-sft-018 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e124]
            - generic "kazakh-sft-018 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e125]
            - generic "kazakh-sft-018 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e126]
            - generic "kazakh-sft-019 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e127]
            - generic "kazakh-sft-019 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e128]
            - generic "kazakh-sft-019 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e129]
            - generic "kazakh-sft-020 · Loss · 0 invalid · 0 conflicts · 0 gaps" [ref=e130]
            - generic "kazakh-sft-020 · Learning rate · 0 invalid · 0 conflicts · 0 gaps" [ref=e131]
            - generic "kazakh-sft-020 · Gradient norm · 0 invalid · 0 conflicts · 0 gaps" [ref=e132]
            - generic [ref=e134]: "20"
            - generic [ref=e135]: EXPERIMENTS
            - generic [ref=e136]: "01"
            - generic [ref=e137]: "02"
            - generic [ref=e138]: "03"
            - generic [ref=e139]: "04"
            - generic [ref=e140]: "05"
            - generic [ref=e141]: "06"
            - generic [ref=e142]: "07"
            - generic [ref=e143]: "08"
            - generic [ref=e144]: "09"
            - generic [ref=e145]: "10"
            - generic [ref=e146]: "11"
            - generic [ref=e147]: "12"
            - generic [ref=e148]: "13"
            - generic [ref=e149]: "14"
            - generic [ref=e150]: "15"
            - generic [ref=e151]: "16"
            - generic [ref=e152]: "17"
            - generic [ref=e153]: "18"
            - generic [ref=e154]: "19"
            - generic [ref=e155]: "20"
          - generic [ref=e156]:
            - generic [ref=e157]: No metric findings
            - generic [ref=e159]: Inspect findings
          - generic [ref=e162]:
            - text: Inspect experiment
            - combobox "Inspect experiment" [ref=e163] [cursor=pointer]:
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
          - group [ref=e164]:
            - generic "Accessible quality table" [ref=e165] [cursor=pointer]
        - generic [ref=e166]:
          - generic [ref=e167]:
            - generic [ref=e169]:
              - heading "Source findings" [level=2] [ref=e170]
              - paragraph [ref=e171]: Counts describe different issue categories.
            - generic [ref=e172]:
              - generic [ref=e173]:
                - generic [ref=e174]: NaN
                - strong [ref=e175]: "4"
              - generic [ref=e178]:
                - generic [ref=e179]: "Infinity"
                - strong [ref=e180]: "4"
              - generic [ref=e183]:
                - generic [ref=e184]: Conflicts
                - strong [ref=e185]: "9"
              - generic [ref=e188]:
                - generic [ref=e189]: Duplicate rows
                - strong [ref=e190]: "13"
              - generic [ref=e193]:
                - generic [ref=e194]: Known gaps
                - strong [ref=e195]: "4"
            - link "Explore data quality →" [ref=e198] [cursor=pointer]:
              - /url: /data-quality
          - generic [ref=e199]:
            - generic [ref=e200]:
              - heading "Selected experiment" [level=2] [ref=e201]
              - generic [ref=e202]: Running
            - generic [ref=e203]:
              - paragraph [ref=e204]: Qwen2.5-3B / DPO
              - heading "kazakh-sft-005" [level=3] [ref=e205]
              - generic [ref=e206]:
                - generic [ref=e207]:
                  - term [ref=e208]: Raw observations
                  - definition [ref=e209]: 1,000,000
                - generic [ref=e210]:
                  - term [ref=e211]: Peak loss
                  - definition [ref=e212]: "100.000"
                - generic [ref=e213]:
                  - term [ref=e214]: Data findings
                  - definition [ref=e215]: "0"
              - generic [ref=e216]:
                - link "Open run ↗" [ref=e217] [cursor=pointer]:
                  - /url: /runs/kazakh-sft-005
                - link "Compare →" [ref=e218] [cursor=pointer]:
                  - /url: /compare?runs=kazakh-sft-005
                - link "Inspect issues →" [ref=e219] [cursor=pointer]:
                  - /url: /data-quality?run=kazakh-sft-005
        - complementary [ref=e220]:
          - generic [ref=e222]:
            - heading "Snapshot findings" [level=2] [ref=e223]
            - paragraph [ref=e224]: Source observations, not live activity.
          - link "kazakh-sft-006 missing · 2 findings 2 nonfinite · 0 conflicts" [ref=e225] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-006
            - generic [ref=e227]:
              - strong [ref=e228]: kazakh-sft-006
              - paragraph [ref=e229]: missing · 2 findings
              - generic [ref=e230]: 2 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e231]: ↗
          - link "kazakh-sft-007 pos-inf · 1 findings 1 nonfinite · 0 conflicts" [ref=e232] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-007
            - generic [ref=e234]:
              - strong [ref=e235]: kazakh-sft-007
              - paragraph [ref=e236]: pos-inf · 1 findings
              - generic [ref=e237]: 1 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e238]: ↗
          - link "kazakh-sft-008 neg-inf · 1 findings 1 nonfinite · 0 conflicts" [ref=e239] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-008
            - generic [ref=e241]:
              - strong [ref=e242]: kazakh-sft-008
              - paragraph [ref=e243]: neg-inf · 1 findings
              - generic [ref=e244]: 1 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e245]: ↗
          - link "kazakh-sft-009 duplicates · 11 findings 0 nonfinite · 0 conflicts" [ref=e246] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-009
            - generic [ref=e248]:
              - strong [ref=e249]: kazakh-sft-009
              - paragraph [ref=e250]: duplicates · 11 findings
              - generic [ref=e251]: 0 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e252]: ↗
          - link "kazakh-sft-010 conflicts · 10 findings 1 nonfinite · 6 conflicts" [ref=e253] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-010
            - generic [ref=e255]:
              - strong [ref=e256]: kazakh-sft-010
              - paragraph [ref=e257]: conflicts · 10 findings
              - generic [ref=e258]: 1 nonfinite · 6 conflicts
            - generic [aria-hidden] [ref=e259]: ↗
          - link "kazakh-sft-011 unsorted · 2 findings 0 nonfinite · 0 conflicts" [ref=e260] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-011
            - generic [ref=e262]:
              - strong [ref=e263]: kazakh-sft-011
              - paragraph [ref=e264]: unsorted · 2 findings
              - generic [ref=e265]: 0 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e266]: ↗
          - link "kazakh-sft-012 gaps · 1 findings 0 nonfinite · 0 conflicts" [ref=e267] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-012
            - generic [ref=e269]:
              - strong [ref=e270]: kazakh-sft-012
              - paragraph [ref=e271]: gaps · 1 findings
              - generic [ref=e272]: 0 nonfinite · 0 conflicts
            - generic [aria-hidden] [ref=e273]: ↗
          - link "kazakh-sft-017 mixed · 8 findings 3 nonfinite · 3 conflicts" [ref=e274] [cursor=pointer]:
            - /url: /data-quality?run=kazakh-sft-017
            - generic [ref=e276]:
              - strong [ref=e277]: kazakh-sft-017
              - paragraph [ref=e278]: mixed · 8 findings
              - generic [ref=e279]: 3 nonfinite · 3 conflicts
            - generic [aria-hidden] [ref=e280]: ↗
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