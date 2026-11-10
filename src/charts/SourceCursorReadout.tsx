import {performanceMark} from '@/app/performance'
import {memo,useLayoutEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {cursorForView} from '@/worker/cursor-store'
import {formatStep,formatValue} from '@/data/format'
import type {Metric,SourceRow} from '@/data/types'
import type {Workspace} from '@/features/shared/Workspace'
import {recordHoverPaint,beginHoverPaint} from './use-hover-paint'
import styles from '@/features/shared/cursor-readout.module.css'

type Pin={id:string;revision:string;row:SourceRow}
type Props={workspace:Workspace;ids:string[];metric:Metric;metricName:string;slots:Record<string,number>;colorTokens:string[];onPin:(source:Pin)=>void;measure:boolean}
const exact=(v:number)=>Object.is(v,-0)?'-0':String(v)
const text=(node:HTMLElement,value:string)=>{
 if(node.textContent===value)return
 const leaf=node.firstChild
 if(leaf?.nodeType===Node.TEXT_NODE&&node.childNodes.length===1)leaf.nodeValue=value
 else node.textContent=value
}
const attribute=(node:HTMLElement,name:string,value:string|null)=>{if(node.getAttribute(name)!==value){if(value===null)node.removeAttribute(name);else node.setAttribute(name,value)}}
const hidden=(node:HTMLElement,value:boolean)=>{if(node.hidden!==value)node.hidden=value}
const toggle=(node:HTMLElement,name:string,value:boolean)=>{if(node.classList.contains(name)!==value)node.classList.toggle(name,value)}
export const sourceDom={exact,text,attribute,hidden,toggle}

/** React owns the fixed container. This adapter exclusively owns its leaf DOM, like uPlot's canvas. */
export const SourceCursorReadout=memo(function SourceCursorReadout({workspace,ids,metric,metricName,slots,colorTokens,onPin,measure}:Props){
 performanceMark('soup:source-readout-render')
 const host=useRef<HTMLDivElement>(null),navigate=useNavigate()
 const view=workspace.state.view,store=workspace.cursor,runs=workspace.state.runs,identity=ids.join(',')
 const accepted=useRef({view,runs}),refresh=useRef<(()=>void)|null>(null)
 useLayoutEffect(()=>{accepted.current={view,runs};refresh.current?.()},[view,runs])
 useLayoutEffect(()=>{
  const root=host.current;if(!root)return
  const element=<K extends keyof HTMLElementTagNameMap>(tag:K,className?:string,label?:string)=>{
   const node=document.createElement(tag);if(className)node.className=className;if(label)node.textContent=label;return node
  }
  const title=element('p',styles.title,'Original source values'),grid=element('div',styles.grid)
  const members=identity.split(',').filter(Boolean).map((id,index)=>{
   const slot=element('div',styles.slot),run=element('div',styles.run),dot=element('i','tooltip-dot')
   dot.style.background=`var(${colorTokens[slots[id]??index]})`
   run.append(dot,element('strong',undefined,id));slot.append(run)
   const observations=element('section',styles.observations);observations.setAttribute('aria-label',`Original observations for ${id}`)
   const placeholder=element('p',styles.placeholder);placeholder.dataset.sourceFact='true'
   const rows=Array.from({length:2},(_,index)=>{
    const box=element('div',styles.observation),facts=element('div',styles.facts),pin=element('button','text-link','Pin row')
    facts.dataset.sourceFact='true';pin.type='button';pin.onclick=()=>{
     const cursor=cursorForView(store.getSnapshot(),accepted.current.view),row=cursor.hover[id]?.[index],run=accepted.current.runs[id]?.run
     if(row&&run)onPin({id,revision:run.revision,row})
    }
    box.append(facts,pin);observations.append(box)
    return {box,facts,pin,key:'',prefix:'',distance:NaN}
   })
   const group=element('p',styles.group),count=element('span'),link=element('a','text-link','Inspect full source group')
   link.onclick=event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();navigate(link.getAttribute('href')??`/runs/${id}`)}
   group.append(count,document.createTextNode(' '),link,document.createTextNode('.'))
   observations.append(placeholder,group);slot.append(observations);grid.append(slot)
   return {id,slot,rows,placeholder,group,count,link,emptyActive:null as boolean|null}
  })
  root.replaceChildren(title,grid)
  let cancelPaint:(()=>void)|undefined
  const update=()=>{
   cancelPaint?.();cancelPaint=undefined
   const current=accepted.current,cursor=cursorForView(store.getSnapshot(),current.view),active=cursor.hoverStep!==null
   text(title,active?`Cursor step ${formatStep(cursor.hoverStep!)}`:'Original source values')
   for(const member of members){
    const source=active?cursor.hover[member.id]??[]:[]
    if(!source.length&&member.emptyActive===active)continue
    member.emptyActive=source.length?null:active
    toggle(member.slot,'tooltip-series',active)
    member.rows.forEach((nodes,index)=>{
     const row=source[index];hidden(nodes.box,!row)
     if(!row)return
     const key=`${member.id}:${current.runs[member.id].run.revision}:${row.sourceIndex}`,changed=nodes.key!==key,distance=Math.abs(row.step-cursor.hoverStep!)
     if(changed){
      nodes.key=key;nodes.prefix=`step ${formatStep(row.step)} · ${metricName} ${formatValue(row[metric],metric==='lr')}`
      attribute(nodes.facts,'title',`Exact source value ${exact(row[metric])}`);attribute(nodes.pin,'aria-label',`Pin row ${row.sourceIndex}`)
     }
     if(changed||distance!==nodes.distance){nodes.distance=distance;text(nodes.facts,`${nodes.prefix} · Δstep ${formatStep(distance)}`)}
    })
    hidden(member.placeholder,source.length>0)
    text(member.placeholder,active?'No recorded value at this cursor location.':'Point at or tap the chart to see the recorded step and value.')
    hidden(member.group,source.length<=2)
    if(source.length>2){
     text(member.count,`${source.length} returned observations. Showing first 2 returned observations; scroll within this readout for source actions.`)
     attribute(member.link,'href',`/runs/${member.id}?step=${source[0].step}&revision=${encodeURIComponent(current.runs[member.id].run.revision)}`)
    }
   }
   toggle(root,'chart-hover-value',active)
   attribute(root,'data-hover-seq',active?String(cursor.hoverSeq):null)
   if(measure)cancelPaint=recordHoverPaint(current.view?.viewSeq??0,cursor.hoverSeq,cursor.hoverStep)
  }
  const unarm=measure?store.beforePublish(next=>{const current=accepted.current.view,visible=cursorForView(next,current);beginHoverPaint(current?.viewSeq??0,visible.hoverSeq,visible.hoverStep)}):()=>{}
  refresh.current=update;update();const unsubscribe=store.subscribe(update)
  return()=>{if(refresh.current===update)refresh.current=null;unarm();unsubscribe();cancelPaint?.();root.replaceChildren()}
 },[store,identity,metric,metricName,slots,colorTokens,onPin,measure,navigate])
 return <section className={styles.rail} aria-label={`${metricName} source readout`} data-testid={`cursor-readout-${metric}`} data-reserved="true" data-members={ids.length}><div ref={host} className={styles.content}/></section>
})
