import {afterEach,expect,it,vi} from 'vitest'
import * as paint from './use-hover-paint'
// This unit isolates callback ordering. Real visibility/clipping/occlusion is
// exercised by visible-hover.spec.ts in Chromium, not by a fake DOM rectangle.
vi.mock('./hover-visibility',()=>({inspectHoverVisibility:vi.fn(()=>({visible:true,cells:[]}))}))
afterEach(()=>{vi.unstubAllGlobals();performance.clearMarks('soup:hover-frame');performance.clearMarks('soup:hover-dom-commit')})
it('pre-arms the frame opportunity but acknowledges only two callbacks after committed source DOM',()=>{
 const api=paint as typeof paint&{beginHoverPaint?:(viewSeq:number,hoverSeq:number,step:number|null)=>void}
 expect(api.beginHoverPaint).toBeTypeOf('function');if(!api.beginHoverPaint)return
 let serial=0;const callbacks=new Map<number,FrameRequestCallback>()
 vi.stubGlobal('requestAnimationFrame',(callback:FrameRequestCallback)=>{callbacks.set(++serial,callback);return serial})
 vi.stubGlobal('cancelAnimationFrame',(id:number)=>callbacks.delete(id))
 vi.stubGlobal('window',{__soupEvidence:{workspaceEpoch:71,viewSeq:1,acceptedHoverSeq:2,hoverTiming:{hoverSeq:2,viewSeq:1,requestStartedAt:0,acceptedAt:1}}})
 vi.stubGlobal('document',{querySelectorAll:()=>[{getClientRects:()=>[{}]}]})
 const advance=()=>{const [id,fn]=callbacks.entries().next().value!;callbacks.delete(id);fn(performance.now())}
 api.beginHoverPaint(1,2,50)
 expect(callbacks.size).toBe(1);expect(performance.getEntriesByName('soup:hover-dom-commit')).toHaveLength(0)
 paint.recordHoverPaint(1,2,50)
 expect(callbacks.size).toBe(1)
 advance();expect(performance.getEntriesByName('soup:hover-frame')).toHaveLength(0)
 advance();expect(performance.getEntriesByName('soup:hover-frame')).toHaveLength(1)
})
