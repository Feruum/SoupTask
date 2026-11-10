# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: review-fixes.spec.ts >> a refused second inspection preserves the pending accepted query and its original reply
- Location: e2e\review-fixes.spec.ts:2:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('inspection-status')
Expected: "Inspecting recorded step 500,001…"
Received: "Could not inspect recorded step 500,002. The view is changing. Retry this source query after it finishes."
Timeout:  5000ms

Call log:
  - Expect "toHaveText" getByTestId('inspection-status') with timeout 5000ms
  - waiting for getByTestId('inspection-status')
    14 × locator resolved to <output class="_status_viswq_1" data-testid="inspection-status">Could not inspect recorded step 500,002. The view…</output>
       - unexpected value "Could not inspect recorded step 500,002. The view is changing. Retry this source query after it finishes."

```

```yaml
- status: Could not inspect recorded step 500,002. The view is changing. Retry this source query after it finishes.
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | test('a refused second inspection preserves the pending accepted query and its original reply', async ({page})=>{
  3   |   await page.addInitScript(()=>{
  4   |     const gate={replies:[] as Array<()=>void>};
  5   |     Object.defineProperty(window,'__inspectionGate',{value:gate});
  6   |     window.Worker=new Proxy(window.Worker,{construct(WorkerClass,args){
  7   |       const worker=new WorkerClass(...args as [string|URL,WorkerOptions?]),descriptor=Object.getOwnPropertyDescriptor(WorkerClass.prototype,'onmessage')!;
  8   |       Object.defineProperty(worker,'onmessage',{get:()=>descriptor.get!.call(worker),set(listener:Worker['onmessage']){descriptor.set!.call(worker,listener?function(event:MessageEvent){if(event.data.kind==='inspect')gate.replies.push(()=>listener.call(worker,event));else listener.call(worker,event)}:null)}});
  9   |       return worker;
  10  |     }});
  11  |   });
  12  |   await page.goto('/runs/kazakh-sft-005');
  13  |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready','true');
  14  |   await page.getByRole('button',{name:'Source',exact:true}).click();
  15  |   const input=page.getByLabel('Source step',{exact:true}),status=page.getByTestId('inspection-status');
  16  |   await input.fill('500001');
  17  |   await page.getByRole('button',{name:'Inspect step',exact:true}).click();
  18  |   await expect.poll(()=>page.evaluate(()=>(window as unknown as {__inspectionGate:{replies:Array<()=>void>}}).__inspectionGate.replies.length)).toBe(1);
  19  |   await expect(status).toHaveText('Inspecting recorded step 500,001…');
  20  |   await input.fill('500002');
  21  |   await input.evaluate(element=>(element.closest('form') as HTMLFormElement).requestSubmit());
> 22  |   await expect(status).toHaveText('Inspecting recorded step 500,001…');
      |                        ^ Error: expect(locator).toHaveText(expected) failed
  23  |   await expect(page.getByRole('button',{name:'Inspect step',exact:true})).toBeDisabled();
  24  |   await page.evaluate(()=>(window as unknown as {__inspectionGate:{replies:Array<()=>void>}}).__inspectionGate.replies.shift()!());
  25  |   await expect(page.getByTestId('inspected-loss')).toHaveText('100.000');
  26  |   await expect(status).toContainText('recorded step 500,001');
  27  |   await expect(page.getByRole('button',{name:'Inspect step',exact:true})).toBeEnabled();
  28  | });
  29  | test('an accepted source lookup with zero matches announces its recorded step and recovery', async ({
  30  |   page
  31  | }) => {
  32  |   await page.goto('/runs/kazakh-sft-005');
  33  |   await expect(page.getByTestId('loss-chart')).toHaveAttribute('data-view-ready', 'true');
  34  |   await page.getByRole('button', {
  35  |     name: 'Source',
  36  |     exact: true
  37  |   }).click();
  38  |   await page.getByLabel('Source step', {
  39  |     exact: true
  40  |   }).fill('1000001');
  41  |   await page.getByRole('button', {
  42  |     name: 'Inspect step',
  43  |     exact: true
  44  |   }).click();
  45  |   const status = page.getByTestId('inspection-status');
  46  |   await expect(status).toContainText('No observation at recorded step 1,000,001');
  47  |   await page.getByLabel('Source step', {
  48  |     exact: true
  49  |   }).fill('500001');
  50  |   await expect(status).toContainText('No observation at recorded step 1,000,001');
  51  |   await page.locator('.source-details > summary').click();
  52  |   await expect(page.locator('.source-details')).toHaveAttribute('open', '');
  53  |   await page.getByRole('button', {
  54  |     name: 'Inspect step',
  55  |     exact: true
  56  |   }).click();
  57  |   await expect(page.getByTestId('inspected-loss')).toHaveText('100.000');
  58  |   await expect(status).toContainText('recorded step 500,001');
  59  | });
  60  | for (const width of [1024, 1280, 1400]) test(`stacked preview at ${width}px brings its selected run into view and focuses its heading`, async ({
  61  |   page
  62  | }) => {
  63  |   await page.setViewportSize({
  64  |     width,
  65  |     height: 900
  66  |   });
  67  |   await page.goto('/runs');
  68  |   await page.getByRole('button', {
  69  |     name: 'Preview kazakh-sft-002',
  70  |     exact: true
  71  |   }).click();
  72  |   const heading = page.locator('.run-preview').getByRole('heading', {
  73  |     name: 'kazakh-sft-002',
  74  |     exact: true
  75  |   });
  76  |   await expect(heading).toBeFocused();
  77  |   const box = await heading.boundingBox();
  78  |   expect(box).not.toBeNull();
  79  |   expect(box!.y).toBeGreaterThanOrEqual(0);
  80  |   expect(box!.y).toBeLessThan(300);
  81  | });
  82  | test('compact preview help links to real range controls on both preview hosts', async ({
  83  |   page
  84  | }) => {
  85  |   await page.setViewportSize({
  86  |     width: 390,
  87  |     height: 844
  88  |   });
  89  |   for (const route of ['/dashboard', '/runs']) {
  90  |     await page.goto(route);
  91  |     if (route === '/runs') await page.getByRole('button', {
  92  |       name: 'Preview kazakh-sft-002',
  93  |       exact: true
  94  |     }).click();
  95  |     const preview = page.locator('.preview-charts');
  96  |     await expect(preview).toBeVisible();
  97  |     await expect(preview).not.toContainText('Use Adjust chart range to zoom');
  98  |     await preview.getByRole('link', {
  99  |       name: 'Open run and adjust range',
  100 |       exact: true
  101 |     }).click();
  102 |     await expect(page).toHaveURL(/\/runs\/kazakh-sft-\d{3}$/);
  103 |     await expect(page.getByText('Adjust chart range', {
  104 |       exact: true
  105 |     })).toBeVisible();
  106 |   }
  107 | });
  108 | test('quality filters and findings use readable names while URL query values stay stable', async ({
  109 |   page
  110 | }) => {
  111 |   await page.goto('/data-quality?run=kazakh-sft-007&kind=posInf');
  112 |   const filter = page.getByRole('combobox', {
  113 |     name: 'Issue type',
  114 |     exact: true
  115 |   });
  116 |   await expect(filter.getByRole('option', {
  117 |     name: '+Infinity',
  118 |     exact: true
  119 |   })).toHaveAttribute('value', 'posInf');
  120 |   await expect(filter.getByRole('option', {
  121 |     name: 'Invalid step coordinates',
  122 |     exact: true
```