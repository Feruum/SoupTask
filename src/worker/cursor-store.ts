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
  const listeners = new Set<() => void>()
  const publish = (next: CursorState) => {
    if (snapshot === next) return
    snapshot = next
    for (const listener of listeners) listener()
  }
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => EMPTY,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    publish,
    clear: () => publish(EMPTY)
  }
}
export function useCursorState(store: ReturnType<typeof createCursorStore>): CursorState {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)
}
