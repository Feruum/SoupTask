// A real process-footprint measurement. Heap/typed buffers are recorded separately.
import { chromium } from '@playwright/test'
import { spawn, spawnSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import os from 'node:os'

const out = process.env.MEMORY_OUT ?? 'reports/tab-memory'
const buildRoot = process.env.MEMORY_BUILD_ROOT ?? 'dist'
const expectedMode = process.env.MEMORY_MODE ?? 'indexed'
const headless = process.env.MEMORY_HEADLESS === 'true'
const initialOnly = process.env.MEMORY_INITIAL_ONLY === 'true'
await mkdir(out, { recursive: true })
await writeFile(`${out}/run-start.json`, JSON.stringify({ startedAt: new Date().toISOString(), platform: process.platform }, null, 2), { flag: 'wx' })
if (process.platform !== 'win32') throw Error('This harness explicitly records Windows process counters; use a platform-specific equivalent elsewhere')
const server = spawn(process.execPath, ['scripts/serve-build.mjs', buildRoot, '4192'], { stdio: 'pipe' })
await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); server.once('exit', code => reject(Error(`Preview exited ${code}`))) })
let browser
const checkpoints = []
let tracing = false
try {
  // One isolated browser, one page, no extensions or personal tabs.
  browser = await chromium.launch({ headless })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'en-US', timezoneId: 'Asia/Qyzylorda' })
  const page = await context.newPage()
  const pageCdp = await context.newCDPSession(page)
  const cdp = await browser.newBrowserCDPSession()
  await browser.startTracing(page, { screenshots: true, categories: ['devtools.timeline', 'blink.user_timing', 'disabled-by-default-memory-infra'] })
  tracing = true
  const ready = async () => {
    await page.waitForFunction(() => window.__soupEvidence?.viewSeq > 0 && [...document.querySelectorAll('.plot-host')].length === 3 && [...document.querySelectorAll('.plot-host')].every(e => e.dataset.viewReady === 'true'), undefined, { timeout: 60_000 })
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  }
  async function checkpoint(label) {
    const expectedMembers = label.startsWith('Compare') ? ['kazakh-sft-005', 'kazakh-sft-001', 'kazakh-sft-002', 'kazakh-sft-006'] : ['kazakh-sft-005']
    const expectedRawBytes = label.startsWith('Compare') ? 32_786_432 : 32_000_000
    const workspace = await page.evaluate(() => window.__soupEvidence ?? null)
    if (!workspace || workspace.sampler !== expectedMode || workspace.rawBufferBytes !== expectedRawBytes || JSON.stringify(workspace.members) !== JSON.stringify(expectedMembers)) throw Error(`Unexpected workspace at ${label}`)
    const marker = `soup:memory:${label}`
    await page.evaluate(name => performance.mark(name), marker)
    const workerMarkers = []
    for (const [index, worker] of page.workers().entries()) {
      const workerMarker = `${marker}:worker:${index}`
      await worker.evaluate(name => performance.mark(name), workerMarker)
      workerMarkers.push({ url: worker.url(), marker: workerMarker })
    }
    const processes = (await cdp.send('SystemInfo.getProcessInfo')).processInfo
    const ids = processes.map(p => p.id).filter(id => Number.isSafeInteger(id) && id > 0)
    if (!ids.length) throw Error('No isolated browser process IDs returned')
    const command = `Get-Process -Id ${ids.join(',')} -ErrorAction SilentlyContinue | Select-Object Id,ProcessName,WorkingSet64,PrivateMemorySize64,VirtualMemorySize64 | ConvertTo-Json -Depth 3 -Compress`
    const counterStart = new Date().toISOString()
    const readout = spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', command], { encoding: 'utf8', windowsHide: true })
    const counterEnd = new Date().toISOString()
    if (readout.status !== 0) throw Error(`Process-counter read failed: ${readout.stderr}`)
    const windowsProcesses = [JSON.parse(readout.stdout)].flat()
    const missingProcessIds = ids.filter(id => !windowsProcesses.some(process => process.Id === id))
    const dump = await cdp.send('Tracing.requestMemoryDump', { deterministic: false, levelOfDetail: 'detailed' })
    if (!dump.success || !dump.dumpGuid) throw Error(`Chromium memory dump failed at ${label}: ${JSON.stringify(dump)}`)
    const sample = { label, marker, workerMarkers, capturedAt: new Date().toISOString(), counterStart, counterEnd, processes, windowsProcesses, missingProcessIds, dump, mainHeap: await pageCdp.send('Runtime.getHeapUsage'), workspace, pageUrl: page.url() }
    checkpoints.push(sample)
    await writeFile(`${out}/checkpoints.partial.json`, JSON.stringify(checkpoints, null, 2))
    await page.screenshot({ path: `${out}/${label}.png`, fullPage: true })
    console.log(`Memory checkpoint ${label}: dump=${dump.success}`)
  }
  await page.goto('http://127.0.0.1:4192/runs/kazakh-sft-005')
  await ready()
  await checkpoint('1M-settled')
  if (!initialOnly) {
  for (let i = 0; i < 20; i++) {
    await page.getByRole('link', { name: 'Training runs', exact: true }).click()
    const id = i % 2 ? 'kazakh-sft-005' : 'kazakh-sft-001'
    await page.locator(`a[href="/runs/${id}"]`).first().click()
    await ready()
  }
  await checkpoint('1M-after-20-SPA-switches')
  await page.getByRole('link', { name: 'Compare', exact: true }).click()
  for (const id of ['005', '001', '002', '006']) await page.getByRole('checkbox', { name: `Compare kazakh-sft-${id}`, exact: true }).check()
  await ready()
  await checkpoint('Compare-1M-plus-three')
  }
  const traceBuffer = await browser.stopTracing()
  tracing = false
  const compressed = gzipSync(traceBuffer)
  await writeFile(`${out}/memory-chrome-trace.json.gz`, compressed)
  const trace = JSON.parse(traceBuffer.toString('utf8'))
  for (const sample of checkpoints) {
    const marker = trace.traceEvents.find(event => event.name === sample.marker)
    if (!marker?.pid) throw Error(`Cannot associate page marker with renderer process: ${sample.label}`)
    sample.rendererPid = marker.pid
    sample.markerTimestampUs = marker.ts
    if (!sample.processes.some(process => process.id === marker.pid && process.type === 'renderer')) throw Error(`Page marker PID ${marker.pid} is not an owned renderer`)
    sample.renderer = sample.windowsProcesses.find(process => process.Id === marker.pid)
    if (!sample.renderer) throw Error(`Renderer PID ${marker.pid} absent from Windows counters`)
    for (const worker of sample.workerMarkers) {
      const event = trace.traceEvents.find(event => event.name === worker.marker)
      if (!event?.pid) throw Error(`Cannot establish Worker PID from trace: ${worker.marker}`)
      worker.pid = event.pid
      worker.markerTimestampUs = event.ts
      if (!sample.windowsProcesses.some(process => process.Id === worker.pid)) throw Error(`Worker PID ${worker.pid} absent from own-browser OS counters`)
    }
    sample.tabOwnerPids = [...new Set([sample.rendererPid, ...sample.workerMarkers.map(worker => worker.pid)])]
    sample.tabOwnedProcesses = sample.windowsProcesses.filter(process => sample.tabOwnerPids.includes(process.Id))
    sample.tabOwnedPrivateCommittedBytes = sample.tabOwnedProcesses.reduce((sum, process) => sum + process.PrivateMemorySize64, 0)
    sample.tabOwnedWorkingSetBytes = sample.tabOwnedProcesses.reduce((sum, process) => sum + process.WorkingSet64, 0)
    // Retain Chromium's separate native dump for cross-checking, without adding it to OS counters.
    const guid = String(sample.dump.dumpGuid).replace(/^0x/, '').replace(/^0+/, '')
    sample.nativeDumpEvents = trace.traceEvents.filter(event => event.ph === 'v' && String(event.id ?? event.id2?.global ?? event.id2?.local ?? '').replace(/^0x/, '').replace(/^0+/, '') === guid).map(event => ({ pid: event.pid, id: event.id ?? event.id2, processTotals: event.args?.dumps?.process_totals ?? null }))
    sample.nativeDumpMatched = sample.nativeDumpEvents.length > 0
    sample.browserReportedProcessPrivateBytesSubtotal = sample.windowsProcesses.reduce((sum, process) => sum + process.PrivateMemorySize64, 0)
    sample.browserReportedProcessWorkingSetBytesSubtotal = sample.windowsProcesses.reduce((sum, process) => sum + process.WorkingSet64, 0)
  }
  await writeFile(`${out}/results.json`, JSON.stringify({ capturedAt: new Date().toISOString(), environment: { node: process.version, browser: browser.version(), os: os.platform(), release: os.release(), cpu: os.cpus()[0]?.model, viewport: '1440x900', dpr: 1, headed: !headless, initialOnly, cpuThrottling: 'none: separate memory experiment', gc: 'No forced GC; deterministic:false memory dumps', buildRoot, sampler: expectedMode, buildIndexSha256: createHash('sha256').update(await readFile(`${buildRoot}/index.html`)).digest('hex') }, scope: 'Windows OS process counters from the page renderer and every live dedicated Worker, each associated with a PID by its own User Timing marker in the same Chrome trace. Tab-owned private committed bytes/working set deduplicate those verified PIDs, including native allocations, not JS heap alone. SystemInfo-reported browser-process subtotals include shared browser/GPU/utility processes, are not exhaustive browser totals, and are not assigned wholly to the tab. Working-set sums may double-count shared pages. A process counter is not universal total tab/GPU memory, and is not a Chrome Task Manager screenshot. One isolated browser with one page, no personal profile; headed/headless configuration is recorded explicitly. Retiring isolates/shared infrastructure are reflected in the separately labelled process-subtotal scope. User Timing markers, Windows counters and the dump are sequential, not atomic; counter intervals and marker timestamps are retained.', trace: { file: 'memory-chrome-trace.json.gz', rawBytes: traceBuffer.length, compressedBytes: compressed.length, rawSha256: createHash('sha256').update(traceBuffer).digest('hex'), compressedSha256: createHash('sha256').update(compressed).digest('hex') }, checkpoints }, null, 2))
  console.log('Saved actual Windows renderer footprint, full isolated-browser context, native dumps and trace')
} finally {
  if (browser && tracing) await browser.stopTracing().catch(() => {})
  await browser?.close()
  server.kill()
}
