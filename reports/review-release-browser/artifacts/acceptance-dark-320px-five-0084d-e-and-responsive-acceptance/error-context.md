# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance.spec.ts >> dark 320px five-screen axe and responsive acceptance
- Location: e2e\acceptance.spec.ts:41:80

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=f4e3]:
  - link "Skip to content" [ref=f4e4] [cursor=pointer]:
    - /url: "#main-content"
  - complementary "Workspace" [ref=f4e5]:
    - navigation "Main navigation" [ref=f4e6]:
      - link "Dashboard" [ref=f4e7] [cursor=pointer]:
        - /url: /dashboard
      - link "Training runs" [ref=f4e14] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=f4e18] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=f4e21] [cursor=pointer]:
        - /url: /data-quality
  - generic [ref=f4e26]:
    - banner [ref=f4e27]:
      - generic [ref=f4e28]:
        - generic [ref=f4e29]: Workspace
        - generic [aria-hidden] [ref=f4e30]: /
        - generic [ref=f4e31]: qwen-kazakh
      - generic [ref=f4e32]:
        - link "Docs" [ref=f4e33] [cursor=pointer]:
          - /url: https://souplanding-omega.vercel.app/docs/
        - button "Switch to light theme" [ref=f4e37] [cursor=pointer]
    - main [ref=f4e49]:
      - generic [ref=f4e50]:
        - generic [ref=f4e51]:
          - heading "Data quality" [level=1] [ref=f4e52]
          - paragraph [ref=f4e53]: Every finding links back to an immutable source observation.
        - generic [ref=f4e54]: Demo snapshot · Smoothing off
      - generic [ref=f4e55]:
        - generic [ref=f4e56]:
          - term [ref=f4e57]: Runs audited
          - definition [ref=f4e58]: "20"
        - generic [ref=f4e59]:
          - term [ref=f4e60]: Runs with findings
          - definition [ref=f4e61]: "8"
        - generic [ref=f4e62]:
          - term [ref=f4e63]: Invalid observations
          - definition [ref=f4e64]: "8"
        - generic [ref=f4e65]:
          - term [ref=f4e66]: Conflicting groups
          - definition [ref=f4e67]: "9"
      - group [ref=f4e68]:
        - generic "Issue type counts Observations, rows and groups" [ref=f4e69] [cursor=pointer]:
          - generic [ref=f4e70]:
            - strong [ref=f4e71]: Issue type counts
            - generic [ref=f4e72]: Observations, rows and groups
      - group [ref=f4e75]:
        - generic "Source quality matrix All runs and metrics" [ref=f4e76] [cursor=pointer]:
          - generic [ref=f4e77]:
            - strong [ref=f4e78]: Source quality matrix
            - generic [ref=f4e79]: All runs and metrics
      - generic [ref=f4e82]:
        - generic [ref=f4e84]:
          - heading "Source issue ledger" [level=2] [ref=f4e85]
          - paragraph [ref=f4e86]: Choose a run to inspect original observations and their findings.
        - generic [ref=f4e87]:
          - generic [ref=f4e88]:
            - text: Run
            - combobox "Run" [ref=f4e89] [cursor=pointer]:
              - option "Select a run" [selected]
              - option "kazakh-sft-001"
              - option "kazakh-sft-002"
              - option "kazakh-sft-003"
              - option "kazakh-sft-004"
              - option "kazakh-sft-005"
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
          - generic [ref=f4e90]:
            - text: Metric
            - combobox "Metric" [ref=f4e91] [cursor=pointer]:
              - option "All metrics" [selected]
              - option "Loss"
              - option "Learning rate"
              - option "Gradient norm"
          - generic [ref=f4e92]:
            - text: Issue type
            - combobox "Issue type" [ref=f4e93] [cursor=pointer]:
              - option "All issue types" [selected]
              - option "NaN"
              - option "+Infinity"
              - option "−Infinity"
              - option "Duplicate steps"
              - option "Conflicting measurements"
              - option "Invalid step coordinates"
              - option "Out-of-order source"
              - option "Known cadence gaps"
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright'
  2  | import { expect, test } from '@playwright/test'
  3  | import { assertSpikePainted } from '../scripts/canvas-controls.mjs'
  4  | 
  5  | const spikeRun='/runs/kazakh-sft-005'
  6  | test('million-point source identity, three charts and keyboard range',async({page})=>{
  7  |  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message))
  8  |  await page.goto(spikeRun)
  9  |  await expect(page.getByTestId('loss-chart').locator('canvas')).toBeVisible({timeout:60000})
  10 |  await expect(page.getByTestId('lr-chart').locator('canvas')).toBeVisible()
  11 |  await expect(page.getByTestId('grad-chart').locator('canvas')).toBeVisible()
  12 |  await page.getByRole('button',{name:'Source',exact:true}).click()
  13 |  await page.getByLabel('Inspect by').selectOption('sourceIndex')
  14 |  await page.getByLabel('Source index',{exact:true}).fill('500001')
  15 |  await page.getByRole('button',{name:'Inspect source',exact:true}).click()
  16 |  await expect(page.getByTestId('inspected-loss')).toHaveText('100.000')
  17 |  await page.getByRole('button',{name:'Metrics',exact:true}).click()
  18 |  await page.getByRole('button',{name:'Zoom in',exact:true}).focus();await page.keyboard.press('Enter')
  19 |  await expect(page.locator('[data-view-ready="true"]').first()).toBeVisible()
  20 |  await page.getByRole('button',{name:'Reset view',exact:true}).click()
  21 |  expect(errors).toEqual([])
  22 | })
  23 | 
  24 | test('source spike is actually painted at the source coordinate',async({page})=>{
  25 |  await page.goto(spikeRun)
  26 |  await assertSpikePainted(page)
  27 | })
  28 | 
  29 | test('routes, filters and invalid comparison selections recover explicitly',async({page})=>{
  30 |  await page.goto('/');await expect(page).toHaveURL(/\/dashboard$/)
  31 |  await expect(page.getByRole('heading',{name:'Workspace overview',exact:true})).toBeVisible()
  32 |  await page.goto('/runs');await page.getByRole('searchbox',{name:'Search runs',exact:true}).fill('no-such-run')
  33 |  await expect(page.getByText('No matching runs',{exact:true})).toBeVisible()
  34 |  await page.goto('/compare?runs=unknown');await expect(page.getByText(/known run|Unknown run|Invalid run|not found/i).first()).toBeVisible()
  35 |  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-006')
  36 |  await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  37 |  await page.goto('/runs/unknown');await expect(page.getByRole('heading',{name:'Run not found',exact:true})).toBeVisible()
  38 |  await page.goto('/no-such-page');await expect(page.getByRole('heading',{name:'Not found',exact:true})).toBeVisible()
  39 | })
  40 | 
  41 | for(const theme of ['dark','light'] as const)for(const width of [320,768,1440])test(`${theme} ${width}px five-screen axe and responsive acceptance`,async({page},info)=>{
  42 |  await page.emulateMedia({reducedMotion:'reduce'})
  43 |  await page.setViewportSize({width,height:1000})
  44 |  await page.addInitScript(value=>localStorage.setItem('soup-theme',value),theme)
  45 |  for(const route of ['/dashboard','/runs',spikeRun,'/compare?runs=kazakh-sft-005,kazakh-sft-006','/data-quality']){
  46 |   await page.goto(route)
  47 |   await expect(page.locator('h1')).toBeVisible()
  48 |   if(route.includes('005'))await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  49 |   await expect(page.locator('html')).toHaveAttribute('data-theme',theme)
  50 |   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()
  51 |   await info.attach(`${route.replace(/[^a-z\d]/gi,'-')}-axe`,{body:JSON.stringify(audit,null,2),contentType:'application/json'})
  52 |   expect(audit.violations).toEqual([])
> 53 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
     |                                                                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  54 |   await page.screenshot({path:info.outputPath(`${route.replace(/[^a-z\d]/gi,'-')}.png`),fullPage:true})
  55 |  }
  56 | })
  57 | 
  58 | for(const locale of ['en-US','de-DE','ru-RU'])test(`${locale} numeric source survives timezone changes`,async({browser})=>{
  59 |  for(const timezoneId of ['UTC','Asia/Qyzylorda','America/Los_Angeles']){
  60 |   const context=await browser.newContext({locale,timezoneId});const page=await context.newPage()
  61 |   await page.goto(spikeRun);await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  62 |   await page.getByRole('button',{name:'Source',exact:true}).click()
  63 |   await page.getByLabel('Inspect by').selectOption('sourceIndex');await page.getByLabel('Source index',{exact:true}).fill('500001')
  64 |   await page.getByRole('button',{name:'Inspect source',exact:true}).click()
  65 |   await expect(page.getByTestId('inspected-loss')).toHaveText(locale==='en-US'?'100.000':'100,000')
  66 |   await context.close()
  67 |  }
  68 | })
  69 | 
```