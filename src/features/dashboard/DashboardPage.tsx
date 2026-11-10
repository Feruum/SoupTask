import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import { Link, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import type { ShellContext } from '@/app/App'
import type { Metric, RunManifestEntry } from '@/data/types'
import { useCatalog } from '@/features/shared/Catalog'
import { Charts, METRICS, NAMES, RangeControls, WorkspaceStatus, issueCount } from '@/features/shared/Workspace'
import { useCompactLayout } from '@/features/shared/ResponsiveDisclosure'
import { formatStep, formatTimestamp, formatValue } from '@/data/format'
import { useWorkspace } from '@/worker/use-workspace'
import { Input } from '@/components/arc/input/input'
import { Button } from '@/components/arc/button/button'
import { ExperimentMap } from './ExperimentMap'
import { ExperimentGroups } from './ExperimentGroups'
import { RunHistory } from './RunHistory'
import { RunNavigator } from './RunNavigator'
import './dashboard.css'

type DashboardView = 'monitor' | 'map' | 'groups'
const VIEWS: { id: DashboardView; label: string }[] = [
  { id: 'monitor', label: 'Monitor' },
  { id: 'map', label: 'Experiment map' },
  { id: 'groups', label: 'Groups' },
]

function runSourceLink(run: RunManifestEntry, metric: Metric) {
  const step = run.summaries[metric].maxStep
  return step === null ? `/runs/${run.id}` : `/runs/${run.id}?step=${step}&revision=${encodeURIComponent(run.revision)}`
}

function RunActions({ run, metric }: { run: RunManifestEntry; metric: Metric }) {
  return <div className="calm-run-actions">
    <Link to={`/runs/${run.id}`}>Open run <ArrowUpRight size={14} aria-hidden="true" /></Link>
    <Link to={`/compare?runs=${run.id}`}>Compare</Link>
    <Link className="calm-exploration-issues" to={`/data-quality?run=${run.id}&metric=${metric}`}>Inspect issues</Link>
  </div>
}

function SelectionSummary({ run, metric, monitorHref }: { run: RunManifestEntry; metric: Metric; monitorHref: string }) {
  const quality = run.quality.metrics[metric]
  return <section className="calm-selection-summary" data-testid="selected-experiment" aria-labelledby="selected-run-title">
    <span className={`status-pill status-${run.status.toLowerCase()}`}>{run.status}</span>
    <h2 id="selected-run-title" tabIndex={-1}>{run.name}</h2>
    <p>{run.model} · {run.method}</p>
    <p className="calm-snapshot">Demo snapshot · Not live · <time dateTime={run.sourceUpdatedAt}>{formatTimestamp(run.sourceUpdatedAt)}</time></p>
    <dl><div><dt>Peak {NAMES[metric].toLowerCase()}</dt><dd>{formatValue(run.summaries[metric].max, metric === 'lr')}</dd></div><div><dt>Raw rows</dt><dd>{formatStep(run.rowCount)}</dd></div></dl>
    <p data-testid="selected-metric">{NAMES[metric]} · {quality.invalidCount} invalid · {quality.conflicts} conflicts · {quality.gaps} gaps</p>
    <Link className="calm-return-monitor" to={monitorHref}>Monitor selected run <ArrowUpRight size={16} aria-hidden="true" /></Link>
    <RunActions run={run} metric={metric} />
  </section>
}

export function DashboardPage() {
  const runs = useCatalog()
  const compact = useCompactLayout(1000)
  const { theme } = useOutletContext<ShellContext>()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const requestedView = params.get('view')
  const view: DashboardView = requestedView === 'map' || requestedView === 'groups' ? requestedView : 'monitor'
  const requestedMetric = params.get('metric')
  const selectedMetric: Metric = requestedMetric === 'lr' || requestedMetric === 'grad_norm' ? requestedMetric : 'loss'
  const [navigatorOpen, setNavigatorOpen] = useState(false)
  const settingsRef = useRef<HTMLDetailsElement>(null)
  const run = runs.find(item => item.id === params.get('run')) ?? runs.find(item => item.id === 'kazakh-sft-005') ?? runs[0]
  const workspace = useWorkspace([run.id])
  const summary = run.summaries[selectedMetric]
  const quality = run.quality.metrics[selectedMetric]
  const problemCount = runs.filter(item => issueCount(item.quality) > 0).length
  const latest = summary.latestStatus === 'finite' ? formatValue(summary.latest, selectedMetric === 'lr')
    : summary.latestStatus === 'invalid' ? 'Invalid' : summary.latestStatus === 'conflict' ? 'Conflict' : 'Unavailable'
  const points = workspace.state.view?.runs[run.id]?.[selectedMetric].points.length

  useEffect(() => {
    const settings = settingsRef.current
    if (!settings) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !settings.open) return
      event.preventDefault()
      settings.open = false
      settings.querySelector('summary')?.focus()
    }
    settings.addEventListener('keydown', closeOnEscape)
    return () => settings.removeEventListener('keydown', closeOnEscape)
  }, [view])

  function viewHref(next: DashboardView) {
    const search = new URLSearchParams(params)
    if (next === 'monitor') search.delete('view')
    else search.set('view', next)
    return `/dashboard${search.size ? `?${search}` : ''}`
  }

  function selectRun(id: string, metric = selectedMetric) {
    setParams(current => {
      const next = new URLSearchParams(current)
      next.set('run', id)
      next.set('metric', metric)
      return next
    }, { replace: true, preventScrollReset: true })
  }

  function selectFromList(id: string) {
    selectRun(id)
    if (compact) {
      setNavigatorOpen(false)
      requestAnimationFrame(() => document.getElementById('selected-run-title')?.focus({ preventScroll: true }))
    }
  }

  return <div className="calm-dashboard">
    <h1 id="page-title" tabIndex={-1}>Training overview</h1>
    <nav className="calm-view-nav" aria-label="Dashboard views">{VIEWS.map(item => <Link key={item.id} to={viewHref(item.id)} aria-current={view === item.id ? 'page' : undefined} preventScrollReset>{item.label}</Link>)}</nav>

    {view === 'monitor' ? <div className="calm-monitor-layout">
      <RunNavigator runs={runs} selected={run.id} compact={compact} open={navigatorOpen} onToggle={setNavigatorOpen} onSelect={selectFromList} />
      <section className="calm-monitor-detail" data-testid="selected-experiment" aria-labelledby="selected-run-title">
        <div className="calm-selected-header"><div><div className="calm-selected-title"><h2 id="selected-run-title" tabIndex={-1}>{run.name}</h2><span className={`status-pill status-${run.status.toLowerCase()}`}>{run.status}</span></div><p>{run.model} · {run.method}</p><p className="calm-snapshot">Demo snapshot · Not live · <time dateTime={run.sourceUpdatedAt}>{formatTimestamp(run.sourceUpdatedAt)}</time></p></div><RunActions run={run} metric={selectedMetric} /></div>
        <dl className="calm-facts" aria-label="Whole-run summaries">
          <div><dt>Latest {NAMES[selectedMetric].toLowerCase()}</dt><dd>{latest}</dd></div>
          <div><dt>Peak {NAMES[selectedMetric].toLowerCase()}</dt><dd>{formatValue(summary.max, selectedMetric === 'lr')}</dd></div>
          <div><dt>Peak step</dt><dd>{summary.maxStep === null ? 'Unavailable' : formatStep(summary.maxStep)}</dd></div>
          <div><dt>Raw rows</dt><dd>{formatStep(run.rowCount)}</dd></div>
        </dl>

        <section className="calm-metric-section" aria-label={`${NAMES[selectedMetric]} chart`}>
          <div className="calm-chart-toolbar">
            <fieldset className="calm-metric-tabs"><legend className="sr-only">Dashboard metric</legend>{METRICS.map(metric => <button key={metric} type="button" aria-pressed={metric === selectedMetric} onClick={() => selectRun(run.id, metric)}>{NAMES[metric]}</button>)}</fieldset>
            <span className="calm-raw-label">Raw · Smoothing off</span>
            <details className="calm-settings" ref={settingsRef}><summary aria-label="Chart settings" title="Chart settings"><SlidersHorizontal size={18} aria-hidden="true" /></summary><div className="calm-settings-panel"><h3>Chart range</h3><RangeControls workspace={workspace} expanded /></div></details>
          </div>
          <WorkspaceStatus workspace={workspace} />
          <div className="calm-chart"><Charts workspace={workspace} ids={[run.id]} theme={theme} only={selectedMetric} /></div>
          <p className="calm-touch-help">Use Chart settings to adjust the range. Swipe vertically to scroll.</p>
          <div className="calm-chart-caption"><span>{points === undefined ? 'Loading original measurements' : `${formatStep(points)} render points · Source values unchanged`}</span><Link to={runSourceLink(run, selectedMetric)}>Inspect peak at source <ArrowUpRight size={13} aria-hidden="true" /></Link></div>
          <details className="calm-step-inspection"><summary>Inspect recorded step</summary><form onSubmit={event => {
            event.preventDefault()
            const step = Number(new FormData(event.currentTarget).get('step'))
            if (Number.isFinite(step)) navigate(`/runs/${run.id}?step=${step}&revision=${encodeURIComponent(run.revision)}#source`)
          }}><Input label="Recorded step" name="step" type="number" step="any" required /><Button type="submit" variant="secondary">Inspect step at source</Button></form></details>
        </section>

        <div className="calm-source-quality" data-has-findings={quality.invalidCount + quality.conflicts + quality.gaps > 0}><strong>Source quality</strong><p data-testid="selected-metric">{NAMES[selectedMetric]} · {quality.invalidCount} invalid · {quality.conflicts} conflicts · {quality.gaps} gaps</p><Link to={`/data-quality?run=${run.id}&metric=${selectedMetric}`}>Inspect issues <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
        {(run.quality.duplicateRows > 0 || run.quality.outOfOrder > 0 || run.quality.invalidX > 0) && <p className="calm-structural-note">Also recorded: {run.quality.duplicateRows} duplicate rows · {run.quality.outOfOrder} out of order · {run.quality.invalidX} invalid steps.</p>}
        <div className="calm-workspace-quality"><span>{problemCount} runs with findings</span><Link to="/data-quality">Review data quality <ArrowUpRight size={14} aria-hidden="true" /></Link></div>

        <details className="calm-more source-details"><summary>Run details and history</summary><dl className="calm-run-details"><div><dt>Scenario</dt><dd>{run.scenario}</dd></div><div><dt>Revision</dt><dd>{run.revision}</dd></div><div><dt>Metrics</dt><dd>{METRICS.length}</dd></div><div><dt>Source snapshot</dt><dd>{run.sourceUpdatedAt}</dd></div></dl><RunHistory /></details>
      </section>
    </div> : <div className={`calm-exploration-grid calm-view-${view}`}>
      <div className="calm-exploration-panel">{view === 'map' ? <ExperimentMap runs={runs} selected={run.id} metric={selectedMetric} onSelect={selectRun} /> : <ExperimentGroups runs={runs} selected={run.id} onSelect={id => selectRun(id)} />}</div>
      <SelectionSummary run={run} metric={selectedMetric} monitorHref={viewHref('monitor')} />
    </div>}
  </div>
}
