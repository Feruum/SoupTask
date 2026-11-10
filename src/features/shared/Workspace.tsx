import {performanceMark} from '@/app/performance'
import readoutStyles from './cursor-readout.module.css';
import inspectorStyles from './source-inspector.module.css';
import { ResponsiveDisclosure } from './ResponsiveDisclosure';
import { assignSeriesSlots } from '@/charts/series-slots';
import { SoupArt } from '@/features/shared/SoupArt';
/* oxlint-disable react/set-state-in-effect -- Numeric draft controls follow the accepted external Worker range. */
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/arc/button/button';
import { Input } from '@/components/arc/input/input';
import { MetricPlot } from '@/charts/MetricPlot';
import { SourceCursorReadout } from '@/charts/SourceCursorReadout';
import { ComparisonCursorReadout } from '@/charts/ComparisonCursorReadout';
import { alignedRenderData as align } from '@/charts/comparison-data';
import type { PlotSeriesConfig } from '@/charts/MetricPlot';
import type { Metric, MetricRenderView, QualityCounts, SourceRow } from '@/data/types';
import { formatStep, formatValue } from '@/data/format';
import { useWorkspace } from '@/worker/use-workspace';
import { cursorForView, type CursorState } from '@/worker/cursor-store';
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
  workspace,
  expanded = false
}: {
  workspace: Workspace;
  expanded?: boolean;
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
  return <ResponsiveDisclosure label="Adjust chart range" meta={`Step ${formatStep(r.min)} – ${formatStep(r.max)}`} className="range-disclosure" mobileOpen={expanded ? true : undefined}><div className="range-toolbar"><form onSubmit={e => {
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
    }}><Input label="From step" type="number" required step="any" value={from} onChange={e => setFrom(e.target.value)} /><Input label="To step" type="number" required step="any" value={to} onChange={e => setTo(e.target.value)} /><Button pressMotion={false} type="submit" variant="secondary">Apply range</Button></form><div className="chart-actions"><Button pressMotion={false} variant="secondary" onClick={() => workspace.zoom(.5)}>Zoom in</Button><Button pressMotion={false} variant="secondary" onClick={() => workspace.zoom(2)}>Zoom out</Button><Button pressMotion={false} variant="ghost" onClick={workspace.reset}>Reset view</Button></div>{error && <p role="alert">{error}</p>}<p data-testid="visible-range">Step {formatStep(r.min)} to {formatStep(r.max)}</p></div></ResponsiveDisclosure>;
}
function markersFor(view: MetricRenderView) {
  const min=view.points.findIndex(p=>p.value===view.min),max=view.points.findIndex(p=>p.value===view.max);
  return [...view.conflicts,...view.points.filter((p,i)=>view.mode==='disconnected-extrema'||i===0||i===view.points.length-1||view.points[i-1].segment!==p.segment||view.points[i+1].segment!==p.segment||i===min||i===max)];
}
type SourcePin = {
  id: string;
  revision: string;
  row: SourceRow;
};
export function CursorReadout({
  workspace,
  cursor,
  ids,
  metric,
  slots,
  onPin
}: {
  workspace: Workspace;
  cursor: CursorState;
  ids: string[];
  metric: Metric;
  slots: Record<string, number>;
  onPin: (source: SourcePin) => void;
}) {
  const visible = cursorForView(cursor, workspace.state.view);
  if (typeof window !== 'undefined') performanceMark('soup:source-readout-render');
  const hasCursor = visible.hoverStep !== null;
  return <section className={readoutStyles.rail} aria-label={`${NAMES[metric]} source readout`} data-testid={`cursor-readout-${metric}`} data-reserved="true"><div className={`${readoutStyles.content} ${hasCursor ? 'chart-hover-value' : ''}`} data-hover-seq={hasCursor ? visible.hoverSeq : undefined}>
    <p className={readoutStyles.title}>{hasCursor ? `Cursor step ${formatStep(visible.hoverStep!)}` : 'Original source values'}</p>
    <div className={readoutStyles.grid}>{ids.map((id, index) => {
          const rows = hasCursor ? visible.hover[id] ?? [] : [],
            run = workspace.state.runs[id]?.run;
          return <div className={`${readoutStyles.slot} ${hasCursor ? 'tooltip-series' : ''}`} key={id}><div className={readoutStyles.run}><i className="tooltip-dot" style={{
                background: `var(${COLORS[slots[id] ?? index]})`
              }} /><strong>{id}</strong></div><section className={readoutStyles.observations} aria-label={`Original observations for ${id}`}>
      {hasCursor ? rows.length ? rows.slice(0, 2).map((row, index) => <div className={readoutStyles.observation} key={index}><div className={readoutStyles.facts} title={`Exact source value ${exactNumber(row[metric])}`}><span>step {formatStep(row.step)}</span><span>{NAMES[metric]} {formatValue(row[metric], metric === 'lr')}</span><span>Δstep {formatStep(Math.abs(row.step - visible.hoverStep!))}</span></div><button type="button" className="text-link" onClick={() => {
                  if (run) onPin({
                    id,
                    revision: run.revision,
                    row
                  });
                }}>Pin row {row.sourceIndex}</button></div>) : <p className={readoutStyles.placeholder}>No recorded value at this cursor location.</p> : <p className={readoutStyles.placeholder}>Point at a chart to inspect its original source values. Pin a row to keep it for inspection.</p>}
      {rows.length > 2 && run && <p className={readoutStyles.group}>{rows.length} returned observations. Showing first 2 returned observations; scroll within this readout for source actions. <Link className="text-link" to={`/runs/${id}?step=${rows[0].step}&revision=${encodeURIComponent(run.revision)}`}>Inspect full source group</Link>.</p>}
    </section></div>;
        })}</div>
  </div></section>;
}
function MetricSourceNotes({
  workspace,
  ids,
  metric,
  compact
}: {
  workspace: Workspace;
  ids: string[];
  metric: Metric;
  compact: boolean;
}) {
  return <>{ids.map(id => {
      const metadata = workspace.state.runs[id],
        view = workspace.state.view?.runs[id]?.[metric];
      if (!metadata || !view) return null;
      const spike = metric === 'loss' && metadata.run.scenario === 'spike' ? view.points.find(point => point.sourceIndex === 500001 && point.step === 500001 && point.value === 100) : undefined;
      const quality = metadata.quality.metrics[metric],
        invalid = [[quality.nan, 'NaN'], [quality.posInf, '+Infinity'], [quality.negInf, '−Infinity']] as const,
        counts = invalid.filter(([count]) => count > 0).map(([count, label]) => `${count} ${label} ${count === 1 ? 'observation' : 'observations'}`);
      return <div key={id}>{spike && <div className={readoutStyles.note} data-testid="spike-explanation"><p>{ids.length > 1 ? `${id} · ` : ''}Recorded spike: loss {exactNumber(spike.value)} at step {formatStep(spike.step)}. {compact ? 'This peak sets the linear scale.' : 'The linear scale includes this peak, so smaller measurements appear near the baseline.'}</p><div className={readoutStyles.actions}><Link className="text-link" to={`/runs/${id}?sourceIndex=${spike.sourceIndex}&revision=${encodeURIComponent(metadata.run.revision)}`}>Inspect original spike</Link>{!compact && <Button variant="ghost" size="sm" onClick={() => workspace.setRange({
              min: Math.max(metadata.domain?.min ?? spike.step, spike.step - 10),
              max: Math.min(metadata.domain?.max ?? spike.step, spike.step + 10)
            })}>Zoom around spike</Button>}</div></div>}{counts.length > 0 && <p className={readoutStyles.note} data-testid="invalid-explanation">{ids.length > 1 ? `${id} · ` : ''}This snapshot contains {counts.join(', ')}; recorded invalid values create gaps, never zero. <Link className="text-link" to={`/data-quality?run=${id}&metric=${metric}`}>Inspect data quality</Link>.</p>}</div>;
    })}</>;
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
  performanceMark('soup:charts-render');
  const view = workspace.state.view,
    identity = ids.join(','), sharedSource = ids.length > 1 || only === 'all';
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
  const [pinned, setPinned] = useState<SourcePin | null>(null);
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
      const extrema=values.flatMap(v=>[v.min,v.max]).filter((n):n is number=>typeof n==='number'&&Number.isFinite(n));
      return {
        metric,
        values,
        series,
        data: view?.alignment?.[metric]??align(values),
        yBounds:extrema.length?{min:Math.min(...extrema),max:Math.max(...extrema)}:undefined
      };
    });
  }, [view, identity, only, compact, slots]);
  if (!view) return null;
  return <div className={compact ? 'preview-charts' : sharedSource ? 'metric-grid source-dock-layout' : 'metric-grid'} data-view-ready={workspace.state.kind === 'ready'}>{items.map(({
      metric,
      values,
      series,
      data,
      yBounds
    }) => {
      return <section key={metric} className={`chart-panel metric-${metric}`} data-run-ids={ids.join(',')} data-view-seq={view.viewSeq}><div className="panel-heading"><div><h2>{NAMES[metric]}</h2><p>Recorded step · Linear scale · Original values</p></div><span className="snapshot-badge">{values.reduce((sum, v) => sum + v.representedCount, 0)} displayed</span></div><figure><MetricPlot viewToken={view} yBounds={yBounds} data={data} series={series} cursorStore={workspace.cursor} cursorMetric={metric} theme={theme} range={view.range} domain={domain} focusedRun={activeId} scientific={metric === 'lr'} height={compact ? 220 : metric === 'loss' ? 340 : 240} testId={ids.length > 1 ? `comparison-${metric === 'grad_norm' ? 'grad' : metric}` : `${metric === 'grad_norm' ? 'grad' : metric}-chart`} onCursorGrid={(steps,origin)=>workspace.prepareHover(metric,steps,origin)} onWidth={w => workspace.setMetricWidth(metric, w)} onRange={workspace.setRange} onCursor={(step, origin) => {
            workspace.cursor.setPointerActive(step !== null);
            if (step !== null) workspace.hover(step, origin);
          }} /><figcaption><div className="interactive-legend">{series.map((s, i) => <span className="legend-control" key={s.label}><button type="button" aria-label={`Highlight ${s.label}`} aria-pressed={focused === s.label} onPointerEnter={() => setHovered(s.label)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(s.label)} onBlur={() => setHovered(null)} onClick={() => {
                  setHovered(null);
                  setFocused(focused === s.label ? null : s.label);
                }} title="Focus this series. Other source series stay visible, dimmed."><i style={{
                    background: `var(${s.colorToken})`
                  }} />{s.label}</button><small>{values[i].mode === 'disconnected-extrema' ? 'Disconnected extrema' : `${formatValue(values[i].min, metric === 'lr')} – ${formatValue(values[i].max, metric === 'lr')}`}</small></span>)}</div>{activeId && <p>Focused: {activeId}. Other series and their source counts remain present.</p>}{values.every(v => !v.points.length && !v.conflicts.length) && <strong>No finite observations in this window.</strong>}<p className="chart-pointer-help">Wheel: zoom · Ctrl+wheel: pinch zoom · Shift+wheel: pan · Drag: select range</p>{compact ? <p className="small-note"><Link className="text-link" to={`/runs/${ids[0]}`}>Open run to inspect original values and adjust range</Link>.</p> : <p className="chart-touch-help">Tap the chart for recorded values. Use Adjust chart range to zoom; swipe vertically to scroll.</p>}<MetricSourceNotes workspace={workspace} ids={ids} metric={metric} compact={compact}/>{!compact&&sharedSource&&metric===items[0]?.metric&&<ComparisonCursorReadout workspace={workspace} ids={ids} slots={slots} colorTokens={COLORS} onPin={setPinned}/>}{!compact&&!sharedSource&&<SourceCursorReadout metricName={NAMES[metric]} colorTokens={COLORS} measure={metric === only} workspace={workspace} ids={ids} metric={metric} slots={slots} onPin={setPinned}/>}</figcaption></figure></section>;
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
  const accepted = workspace.state.inspectionQuery?.runId === runId ? workspace.state.inspectionQuery : null,
    submitted = workspace.state.inspectionRequest?.runId === runId ? workspace.state.inspectionRequest : null,
    pending = workspace.state.inspectionPending,
    inspectionError = workspace.state.inspectionError;
  const describe = (source: NonNullable<typeof accepted>) => source.sourceIndex !== undefined ? `source index ${formatStep(source.sourceIndex)}` : `recorded step ${formatStep(source.step!)}`;
  return <section className="source-panel" id="source"><div className="panel-heading"><div><h2>Source inspector</h2><p>Exact measurements in original arrival order. No interpolation.</p></div></div><div className="inspector-controls"><select aria-label="Inspect by" value={mode} onChange={event => setMode(event.target.value as 'step' | 'sourceIndex')}><option value="step">Recorded step</option><option value="sourceIndex">Source index</option></select><form onSubmit={event => {
        event.preventDefault();
        workspace.inspect(runId, {
          [mode]: Number(query)
        });
      }}><Input label={mode === 'step' ? 'Source step' : 'Source index'} type="number" required step={mode === 'sourceIndex' ? 1 : 'any'} value={query} onChange={event => setQuery(event.target.value)} /><Button type="submit" disabled={pending}>{mode === 'step' ? 'Inspect step' : 'Inspect source'}</Button></form></div>
  {(submitted || accepted) && <div className="inspection-result" aria-busy={pending}>
    {pending && submitted ? <output data-testid="inspection-status" className={inspectorStyles.status}>Inspecting {describe(submitted)}…</output> : inspectionError && submitted ? <><output data-testid="inspection-status" className={inspectorStyles.status}>Could not inspect {describe(submitted)}. {inspectionError}</output><Button variant="secondary" onClick={() => workspace.inspect(runId, submitted)}>Retry inspection</Button></> : accepted ? <><output data-testid="inspection-status" className={inspectorStyles.status}>{workspace.state.inspectionTotal === 0 ? `No observation at ${describe(accepted)}. Try another query or choose Browse source rows below.` : `${workspace.state.inspectionTotal} original ${workspace.state.inspectionTotal === 1 ? 'observation' : 'observations'} at ${describe(accepted)}.`}</output>{workspace.state.inspection.map(row => <dl className="inspected-values" key={row.sourceIndex}><div><dt>Source index</dt><dd>{row.sourceIndex}</dd></div><div><dt>Recorded step</dt><dd>{formatStep(row.step)}</dd></div>{METRICS.map(metric => <div key={metric}><dt>Raw {NAMES[metric].toLowerCase()}</dt><dd><span data-testid={`inspected-${metric}`}>{formatValue(row[metric], metric === 'lr')}</span><small className="exact-value">{exactNumber(row[metric])}</small></dd></div>)}</dl>)}{accepted.step !== undefined && workspace.state.inspectionTotal > 50 && <div className="rows-pagination"><Button variant="secondary" disabled={accepted.page === 0} onClick={() => workspace.inspect(runId, {
            step: accepted.step,
            page: accepted.page - 1
          })}>Previous group rows</Button><span>Group page {accepted.page + 1}</span><Button variant="secondary" disabled={(accepted.page + 1) * 50 >= workspace.state.inspectionTotal} onClick={() => workspace.inspect(runId, {
            step: accepted.step,
            page: accepted.page + 1
          })}>Next group rows</Button></div>}</> : null}
  </div>}<details className="source-details" onToggle={event => {
      if (event.currentTarget.open) workspace.loadRows(runId, page ?? 0);
    }}><summary>Browse source rows</summary><div className="table-scroll"><table><caption>Original observations · 50 rows per page</caption><thead><tr><th>Source index</th><th>Step</th>{METRICS.map(metric => <th key={metric}>{NAMES[metric]}</th>)}</tr></thead><tbody>{workspace.state.rows.map(row => <tr key={row.sourceIndex}><th>{row.sourceIndex}</th><td>{formatStep(row.step)}</td>{METRICS.map(metric => <td key={metric}>{formatValue(row[metric], metric === 'lr')}</td>)}</tr>)}</tbody></table></div><div className="rows-pagination"><Button disabled={workspace.state.rowsPending || page === null || page === 0} variant="secondary" onClick={() => workspace.loadRows(runId, (page ?? 0) - 1)}>Previous rows</Button><span>{page === null ? 'No source page loaded' : `Page ${page + 1}`}{workspace.state.rowsPending ? ' · Loading requested page…' : ''}</span><Button variant="secondary" disabled={workspace.state.rowsPending || page === null || workspace.state.rows.length < 50} onClick={() => workspace.loadRows(runId, (page ?? 0) + 1)}>Next rows</Button></div></details></section>;
}
export function RunLink({
  id
}: {
  id: string;
}) {
  return <Link className="text-link" to={`/runs/${id}`}>{id}</Link>;
}
