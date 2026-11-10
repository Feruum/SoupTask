import assert from 'node:assert/strict'
import {readFile,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
const metadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
const report=JSON.parse(await readFile('reports/deployment.json','utf8'))
assert.equal(new URL(report.url).hostname,'soup-training-monitor.vercel.app')
const checks=[]
async function get(url){
 for(let attempt=1;attempt<=3;attempt++){
  try{const response=await fetch(url,{signal:AbortSignal.timeout(20000)});return {response,bytes:Buffer.from(await response.arrayBuffer())}}
  catch(error){if(attempt===3)throw error;console.log(`Transient artifact fetch failed; retry ${attempt}/2`)}
 }
}
for(const file of metadata.build.filter(item=>/\.(?:js|css|html)$/.test(item.file))){
 const {response,bytes}=await get(new URL(file.file.replace(/^dist\//,''),`${report.url}/`))
 assert.equal(response.status,200)
 const actual=createHash('sha256').update(bytes).digest('hex')
 checks.push({file:file.file,expectedSha256:file.sha256,actualSha256:actual})
 assert.equal(actual,file.sha256,`Remote bytes differ for ${file.file}`)
}
report.remoteBuildVerification={executedAt:new Date().toISOString(),verified:true,scope:'Decompressed HTTPS response bytes for every local production JS, CSS and HTML artifact match the saved local SHA256; includes module Worker.',checks}
await writeFile('reports/deployment.json',JSON.stringify(report,null,2))
console.log(`Matched ${checks.length} deployed HTML/JS/CSS artifacts to the tested local build.`)
