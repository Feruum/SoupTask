import { expect, test } from '@playwright/test'

for (const route of ['/runs/kazakh-sft-005', '/compare?runs=kazakh-sft-005,kazakh-sft-001']) {
  test(`accepted hover reaches a rendered frame with original observations: ${route}`, async ({ page }, info) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    const cdp = await page.context().newCDPSession(page)
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
    await page.goto(route)
    const host = page.locator('.plot-host').first()
    await expect(host).toHaveAttribute('data-view-ready', 'true', { timeout: 60_000 })
    const surface = host.locator('.u-over')
    await surface.scrollIntoViewIfNeeded()
    const box = await surface.boundingBox()
    if (!box) throw new Error('Missing real chart input surface')
    await page.mouse.move(box.x + box.width * .5, box.y + box.height * .5)
    const tooltip = page.locator('.chart-hover-value').first()
    await expect(tooltip).toContainText('kazakh-sft-005')
    await expect(tooltip).toContainText('step')
    await expect.poll(() => page.evaluate(() => performance.getEntriesByName('soup:hover-frame').length)).toBeGreaterThan(0)
    const sample = await page.evaluate(() => {
      const frame = performance.getEntriesByName('soup:hover-frame').at(-1) as PerformanceMark
      const commit = performance.getEntriesByName('soup:hover-dom-commit').at(-1) as PerformanceMark
      const evidence = (window as Window & { __soupEvidence?: { acceptedHoverSeq: number } }).__soupEvidence
      return { frame: { ...frame.toJSON(), detail: frame.detail }, commit: { ...commit.toJSON(), detail: commit.detail }, accepted: evidence?.acceptedHoverSeq }
    })
    expect(sample.frame.detail.hoverSeq).toBe(sample.accepted)
    expect(sample.commit.detail.hoverSeq).toBe(sample.accepted)
    expect(sample.frame.startTime).toBeGreaterThan(sample.commit.startTime)
    expect(sample.frame.detail.requestToFrameMs).toBeGreaterThanOrEqual(sample.frame.detail.requestToAcceptedMs)
    await expect(tooltip).toHaveAttribute('data-hover-seq', String(sample.accepted))
    await expect(host).toHaveAttribute('data-cursor-point-count', /[1-9]/)
    await page.screenshot({ path: info.outputPath('accepted-hover-frame.png'), fullPage: true })
    await info.attach('accepted-hover-timing', { body: JSON.stringify(sample, null, 2), contentType: 'application/json' })
    expect(errors).toEqual([])
  })
}
