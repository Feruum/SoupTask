import { expect, test } from '@playwright/test'

test('a pointer on previous axes is not queued as a hover for a pending new view', async ({ page }) => {
  await page.addInitScript(() => {
    const tracked = window as Window & { __holdView?: boolean; __viewHeld?: boolean; __releaseView?: () => void; __hoverSteps?: number[] }
    const NativeWorker = Worker
    window.Worker = class extends NativeWorker {
      constructor(url: string | URL, options?: WorkerOptions) {
        super(url, options)
        let handler: ((this: Worker, event: MessageEvent) => unknown) | null = null
        Object.defineProperty(this, 'onmessage', { get: () => handler, set: next => { handler = next }, configurable: true })
        this.addEventListener('message', event => {
          if (tracked.__holdView && event.data.kind === 'view-packed') {
            tracked.__viewHeld = true
            tracked.__releaseView = () => { tracked.__holdView = false; handler?.call(this, event) }
          } else handler?.call(this, event)
        })
      }
      postMessage(message: unknown, options?: Transferable[] | StructuredSerializeOptions) {
        if (message && typeof message === 'object' && 'kind' in message && message.kind === 'hover' && 'step' in message) (tracked.__hoverSteps ??= []).push(Number(message.step))
        return Reflect.apply(NativeWorker.prototype.postMessage, this, [message, options])
      }
    }
  })
  await page.goto('/runs/kazakh-sft-005')
  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  await page.evaluate(() => document.fonts.ready)
  await page.getByLabel('From step', { exact: true }).fill('100')
  await page.getByLabel('To step', { exact: true }).fill('200')
  await page.evaluate(() => { const state = window as Window & { __holdView?: boolean; __hoverSteps?: number[] }; state.__holdView = true; state.__hoverSteps = [] })
  await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  await expect.poll(() => page.evaluate(() => (window as Window & { __viewHeld?: boolean }).__viewHeld)).toBe(true)
  try {
    const surface = page.locator('.u-over').first()
    await surface.scrollIntoViewIfNeeded()
    const box = await surface.boundingBox()
    if (!box) throw Error('Missing previous accepted chart')
    await page.mouse.move(box.x + box.width * .75, box.y + box.height * .5)
    await page.evaluate(() => (window as Window & { __releaseView?: () => void }).__releaseView?.())
    await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min', '100')
    await expect.poll(() => page.evaluate(() => (window as Window & { __hoverSteps?: number[] }).__hoverSteps?.length ?? 0)).toBeGreaterThan(0)
    const steps = await page.evaluate(() => (window as Window & { __hoverSteps?: number[] }).__hoverSteps ?? [])
    expect(steps.every(step => step >= 100 && step <= 200)).toBe(true)
  } finally { await page.evaluate(() => (window as Window & { __releaseView?: () => void }).__releaseView?.()) }
})

test('a source hover request is dispatched without waiting for an available animation frame', async ({ page }) => {
  await page.addInitScript(() => {
    // Exercise the uncached fallback explicitly. Prepared cache failure must release its bounded slot.
    const NativeWorker=Worker
    window.Worker=class extends NativeWorker {
      constructor(url:string|URL,options?:WorkerOptions){
        super(url,options)
        let handler:((this:Worker,event:MessageEvent)=>unknown)|null=null
        Object.defineProperty(this,'onmessage',{get:()=>handler,set:next=>{handler=next},configurable:true})
        this.addEventListener('message',event=>handler?.call(this,event.data.kind==='hover-prepared'?new MessageEvent('message',{data:{...event.data,kind:'error',operation:'prepare-hover',message:'Cache disabled by fallback regression'}}):event))
      }
    }
    const tracked = window as Window & { __hoverPosts?: number }
    tracked.__hoverPosts = 0
    const original = Worker.prototype.postMessage
    Worker.prototype.postMessage = function (message: unknown, options?: Transferable[] | StructuredSerializeOptions) {
      if (message && typeof message === 'object' && 'kind' in message && message.kind === 'hover') tracked.__hoverPosts = (tracked.__hoverPosts ?? 0) + 1
      return Reflect.apply(original, this, [message, options])
    }
  })
  await page.goto('/runs/kazakh-sft-005')
  await expect(page.locator('.plot-host').first()).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  await page.evaluate(() => document.fonts.ready)
  const surface = page.locator('.u-over').first()
  await surface.scrollIntoViewIfNeeded()
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  const box = await surface.boundingBox()
  if (!box) throw Error('Missing actual chart input surface')
  const before = await page.evaluate(() => {
    const tracked = window as Window & { __hoverPosts?: number; __releaseFrames?: () => void }
    const request = requestAnimationFrame, cancel = cancelAnimationFrame
    const frames = new Map<number, FrameRequestCallback>()
    let id = 1_000_000
    window.requestAnimationFrame = callback => { frames.set(++id, callback); return id }
    window.cancelAnimationFrame = handle => { if (!frames.delete(handle)) cancel(handle) }
    tracked.__releaseFrames = () => {
      window.requestAnimationFrame = request; window.cancelAnimationFrame = cancel
      for (const callback of frames.values()) request(callback)
      frames.clear()
    }
    return tracked.__hoverPosts ?? 0
  })
  try {
    await page.mouse.move(box.x + box.width * .5, box.y + box.height * .5)
    await expect.poll(() => page.evaluate(() => (window as Window & { __hoverPosts?: number }).__hoverPosts ?? 0)).toBeGreaterThan(before)
  } finally { await page.evaluate(() => (window as Window & { __releaseFrames?: () => void }).__releaseFrames?.()) }
})

for (const [route, mark] of [
  ['/runs/kazakh-sft-005', 'soup:run-page-commit'],
  ['/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006', 'soup:compare-page-commit']
] as const) {
  test(`hover updates source readouts without recommitting the surrounding page: ${mark}`, async ({ page }) => {
    await page.goto(route)
    await expect(page.locator('.plot-host').first()).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
    await page.evaluate(() => document.fonts.ready)
    const surface = page.locator('.u-over').first()
    await surface.scrollIntoViewIfNeeded()
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
    const box = await surface.boundingBox()
    if (!box) throw Error('Missing actual chart input surface')
    const before = await page.evaluate(name => performance.getEntriesByName(name).length, mark)
    for (const fraction of [.3, .4, .5]) {
      const sequence = await page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)
      await page.mouse.move(box.x + box.width * fraction, box.y + box.height * .5)
      await expect.poll(() => page.evaluate(() => (performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark | undefined)?.detail?.hoverSeq ?? 0)).toBeGreaterThan(sequence)
      await expect(page.locator('.chart-hover-value').first()).toContainText('kazakh-sft-005')
    }
    expect(await page.evaluate(name => performance.getEntriesByName(name).length, mark)).toBe(before)
  })
}
