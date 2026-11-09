import { describe, expect, it } from 'vitest';
import { RUNS, METRICS } from '../data/catalog';
import { generateRun, mulberry32 } from '../data/generator';
import { normalize, sampleView } from '../core/engine';
import { buildRunIndex, sampleIndexed, queryBlockIndex } from './block-index';
describe('exact compact block index', () => {
  it('preserves exact million spike across windows, boundaries and fractional widths', () => {
    const n = normalize(generateRun(RUNS[4]), RUNS[4]),
      index = buildRunIndex(n);
    expect(index.byteLength).toBeLessThan(2_000_000);
    expect(index.buildMs).toBeGreaterThanOrEqual(0);
    for (const [a, b] of [[0, 999999], [500001, 500001], [500000, 500001], [500001, 500002], [499990, 500000], [500002, 500020], [255, 512], [256, 511]]) {
      for (const width of [.5, 1, 5, 320.8, 1440]) {
        expect(sampleIndexed(n, index, 'loss', a, b, width)).toEqual(sampleView(n, 'loss', a, b, width, 'scan'));
      }
    }
  });
  it('queries exact partial micro/block boundaries with earliest ties', () => {
    const raw = generateRun({
      ...RUNS[0],
      rowCount: 1025
    });
    raw.loss.fill(3);
    raw.loss[255] = -10;
    raw.loss[256] = -10;
    raw.loss[511] = 8;
    raw.loss[512] = 8;
    const n = normalize(raw),
      index = buildRunIndex(n).metrics.loss!;
    for (const begin of [0, 1, 15, 16, 17, 254, 255, 256, 257, 511, 512, 1024]) {
      for (const end of [begin, begin + 1, Math.min(1025, begin + 16), Math.min(1025, begin + 256), 1025]) {
        let min = -1,
          max = -1;
        for (let g = begin; g < end; g++) {
          if (min < 0 || raw.loss[g] < raw.loss[min]) min = g;
          if (max < 0 || raw.loss[g] > raw.loss[max]) max = g;
        }
        expect(queryBlockIndex(index, begin, end)).toEqual({
          min,
          max
        });
      }
    }
  });
  it('matches both scanners on irregular X, unsorted source and equal duplicates', () => {
    const random = mulberry32(71);
    for (const fixture of [RUNS[0], RUNS[8], RUNS[10], RUNS[17], RUNS[18]]) {
      const raw = generateRun(fixture);
      if (fixture.id === RUNS[0].id) {
        let step = 0;
        for (let i = 0; i < raw.step.length; i++) {
          step += 1 + Math.floor(random() * 19);
          raw.step[i] = step;
        }
      }
      const n = normalize(raw, fixture.id === RUNS[0].id ? undefined : fixture),
        index = buildRunIndex(n);
      const domain = n.domain!;
      for (let query = 0; query < 20; query++) {
        const left = domain.min + (domain.max - domain.min) * random();
        const right = left + (domain.max - left) * random();
        const width = .5 + random() * 600;
        for (const metric of METRICS) {
          const expected = sampleView(n, metric, left, right, width, 'scan');
          expect(sampleView(n, metric, left, right, width, 'stream')).toEqual(expected);
          expect(sampleIndexed(n, index, metric, left, right, width)).toEqual(expected);
        }
      }
    }
  });
  it('delegates every gap/conflict/invalid topology to the unchanged exact scanner', () => {
    for (const fixture of [RUNS[5], RUNS[6], RUNS[7], RUNS[9], RUNS[11], RUNS[16]]) {
      const n = normalize(generateRun(fixture), fixture),
        index = buildRunIndex(n);
      for (const metric of METRICS) {
        for (const width of [1, 320]) expect(sampleIndexed(n, index, metric, n.domain!.min, n.domain!.max, width)).toEqual(sampleView(n, metric, n.domain!.min, n.domain!.max, width));
      }
    }
    const raw = generateRun({
      ...RUNS[0],
      rowCount: 16385
    });
    for (let i = 1; i < raw.loss.length; i += 2) raw.loss[i] = NaN;
    const n = normalize(raw),
      index = buildRunIndex(n);
    expect(index.metrics.loss).toBeNull();
    expect(sampleIndexed(n, index, 'loss', 0, 16384, 1)).toEqual(sampleView(n, 'loss', 0, 16384, 1));
    expect(sampleIndexed(n, index, 'loss', 0, 16384, 1).mode).toBe('disconnected-extrema');
  });
  it('validates bounds on empty data, rejects foreign revision indexes and counts unique buffers', () => {
    const n = normalize(generateRun({
        ...RUNS[0],
        rowCount: 0
      })),
      index = buildRunIndex(n);
    expect(sampleIndexed(n, index, 'loss', 0, 1, 1)).toEqual(sampleView(n, 'loss', 0, 1, 1));
    expect(() => sampleIndexed(n, index, 'loss', NaN, 1, 1)).toThrow();
    expect(() => sampleIndexed(n, index, 'loss', -Number.MAX_VALUE, Number.MAX_VALUE, 1)).toThrow();
    expect(() => sampleIndexed(n, index, 'loss', 0, 1, 0)).toThrow();
    expect(() => sampleIndexed(normalize(generateRun(RUNS[18])), index, 'loss', 0, 1, 1)).toThrow(/another/);
    const singleton = buildRunIndex(normalize(generateRun(RUNS[18])));
    const buffers = new Set<ArrayBufferLike>();
    let expectedBytes = 0;
    for (const metric of Object.values(singleton.metrics)) if (metric) for (const array of [metric.blockMin, metric.blockMax, metric.microMin, metric.microMax]) {
      if (!buffers.has(array.buffer)) {
        buffers.add(array.buffer);
        expectedBytes += array.buffer.byteLength;
      }
    }
    expect(singleton.byteLength).toBe(expectedBytes);
    const active = singleton.metrics.loss!;
    for (const [a, b] of [[NaN, 1], [0, 1.1], [-1, 0], [1, 0], [0, 2]]) expect(() => queryBlockIndex(active, a, b)).toThrow();
  });
  it('indexes identical duplicates without cadence and preserves original tie references', () => {
    const raw = {
      step: Float64Array.of(2, 0, 1, 1, 3),
      loss: Float64Array.of(4, 4, 4, 4, 4),
      lr: Float64Array.of(1, 1, 1, 1, 1),
      grad_norm: Float64Array.of(2, 2, 2, 2, 2)
    };
    const n = normalize(raw),
      index = buildRunIndex(n);
    expect(index.metrics.loss).not.toBeNull();
    expect(sampleIndexed(n, index, 'loss', 0, 3, 1)).toEqual(sampleView(n, 'loss', 0, 3, 1));
    expect(sampleIndexed(n, index, 'loss', 1, 1, 1).points[0].sourceIndex).toBe(2);
  });
});
