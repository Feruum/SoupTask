# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hover-scheduling.spec.ts >> a pointer on previous axes is not queued as a hover for a pending new view
- Location: e2e\hover-scheduling.spec.ts:3:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to content" [ref=e4] [cursor=pointer]:
    - /url: "#main-content"
  - complementary "Workspace" [ref=e5]:
    - link "Soup home" [ref=e6] [cursor=pointer]:
      - /url: /dashboard
      - generic [ref=e7]: Soup.
    - generic [ref=e8]: Almaty Lab
    - navigation "Main navigation" [ref=e12]:
      - link "Dashboard" [ref=e13] [cursor=pointer]:
        - /url: /dashboard
      - link "Training runs" [ref=e20] [cursor=pointer]:
        - /url: /runs
      - link "Compare" [ref=e25] [cursor=pointer]:
        - /url: /compare
      - link "Data quality" [ref=e28] [cursor=pointer]:
        - /url: /data-quality
    - generic [ref=e32]:
      - link "Soup documentation" [ref=e33] [cursor=pointer]:
        - /url: https://souplanding-omega.vercel.app/docs/
      - figure "BUILT IN KAZAKHSTAN" [ref=e37]
  - generic [ref=e39]:
    - banner [ref=e40]:
      - generic [ref=e41]:
        - generic [ref=e42]: Workspace
        - generic [aria-hidden] [ref=e43]: /
        - generic [ref=e44]: qwen-kazakh
      - generic [ref=e45]:
        - generic [ref=e46]: Demo data
        - button "Switch to light theme" [ref=e51] [cursor=pointer]
    - main [ref=e63]:
      - link "← All training runs" [ref=e64] [cursor=pointer]:
        - /url: /runs
      - generic [ref=e65]:
        - generic [ref=e66]:
          - heading "kazakh-sft-005" [level=1] [ref=e67]
          - paragraph [ref=e68]: Qwen2.5-3B · DPO · Running · Snapshot Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)
        - generic [ref=e69]: Demo snapshot · Smoothing off
      - navigation "Run sections" [ref=e70]:
        - button "Metrics" [pressed] [ref=e71] [cursor=pointer]
        - button "Data quality" [ref=e72] [cursor=pointer]
        - button "Source" [ref=e73] [cursor=pointer]
        - button "Run information" [ref=e74] [cursor=pointer]
      - generic [ref=e75]:
        - generic [ref=e76]:
          - term [ref=e77]: Latest loss
          - definition [ref=e78]: "0.201573"
          - definition [ref=e79]: Highest recorded step 999,999
        - generic [ref=e80]:
          - term [ref=e81]: Minimum loss
          - definition [ref=e82]: "0.200327"
          - definition [ref=e83]: Whole snapshot · step 989,070
        - generic [ref=e84]:
          - term [ref=e85]: Peak loss
          - definition [ref=e86]: "100.000"
          - definition [ref=e87]: Whole snapshot · step 500,001
        - generic [ref=e88]:
          - term [ref=e89]: Raw observations
          - definition [ref=e90]: 1,000,000
          - definition [ref=e91]: Immutable source rows
      - generic [ref=e92]:
        - group [ref=e93]:
          - generic [ref=e95]:
            - generic [ref=e96]:
              - generic [ref=e97]:
                - generic [ref=e98]: From step
                - spinbutton "From step" [ref=e99]: "100"
              - generic [ref=e100]:
                - generic [ref=e101]: To step
                - spinbutton "To step" [ref=e102]: "200"
              - button "Apply range" [active] [ref=e103] [cursor=pointer]
            - generic [ref=e107]:
              - button "Zoom in" [ref=e108] [cursor=pointer]
              - button "Zoom out" [ref=e112] [cursor=pointer]
              - button "Reset view" [ref=e116] [cursor=pointer]
            - paragraph [ref=e120]: Step 100 to 200
        - generic [ref=e121]:
          - generic [ref=e122]:
            - generic [ref=e123]:
              - generic [ref=e124]:
                - heading "Loss" [level=2] [ref=e125]
                - paragraph [ref=e126]: Recorded step · Linear scale · Original values
              - generic [ref=e127]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 1.27935 – 1.832639 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Loss source readout" [ref=e128]':
              - generic [ref=e138]:
                - generic [ref=e140]:
                  - button "Highlight kazakh-sft-005" [ref=e141] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e143]: 1.27935 – 1.832639
                - paragraph [ref=e144]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Loss source readout" [ref=e145]:
                  - generic [ref=e146]:
                    - paragraph [ref=e147]: Cursor step 175
                    - generic [ref=e149]:
                      - strong [ref=e152]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e153]:
                        - generic [ref=e154]:
                          - generic "Exact source value 1.378650605672632" [ref=e155]:
                            - generic [ref=e156]: step 175
                            - generic [ref=e157]: Loss 1.378651
                            - generic [ref=e158]: Δstep 0
                          - button "Pin row 175" [ref=e159] [cursor=pointer]
          - generic [ref=e160]:
            - generic [ref=e161]:
              - generic [ref=e162]:
                - heading "Learning rate" [level=2] [ref=e163]
                - paragraph [ref=e164]: Recorded step · Linear scale · Original values
              - generic [ref=e165]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 2.39976E-8 – 4.79904E-8 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Learning rate source readout" [ref=e166]':
              - generic [ref=e176]:
                - generic [ref=e178]:
                  - button "Highlight kazakh-sft-005" [ref=e179] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e181]: 2.39976E-8 – 4.79904E-8
                - paragraph [ref=e182]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Learning rate source readout" [ref=e183]:
                  - generic [ref=e184]:
                    - paragraph [ref=e185]: Cursor step 175
                    - generic [ref=e187]:
                      - strong [ref=e190]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e191]:
                        - generic [ref=e192]:
                          - generic "Exact source value 4.199269198534199e-8" [ref=e193]:
                            - generic [ref=e194]: step 175
                            - generic [ref=e195]: Learning rate 4.19927E-8
                            - generic [ref=e196]: Δstep 0
                          - button "Pin row 175" [ref=e197] [cursor=pointer]
          - generic [ref=e198]:
            - generic [ref=e199]:
              - generic [ref=e200]:
                - heading "Gradient norm" [level=2] [ref=e201]
                - paragraph [ref=e202]: Recorded step · Linear scale · Original values
              - generic [ref=e203]: 101 displayed
            - 'figure "Highlight kazakh-sft-005 0.140376 – 0.237665 Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range Gradient norm source readout" [ref=e204]':
              - generic [ref=e214]:
                - generic [ref=e216]:
                  - button "Highlight kazakh-sft-005" [ref=e217] [cursor=pointer]: kazakh-sft-005
                  - generic [ref=e219]: 0.140376 – 0.237665
                - paragraph [ref=e220]: "Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range"
                - region "Gradient norm source readout" [ref=e221]:
                  - generic [ref=e222]:
                    - paragraph [ref=e223]: Cursor step 175
                    - generic [ref=e225]:
                      - strong [ref=e228]: kazakh-sft-005
                      - region "Original observations for kazakh-sft-005" [ref=e229]:
                        - generic [ref=e230]:
                          - generic "Exact source value 0.22281769673340024" [ref=e231]:
                            - generic [ref=e232]: step 175
                            - generic [ref=e233]: Gradient norm 0.222818
                            - generic [ref=e234]: Δstep 0
                          - button "Pin row 175" [ref=e235] [cursor=pointer]
        - paragraph [ref=e236]: Source values remain unchanged. Whole-run cards do not change with zoom.
      - paragraph [ref=e237]: Demo snapshot. No live training or automatic stopping recommendation.
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test'
  2   | 
  3   | test('a pointer on previous axes is not queued as a hover for a pending new view', async ({ page }) => {
  4   |   await page.addInitScript(() => {
  5   |     const tracked = window as Window & { __holdView?: boolean; __viewHeld?: boolean; __releaseView?: () => void; __hoverSteps?: number[] }
  6   |     const NativeWorker = Worker
  7   |     window.Worker = class extends NativeWorker {
  8   |       constructor(url: string | URL, options?: WorkerOptions) {
  9   |         super(url, options)
  10  |         let handler: ((this: Worker, event: MessageEvent) => unknown) | null = null
  11  |         Object.defineProperty(this, 'onmessage', { get: () => handler, set: next => { handler = next }, configurable: true })
  12  |         this.addEventListener('message', event => {
  13  |           if (tracked.__holdView && event.data.kind === 'view-packed') {
  14  |             tracked.__viewHeld = true
  15  |             tracked.__releaseView = () => { tracked.__holdView = false; handler?.call(this, event) }
  16  |           } else handler?.call(this, event)
  17  |         })
  18  |       }
  19  |       postMessage(message: unknown, options?: Transferable[] | StructuredSerializeOptions) {
  20  |         if (message && typeof message === 'object' && 'kind' in message && message.kind === 'hover' && 'step' in message) (tracked.__hoverSteps ??= []).push(Number(message.step))
  21  |         return Reflect.apply(NativeWorker.prototype.postMessage, this, [message, options])
  22  |       }
  23  |     }
  24  |   })
  25  |   await page.goto('/runs/kazakh-sft-005')
  26  |   await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  27  |   await page.evaluate(() => document.fonts.ready)
  28  |   await page.getByLabel('From step', { exact: true }).fill('100')
  29  |   await page.getByLabel('To step', { exact: true }).fill('200')
  30  |   await page.evaluate(() => { const state = window as Window & { __holdView?: boolean; __hoverSteps?: number[] }; state.__holdView = true; state.__hoverSteps = [] })
  31  |   await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  32  |   await expect.poll(() => page.evaluate(() => (window as Window & { __viewHeld?: boolean }).__viewHeld)).toBe(true)
  33  |   try {
  34  |     const surface = page.locator('.u-over').first()
  35  |     await surface.scrollIntoViewIfNeeded()
  36  |     const box = await surface.boundingBox()
  37  |     if (!box) throw Error('Missing previous accepted chart')
  38  |     await page.mouse.move(box.x + box.width * .75, box.y + box.height * .5)
  39  |     await page.evaluate(() => (window as Window & { __releaseView?: () => void }).__releaseView?.())
  40  |     await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min', '100')
  41  |     await expect.poll(() => page.evaluate(() => (window as Window & { __hoverSteps?: number[] }).__hoverSteps?.length ?? 0)).toBeGreaterThan(0)
  42  |     const steps = await page.evaluate(() => (window as Window & { __hoverSteps?: number[] }).__hoverSteps ?? [])
> 43  |     expect(steps.every(step => step >= 100 && step <= 200)).toBe(true)
      |                                                             ^ Error: expect(received).toBe(expected) // Object.is equality
  44  |   } finally { await page.evaluate(() => (window as Window & { __releaseView?: () => void }).__releaseView?.()) }
  45  | })
  46  | 
  47  | test('a source hover request is dispatched without waiting for an available animation frame', async ({ page }) => {
  48  |   await page.addInitScript(() => {
  49  |     const tracked = window as Window & { __hoverPosts?: number }
  50  |     tracked.__hoverPosts = 0
  51  |     const original = Worker.prototype.postMessage
  52  |     Worker.prototype.postMessage = function (message: unknown, options?: Transferable[] | StructuredSerializeOptions) {
  53  |       if (message && typeof message === 'object' && 'kind' in message && message.kind === 'hover') tracked.__hoverPosts = (tracked.__hoverPosts ?? 0) + 1
  54  |       return Reflect.apply(original, this, [message, options])
  55  |     }
  56  |   })
  57  |   await page.goto('/runs/kazakh-sft-005')
  58  |   await expect(page.locator('.plot-host').first()).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  59  |   await page.evaluate(() => document.fonts.ready)
  60  |   const surface = page.locator('.u-over').first()
  61  |   await surface.scrollIntoViewIfNeeded()
  62  |   await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  63  |   const box = await surface.boundingBox()
  64  |   if (!box) throw Error('Missing actual chart input surface')
  65  |   const before = await page.evaluate(() => {
  66  |     const tracked = window as Window & { __hoverPosts?: number; __releaseFrames?: () => void }
  67  |     const request = requestAnimationFrame, cancel = cancelAnimationFrame
  68  |     const frames = new Map<number, FrameRequestCallback>()
  69  |     let id = 1_000_000
  70  |     window.requestAnimationFrame = callback => { frames.set(++id, callback); return id }
  71  |     window.cancelAnimationFrame = handle => { if (!frames.delete(handle)) cancel(handle) }
  72  |     tracked.__releaseFrames = () => {
  73  |       window.requestAnimationFrame = request; window.cancelAnimationFrame = cancel
  74  |       for (const callback of frames.values()) request(callback)
  75  |       frames.clear()
  76  |     }
  77  |     return tracked.__hoverPosts ?? 0
  78  |   })
  79  |   try {
  80  |     await page.mouse.move(box.x + box.width * .5, box.y + box.height * .5)
  81  |     await expect.poll(() => page.evaluate(() => (window as Window & { __hoverPosts?: number }).__hoverPosts ?? 0)).toBeGreaterThan(before)
  82  |   } finally { await page.evaluate(() => (window as Window & { __releaseFrames?: () => void }).__releaseFrames?.()) }
  83  | })
  84  | 
  85  | for (const [route, mark] of [
  86  |   ['/runs/kazakh-sft-005', 'soup:run-page-commit'],
  87  |   ['/compare?runs=kazakh-sft-005,kazakh-sft-001,kazakh-sft-002,kazakh-sft-006', 'soup:compare-page-commit']
  88  | ] as const) {
  89  |   test(`hover updates source readouts without recommitting the surrounding page: ${mark}`, async ({ page }) => {
  90  |     await page.goto(route)
  91  |     await expect(page.locator('.plot-host').first()).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
  92  |     await page.evaluate(() => document.fonts.ready)
  93  |     const surface = page.locator('.u-over').first()
  94  |     await surface.scrollIntoViewIfNeeded()
  95  |     await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  96  |     const box = await surface.boundingBox()
  97  |     if (!box) throw Error('Missing actual chart input surface')
  98  |     const before = await page.evaluate(name => performance.getEntriesByName(name).length, mark)
  99  |     for (const fraction of [.3, .4, .5]) {
  100 |       const sequence = await page.evaluate(() => (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence?.acceptedHoverSeq ?? 0)
  101 |       await page.mouse.move(box.x + box.width * fraction, box.y + box.height * .5)
  102 |       await expect.poll(() => page.evaluate(() => (performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark | undefined)?.detail?.hoverSeq ?? 0)).toBeGreaterThan(sequence)
  103 |       await expect(page.locator('.chart-hover-value').first()).toContainText('kazakh-sft-005')
  104 |     }
  105 |     expect(await page.evaluate(name => performance.getEntriesByName(name).length, mark)).toBe(before)
  106 |   })
  107 | }
  108 | 
```