import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { assertSpikePainted } from '../scripts/canvas-controls.mjs'

test('dashboard selection connects the map, metadata groups and source links', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/dashboard')
  await expect(page.getByRole('heading', { name: 'Training overview', exact: true })).toBeVisible()
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true')
  await assertSpikePainted(page)
  const selected = page.getByTestId('selected-experiment')
  await expect(selected).toContainText('kazakh-sft-005')
  await expect(selected).toContainText('1,000,000')
  await expect(selected).toContainText('500,001')
  await expect(page.getByRole('link', { name: 'Inspect peak at source' })).toHaveAttribute('href', /kazakh-sft-005\?step=500001&revision=/)
  await page.getByRole('navigation', { name: 'Dashboard views' }).getByRole('link', { name: 'Experiment map', exact: true }).click()
  const sector = page.getByRole('button', { name: 'kazakh-sft-006, Loss quality', exact: true })
  await sector.click()
  await sector.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByTestId('selected-metric')).toContainText('Learning rate')
  await expect(page.getByRole('button', { name: 'kazakh-sft-006, Learning rate quality', exact: true })).toBeFocused()
  await expect(selected.getByRole('link', { name: 'Inspect issues' })).toHaveAttribute('href', '/data-quality?run=kazakh-sft-006&metric=lr')
  await page.getByRole('navigation', { name: 'Dashboard views' }).getByRole('link', { name: 'Groups', exact: true }).click()
  await page.getByRole('button', { name: /Select kazakh-sft-001 from/ }).click()
  await expect(selected).toContainText('kazakh-sft-001')
  await page.getByRole('navigation', { name: 'Dashboard views' }).getByRole('link', { name: 'Experiment map', exact: true }).click()
  await page.getByLabel('Inspect experiment', { exact: true }).selectOption('kazakh-sft-005')
  await page.getByLabel('Metric', { exact: true }).selectOption('loss')
  await expect(selected).toContainText('100.000')
  await page.getByText('Accessible quality table', { exact: true }).click()
  await expect(page.locator('.map-source-table tbody tr')).toHaveCount(20)
  await page.getByRole('link', { name: 'Monitor selected run', exact: true }).click()
  await page.getByText('Run details and history', { exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Run history', exact: true })).toBeVisible()
  expect(errors).toEqual([])
})

for (const theme of ['dark', 'light'] as const) for (const width of [390, 1600]) {
  test(`dashboard ${theme} ${width}px remains accessible and fits the viewport`, async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width, height: 1100 })
    await page.addInitScript(value => localStorage.setItem('soup-theme', value), theme)
    await page.goto('/dashboard')
    await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true')
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    await info.attach('axe', { body: JSON.stringify(audit.violations, null, 2), contentType: 'application/json' })
    expect(audit.violations).toEqual([])
    if (width === 1600) {
      const navigator = await page.locator('.calm-navigator').boundingBox()
      const monitor = await page.locator('.calm-monitor-detail').boundingBox()
      expect(navigator!.x + navigator!.width).toBeLessThanOrEqual(monitor!.x + 1)
      expect(monitor!.width).toBeGreaterThan(navigator!.width)
    }
    await page.screenshot({ path: `reports/dashboard-redesign/${theme}-${width}.png`, fullPage: true })
  })
}
