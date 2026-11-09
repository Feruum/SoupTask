import { useMemo, useState } from 'react'
import { Activity, AlertTriangle, ArrowLeftRight, ArrowUpRight, Layers } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import type { ShellContext } from '@/app/App'
import type { Metric, RunManifestEntry } from '@/data/types'
import { Button } from '@/components/arc/button/button'
import { useCatalog } from '@/features/shared/Catalog'
import { Charts, METRICS, NAMES, WorkspaceStatus, issueCount } from '@/features/shared/Workspace'
import { formatStep, formatValue } from '@/data/format'
import { useWorkspace } from '@/worker/use-workspace'
import { ExperimentMap } from './ExperimentMap'
import { ExperimentGroups } from './ExperimentGroups'
import { RunHistory } from './RunHistory'
import { ResponsiveDisclosure, useCompactLayout } from '@/features/shared/ResponsiveDisclosure'
import './dashboard.css'

function findingLabel(run: RunManifestEntry) {
  const quality = run.quality
  if (quality.conflictGroups) return 'Conflicting duplicate steps'
  if (quality.nan) return 'NaN observations'
  if (quality.posInf || quality.negInf) return 'Infinite metric values'
  if (quality.outOfOrder) return 'Out-of-order observations'
  if (quality.gaps) return 'Missing intervals'
  if (quality.duplicateRows) return 'Duplicate source rows'
  return 'Source findings'
}

export function DashboardPage() {
  const runs = useCatalog()
  const compact = useCompactLayout()
  const { theme } = useOutletContext<ShellContext>()
  const [selectedMetric, setSelectedMetric] = useState<Metric>('loss')
  const [selected, setSelected] = useState(() => runs.find(run => run.id === 'kazakh-sft-005')?.id ?? runs[0].id)
  const run = runs.find(item => item.id === selected) ?? runs[0]
  const workspace = useWorkspace([run.id])
  const problemRuns = useMemo(() => runs.filter(item => issueCount(item.quality) > 0), [runs])
  const findings = useMemo(() => {
    const kinds = new Set<string>()
    return problemRuns.filter(item => {
      const kind = findingLabel(item)
      if (item.id === run.id || kinds.has(kind)) return false
      kinds.add(kind)
      return true
    }).slice(0, 5)
  }, [problemRuns, run.id])
  const counts = useMemo(() => [
    ['NaN', runs.reduce((sum, item) => sum + item.quality.nan, 0)],
    ['Infinity', runs.reduce((sum, item) => sum + item.quality.posInf + item.quality.negInf, 0)],
    ['Conflicts', runs.reduce((sum, item) => sum + item.quality.conflictGroups, 0)],
    ['Duplicate rows', runs.reduce((sum, item) => sum + item.quality.duplicateRows, 0)],
    ['Known gaps', runs.reduce((sum, item) => sum + item.quality.gaps, 0)],
  ] as const, [runs])
  const summary = run.summaries[selectedMetric]
  const quality = run.quality.metrics[selectedMetric]
  const peakStep = run.summaries.loss.maxStep
  const peakLink = peakStep === null ? `/runs/${run.id}` : `/runs/${run.id}?step=${peakStep}&revision=${encodeURIComponent(run.revision)}`

  function selectRun(id: string, metric: Metric) {
    setSelected(id)
    setSelectedMetric(metric)
  }

  const groups = <ResponsiveDisclosure label="Experiment groups" className="group-disclosure"><ExperimentGroups runs={runs} selected={run.id} onSelect={id => setSelected(id)} /></ResponsiveDisclosure>
  const map = <ResponsiveDisclosure label="Experiment map" meta={`${runs.length} runs · 3 metrics`} className="experiment-map-disclosure"><ExperimentMap runs={runs} selected={run.id} metric={selectedMetric} onSelect={selectRun} /></ResponsiveDisclosure>
  const instrument = <div className="dashboard-instrument-column">
        {!compact && groups}
        <section className="dashboard-selected-run" data-testid="selected-experiment" aria-labelledby="selected-run-title">
          <div className="dashboard-panel-title"><h2 id="selected-run-title">{run.name}</h2><span className={`status-pill status-${run.status.toLowerCase()}`}>{run.status}</span></div>
          <p className="dashboard-selected-model">{run.model} · {run.method}</p>
          <dl className="dashboard-run-facts">
            <div><dt>Peak {NAMES[selectedMetric].toLowerCase()}</dt><dd className="dashboard-peak-value" title={String(summary.max)}>{formatValue(summary.max, selectedMetric === 'lr')}</dd></div>
            <div><dt>Raw rows</dt><dd>{formatStep(run.rowCount)}</dd></div>
            <div><dt>Peak step</dt><dd>{summary.maxStep === null ? 'Unavailable' : formatStep(summary.maxStep)}</dd></div>
            <div><dt>Metrics</dt><dd>{METRICS.length}</dd></div>
          </dl>
          <p data-testid="selected-metric" className="dashboard-selected-quality">{NAMES[selectedMetric]} · {quality.invalidCount} invalid · {quality.conflicts} conflicts · {quality.gaps} gaps</p>
          <div className="dashboard-selected-actions">
            <Link to={`/runs/${run.id}`}>Open run <ArrowUpRight size={14} aria-hidden="true" /></Link>
            <Link to={`/compare?runs=${run.id}`}>Compare</Link>
            <Link to={`/data-quality?run=${run.id}&metric=${selectedMetric}`}>Inspect issues <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
        </section>
        <section className="dashboard-preview" aria-labelledby="dashboard-loss-title">
          <div className="dashboard-panel-title"><h2 id="dashboard-loss-title">Raw loss</h2><span>Smoothing off</span></div>
          <WorkspaceStatus workspace={workspace} />
          <Charts workspace={workspace} ids={[run.id]} theme={theme} compact />
          <Link className="dashboard-source-link" to={peakLink}>Inspect peak at source <ArrowUpRight size={13} aria-hidden="true" /></Link>
        </section>
      {compact && groups}
</div>

  return <div className="dashboard-redesign">
    <div className="dashboard-heading">
      <div><h1 id="page-title" tabIndex={-1}>Workspace overview</h1>
        <p className="dashboard-inline-summary"><span>{runs.length} runs</span><span>{runs.filter(item => item.status === 'Running').length} running</span><span className="dashboard-attention">{problemRuns.length} need attention</span><span>{formatStep(runs.reduce((sum, item) => sum + item.rowCount, 0))} raw rows</span></p>
      </div>
      <fieldset className="dashboard-metric-tabs" aria-label="Dashboard metric">
        {METRICS.map(metric => <Button key={metric} size="sm" variant="secondary" aria-pressed={metric === selectedMetric} data-active={metric === selectedMetric} onClick={() => setSelectedMetric(metric)}>{NAMES[metric]}</Button>)}
      </fieldset>
    </div>

    {compact && <label className="dashboard-mobile-picker">Selected experiment<select value={run.id} onChange={event => setSelected(event.target.value)}>{runs.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>}
    <div className="dashboard-instrument-grid">
      {compact ? <>{instrument}{map}</> : <>{map}{instrument}</>}

      <ResponsiveDisclosure label="Snapshot findings" meta={`${problemRuns.length} runs with source findings`} className="findings-disclosure"><aside className="dashboard-findings-rail" aria-labelledby="dashboard-findings-title">
        <div className="dashboard-panel-title"><div><h2 id="dashboard-findings-title">Snapshot findings</h2><p>Source observations</p></div></div>
        <div className="dashboard-findings-list">
          <Link className="dashboard-finding-entry" to={peakLink}>
            <Activity size={19} className="finding-entry-icon" aria-hidden="true" />
            <div><h3>{run.name}</h3><p>Loss peak {formatValue(run.summaries.loss.max)}</p><small>{peakStep === null ? 'No finite loss peak' : `Recorded step ${formatStep(peakStep)}`}</small><span>Inspect source <ArrowUpRight size={13} aria-hidden="true" /></span></div>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          {findings.map(item => {
            const Icon = item.quality.conflictGroups ? Layers : item.quality.outOfOrder ? ArrowLeftRight : AlertTriangle
            return <Link key={item.id} className="dashboard-finding-entry" to={`/data-quality?run=${item.id}`}>
              <Icon size={19} className="finding-entry-icon" aria-hidden="true" />
              <div><h3>{item.name}</h3><p>{findingLabel(item)}</p><small>{issueCount(item.quality)} source findings</small><span>Inspect source <ArrowUpRight size={13} aria-hidden="true" /></span></div>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          })}
        </div>
        <div className="dashboard-rail-footer">
          <Link to="/data-quality">View data quality <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <details className="dashboard-finding-totals"><summary>Source finding totals</summary><dl>{counts.map(([label, count]) => <div key={label}><dt>{label}</dt><dd>{formatStep(count)}</dd></div>)}</dl></details>
        </div>
      </aside></ResponsiveDisclosure>
    </div>
    <ResponsiveDisclosure label="Run history" className="dashboard-history-disclosure"><RunHistory /></ResponsiveDisclosure>
  </div>
}
