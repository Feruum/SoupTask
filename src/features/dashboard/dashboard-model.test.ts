import { describe, expect, it } from 'vitest'
import type { RunManifestEntry } from '@/data/types'
import { experimentGroups, finiteTileRows } from './dashboard-model'

describe('source-derived dashboard view', () => {
  it('groups each actual run once by model and method, with stable categorical colors', () => {
    const rows = [
      { id: '006', model: 'Qwen2.5-3B', method: 'SFT' },
      { id: '001', model: 'Qwen2.5-1.5B', method: 'DPO' },
      { id: '005', model: 'Qwen2.5-3B', method: 'DPO' },
      { id: '004', model: 'Qwen2.5-1.5B', method: 'SFT' },
    ] as RunManifestEntry[]
    const groups = experimentGroups(rows)
    expect(groups).toHaveLength(2)
    expect(groups.flatMap(group => group.methods.flatMap(method => method.runs.map(run => run.id))).sort()).toEqual(['001', '004', '005', '006'])
    expect(groups.find(group => group.model === 'Qwen2.5-3B')?.methods.find(group => group.method === 'DPO')?.runs[0].id).toBe('005')
    expect(experimentGroups([...rows].reverse()).map(group => [group.model, group.methods.map(method => [method.method, method.color])])).toEqual(groups.map(group => [group.model, group.methods.map(method => [method.method, method.color])]))
    expect(rows[0].id).toBe('006')
  })

  it('encodes finite counts monotonically, with explicit empty data and no invented minimum count', () => {
    const counts = [0, 1, 100, 8192, 1_000_000]
    const rows = counts.map(count => finiteTileRows(count, 1_000_000))
    expect(rows[0]).toBe(0)
    expect(rows[1]).toBeGreaterThan(0)
    expect(rows.at(-1)).toBe(10)
    expect([...rows].sort((a, b) => a - b)).toEqual(rows)
    expect(finiteTileRows(0, 0)).toBe(0)
    expect(finiteTileRows(10, 5)).toBe(10)
  })
})
