import { IssueTypeSummary } from './IssueTypeSummary';
import { ResponsiveDisclosure } from '@/features/shared/ResponsiveDisclosure';
import { SoupArt } from '@/features/shared/SoupArt';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCatalog } from '@/features/shared/Catalog';
import type { IssueKind, Metric } from '@/data/types';
import { formatStep, formatValue } from '@/data/format';
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
  const loadLedger = useCallback(() => {
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
  }, [runId, loadIssues, metric, kind, page]);
  useEffect(() => {
    if (active) loadLedger();
  }, [active, loadLedger]);
  function filter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value === 'all' || !value) next.delete(key);else next.set(key, value);
    setPage(0);
    setParams(next);
  }
  return <><Heading title="Data quality" subtitle="Every finding links back to an immutable source observation." /><dl className="summary-grid detail-summary"><div><dt>Runs audited</dt><dd>{RUN_MANIFEST.length}</dd></div><div><dt>Runs with findings</dt><dd>{RUN_MANIFEST.filter(r => issueCount(r.quality) > 0).length}</dd></div><div><dt>Invalid observations</dt><dd>{RUN_MANIFEST.reduce((s, r) => s + r.quality.nan + r.quality.posInf + r.quality.negInf, 0)}</dd></div><div><dt>Conflicting groups</dt><dd>{RUN_MANIFEST.reduce((s, r) => s + r.quality.conflictGroups, 0)}</dd></div></dl><ResponsiveDisclosure label="Issue type counts" meta="Observations, rows and groups" className="quality-kind-disclosure"><IssueTypeSummary entries={RUN_MANIFEST} /></ResponsiveDisclosure><ResponsiveDisclosure label="Source quality matrix" meta="All runs and metrics" className="quality-matrix-disclosure"><section className="run-collection"><div className="panel-heading"><div><h2>Source quality matrix</h2><p>Execution status and data quality are independent.</p></div></div><p className="mobile-table-hint">Swipe the matrix to inspect every metric. Run names stay visible.</p><div className="table-scroll"><table><caption className="sr-only">Counts per run and metric. Select a cell to inspect findings.</caption><thead><tr><th>Run</th>{METRICS.map(m => <th key={m}>{NAMES[m]}</th>)}<th>Duplicates</th><th>Out of order</th><th>Missing intervals</th></tr></thead><tbody>{RUN_MANIFEST.map(r => <tr key={r.id} data-selected={r.id === selected}><th><Link to={`/data-quality?run=${r.id}`}>{r.name}</Link><span className="row-subtitle">{r.status}</span></th>{METRICS.map(m => {
                  const q = r.quality.metrics[m],
                    count = q.invalidCount + q.conflicts + q.gaps;
                  return <td key={m}><Link className={`quality-cell ${count ? 'has-issues' : 'clean'}`} to={`/data-quality?run=${r.id}&metric=${m}`}>{count ? `${count} findings` : 'Clean'}</Link></td>;
                })}<td>{r.quality.duplicateRows}</td><td>{r.quality.outOfOrder}</td><td>{r.quality.gaps}</td></tr>)}</tbody></table></div></section></ResponsiveDisclosure><section className="source-panel issue-detail"><div className="panel-heading"><div><h2>Source issue ledger</h2><p>Choose a run to inspect original observations and their findings.</p></div></div><div className="quality-filters"><label>Run<select value={selected} onChange={e => filter('run', e.target.value)}><option value="">Select a run</option>{RUN_MANIFEST.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></label><label>Metric<select value={metric} onChange={e => filter('metric', e.target.value)}><option value="all">All metrics</option>{METRICS.map(m => <option key={m} value={m}>{NAMES[m]}</option>)}</select></label><label>Issue type<select value={kind} onChange={e => filter('kind', e.target.value)}><option value="all">All issue types</option>{KINDS.map(k => <option key={k}>{k}</option>)}</select></label></div>{selected && !run && <p role="alert" className="quality-notice">Unknown run identifier. Choose an available snapshot.</p>}<WorkspaceStatus workspace={workspace} />{run && <>{!accepted ? <div className="empty-panel"><output>{workspace.state.message ? "Source page unavailable. Retry the source query." : "Loading requested source findings…"}</output>{workspace.state.message && <Button variant="secondary" onClick={() => loadLedger()}>Retry findings</Button>}</div> : <><div className="issue-strip" aria-label="Issue locations by recorded step">{workspace.state.issues.filter(i => Number.isFinite(i.step)).map((issue, index) => <Link key={index} aria-label={`${issue.kind} at step ${issue.step}, source ${issue.sourceIndex}`} title={`${issue.kind} · step ${issue.step}`} to={`/runs/${run.id}?sourceIndex=${issue.sourceIndex}&revision=${encodeURIComponent(run.revision)}`} style={{
              left: `${100 * (issue.step - (run.domain?.min ?? 0)) / Math.max(1, (run.domain?.max ?? 1) - (run.domain?.min ?? 0))}%`
            }} />)}<span>Page {(query.page ?? 0) + 1} · findings in the loaded page · recorded step →</span></div>{workspace.state.issues.length ? <div className="table-scroll"><table className="issue-ledger-table"><caption>Page {(query.page ?? 0) + 1} · {workspace.state.issueTotal} findings · original data unchanged</caption><thead><tr><th>Type</th><th>Metric</th><th>Step</th><th>Source</th><th>Raw value</th><th>Details</th></tr></thead><tbody>{workspace.state.issues.map((i, index) => <tr key={`${i.sourceIndex}-${i.kind}-${index}`}><th>{i.kind}</th><td data-label="Metric">{i.metric ? NAMES[i.metric] : 'Structure'}</td><td data-label="Step">{formatStep(i.step)}</td><td data-label="Source">{i.sourceIndex}</td><td data-label="Raw value">{i.value === null ? '—' : formatValue(i.value)}</td><td data-label="Details"><Link className="text-link" to={`/runs/${run.id}?sourceIndex=${i.sourceIndex}&revision=${encodeURIComponent(run.revision)}`}>Inspect source →</Link><small className="exact-value">{i.message}</small></td></tr>)}</tbody></table></div> : active && <div className="empty-panel illustrated-empty"><SoupArt kind="ladle" /><h3>No matching findings</h3><p>This snapshot has no source issues matching these filters.</p></div>}</>}<div className="rows-pagination"><Button variant="secondary" disabled={!accepted || !page} onClick={() => setPage(page - 1)}>Previous findings</Button><span>{accepted ? `Page ${(query.page ?? 0) + 1}` : "Source query pending"}</span><Button variant="secondary" disabled={!accepted || (page + 1) * 50 >= workspace.state.issueTotal} onClick={() => setPage(page + 1)}>Next findings</Button></div></>}</section></>;
}
