import { ResponsiveDisclosure } from './ResponsiveDisclosure';
import { assignSeriesSlots } from '@/charts/series-slots';
import { SoupArt } from '@/features/shared/SoupArt';
/* oxlint-disable react/set-state-in-effect -- Numeric draft controls follow the accepted external Worker range. */
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/arc/button/button';
import { Input } from '@/components/arc/input/input';
import { MetricPlot } from '@/charts/MetricPlot';
import { alignedRenderData as align } from '@/charts/comparison-data';
import type { PlotSeriesConfig } from '@/charts/MetricPlot';
import type { Metric, MetricRenderView, QualityCounts, SourceRow } from '@/data/types';
import { formatStep, formatValue } from '@/data/format';
import { useWorkspace } from '@/worker/use-workspace';
export type Workspace = ReturnType<typeof useWorkspace>;
export const METRICS: Metric[] = ['loss', 'lr', 'grad_norm'];
export const NAMES: Record<Metric, string> = {
  loss: 'Loss',
  lr: 'Learning rate',
  grad_norm: 'Gradient norm'
};
export const COLORS = ['--chart-line', '--chart-teal', '--chart-ochre', '--chart-purple'];
const exactNumber = (value: number) => Object.is(value, -0) ? '-0' : String(value);
export function issueCount(q: QualityCounts) {
  return q.nan + q.posInf + q.negInf + q.conflictGroups + q.invalidX + q.outOfOrder + q.gaps + q.duplicateRows;
}
export function Heading({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) {
  return <div className="page-heading"><div><h1 id="page-title" tabIndex={-1}>{title}</h1><p>{subtitle}</p></div><span className="snapshot-badge">Demo snapshot · Smoothing off</span></div>;
}
export function WorkspaceStatus({
  workspace
}: {
  workspace: Workspace;
}) {
  const {
    state
  } = workspace;
  return <>{state.kind === 'loading' && <section className="loading-layout" aria-label="Loading measurements"><div className="loading-brand"><SoupArt kind="piala" animateSteam /><output>Preparing source measurements in a Worker…</output></div><div className="loading-chart" /></section>}{(state.kind === 'error' || state.kind === 'stale' || Boolean(state.message)) && <div className="quality-notice" role="alert"><span>{state.message ?? 'Measurements could not be loaded.'}</span><Button onClick={workspace.retry}>Retry</Button></div>}{state.kind === 'refreshing' && <output className="refresh-status">Updating view… Previous accepted range remains shown.</output>}</>;
}
export function RangeControls({
  workspace
}: {
  workspace: Workspace;
}) {
  const r = workspace.state.range;
  const rangeMin = r?.min, rangeMax = r?.max;
  const [from, setFrom] = useState(''),
    [to, setTo] = useState(''),
    [error, setError] = useState('');
  useEffect(() => {
    if (rangeMin !== undefined && rangeMax !== undefined) {
      setFrom(String(rangeMin));
      setTo(String(rangeMax));
    }
  }, [rangeMin, rangeMax]);
  if (!r) return null;
  return <ResponsiveDisclosure label="Adjust chart range" meta={`Step ${formatStep(r.min)} – ${formatStep(r.max)}`} className="range-disclosure"><div className="range-toolbar"><form onSubmit={e => {
      e.preventDefault();
      const min = Number(from),
        max = Number(to);
      if (!from.trim() || !to.trim() || !Number.isFinite(min) || !Number.isFinite(max) || max < min || !Number.isFinite(max - min)) {
        setError('Enter a finite range with From no greater than To.');
        return;
      }
      setError('');
      workspace.setRange({
        min,
        max
      });
    }}><Input label="From step" type="number" required step="any" value={from} onChange={e => setFrom(e.target.value)} /><Input label="To step" type="number" required step="any" value={to} onChange={e => setTo(e.target.value)} /><Button type="submit" variant="secondary">Apply range</Button></form><div className="chart-actions"><Button variant="secondary" onClick={() => workspace.zoom(.5)}>Zoom in</Button><Button variant="secondary" onClick={() => workspace.zoom(2)}>Zoom out</Button><Button variant="ghost" onClick={workspace.reset}>Reset view</Button></div>{error && <p role="alert">{error}</p>}<p data-testid="visible-range">Step {formatStep(r.min)} to {formatStep(r.max)}</p></div></ResponsiveDisclosure>;
}
function markersFor(view: MetricRenderView) {
  const counts = new Map<number, number>();
  for (const p of view.points) counts.set(p.segment, (counts.get(p.segment) ?? 0) + 1);
  const endpoints = new Set<number>();
  for (let i = 0; i < view.points.length; i++) {
    if (i === 0 || view.points[i - 1].segment !== view.points[i].segment) endpoints.add(i);
    if (i === view.points.length - 1 || view.points[i + 1].segment !== view.points[i].segment) endpoints.add(i);
  }
  const min = view.points.findIndex(p => p.value === view.min),
    max = view.points.findIndex(p => p.value === view.max);
  return [...view.conflicts, ...view.points.filter((p, i) => view.mode === 'disconnected-extrema' || counts.get(p.segment) === 1 || endpoints.has(i) || i === min || i === max)];
}
export function Charts({
  workspace,
  theme,
  ids,
  only = 'all',
  compact = false
}: {
  workspace: Workspace;
  theme: 'dark' | 'light';
  ids: string[];
  only?: Metric | 'all';
  compact?: boolean;
}) {
  const view = workspace.state.view,
    identity = ids.join(',');
  const [slotState, setSlotState] = useState(() => ({
    identity,
    slots: assignSeriesSlots({}, ids)
  }));
  let slots = slotState.slots;
  if (slotState.identity !== identity) {
    slots = assignSeriesSlots(slotState.slots, ids);
    setSlotState({
      identity,
      slots
    });
  }
  const [cursorActive, setCursorActive] = useState(false);
  const [pinned, setPinned] = useState<{ id: string; revision: string; row: SourceRow } | null>(null);
  const [focused, setFocused] = useState<string | null>(null),
    [hovered, setHovered] = useState<string | null>(null);
  const activeId = ids.includes(hovered ?? '') ? hovered : ids.includes(focused ?? '') ? focused : null;
  const domainValues = Object.values(workspace.state.runs).flatMap(r => r.domain ? [r.domain] : []);
  const domain = domainValues.length ? {
    min: Math.min(...domainValues.map(d => d.min)),
    max: Math.max(...domainValues.map(d => d.max))
  } : undefined;
  const items = useMemo(() => {
    const ids = identity.split(',');
    return METRICS.filter(m => (only === 'all' || m === only) && (!compact || m === 'loss')).map(metric => {
      const values = ids.map(id => view?.runs[id]?.[metric]).filter((v): v is MetricRenderView => Boolean(v));
      const series: PlotSeriesConfig[] = values.map((v, i) => ({
        label: ids[i],
        colorToken: COLORS[slots[ids[i]] ?? i],
        gaps: v.breaks,
        markers: markersFor(v),
        disconnected: v.mode === 'disconnected-extrema'
      }));
      return {
        metric,
        values,
        series,
        data: align(values)
      };
    });
  }, [view, identity, only, compact, slots]);
  if (!view) return null;
  return <div className={compact ? 'preview-charts' : 'metric-grid'} data-view-ready={workspace.state.kind === 'ready'}>{items.map(({
      metric,
      values,
      series,
      data
    }) => {
      const cursorPoints = cursorActive ? series.flatMap(s => {
        const row = workspace.state.hover[s.label]?.[0];
        return row && Number.isFinite(row[metric]) ? [{
          runId: s.label,
          step: row.step,
          value: row[metric]
        }] : [];
      }) : [];
      return <section key={metric} className={`chart-panel metric-${metric}`} data-run-ids={ids.join(',')} data-view-seq={view.viewSeq}><div className="panel-heading"><div><h2>{NAMES[metric]}</h2><p>Recorded step · Linear scale · Original values</p></div><span className="snapshot-badge">{values.reduce((sum, v) => sum + v.representedCount, 0)} displayed</span></div><figure><MetricPlot data={data} series={series} cursorPoints={cursorPoints} theme={theme} range={view.range} domain={domain} focusedRun={activeId} scientific={metric === 'lr'} height={compact ? 220 : metric === 'loss' ? 340 : 240} testId={ids.length > 1 ? `comparison-${metric === 'grad_norm' ? 'grad' : metric}` : `${metric === 'grad_norm' ? 'grad' : metric}-chart`} onWidth={w => workspace.setMetricWidth(metric, w)} onRange={workspace.setRange} onCursor={step => {
            setCursorActive(step !== null);
            if (step !== null) workspace.hover(step);
          }} /><figcaption><div className="interactive-legend">{series.map((s, i) => <span className="legend-control" key={s.label}><button type="button" aria-label={`Highlight ${s.label}`} aria-pressed={focused === s.label} onPointerEnter={() => setHovered(s.label)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(s.label)} onBlur={() => setHovered(null)} onClick={() => {
                  setHovered(null);
                  setFocused(focused === s.label ? null : s.label);
                }} title="Focus this series. Other source series stay visible, dimmed."><i style={{
                    background: `var(${s.colorToken})`
                  }} />{s.label}</button><small>{values[i].mode === 'disconnected-extrema' ? 'Disconnected extrema' : `${formatValue(values[i].min, metric === 'lr')} – ${formatValue(values[i].max, metric === 'lr')}`}</small></span>)}</div>{activeId && <p>Focused: {activeId}. Other series and their source counts remain present.</p>}{values.every(v => !v.points.length && !v.conflicts.length) && <strong>No finite observations in this window.</strong>}<p className="chart-pointer-help">Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range</p><p className="chart-touch-help">Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll.</p>{workspace.state.hoverStep !== null && <div className="chart-hover-value">Cursor step {formatStep(workspace.state.hoverStep)}{ids.map((id, index) => <div className="tooltip-series" key={id}><i className="tooltip-dot" style={{
                  background: `var(${COLORS[slots[id] ?? index]})`
                }} /><strong>{id}</strong>{(workspace.state.hover[id] ?? []).length ? (workspace.state.hover[id] ?? []).map(row => <span key={row.sourceIndex} title={`Exact source value ${exactNumber(row[metric])}`}>step {formatStep(row.step)} · {NAMES[metric]} {formatValue(row[metric], metric === 'lr')} · Δstep {formatStep(Math.abs(row.step - (workspace.state.hoverStep ?? row.step)))} <button type="button" className="text-link" onClick={() => setPinned({ id, revision: workspace.state.runs[id].run.revision, row })}>Pin row {row.sourceIndex}</button></span>) : <span>No recorded value at this location</span>}</div>)}</div>}</figcaption></figure></section>;
    })}{pinned && ids.includes(pinned.id) && workspace.state.runs[pinned.id]?.run.revision === pinned.revision && <section className="source-panel pinned-source" style={{ gridColumn: '1 / -1' }} aria-label="Pinned source row"><div className="panel-heading"><div><h2>Pinned source row</h2><p>{pinned.id} · sourceIndex {pinned.row.sourceIndex} · recorded step {exactNumber(pinned.row.step)}</p></div><Button variant="ghost" onClick={() => setPinned(null)}>Unpin row</Button></div><dl className="inspected-values">{METRICS.map(metric => <div key={metric}><dt>Raw {NAMES[metric].toLowerCase()}</dt><dd data-testid={`pinned-${metric}`}>{exactNumber(pinned.row[metric])}</dd></div>)}</dl><Link className="text-link" to={`/runs/${pinned.id}?sourceIndex=${pinned.row.sourceIndex}&revision=${encodeURIComponent(pinned.revision)}`}>Open exact source row →</Link><p className="small-note">Revision {pinned.revision}. The pinned source row stays fixed as the cursor moves.</p></section>}</div>;
}
export function SourceInspector({
  workspace,
  runId
}: {
  workspace: Workspace;
  runId: string;
}) {
  const [parameters] = useSearchParams();
  const [query, setQuery] = useState(parameters.get('sourceIndex') ?? parameters.get('step') ?? '0'),
    [mode, setMode] = useState<'step' | 'sourceIndex'>(parameters.has('sourceIndex') ? 'sourceIndex' : 'step');
  const page = workspace.state.rowsRunId === runId ? workspace.state.rowsPage : null;
  return <section className="source-panel" id="source"><div className="panel-heading"><div><h2>Source inspector</h2><p>Exact measurements in original arrival order. No interpolation.</p></div></div><div className="inspector-controls"><select aria-label="Inspect by" value={mode} onChange={e => setMode(e.target.value as 'step' | 'sourceIndex')}><option value="step">Recorded step</option><option value="sourceIndex">Source index</option></select><form onSubmit={e => {
        e.preventDefault();
        workspace.inspect(runId, {
          [mode]: Number(query)
        });
      }}><Input label={mode === 'step' ? 'Source step' : 'Source index'} type="number" required step={mode === 'sourceIndex' ? 1 : 'any'} value={query} onChange={e => setQuery(e.target.value)} /><Button type="submit">{mode === 'step' ? 'Inspect step' : 'Inspect source'}</Button></form></div>{workspace.state.inspection.length > 0 && <div className="inspection-result" aria-live="polite"><p className="small-note">{workspace.state.inspectionTotal} original observation(s) match this query.</p>{workspace.state.inspection.map(row => <dl className="inspected-values" key={row.sourceIndex}><div><dt>Source index</dt><dd>{row.sourceIndex}</dd></div><div><dt>Recorded step</dt><dd>{formatStep(row.step)}</dd></div>{METRICS.map(m => <div key={m}><dt>Raw {NAMES[m].toLowerCase()}</dt><dd><span data-testid={`inspected-${m}`}>{formatValue(row[m], m === 'lr')}</span><small className="exact-value">{exactNumber(row[m])}</small></dd></div>)}</dl>)}{mode === 'step' && workspace.state.inspectionTotal > 50 && <div className="rows-pagination"><Button variant="secondary" disabled={workspace.state.inspectionPage === 0} onClick={() => workspace.inspect(runId, {
          step: Number(query),
          page: workspace.state.inspectionPage - 1
        })}>Previous group rows</Button><span>Group page {workspace.state.inspectionPage + 1}</span><Button variant="secondary" disabled={(workspace.state.inspectionPage + 1) * 50 >= workspace.state.inspectionTotal} onClick={() => workspace.inspect(runId, {
          step: Number(query),
          page: workspace.state.inspectionPage + 1
        })}>Next group rows</Button></div>}</div>}<details className="source-details" onToggle={e => {
      if (e.currentTarget.open) workspace.loadRows(runId, page ?? 0);
    }}><summary>Browse source rows</summary><div className="table-scroll"><table><caption>Original observations · 50 rows per page</caption><thead><tr><th>Source index</th><th>Step</th>{METRICS.map(m => <th key={m}>{NAMES[m]}</th>)}</tr></thead><tbody>{workspace.state.rows.map(row => <tr key={row.sourceIndex}><th>{row.sourceIndex}</th><td>{formatStep(row.step)}</td>{METRICS.map(m => <td key={m}>{formatValue(row[m], m === 'lr')}</td>)}</tr>)}</tbody></table></div><div className="rows-pagination"><Button disabled={workspace.state.rowsPending || page === null || page === 0} variant="secondary" onClick={() => {

          workspace.loadRows(runId, (page ?? 0) - 1);
        }}>Previous rows</Button><span>{page === null ? 'No source page loaded' : `Page ${page + 1}`}{workspace.state.rowsPending ? ' · Loading requested page…' : ''}</span><Button variant="secondary" disabled={workspace.state.rowsPending || page === null || workspace.state.rows.length < 50} onClick={() => {

          workspace.loadRows(runId, (page ?? 0) + 1);
        }}>Next rows</Button></div></details></section>;
}
export function RunLink({
  id
}: {
  id: string;
}) {
  return <Link className="text-link" to={`/runs/${id}`}>{id}</Link>;
}
