import {test,expect} from '@playwright/test'

test('settled source hover confines layout to readouts instead of relaying it through the document',async({page})=>{
 await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3&&(window.__soupEvidence?.hoverCacheTargets??0)>0)
 const plot=page.locator('[data-testid="comparison-loss"] .u-over');await plot.scrollIntoViewIfNeeded()
 const box=(await plot.boundingBox())!
 await page.mouse.move(box.x+box.width*.25,box.y+box.height*.5)
 await page.waitForFunction(()=>performance.getEntriesByName('soup:hover-frame').length>0)
 const cdp=await page.context().newCDPSession(page)
 type Event={name:string;args?:{beginData?:{partialLayout?:boolean;dirtyObjects?:number}}}
 const events: Event[]=[]
 cdp.on('Tracing.dataCollected',({value})=>events.push(...value as unknown as Event[]))
 await cdp.send('Tracing.start',{categories:'devtools.timeline',transferMode:'ReportEvents'})
 const before=await page.evaluate(()=>window.__soupEvidence!.acceptedHoverSeq)
 await page.mouse.move(box.x+box.width*.65,box.y+box.height*.5)
 await page.waitForFunction(previous=>(performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark|undefined)?.detail.hoverSeq>previous,before)
 const done=new Promise<void>(resolve=>cdp.once('Tracing.tracingComplete',()=>resolve()))
 await cdp.send('Tracing.end');await done
 const layouts=events.filter(event=>event.name==='Layout')
 await test.info().attach('settled-hover-layout.json',{body:JSON.stringify(layouts,null,2),contentType:'application/json'})
 expect(layouts.length,'the source text actually caused a layout').toBeGreaterThan(0)
 expect(layouts.filter(event=>event.args?.beginData?.partialLayout===false),'cursor changes must not invalidate document-wide layout').toEqual([])
})
