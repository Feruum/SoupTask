import { createHash } from 'node:crypto'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
import {spawnSync} from 'node:child_process'
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
async function files(directory) {
  const entries = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = `${directory}/${entry.name}`
    entries.push(...entry.isDirectory() ? await files(file) : [{ file, bytes: (await readFile(file)).byteLength, sha256: hash(await readFile(file)) }])
  }
  return entries.sort((a, b) => a.file.localeCompare(b.file))
}
const packageJson = JSON.parse(await readFile('package.json', 'utf8'))
const versions = {}
for (const name of [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.devDependencies)]) versions[name] = JSON.parse(await readFile(`node_modules/${name}/package.json`, 'utf8')).version
const source = await files('src'), build = await files('dist')
const commit=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8',windowsHide:true})
if(commit.status!==0||! /^[a-f0-9]{40}$/.test(commit.stdout.trim()))throw Error('Cannot identify the source repository commit')
const diff=spawnSync('git',['diff','--name-only','HEAD','--','src','package.json','package-lock.json','index.html','vite.config.ts'],{encoding:'utf8',windowsHide:true})
if(diff.status!==0)throw Error('Cannot verify tracked application source state')
await writeFile('reports/build-metadata.json', JSON.stringify({ generatedAt: new Date().toISOString(), git: {commit:commit.stdout.trim(),trackedApplicationChanges:diff.stdout.trim().split(/\r?\n/).filter(Boolean)}, node: process.version, platform: os.platform(), os: os.release(), cpu: os.cpus()[0].model, versions, lockHash: hash(await readFile('package-lock.json')), sourceHash: hash(JSON.stringify(source)), buildHash: hash(JSON.stringify(build)), source, build }, null, 2))
console.log('Recorded installed versions and source/build hashes.')
