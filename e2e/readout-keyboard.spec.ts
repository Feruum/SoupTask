import {test,expect} from '@playwright/test'

test('keyboard reaches the shared source row across offscreen table boundaries and pins all raw metrics',async({page})=>{
 await page.setViewportSize({width:390,height:844})
 await page.goto('/runs/kazakh-sft-005')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 if(!(await page.getByLabel('From step',{exact:true}).isVisible()))await page.locator('.range-disclosure > summary').click()
 await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200')
 await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min','100')
 const surface=page.locator('[data-testid="loss-chart"] .u-over');await surface.scrollIntoViewIfNeeded()
 await surface.hover({position:{x:120,y:100}})
 await expect(page.locator('[data-testid="cursor-readout-loss"] .chart-hover-value')).toBeVisible()
 await page.locator('[data-testid="loss-chart"]').locator('..').locator('..').getByRole('button',{name:'Highlight kazakh-sft-005',exact:true}).focus()
 let reached=false
 for(let index=0;index<25&&!reached;index++){
  await page.keyboard.press('Tab')
  const focused=await page.evaluate(()=>{
   const node=document.activeElement as HTMLElement|null
   if(!node?.getAttribute('aria-label')?.startsWith('Pin row'))return null
   const box=node.getBoundingClientRect()
   return {metric:node.closest('[data-testid^="cursor-readout-"]')?.getAttribute('data-testid'),visible:box.bottom>0&&box.top<innerHeight&&box.left>=0&&box.right<=innerWidth&&box.width>0&&box.height>0}
  })
  if(focused?.metric){expect(focused.visible,'Tab reveals the offscreen source action').toBe(true);reached=true}
 }
 expect(reached).toBe(true)
 const table=page.getByRole('table',{name:'Original observations at cursor step',exact:true}),values:Record<string,string>={}
 for(const metric of ['loss','lr','grad_norm'])values[metric]=(await table.locator(`[data-source-metric="${metric}"]`).first().getAttribute('title'))!.replace('Exact source value ','')
 await page.keyboard.press('Enter')
 for(const metric of ['loss','lr','grad_norm'])await expect(page.getByTestId(`pinned-${metric}`)).toHaveText(values[metric])
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
})
