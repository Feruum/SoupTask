# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance.spec.ts >> light 1440px five-screen axe and responsive acceptance
- Location: e2e\acceptance.spec.ts:51:76

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "light"
Received: "dark"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" locator('html') with timeout 5000ms
  - waiting for locator('html')
    14 × locator resolved to <html lang="en" data-theme="dark" data-accent="orange">…</html>
       - unexpected value "dark"

```

```yaml
- document:
  - link "Skip to content":
    - /url: "#main-content"
  - complementary "Workspace"
  - banner
  - main
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
  48 |  await page.goto('/no-such-page');await expect(page.getByRole('heading',{name:'Page not found',exact:true})).toBeVisible()
  49 | })
  50 | 
  51 | for(const theme of ['dark','light'] as const)for(const width of [320,1440])test(`${theme} ${width}px five-screen axe and responsive acceptance`,async({page},info)=>{
  52 |  await page.emulateMedia({reducedMotion:'reduce'})
  53 |  await page.setViewportSize({width,height:1000})
  54 |  await page.addInitScript(value=>localStorage.setItem('soup-theme-v1',value),theme)
  55 |  for(const route of ['/dashboard','/runs',spikeRun,'/compare?runs=kazakh-sft-005,kazakh-sft-006','/data-quality']){
  56 |   await page.goto(route)
  57 |   await expect(page.locator('h1')).toBeVisible()
  58 |   if(route.includes('005'))await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
> 59 |   await expect(page.locator('html')).toHaveAttribute('data-theme',theme)
     |                                      ^ Error: expect(locator).toHaveAttribute(expected) failed
  60 |   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()
  61 |   await info.attach(`${route.replace(/[^a-z\d]/gi,'-')}-axe`,{body:JSON.stringify(audit,null,2),contentType:'application/json'})
  62 |   expect(audit.violations).toEqual([])
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