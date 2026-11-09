import type { RunDescriptor } from '@/data/types'
import { useWorkspace } from './use-workspace'
/** Compatibility import; all application consumers use bounded workspace views. */
export function useRunData(run: RunDescriptor) { return useWorkspace([run.id]) }
