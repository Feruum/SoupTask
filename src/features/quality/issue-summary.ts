import { ISSUE_LABELS } from './issue-labels';
import type { IssueKind, RunManifestEntry } from '@/data/types';
export interface IssueTypeCount {
  kind: IssueKind;
  category: string;
  unit: string;
  count: number;
}
export function issueTypeCounts(entries: readonly Pick<RunManifestEntry, 'quality'>[]): IssueTypeCount[] {
  const sum = (key: 'nan' | 'posInf' | 'negInf' | 'duplicateRows' | 'duplicateGroups' | 'conflictGroups' | 'invalidX' | 'outOfOrder' | 'gaps') => entries.reduce((total, run) => total + run.quality[key], 0);
  return [{
    kind: 'nan',
    category: ISSUE_LABELS.nan,
    unit: 'metric observations',
    count: sum('nan')
  }, {
    kind: 'posInf',
    category: ISSUE_LABELS.posInf,
    unit: 'metric observations',
    count: sum('posInf')
  }, {
    kind: 'negInf',
    category: ISSUE_LABELS.negInf,
    unit: 'metric observations',
    count: sum('negInf')
  }, {
    kind: 'duplicate',
    category: 'Additional duplicate rows',
    unit: 'raw rows beyond the first group member',
    count: sum('duplicateRows')
  }, {
    kind: 'duplicate',
    category: 'Duplicate steps',
    unit: 'step groups',
    count: sum('duplicateGroups')
  }, {
    kind: 'conflict',
    category: ISSUE_LABELS.conflict,
    unit: 'metric groups',
    count: sum('conflictGroups')
  }, {
    kind: 'invalidX',
    category: ISSUE_LABELS.invalidX,
    unit: 'raw rows',
    count: sum('invalidX')
  }, {
    kind: 'outOfOrder',
    category: ISSUE_LABELS.outOfOrder,
    unit: 'descending source-order transitions',
    count: sum('outOfOrder')
  }, {
    kind: 'gap',
    category: ISSUE_LABELS.gap,
    unit: 'missing intervals',
    count: sum('gaps')
  }];
}
