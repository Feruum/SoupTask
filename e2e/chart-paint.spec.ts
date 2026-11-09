import { expect, test, type Locator, type Page } from '@playwright/test'
import { assertSpikePainted } from '../scripts/canvas-controls.mjs'

test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

async function frames(page: Page) {
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
}

async function paints(plot: Locator) {
  return Number(await plot.getAttribute('data-draw-count'))
}

async function spikePixels(plot: Locator) {
  return plot.evaluate(element => {
    const canvas = element.querySelector('canvas')!, ctx = canvas.getContext('2d')!,
      x = Number(element.getAttribute('data-spike-x')), y = Number(element.getAttribute('data-spike-y')),
      sample = document.createElement('canvas')
    sample.width = sample.height = 1
    const color = sample.getContext('2d')!
    color.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-line').trim()
    color.fillRect(0, 0, 1, 1)
    const expected = [...color.getImageData(0, 0, 1, 1).data].slice(0, 3),
      pixels = ctx.getImageData(Math.round(x) - 3, Math.round(y) - 3, 7, 7).data
    let alpha = 0
    for (let i = 0; i < pixels.length; i += 4) {
      if (expected.every((channel, j) => Math.abs(channel - pixels[i + j]) < 35)) alpha = Math.max(alpha, pixels[i + 3])
    }
    return { alpha, expected }
  })
}

test('an accepted view paints once, including replacement data at the same numeric range', async ({ page }) => {
  await page.goto('/runs/kazakh-sft-005')
  await page.evaluate(() => document.fonts.ready)
  const grid = page.locator('.metric-grid'), plot = page.getByTestId('loss-chart'),
    section = page.locator('.metric-loss'), charts = ['loss-chart', 'lr-chart', 'grad-chart'].map(id => page.getByTestId(id))
  await expect(grid).toHaveAttribute('data-view-ready', 'true')
  await frames(page)
  await page.getByLabel('From step', { exact: true }).fill('500000')
  await page.getByLabel('To step', { exact: true }).fill('500002')
  for (let replacement = 0; replacement < 2; replacement++) {
    const before = await Promise.all(charts.map(paints)), sequence = Number(await section.getAttribute('data-view-seq'))
    await page.getByRole('button', { name: 'Apply range', exact: true }).click()
    await expect.poll(async () => Number(await section.getAttribute('data-view-seq'))).toBeGreaterThan(sequence)
    await expect(grid).toHaveAttribute('data-view-ready', 'true')
    await frames(page)
    expect(await Promise.all(charts.map(paints))).toEqual(before.map(count => count + 1))
    await expect(plot).toHaveAttribute('data-range-min', '500000')
    await expect(plot).toHaveAttribute('data-range-max', '500002')
    await assertSpikePainted(page)
  }
})

test('focus repaints only changed alpha while theme changes retain actual source paint', async ({ page }) => {
  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001')
  await page.evaluate(() => document.fonts.ready)
  const plot = page.getByTestId('comparison-loss'), section = page.locator('.metric-loss')
  await expect(plot).toHaveAttribute('data-view-ready', 'true')
  await frames(page)
  expect((await spikePixels(plot)).alpha).toBeGreaterThan(240)
  const before = await paints(plot)
  const legend = section.getByRole('button', { name: 'Highlight kazakh-sft-001', exact: true })
  await legend.focus()
  await expect(plot).toHaveAttribute('data-focused-run', 'kazakh-sft-001')
  await frames(page)
  expect(await paints(plot)).toBe(before + 1)
  const dimmed = await spikePixels(plot)
  expect(dimmed.alpha).toBeGreaterThan(30)
  expect(dimmed.alpha).toBeLessThan(100)
  await page.getByRole('button', { name: 'Reset view', exact: true }).focus()
  await expect(plot).toHaveAttribute('data-focused-run', '')
  await frames(page)
  expect(await paints(plot)).toBe(before + 2)
  expect((await spikePixels(plot)).alpha).toBeGreaterThan(240)
  const dark = await spikePixels(plot)
  await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(plot).toHaveAttribute('data-view-ready', 'true')
  await frames(page)
  const light = await spikePixels(plot)
  expect(light.expected).not.toEqual(dark.expected)
  expect(light.alpha).toBeGreaterThan(240)
})
