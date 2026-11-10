import {spawnSync} from 'node:child_process'
import {readFile,writeFile,readdir,mkdir,unlink} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import assert from 'node:assert/strict'
const out=process.env.CSS_INPUT_OUT??'reports/perf-targets-2026-11-10/css-input-check'
await mkdir(out,{recursive:true})
const probe='reports/utility-source-probe.html'
async function build(name){
 const dir=`tmp/css-input-${name}`
 const result=spawnSync(process.execPath,['node_modules/vite/bin/vite.js','build','--outDir',dir],{encoding:'utf8'})
 await writeFile(`${out}/${name}-build.log`,result.stdout+result.stderr)
 assert.equal(result.status,0)
 const css=[]
 for(const file of (await readdir(`${dir}/assets`)).filter(name=>name.endsWith('.css')).sort())css.push(await readFile(`${dir}/assets/${file}`))
 return {bytes:css.reduce((sum,v)=>sum+v.length,0),hash:createHash('sha256').update(Buffer.concat(css)).digest('hex')}
}
let before,after
try{
 before=await build('without-probe')
 const utility=['bg-','[','#','123abc',']'].join('')
 await writeFile(probe,`<div class="${utility}">External measurement report input</div>`)
 after=await build('with-probe')
}finally{await unlink(probe).catch(error=>{if(error.code!=='ENOENT')throw error})}
const passed=before.hash===after.hash
await writeFile(`${out}/results.json`,JSON.stringify({passed,before,after,scope:'Two unchanged application builds differing only in an unrelated report HTML utility class. CSS output must be independent of measurement artifacts.'},null,2))
assert.ok(passed,'External report changed app CSS; production inputs are not bounded')
console.log('CSS output is independent of unrelated report content.')
