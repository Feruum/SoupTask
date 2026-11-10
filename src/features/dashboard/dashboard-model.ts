import type { RunManifestEntry } from '@/data/types'

export interface ExperimentGroup {
  model: string
  methods: { method: string; runs: readonly RunManifestEntry[]; color: number }[]
}

export function experimentGroups(runs: readonly RunManifestEntry[]): ExperimentGroup[] {
  let color = 0
  return [...new Set(runs.map(run => run.model))].sort((a, b) => b.localeCompare(a, 'en')).map(model => ({
    model,
    methods: [...new Set(runs.filter(run => run.model === model).map(run => run.method))].sort((a, b) => b.localeCompare(a, 'en')).map(method => ({
      method,
      runs: runs.filter(run => run.model === model && run.method === method).toSorted((a, b) => a.id.localeCompare(b.id, 'en')),
      color: color++ % 4,
    })),
  }))
}

export function finiteTileRows(finiteCount: number, maxFiniteCount: number): number {
  if (!Number.isFinite(finiteCount) || finiteCount <= 0 || !Number.isFinite(maxFiniteCount) || maxFiniteCount <= 0) return 0
  return Math.min(10, Math.ceil(10 * Math.log10(finiteCount + 1) / Math.log10(maxFiniteCount + 1)))
}
