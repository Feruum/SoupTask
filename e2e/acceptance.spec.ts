import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { assertSpikePainted } from '../scripts/canvas-controls.mjs'

const spikeRun='/runs/kazakh-sft-005'
test('million-point source identity, three charts and keyboard range',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message))
 await page.goto(spikeRun)
 await expect(page.getByTestId('loss-chart').locator('canvas')).toBeVisible({timeout:60000})
 await expect(page.getByTestId('lr-chart').locator('canvas')).toBeVisible()
 await expect(page.getByTestId('grad-chart').locator('canvas')).toBeVisible()
 await page.getByRole('button',{name:'Source',exact:true}).click()
 await page.getByLabel('Inspect by').selectOption('sourceIndex')
 await page.getByLabel('Source index',{exact:true}).fill('500001')
 await page.getByRole('button',{name:'Inspect source',exact:true}).click()
 await expect(page.getByTestId('inspected-loss')).toHaveText('100.000')
 await page.getByRole('button',{name:'Metrics',exact:true}).click()
 await page.getByRole('button',{name:'Zoom in',exact:true}).focus();await page.keyboard.press('Enter')
 await expect(page.locator('[data-view-ready="true"]').first()).toBeVisible()
 await page.getByRole('button',{name:'Reset view',exact:true}).click()
 expect(errors).toEqual([])
})

test('source spike is actually painted at the source coordinate',async({page})=>{
 await page.goto(spikeRun)
 await assertSpikePainted(page)
})

test('routes, filters and invalid comparison selections recover explicitly',async({page})=>{
 await page.goto('/');await expect(page).toHaveURL(/\/dashboard$/)
 await expect(page.getByRole('heading',{name:'Training overview',exact:true})).toBeVisible()
 await page.goto('/runs');await page.getByRole('searchbox',{name:'Search runs',exact:true}).fill('no-such-run')
 await expect(page.getByText('No matching runs',{exact:true})).toBeVisible()
 await page.goto('/compare?runs=unknown');await expect(page.getByText(/known run|Unknown run|Invalid run|not found/i).first()).toBeVisible()
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-006')
 await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
 await page.goto('/runs/unknown');await expect(page.getByRole('heading',{name:'Run not found',exact:true})).toBeVisible()
 await page.goto('/no-such-page');await expect(page.getByRole('heading',{name:'Not found',exact:true})).toBeVisible()
})

for(const theme of ['dark','light'] as const)for(const width of [320,768,1440])test(`${theme} ${width}px five-screen axe and responsive acceptance`,async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'})
 await page.setViewportSize({width,height:1000})
 await page.addInitScript(value=>localStorage.setItem('soup-theme',value),theme)
 for(const route of ['/dashboard','/runs',spikeRun,'/compare?runs=kazakh-sft-005,kazakh-sft-006','/data-quality']){
  await page.goto(route)
  await expect(page.locator('h1')).toBeVisible()
  if(route.includes('005'))await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  await expect(page.locator('html')).toHaveAttribute('data-theme',theme)
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()
  await info.attach(`${route.replace(/[^a-z\d]/gi,'-')}-axe`,{body:JSON.stringify(audit,null,2),contentType:'application/json'})
  expect(audit.violations).toEqual([])
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
  await page.screenshot({path:info.outputPath(`${route.replace(/[^a-z\d]/gi,'-')}.png`),fullPage:true})
 }
})

for(const locale of ['en-US','de-DE','ru-RU'])test(`${locale} numeric source survives timezone changes`,async({browser})=>{
 for(const timezoneId of ['UTC','Asia/Qyzylorda','America/Los_Angeles']){
  const context=await browser.newContext({locale,timezoneId});const page=await context.newPage()
  await page.goto(spikeRun);await expect(page.locator('canvas').first()).toBeVisible({timeout:60000})
  await page.getByRole('button',{name:'Source',exact:true}).click()
  await page.getByLabel('Inspect by').selectOption('sourceIndex');await page.getByLabel('Source index',{exact:true}).fill('500001')
  await page.getByRole('button',{name:'Inspect source',exact:true}).click()
  await expect(page.getByTestId('inspected-loss')).toHaveText(locale==='en-US'?'100.000':'100,000')
  await context.close()
 }
})
