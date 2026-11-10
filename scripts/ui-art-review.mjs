import {chromium} from '@playwright/test'
import {spawn} from 'node:child_process'
import {mkdir,writeFile} from 'node:fs/promises'
const out='reports/memory-investigation-2026-11-10/artwork-review'
await mkdir(out,{recursive:true});const results=[]
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4197'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
const browser=await chromium.launch()
try{
 for(const [theme,width,dpr]of [['dark',1440,1],['light',320,2]]){
  const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:dpr,reducedMotion:'reduce'})
  await context.addInitScript(theme=>localStorage.setItem('soup-theme',theme),theme)
  const page=await context.newPage()
  await page.goto('http://127.0.0.1:4197/runs/kazakh-sft-001');await page.getByRole('button',{name:'Run information',exact:true}).click()
  await page.locator('.recipe-heading img').evaluate(async image=>{await image.decode()})
  await page.locator('.recipe-heading').screenshot({path:`${out}/recipe-${theme}.png`})
  const recipe=await page.locator('.recipe-heading img').evaluate(image=>({src:image.currentSrc,naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight}))
  await page.goto('http://127.0.0.1:4197/runs');await page.getByLabel('Search runs').fill('no-run-matches-memory-review')
  await page.locator('.illustrated-empty [data-soup-art] img').evaluate(async image=>{await image.decode()})
  await page.locator('.illustrated-empty').screenshot({path:`${out}/empty-${theme}.png`})
  results.push({theme,width,dpr,recipe});await context.close()
 }
 await writeFile(`${out}/results.json`,JSON.stringify({scope:'Actual app captures, nearest-neighbour responsive art; desktop dark DPR1 and mobile light DPR2. Human/assistant visual review is separate from this capture script.',results},null,2))
}finally{await browser.close();server.kill()}
