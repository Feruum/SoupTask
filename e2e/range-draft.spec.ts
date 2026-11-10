import { expect, test } from '@playwright/test'

test('a resize with unchanged numeric range does not overwrite an unfinished From/To draft', async ({ page }) => {
  await page.goto('/runs/kazakh-sft-005')
  const plot = page.getByTestId('loss-chart')
  await expect(plot).toHaveAttribute('data-view-ready', 'true')
  const from = page.getByLabel('From step', { exact: true })
  await from.fill('499990')
  const previous = await page.evaluate(() => (window as unknown as { __soupEvidence: { viewSeq: number } }).__soupEvidence.viewSeq)
  await page.setViewportSize({ width: 1360, height: 900 })
  await page.waitForFunction(before => (window as unknown as { __soupEvidence: { viewSeq: number } }).__soupEvidence.viewSeq > before, previous)
  await expect(plot).toHaveAttribute('data-view-ready', 'true')
  await expect(from).toHaveValue('499990')
  await page.getByLabel('To step', { exact: true }).fill('500010')
  await page.getByRole('button', { name: 'Apply range', exact: true }).click()
  await expect(plot).toHaveAttribute('data-range-min', '499990')
  await expect(plot).toHaveAttribute('data-range-max', '500010')
})
