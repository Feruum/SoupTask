import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { assertSpikePainted } from './canvas-controls.mjs'
const base=process.argv[2]
if(!base||new URL(base).protocol!=='https:')throw new Error('Supply the actual HTTPS URL returned by Vercel deploy')
const directory=process.env.DEPLOY_SMOKE_OUT??'reports/deployed-smoke';await mkdir(directory,{recursive:true})
const metadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
const browser=await chromium.launch(),context=await browser.newContext({viewport:{width:1440,height:900},locale:'en-US',timezoneId:'Asia/Qyzylorda'})
const page=await context.newPage(),errors=[],assets=[],routes=[]
page.on('pageerror',error=>errors.push(error.message))
page.on('response',response=>{if(new URL(response.url()).pathname.startsWith('/assets/'))assets.push({url:response.url(),status:response.status(),contentType:response.headers()['content-type']??''})})
let verified=false,spike=null,missingAsset=null
try{
 for(const [name,route,heading] of [['dashboard','/dashboard','Training overview'],['runs','/runs','Training runs'],['detail','/runs/kazakh-sft-005','kazakh-sft-005'],['compare','/compare?runs=kazakh-sft-005,kazakh-sft-006','Compare runs'],['quality','/data-quality','Data quality']]){
  const response=await page.goto(new URL(route,base).href)
  assert.equal(response.status(),200,`Direct route ${route} must load`)
  await expect(page.locator('h1')).toHaveText(heading,{timeout:60000})
  if(name==='detail'||name==='compare')await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3,undefined,{timeout:60000})
  const reload=await page.reload();assert.equal(reload.status(),200)
  await expect(page.locator('h1')).toHaveText(heading,{timeout:60000})
  if(name==='dashboard')await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===1,undefined,{timeout:60000})
  if(name==='detail'){
   spike=await assertSpikePainted(page)
   await page.getByRole('button',{name:'Source',exact:true}).click()
   await page.getByLabel('Inspect by').selectOption('sourceIndex')
   await page.getByLabel('Source index',{exact:true}).fill('500001')
   await page.getByRole('button',{name:'Inspect source',exact:true}).click()
   await expect(page.getByTestId('inspected-loss')).toHaveText('100.000')
  }
  if(name==='compare')await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length===3,undefined,{timeout:60000})
  await page.screenshot({path:`${directory}/${name}.png`,fullPage:true})
  routes.push({name,route,directStatus:response.status(),reloadStatus:reload.status(),heading:await page.locator('h1').textContent()})
 }
 await page.goto(new URL('/',base).href);await expect(page).toHaveURL(/\/dashboard$/)
 await page.goto(new URL('/runs/unknown',base).href);await expect(page.locator('h1')).toHaveText('Run not found')
 await page.goto(new URL('/unknown',base).href);await expect(page.locator('h1')).toHaveText('Not found')
 const missing=await context.request.get(new URL('/assets/no-such-soup-asset.js',base).href)
 missingAsset={status:missing.status(),contentType:missing.headers()['content-type']};assert.equal(missing.status(),404)
 assert.ok(assets.some(asset=>asset.url.includes('training.worker-')&&asset.status===200&&asset.contentType.includes('javascript')),'Actual module Worker must load as JavaScript')
 assert.ok(assets.every(asset=>asset.status===200||(asset.status===304&&assets.some(initial=>initial.url===asset.url&&initial.status===200))),'Every asset must load as 200 or revalidate a previously received 200 body with 304')
 assert.deepEqual(errors,[],'Production must not report uncaught page errors')
 verified=true
}finally{
 const report={verified,url:base,executedAt:new Date().toISOString(),browser:browser.version(),node:process.version,sourceHash:metadata.sourceHash,localBuildHash:metadata.buildHash,scope:'Real production direct-load and reload of all five screens, Worker/assets, exact R05 raw source and Canvas spike, root/unknown routing. Not a remote performance benchmark.',routes,spike,assets,missingAsset,errors}
 await writeFile('reports/deployment.json',JSON.stringify(report,null,2));await context.close();await browser.close()
}
console.log(`Production smoke verified: ${base}`)
