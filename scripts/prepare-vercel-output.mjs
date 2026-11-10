import {cp,mkdir,writeFile,readFile} from 'node:fs/promises'
import assert from 'node:assert/strict'
const project=JSON.parse(await readFile('.vercel/project.json','utf8'))
assert.equal(project.projectName,'soup-training-monitor')
// Official version3 static Build Output API: https://vercel.com/docs/build-output-api/configuration
await mkdir('.vercel/output',{recursive:true})
await cp('dist','.vercel/output/static',{recursive:true})
await writeFile('.vercel/output/config.json',JSON.stringify({version:3,routes:[{handle:'filesystem'},{src:'/assets/.*',status:404},{src:'/.*',dest:'/index.html'}]},null,2))
console.log('Prepared tested dist bytes for the authorized soup-training-monitor project.')
