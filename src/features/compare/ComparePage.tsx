import {performanceMark} from '@/app/performance'
import { ResponsiveDisclosure } from '@/features/shared/ResponsiveDisclosure';
import { X } from 'lucide-react';
import { memo, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigationType, useOutletContext, useSearchParams } from 'react-router-dom';
import { useCatalog } from '@/features/shared/Catalog';
import { formatValue, formatStep } from '@/data/format';
import summaryStyles from './compare-summary.module.css';
import type { Metric, MetricSummary, RunManifestEntry } from '@/data/types';
import type { ShellContext } from '@/app/App';
import { useWorkspace } from '@/worker/use-workspace';
import { SearchField } from '@/components/arc/search-field/search-field';
import { Charts, Heading, METRICS, NAMES, RangeControls, WorkspaceStatus } from '../shared/Workspace';
function summaryStep(summary: MetricSummary, kind: 'min' | 'max') {
  const value = summary[kind],
    step = kind === 'min' ? summary.minStep : summary.maxStep;
  return step === null ? value === null ? 'No finite measurements' : 'Unplottable source step' : `step ${formatStep(step)}`;
}
function parseSelection(value: string) {
  return [...new Set(value.split(',').filter(Boolean))];
}
const ComparisonSummaries=memo(function ComparisonSummaries({selectionKey,manifest,summaryMetric,onMetricChange}:{selectionKey:string;manifest:readonly RunManifestEntry[];summaryMetric:Metric;onMetricChange:(metric:Metric)=>void}) {
  performanceMark('soup:compare-summaries-render');
  const selected=parseSelection(selectionKey),RUN_MANIFEST=manifest;
  return <ResponsiveDisclosure label="Whole-run summaries" className="comparison-summaries-disclosure"><section className={`run-collection ${summaryStyles.panel}`}><div className={summaryStyles.toolbar}><div><h2>{NAMES[summaryMetric]} summaries</h2><p>Computed from all original observations, independent of zoom.</p></div><label>Summary metric<select aria-label="Summary metric" value={summaryMetric} onChange={event => onMetricChange(event.target.value as Metric)}>{METRICS.map(metric => <option key={metric} value={metric}>{NAMES[metric]}</option>)}</select></label></div><div className="table-scroll"><table data-testid="comparison-summary" data-summary-metric={summaryMetric}><caption>Whole-run {NAMES[summaryMetric]} values and their actual steps</caption><thead><tr><th scope="col">Run</th><th scope="col">Latest</th><th scope="col">Minimum</th><th scope="col">Maximum</th><th scope="col">Observations</th><th scope="col">Metric quality</th></tr></thead><tbody>{selected.map(id => {
                      const run = RUN_MANIFEST.find(entry => entry.id === id)!,
                        summary = run.summaries[summaryMetric],
                        quality = run.quality.metrics[summaryMetric];
                      return <tr key={id} data-testid={`summary-row-${id}`}><th scope="row"><Link to={`/runs/${id}`}>{id}</Link></th><td data-testid={`summary-${id}-latest`}><strong>{summary.latestStatus === 'finite' ? formatValue(summary.latest, summaryMetric === 'lr') : summary.latestStatus === 'invalid' ? 'Invalid latest measurement' : summary.latestStatus === 'conflict' ? 'Conflicting latest measurements' : 'No measurements'}</strong><small className="exact-value">{summary.latestStep === null ? 'No recorded step' : `step ${formatStep(summary.latestStep)}`}</small>{summary.latestStatus !== 'finite' && summary.lastFinite && <p className={summaryStyles.previous}>Earlier finite: {formatValue(summary.lastFinite.value, summaryMetric === 'lr')} at step {formatStep(summary.lastFinite.step)}<small className="exact-value">source index {summary.lastFinite.sourceIndex}</small></p>}</td><td data-testid={`summary-${id}-min`}><strong>{formatValue(summary.min, summaryMetric === 'lr')}</strong><small className="exact-value">{summaryStep(summary, 'min')}</small></td><td data-testid={`summary-${id}-max`}><strong>{formatValue(summary.max, summaryMetric === 'lr')}</strong><small className="exact-value">{summaryStep(summary, 'max')}</small></td><td>{formatStep(run.rowCount)} raw rows<small className="exact-value">{formatStep(summary.finiteCount)} finite {NAMES[summaryMetric]} observations</small></td><td><Link to={`/data-quality?run=${id}&metric=${summaryMetric}`}>{quality.invalidCount} invalid observations</Link><small className="exact-value">{quality.conflicts} conflicting groups · {quality.gaps} known gaps</small></td></tr>;
                    })}</tbody></table></div></section></ResponsiveDisclosure>;
})
function ComparisonWorkspace({selectionKey,theme}:{selectionKey:string;theme:ShellContext['theme']}) {
 const RUN_MANIFEST=useCatalog(),selected=parseSelection(selectionKey),workspace=useWorkspace(selected);
 const [only,setOnly]=useState<Metric|'all'>('all');
 const [summaryMetric,setSummaryMetric]=useState<Metric>('loss');
 return <><WorkspaceStatus workspace={workspace} />{workspace.state.view && <><nav className="section-tabs" aria-label="Visible metrics">{(['all', ...METRICS] as const).map(m => <button key={m} aria-pressed={only === m} onClick={() => setOnly(m)}>{m === 'all' ? 'All metrics' : NAMES[m]}</button>)}</nav><RangeControls workspace={workspace} /><Charts workspace={workspace} ids={selected} theme={theme} only={only} /><ComparisonSummaries selectionKey={selected.join(',')} manifest={RUN_MANIFEST} summaryMetric={summaryMetric} onMetricChange={setSummaryMetric}/></>}</>;
}
export function ComparePage() {
  useLayoutEffect(() => { performanceMark('soup:compare-page-commit'); });
  const RUN_MANIFEST = useCatalog();
  const [params, setParams] = useSearchParams(),
    {
      theme
    } = useOutletContext<ShellContext>(),
    [query, setQuery] = useState('');
  const queryKey = params.get('runs') ?? '',
    location = useLocation(),
    navigationType = useNavigationType();
  const [ids, setIds] = useState(() => parseSelection(queryKey));
  const desired = useRef(ids),
    pendingQuery = useRef<string | null>(null);
  useLayoutEffect(() => {
    // Pending PUSH renders must not roll back a newer checkbox intent. POP always adopts the URL.
    if (pendingQuery.current !== null && queryKey !== pendingQuery.current && navigationType !== 'POP') return;
    pendingQuery.current = null;
    const next = parseSelection(queryKey);
    desired.current = next;
    // oxlint-disable-next-line react/set-state-in-effect -- Synchronize external URL/back-forward state into the urgent checkbox model.
    setIds(current => current.join(',') === next.join(',') ? current : next);
  }, [queryKey, location.key, navigationType]);
  const invalid = ids.filter(id => !RUN_MANIFEST.some(run => run.id === id)),
    valid = ids.filter(id => RUN_MANIFEST.some(run => run.id === id));
  const error = invalid.length ? `Unknown run identifiers: ${invalid.join(', ')}. Remove them or clear the selection.` : valid.length > 4 ? 'Choose no more than four runs before loading comparison.' : '';
  const selected = error ? [] : valid;
  function updateSelection(next: string[]) {
    desired.current = next;
    pendingQuery.current = next.join(',');
    setIds(next);
    setParams(next.length ? {
      runs: next.join(',')
    } : {}, {
      preventScrollReset: true
    });
  }
  function toggle(id: string, checked: boolean) {
    const current = desired.current;
    if (checked && !current.includes(id) && current.length >= 4) return;
    updateSelection(checked ? [...new Set([...current, id])] : current.filter(value => value !== id));
  }
  return <><Heading title="Compare runs" subtitle={`${valid.length} runs selected · Aligned by original recorded step`} /><section className="mobile-comparison-selection" aria-label="Comparison selection"><p>{ids.length ? 'Selected experiments' : 'Choose experiments below'}</p><ul>{ids.map(id => <li key={id}><button type="button" onClick={() => updateSelection(ids.filter(value => value !== id))} aria-label={`Remove ${id} from comparison`}>{id}<X size={14} aria-hidden="true" /></button></li>)}</ul></section><div className="comparison-layout"><aside className="comparison-controls"><ResponsiveDisclosure label="Edit comparison runs" meta={`${valid.length}/4 selected`} breakpoint={1100} mobileOpen={ids.length ? undefined : true}><h2>Selected runs</h2><SearchField label="Search runs" value={query} onValueChange={setQuery} placeholder="Find an experiment" /><fieldset><legend className="sr-only">Choose up to four runs</legend>{RUN_MANIFEST.filter(r => `${r.name} ${r.model}`.toLowerCase().includes(query.toLowerCase())).map(r => <label className="run-checkbox" key={r.id}><input type="checkbox" aria-label={`Compare ${r.name}`} checked={ids.includes(r.id)} disabled={!ids.includes(r.id) && ids.length >= 4} onChange={event => toggle(r.id, event.target.checked)} /><span>{r.name}<small>{r.model} · {r.status}</small></span></label>)}</fieldset><dl className="comparison-facts"><div><dt>Align by</dt><dd>Recorded step</dd></div><div><dt>Y scale</dt><dd>Linear · Shared per metric</dd></div><div><dt>Smoothing</dt><dd>Off · Original values</dd></div><div><dt>Missing values</dt><dd>Preserved as gaps</dd></div></dl></ResponsiveDisclosure></aside><div className="comparison-charts">{error && <div role="alert" className="quality-notice">{error}<button onClick={() => updateSelection([])}>Clear selection</button></div>}{!ids.length && <div className="empty-panel"><h2>Select runs to compare</h2><p>Choose two to four snapshots from the list. Each series retains its source values.</p></div>}{selected.length === 1 && <p className="quality-notice">One run selected. Add another run to compare.</p>}<ComparisonWorkspace selectionKey={selected.join(',')} theme={theme}/></div></div></>;
}
