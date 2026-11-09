import { expect, it } from 'vitest';
import { RUN_MANIFEST } from '@/data/manifest';
import { issueTypeCounts } from './issue-summary';
it('keeps duplicate rows, step groups and conflicting metric groups as different units', () => {
  const run = RUN_MANIFEST.find(entry => entry.id === 'kazakh-sft-010')!;
  const rows = issueTypeCounts([run]);
  expect(rows.find(row => row.category === 'Additional duplicate rows')).toMatchObject({
    count: 2,
    unit: 'raw rows beyond the first group member'
  });
  expect(rows.find(row => row.category === 'Duplicate steps')).toMatchObject({
    count: 2,
    unit: 'step groups'
  });
  expect(rows.find(row => row.kind === 'conflict')).toMatchObject({
    count: 6,
    unit: 'metric groups'
  });
});
it('aggregates source categories without conflating nonfinite observations with duplicate groups', () => {
  const rows = issueTypeCounts(RUN_MANIFEST.filter(entry => ['kazakh-sft-006', 'kazakh-sft-007'].includes(entry.id)));
  expect(rows.find(row => row.kind === 'nan')?.count).toBe(2);
  expect(rows.find(row => row.kind === 'posInf')?.count).toBe(1);
  expect(rows.find(row => row.category === 'Duplicate steps')?.count).toBe(0);
});
