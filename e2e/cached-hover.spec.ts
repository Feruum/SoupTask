import {test,expect} from '@playwright/test'

test('a warmed display-pixel cursor uses exact Worker-prepared rows without another round trip',async({page})=>{
 await page.addInitScript(()=>{
  const state=window as Window&{__hoverPosts?:number};state.__hoverPosts=0
  const post=Worker.prototype.postMessage
  Worker.prototype.postMessage=function(message:unknown,options?:Transferable[]|StructuredSerializeOptions){
   if(message&&typeof message==='object'&&'kind'in message&&message.kind==='hover')state.__hoverPosts=(state.__hoverPosts??0)+1
   return Reflect.apply(post,this,[message,options])
  }
 })
 await page.goto('/runs/kazakh-sft-005')
 await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready','true',{timeout:60000})
 await expect.poll(()=>page.evaluate(()=>(window.__soupEvidence as {hoverCacheTargets?:number}|undefined)?.hoverCacheTargets??0),{timeout:3000}).toBeGreaterThan(0)
 const surface=page.locator('[data-testid="loss-chart"] .u-over');await surface.scrollIntoViewIfNeeded()
 const box=await surface.boundingBox();if(!box)throw Error('Missing plot')
 const before=await page.evaluate(()=>(window as Window&{__hoverPosts?:number}).__hoverPosts)
 await page.mouse.move(box.x+box.width*.37,box.y+box.height*.5)
 await expect(page.locator('[data-testid="cursor-readout-loss"] .chart-hover-value')).toBeVisible()
 await page.mouse.move(box.x+box.width*.71,box.y+box.height*.5)
 await expect.poll(()=>page.locator('[data-testid="cursor-readout-loss"] .chart-hover-value').getAttribute('data-hover-seq')).not.toBe('0')
 expect(await page.evaluate(()=>(window as Window&{__hoverPosts?:number}).__hoverPosts)).toBe(before)
 const exact=(await page.locator('[data-testid="cursor-readout-loss"] [title^="Exact source value"]').first().getAttribute('title'))!.replace('Exact source value ','')
 await page.getByRole('button',{name:/Pin row/}).first().click()
 await page.getByRole('link',{name:/Open exact source row/}).click()
 await expect(page.getByTestId('inspected-loss')).toBeVisible({timeout:60000})
 await expect(page.getByTestId('inspected-loss').locator('..').locator('.exact-value')).toHaveText(exact)
})
