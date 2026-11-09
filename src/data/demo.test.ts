import { describe, it, expect } from 'vitest';
import { RUNS } from './catalog';
import { generateRun } from './generator';
import { normalize, sampleView, inspectStep, sourcePage, issuePage } from '../core/engine';
import type { RawColumns } from './types';
const columns = (x: number[], y: number[]): RawColumns => ({
  step: Float64Array.from(x),
  loss: Float64Array.from(y),
  lr: Float64Array.from(y),
  grad_norm: Float64Array.from(y)
});
describe('production source contracts', () => {
  it('generates twenty versioned datasets with exact million spike and four columns', () => {
    expect(RUNS).toHaveLength(20);
    const raw = generateRun(RUNS[4]);
    expect(raw.step.length).toBe(1_000_000);
    expect(Object.values(raw).reduce((s, a) => s + a.byteLength, 0)).toBe(32_000_000);
    expect(raw.loss[500001]).toBe(100);
    expect(raw.step[500001]).toBe(500001);
    let count = 0;
    for (const y of raw.loss) if (y === 100) count++;
    expect(count).toBe(1);
    expect(generateRun(RUNS[18]).step.length).toBe(1);
  });
  it('keeps repeated seeded raw columns identical', () => {
    for (const run of [RUNS[0], RUNS[8], RUNS[10]]) {
      const a = generateRun(run),
        b = generateRun(run);
      for (const key of ['step', 'loss', 'lr', 'grad_norm'] as const) expect(a[key]).toEqual(b[key]);
    }
  });
  it('groups duplicates, exposes conflict extrema and does not mutate arrival order', () => {
    const raw = columns([3, 1, 2, 2, 4, NaN], [1, 2, 3, 9, NaN, -10]),
      before = raw.step.slice(),
      n = normalize(raw),
      v = sampleView(n, 'loss', 1, 4, 1);
    expect(raw.step).toEqual(before);
    expect(n.quality.duplicateRows).toBe(1);
    expect(n.quality.invalidX).toBe(1);
    expect(v.conflicts.map(p => p.value)).toEqual([3, 9]);
    expect(v.max).toBe(9);
    expect(inspectStep(n, 2).map(r => r.sourceIndex)).toEqual([2, 3]);
    expect(n.summaries.loss.latestStatus).toBe('invalid');
    expect(n.summaries.loss.min).toBe(-10);
  });
  it('keeps nonfinite types, zeros and latest conflict honest', () => {
    const n = normalize(columns([0, 1, 2, 3, 3], [0, NaN, Infinity, 1, -Infinity]));
    expect(n.quality.metrics.loss).toMatchObject({
      nan: 1,
      posInf: 1,
      negInf: 1,
      conflicts: 1
    });
    expect(n.summaries.loss.latestStatus).toBe('conflict');
    expect(n.summaries.loss.latest).toBeNull();
    expect(sampleView(n, 'loss', 0, 3, 1).points[0].value).toBe(0);
    expect(issuePage(n, {
      kind: 'negInf',
      metric: 'loss'
    }).rows[0].value).toBe(-Infinity);
  });
  it('retains singleton between invalids with distinct segment identities', () => {
    const n = normalize(columns([0, 1, 2, 3, 4], [1, NaN, 100, NaN, 2])),
      v = sampleView(n, 'loss', 0, 4, 1);
    expect(v.points.map(p => p.sourceIndex)).toEqual([0, 2, 4]);
    expect(new Set(v.points.map(p => p.segment)).size).toBe(3);
    expect(v.breaks).toHaveLength(2);
  });
  it('known cadence breaks connectivity but unspecified sparse data does not', () => {
    const raw = columns([0, 1, 4, 5], [1, 2, 3, 4]),
      a = normalize(raw, {
        ...RUNS[0],
        expectedCadence: 1
      }),
      b = normalize(raw);
    expect(sampleView(a, 'loss', 0, 5, 1).breaks).toHaveLength(1);
    expect(sampleView(b, 'loss', 0, 5, 1).breaks).toHaveLength(0);
  });
  it('bounds raw pagination and validates public boundaries even on empty input', () => {
    const n = normalize(columns([], []));
    for (const args of [[0, 1, 0], [0, NaN, 1], [2, 1, 1], [-Number.MAX_VALUE, Number.MAX_VALUE, 1]]) expect(() => sampleView(n, 'loss', ...(args as [number, number, number]))).toThrow();
    expect(sourcePage(n)).toEqual([]);
    expect(() => sourcePage(n, -1)).toThrow();
    expect(() => sourcePage(n, 0, 100)).toThrow();
    expect(() => sampleView(n, 'loss', 0, 1, 1, 'bad' as 'scan')).toThrow();
  });
});
it('empty and all-invalid windows keep no finite values; sampling leaves every source column unchanged', () => {
  const raw = generateRun({
    ...RUNS[0],
    rowCount: 12
  });
  const copies = Object.values(raw).map(a => a.slice());
  const n = normalize(raw);
  sampleView(n, 'loss', 0, 11, 1);
  Object.values(raw).forEach((a, j) => expect(a).toEqual(copies[j]));
  raw.loss.fill(NaN);
  const invalid = normalize(raw),
    view = sampleView(invalid, 'loss', 0, 11, 1);
  expect(view.min).toBeNull();
  expect(view.max).toBeNull();
  expect(view.points).toEqual([]);
  expect(sampleView(n, 'loss', 50, 60, 320).points).toEqual([]);
});
it('a loss conflict does not invalidate identical learning-rate duplicates', () => {
  const raw = columns([0, 1, 1, 2], [1, 2, 8, 1]);
  raw.lr = Float64Array.of(0, .1, .1, .2);
  const n = normalize(raw);
  expect(n.states.loss[1]).toBe(2);
  expect(n.states.lr[1]).toBe(0);
  expect(sampleView(n, 'lr', 0, 2, 320).points.map(p => p.value)).toEqual([0, .1, .2]);
  expect(n.quality.metrics.lr.conflicts).toBe(0);
});
it('structural issue ledger matches finite arrival transitions across invalid X', () => {
  const n = normalize(columns([3, NaN, 1], [1, 2, 3]));
  expect(n.quality.outOfOrder).toBe(1);
  expect(issuePage(n, {
    kind: 'outOfOrder'
  }).total).toBe(1);
  expect(issuePage(n, {
    kind: 'invalidX',
    metric: 'loss'
  }).total).toBe(1);
});
it('raw extrema ties use earliest numeric step and original source identity', () => {
  const n = normalize(columns([9, 2, 2, 4], [7, 7, 7, 7]));
  expect(n.summaries.loss.minStep).toBe(2);
  expect(n.summaries.loss.maxStep).toBe(2);
  expect(sampleView(n, 'loss', 0, 10, 1).points.map(p => p.sourceIndex)).toEqual([1, 0]);
});
it('signed zero remains inspectable; finite plus nonfinite duplicate has no canonical winner', () => {
  const raw = columns([0, 1, 1], [-0, 5, NaN]),
    n = normalize(raw);
  expect(Object.is(sourcePage(n)[0].loss, -0)).toBe(true);
  expect(n.states.loss[1]).toBe(2);
  expect(n.representative.loss[1]).toBe(-1);
  expect(sampleView(n, 'loss', 0, 1, 10).conflicts[0].value).toBe(5);
});
it('fractional plot widths preserve the exact million spike', () => {
  const raw = generateRun(RUNS[4]),
    n = normalize(raw, RUNS[4]);
  for (const width of [.5, 1.1, 320.8]) {
    const v = sampleView(n, 'loss', 500000, 500002, width);
    expect(v.points.some(p => p.sourceIndex === 500001 && p.value === 100)).toBe(true);
  }
});
