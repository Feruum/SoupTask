import type { IssueKind } from '@/data/types';
export const ISSUE_LABELS: Record<IssueKind, string> = {
  nan: 'NaN',
  posInf: '+Infinity',
  negInf: '−Infinity',
  duplicate: 'Duplicate steps',
  conflict: 'Conflicting measurements',
  invalidX: 'Invalid step coordinates',
  outOfOrder: 'Out-of-order source',
  gap: 'Known cadence gaps'
};
