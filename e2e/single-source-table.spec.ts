import {test,expect} from '@playwright/test'

test('Run details updates one original-row readout while retaining all three raw metrics and Pin',async({page})=>{
 await page.goto('/runs/kazakh-sft-005')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 await page.getByLabel('From step',{exact:true}).fill('100');await page.getByLabel('To step',{exact:true}).fill('200');await page.getByRole('button',{name:'Apply range',exact:true}).click()
 await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min','100')
 const surface=page.locator('[data-testid="loss-chart"] .u-over');await surface.scrollIntoViewIfNeeded();await surface.hover({position:{x:120,y:2}})
 const table=page.getByRole('table',{name:'Original observations at cursor step',exact:true})
 await expect(table).toHaveCount(1)
 await expect(page.locator('.chart-hover-value')).toHaveCount(1)
 const values:Record<string,string>={}
 for(const metric of ['loss','lr','grad_norm'])values[metric]=(await table.locator(`[data-source-metric="${metric}"]`).first().getAttribute('title'))!.replace('Exact source value ','')
 await table.getByRole('button',{name:/Pin row/}).first().click()
 for(const metric of ['loss','lr','grad_norm'])await expect(page.getByTestId(`pinned-${metric}`)).toHaveText(values[metric])
})
