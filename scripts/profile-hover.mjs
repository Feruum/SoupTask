import { chromium } from '@playwright/test'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
const out = process.env.HOVER_PROFILE_OUT ?? 'reports/hover-profile'
const root = process.env.HOVER_BUILD_ROOT ?? 'dist'
await mkdir(out, { recursive: true })
await writeFile(`${out}/run-start.json`, JSON.stringify({ startedAt: new Date().toISOString(), root, scope: 'Diagnostic main-thread CPU profile with transparent Intl constructor instrumentation; timings include instrumentation overhead and are not the acceptance benchmark.' }), { flag: 'wx' })
const server = spawn(process.execPath, ['scripts/serve-build.mjs', root, '4197'], { stdio: 'pipe' })
await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); server.once('exit', code => reject(Error(`Profile server exited ${code}`))) })
let browser
try {
 browser = await chromium.launch()
 const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'en-US', timezoneId: 'Asia/Qyzylorda' })
 await page.addInitScript(() => {
  const measurements = { numberConstructions: 0, numberConstructionMs: 0 }
  Object.defineProperty(window, '__intlProfile', { value: measurements })
  Intl.NumberFormat = new Proxy(Intl.NumberFormat, { construct(target, args, newTarget) {
   const start = performance.now()
   try { return Reflect.construct(target, args, newTarget) }
   finally { measurements.numberConstructions++; measurements.numberConstructionMs += performance.now() - start }
  } })
 })
 const cdp = await page.context().newCDPSession(page)
 await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
 await page.goto('http://127.0.0.1:4197/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006')
 await page.waitForFunction(() => document.querySelectorAll('.plot-host[data-view-ready="true"]').length === 3, undefined, { timeout: 60_000 })
 await page.getByLabel('From step', { exact: true }).fill('100')
 await page.getByLabel('To step', { exact: true }).fill('200')
 await page.getByRole('button', { name: 'Apply range', exact: true }).click()
 await page.waitForFunction(() => document.querySelector('.plot-host')?.dataset.rangeMin === '100' && document.querySelectorAll('.plot-host[data-view-ready="true"]').length === 3)
 const plot = page.locator('[data-testid="comparison-loss"] .u-over')
 await plot.scrollIntoViewIfNeeded()
 const box = await plot.boundingBox()
 if (!box) throw Error('No actual chart interaction surface')
 await cdp.send('Profiler.enable')
 await cdp.send('Profiler.setSamplingInterval', { interval: 1000 })
 await page.evaluate(() => { window.__intlProfile.numberConstructions = 0; window.__intlProfile.numberConstructionMs = 0 })
 await cdp.send('Profiler.start')
 for (let index = 0; index < 30; index++) {
  const before = await page.evaluate(() => window.__soupEvidence.acceptedHoverSeq)
  await page.mouse.move(box.x + box.width * (.12 + index * .025), box.y + box.height * .5)
  await page.waitForFunction(previous => {
   const evidence = window.__soupEvidence
   const last = performance.getEntriesByName('soup:hover-frame').at(-1)
   return evidence.acceptedHoverSeq > previous && last?.detail.hoverSeq === evidence.acceptedHoverSeq && last.detail.viewSeq === evidence.viewSeq
  }, before)
 }
 const { profile } = await cdp.send('Profiler.stop')
 const counters = await page.evaluate(() => ({ ...window.__intlProfile, hoverMeasures: performance.getEntriesByName('soup:hover-frame').map(entry => entry.detail) }))
 await writeFile(`${out}/main.cpuprofile`, JSON.stringify(profile))
 await writeFile(`${out}/results.json`, JSON.stringify({ browser: browser.version(), cpuScope: 'Main renderer ×4, Worker unthrottled', range: [100, 200], pointerActions: 30, ...counters }, null, 2))
 console.log(JSON.stringify({ actions: 30, numberConstructions: counters.numberConstructions, numberConstructionMs: counters.numberConstructionMs }))
} finally { await browser?.close(); server.kill() }
