type Bounds={left:number;top:number;right:number;bottom:number}
export type HoverVisibility={visible:boolean;cells:{text:string;rect:Bounds;clip:Bounds;reason:string|null}[]}

/** Read-only, after DOM commit. A rendered box alone does not establish readable values. */
export function inspectHoverVisibility(root:HTMLElement):HoverVisibility{
 const clips=new Map<Element,Bounds>(),styles=new Map<Element,CSSStyleDeclaration>()
 const style=(node:Element)=>{let css=styles.get(node);if(!css){css=getComputedStyle(node);styles.set(node,css)}return css}
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
  const box=range.getBoundingClientRect(),bounds=clip(node),rect={left:box.left,top:box.top,right:box.right,bottom:box.bottom}
  let reason:string|null=null
  for(let ancestor:Element|null=node;ancestor;ancestor=ancestor.parentElement){const css=style(ancestor);if(css.visibility!=='visible'||css.display==='none'||Number(css.opacity)===0){reason='hidden';break}}
  if(!reason&&(!box.width||!box.height||!node.textContent?.trim()))reason='empty'
  if(!reason&&(box.left<bounds.left||box.right>bounds.right||box.top<bounds.top||box.bottom>bounds.bottom))reason='clipped-or-offscreen'
  if(!reason){
   const inset=Math.min(1,box.width/4,box.height/4)
   const points=[[box.left+inset,box.top+inset],[box.right-inset,box.top+inset],[box.left+inset,box.bottom-inset],[box.right-inset,box.bottom-inset],[(box.left+box.right)/2,(box.top+box.bottom)/2]]
   if(points.some(([x,y])=>{const hit=document.elementFromPoint(x,y);return !hit||!node.contains(hit)}))reason='occluded'
  }
  return{text:node.textContent??'',rect,clip:bounds,reason}
 })
 return{visible:cells.length>0&&cells.every(cell=>!cell.reason),cells}
}
