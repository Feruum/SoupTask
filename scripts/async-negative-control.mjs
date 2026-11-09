import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
const executedAt = new Date().toISOString()
const directory = `reports/async-negative/${executedAt.replace(/[:.]/g, '-')}`
mkdirSync(directory, { recursive: true })
const report = `${directory}/results.json`, log = `${directory}/output.txt`
const result = spawnSync(process.execPath, ['node_modules/vitest/vitest.mjs', 'run', 'src/worker/controller.test.ts', '--reporter=default', '--reporter=json', `--outputFile=${report}`], { encoding: 'utf8', env: { ...process.env, VITE_ASYNC_FAULT: 'accept-stale' } })
writeFileSync(log, result.stdout + result.stderr)
const parsed = JSON.parse(readFileSync(report, 'utf8'))
const failures = parsed.testResults.flatMap(file => file.assertionResults.filter(test => test.status === 'failed'))
const expected = [
  'bounds posts to one running and one latest view; rejects stale success and failure',
  'stale hover never overwrites newer inspection and cannot displace a pending view',
  'resize supersedes zoom and a duplicate reply cannot release a newer slot',
]
const names = failures.map(test => test.title)
if (result.status !== 1 || parsed.numTotalTests !== 8 || parsed.numPendingTests !== 0 || failures.length !== expected.length || !expected.every(name => names.includes(name)) || failures.some(test => !test.failureMessages.some(message => message.includes('AssertionError')))) throw new Error(`Stale-response control did not produce the exact expected assertion failures: ${names.join('; ')}`)
const sha256 = file => createHash('sha256').update(readFileSync(file)).digest('hex')
const manifest = { executedAt, fault: 'accept-stale', scope: 'Vitest test-mode only; the production build eliminates this switch', node: process.version, exitCode: result.status, expectedFailures: names, controllerHash: sha256('src/worker/controller.ts'), testHash: sha256('src/worker/controller.test.ts'), report, log, logHash: sha256(log) }
writeFileSync(`${directory}/manifest.json`, JSON.stringify(manifest, null, 2))
writeFileSync('reports/async-negative/manifest.json', JSON.stringify(manifest, null, 2))
console.log('Stale-response acceptance: detected three exact expected assertion failures; genuine raw output preserved.')
