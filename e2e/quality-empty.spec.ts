import { expect, test } from '@playwright/test';

test('clean stale snapshot separates checked data from source age', async ({ page }, info) => {
  await page.clock.setFixedTime(new Date('2026-11-10T00:00:00Z'));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/data-quality?run=kazakh-sft-020');
  const ledger = page.locator('.issue-detail');
  await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toBeVisible({ timeout: 15000 });
  await expect(ledger).toContainText('8,192 source rows');
  await expect(ledger).toContainText('Loss, Learning rate and Gradient norm');
  await expect(ledger.getByTestId('source-age')).toHaveText('Stale source snapshot');
  await expect(ledger.locator('time[datetime="2026-11-03T00:00:00Z"]')).toContainText('UTC');
  await expect(ledger.getByLabel('Issue locations by recorded step')).toHaveCount(0);
  await expect(ledger.getByRole('button', { name: 'Previous findings', exact: true })).toHaveCount(0);
  await expect(ledger.getByRole('button', { name: 'Next findings', exact: true })).toHaveCount(0);
  await expect(ledger.getByText('Page 1', { exact: true })).toHaveCount(0);
  const ladle = ledger.locator('[data-soup-art="ladle"] img');
  await expect(ladle).toBeVisible();
  await ladle.evaluate(image => (image as HTMLImageElement).decode());
  await page.screenshot({ path: info.outputPath('stale-clean-desktop.png'), fullPage: true, animations: 'disabled' });
});

test('filtered miss explains scope and clearing keeps the selected run', async ({ page }, info) => {
  await page.addInitScript(() => localStorage.setItem('soup-theme', 'light'));
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto('/data-quality?run=kazakh-sft-006&metric=lr&kind=nan');
  const ledger = page.locator('.issue-detail');
  await expect(ledger.getByRole('heading', { name: 'No matching findings', exact: true })).toBeVisible({ timeout: 15000 });
  await expect(ledger).toContainText('Learning rate');
  await expect(ledger).toContainText('NaN');
  await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toHaveCount(0);
  await expect(ledger.getByLabel('Issue locations by recorded step')).toHaveCount(0);
  await expect(ledger.getByRole('button', { name: 'Next findings', exact: true })).toHaveCount(0);
  await page.screenshot({ path: info.outputPath('filtered-miss-mobile.png'), fullPage: true, animations: 'disabled' });
  await ledger.getByRole('button', { name: 'Clear issue filters', exact: true }).click();
  await expect(ledger.getByLabel('Run', { exact: true })).toHaveValue('kazakh-sft-006');
  await expect(ledger.getByLabel('Metric', { exact: true })).toHaveValue('all');
  await expect(ledger.getByLabel('Issue type', { exact: true })).toHaveValue('all');
  await expect(ledger.locator('.issue-ledger-table tbody tr')).toHaveCount(2);
  await expect(ledger.getByRole('button', { name: 'Clear issue filters', exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('unfiltered clean run shows the checked scope without stale warning', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-10T00:00:00Z'));
  await page.goto('/data-quality?run=kazakh-sft-001');
  const ledger = page.locator('.issue-detail');
  await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toBeVisible({ timeout: 15000 });
  await expect(ledger).toContainText('8,192 source rows');
  await expect(ledger.getByTestId('source-age')).toHaveText('Source snapshot age: under 24 hours');
  await expect(ledger.getByRole('button', { name: 'Clear issue filters', exact: true })).toHaveCount(0);
});

test('a page beyond the updated total offers the first page without claiming a clean run', async ({ page }) => {
  // Controlled paging fault only: retain real issue rows, then let the total shrink.
  await page.route('**/*training.worker*.js', async route => {
    const response = await route.fetch();
    const source = await response.text();
    await route.fulfill({ response, body: `${source}\n{
      const send = self.postMessage.bind(self);
      let firstIssuePage = true;
      self.postMessage = (message, transfer) => {
        if (message.kind === 'issues' && firstIssuePage && message.rows.length) {
          firstIssuePage = false;
          message = { ...message, total: 51 };
        }
        send(message, transfer);
      };
    }` });
  });
  await page.goto('/data-quality?run=kazakh-sft-009');
  const ledger = page.locator('.issue-detail');
  await expect(ledger.locator('.issue-ledger-table tbody tr')).toHaveCount(11, { timeout: 15000 });
  await ledger.getByRole('button', { name: 'Next findings', exact: true }).click();
  await expect(ledger.getByRole('heading', { name: 'No findings on this page', exact: true })).toBeVisible();
  await expect(ledger.getByRole('heading', { name: 'No source data issues', exact: true })).toHaveCount(0);
  await expect(ledger.getByLabel('Issue locations by recorded step')).toHaveCount(0);
  await ledger.getByRole('button', { name: 'Go to first page', exact: true }).click();
  await expect(ledger.locator('.issue-ledger-table tbody tr')).toHaveCount(11);
  await expect(ledger.getByText('Page 1', { exact: true })).toBeVisible();
});

