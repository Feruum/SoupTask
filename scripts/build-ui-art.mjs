// Deterministic delivery derivatives; original generated artwork remains in assets/.
import {chromium} from '@playwright/test'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
const out='assets/ui',entries=[]
await mkdir(out,{recursive:true})
const browser=await chromium.launch()
try{
 const page=await browser.newPage()
 for(const kind of ['piala','recipe','ladle']){
  const source=await readFile(`assets/soup-${kind}.png`)
  for(const size of [128,256,512]){
   const png=await page.evaluate(async({url,size})=>{
    const image=new Image();image.src=url;await image.decode()
    const canvas=document.createElement('canvas');canvas.width=size;canvas.height=size
    const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,size,size)
    return canvas.toDataURL('image/png').split(',')[1]
   },{url:`data:image/png;base64,${source.toString('base64')}`,size})
   const bytes=Buffer.from(png,'base64'),file=`${out}/soup-${kind}-${size}.png`
   await writeFile(file,bytes)
   entries.push({file,width:size,height:size,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),source:`assets/soup-${kind}.png`,sourceSha256:createHash('sha256').update(source).digest('hex')})
  }
 }
 await writeFile(`${out}/manifest.json`,JSON.stringify({method:'Chromium Canvas nearest-neighbour resampling with imageSmoothingEnabled=false; original art is preserved. Technical responsive delivery, no new generative artwork.',browser:browser.version(),entries},null,2))
 console.log(`Created${entries.length} responsive nearest-neighbour PNG delivery assets.`)
}finally{await browser.close()}
