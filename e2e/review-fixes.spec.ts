import { expect, test } from '@playwright/test';
test('a refused second inspection preserves the pending accepted query and its original reply', async ({
  page
}) => {
  await page.addInitScript(() => {
    const gate = {
      replies: [] as Array<() => void>
    };
    Object.defineProperty(window, '__inspectionGate', {
      value: gate
    });
    window.Worker = new Proxy(window.Worker, {
      construct(WorkerClass, args) {
        const worker = new WorkerClass(...(args as [string | URL, WorkerOptions?])),
          descriptor = Object.getOwnPropertyDescriptor(WorkerClass.prototype, 'onmessage')!;
        Object.defineProperty(worker, 'onmessage', {
          get: () => descriptor.get!.call(worker),
          set(listener: Worker['onmessage']) {
            descriptor.set!.call(worker, listener ? function (event: MessageEvent) {
              if (event.data.kind === 'inspect') gate.replies.push(() => listener.call(worker, event));else listener.call(worker, event);
            } : null);
          }
        });
        return worker;
      }
    });
  });
  await page.goto('/runs/kazakh-sft-005');
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true');
  await page.getByRole('button', {
    name: 'Source',
    exact: true
  }).click();
  const input = page.getByLabel('Source step', {
      exact: true
    }),
    status = page.getByTestId('inspection-status');
  await input.fill('500001');
  await page.getByRole('button', {
    name: 'Inspect step',
    exact: true
  }).click();
  await expect.poll(() => page.evaluate(() => (window as unknown as {
    __inspectionGate: {
      replies: Array<() => void>;
    };
  }).__inspectionGate.replies.length)).toBe(1);
  await expect(status).toHaveText('Inspecting recorded step 500,001…');
  await input.fill('500002');
  await input.evaluate(element => (element.closest('form') as HTMLFormElement).requestSubmit());
  await expect(status).toHaveText('Inspecting recorded step 500,001…');
  await expect(page.getByRole('button', {
    name: 'Inspect step',
    exact: true
  })).toBeDisabled();
  await page.evaluate(() => (window as unknown as {
    __inspectionGate: {
      replies: Array<() => void>;
    };
  }).__inspectionGate.replies.shift()!());
  await expect(page.getByTestId('inspected-loss')).toHaveText('100.000');
  await expect(status).toContainText('recorded step 500,001');
  await expect(page.getByRole('button', {
    name: 'Inspect step',
    exact: true
  })).toBeEnabled();
});
test('an accepted source lookup with zero matches announces its recorded step and recovery', async ({
  page
}) => {
  await page.goto('/runs/kazakh-sft-005');
  await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true');
  await page.getByRole('button', {
    name: 'Source',
    exact: true
  }).click();
  await page.getByLabel('Source step', {
    exact: true
  }).fill('1000001');
  await page.getByRole('button', {
    name: 'Inspect step',
    exact: true
  }).click();
  const status = page.getByTestId('inspection-status');
  await expect(status).toContainText('No observation at recorded step 1,000,001');
  await page.getByLabel('Source step', {
    exact: true
  }).fill('500001');
  await expect(status).toContainText('No observation at recorded step 1,000,001');
  await page.locator('.source-details > summary').click();
  await expect(page.locator('.source-details')).toHaveAttribute('open', '');
  await page.getByRole('button', {
    name: 'Inspect step',
    exact: true
  }).click();
  await expect(page.getByTestId('inspected-loss')).toHaveText('100.000');
  await expect(status).toContainText('recorded step 500,001');
});
for (const width of [1024, 1280, 1400]) test(`stacked preview at ${width}px brings its selected run into view and focuses its heading`, async ({
  page
}) => {
  await page.setViewportSize({
    width,
    height: 900
  });
  await page.goto('/runs');
  await page.getByRole('button', {
    name: 'Preview kazakh-sft-002',
    exact: true
  }).click();
  const heading = page.locator('.run-preview').getByRole('heading', {
    name: 'kazakh-sft-002',
    exact: true
  });
  await expect(heading).toBeFocused();
  const box = await heading.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeLessThan(300);
});
test('compact preview help links to real range controls on both preview hosts', async ({
  page
}) => {
  await page.setViewportSize({
    width: 390,
    height: 844
  });
  for (const route of ['/runs']) {
    await page.goto(route);
    if (route === '/runs') await page.getByRole('button', {
      name: 'Preview kazakh-sft-002',
      exact: true
    }).click();
    const preview = page.locator('.preview-charts');
    await expect(preview).toBeVisible();
    await expect(preview).not.toContainText('Use Adjust chart range to zoom');
    await preview.getByRole('link', {
      name: 'Open run to inspect original values and adjust range',
      exact: true
    }).click();
    await expect(page).toHaveURL(/\/runs\/kazakh-sft-\d{3}$/);
    await expect(page.getByText('Adjust chart range', {
      exact: true
    })).toBeVisible();
  }
});
test('quality filters and findings use readable names while URL query values stay stable', async ({
  page
}) => {
  await page.goto('/data-quality?run=kazakh-sft-007&kind=posInf');
  const filter = page.getByRole('combobox', {
    name: 'Issue type',
    exact: true
  });
  await expect(filter.getByRole('option', {
    name: '+Infinity',
    exact: true
  })).toHaveAttribute('value', 'posInf');
  await expect(filter.getByRole('option', {
    name: 'Invalid step coordinates',
    exact: true
  })).toHaveAttribute('value', 'invalidX');
  await expect(page.locator('.issue-ledger-table').getByRole('rowheader', {
    name: '+Infinity',
    exact: true
  })).toBeVisible();
  await expect(page.locator('.issue-strip').getByRole('link').first()).toHaveAccessibleName(/\+Infinity at step/);
  await filter.selectOption('outOfOrder');
  await expect(page).toHaveURL(/kind=outOfOrder/);
  await expect(filter.getByRole('option', {
    name: 'Out-of-order source',
    exact: true
  })).toHaveJSProperty('selected', true);
});
