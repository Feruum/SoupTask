import {test,expect} from '@playwright/test'

test('Compare has one shared original-row table with every metric and exact Pin provenance',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200')
 await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-range-min','100')
 const surface=page.locator('[data-testid="comparison-loss"] .u-over');await surface.scrollIntoViewIfNeeded();await surface.hover({position:{x:120,y:100}})
 const region=page.getByRole('region',{name:'Compared source values',exact:true})
 await expect(region).toHaveCount(1)
 await expect(page.locator('.chart-hover-value')).toHaveCount(1)
 const table=region.getByRole('table',{name:'Original observations at cursor step',exact:true})
 for(const name of ['Run','Recorded step','Loss','Learning rate','Gradient norm','Δstep','Source'])await expect(table.getByRole('columnheader',{name,exact:true})).toBeVisible()
 const row=table.getByRole('row').filter({has:page.getByRole('button',{name:/Pin row/})}).filter({hasText:'kazakh-sft-005'}).first()
 await expect(row).toBeVisible()
 const loss=(await row.locator('[data-source-metric="loss"]').getAttribute('title'))!.replace('Exact source value ','')
 const lr=(await row.locator('[data-source-metric="lr"]').getAttribute('title'))!.replace('Exact source value ','')
 const grad=(await row.locator('[data-source-metric="grad_norm"]').getAttribute('title'))!.replace('Exact source value ','')
 await page.locator('[data-testid="comparison-loss"]').locator('..').locator('..').getByRole('button',{name:'Highlight kazakh-sft-005',exact:true}).focus()
 const reached=new Set<string>()
 for(let index=0;index<35&&reached.size<4;index++){
  await page.keyboard.press('Tab')
  const focused=await page.evaluate(()=>{const node=document.activeElement as HTMLElement|null;if(!node?.getAttribute('aria-label')?.startsWith('Pin row'))return null;const box=node.getBoundingClientRect();return{run:node.closest('tbody')?.getAttribute('aria-label'),visible:box.width>0&&box.height>0&&box.top<innerHeight&&box.bottom>0}})
  if(focused?.run){expect(focused.visible).toBe(true);reached.add(focused.run)}
 }
 expect(reached.size,'Tab reaches every compared run source action').toBe(4)
 await row.getByRole('button',{name:/Pin row/}).click()
 await expect(page.getByTestId('pinned-loss')).toHaveText(loss)
 await expect(page.getByTestId('pinned-lr')).toHaveText(lr)
 await expect(page.getByTestId('pinned-grad_norm')).toHaveText(grad)
})

for(const [theme,width] of [['dark',1440],['light',320]] as const)test(`shared readout preserves NaN, duplicate provenance and contained scrolling: ${theme} ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.addInitScript(theme=>localStorage.setItem('soup-theme',theme),theme)
 await page.goto('/compare?runs=kazakh-sft-009,kazakh-sft-017')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 if(width<761)await page.locator('.range-disclosure > summary').click()
 await page.getByLabel('From step',{exact:true}).fill('0');await page.getByLabel('To step',{exact:true}).fill('110');await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-range-max','110')
 const surface=page.locator('[data-testid="comparison-loss"] .u-over'),region=page.getByRole('region',{name:'Compared source values',exact:true})
 async function point(step:number){await surface.scrollIntoViewIfNeeded();const box=(await surface.boundingBox())!;const before=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq);await page.mouse.move(box.x+box.width*step/110,box.y+2);await page.waitForFunction(seq=>window.__soupEvidence!.acceptedHoverSeq>seq,before)}
 await point(10)
 await expect(region.locator('tbody[aria-label="Original observations for kazakh-sft-017"] [data-source-metric="loss"]').first()).toHaveText('NaN')
 // The duplicate group borders a known cadence gap. Aim at its real singleton marker,
 // rather than assuming a fractional pixel inside that gap interpolates to step99.
 await page.getByLabel('From step',{exact:true}).fill('99');await page.getByLabel('To step',{exact:true}).fill('99');await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await page.waitForFunction(()=>document.querySelector('.plot-host')?.getAttribute('data-range-min')==='99'&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
 await surface.scrollIntoViewIfNeeded();const singleton=(await surface.boundingBox())!
 await page.mouse.move(singleton.x+singleton.width*.5,singleton.y+singleton.height*.08/1.16)
 const duplicate=region.locator('tbody[aria-label="Original observations for kazakh-sft-009"]')
 await expect(duplicate.getByRole('button',{name:'Pin row 99',exact:true})).toBeVisible()
 await expect(duplicate.getByRole('button',{name:'Pin row 100',exact:true})).toBeVisible()
 await expect(duplicate).toContainText('11 returned observations')
 await expect(duplicate.getByRole('link',{name:'Inspect full source group'})).toHaveAttribute('href',/step=99&revision=/)
 await region.scrollIntoViewIfNeeded()
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
 await region.screenshot({path:`reports/perf-targets-2026-11-10/shared-readout-${theme}-${width}.png`})
})
