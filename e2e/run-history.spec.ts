import { expect, test } from '@playwright/test';

test('history exposes exact daily starts and supports keyboard selection', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByText('Run details and history', { exact: true }).click();
  const history = page.getByRole('region', { name: 'Run history', exact: true });
  await expect(history.locator('[data-history-date]')).toHaveCount(90);
  const day = history.locator('[data-history-date="2026-11-09"]');
  await day.click();
  await expect(history.getByRole('link', { name: 'View 2 runs', exact: true })).toHaveAttribute('href', '/runs?startedOn=2026-11-09');
  await day.focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(history.getByText('No runs started on this day in the demo history.', { exact: true })).toBeVisible();
  await history.getByLabel('Inspect history date', { exact: true }).fill('2026-11-09');
  await history.getByRole('link', { name: 'View 2 runs', exact: true }).click();
  await expect(page.locator('.runs-table tbody tr')).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Open kazakh-sft-005', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open kazakh-sft-006', exact: true })).toBeVisible();
});

test('history filter survives a reload and can be cleared without losing text search', async ({ page }) => {
  await page.goto('/runs?startedOn=2026-11-09');
  await page.reload();
  await expect(page.locator('.runs-table tbody tr')).toHaveCount(2);
  await page.getByRole('searchbox', { name: 'Search runs', exact: true }).fill('kazakh-sft-006');
  await page.getByRole('button', { name: 'Clear date filter', exact: true }).click();
  await expect(page).toHaveURL(/\/runs$/);
  await expect(page.locator('.runs-table tbody tr')).toHaveCount(1);
  await page.getByRole('searchbox', { name: 'Search runs', exact: true }).fill('');
  await expect(page.locator('.runs-table tbody tr')).toHaveCount(20);
});
