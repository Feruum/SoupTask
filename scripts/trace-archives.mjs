import { createReadStream, createWriteStream } from 'node:fs'
import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { createGzip, createGunzip } from 'node:zlib'
import { pipeline } from 'node:stream/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
const root=path.resolve('reports'),manifestPath=path.join(root,'trace-archives.json')
async function files(directory){const result=[];for(const entry of await readdir(directory,{withFileTypes:true})){const file=path.join(directory,entry.name);result.push(...entry.isDirectory()?await files(file):[file])}return result}
function relative(file){const result=path.relative(root,file);if(result.startsWith('..')||path.isAbsolute(result))throw Error('Trace target escapes reports');return `reports/${result.replaceAll('\\','/')}`}
async function digest(file){const hash=createHash('sha256');for await(const chunk of createReadStream(file))hash.update(chunk);return hash.digest('hex')}
if(process.argv.includes('--unpack')){
 const manifest=JSON.parse(await readFile(manifestPath,'utf8'))
 for(const entry of manifest.entries){
  const target=path.resolve(entry.raw),archive=path.resolve(entry.archive);relative(target);relative(archive)
  if(!target.endsWith('.json')||archive!==`${target}.gz`)throw Error('Unexpected trace archive target')
  try{await stat(target);if(await digest(target)!==entry.rawSha256)throw Error(`Existing trace differs: ${entry.raw}`);continue}catch(error){if(error.code!=='ENOENT')throw error}
  if(await digest(archive)!==entry.archiveSha256)throw Error(`Compressed trace hash differs: ${entry.archive}`)
  await pipeline(createReadStream(archive),createGunzip(),createWriteStream(target,{flags:'wx'}))
  if(await digest(target)!==entry.rawSha256)throw Error(`Restored trace hash differs: ${entry.raw}`)
 }
 console.log(`Verified/restored ${manifest.entries.length} exact raw Chrome traces.`)
}else{
 const entries=[]
 for(const raw of await files(root)){
  if(!/(?:chrome-trace|\.trace|memory-infra)\.json$/.test(raw))continue
  const archive=`${raw}.gz`,rawInfo=await stat(raw)
  const archived=await stat(archive).catch(error=>{if(error.code!=='ENOENT')throw error;return null})
  if(!archived||archived.mtimeMs<rawInfo.mtimeMs)await pipeline(createReadStream(raw),createGzip({level:6}),createWriteStream(archive))
  entries.push({kind:raw.endsWith('memory-infra.json')?'native-subsystem-dump':'chrome-trace',raw:relative(raw),archive:relative(archive),rawBytes:rawInfo.size,archiveBytes:(await stat(archive)).size,rawSha256:await digest(raw),archiveSha256:await digest(archive)})
 }
 await writeFile(manifestPath,JSON.stringify({generatedAt:new Date().toISOString(),scope:'Lossless gzip copies. Raw files remain locally; Git/source archives store gzip siblings. node scripts/trace-archives.mjs --unpack verifies/restores originals.',entries},null,2))
 console.log(`Preserved ${entries.length} profiler outputs as lossless, hashed gzip siblings.`)
}
