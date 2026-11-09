import { it, expect } from 'vitest';
import { generateRun, mulberry32 } from '../data/generator';
import { RUNS } from '../data/catalog';
import { normalize, sampleView } from './engine';
const raw = generateRun(RUNS[4]),
  n = normalize(raw, RUNS[4]);
for (const width of [1, 320, 768, 1440]) it(`exact spike provenance width ${width}`, () => {
  const v = sampleView(n, 'loss', 0, 999999, width);
  expect(v.points.some(p => p.sourceIndex === 500001 && p.step === 500001 && p.value === 100)).toBe(true);
  expect(v.max).toBe(100);
});
it('excludes offscreen spike and includes inclusive endpoints/single step', () => {
  for (const [a, b] of [[499990, 500000], [500002, 500010]]) expect(sampleView(n, 'loss', a, b, 2).max).toBeLessThan(100);
  for (const [a, b] of [[500001, 500001], [500000, 500001], [500001, 500002]]) expect(sampleView(n, 'loss', a, b, 1).points.some(p => p.sourceIndex === 500001)).toBe(true);
});
it('independent raw-window oracle preserves both extrema and exact provenance on seeded cases', () => {
  const random = mulberry32(99);
  for (let test = 0; test < 100; test++) {
    const raw = generateRun({
      ...RUNS[0],
      rowCount: 301,
      seed: test
    });
    let step = 0;
    for (let i = 0; i < 301; i++) {
      step += 1 + Math.floor(random() * 10);
      raw.step[i] = step;
    }
    raw.loss[100] = -20;
    raw.loss[101] = NaN;
    const n = normalize(raw);
    const a = raw.step[10 + Math.floor(random() * 100)],
      b = raw.step[200 + Math.floor(random() * 100)],
      width = 1 + Math.floor(random() * 40);
    let low = Infinity,
      high = -Infinity;
    for (let i = 0; i < 301; i++) if (raw.step[i] >= a && raw.step[i] <= b && Number.isFinite(raw.loss[i])) {
      low = Math.min(low, raw.loss[i]);
      high = Math.max(high, raw.loss[i]);
    }
    const v = sampleView(n, 'loss', a, b, width);
    expect(v.min).toBe(low);
    expect(v.max).toBe(high);
    for (const p of [...v.points, ...v.conflicts]) {
      expect(p.step).toBe(raw.step[p.sourceIndex]);
      expect(p.value).toBe(raw.loss[p.sourceIndex]);
      expect(p.step >= a && p.step <= b).toBe(true);
    }
    expect(sampleView(n, 'loss', a, b, width, 'scan')).toEqual(v);
  }
});
it('discloses dense disconnected mode while retaining exact finite extrema', () => {
  const raw = generateRun({
    ...RUNS[0],
    rowCount: 50000
  });
  for (let i = 1; i < 50000; i += 2) raw.loss[i] = NaN;
  raw.loss[25000] = 100;
  const n = normalize(raw),
    v = sampleView(n, 'loss', 0, 49999, 320);
  expect(v.mode).toBe('disconnected-extrema');
  expect(v.points).toHaveLength(0);
  expect(v.conflicts.length).toBeLessThanOrEqual(640);
  expect(v.max).toBe(100);
});
it('independent interval oracle checks every bucket and segment first/min/max/last', () => {
  for (let seed = 1; seed <= 30; seed++) {
    const raw = generateRun({
      ...RUNS[0],
      rowCount: 101,
      seed
    });
    raw.loss[23] = NaN;
    raw.loss[49] = NaN;
    raw.loss[77] = -10;
    const n = normalize(raw),
      a = 3,
      b = 98,
      width = 1 + seed % 12,
      expected = new Set<number>();
    let segment: number[] = [];
    const checkSegment = () => {
      for (let bucket = 0; bucket < width; bucket++) {
        const left = a + (b - a) * bucket / width,
          right = a + (b - a) * (bucket + 1) / width,
          ids = segment.filter(i => raw.step[i] >= left && (bucket === width - 1 ? raw.step[i] <= right : raw.step[i] < right));
        if (!ids.length) continue;
        let low = ids[0],
          high = ids[0];
        for (const i of ids) {
          if (raw.loss[i] < raw.loss[low]) low = i;
          if (raw.loss[i] > raw.loss[high]) high = i;
        }
        for (const i of [ids[0], low, high, ids[ids.length - 1]]) expected.add(i);
      }
      segment = [];
    };
    for (let i = 0; i < 101; i++) {
      if (raw.step[i] < a || raw.step[i] > b) continue;
      if (!Number.isFinite(raw.loss[i])) checkSegment();else segment.push(i);
    }
    checkSegment();
    const actual = sampleView(n, 'loss', a, b, width).points.map(p => p.sourceIndex);
    expect(actual).toEqual([...expected].sort((x, y) => raw.step[x] - raw.step[y]));
  }
});
import { inspectGroup } from './engine';
it('duplicate-group inspection exposes total and every page without unbounded objects', () => {
  const raw = generateRun({
    ...RUNS[0],
    rowCount: 201
  });
  raw.step.fill(5);
  const n = normalize(raw),
    first = inspectGroup(n, 5),
    last = inspectGroup(n, 5, 4);
  expect(first.total).toBe(201);
  expect(first.rows).toHaveLength(50);
  expect(last.rows).toHaveLength(1);
  expect(last.rows[0].sourceIndex).toBe(200);
  expect(inspectGroup(n, 6).total).toBe(0);
  expect(() => inspectGroup(n, 5, -1)).toThrow();
});
it('final pending segment cannot exceed the topology cap after its last flush', () => {
  const raw = generateRun({
    ...RUNS[0],
    rowCount: 16385
  });
  for (let i = 1; i < raw.loss.length; i += 2) raw.loss[i] = NaN;
  const view = sampleView(normalize(raw), 'loss', 0, 16384, 1);
  expect(view.mode).toBe('disconnected-extrema');
  expect(view.points.length + view.conflicts.length + view.breaks.length).toBeLessThanOrEqual(16384);
});
