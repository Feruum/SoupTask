import { RunQualityPanel } from '../quality/RunQualityPanel';
import { SoupArt } from '@/features/shared/SoupArt';
import { useEffect, useEffectEvent, useLayoutEffect, useState } from 'react';
import { Link, useLocation, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { useCatalog } from '@/features/shared/Catalog';
import { formatStep, formatValue, formatTimestamp, sourceAge } from '@/data/format';
import type { ShellContext } from '@/app/App';
import { useWorkspace } from '@/worker/use-workspace';
import { Charts, Heading, RangeControls, SourceInspector, WorkspaceStatus, issueCount } from '../shared/Workspace';
export function RunPage() {
  const RUN_MANIFEST = useCatalog();
  const {
      runId
    } = useParams(),
    run = RUN_MANIFEST.find(r => r.id === runId);
  return run ? <RunDetail key={run.id} id={run.id} /> : <><Heading title="Run not found" subtitle="This identifier does not match a local snapshot." /><Link className="text-link" to="/runs">Back to training runs</Link></>;
}
function RunDetail({
  id
}: {
  id: string;
}) {
  const RUN_MANIFEST = useCatalog();
  const {
      theme
    } = useOutletContext<ShellContext>(),
    run = RUN_MANIFEST.find(r => r.id === id)!,
    workspace = useWorkspace([id]),
    [parameters] = useSearchParams(),
    [tab, setTab] = useState(parameters.has('sourceIndex') || parameters.has('step') ? 'source' : 'metrics');
  const location = useLocation(),
    sourceKey = parameters.has('sourceIndex') ? `index:${parameters.get('sourceIndex')}:${parameters.get('revision') ?? ''}` : parameters.has('step') ? `step:${parameters.get('step')}:${parameters.get('revision') ?? ''}` : '';
  useLayoutEffect(() => {
    if (sourceKey) {
      // oxlint-disable-next-line react/set-state-in-effect -- A source deep-link navigation opens its corresponding section before paint.
      setTab('source');
    }
  }, [sourceKey, location.key]);
  const staleLink = parameters.has('revision') && parameters.get('revision') !== run.revision;
  const ready = workspace.state.kind === 'ready' || workspace.state.kind === 'refreshing';
  const inspectInitial = useEffectEvent(() => {
    if (staleLink) return;
    if (parameters.has('sourceIndex')) workspace.inspect(id, {
      sourceIndex: Number(parameters.get('sourceIndex'))
    });else if (parameters.has('step')) workspace.inspect(id, {
      step: Number(parameters.get('step'))
    });
  });
  useEffect(() => {
    if (ready) inspectInitial();
  }, [ready, id, parameters]);
  return <><Link className="back-link" to="/runs">← All training runs</Link><Heading title={run.name} subtitle={`${run.model} · ${run.method} · ${run.status} · Snapshot ${formatTimestamp(run.sourceUpdatedAt)}`} /><nav className="section-tabs" aria-label="Run sections">{['metrics', 'quality', 'source', 'information'].map(t => <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>{t === 'quality' ? 'Data quality' : t === 'information' ? 'Run information' : t[0].toUpperCase() + t.slice(1)}</button>)}</nav><dl className="summary-grid detail-summary"><div><dt>Latest loss</dt><dd>{run.summaries.loss.latestStatus === 'finite' ? formatValue(run.summaries.loss.latest) : run.summaries.loss.latestStatus}</dd><dd className="summary-context">{run.summaries.loss.latestStep === null ? 'No recorded step' : `Highest recorded step ${formatStep(run.summaries.loss.latestStep)}`}</dd></div><div><dt>Minimum loss</dt><dd>{formatValue(run.summaries.loss.min)}</dd><dd className="summary-context">Whole snapshot · {run.summaries.loss.minStep === null ? run.summaries.loss.min === null ? 'No finite measurements' : 'Unplottable source step' : `step ${formatStep(run.summaries.loss.minStep)}`}</dd></div><div><dt>Peak loss</dt><dd data-testid="peak-loss">{formatValue(run.summaries.loss.max)}</dd><dd className="summary-context">Whole snapshot · {run.summaries.loss.maxStep === null ? run.summaries.loss.max === null ? 'No finite measurements' : 'Unplottable source step' : `step ${formatStep(run.summaries.loss.maxStep)}`}</dd></div><div><dt>Raw observations</dt><dd>{formatStep(run.rowCount)}</dd><dd className="summary-context">Immutable source rows</dd></div></dl>{issueCount(run.quality) > 0 && <Link className="quality-notice" to={`/data-quality?run=${id}`}>{issueCount(run.quality)} source findings. Inspect invalid values, duplicates and gaps →</Link>}<WorkspaceStatus workspace={workspace} />{sourceAge(run.sourceUpdatedAt).stale && <p className="quality-notice">Stale source snapshot · older than 24 hours. Refreshing this demo does not change its source timestamp.</p>}{staleLink && <p className="quality-notice" role="alert">This source link belongs to an older revision. Its row was not inspected. <Link to={`/runs/${id}`}>Open current snapshot</Link></p>}{workspace.state.view && <div data-testid="accepted-view" data-run-id={id} data-revision={run.revision} data-view-seq={workspace.state.view.viewSeq}>{tab === 'metrics' && <><RangeControls workspace={workspace} /><Charts workspace={workspace} ids={[id]} theme={theme} /><p className="small-note">Source values remain unchanged. Whole-run cards do not change with zoom.</p></>}{tab === 'source' && <SourceInspector key={sourceKey} workspace={workspace} runId={id} />}</div>}{tab === 'quality' && <RunQualityPanel workspace={workspace} run={run} />}{tab === 'information' && <section className="source-panel"><div className="panel-heading recipe-heading"><div><h2>Run information</h2><p>The recipe behind this snapshot.</p></div><SoupArt kind="recipe" /></div><dl className="information-grid">{Object.entries({
          Seed: run.seed,
          Generator: run.generatorVersion,
          Scenario: run.scenario,
          'Scenario version': run.scenarioVersion,
          Revision: run.revision,
          'Expected cadence': run.expectedCadence ?? 'Unspecified',
          'Source snapshot': run.sourceUpdatedAt,
          'Raw rows': run.rowCount,
          'Last source status': run.summaries.loss.latestStatus
        }).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{String(v)}</dd></div>)}</dl></section>}<p className="demo-footnote">Demo snapshot. No live training or automatic stopping recommendation.</p></>;
}
