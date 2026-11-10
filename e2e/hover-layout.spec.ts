import { expect, test, type Locator, type Page } from '@playwright/test';
async function documentTop(locator: Locator) {
  return locator.evaluate(element => {
    let top=element.getBoundingClientRect().top+scrollY;
    for(let parent=element.parentElement;parent;parent=parent.parentElement)if(parent!==document.documentElement&&parent!==document.body)top+=parent.scrollTop;
    return top;
  });
}
async function pointAtCenter(page: Page, plot: Locator) {
  await plot.locator('.u-over').scrollIntoViewIfNeeded();
  const box = await plot.locator('.u-over').boundingBox();
  if (!box) throw new Error('Missing chart input surface');
  const sequence = await page.evaluate(() => (window as Window & {
    __soupEvidence?: {
      acceptedHoverSeq: number;
    };
  }).__soupEvidence?.acceptedHoverSeq ?? 0);
  await page.mouse.move(box.x + box.width / 2 - 1, box.y + box.height / 2);
  await expect.poll(() => page.evaluate(() => (window as Window & {
    __soupEvidence?: {
      acceptedHoverSeq: number;
    };
  }).__soupEvidence?.acceptedHoverSeq ?? 0)).toBeGreaterThan(sequence);
}
async function setRange(page: Page, min: number, max: number) {
  const from = page.getByLabel('From step', {
    exact: true
  });
  if (!(await from.isVisible())) await page.locator('.range-disclosure > summary').click();
  await from.fill(String(min));
  await page.getByLabel('To step', {
    exact: true
  }).fill(String(max));
  await page.getByRole('button', {
    name: 'Apply range',
    exact: true
  }).click();
  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true');
}
for (const route of ['/dashboard', '/runs']) test(`${route} keeps source actions in place while the cursor updates`, async ({
  page
}, info) => {
  await page.setViewportSize({
    width: 1280,
    height: 900
  });
  await page.goto(route);
  const plot = page.getByTestId('loss-chart');
  await expect(plot).toHaveAttribute('data-view-ready', 'true');
  const next = page.locator(route === '/dashboard' ? '.calm-source-quality' : '.preview-facts');
  const before = await documentTop(next);
  await pointAtCenter(page, plot);
  const after = await documentTop(next);
  await info.attach('preview-layout', {
    body: JSON.stringify({
      route,
      before,
      after
    }),
    contentType: 'application/json'
  });
  expect.soft(after).toBeCloseTo(before, 0);
  if (route === '/dashboard') await expect(page.locator('.calm-chart .chart-hover-value')).toBeVisible();
  else await expect(page.locator('.preview-charts .chart-hover-value')).toHaveCount(0);
  await expect(plot).toHaveAttribute('data-cursor-point-count', /[1-9]/);
  if (route === '/runs') await expect(page.locator('.preview-charts')).toContainText('inspect original values and adjust range');
});
for (const width of [390, 1440]) for (const comparison of [false, true]) test(`${comparison ? 'four-run duplicate comparison' : 'full run'} preserves the following metric position at ${width}px`, async ({
  page
}, info) => {
  await page.setViewportSize({
    width,
    height: 900
  });
  await page.goto(comparison ? '/compare?runs=kazakh-sft-005,kazakh-sft-009,kazakh-sft-010,kazakh-sft-001' : '/runs/kazakh-sft-005');
  await expect(page.locator('.metric-grid')).toHaveAttribute('data-view-ready', 'true');
  await setRange(page, comparison ? 98 : 500000, comparison ? 100 : 500002);
  const plot = page.locator('.metric-loss .plot-host'),
    following = page.locator('.metric-lr'),
    before = await documentTop(following);
  await pointAtCenter(page, plot);
  await expect(page.locator('.metric-loss .chart-hover-value')).toBeVisible();
  const after = await documentTop(following);
  await info.attach('full-chart-layout', {
    body: JSON.stringify({
      width,
      comparison,
      before,
      after
    }),
    contentType: 'application/json'
  });
  expect(after).toBeCloseTo(before, 0);
  await expect(page.getByTestId(comparison ? 'comparison-cursor-readout' : 'cursor-readout-loss')).toHaveAttribute('data-reserved', 'true');
  if (comparison) {
    const source = page.getByTestId('comparison-cursor-readout');
    await expect(source.locator('tbody')).toHaveCount(4);
    const group = source.locator('tbody[aria-label="Original observations for kazakh-sft-009"]');
    await expect(group).toContainText('11 returned observations');
    await expect(group.getByRole('link', {
      name: 'Inspect full source group', exact: true
    })).toHaveAttribute('href', /step=99&revision=/);
  } else {
    const pin = page.locator('.metric-loss').getByRole('button', {
      name: 'Pin row 500001',
      exact: true
    });
    await pin.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('pinned-loss')).toHaveText('100');
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
});
test('the visible recorded spike explains the linear axis and zoom keeps its exact source', async ({
  page
}) => {
  await page.goto('/runs/kazakh-sft-005');
  const note = page.getByTestId('spike-explanation');
  await expect(note).toContainText('Recorded spike: loss 100 at step 500,001');
  await expect(note).toContainText('linear scale includes this peak');
  await expect(note.getByRole('link', {
    name: 'Inspect original spike',
    exact: true
  })).toHaveAttribute('href', /sourceIndex=500001&revision=/);
  await note.getByRole('button', {
    name: 'Zoom around spike',
    exact: true
  }).click();
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-min', '499991');
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-range-max', '500011');
  await expect(note).toBeVisible();
  await setRange(page, 0, 100);
  await expect(note).toHaveCount(0);
});
test('recorded nonfinite measurements explain their snapshot counts and gap semantics', async ({
  page
}) => {
  for (const [id, expected] of [['006', '2 NaN observations'], ['007', '1 +Infinity observation'], ['008', '1 −Infinity observation']]) {
    await page.goto(`/runs/kazakh-sft-${id}`);
    const note = page.locator('.metric-loss').getByTestId('invalid-explanation');
    await expect(note).toContainText(`This snapshot contains ${expected}`);
    await expect(note).toContainText('invalid values create gaps, never zero');
    await expect(note.getByRole('link', {
      name: 'Inspect data quality',
      exact: true
    })).toHaveAttribute('href', `/data-quality?run=kazakh-sft-${id}&metric=loss`);
  }
});
