import {test,expect} from '@playwright/test'

test('range apply retains its geometry during a precision chart operation',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3)
 const button=page.getByRole('button',{name:'Apply range',exact:true});await button.scrollIntoViewIfNeeded()
 const before=(await button.boundingBox())!
 await page.mouse.move(before.x+before.width/2,before.y+before.height/2);await page.mouse.down()
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
 const pressed=(await button.boundingBox())!
 await page.mouse.up()
 expect(Math.abs(pressed.width-before.width),'numeric range controls must keep their press rectangle stable').toBeLessThan(.25)
})
