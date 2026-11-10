import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
async function range(plot: Locator) {
  return plot.evaluate(el => ({
    min: Number((el as HTMLElement).dataset.rangeMin),
    max: Number((el as HTMLElement).dataset.rangeMax)
  }));
}
async function plotPointer(page: Page, plot: Locator, fraction = .5) {
  await plot.scrollIntoViewIfNeeded();
  const box = await plot.boundingBox();
  if (!box) throw new Error('Plot has no visible bounds');
  const geometry = await plot.evaluate(el => ({
    left: Number((el as HTMLElement).dataset.plotLeft),
    top: Number((el as HTMLElement).dataset.plotTop),
    width: Number((el as HTMLElement).dataset.plotWidth),
    height: Number((el as HTMLElement).dataset.plotHeight)
  }));
  const point = {
    x: box.x + geometry.left + geometry.width * fraction,
    y: box.y + geometry.top + geometry.height * .5
  };
  expect(await page.evaluate(({x,y})=>Boolean(document.elementFromPoint(x,y)?.closest('.u-over')),point),'Pointer must hit the actual plotting overlay before wheel/drag').toBe(true);
  await page.mouse.move(point.x, point.y);
  return {
    point,
    geometry
  };
}
test('radial sectors select both source run and metric with keyboard alternatives', async ({
  page
}) => {
  await page.goto('/dashboard?view=map');
  const sector = page.getByRole('button', {
    name: 'kazakh-sft-006, Loss quality',
    exact: true
  });
  await sector.click();
  await expect(sector).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('selected-experiment')).toContainText('kazakh-sft-006');
  await expect(page.getByTestId('selected-metric')).toContainText('Loss');
  await expect(page.getByTestId('selected-experiment').getByRole('link', {
    name: 'Inspect issues'
  })).toHaveAttribute('href', '/data-quality?run=kazakh-sft-006&metric=loss');
  await sector.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('button', {
    name: 'kazakh-sft-006, Learning rate quality',
    exact: true
  })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('selected-metric')).toContainText('Learning rate');
});
test('wheel zoom, pinch outward, shift pan and drag share a bounded numeric range', async ({
  page
}) => {
  await page.goto('/runs/kazakh-sft-005');
  const plot = page.getByTestId('loss-chart');
  await expect(plot).toHaveAttribute('data-view-ready', 'true');
  const full = await range(plot);
  await plotPointer(page, plot);
  await page.mouse.wheel(0, -120);
  await expect.poll(async () => {
    const r = await range(plot);
    return r.max - r.min;
  }).toBeLessThan(full.max - full.min);
  const zoomed = await range(plot);
  await page.keyboard.down('Control');
  await page.mouse.wheel(0, 120);
  await page.keyboard.up('Control');
  await expect.poll(async () => {
    const r = await range(plot);
    return r.max - r.min;
  }).toBeGreaterThan(zoomed.max - zoomed.min);
  await page.getByRole('button', {
    name: 'Zoom in',
    exact: true
  }).click();
  await expect.poll(async () => {
    const r = await range(plot);
    return r.max - r.min;
  }).toBeLessThan(full.max - full.min);
  const beforePan = await range(plot);
  await plotPointer(page, plot);
  await page.keyboard.down('Shift');
  await page.mouse.wheel(0, 90);
  await page.keyboard.up('Shift');
  await expect.poll(async () => (await range(plot)).min).toBeGreaterThan(beforePan.min);
  const panned = await range(plot);
  expect(panned.max - panned.min).toBeCloseTo(beforePan.max - beforePan.min, 4);
  expect(panned.min).toBeGreaterThanOrEqual(full.min);
  expect(panned.max).toBeLessThanOrEqual(full.max);
  const {
    point,
    geometry
  } = await plotPointer(page, plot, .25);
  await page.mouse.down();
  await page.mouse.move(point.x + geometry.width * .35, point.y, {
    steps: 8
  });
  await page.mouse.up();
  await expect.poll(async () => {
    const r = await range(plot);
    return r.max - r.min;
  }).toBeLessThan(panned.max - panned.min);
  await page.getByRole('button', {
    name: 'Reset view',
    exact: true
  }).click();
  await expect.poll(async () => range(plot)).toEqual(full);
});
test('comparison legends support keyboard focus and keep source tooltip colors and markers', async ({
  page
}) => {
  await page.goto('/compare?runs=kazakh-sft-005,kazakh-sft-001');
  const plot = page.getByTestId('comparison-loss');
  await expect(plot).toHaveAttribute('data-view-ready', 'true');
  const section = page.locator('.metric-loss'),
    legend = section.getByRole('button', {
      name: 'Highlight kazakh-sft-005',
      exact: true
    });
  await legend.focus();
  await page.keyboard.press('Enter');
  await expect(legend).toHaveAttribute('aria-pressed', 'true');
  await expect(plot).toHaveAttribute('data-focused-run', 'kazakh-sft-005');
  await page.keyboard.press('Enter');
  await expect(legend).toHaveAttribute('aria-pressed', 'false');
  await expect(plot).toHaveAttribute('data-focused-run', '');
  await plotPointer(page, plot);
  await expect(section.locator('.tooltip-series').first()).toContainText('kazakh-sft-005');
  await expect.poll(async () => Number(await plot.getAttribute('data-cursor-point-count'))).toBeGreaterThan(0);
  const colors = await section.locator('.tooltip-dot').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
  expect(new Set(colors).size).toBe(2);
  expect(colors.every(color => color !== 'rgba(0, 0, 0, 0)')).toBe(true);
});
