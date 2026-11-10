import { expect, test } from '@playwright/test';
test.use({
  viewport: {
    width: 1440,
    height: 900
  },
  locale: 'en-US'
});
test('whole-run summaries expose each metric with source steps and invalid latest states', async ({
  page
}) => {
  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-006,kazakh-sft-010,kazakh-sft-015');
  const summary = page.getByTestId('comparison-summary');
  await expect(summary).toHaveAttribute('data-summary-metric', 'loss');
  await expect(page.getByTestId('summary-kazakh-sft-005-max')).toHaveText('100.000step 500,001');
  await expect(page.getByTestId('summary-kazakh-sft-005-min')).toContainText('step 989,070');
  const invalid = page.getByTestId('summary-kazakh-sft-006-latest');
  await expect(invalid).toContainText('Invalid latest measurementstep 8,191');
  await expect(invalid).toContainText('Earlier finite: 0.265264 at step 8,190');
  await expect(page.getByTestId('summary-kazakh-sft-006-min')).toContainText('step 8,157');
  const conflict = page.getByTestId('summary-kazakh-sft-010-latest');
  await expect(conflict).toContainText('Conflicting latest measurementsstep 8,190');
  await expect(conflict).toContainText('Earlier finite:');
  await expect(conflict).toContainText('at step 8,189');
  await expect(page.getByTestId('summary-row-kazakh-sft-005')).toContainText('1,000,000 raw rows');
  await page.getByRole('combobox', { name: 'Summary metric',
    exact: true
  }).selectOption('lr');
  await expect(summary).toHaveAttribute('data-summary-metric', 'lr');
  await expect(page.getByTestId('summary-kazakh-sft-015-max')).toHaveText('1.83323E-9step 683');
  await expect(page.getByTestId('summary-kazakh-sft-015-min')).toHaveText('0E0step 0');
  await expect(page.getByTestId('summary-kazakh-sft-006-latest')).toHaveText('0E0step 8,191');
  await expect(page.getByTestId('summary-row-kazakh-sft-006').getByRole('link', {
    name: '0 invalid observations'
  })).toHaveAttribute('href', '/data-quality?run=kazakh-sft-006&metric=lr');
  await page.getByRole('combobox', { name: 'Summary metric',
    exact: true
  }).selectOption('grad_norm');
  await expect(summary).toHaveAttribute('data-summary-metric', 'grad_norm');
  await expect(page.getByTestId('summary-kazakh-sft-005-max')).toContainText('step 29,989');
  await expect(page.getByTestId('summary-kazakh-sft-005-min')).toContainText('step 945,702');
});
test('run quality exposes bounded findings and same-run links open the exact source row', async ({
  page
}) => {
  await page.goto('/runs/kazakh-sft-006');
  await page.getByRole('button', {
    name: 'Data quality',
    exact: true
  }).click();
  const counts = page.getByTestId('run-issue-types');
  await expect(counts.getByRole('row').filter({
    hasText: 'NaN'
  })).toContainText('2metric observations');
  const ledger = page.getByTestId('run-issue-ledger');
  await expect(ledger).toBeVisible();
  await expect(ledger.getByRole('row')).toHaveCount(3);
  await expect(page.getByTestId('run-issue-strip').getByRole('link')).toHaveCount(2);
  const source = ledger.getByRole('link', {
    name: 'Inspect source 8191',
    exact: true
  });
  await expect(source).toHaveAttribute('href', /sourceIndex=8191&revision=/);
  await source.click();
  await expect(page.getByRole('button', {
    name: 'Source',
    exact: true
  })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByLabel('Source index', {
    exact: true
  })).toHaveValue('8191');
  await expect(page.getByTestId('inspected-loss')).toHaveText('NaN');
});
test('workspace issue totals keep observations, source rows and groups as separate units', async ({
  page
}) => {
  await page.goto('/data-quality');
  const counts = page.getByTestId('workspace-issue-types');
  await expect(counts.getByRole('row')).toHaveCount(10);
  await expect(counts.getByRole('row').filter({
    hasText: 'Additional duplicate rows'
  })).toContainText('raw rows beyond the first group member');
  await expect(counts.getByRole('row').filter({
    hasText: 'Duplicate steps'
  })).toContainText('step groups');
  await expect(counts.getByRole('row').filter({
    hasText: 'Conflicting measurements'
  })).toContainText('metric groups');
  await expect(counts.getByRole('row').filter({
    hasText: 'Known cadence gaps'
  })).toContainText('missing intervals');
});
