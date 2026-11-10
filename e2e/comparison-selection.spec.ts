import { expect, test } from '@playwright/test';
const chosen = ['005', '001', '002', '006'];
const name = (id: string) => `kazakh-sft-${id}`;
test('CPU4 comparison checkbox updates immediately and preserves rapid intent plus back/forward', async ({
  page
}) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', {
    rate: 4
  });
  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      await page.goto('/compare');
      await expect(page.getByRole('heading', {
        name: 'Compare runs',
        exact: true
      })).toBeVisible();
      for (const id of chosen) {
        await page.getByRole('checkbox', {
          name: `Compare ${name(id)}`,
          exact: true
        }).check();
        await expect(page.getByRole('checkbox', {
          name: `Compare ${name(id)}`,
          exact: true
        })).toBeChecked();
      }
      await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(chosen.map(name).join(','));
      await page.getByRole('checkbox', {
        name: `Compare ${name('001')}`,
        exact: true
      }).uncheck();
      await page.getByRole('checkbox', {
        name: `Compare ${name('001')}`,
        exact: true
      }).check();
      await page.getByRole('checkbox', {
        name: `Compare ${name('005')}`,
        exact: true
      }).uncheck();
      await page.getByRole('checkbox', {
        name: `Compare ${name('019')}`,
        exact: true
      }).check();
      await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(['002', '006', '001', '019'].map(name).join(','));
      await page.goBack();
      await expect(page.getByRole('checkbox', {
        name: `Compare ${name('019')}`,
        exact: true
      })).not.toBeChecked();
      await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(['002', '006', '001'].map(name).join(','));
      await page.goForward();
      await expect(page.getByRole('checkbox', {
        name: `Compare ${name('019')}`,
        exact: true
      })).toBeChecked();
    }
  } finally {
    await cdp.send('Emulation.setCPUThrottlingRate', {
      rate: 1
    });
  }
});
test('unknown URL identifiers remain explicit while selection is edited', async ({
  page
}) => {
  await page.goto('/compare?runs=unknown-run');
  await expect(page.getByRole('alert')).toContainText('Unknown run identifiers');
  await page.getByRole('checkbox', {
    name: `Compare ${name('001')}`,
    exact: true
  }).check();
  await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(`unknown-run,${name('001')}`);
  await expect(page.getByRole('alert')).toContainText('unknown-run');
  await page.getByRole('button', {
    name: 'Clear selection',
    exact: true
  }).click();
  await expect(page.getByRole('heading', {
    name: 'Select runs to compare',
    exact: true
  })).toBeVisible();
  await expect.poll(() => new URL(page.url()).searchParams.get('runs')).toBe(null);
});
test('accepted hover remains idle without programmatic redraw feedback', async ({
  page
}) => {
  await page.goto('/runs/kazakh-sft-005');
  await page.evaluate(() => document.fonts.ready);
  const plot = page.getByTestId('loss-chart');
  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true');
  await plot.scrollIntoViewIfNeeded();
  await plot.locator('.u-over').hover();
  await expect(page.locator('.chart-hover-value').first()).toBeVisible();
  const before = await page.evaluate(() => performance.getEntriesByName('soup:hover').length),
    draws = await plot.getAttribute('data-draw-count');
  // This fixed idle-observation window detects the previous response -> redraw -> request loop; it does not arrange an async race.
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => performance.getEntriesByName('soup:hover').length)).toBe(before);
  expect(await plot.getAttribute('data-draw-count')).toBe(draws);
});
