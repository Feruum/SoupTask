import { ResponsiveDisclosure, useCompactLayout } from '@/features/shared/ResponsiveDisclosure';
import { runHistory, historyDateLabel } from '@/data/run-history';
import { CompareSelectionBar } from './CompareSelectionBar';
import { SoupArt } from '@/features/shared/SoupArt';
import { useState } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { useCatalog } from '@/features/shared/Catalog';
import { formatStep, formatValue, formatTimestamp, sourceAge } from '@/data/format';
import { useWorkspace } from '@/worker/use-workspace';
import type { ShellContext } from '@/app/App';
import { Button } from '@/components/arc/button/button';
import { SearchField } from '@/components/arc/search-field/search-field';
import { Charts, Heading, issueCount, WorkspaceStatus } from '../shared/Workspace';
export function RunsPage() {
  const RUN_MANIFEST = useCatalog();
  const compact = useCompactLayout();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const startedOn = searchParams.get('startedOn');
  const historyIds = new Set(runHistory(RUN_MANIFEST).filter(event => event.startedAt.slice(0, 10) === startedOn).map(event => event.runId));
  const historyDateValid = Boolean(startedOn && /^\d{4}-\d{2}-\d{2}$/.test(startedOn) && Number.isFinite(Date.parse(startedOn)) && new Date(startedOn).toISOString().slice(0, 10) === startedOn);
  function clearHistoryDate() {
    const next = new URLSearchParams(searchParams);
    next.delete('startedOn');
    setSearchParams(next);
  }
  const {
    theme
  } = useOutletContext<ShellContext>();
  const [query, setQuery] = useState(''),
    [status, setStatus] = useState('all'),
    [quality, setQuality] = useState('all'),
    [sort, setSort] = useState('name'),
    [direction, setDirection] = useState(1),
    [preview, setPreview] = useState('kazakh-sft-005'),
    [selected, setSelected] = useState<string[]>([]);
  const runs = RUN_MANIFEST.filter(r => (!startedOn || historyIds.has(r.id)) && `${r.name} ${r.id} ${r.model} ${r.scenario}`.toLowerCase().includes(query.toLowerCase()) && (status === 'all' || r.status === status) && (quality === 'all' || (quality === 'issues' ? issueCount(r.quality) > 0 : issueCount(r.quality) === 0))).sort((a, b) => {
    if (sort === 'name') return direction * a.name.localeCompare(b.name);
    const x = sort === 'loss' ? a.summaries.loss.latest : sort === 'step' ? a.domain?.max : Date.parse(a.sourceUpdatedAt),
      y = sort === 'loss' ? b.summaries.loss.latest : sort === 'step' ? b.domain?.max : Date.parse(b.sourceUpdatedAt);
    return x == null ? y == null ? a.id.localeCompare(b.id) : 1 : y == null ? -1 : (x - y) * direction || a.id.localeCompare(b.id);
  });
  const active = runs.find(r => r.id === preview) ?? runs[0],
    workspace = useWorkspace(active ? [active.id] : []),
    hidden = selected.filter(id => !runs.some(r => r.id === id)).length;
  function removeSelection(id: string) {
    setSelected(current => current.filter(value => value !== id));
    requestAnimationFrame(() => (document.getElementById(`compare-${id}`) ?? document.querySelector<HTMLInputElement>('input[type="search"]'))?.focus());
  }
  function clearSelection() {
    const first = selected.find(id => runs.some(run => run.id === id));
    setSelected([]);
    requestAnimationFrame(() => (document.getElementById(`compare-${first}`) ?? document.querySelector<HTMLInputElement>('input[type="search"]'))?.focus());
  }
  function previewRun(id: string) {
    setPreview(id);
    if (compact) {
      setPreviewOpen(true);
      requestAnimationFrame(() => {
        const panel = document.querySelector<HTMLElement>('.run-preview');
        panel?.scrollIntoView({ block: 'start', behavior: 'instant' });
        panel?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
      });
    }
  }
  const previewPanel = active && <ResponsiveDisclosure label="Run preview" meta={active.name} className="run-preview-disclosure" mobileOpen={previewOpen} onMobileToggle={setPreviewOpen}><aside className="run-preview"><div className="panel-heading"><div><h2 tabIndex={-1}>{active.name}</h2><p>{active.status} · {active.model}</p></div><Link className="text-link" to={`/runs/${active.id}`}>Open run ↗</Link></div><WorkspaceStatus workspace={workspace} /><Charts workspace={workspace} ids={[active.id]} theme={theme} compact /><dl className="preview-facts"><div><dt>Current loss</dt><dd>{formatValue(active.summaries.loss.latest)}</dd></div><div><dt>Minimum loss</dt><dd>{formatValue(active.summaries.loss.min)}</dd></div><div><dt>Peak loss</dt><dd>{formatValue(active.summaries.loss.max)}</dd></div></dl><Link className="quality-notice" to={`/data-quality?run=${active.id}`}>{issueCount(active.quality)} source findings · Inspect data →</Link></aside></ResponsiveDisclosure>;
  return <><Heading title="Training runs" subtitle="Explore source measurements, compare experiments and investigate data quality." />{startedOn && <output className="run-history-filter"><span><strong>Run history</strong> · Started {historyDateValid ? historyDateLabel(startedOn) : startedOn} · UTC · Demo dates</span><Button variant="ghost" size="sm" onClick={clearHistoryDate}>Clear date filter</Button></output>}<dl className="summary-grid detail-summary"><div><dt>Total runs</dt><dd>{RUN_MANIFEST.length}</dd></div><div><dt>Running</dt><dd>{RUN_MANIFEST.filter(r => r.status === 'Running').length}</dd></div><div><dt>Completed</dt><dd>{RUN_MANIFEST.filter(r => r.status === 'Completed').length}</dd></div><div><dt>Need attention</dt><dd>{RUN_MANIFEST.filter(r => issueCount(r.quality) > 0).length}</dd></div></dl><div className="runs-layout">{compact && previewPanel}<section className="run-collection"><div className="collection-toolbar filters"><SearchField label="Search runs" placeholder="Run, model or scenario" value={query} onValueChange={setQuery} /><ResponsiveDisclosure label="Filters and sorting" className="run-filters-disclosure"><label>Status<select value={status} onChange={e => setStatus(e.target.value)}><option value="all">All statuses</option>{['Running', 'Completed', 'Failed', 'Cancelled'].map(s => <option key={s}>{s}</option>)}</select></label><label>Data quality<select value={quality} onChange={e => setQuality(e.target.value)}><option value="all">All data</option><option value="issues">Has issues</option><option value="clean">Clean</option></select></label><label>Sort by<select value={sort} onChange={e => setSort(e.target.value)}><option value="name">Run name</option><option value="loss">Latest loss</option><option value="step">Highest step</option><option value="time">Snapshot time</option></select></label><Button variant="ghost" onClick={() => setDirection(-direction)} aria-label={`Reverse sort: ${direction === 1 ? 'Ascending ↑' : 'Descending ↓'}`}>{direction === 1 ? 'Ascending ↑' : 'Descending ↓'}</Button></ResponsiveDisclosure></div><CompareSelectionBar selected={selected} hiddenCount={hidden} onRemove={removeSelection} onClear={clearSelection} />{runs.length ? <div className="table-scroll"><table className="runs-table"><caption className="sr-only">Twenty deterministic snapshots; status and data quality are separate.</caption><thead><tr><th>Compare</th><th>Run</th><th>Status</th><th>Latest loss</th><th>Step</th><th>Quality</th><th>Preview</th></tr></thead><tbody>{runs.map(r => <tr key={r.id} data-selected={selected.includes(r.id)} data-preview={r.id === active?.id}><td><label className="run-selection-control"><span className="sr-only">Compare {r.name}</span><input id={`compare-${r.id}`} type="checkbox" aria-label={`Compare ${r.name}`} checked={selected.includes(r.id)} disabled={!selected.includes(r.id) && selected.length >= 4} onChange={e => setSelected(e.target.checked ? [...selected, r.id] : selected.filter(id => id !== r.id))} /></label></td><th><Link to={`/runs/${r.id}`} aria-label={`Open ${r.name}`}>{r.name}</Link><span className="row-subtitle">{r.model} · {r.scenario}</span><time className="row-subtitle" dateTime={r.sourceUpdatedAt}>{formatTimestamp(r.sourceUpdatedAt)}{sourceAge(r.sourceUpdatedAt).stale ? ' · Stale source' : ''}</time></th><td data-label="Status"><span className={`status-pill status-${r.status.toLowerCase()}`}>{r.status}</span></td><td data-label="Latest loss">{r.summaries.loss.latestStatus === 'finite' ? formatValue(r.summaries.loss.latest) : r.summaries.loss.latestStatus}</td><td data-label="Step">{formatStep(r.domain?.max ?? 0)}</td><td data-label="Quality"><Link to={`/data-quality?run=${r.id}`}>{issueCount(r.quality) ? `${issueCount(r.quality)} findings` : 'Clean'}</Link></td><td><Button variant="ghost" size="sm" aria-pressed={r.id === active?.id} onClick={() => previewRun(r.id)} aria-label={`Preview ${r.name}`}>Preview</Button></td></tr>)}</tbody></table></div> : <div className="empty-panel illustrated-empty"><SoupArt kind="piala" /><h2>No matching runs</h2><p>Change the search or filters to see your snapshots.</p><Button onClick={() => {
            setQuery('');
            setStatus('all');
            setQuality('all');
            clearHistoryDate();
          }}>Clear filters</Button></div>}<div className="collection-footer"><span>{runs.length} of {RUN_MANIFEST.length} runs · {selected.length}/4 selected{hidden ? ` · ${hidden} hidden by filters` : ''}</span><span>Choose up to 4 runs using the checkboxes</span></div></section>{!compact && previewPanel}</div></>;
}
