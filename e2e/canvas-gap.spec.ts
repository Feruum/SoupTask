import { expect, test } from '@playwright/test'

test('NaN creates a painted gap while the finite strokes on both sides remain visible', async ({ page }, info) => {
  await page.goto('/runs/kazakh-sft-006')
  const host=page.getByTestId('loss-chart')
  await expect(host).toHaveAttribute('data-view-ready','true',{timeout:60000})
  await page.getByLabel('From step',{exact:true}).fill('4094')
  await page.getByLabel('To step',{exact:true}).fill('4098')
  await page.getByRole('button',{name:'Apply range',exact:true}).click()
  await expect(host).toHaveAttribute('data-range-min','4094')
  await expect(host).toHaveAttribute('data-range-max','4098')
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
  const evidence=await host.evaluate(element=>{
    const canvas=element.querySelector('canvas')!, context=canvas.getContext('2d')!
    const dpr=devicePixelRatio
    const left=Number(element.getAttribute('data-plot-left'))*dpr,top=Number(element.getAttribute('data-plot-top'))*dpr,width=Number(element.getAttribute('data-plot-width'))*dpr,height=Number(element.getAttribute('data-plot-height'))*dpr
    const sample=document.createElement('canvas');sample.width=sample.height=1
    const sampleContext=sample.getContext('2d')!;sampleContext.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--chart-line').trim();sampleContext.fillRect(0,0,1,1)
    const rgb=[...sampleContext.getImageData(0,0,1,1).data].slice(0,3)
    const count=(from:number,to:number)=>{
      const x=Math.ceil(left+(from-4094)/4*width),end=Math.floor(left+(to-4094)/4*width),y=Math.ceil(top+1),h=Math.max(1,Math.floor(height-2))
      const bytes=context.getImageData(x,y,Math.max(1,end-x),h).data
      let hits=0;for(let i=0;i<bytes.length;i+=4)if(bytes[i+3]>0&&rgb.every((value,index)=>Math.abs(value-bytes[i+index])<35))hits++
      return hits
    }
    return {testId:'CANVAS-NAN-GAP-4096',left:count(4094.15,4094.8),gap:count(4095.5,4096.5),right:count(4097.2,4097.85),rgb,plot:{left,top,width,height},range:[4094,4098],invalidStep:4096}
  })
  await info.attach('actual-gap-pixels',{body:JSON.stringify(evidence,null,2),contentType:'application/json'})
  await page.screenshot({path:info.outputPath('actual-nan-gap.png'),fullPage:true})
  expect(evidence.left,'positive control: finite left segment must really be painted').toBeGreaterThan(2)
  expect(evidence.right,'positive control: finite right segment must really be painted').toBeGreaterThan(2)
  expect(evidence.gap,'no source-colored stroke may bridge the NaN interval').toBe(0)
})
