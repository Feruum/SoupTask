import {test,expect} from '@playwright/test'

test('precision range controls answer hover immediately without ongoing color or shadow transitions',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 const button=page.getByRole('button',{name:'Apply range',exact:true});await button.scrollIntoViewIfNeeded()
 await button.hover()
 const running=()=>page.locator('.range-toolbar').evaluate(element=>element.getAnimations({subtree:true}).filter(animation=>animation.playState==='running').map(animation=>animation instanceof CSSTransition?animation.transitionProperty:'other animation'))
 expect(await running(),'hover feedback must not keep painting after the pointer reaches a chart').toEqual([])
 await page.locator('[data-testid="comparison-loss"] .u-over').hover({position:{x:100,y:20}})
 expect(await running(),'leaving a numeric control must not start return transitions').toEqual([])
})
