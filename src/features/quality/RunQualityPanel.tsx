import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { RunManifestEntry } from '@/data/types';
import { formatStep, formatValue } from '@/data/format';
import type { Workspace } from '../shared/Workspace';
import { Button } from '@/components/arc/button/button';
import { IssueTypeSummary } from './IssueTypeSummary';
import styles from './quality-panels.module.css';
export function RunQualityPanel({
  workspace,
  run
}: {
  workspace: Workspace;
  run: RunManifestEntry;
}) {
  const [page, setPage] = useState(0);
  const ready = Boolean(workspace.state.runs[run.id]) && workspace.state.kind === 'ready';
  const query = workspace.state.issuesQuery;
  const accepted = ready && !workspace.state.issuesPending && query !== null && query.runId === run.id && query.page === page && query.pageSize === 50 && !query.metric && !query.kind;
  const loading = !accepted;
  const loadIssues = workspace.loadIssues;
  const request = useCallback(() => loadIssues(run.id, {
    page
  }), [loadIssues, run.id, page]);
  useEffect(() => {
    if (ready) request();
  }, [ready, request]);
  const href = (sourceIndex: number) => `/runs/${run.id}?sourceIndex=${sourceIndex}&revision=${encodeURIComponent(run.revision)}`;
  return <div className={styles.runAudit}><IssueTypeSummary entries={[run]} title="Data quality in this snapshot" runId={run.id} /><section className="source-panel" aria-labelledby="run-issue-ledger-title"><div className="panel-heading"><div><h2 id="run-issue-ledger-title">Source issue locations</h2><p>{accepted ? `Page ${(query.page ?? 0) + 1}` : `Requested page ${page + 1}`} · up to 50 source findings. Only finite step coordinates appear in the strip.</p></div><Link className="text-link" to={`/data-quality?run=${run.id}`}>Open full audit →</Link></div>{loading ? <div className={styles.loading}><output>{workspace.state.message ? 'Source page unavailable. Retry the source query.' : 'Loading source findings…'}</output>{workspace.state.message && <Button variant="secondary" onClick={() => request()}>Retry findings</Button>}</div> : <><div className={styles.strip} data-testid="run-issue-strip" aria-label="Recorded step locations for findings on the loaded page">{workspace.state.issues.filter(issue => Number.isFinite(issue.step)).map((issue, index) => <Link key={`${issue.sourceIndex}-${index}`} to={href(issue.sourceIndex)} aria-label={`Inspect ${issue.kind} at step ${issue.step}, source ${issue.sourceIndex}`} title={`${issue.kind} · source ${issue.sourceIndex}`} style={{
            left: `${100 * (issue.step - (run.domain?.min ?? 0)) / Math.max(1, (run.domain?.max ?? 1) - (run.domain?.min ?? 0))}%`
          }} />)}<span>Recorded step → · {workspace.state.issues.length} of {workspace.state.issueTotal} findings loaded</span></div>{workspace.state.issues.length ? <div className="table-scroll"><table data-testid="run-issue-ledger"><caption>Loaded source page only. Raw measurements are unchanged.</caption><thead><tr><th scope="col">Issue</th><th scope="col">Metric</th><th scope="col">Recorded step</th><th scope="col">Source index</th><th scope="col">Original value</th><th scope="col">Inspect</th></tr></thead><tbody>{workspace.state.issues.map((issue, index) => <tr key={`${issue.sourceIndex}-${issue.kind}-${index}`}><th scope="row">{issue.kind}</th><td>{issue.metric ?? 'Structure'}</td><td>{formatStep(issue.step)}</td><td>{issue.sourceIndex}</td><td>{issue.value === null ? 'Not a metric observation' : formatValue(issue.value, issue.metric === 'lr')}</td><td><Link className="text-link" to={href(issue.sourceIndex)}>Inspect source {issue.sourceIndex}</Link><small className="exact-value">{issue.message}</small></td></tr>)}</tbody></table></div> : <div className={styles.loading}><p>No source findings in this snapshot.</p></div>}</>}<div className="rows-pagination"><Button variant="secondary" disabled={loading || page === 0} onClick={() => {
          setPage(page - 1);
        }}>Previous issue page</Button><span>{loading ? 'Source query pending' : `${workspace.state.issueTotal} total findings`}</span><Button variant="secondary" disabled={loading || (page + 1) * 50 >= workspace.state.issueTotal} onClick={() => {
          setPage(page + 1);
        }}>Next issue page</Button></div></section></div>;
}
