import type { RunDescriptor } from './types';

export const HISTORY_AS_OF = '2026-11-10';
export const HISTORY_VERSION = 'demo-history-1';
const DAY = 86_400_000;
// Explicit fixture metadata, independent of measurement generation/sourceUpdatedAt.
// Repeated offsets represent multiple experiments started on the same day.
const startOffsets = [2, 4, 7, 7, 1, 1, 15, 15, 23, 2, 23, 34, 45, 45, 56, 63, 72, 72, 83, 10];
export interface RunHistoryEntry {
  runId: string;
  status: RunDescriptor['status'];
  startedAt: string;
  finishedAt?: string;
}
export interface HistoryDay { date: string; runs: RunHistoryEntry[] }

export function runHistory(runs: readonly Pick<RunDescriptor, 'id' | 'status'>[]): RunHistoryEntry[] {
  const anchor = Date.parse(`${HISTORY_AS_OF}T08:00:00Z`);
  return runs.flatMap(run => {
    const index = startOffsets.findIndex((_, i) => run.id === `kazakh-sft-${String(i + 1).padStart(3, '0')}`);
    if (index < 0) return []; // Unknown runs have no invented history.
    const started = anchor - startOffsets[index] * DAY;
    return [{ runId: run.id, status: run.status, startedAt: new Date(started).toISOString(),
      ...(run.status === 'Running' ? {} : { finishedAt: new Date(started + 3_600_000 * (run.status === 'Completed' ? 3 : 1)).toISOString() }) }];
  });
}

export function historyDays(entries: readonly RunHistoryEntry[]): HistoryDay[] {
  const end = Date.parse(`${HISTORY_AS_OF}T00:00:00Z`);
  const grouped = new Map<string, RunHistoryEntry[]>();
  for (const entry of entries) {
    const day = entry.startedAt.slice(0, 10);
    grouped.set(day, [...(grouped.get(day) ?? []), entry]);
  }
  return Array.from({ length: 90 }, (_, i) => {
    const date = new Date(end - (89 - i) * DAY).toISOString().slice(0, 10);
    return { date, runs: grouped.get(date) ?? [] };
  });
}

export function historyDateLabel(date: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}

export function historyDayDescription(day: HistoryDay): string {
  const count = day.runs.length;
  const statuses = [...new Set(day.runs.map(run => run.status))]
    .map(status => `${day.runs.filter(run => run.status === status).length} ${status.toLowerCase()}`);
  return `${historyDateLabel(day.date)} · ${count} ${count === 1 ? 'run' : 'runs'} started${statuses.length ? ` · ${statuses.join(', ')}` : ''}`;
}
