import { createHash } from 'node:crypto'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import os from 'node:os'
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
await writeFile('reports/build-metadata.json', JSON.stringify({ generatedAt: new Date().toISOString(), node: process.version, platform: os.platform(), os: os.release(), cpu: os.cpus()[0].model, versions, lockHash: hash(await readFile('package-lock.json')), sourceHash: hash(JSON.stringify(source)), buildHash: hash(JSON.stringify(build)), source, build }, null, 2))
console.log('Recorded installed versions and source/build hashes.')
