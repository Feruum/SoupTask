import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { runRepository } from '@/data/repository';
import type { RunRepository } from '@/data/repository';
import type { RunManifestEntry } from '@/data/types';
import { Button } from '@/components/arc/button/button';
const CatalogContext = createContext<readonly RunManifestEntry[]>([]);
export const useCatalog = () => useContext(CatalogContext);
export function CatalogBoundary({
  children,
  repository = runRepository
}: {
  children: ReactNode;
  repository?: RunRepository;
}) {
  const [state, setState] = useState<{
      kind: 'loading' | 'ready' | 'error';
      entries: readonly RunManifestEntry[];
      message?: string;
    }>({
      kind: 'loading',
      entries: []
    }),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const abort = new AbortController();
    let disposed = false;
    // oxlint-disable-next-line react/set-state-in-effect -- Reset the externally loaded catalog when its repository/attempt changes.
    setState({
      kind: 'loading',
      entries: []
    });
    repository.list({
      signal: abort.signal
    }).then(entries => {
      if (!disposed) setState({
        kind: 'ready',
        entries
      });
    }, error => {
      if (!disposed) setState({
        kind: 'error',
        entries: [],
        message: error instanceof Error ? error.message : 'The run catalog could not load.'
      });
    });
    return () => {
      disposed = true;
      abort.abort();
    };
  }, [repository, attempt]);
  if (state.kind === 'loading') return <section className="loading-layout" aria-label="Loading run catalog"><output>Loading snapshot catalog…</output><div className="loading-summary" /></section>;
  if (state.kind === 'error') return <section className="error-state" role="alert"><h1 id="page-title" tabIndex={-1}>Could not load training runs</h1><p>{state.message}</p><Button onClick={() => setAttempt(attempt + 1)}>Retry catalog</Button></section>;
  if (!state.entries.length) return <section className="empty-panel"><h1 id="page-title" tabIndex={-1}>No training runs</h1><p>This repository contains no snapshots. No generated measurements have been substituted.</p><Button variant="secondary" onClick={() => setAttempt(attempt + 1)}>Reload catalog</Button></section>;
  return <CatalogContext.Provider value={state.entries}>{children}</CatalogContext.Provider>;
}
