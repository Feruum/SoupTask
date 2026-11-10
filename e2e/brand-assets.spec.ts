import { expect, test } from '@playwright/test'

for (const theme of ['dark', 'light']) {
  test(`${theme}: generated art fits empty search, run recipe and clean findings`, async ({ page }, info) => {
    await page.addInitScript(value => localStorage.setItem('soup-theme', value), theme)
    await page.setViewportSize({ width: theme === 'dark' ? 1440 : 390, height: 1000 })
    await page.goto('/runs')
    await page.getByRole('searchbox', { name: 'Search runs', exact: true }).fill('no-such-soup-run')
    await expect(page.getByRole('heading', { name: 'No matching runs', exact: true })).toBeVisible()
    const bowl = page.locator('[data-soup-art="piala"] img').first()
    await expect(bowl).toBeVisible()
    await expect(bowl).toHaveAttribute('alt', '')
    await expect.poll(() => bowl.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    await bowl.evaluate(image => (image as HTMLImageElement).decode())
    await page.screenshot({ path: info.outputPath(`${theme}-empty-search.png`), fullPage: true, animations: 'disabled' })

    await page.goto('/runs/kazakh-sft-001')
    await page.getByRole('button', { name: 'Run information', exact: true }).click()
    const recipe = page.locator('[data-soup-art="recipe"] img')
    await expect(recipe).toBeVisible()
    await expect.poll(() => recipe.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    await recipe.evaluate(image => (image as HTMLImageElement).decode())
    await expect(page.getByRole('heading', { name: 'Run information', exact: true })).toBeVisible()
    await page.screenshot({ path: info.outputPath(`${theme}-recipe.png`), fullPage: true, animations: 'disabled' })

    await page.goto('/data-quality?run=kazakh-sft-001')
    await expect(page.getByRole('heading', { name: 'No source data issues', exact: true })).toBeVisible({ timeout: 60000 })
    const ladle = page.locator('[data-soup-art="ladle"] img')
    await expect(ladle).toBeVisible()
    await expect.poll(() => ladle.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    await ladle.evaluate(image => (image as HTMLImageElement).decode())
    await page.screenshot({ path: info.outputPath(`${theme}-clean-findings.png`), fullPage: true, animations: 'disabled' })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test('loading animates only steam and respects reduced motion', async ({ page }, info) => {
  let releaseWorker = () => {}
  const workerGate = new Promise<void>(resolve => { releaseWorker = resolve })
  await page.route('**/*training.worker*.js', async route => {
    await workerGate
    await route.continue()
  })
  try {
    await page.goto('/runs/kazakh-sft-001')
    const loading = page.getByRole('region', { name: 'Loading measurements', exact: true })
    const steam = loading.locator('.soup-art-steam')
    await expect(steam).toBeVisible()
    await expect.poll(() => steam.evaluate(element => getComputedStyle(element).animationName)).toBe('soup-steam')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(steam).toHaveCSS('animation-name', 'none')
    await expect(steam).toHaveCSS('transform', 'none')
    await steam.evaluate(image => (image as HTMLImageElement).decode())
    await page.screenshot({ path: info.outputPath('loading-reduced-motion.png'), fullPage: true })
  } finally {
    releaseWorker()
  }
  await expect(page.getByTestId('loss-chart').locator('canvas')).toBeVisible({ timeout: 60000 })
})

