import {expect,test} from '@playwright/test'
import {assertSpikePainted} from '../scripts/canvas-controls.mjs'

test('DPR2 and resize retain actual source maximum without duplicate chart instances',async({browser})=>{
 const context=await browser.newContext({viewport:{width:768,height:1024},deviceScaleFactor:2,locale:'en-US'})
 const page=await context.newPage();await page.goto('/runs/kazakh-sft-005')
 await assertSpikePainted(page)
 await expect(page.getByTestId('loss-chart').locator('.uplot')).toHaveCount(1)
 await page.setViewportSize({width:1440,height:900});await assertSpikePainted(page)
 await expect(page.getByTestId('loss-chart').locator('.uplot')).toHaveCount(1)
 await page.getByRole('button',{name:'Source',exact:true}).click()
 await expect(page.getByTestId('loss-chart')).toHaveCount(0)
 await page.getByRole('button',{name:'Metrics',exact:true}).click();await assertSpikePainted(page)
 expect(await page.evaluate(()=>document.querySelectorAll('[data-testid="loss-chart"] .uplot').length)).toBe(1)
 await context.close()
})

test('blocked Worker is a visible recoverable error, not an empty successful plot',async({page})=>{
 await page.route('**/assets/training.worker-*.js',route=>route.abort())
 await page.goto('/runs/kazakh-sft-005')
 await expect(page.getByRole('alert').first()).toBeVisible({timeout:15000})
 await expect(page.locator('canvas')).toHaveCount(0)
 await expect(page.getByRole('button',{name:/Retry/}).first()).toBeVisible()
})
