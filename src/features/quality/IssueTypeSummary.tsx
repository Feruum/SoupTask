import { Link } from 'react-router-dom';
import type { RunManifestEntry } from '@/data/types';
import { formatStep } from '@/data/format';
import { issueTypeCounts } from './issue-summary';
import styles from './quality-panels.module.css';
export function IssueTypeSummary({
  entries,
  title = 'Issue types across the workspace',
  runId
}: {
  entries: readonly RunManifestEntry[];
  title?: string;
  runId?: string;
}) {
  return <section className={`source-panel ${styles.summary}`} aria-labelledby={runId ? 'run-issue-types-title' : 'workspace-issue-types-title'}><div className="panel-heading"><div><h2 id={runId ? 'run-issue-types-title' : 'workspace-issue-types-title'}>{title}</h2><p>Source-derived counts with explicit units.</p></div></div><div className="table-scroll"><table data-testid={runId ? 'run-issue-types' : 'workspace-issue-types'}><caption>Categories overlap. Counts with different units do not sum to affected rows.</caption><thead><tr><th scope="col">Category</th><th scope="col">Count</th><th scope="col">Unit</th></tr></thead><tbody>{issueTypeCounts(entries).map(row => <tr key={row.category}><th scope="row"><Link to={`/data-quality?${runId ? `run=${runId}&` : ''}kind=${row.kind}`}>{row.category}</Link></th><td>{formatStep(row.count)}</td><td>{row.unit}</td></tr>)}</tbody></table></div></section>;
}
