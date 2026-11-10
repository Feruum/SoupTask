import {chromium} from '@playwright/test'
import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {spawn} from 'node:child_process'
const out=process.env.CONTRAST_REVIEW_OUT??'reports/perf-targets-2026-11-10/contrast-review'
const input=process.env.CONTRAST_REVIEW_INPUT??'reports/review-release/a11y-summary.json'
const source=JSON.parse(await readFile(input,'utf8'))
const metadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
await mkdir(`${out}/pixels`,{recursive:true})
await writeFile(`${out}/run-start.json`,JSON.stringify({startedAt:new Date().toISOString(),input,sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,scope:'Assistant-run individual review of the input axe incomplete occurrences. Original axe results remain unchanged. Static reduced-motion replay, computed foreground/opacity and actual screenshot background pixels after revealing scrollable content; not human screen-reader certification.'}),{flag:'wx'})
const server=spawn(process.execPath,['scripts/serve-build.mjs','dist','4189'],{stdio:'pipe'})
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)})
const browser=await chromium.launch(),entries=[]
try{
 for(let ai=0;ai<source.results.length;ai++){
  const audit=source.results[ai],theme=audit.test.startsWith('dark')?'dark':'light'
  const context=await browser.newContext({viewport:{width:audit.environment.windowWidth,height:audit.environment.windowHeight},locale:'en-US',timezoneId:'Asia/Qyzylorda',reducedMotion:'reduce',deviceScaleFactor:1})
  await context.addInitScript(theme=>localStorage.setItem('soup-theme',theme),theme)
  const page=await context.newPage(),url=new URL(audit.url)
  await page.goto(`http://127.0.0.1:4189${url.pathname}${url.search}`)
  await page.locator('h1').waitFor()
  if(url.pathname==='/dashboard'||url.pathname==='/runs'||url.pathname.startsWith('/runs/')||url.pathname==='/compare')await page.waitForFunction(()=>document.querySelectorAll('.plot-host[data-view-ready="true"]').length>0,undefined,{timeout:60000})
  await page.evaluate(()=>document.fonts.ready)
  await page.addStyleTag({content:'[data-contrast-probe], [data-contrast-probe] * {color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;fill:transparent!important}'})
  let ni=0
  for(const finding of audit.incomplete)for(const node of finding.nodes){
   const entry={id:`${ai}:${ni++}`,auditIndex:ai,test:audit.test,url:audit.url,theme,viewport:{width:audit.environment.windowWidth,height:audit.environment.windowHeight},selector:node.target.join(' '),original:node,observations:[]}
   entries.push(entry)
   try{
    const loc=page.locator(entry.selector)
    if(await loc.count()!==1)throw Error(`Expected one original target, found ${await loc.count()}`)
    await loc.evaluate(el=>el.scrollIntoView({block:'center',inline:'center',behavior:'instant'}))
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
    entry.geometry=await loc.evaluate(el=>{
     const rgba=value=>{const c=document.createElement('canvas');c.width=c.height=1;const ctx=c.getContext('2d');ctx.fillStyle=value;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data]}
     const runs=[],walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT)
     for(let text=walker.nextNode();text;text=walker.nextNode()){
      if(!text.textContent.trim())continue
      const parent=text.parentElement,style=getComputedStyle(parent)
      let opacity=1,hidden=false;const clips=[]
      for(let a=parent;a;a=a.parentElement){const s=getComputedStyle(a);opacity*=Number(s.opacity);if(s.display==='none'||s.visibility!=='visible')hidden=true;const b=a.getBoundingClientRect();clips.push({left:b.left+a.clientLeft,top:b.top+a.clientTop,right:b.left+a.clientLeft+a.clientWidth,bottom:b.top+a.clientTop+a.clientHeight,x:/(hidden|clip|auto|scroll)/.test(s.overflowX),y:/(hidden|clip|auto|scroll)/.test(s.overflowY)})}
      const range=document.createRange();range.selectNodeContents(text)
      for(const r of range.getClientRects()){
       let left=Math.max(0,r.left),top=Math.max(0,r.top),right=Math.min(innerWidth,r.right),bottom=Math.min(innerHeight,r.bottom)
       for(const c of clips){if(c.x){left=Math.max(left,c.left);right=Math.min(right,c.right)}if(c.y){top=Math.max(top,c.top);bottom=Math.min(bottom,c.bottom)}}
       const fontSize=parseFloat(style.fontSize),bold=Number(style.fontWeight)>=700
       runs.push({text:text.textContent,color:rgba(style.color),opacity,hidden,threshold:fontSize>=24||(bold&&fontSize>=18.6667)?3:4.5,fontSize,fontWeight:style.fontWeight,rect:r.toJSON(),clip:{x:Math.ceil(left),y:Math.ceil(top),width:Math.floor(right)-Math.ceil(left),height:Math.floor(bottom)-Math.ceil(top)}})
      }
     }
     return {html:el.outerHTML,runs}
    })
    for(let ri=0;ri<entry.geometry.runs.length;ri++){
     const run=entry.geometry.runs[ri]
     if(run.hidden||run.opacity===0){entry.observations.push({...run,status:'not-painted-hidden'});continue}
     if(run.clip.width<=0||run.clip.height<=0){entry.observations.push({...run,status:'not-painted-clipped'});continue}
     const name=`${ai}-${ni-1}-${ri}`,original=`${out}/pixels/${name}-original.png`,background=`${out}/pixels/${name}-background.png`
     await page.screenshot({path:original,clip:run.clip,animations:'disabled'})
     await loc.evaluate(el=>el.setAttribute('data-contrast-probe',''))
     try{await page.screenshot({path:background,clip:run.clip,animations:'disabled'})}
     finally{await loc.evaluate(el=>el.removeAttribute('data-contrast-probe'))}
     entry.observations.push({...run,status:'pixel-review',original,background})
    }
    if(!entry.observations.length)entry.error='No text geometry; requires separate review'
   }catch(error){entry.error=String(error)}
   await writeFile(`${out}/ledger.json`,JSON.stringify({entries},null,2))
   if(process.env.CONTRAST_MAX&&entries.length>=Number(process.env.CONTRAST_MAX))break
  }
  await context.close()
  console.log(`Reviewed original audit ${ai+1}/${source.results.length}; ${entries.length} occurrences`)
  if(process.env.CONTRAST_MAX&&entries.length>=Number(process.env.CONTRAST_MAX))break
 }
}finally{await browser.close();server.kill();await writeFile(`${out}/ledger.json`,JSON.stringify({input,sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,entries},null,2))}
