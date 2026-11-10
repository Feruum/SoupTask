import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })

test('phone dashboard shows the selected run and loss before secondary exploration', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true')
  const selected = await page.getByTestId('selected-experiment').boundingBox()
  expect(selected!.y).toBeLessThan(450)
  const chart = await page.getByTestId('loss-chart').boundingBox()
  expect(chart!.y).toBeLessThan(850)
  await page.locator('.calm-navigator > summary').tap()
  await expect(page.getByRole('combobox', { name: 'Selected experiment', exact: true })).toBeVisible()
  await page.getByRole('combobox', { name: 'Selected experiment', exact: true }).selectOption('kazakh-sft-006')
  await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-006')
  await expect(page.locator('.calm-navigator')).not.toHaveAttribute('open', '')
  await page.getByRole('navigation', { name: 'Dashboard views' }).getByRole('link', { name: 'Experiment map', exact: true }).tap()
  await expect(page.getByRole('heading', { name: 'Experiment map', exact: true })).toBeVisible()
})

test('mobile run row exposes values, comparison and a nearby preview', async ({ page }) => {
  await page.goto('/runs')
  const row = page.locator('.runs-table tbody tr').filter({ has: page.getByRole('link', { name: 'Open kazakh-sft-006', exact: true }) })
  await row.scrollIntoViewIfNeeded()
  for (const column of ['Status', 'Latest loss', 'Step', 'Quality']) {
    const cell = row.locator(`[data-label="${column}"]`)
    await expect(cell).toBeVisible()
    const box = await cell.boundingBox()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(391)
  }
  await row.locator('.run-selection-control').tap()
  await expect(row.getByRole('checkbox')).toBeChecked()
  await row.getByRole('button', { name: 'Preview kazakh-sft-006', exact: true }).tap()
  await expect(page.locator('.run-preview')).toBeInViewport()
  await expect(page.locator('.run-preview').getByRole('heading', { name: 'kazakh-sft-006', exact: true })).toBeVisible()
})

test('comparison keeps selected identities visible and selection editable on touch', async ({ page }) => {
  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-006')
  const selection = page.getByRole('region', { name: 'Comparison selection', exact: true })
  await expect(selection).toContainText('kazakh-sft-005')
  await expect(selection).toContainText('kazakh-sft-006')
  await expect(selection).toBeInViewport()
  await page.getByText('Edit comparison runs', { exact: true }).tap()
  const checkbox = page.getByRole('checkbox', { name: 'Compare kazakh-sft-006', exact: true })
  await checkbox.uncheck()
  await expect(page).toHaveURL(/runs=kazakh-sft-005$/)
  await expect(selection).not.toContainText('kazakh-sft-006')
})

test('quality deep link opens the ledger before the full matrix', async ({ page }) => {
  await page.goto('/data-quality?run=kazakh-sft-006&metric=loss')
  await expect(page.getByRole('heading', { name: 'Source issue ledger', exact: true })).toBeVisible()
  const ledger = await page.locator('.issue-detail').boundingBox()
  expect(ledger!.y).toBeLessThan(650)
  await expect(page.locator('.quality-matrix-disclosure')).not.toHaveAttribute('open', '')
  await expect(page.getByRole('link', { name: 'Inspect source →', exact: true }).first()).toBeVisible()
})

test('touch tap inspects a chart while a vertical swipe still scrolls the page', async ({ page, context }) => {
  await page.goto('/runs/kazakh-sft-005')
  const plot = page.getByTestId('loss-chart')
  await expect(plot).toHaveAttribute('data-view-ready', 'true')
  const overlay = plot.locator('.u-over')
  await overlay.scrollIntoViewIfNeeded()
  await overlay.tap()
  await expect(page.locator('.chart-hover-value').first()).toBeVisible()
  const bounds = await overlay.boundingBox()
  const before = await page.evaluate(() => scrollY)
  const session = await context.newCDPSession(page)
  const x = bounds!.x + bounds!.width / 2, y = Math.min(650, bounds!.y + bounds!.height / 2)
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
  for (let offset = 20; offset <= 160; offset += 20) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - offset }] })
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 40)
  await session.detach()
})

test('mobile disclosures and range controls remain keyboard operable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/runs/kazakh-sft-005')
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true')
  const summary = page.locator('.range-disclosure > summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('spinbutton', { name: 'From step', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Zoom in', exact: true }).focus()
  const before = Number(await page.getByTestId('loss-chart').getAttribute('data-range-max'))
  await page.keyboard.press('Enter')
  await expect.poll(async () => Number(await page.getByTestId('loss-chart').getAttribute('data-range-max'))).toBeLessThan(before)
})

test('landscape touch keeps phone navigation and the compact reading order', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/dashboard')
  await page.locator('.calm-navigator > summary').tap()
  await expect(page.getByRole('combobox', { name: 'Selected experiment', exact: true })).toBeVisible()
  expect(await page.locator('.sidebar nav').evaluate(nav => getComputedStyle(nav).position)).toBe('fixed')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

for (const theme of ['dark', 'light'] as const) test(`${theme} compact layouts keep controls readable and axe clean`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 320, height: 740 })
  await page.addInitScript(theme => localStorage.setItem('soup-theme', theme), theme)
  for (const route of ['/dashboard', '/runs', '/runs/kazakh-sft-005', '/compare?runs=kazakh-sft-005,kazakh-sft-006', '/data-quality?run=kazakh-sft-006']) {
    await page.goto(route)
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const fontSizes = await page.locator('input:not([type="checkbox"]),select').evaluateAll(inputs => inputs.filter(input => input.getClientRects().length).map(input => parseFloat(getComputedStyle(input).fontSize)))
    expect(fontSizes.every(size => size >= 16)).toBe(true)
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(audit.violations).toEqual([])
  }
})
