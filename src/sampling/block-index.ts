import { METRICS } from '../data/catalog.ts';
import type { Metric, MetricRenderView, RenderPoint } from '../data/types.ts';
import { lowerBound, upperBound, sampleView } from '../core/engine.ts';
import type { NormalizedRun } from '../core/engine.ts';
export const BLOCK_SIZE = 256;
export const MICRO_SIZE = 16;
export const INDEX_VERSION = 'exact-block-1.0.0';
export interface MetricBlockIndex {
  owner: NormalizedRun;
  metric: Metric;
  capacity: number;
  blockMin: Int32Array;
  blockMax: Int32Array;
  microMin: Int32Array;
  microMax: Int32Array;
}
export interface RunBlockIndex {
  owner: NormalizedRun;
  metrics: Record<Metric, MetricBlockIndex | null>;
  buildMs: number;
  byteLength: number;
  version: string;
}
function pick(n: NormalizedRun, metric: Metric, a: number, b: number, minimum: boolean): number {
  if (a < 0) return b;
  if (b < 0) return a;
  const values = n.raw[metric],
    representatives = n.representative[metric];
  const av = values[representatives[a]],
    bv = values[representatives[b]];
  if (av === bv) return Math.min(a, b);
  return minimum ? av < bv ? a : b : av > bv ? a : b;
}
function buildMetric(n: NormalizedRun, metric: Metric): MetricBlockIndex | null {
  const count = n.x.length,
    quality = n.quality.metrics[metric];
  // Topology is not approximated by this index. Its exact scanner remains active.
  if (!count || quality.invalidCount || quality.conflicts || quality.gaps) return null;
  const micros = Math.ceil(count / MICRO_SIZE),
    blocks = Math.ceil(count / BLOCK_SIZE);
  let capacity = 1;
  while (capacity < blocks) capacity *= 2;
  const microMin = new Int32Array(micros).fill(-1),
    microMax = new Int32Array(micros).fill(-1);
  const blockMin = new Int32Array(capacity * 2).fill(-1),
    blockMax = new Int32Array(capacity * 2).fill(-1);
  for (let group = 0; group < count; group++) {
    const micro = Math.floor(group / MICRO_SIZE);
    microMin[micro] = pick(n, metric, microMin[micro], group, true);
    microMax[micro] = pick(n, metric, microMax[micro], group, false);
  }
  for (let micro = 0; micro < micros; micro++) {
    const leaf = capacity + Math.floor(micro / (BLOCK_SIZE / MICRO_SIZE));
    blockMin[leaf] = pick(n, metric, blockMin[leaf], microMin[micro], true);
    blockMax[leaf] = pick(n, metric, blockMax[leaf], microMax[micro], false);
  }
  for (let node = capacity - 1; node > 0; node--) {
    blockMin[node] = pick(n, metric, blockMin[node * 2], blockMin[node * 2 + 1], true);
    blockMax[node] = pick(n, metric, blockMax[node * 2], blockMax[node * 2 + 1], false);
  }
  return {
    owner: n,
    metric,
    capacity,
    blockMin,
    blockMax,
    microMin,
    microMax
  };
}
export function buildRunIndex(n: NormalizedRun): RunBlockIndex {
  const start = performance.now();
  const metrics = Object.fromEntries(METRICS.map(metric => [metric, buildMetric(n, metric)])) as RunBlockIndex['metrics'];
  const buffers = new Set<ArrayBufferLike>();
  let byteLength = 0;
  for (const index of Object.values(metrics)) if (index) {
    for (const array of [index.blockMin, index.blockMax, index.microMin, index.microMax]) {
      if (!buffers.has(array.buffer)) {
        buffers.add(array.buffer);
        byteLength += array.buffer.byteLength;
      }
    }
  }
  return {
    owner: n,
    metrics,
    byteLength,
    buildMs: performance.now() - start,
    version: INDEX_VERSION
  };
}

/** Exact half-open group query; whole summaries never extend outside begin/end. */
export function queryBlockIndex(index: MetricBlockIndex, begin: number, end: number): {
  min: number;
  max: number;
} {
  const n = index.owner,
    metric = index.metric;
  if (!Number.isSafeInteger(begin) || !Number.isSafeInteger(end) || begin < 0 || end > n.x.length || begin > end) throw new RangeError('Invalid index group bounds');
  let min = -1,
    max = -1,
    left = begin,
    right = end;
  const add = (low: number, high: number) => {
    min = pick(n, metric, min, low, true);
    max = pick(n, metric, max, high, false);
  };
  while (left < right && left % MICRO_SIZE) {
    add(left, left);
    left++;
  }
  while (right > left && right % MICRO_SIZE) {
    right--;
    add(right, right);
  }
  while (left < right && left % BLOCK_SIZE) {
    const micro = left / MICRO_SIZE;
    add(index.microMin[micro], index.microMax[micro]);
    left += MICRO_SIZE;
  }
  while (right > left && right % BLOCK_SIZE) {
    right -= MICRO_SIZE;
    const micro = right / MICRO_SIZE;
    add(index.microMin[micro], index.microMax[micro]);
  }
  let a = left / BLOCK_SIZE + index.capacity,
    b = right / BLOCK_SIZE + index.capacity;
  while (a < b) {
    if (a % 2) {
      add(index.blockMin[a], index.blockMax[a]);
      a++;
    }
    if (b % 2) {
      b--;
      add(index.blockMin[b], index.blockMax[b]);
    }
    a = Math.floor(a / 2);
    b = Math.floor(b / 2);
  }
  return {
    min,
    max
  };
}
export function sampleIndexed(n: NormalizedRun, index: RunBlockIndex, metric: Metric, a: number, b: number, width: number): MetricRenderView {
  if (!METRICS.includes(metric) || ![a, b, width].every(Number.isFinite) || b < a || !Number.isFinite(b - a) || width <= 0) throw new RangeError('Invalid metric or viewport');
  if (index.owner !== n) throw new Error('Index belongs to another immutable run revision');
  const data = index.metrics[metric];
  if (!data) return sampleView(n, metric, a, b, width, 'stream');
  if (data.owner !== n) throw new Error('Index belongs to another immutable run revision');
  const begin = lowerBound(n.x, a),
    end = upperBound(n.x, b),
    buckets = Math.max(1, Math.min(2048, Math.floor(width)));
  const view: MetricRenderView = {
    points: [],
    conflicts: [],
    breaks: [],
    mode: 'line',
    min: null,
    max: null,
    rawCount: n.starts[end] - n.starts[begin],
    representedCount: 0
  };
  const bucketOf = (group: number) => a === b ? 0 : Math.min(buckets - 1, Math.floor((n.x[group] - a) / (b - a) * buckets));
  const sourcePoint = (group: number): RenderPoint => {
    const sourceIndex = n.representative[metric][group];
    return {
      sourceIndex,
      step: n.raw.step[sourceIndex],
      value: n.raw[metric][sourceIndex],
      segment: n.segments[metric][group]
    };
  };
  let first = begin;
  while (first < end) {
    const bucket = bucketOf(first);
    let low = first + 1,
      high = end;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (bucketOf(middle) <= bucket) low = middle + 1;else high = middle;
    }
    const stop = low,
      extrema = queryBlockIndex(data, first, stop);
    const selected = [...new Set([first, extrema.min, extrema.max, stop - 1])].sort((x, y) => x - y);
    for (const group of selected) {
      const point = sourcePoint(group);
      view.points.push(point);
      view.min = view.min === null ? point.value : Math.min(view.min, point.value);
      view.max = view.max === null ? point.value : Math.max(view.max, point.value);
    }
    first = stop;
  }
  view.representedCount = view.points.length;
  return view;
}
