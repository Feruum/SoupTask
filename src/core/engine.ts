import { METRICS } from '../data/catalog.ts';
import type { RawColumns, RunDescriptor, Metric, MetricSummary, QualityCounts, MetricRenderView, RenderPoint, SourceRow, QualityIssue, IssueKind } from '../data/types.ts';
export const NORMALIZER_VERSION = 'normalize-1.0.0';
export interface NormalizedRun {
  raw: RawColumns;
  order: Uint32Array;
  x: Float64Array;
  starts: Uint32Array;
  representative: Record<Metric, Int32Array>;
  segments: Record<Metric, Uint32Array>;
  states: Record<Metric, Uint8Array>;
  summaries: Record<Metric, MetricSummary>;
  quality: QualityCounts;
  domain: {
    min: number;
    max: number;
  } | null;
  cadence: number | undefined;
}
const blankMetric = () => ({
  nan: 0,
  posInf: 0,
  negInf: 0,
  conflicts: 0,
  gaps: 0,
  invalidCount: 0
});
const point = (raw: RawColumns, m: Metric, i: number, segment = 0): RenderPoint => ({
  sourceIndex: i,
  step: raw.step[i],
  value: raw[m][i],
  segment
});
export function normalize(raw: RawColumns, run?: RunDescriptor): NormalizedRun {
  const size = raw.step.length;
  for (const m of METRICS) if (raw[m].length !== size) throw new RangeError('Column lengths must match');
  const quality: QualityCounts = {
    nan: 0,
    posInf: 0,
    negInf: 0,
    duplicateRows: 0,
    duplicateGroups: 0,
    conflictGroups: 0,
    invalidX: 0,
    outOfOrder: 0,
    gaps: 0,
    metrics: {
      loss: blankMetric(),
      lr: blankMetric(),
      grad_norm: blankMetric()
    }
  };
  let valid = 0,
    ordered = true,
    previous = -Infinity;
  for (let i = 0; i < size; i++) {
    const x = raw.step[i];
    if (!Number.isFinite(x)) {
      quality.invalidX++;
      continue;
    }
    valid++;
    if (x < previous) {
      ordered = false;
      quality.outOfOrder++;
    }
    previous = x;
  }
  const order = new Uint32Array(valid);
  for (let i = 0, j = 0; i < size; i++) if (Number.isFinite(raw.step[i])) order[j++] = i;
  if (!ordered) order.sort((a, b) => raw.step[a] - raw.step[b] || a - b);
  let groups = 0;
  for (let j = 0; j < valid; j++) if (j === 0 || raw.step[order[j]] !== raw.step[order[j - 1]]) groups++;
  const x = new Float64Array(groups),
    starts = new Uint32Array(groups + 1);
  for (let j = 0, g = 0; j < valid; j++) if (j === 0 || raw.step[order[j]] !== raw.step[order[j - 1]]) {
    x[g] = raw.step[order[j]];
    starts[g++] = j;
  }
  starts[groups] = valid;
  const cadence = run?.expectedCadence;
  for (let g = 0; g < groups; g++) {
    const count = starts[g + 1] - starts[g];
    if (count > 1) {
      quality.duplicateGroups++;
      quality.duplicateRows += count - 1;
    }
    if (g > 0 && cadence !== undefined && x[g] - x[g - 1] > cadence) quality.gaps++;
  }
  const representative = {} as Record<Metric, Int32Array>,
    segments = {} as Record<Metric, Uint32Array>,
    states = {} as Record<Metric, Uint8Array>,
    summaries = {} as Record<Metric, MetricSummary>;
  for (const m of METRICS) {
    const reps = representative[m] = new Int32Array(groups).fill(-1),
      seg = segments[m] = new Uint32Array(groups),
      state = states[m] = new Uint8Array(groups),
      q = quality.metrics[m];
    let min = Infinity,
      max = -Infinity,
      imin = -1,
      imax = -1,
      finiteCount = 0,
      segment = 0,
      lastFiniteIndex = -1,
      lastFiniteSegment = 0;
    for (let i = 0; i < size; i++) {
      const v = raw[m][i];
      if (Number.isFinite(v)) {
        finiteCount++;
        if (v < min || v === min && Number.isFinite(raw.step[i]) && (!Number.isFinite(raw.step[imin]) || raw.step[i] < raw.step[imin])) {
          min = v;
          imin = i;
        }
        if (v > max || v === max && Number.isFinite(raw.step[i]) && (!Number.isFinite(raw.step[imax]) || raw.step[i] < raw.step[imax])) {
          max = v;
          imax = i;
        }
      } else {
        if (Number.isNaN(v)) q.nan++;else if (v === Infinity) q.posInf++;else q.negInf++;
        q.invalidCount++;
      }
    }
    for (let g = 0; g < groups; g++) {
      let first = -1,
        invalid = false,
        conflict = false;
      for (let j = starts[g]; j < starts[g + 1]; j++) {
        const i = order[j],
          v = raw[m][i];
        if (Number.isFinite(v)) {
          if (first < 0) first = i;else if (v !== raw[m][first]) conflict = true;
        } else invalid = true;
      }
      if (first >= 0 && invalid) conflict = true;
      state[g] = conflict ? 2 : first < 0 ? 1 : 0;
      if (conflict) {
        q.conflicts++;
        quality.conflictGroups++;
      }
      if (g > 0 && cadence !== undefined && x[g] - x[g - 1] > cadence) {
        segment++;
        q.gaps++;
      }
      if (state[g] === 0) {
        reps[g] = first;
        seg[g] = segment;
        lastFiniteIndex = first;
        lastFiniteSegment = segment;
      } else {
        seg[g] = segment;
        segment++;
      }
    }
    const last = groups - 1,
      latestStatus = last < 0 ? 'empty' : state[last] === 2 ? 'conflict' : state[last] === 1 ? 'invalid' : 'finite';
    summaries[m] = {
      latest: latestStatus === 'finite' ? raw[m][reps[last]] : null,
      latestStep: last >= 0 ? x[last] : null,
      latestStatus,
      min: imin >= 0 ? min : null,
      max: imax >= 0 ? max : null,
      minStep: imin >= 0 && Number.isFinite(raw.step[imin]) ? raw.step[imin] : null,
      maxStep: imax >= 0 && Number.isFinite(raw.step[imax]) ? raw.step[imax] : null,
      finiteCount,
      invalidCount: q.invalidCount,
      conflictCount: q.conflicts,
      lastFinite: lastFiniteIndex < 0 ? null : point(raw, m, lastFiniteIndex, lastFiniteSegment)
    };
    quality.nan += q.nan;
    quality.posInf += q.posInf;
    quality.negInf += q.negInf;
  }
  return {
    raw,
    order,
    x,
    starts,
    representative,
    segments,
    states,
    summaries,
    quality,
    domain: groups ? {
      min: x[0],
      max: x[groups - 1]
    } : null,
    cadence
  };
}
export function lowerBound(xs: Float64Array, value: number) {
  let lo = 0,
    hi = xs.length;
  while (lo < hi) {
    const mid = lo + hi >>> 1;
    if (xs[mid] < value) lo = mid + 1;else hi = mid;
  }
  return lo;
}
export function upperBound(xs: Float64Array, value: number) {
  let lo = 0,
    hi = xs.length;
  while (lo < hi) {
    const mid = lo + hi >>> 1;
    if (xs[mid] <= value) lo = mid + 1;else hi = mid;
  }
  return lo;
}
function reduceIds(n: NormalizedRun, m: Metric, ids: number[]) {
  let low = ids[0],
    high = ids[0];
  for (const i of ids) {
    if (n.raw[m][i] < n.raw[m][low]) low = i;
    if (n.raw[m][i] > n.raw[m][high]) high = i;
  }
  return [...new Set([ids[0], low, high, ids[ids.length - 1]])].sort((a, b) => n.raw.step[a] - n.raw.step[b] || a - b);
}
export function sampleView(n: NormalizedRun, m: Metric, a: number, b: number, width: number, mode: 'scan' | 'stream' = 'stream'): MetricRenderView {
  if (!METRICS.includes(m) || !['scan', 'stream'].includes(mode) || ![a, b, width].every(Number.isFinite) || b < a || !Number.isFinite(b - a) || width <= 0) throw new RangeError('Invalid metric, sampler or viewport');
  const fault = (globalThis as {
    process?: {
      env?: Record<string, string | undefined>;
    };
  }).process?.env?.SAMPLER_FAULT;
  const B = Math.max(1, Math.min(2048, Math.floor(width))),
    begin = lowerBound(n.x, a),
    end = upperBound(n.x, b),
    raw = n.raw,
    rep = n.representative[m],
    segs = n.segments[m];
  const result: MetricRenderView = {
    points: [],
    conflicts: [],
    breaks: [],
    mode: 'line',
    min: null,
    max: null,
    rawCount: 0,
    representedCount: 0
  };
  let bucket = -1,
    segment = -1,
    first = -1,
    last = -1,
    lo = -1,
    hi = -1,
    candidates: number[] = [];
  const add = (p: RenderPoint, overlay = false) => {
    (overlay ? result.conflicts : result.points).push(p);
  };
  const flush = () => {
    if (first < 0) return;
    const ids = mode === 'scan' ? reduceIds(n, m, candidates) : [...new Set([first, lo, hi, last])].sort((i, j) => raw.step[i] - raw.step[j] || i - j);
    if (fault === 'mean') {
      add({
        ...point(raw, m, first, segment),
        value: candidates.reduce((sum, i) => sum + raw[m][i], 0) / candidates.length
      });
    } else for (const i of ids) add(point(raw, m, i, segment));
    first = -1;
    candidates = [];
  };
  let degraded = false;
  for (let g = begin; g < end; g++) {
    result.rawCount += n.starts[g + 1] - n.starts[g];
    if (g > begin && n.cadence !== undefined && n.x[g] - n.x[g - 1] > n.cadence) result.breaks.push({
      from: n.x[g - 1],
      to: n.x[g],
      kind: 'gap'
    });
    if (rep[g] < 0) {
      flush();
      result.breaks.push({
        from: g > begin ? n.x[g - 1] : n.x[g],
        to: g + 1 < end ? n.x[g + 1] : n.x[g],
        kind: n.states[m][g] === 2 ? 'conflict' : 'invalid'
      });
      if (n.states[m][g] === 2) {
        let cmin = -1,
          cmax = -1;
        for (let j = n.starts[g]; j < n.starts[g + 1]; j++) {
          const i = n.order[j],
            v = raw[m][i];
          if (Number.isFinite(v)) {
            if (cmin < 0 || v < raw[m][cmin]) cmin = i;
            if (cmax < 0 || v > raw[m][cmax]) cmax = i;
          }
        }
        for (const i of new Set([cmin, cmax])) if (i >= 0) add(point(raw, m, i, segs[g]), true);
      }
    } else {
      const i = rep[g],
        k = a === b ? 0 : Math.min(B - 1, Math.floor((n.x[g] - a) / (b - a) * B));
      if (k !== bucket || segs[g] !== segment) {
        flush();
        bucket = k;
        segment = segs[g];
      }
      if (first < 0) {
        first = lo = hi = i;
      }
      last = i;
      if (raw[m][i] < raw[m][lo]) lo = i;
      if (raw[m][i] > raw[m][hi]) hi = i;
      if (mode === 'scan' || fault === 'mean') candidates.push(i);
    }
    if (result.points.length + result.conflicts.length + result.breaks.length > 16384) {
      degraded = true;
      break;
    }
  }
  if (!degraded) flush();
  if (degraded || result.points.length + result.conflicts.length + result.breaks.length > 16384) {
    result.mode = 'disconnected-extrema';
    result.points = [];
    result.conflicts = [];
    result.breaks = [];
    result.rawCount = 0;
    const mins = new Int32Array(B).fill(-1),
      maxs = new Int32Array(B).fill(-1);
    for (let g = begin; g < end; g++) {
      const k = a === b ? 0 : Math.min(B - 1, Math.floor((n.x[g] - a) / (b - a) * B));
      result.rawCount += n.starts[g + 1] - n.starts[g];
      for (let j = n.starts[g]; j < n.starts[g + 1]; j++) {
        const i = n.order[j],
          v = raw[m][i];
        if (!Number.isFinite(v)) continue;
        if (mins[k] < 0 || v < raw[m][mins[k]]) mins[k] = i;
        if (maxs[k] < 0 || v > raw[m][maxs[k]]) maxs[k] = i;
      }
    }
    for (let k = 0; k < B; k++) for (const i of new Set([mins[k], maxs[k]])) if (i >= 0) result.conflicts.push(point(raw, m, i, k));
  }
  if (fault === 'nth') result.points = result.points.filter((_, i) => i % 4 === 0);
  if (fault === 'fabricated' && result.points.length) {
    let highest = 0;
    for (let i = 1; i < result.points.length; i++) if (result.points[i].value > result.points[highest].value) highest = i;
    result.points[highest] = { ...result.points[highest], value: result.points[highest].value + 1 };
  }
  if (fault === 'bridged') {
    result.breaks = [];
    result.points = result.points.map(point => ({ ...point, segment: 0 }));
  }
  for (const p of [...result.points, ...result.conflicts]) {
    result.min = result.min === null ? p.value : Math.min(result.min, p.value);
    result.max = result.max === null ? p.value : Math.max(result.max, p.value);
  }
  result.representedCount = result.points.length + result.conflicts.length;
  return result;
}
export function inspectSource(n: NormalizedRun, index: number): SourceRow {
  if (!Number.isSafeInteger(index) || index < 0 || index >= n.raw.step.length) throw new RangeError('Source index outside run');
  return {
    sourceIndex: index,
    step: n.raw.step[index],
    loss: n.raw.loss[index],
    lr: n.raw.lr[index],
    grad_norm: n.raw.grad_norm[index]
  };
}
export function inspectStep(n: NormalizedRun, step: number): SourceRow[] {
  if (!Number.isFinite(step)) throw new RangeError('Step must be finite');
  const g = lowerBound(n.x, step);
  if (g === n.x.length || n.x[g] !== step) return [];
  return Array.from(n.order.subarray(n.starts[g], Math.min(n.starts[g] + 50, n.starts[g + 1])), i => inspectSource(n, i));
}
export function sourcePage(n: NormalizedRun, page = 0, pageSize = 50): SourceRow[] {
  if (!Number.isSafeInteger(page) || page < 0 || !Number.isSafeInteger(pageSize) || pageSize < 1 || pageSize > 50) throw new RangeError('Invalid source page');
  const start = page * pageSize;
  return Array.from({
    length: Math.max(0, Math.min(pageSize, n.raw.step.length - start))
  }, (_, j) => inspectSource(n, start + j));
}
export function issuePage(n: NormalizedRun, options: {
  metric?: Metric;
  kind?: IssueKind;
  page?: number;
  pageSize?: number;
} = {}): {
  rows: QualityIssue[];
  total: number;
} {
  if (options.metric && !METRICS.includes(options.metric)) throw new RangeError('Invalid issue metric');
  if (options.kind && !['nan', 'posInf', 'negInf', 'duplicate', 'conflict', 'invalidX', 'outOfOrder', 'gap'].includes(options.kind)) throw new RangeError('Invalid issue kind');
  const page = options.page ?? 0,
    size = options.pageSize ?? 50;
  if (!Number.isSafeInteger(page) || page < 0 || !Number.isSafeInteger(size) || size < 1 || size > 50) throw new RangeError('Invalid issue page');
  const rows: QualityIssue[] = [],
    start = page * size;
  let total = 0;
  const emit = (kind: IssueKind, metric: Metric | null, index: number, message: string) => {
    if (options.kind && kind !== options.kind || options.metric && metric !== null && metric !== options.metric) return;
    const ordinal = total++;
    if (ordinal >= start && rows.length < size) rows.push({
      kind,
      metric,
      sourceIndex: index,
      step: n.raw.step[index],
      value: metric ? n.raw[metric][index] : null,
      message
    });
  };
  let previousFiniteStep = -Infinity;
  for (let i = 0; i < n.raw.step.length; i++) {
    if (!Number.isFinite(n.raw.step[i])) emit('invalidX', null, i, 'Non-finite step; retained in source, excluded from chart');
    if (Number.isFinite(n.raw.step[i]) && n.raw.step[i] < previousFiniteStep) emit('outOfOrder', null, i, 'Source arrival order decreases');
    if (Number.isFinite(n.raw.step[i])) previousFiniteStep = n.raw.step[i];
    for (const m of METRICS) {
      const v = n.raw[m][i];
      if (!Number.isFinite(v)) emit(Number.isNaN(v) ? 'nan' : v === Infinity ? 'posInf' : 'negInf', m, i, 'Non-finite measurement; never replaced with zero');
    }
  }
  for (let g = 0; g < n.x.length; g++) {
    for (let j = n.starts[g] + 1; j < n.starts[g + 1]; j++) emit('duplicate', null, n.order[j], 'Additional original observation at duplicate step');
    for (const m of METRICS) if (n.states[m][g] === 2) emit('conflict', m, n.order[n.starts[g]], 'Conflicting duplicate group; inspect every member');
    if (g > 0 && n.cadence !== undefined && n.x[g] - n.x[g - 1] > n.cadence) emit('gap', null, n.order[n.starts[g]], `Expected cadence ${n.cadence}; previous step ${n.x[g - 1]}`);
  }
  return {
    rows,
    total
  };
}
export function allocationBytes(n: NormalizedRun) {
  const seen = new Set<ArrayBufferLike>();
  let total = 0;
  for (const a of [...Object.values(n.raw), n.order, n.x, n.starts, ...Object.values(n.representative), ...Object.values(n.segments), ...Object.values(n.states)]) if (!seen.has(a.buffer)) {
    seen.add(a.buffer);
    total += a.buffer.byteLength;
  }
  return total;
}
export function inspectGroup(n: NormalizedRun, step: number, page = 0, pageSize = 50): {
  rows: SourceRow[];
  total: number;
} {
  if (!Number.isFinite(step) || !Number.isSafeInteger(page) || page < 0 || !Number.isSafeInteger(pageSize) || pageSize < 1 || pageSize > 50) throw new RangeError('Invalid step or group page');
  const g = lowerBound(n.x, step);
  if (g === n.x.length || n.x[g] !== step) return {
    rows: [],
    total: 0
  };
  const first = n.starts[g],
    end = n.starts[g + 1],
    start = first + page * pageSize;
  return {
    total: end - first,
    rows: Array.from(n.order.subarray(Math.min(start, end), Math.min(start + pageSize, end)), i => inspectSource(n, i))
  };
}
