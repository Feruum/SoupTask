import {chromium} from '@playwright/test'
import {spawn} from 'node:child_process'
import {writeFile,mkdir} from 'node:fs/promises'
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4186'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
const browser=await chromium.launch({headless:false})
const page=await browser.newPage({viewport:{width:1440,height:900},locale:'en-US',timezoneId:'Asia/Qyzylorda'})
await page.goto('http://127.0.0.1:4186/runs/kazakh-sft-005')
await page.waitForFunction(()=>window.__soupEvidence?.viewSeq>0&&document.querySelectorAll('[data-view-ready="true"]').length>=3)
const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable')
await mkdir('reports/manual',{recursive:true})
await writeFile('reports/manual/headed-memory.json',JSON.stringify({scope:'Separate headed Chrome instance, unthrottled. For pairing with Chrome Task Manager, not a benchmark timing sample.',browser:browser.version(),capturedAt:new Date().toISOString(),mainHeap:await cdp.send('Runtime.getHeapUsage'),mainMetrics:await cdp.send('Performance.getMetrics'),workspace:await page.evaluate(()=>window.__soupEvidence)},null,2))
console.log('Headed Chrome ready at 127.0.0.1:4186, 1M dataset. Enter close to clean up.')
async function close(){await browser.close();server.kill();process.exit(0)}
process.stdin.on('data',data=>{if(String(data).trim()==='close')void close()})
process.on('SIGINT',()=>void close())
process.stdin.resume()
