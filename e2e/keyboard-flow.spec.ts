import { expect, test } from '@playwright/test'

test('keyboard activation follows dashboard, range, issue, source and comparison', async ({ page }) => {
  await page.goto('/dashboard?view=map')
  const sector = page.getByRole('button', { name: 'kazakh-sft-006, Loss quality', exact: true })
  await sector.focus(); await page.keyboard.press('Enter')
  const open = page.getByTestId('selected-experiment').getByRole('link', { name: 'Open run', exact: true })
  await open.focus(); await page.keyboard.press('Enter')
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true')
  await page.getByRole('button', { name: 'Zoom in', exact: true }).focus(); await page.keyboard.press('Enter')
  await page.getByRole('button', { name: 'Data quality', exact: true }).focus(); await page.keyboard.press('Enter')
  await page.getByRole('link', { name: 'Open full audit', exact: false }).focus(); await page.keyboard.press('Enter')
  const source = page.getByRole('link', { name: 'Inspect source', exact: false }).first()
  await expect(source).toBeVisible()
  await source.focus(); await page.keyboard.press('Enter')
  await expect(page.getByTestId('inspected-loss')).toBeVisible()
  await page.getByRole('link', { name: 'Compare', exact: true }).focus(); await page.keyboard.press('Enter')
  for (const id of ['001', '006']) {
    const checkbox = page.getByRole('checkbox', { name: `Compare kazakh-sft-${id}`, exact: true })
    await checkbox.focus(); await page.keyboard.press('Space')
    await expect(checkbox).toBeChecked()
  }
  await expect(page.getByTestId('comparison-loss')).toHaveAttribute('data-view-ready', 'true')
  const legend = page.locator('.metric-loss').getByRole('button', { name: 'Highlight kazakh-sft-001', exact: true })
  await legend.focus(); await page.keyboard.press('Enter')
  await expect(legend).toHaveAttribute('aria-pressed', 'true')
})
