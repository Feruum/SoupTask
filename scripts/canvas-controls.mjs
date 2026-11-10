import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { spawn, spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

export const CANVAS_SPIKE_TEST_ID = 'CANVAS-SPIKE-SOURCE-500001'
export async function assertSpikePainted(page) {
  const host = page.getByTestId('loss-chart')
  await host.waitFor({ state: 'visible', timeout: 60000 })
  await page.waitForFunction(() => document.querySelector('[data-testid="loss-chart"]')?.getAttribute('data-spike-source-index') === '500001', undefined, { timeout: 60000 })
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  const evidence = await host.evaluate(element => {
    const canvas = element.querySelector('canvas'), context = canvas.getContext('2d')
    const x = Number(element.getAttribute('data-spike-x')), y = Number(element.getAttribute('data-spike-y'))
    const sample = document.createElement('canvas'); sample.width = sample.height = 1
    const sampleContext = sample.getContext('2d'); sampleContext.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-line').trim(); sampleContext.fillRect(0,0,1,1)
    const rgb = [...sampleContext.getImageData(0,0,1,1).data].slice(0,3)
    const bytes = context.getImageData(Math.max(0,Math.round(x)-5), Math.max(0,Math.round(y)-5),11,11).data
    let painted = 0, distance = Infinity, paintedRgb = null
    for(let i=0;i<bytes.length;i+=4) {
      if(bytes[i+3]>0 && rgb.every((value,index)=>Math.abs(value-bytes[i+index])<35)) painted++
      const difference=rgb.reduce((sum,value,index)=>sum+Math.abs(value-bytes[i+index]),0)
      if(bytes[i+3]>=250 && difference<distance){distance=difference;paintedRgb=[...bytes.slice(i,i+3)]}
    }
    const background=getComputedStyle(element.closest('.chart-panel')).backgroundColor
    return { painted, x, y, sourceIndex: element.getAttribute('data-spike-source-index'), step:element.getAttribute('data-spike-step'), value:element.getAttribute('data-spike-value'), rgb, paintedRgb, background }
  })
  try { assert.ok(evidence.painted > 2, `${CANVAS_SPIKE_TEST_ID}: critical maximum marker must exist in Canvas pixels; observed ${evidence.painted}`) }
  catch(error) { error.canvasEvidence = evidence; throw error }
  assert.equal(evidence.step,'500001',`${CANVAS_SPIKE_TEST_ID}: source step must remain exact`)
  assert.equal(evidence.value,'100',`${CANVAS_SPIKE_TEST_ID}: source value must remain exact`)
  return evidence
}

async function child(mode, url, output) {
  const browser = await chromium.launch()
  const report = { testId: CANVAS_SPIKE_TEST_ID, mode, url, browser:browser.version(), node:process.version, viewport:{width:1440,height:900}, dpr:1, passed:false }
  try {
    const context = await browser.newContext({ viewport:report.viewport, deviceScaleFactor:1, locale:'en-US', timezoneId:'Asia/Qyzylorda' })
    const page = await context.newPage()
    await page.goto(`${url}/runs/kazakh-sft-005`)
    report.canvasEvidence = await assertSpikePainted(page)
    report.passed = true
    console.log(`PASS ${CANVAS_SPIKE_TEST_ID}: ${report.canvasEvidence.painted} source-colored pixels`)
    await page.screenshot({path:output.replace(/\.json$/,'.png'),fullPage:true})
  } catch(error) {
    report.failure = { name:error.name, code:error.code??null, message:error.message, canvasEvidence:error.canvasEvidence??null }
    console.error(error.stack)
    process.exitCode = 1
  } finally {
    await browser.close()
    await writeFile(output, JSON.stringify(report,null,2))
  }
}
async function main() {
  const out=process.env.CANVAS_OUT??'reports/canvas-controls'
  await mkdir(out,{recursive:true})
  const results=[]
  for(const mode of ['normal','suppress']) {
    const directory=`tmp/canvas-${mode}`, port=mode==='normal'?4183:4184
    const build=spawnSync(process.execPath,['node_modules/vite/bin/vite.js','build','--outDir',directory],{env:{...process.env,VITE_RENDER_FAULT:mode==='suppress'?'suppress':'',VITE_SAMPLER_MODE:'indexed'},encoding:'utf8'})
    await writeFile(`${out}/${mode}-build.log`,build.stdout+build.stderr)
    assert.equal(build.status,0,`${mode} build must succeed before pixel proof`)
    const server=spawn(process.execPath,['scripts/serve-build.mjs',directory,String(port)],{stdio:'pipe'})
    await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(Error(`Canvas server exited ${code}`)))})
    try {
      const reportPath=`${out}/${mode}.json`
      const result=await new Promise((resolve,reject)=>{
        const proc=spawn(process.execPath,['scripts/canvas-controls.mjs','--child',mode,`http://127.0.0.1:${port}`,reportPath],{env:{...process.env,FAULT:mode},stdio:'pipe'})
        let stdout='',stderr='';proc.stdout.on('data',chunk=>stdout+=chunk);proc.stderr.on('data',chunk=>stderr+=chunk);proc.once('error',reject);proc.once('exit',(exitCode,signal)=>resolve({exitCode,signal,stdout,stderr}))
      })
      await writeFile(`${out}/${mode}-stdout.txt`,result.stdout)
      await writeFile(`${out}/${mode}-stderr.txt`,result.stderr)
      const report=JSON.parse(await readFile(reportPath,'utf8'))
      const accepted=mode==='normal' ? result.exitCode===0 && report.passed===true && report.canvasEvidence.painted>2 : result.exitCode===1 && report.failure?.code==='ERR_ASSERTION' && report.failure?.canvasEvidence?.painted===0 && report.testId===CANVAS_SPIKE_TEST_ID
      results.push({mode,exitCode:result.exitCode,signal:result.signal,expectedExit:mode==='normal'?0:1,accepted,report:reportPath})
      await writeFile(`${out}/manifest.json`,JSON.stringify({scope:'Same actual source-coordinate Canvas pixel assertion on correct and suppressed-drawing production builds. Raw subprocess output retained.',results},null,2))
      process.stdout.write(result.stdout)
      assert.ok(accepted,`${mode} did not produce the specified pixel assertion outcome; see retained output`)
    } finally { server.kill() }
  }
}
if(process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url) {
  if(process.argv[2]==='--child') await child(process.argv[3],process.argv[4],process.argv[5])
  else await main()
}
