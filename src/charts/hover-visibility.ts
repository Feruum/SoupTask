type Bounds={left:number;top:number;right:number;bottom:number}
export type HoverVisibility={visible:boolean;cells:{text:string;rect:Bounds;clip:Bounds;reason:string|null}[]}

/** Read-only, after DOM commit. A rendered box alone does not establish readable values. */
export function inspectHoverVisibility(root:HTMLElement):HoverVisibility{
 type Style={position:string;contain:string;overflowX:string;overflowY:string}
 const clips=new Map<Element,Bounds>(),styles=new Map<Element,Style>(),visibility=new Map<Element,boolean>()
 const style=(node:Element)=>{let css=styles.get(node);if(!css){const computed=getComputedStyle(node);css={position:computed.position,contain:computed.contain,overflowX:computed.overflowX,overflowY:computed.overflowY};styles.set(node,css)}return css}
 const fallbackVisible=(node:Element):boolean=>{const cached=visibility.get(node);if(cached!==undefined)return cached;const css=getComputedStyle(node),value=css.visibility==='visible'&&css.display!=='none'&&Number(css.opacity)!==0&&(!node.parentElement||fallbackVisible(node.parentElement));visibility.set(node,value);return value}
 // Native style/ancestor checks avoid repeated JS property walks. This API does
 // NOT establish viewport/clipping/occlusion: retain all geometric checks below.
 const visible=(node:Element)=>typeof node.checkVisibility==='function'?node.checkVisibility({opacityProperty:true,visibilityProperty:true,contentVisibilityAuto:true}):fallbackVisible(node)
 const clip=(node:Element):Bounds=>{
  const cached=clips.get(node);if(cached)return cached
  const css=style(node),parent=css.position==='fixed'?null:node.parentElement
  const bounds=parent?{...clip(parent)}:{left:0,top:0,right:document.documentElement.clientWidth,bottom:innerHeight}
  const paint=/paint|strict|content/.test(css.contain)
  if(paint||/auto|scroll|hidden|clip/.test(css.overflowX+css.overflowY)){
   const box=node.getBoundingClientRect()
   if(paint||/auto|scroll|hidden|clip/.test(css.overflowX)){bounds.left=Math.max(bounds.left,box.left+node.clientLeft);bounds.right=Math.min(bounds.right,box.left+node.clientLeft+node.clientWidth)}
   if(paint||/auto|scroll|hidden|clip/.test(css.overflowY)){bounds.top=Math.max(bounds.top,box.top+node.clientTop);bounds.bottom=Math.min(bounds.bottom,box.top+node.clientTop+node.clientHeight)}
  }
  clips.set(node,bounds);return bounds
 }
 const rows=[...root.querySelectorAll('tbody')].map(body=>body.querySelector('tr:not([hidden])'))
 const nodes=rows.length?rows.flatMap(row=>row?[...row.querySelectorAll<HTMLElement>('[data-source-step],[data-source-metric],[data-source-missing]')]:[]):[...root.querySelectorAll<HTMLElement>('[data-source-fact]:not([hidden])')].filter(node=>!node.closest('[hidden]'))
 const cells=nodes.map(node=>{
  const range=document.createRange();range.selectNodeContents(node)
  const box=range.getBoundingClientRect(),cell=node.getBoundingClientRect(),ancestor=clip(node.parentElement??root)
  // Text must fit its own cell as well as the shared ancestor clipping bounds.
  // This conservative client-box cap also covers own overflow/paint clipping,
  // without reading the same static table-cell CSS properties for every value.
  const left=cell.left+node.clientLeft,top=cell.top+node.clientTop
  const bounds={left:Math.max(ancestor.left,left),top:Math.max(ancestor.top,top),right:Math.min(ancestor.right,left+node.clientWidth),bottom:Math.min(ancestor.bottom,top+node.clientHeight)}
  const rect={left:box.left,top:box.top,right:box.right,bottom:box.bottom}
  let reason:string|null=visible(node)?null:'hidden'
  if(!reason&&(!box.width||!box.height||!node.textContent?.trim()))reason='empty'
  if(!reason&&(box.left<bounds.left||box.right>bounds.right||box.top<bounds.top||box.bottom>bounds.bottom))reason='clipped-or-offscreen'
  if(!reason){
   // Sample occlusion once per actual cell; full text bounds above establish clipping.
   // This does not assert that every physical pixel is unobscured.
   const hit=document.elementFromPoint((box.left+box.right)/2,(box.top+box.bottom)/2)
   if(!hit||!node.contains(hit))reason='occluded'
  }
  return{text:node.textContent??'',rect,clip:bounds,reason}
 })
 return{visible:cells.length>0&&cells.every(cell=>!cell.reason),cells}
}
