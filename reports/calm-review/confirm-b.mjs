import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:320,height:844},locale:'en-US',timezoneId:'Asia/Qyzylorda'});
const page = await context.newPage();
const results=[];
try {
  await page.goto('http://127.0.0.1:5173/dashboard');
  await page.getByTestId('loss-chart').waitFor();
  for (const theme of ['light','dark']) {
    const desired = page.getByRole('button',{name:`Switch to ${theme} theme`,exact:true});
    if (await desired.count()) await desired.click();
    await page.locator('.calm-step-inspection > summary').click();
    const result=await page.evaluate(()=>{
      const value=[...document.querySelectorAll('.calm-facts > div')].find(e=>e.querySelector('dt')?.textContent==='Raw rows')?.querySelector('dd');
      const range=document.createRange(); range.selectNodeContents(value);
      const rects=[...range.getClientRects()].map(r=>({x:r.x,y:r.y,width:r.width,height:r.height}));
      const form=document.querySelector('.calm-step-inspection form');
      const f=form.getBoundingClientRect();
      return {theme:document.documentElement.dataset.theme,viewport:{width:innerWidth,height:innerHeight},scrollWidth:document.documentElement.scrollWidth,rawRows:value.textContent,rawRowsRects:rects,snapshot:document.querySelector('.calm-selected-header .calm-snapshot')?.textContent,form:{open:form.closest('details').open,left:f.left,right:f.right,width:f.width,controls:[...form.querySelectorAll('input,button')].map(e=>({text:e.textContent,label:e.getAttribute('aria-label'),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,height:e.getBoundingClientRect().height}))}};
    });
    result.pass=result.rawRows==='1,000,000'&&result.rawRowsRects.length===1&&result.scrollWidth<=320&&result.snapshot.includes('Demo snapshot · Not live')&&result.form.left>=0&&result.form.right<=320&&result.form.controls.every(e=>e.left>=0&&e.right<=320);
    await page.locator('.calm-facts').scrollIntoViewIfNeeded();
    await page.screenshot({path:`reports/calm-review/confirmation-${theme}-320.png`,fullPage:true});
    results.push(result);
    await page.locator('.calm-step-inspection > summary').click();
  }
} finally {await context.close();await browser.close();}
await writeFile('reports/calm-review/confirmation-b.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
if(results.length!==2||results.some(r=>!r.pass))process.exitCode=1;
