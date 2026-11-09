import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import path from 'node:path'
import os from 'node:os'
const hash=bytes=>createHash('sha256').update(bytes).digest('hex')
async function inventory(directory){const files=[];for(const entry of await readdir(directory,{withFileTypes:true})){const name=path.join(directory,entry.name);if(entry.isDirectory())files.push(...await inventory(name));else files.push({path:name.replaceAll('\\','/'),sha256:hash(await readFile(name))})}return files.sort((a,b)=>a.path.localeCompare(b.path))}
async function json(file){try{return JSON.parse(await readFile(file,'utf8'))}catch{return null}}
await mkdir('reports',{recursive:true})
const unit=await json('reports/full-unit.json'),browser=await json('reports/e2e-full.json'),perf=await json(process.env.FINAL_PERF??'reports/performance-paint/results.json'),lighthouse=await json('reports/lighthouse-final/summary.json'),canvas=await json('reports/canvas-controls-final/manifest.json'),deploy=await json('reports/deployment.json'),nativeMemory=await json('reports/manual/native-memory-status.json'),runtime=await json('reports/manual/runtime-contrast.json'),axe=await json('reports/a11y-summary.json')
const sources=[...await inventory('src'),...await inventory('scripts'),...await inventory('e2e'),...await inventory('assets')]
for(const file of ['package.json','package-lock.json','vite.config.ts','vitest.config.ts','playwright.config.ts','tsconfig.json','tsconfig.app.json','tsconfig.node.json','index.html','components.json','.oxlintrc.json','.npmrc','.nvmrc','.vercelignore','.gitignore','.gitattributes','vercel.json'])sources.push({path:file,sha256:hash(await readFile(file))})
const pending=[]
if(!unit?.success)pending.push('Unit suite is not green')
if(!browser?.stats||browser.stats.unexpected)pending.push('Browser acceptance is not green')
if(!perf?.sourceUnchanged||Object.keys(perf.summary??{}).length!==3)pending.push('Comparable production scan/stream/indexed measurements missing or source changed')
if(lighthouse?.results?.length!==5)pending.push('Five Lighthouse reports missing')
if(!canvas?.results?.every(result=>result.accepted)||canvas.results.length!==2)pending.push('Canvas negative-control manifest missing or not accepted')
if(!deploy?.verified)pending.push('Production deployment smoke missing')
if(nativeMemory?.status!=='recorded')pending.push('Chrome Task Manager footprint/JavaScript memory remains unrecorded: native window binding failed; human readout requested')
if(runtime?.results?.length!==2||!runtime.lifecycle?.at(-1)?.contextClosed||runtime.lifecycle.at(-1).liveWorkers!==0)pending.push('Runtime Canvas contrast/SVG/lifecycle review missing')
if(!axe?.audits||axe.violations)pending.push('Final axe audit summary missing or has violations')
const targets=perf?{cold:{limitMs:3000,actualMs:perf.summary.indexed?.cold.p95},zoom:{limitMs:200,actualMs:perf.summary.indexed?.zoom.p95},hover:{limitMs:50,actualMs:perf.summary.indexed?.hover.p95},compareZoom:{limitMs:200,actualMs:perf.summary.indexed?.compare.zoom.p95},compareHover:{limitMs:50,actualMs:perf.summary.indexed?.compare.hover.p95}}:null
await writeFile('reports/evidence-manifest.json',JSON.stringify({generatedAt:new Date().toISOString(),environment:{node:process.version,platform:os.platform(),release:os.release(),cpu:os.cpus()[0]?.model},verdict:pending.length?"DON'T SHIP — outstanding evidence":"SHIP",pending,engineeringTargets:targets,unit:unit?{success:unit.success,total:unit.numTotalTests,passed:unit.numPassedTests,failed:unit.numFailedTests}:null,browser:browser?.stats??null,performance:perf?.summary??null,lighthouse:lighthouse?.results??null,canvasControls:canvas,deployment:deploy,sources,sourceTreeHash:hash(JSON.stringify(sources)),artifacts:(await inventory('reports')).filter(f=>f.path!=='reports/evidence-manifest.json')},null,2))
console.log('Evidence manifest written; pending requirements:',pending)
