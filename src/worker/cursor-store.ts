import { useSyncExternalStore } from 'react'
import type { SourceRow } from '@/data/types'
import type { WorkspaceView } from './protocol'

export interface CursorState {
  view: WorkspaceView | null
  hoverStep: number | null
  hoverSeq: number
  hover: Record<string, SourceRow[]>
}
const EMPTY: CursorState = { view: null, hoverStep: null, hoverSeq: 0, hover: {} }
export function cursorForView(cursor: CursorState, view: WorkspaceView | null): CursorState {
  return view !== null && cursor.view === view ? cursor : EMPTY
}

/** Session-local, latest-only source cursor; raw arrays never enter this store. */
export function createCursorStore() {
  let snapshot = EMPTY
  let beforePublish:((next:CursorState)=>void)|null=null
  const listeners = new Set<() => void>()
  const visibilityListeners=new Set<()=>void>()
  let pointerActive=false
  const publish = (next: CursorState) => {
    if (snapshot === next) return
    snapshot = next
    beforePublish?.(next)
    for (const listener of listeners) listener()
  }
  return {
    getPointerActive:()=>pointerActive,
    setPointerActive:(next:boolean)=>{if(pointerActive===next)return;pointerActive=next;for(const listener of visibilityListeners)listener()},
    subscribeVisibility:(listener:()=>void)=>{visibilityListeners.add(listener);return()=>{visibilityListeners.delete(listener)}},
    beforePublish: (listener:(next:CursorState)=>void) => {beforePublish=listener;return()=>{if(beforePublish===listener)beforePublish=null}},
    getSnapshot: () => snapshot,
    getServerSnapshot: () => EMPTY,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    publish,
    clear: () => {pointerActive=false;publish(EMPTY)}
  }
}
export function useCursorState(store: ReturnType<typeof createCursorStore>): CursorState {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)
}
