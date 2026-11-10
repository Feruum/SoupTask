import { chromium } from '@playwright/test'
import {spawn,spawnSync} from 'node:child_process'
import {mkdir,writeFile,readFile} from 'node:fs/promises'
const cli=process.env.LIGHTHOUSE_CLI
if(!cli)throw Error('Set LIGHTHOUSE_CLI to the official lighthouse/cli/index.js installed by npm exec --package=lighthouse')
const directory=process.env.LIGHTHOUSE_OUT??'reports/lighthouse';await mkdir(directory,{recursive:true})
const buildMetadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4183'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
const results=[]
try{
 for(const [name,route] of [['dashboard','/dashboard'],['runs','/runs'],['run-detail','/runs/kazakh-sft-005'],['compare','/compare?runs=kazakh-sft-005,kazakh-sft-006'],['quality','/data-quality']]){
  const result=spawnSync(process.execPath,[cli,`http://127.0.0.1:4183${route}`,'--preset=desktop','--only-categories=performance,accessibility,best-practices','--output=html','--output=json',`--output-path=${directory}/${name}`,'--save-assets','--chrome-flags=--headless --no-sandbox','--quiet'],{env:{...process.env,CHROME_PATH:chromium.executablePath()},encoding:'utf8',timeout:180000,maxBuffer:10*1024*1024})
  await writeFile(`${directory}/${name}.log`,result.stdout+result.stderr)
  if(result.status!==0)throw Error(`Lighthouse ${name} failed: ${result.stderr}`)
  const report=JSON.parse(await readFile(`${directory}/${name}.report.json`,'utf8'))
  results.push({name,url:report.finalDisplayedUrl,fetchTime:report.fetchTime,categories:Object.fromEntries(Object.entries(report.categories).map(([k,v])=>[k,v.score])),runtimeError:report.runtimeError??null})
  console.log(results.at(-1))
 }
}finally{server.kill();await writeFile(`${directory}/summary.json`,JSON.stringify({scope:'Lighthouse desktop preset, its own simulation settings; separate from CPU4 before/after benchmark',sourceHash:buildMetadata.sourceHash,buildHash:buildMetadata.buildHash,results},null,2))}
