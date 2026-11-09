import { useMemo } from 'react'
import type { RunManifestEntry } from '@/data/types'
import { experimentGroups } from './dashboard-model'
import { GROUP_COLORS } from './ExperimentMap'

export function ExperimentGroups({ runs, selected, onSelect }: { runs: readonly RunManifestEntry[]; selected: string; onSelect: (id: string) => void }) {
  const groups = useMemo(() => experimentGroups(runs), [runs])
  return <section className="experiment-groups-panel" aria-labelledby="experiment-groups-title">
    <div className="dashboard-panel-title"><h2 id="experiment-groups-title">Experiment groups</h2></div>
    <p className="group-workspace">qwen-kazakh <span>model → method → run</span></p>
    <div className="group-tree">{groups.map(group => <div className="group-model-row" key={group.model}>
      <span className="group-model-label">{group.model}</span>
      <div className="group-methods">{group.methods.map(method => {
        const representative = method.runs.find(run => run.id === selected) ?? method.runs[0]
        return <div className="group-branch" key={method.method}>
          <span className="group-method-label" style={{ color: `var(${GROUP_COLORS[method.color]})` }}>{method.method}</span>
          <button type="button" className="group-leaf" aria-label={`Select ${representative.name} from ${group.model} ${method.method}; ${representative.id.slice(-3)} +${method.runs.length - 1}`} aria-pressed={representative.id === selected} onClick={() => onSelect(representative.id)}><span className="group-node-dot" style={{ background: `var(${GROUP_COLORS[method.color]})` }} aria-hidden="true" /><span>{representative.id.slice(-3)}</span><small>+{method.runs.length - 1}</small></button>
        </div>
      })}</div>
    </div>)}</div>
    <p className="group-tree-note">Each leaf opens a run. +N counts the other runs in that group.</p>
  </section>
}
