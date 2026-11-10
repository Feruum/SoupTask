/**
 * Small, standalone review witness. NOT the Soup application or its chart adapter.
 * Sorted unique finite X is a precondition. NaN/Infinity in Y split segments.
 * Returned finite points retain original index, X and Y. No uPlot/browser used.
 */
export function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let v = Math.imul(state ^ (state >>> 15), state | 1);
    v ^= v + Math.imul(v ^ (v >>> 7), v | 61);
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296;
  };
}

export function generate(n, seed = 42) {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('Invalid row count');
  const columns = Array.from({length: 4}, () => new Float64Array(n));
  const [x, y, lr, grad] = columns;
  const random = mulberry32(seed);
  for (let i = 0; i < n; i++) {
    x[i] = i;
    // Rational trend avoids cross-engine transcendental-function differences.
    y[i] = 0.2 + 1 / (1 + i / 1000) + random() / 100;
    lr[i] = 0.0001;
    grad[i] = 1 + random() / 10;
  }
  return {x, y, lr, grad};
}

export function lowerBound(xs, value) {
  let lo = 0, hi = xs.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (xs[mid] < value) lo = mid + 1; else hi = mid;
  }
  return lo;
}
export function upperBound(xs, value) {
  let lo = 0, hi = xs.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (xs[mid] <= value) lo = mid + 1; else hi = mid;
  }
  return lo;
}

export function sample(data, lo, hi, width, mode = 'firstminmax', breakBefore = new Set()) {
  const {x, y} = data;
  if (x.length !== y.length) throw new Error('Unequal columns');
  if (![lo, hi, width].every(Number.isFinite) || hi < lo || width <= 0)
    throw new RangeError('Invalid viewport');
  const B = Math.max(1, Math.min(2048, Math.floor(width)));
  const start = lowerBound(x, lo), end = upperBound(x, hi);
  const segments = [], invalidIndices = [];
  let current = null;
  for (let i = start; i < end; i++) {
    if (!Number.isFinite(y[i])) { invalidIndices.push(i); current = null; continue; }
    if (breakBefore.has(i)) current = null;
    if (!current) { current = {id: i, indices: []}; segments.push(current); }
    current.indices.push(i);
  }
  const points = [];
  for (const seg of segments) {
    const buckets = new Map();
    for (const i of seg.indices) {
      const b = hi === lo ? 0 : Math.min(B - 1, Math.floor((x[i] - lo) / (hi - lo) * B));
      if (!buckets.has(b)) buckets.set(b, []);
      buckets.get(b).push(i);
    }
    if (mode === 'nth') {
      const stride = Math.max(1, Math.ceil((end - start) / (4 * B)));
      const ids = seg.indices.filter(i => (i - start) % stride === 0);
      for (const i of ids) points.push({i, x: x[i], y: y[i], segment: seg.id});
      continue;
    }
    for (const ids of buckets.values()) {
      if (mode === 'mean') {
        const i = ids[0];
        const mean = ids.reduce((s, j) => s + y[j], 0) / ids.length;
        points.push({i, x: x[i], y: mean, segment: seg.id});
        continue;
      }
      if (mode !== 'firstminmax') throw new Error(`Unknown sampler: ${mode}`);
      let imin = ids[0], imax = ids[0];
      for (const i of ids) {
        if (y[i] < y[imin]) imin = i;
        if (y[i] > y[imax]) imax = i;
      }
      const chosen = [...new Set([ids[0], imin, imax, ids.at(-1)])].sort((a,b) => a-b);
      for (const i of chosen) points.push({i, x:x[i], y:y[i], segment:seg.id});
    }
  }
  points.sort((a,b) => a.i - b.i);
  return {points, invalidIndices};
}

// Independent summary-index witness. O(log n) exact range queries after O(n) build.
// This tree is per sample, deliberately not the proposed compact block tree.
export function buildRangeIndex(y) {
  let capacity = 1; while (capacity < y.length) capacity *= 2;
  const min = new Int32Array(capacity * 2).fill(-1);
  const max = new Int32Array(capacity * 2).fill(-1);
  const pickMin = (a,b) => a < 0 ? b : b < 0 ? a : y[a] < y[b] || (y[a] === y[b] && a < b) ? a : b;
  const pickMax = (a,b) => a < 0 ? b : b < 0 ? a : y[a] > y[b] || (y[a] === y[b] && a < b) ? a : b;
  for (let i=0; i<y.length; i++) if (Number.isFinite(y[i])) min[capacity+i] = max[capacity+i] = i;
  for (let i=capacity-1; i>0; i--) {
    min[i] = pickMin(min[2*i],min[2*i+1]); max[i] = pickMax(max[2*i],max[2*i+1]);
  }
  return (begin,end) => {
    if (begin < 0 || end > y.length || begin > end) throw new RangeError('Invalid index range');
    let a=begin+capacity,b=end+capacity, imin=-1,imax=-1;
    while(a<b) {
      if(a%2) { imin=pickMin(imin,min[a]); imax=pickMax(imax,max[a]); a++; }
      if(b%2) { b--; imin=pickMin(imin,min[b]); imax=pickMax(imax,max[b]); }
      a=Math.floor(a/2); b=Math.floor(b/2);
    }
    return {imin,imax};
  };
}
