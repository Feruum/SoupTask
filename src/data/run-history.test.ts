import { expect, it } from 'vitest';
import { RUNS } from './catalog';
import { HISTORY_AS_OF, historyDays, runHistory, historyDayDescription } from './run-history';

it('accounts for every known run once in a deterministic 90-day UTC history', () => {
  const events = runHistory(RUNS), days = historyDays(events);
  expect(events).toEqual(runHistory(RUNS));
  expect(days).toHaveLength(90);
  expect(days.at(-1)?.date).toBe(HISTORY_AS_OF);
  expect(days.flatMap(day => day.runs).map(run => run.runId).sort()).toEqual(RUNS.map(run => run.id).sort());
  expect(days.find(day => day.date === '2026-11-09')?.runs.map(run => run.runId)).toEqual(['kazakh-sft-005', 'kazakh-sft-006']);
  expect(historyDayDescription(days.at(-1)!)).toBe('Nov 10, 2026 · 0 runs started');
});

it('does not invent events for unknown runs, and distinguishes running from finished fixtures', () => {
  expect(runHistory([{ id: 'unknown', status: 'Running' }])).toEqual([]);
  for (const event of runHistory(RUNS)) {
    if (event.status === 'Running') expect(event.finishedAt).toBeUndefined();
    else expect(Date.parse(event.finishedAt!)).toBeGreaterThan(Date.parse(event.startedAt));
  }
  expect(runHistory(RUNS.filter(run => run.id === 'kazakh-sft-005'))).toHaveLength(1);
});
