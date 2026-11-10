import styles from './quality-panels.module.css';
import { ISSUE_LABELS } from './issue-labels';
import { IssueTypeSummary } from './IssueTypeSummary';
import { ResponsiveDisclosure } from '@/features/shared/ResponsiveDisclosure';
import { SoupArt } from '@/features/shared/SoupArt';
import { useEffect, useEffectEvent, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCatalog } from '@/features/shared/Catalog';
import type { IssueKind, Metric } from '@/data/types';
import { formatStep, formatValue, formatTimestamp, sourceAge } from '@/data/format';
import { useWorkspace } from '@/worker/use-workspace';
import { Button } from '@/components/arc/button/button';
import { Heading, METRICS, NAMES, WorkspaceStatus, issueCount } from '../shared/Workspace';
const KINDS: IssueKind[] = ['nan', 'posInf', 'negInf', 'duplicate', 'conflict', 'invalidX', 'outOfOrder', 'gap'];
export function QualityPage() {
  const RUN_MANIFEST = useCatalog();
  const [params, setParams] = useSearchParams(),
    selected = params.get('run') ?? '',
    metric = params.get('metric') ?? 'all',
    kind = params.get('kind') ?? 'all',
    [page, setPage] = useState(0),
    run = RUN_MANIFEST.find(r => r.id === selected),
    workspace = useWorkspace(run ? [run.id] : []);
  const active = workspace.state.kind === 'ready' && Boolean(run && workspace.state.runs[run.id]);
  const query = workspace.state.issuesQuery;
  const accepted = active && !workspace.state.issuesPending && query !== null && query.runId === selected && query.page === page && query.pageSize === 50 && (query.metric ?? 'all') === metric && (query.kind ?? 'all') === kind;
  const loadIssues = workspace.loadIssues;
  const runId = run?.id;
  function loadLedger() {
    if (runId) return loadIssues(runId, {
      ...(metric !== 'all' ? {
        metric: metric as Metric
      } : {}),
      ...(kind !== 'all' ? {
        kind: kind as IssueKind
      } : {}),
      page
    });
    return false;
  }
  const loadLedgerEffect = useEffectEvent(loadLedger);
  useEffect(() => {
    if (active) loadLedgerEffect();
  }, [active, runId, metric, kind, page]);
  function filter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value === 'all' || !value) next.delete(key);else next.set(key, value);
    setPage(0);
    setParams(next);
  }
  const filtered = metric !== 'all' || kind !== 'all';
  const metricScope = metric === 'all' ? 'Loss, Learning rate and Gradient norm' : NAMES[metric as Metric] ?? metric;
  const kindScope = kind === 'all' ? 'All issue types' : ISSUE_LABELS[kind as IssueKind] ?? kind;
  const age = sourceAge(run?.sourceUpdatedAt);
  const beyondPage = page > 0 || workspace.state.issueTotal > 0;
  function clearIssueFilters() {
    const next = new URLSearchParams(params);
    next.delete('metric'); next.delete('kind');
    setPage(0); setParams(next);
  }
  return <><Heading title="Data quality" subtitle="Every finding links back to an immutable source observation." /><dl className="summary-grid detail-summary"><div><dt>Runs audited</dt><dd>{RUN_MANIFEST.length}</dd></div><div><dt>Runs with findings</dt><dd>{RUN_MANIFEST.filter(r => issueCount(r.quality) > 0).length}</dd></div><div><dt>Invalid observations</dt><dd>{RUN_MANIFEST.reduce((s, r) => s + r.quality.nan + r.quality.posInf + r.quality.negInf, 0)}</dd></div><div><dt>Conflicting groups</dt><dd>{RUN_MANIFEST.reduce((s, r) => s + r.quality.conflictGroups, 0)}</dd></div></dl><ResponsiveDisclosure label="Issue type counts" meta="Observations, rows and groups" className="quality-kind-disclosure"><IssueTypeSummary entries={RUN_MANIFEST} /></ResponsiveDisclosure><ResponsiveDisclosure label="Source quality matrix" meta="All runs and metrics" className="quality-matrix-disclosure"><section className="run-collection"><div className="panel-heading"><div><h2>Source quality matrix</h2><p>Execution status and data quality are independent.</p></div></div><p className="mobile-table-hint">Swipe the matrix to inspect every metric. Run names stay visible.</p><div className="table-scroll"><table><caption className="sr-only">Counts per run and metric. Select a cell to inspect findings.</caption><thead><tr><th>Run</th>{METRICS.map(m => <th key={m}>{NAMES[m]}</th>)}<th>Duplicates</th><th>Out of order</th><th>Missing intervals</th></tr></thead><tbody>{RUN_MANIFEST.map(r => <tr key={r.id} data-selected={r.id === selected}><th><Link to={`/data-quality?run=${r.id}`}>{r.name}</Link><span className="row-subtitle">{r.status}</span></th>{METRICS.map(m => {
                  const q = r.quality.metrics[m],
                    count = q.invalidCount + q.conflicts + q.gaps;
                  return <td key={m}><Link className={`quality-cell ${count ? 'has-issues' : 'clean'}`} to={`/data-quality?run=${r.id}&metric=${m}`}>{count ? `${count} findings` : 'Clean'}</Link></td>;
                })}<td>{r.quality.duplicateRows}</td><td>{r.quality.outOfOrder}</td><td>{r.quality.gaps}</td></tr>)}</tbody></table></div></section></ResponsiveDisclosure><section className="source-panel issue-detail"><div className="panel-heading"><div><h2>Source issue ledger</h2><p>Choose a run to inspect original observations and their findings.</p></div></div><div className={`quality-filters ${styles.filters}`}><label>Run<select aria-label="Run" value={selected} onChange={e => filter('run', e.target.value)}><option value="">Select a run</option>{RUN_MANIFEST.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></label><label>Metric<select aria-label="Metric" value={metric} onChange={e => filter('metric', e.target.value)}><option value="all">All metrics</option>{METRICS.map(m => <option key={m} value={m}>{NAMES[m]}</option>)}</select></label><label>Issue type<select aria-label="Issue type" value={kind} onChange={e => filter('kind', e.target.value)}><option value="all">All issue types</option>{KINDS.map(k => <option key={k} value={k}>{ISSUE_LABELS[k]}</option>)}</select></label></div>{selected && !run && <p role="alert" className="quality-notice">Unknown run identifier. Choose an available snapshot.</p>}<WorkspaceStatus workspace={workspace} />{run && <>
  <dl className={styles.snapshot} aria-label="Source snapshot metadata">
    <div><dt>Source snapshot</dt><dd><time dateTime={run.sourceUpdatedAt} title={run.sourceUpdatedAt}>{formatTimestamp(run.sourceUpdatedAt, undefined, 'UTC')}</time></dd></div>
    <div><dt>Source age</dt><dd className={age.stale ? styles.stale : undefined} data-testid="source-age">{age.hours === null ? 'Source age unavailable' : age.stale ? 'Stale source snapshot' : 'Source snapshot age: under 24 hours'}</dd><dd className={styles.ageNote}>Snapshot age is separate from source data issues.</dd></div>
  </dl>
  {!accepted ? <div className="empty-panel"><output>{workspace.state.message ? 'Source page unavailable. Retry the source query.' : 'Loading requested source findings…'}</output>{workspace.state.message && <Button variant="secondary" onClick={() => loadLedger()}>Retry findings</Button>}</div> : workspace.state.issues.length ? <>
    <div className="issue-strip" aria-label="Issue locations by recorded step">{workspace.state.issues.filter(i => Number.isFinite(i.step)).map((issue, index) => <Link key={index} aria-label={`${ISSUE_LABELS[issue.kind]} at step ${issue.step}, source ${issue.sourceIndex}`} title={`${ISSUE_LABELS[issue.kind]} · step ${issue.step}`} to={`/runs/${run.id}?sourceIndex=${issue.sourceIndex}&revision=${encodeURIComponent(run.revision)}`} style={{
              left: `${100 * (issue.step - (run.domain?.min ?? 0)) / Math.max(1, (run.domain?.max ?? 1) - (run.domain?.min ?? 0))}%`
            }} />)}<span>Page {(query.page ?? 0) + 1} · findings in the loaded page · recorded step →</span></div>
    <div className="table-scroll"><table className="issue-ledger-table"><caption>Page {(query.page ?? 0) + 1} · {workspace.state.issueTotal} findings · original data unchanged</caption><thead><tr><th>Type</th><th>Metric</th><th>Step</th><th>Source</th><th>Raw value</th><th>Details</th></tr></thead><tbody>{workspace.state.issues.map((i, index) => <tr key={`${i.sourceIndex}-${i.kind}-${index}`}><th scope="row">{ISSUE_LABELS[i.kind]}</th><td data-label="Metric">{i.metric ? NAMES[i.metric] : 'Structure'}</td><td data-label="Step">{formatStep(i.step)}</td><td data-label="Source">{i.sourceIndex}</td><td data-label="Raw value">{i.value === null ? '—' : formatValue(i.value)}</td><td data-label="Details"><Link className="text-link" to={`/runs/${run.id}?sourceIndex=${i.sourceIndex}&revision=${encodeURIComponent(run.revision)}`}>Inspect source →</Link><small className="exact-value">{i.message}</small></td></tr>)}</tbody></table></div>
    <div className="rows-pagination"><Button variant="secondary" disabled={!page} onClick={() => setPage(page - 1)}>Previous findings</Button><span>Page {(query.page ?? 0) + 1}</span><Button variant="secondary" disabled={(page + 1) * 50 >= workspace.state.issueTotal} onClick={() => setPage(page + 1)}>Next findings</Button></div>
  </> : <div className={styles.ledgerEmpty} aria-live="polite" aria-atomic="true">
    <SoupArt kind="ladle" />
    <div className={styles.emptyCopy}>
      <h3>{beyondPage ? 'No findings on this page' : filtered ? 'No matching findings' : 'No source data issues'}</h3>
      {beyondPage ? <><p>This page is beyond the available findings for these filters. Open the first page to inspect the current results.</p><Button variant="secondary" onClick={() => { setPage(0); if (page === 0) loadLedger(); }}>Go to first page</Button></> : filtered ? <><p>Selected metric: {metric === 'all' ? 'All metrics' : metricScope}. Issue type: {kindScope}.</p><p>Checked {formatStep(run.rowCount)} source rows for these filters.</p><Button variant="secondary" onClick={clearIssueFilters}>Clear issue filters</Button></> : <p>Checked {formatStep(run.rowCount)} source rows across {metricScope}.</p>}
    </div>
  </div>}
</>}</section></>;
}
