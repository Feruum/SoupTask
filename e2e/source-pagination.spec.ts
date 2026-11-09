import { expect, test } from '@playwright/test'

test('source page number commits together with its actual rows after a deferred Worker response', async ({ page }) => {
  await page.addInitScript(() => {
    const NativeWorker = window.Worker
    const control = window as unknown as { holdRows?: boolean; releaseRows?: () => void }
    window.Worker = class extends NativeWorker {
      constructor(url: string | URL, options?: WorkerOptions) {
        super(url, options)
        this.addEventListener('message', event => {
          if (control.holdRows && event.data.kind === 'rows') {
            event.stopImmediatePropagation()
            control.releaseRows = () => {
              control.holdRows = false
              this.dispatchEvent(new MessageEvent('message', { data: event.data }))
            }
          }
        })
      }
    }
  })
  await page.goto('/runs/kazakh-sft-005')
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true')
  await page.getByRole('button', { name: 'Source', exact: true }).click()
  await page.getByText('Browse source rows', { exact: true }).click()
  const table = page.getByRole('table', { name: 'Original observations · 50 rows per page', exact: true })
  const firstSource = table.locator('tbody tr').first().getByRole('rowheader')
  await expect(firstSource).toHaveText('0')
  const pager = page.locator('.source-details .rows-pagination')
  await expect(pager).toContainText('Page 1')
  await page.evaluate(() => { (window as unknown as { holdRows: boolean }).holdRows = true })
  await page.getByRole('button', { name: 'Next rows', exact: true }).click()
  await page.waitForFunction(() => typeof (window as unknown as { releaseRows?: unknown }).releaseRows === 'function')
  await expect(firstSource).toHaveText('0')
  await expect(pager).toContainText('Page 1')
  await expect(pager).not.toContainText('Page 2')
  await expect(page.getByRole('button', { name: 'Next rows', exact: true })).toBeDisabled()
  await page.evaluate(() => (window as unknown as { releaseRows: () => void }).releaseRows())
  await expect(firstSource).toHaveText('50')
  await expect(pager).toContainText('Page 2')
})
