import { expect, test } from '@playwright/test'

for (const theme of ['dark', 'light'] as const) for (const width of [320, 390]) {
  test(`quality selectors fit their own cells at ${width}px in ${theme}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 844 })
    await page.addInitScript(value => localStorage.setItem('soup-theme', value), theme)
    await page.goto('/data-quality')
    await expect(page.getByRole('combobox', { name: 'Issue type', exact: true })).toBeVisible()
    const dimensions = await page.locator('.quality-filters').evaluate(element => ({
      viewport: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
      filters: element.getBoundingClientRect().toJSON(),
      controls: Array.from(element.querySelectorAll('label,select')).map(control => {
        const css = getComputedStyle(control)
        return { tag: control.tagName, text: control.tagName === 'LABEL' ? control.firstChild?.textContent : (control as HTMLSelectElement).selectedOptions[0].textContent, box: control.getBoundingClientRect().toJSON(), minWidth: css.minWidth, width: css.width, maxWidth: css.maxWidth, gridColumns: css.gridTemplateColumns }
      }),
    }))
    await info.attach('quality-filter-dimensions', { body: JSON.stringify(dimensions, null, 2), contentType: 'application/json' })
    expect(dimensions.pageWidth).toBeLessThanOrEqual(width)
    for (const value of ['all', 'conflict', 'invalidX', 'outOfOrder']) {
      await page.getByRole('combobox', { name: 'Issue type', exact: true }).selectOption(value)
      const controls = await page.locator('.quality-filters select').evaluateAll(selects => selects.map(select => ({ right: select.getBoundingClientRect().right, labelRight: select.parentElement!.getBoundingClientRect().right, width: select.getBoundingClientRect().width, labelWidth: select.parentElement!.getBoundingClientRect().width })))
      for (const control of controls) {
        expect(control.width).toBeLessThanOrEqual(control.labelWidth + 1)
        expect(control.right).toBeLessThanOrEqual(control.labelRight + 1)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    }
    await page.screenshot({ path: info.outputPath('quality-contained-controls.png'), fullPage: true })
  })
}
