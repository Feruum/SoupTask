import {memo,useLayoutEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import type {SourceRow,Metric} from '@/data/types'
import {formatStep,formatValue} from '@/data/format'
import type {Workspace} from '@/features/shared/Workspace'
import {cursorForView} from '@/worker/cursor-store'
import {beginHoverPaint,recordHoverPaint} from './use-hover-paint'
import {sourceDom} from './SourceCursorReadout'
import styles from '@/features/shared/cursor-readout.module.css'

const METRICS:Metric[]=['loss','lr','grad_norm']
const {exact,text,attribute,hidden,toggle}=sourceDom
type Props={workspace:Workspace;ids:string[];slots:Record<string,number>;colorTokens:string[];onPin:(source:{id:string;revision:string;row:SourceRow})=>void}

/** One persistent original-row table for all comparison panels; raw values are never interpolated. */
export const ComparisonCursorReadout=memo(function ComparisonCursorReadout({workspace,ids,slots,colorTokens,onPin}:Props){
 performance.mark('soup:source-readout-render')
 const host=useRef<HTMLDivElement>(null),refresh=useRef<(()=>void)|null>(null),navigate=useNavigate()
 const {view,runs}=workspace.state,store=workspace.cursor,identity=ids.join(',')
 const comparison=ids.length>1
 const accepted=useRef({view,runs})
 useLayoutEffect(()=>{accepted.current={view,runs};refresh.current?.()},[view,runs])
 useLayoutEffect(()=>{
  const root=host.current;if(!root)return
  const element=<K extends keyof HTMLElementTagNameMap>(tag:K,className?:string,label?:string)=>{const node=document.createElement(tag);if(className)node.className=className;if(label)node.textContent=label;return node}
  const title=element('p',styles.title,'Original source values · All metrics'),viewport=element('div',styles.sharedViewport),table=element('table',styles.sharedTable)
  viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label',comparison?'Compared source table':'Source table')
  table.append(element('caption',styles.caption,'Original observations at cursor step'))
  const head=element('thead'),headRow=element('tr')
  for(const label of ['Run','Recorded step','Loss','Learning rate','Gradient norm','Δstep','Source']){const th=element('th',undefined,label);th.scope='col';headRow.append(th)}
  head.append(headRow);table.append(head);viewport.append(table)
  const members=identity.split(',').filter(Boolean).map((id,index)=>{
   const body=element('tbody');body.setAttribute('aria-label',`Original observations for ${id}`)
   const runLabel=()=>{const cell=element('th'),label=element('div',`${styles.sharedRun} tooltip-series`),dot=element('i','tooltip-dot');cell.scope='row';dot.style.background=`var(${colorTokens[slots[id]??index]})`;label.append(dot,element('strong',undefined,id));cell.append(label);return cell}
   const rows=Array.from({length:2},(_,rowIndex)=>{
    const row=element('tr'),step=element('td'),values=METRICS.map(metric=>{const cell=element('td');cell.dataset.sourceMetric=metric;return cell}),distance=element('td'),source=element('td'),pin=element('button','text-link','Pin row')
    distance.dataset.sourceDistance='true';pin.type='button';pin.onclick=()=>{const current=accepted.current,cursor=cursorForView(store.getSnapshot(),current.view),raw=cursor.hover[id]?.[rowIndex],run=current.runs[id]?.run;if(raw&&run)onPin({id,revision:run.revision,row:raw})}
    source.append(pin);row.append(runLabel(),step,...values,distance,source);body.append(row)
    return {row,step,values,distance,pin,key:'',delta:NaN}
   })
   const empty=element('tr'),placeholder=element('td',styles.placeholder);placeholder.colSpan=6;empty.append(runLabel(),placeholder)
   const group=element('tr'),groupCell=element('td'),count=element('span'),link=element('a','text-link','Inspect full source group');groupCell.colSpan=7
   link.onclick=event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();navigate(link.getAttribute('href')??`/runs/${id}`)}
   groupCell.append(count,document.createTextNode(' '),link);group.append(groupCell);body.append(empty,group);table.append(body)
   return {id,rows,empty,placeholder,group,count,link,emptyActive:null as boolean|null}
  })
  const note=element('p',styles.sharedNote,'Scroll for more rows and metrics. Groups show the first 2 observations.')
  root.replaceChildren(title,viewport,note)
  let cancelPaint:(()=>void)|undefined
  const update=()=>{
   cancelPaint?.();cancelPaint=undefined
   const current=accepted.current,cursor=cursorForView(store.getSnapshot(),current.view),active=cursor.hoverStep!==null
   text(title,active?`Cursor step ${formatStep(cursor.hoverStep!)} · All metrics`:'Original source values · All metrics')
   for(const member of members){
    const rows=active?cursor.hover[member.id]??[]:[]
    if(!rows.length&&member.emptyActive===active)continue
    member.emptyActive=rows.length?null:active
    member.rows.forEach((nodes,index)=>{
     const row=rows[index];hidden(nodes.row,!row);if(!row)return
     const key=`${member.id}:${current.runs[member.id].run.revision}:${row.sourceIndex}`,changed=nodes.key!==key,delta=Math.abs(row.step-cursor.hoverStep!)
     if(changed){
      nodes.key=key;text(nodes.step,formatStep(row.step));text(nodes.pin,`Pin #${row.sourceIndex}`);attribute(nodes.pin,'aria-label',`Pin row ${row.sourceIndex}`)
      METRICS.forEach((metric,index)=>{text(nodes.values[index],formatValue(row[metric],metric==='lr'));attribute(nodes.values[index],'title',`Exact source value ${exact(row[metric])}`)})
     }
     if(changed||delta!==nodes.delta){nodes.delta=delta;text(nodes.distance,formatStep(delta))}
    })
    hidden(member.empty,rows.length>0);text(member.placeholder,active?'No recorded value at this cursor location.':'Point at any chart to inspect the original row and all three metrics.')
    hidden(member.group,rows.length<=2)
    if(rows.length>2){text(member.count,`${rows.length} returned observations. First 2 shown.`);attribute(member.link,'href',`/runs/${member.id}?step=${rows[0].step}&revision=${encodeURIComponent(current.runs[member.id].run.revision)}`)}
   }
   toggle(root,'chart-hover-value',active);attribute(root,'data-hover-seq',active?String(cursor.hoverSeq):null)
   cancelPaint=recordHoverPaint(current.view?.viewSeq??0,cursor.hoverSeq,cursor.hoverStep)
  }
  const unarm=store.beforePublish(next=>{const view=accepted.current.view,visible=cursorForView(next,view);beginHoverPaint(view?.viewSeq??0,visible.hoverSeq,visible.hoverStep)})
  refresh.current=update;update();const unsubscribe=store.subscribe(update)
  return()=>{if(refresh.current===update)refresh.current=null;unarm();unsubscribe();cancelPaint?.();root.replaceChildren()}
 },[store,identity,comparison,slots,colorTokens,onPin,navigate])
 return <section className={`${styles.rail} ${styles.sharedRail}`} aria-label={comparison?'Compared source values':'Original source values'} data-testid={comparison?'comparison-cursor-readout':'cursor-readout-loss'} data-reserved="true" data-members={ids.length}><div className={styles.content} ref={host}/></section>
})
