import type { RawColumns, RunDescriptor } from './types.ts';
export function mulberry32(initial: number) {
  let seed = initial >>> 0;
  return () => {
    seed = seed + 0x6d2b79f5 >>> 0;
    let v = Math.imul(seed ^ seed >>> 15, seed | 1);
    v ^= v + Math.imul(v ^ v >>> 7, v | 61);
    return ((v ^ v >>> 14) >>> 0) / 4294967296;
  };
}
export function generateRun(run: RunDescriptor): RawColumns {
  if (!Number.isSafeInteger(run.rowCount) || run.rowCount < 0 || run.rowCount > 1_000_000) throw new RangeError('Unsupported fixture row count');
  const n = run.rowCount,
    raw: RawColumns = {
      step: new Float64Array(n),
      loss: new Float64Array(n),
      lr: new Float64Array(n),
      grad_norm: new Float64Array(n)
    },
    random = mulberry32(run.seed);
  for (let i = 0; i < n; i++) {
    const p = n > 1 ? i / (n - 1) : 0;
    raw.step[i] = i;
    raw.loss[i] = .2 + 3.2 / (1 + i / (run.scenario === 'slow' ? 700 : 100)) + random() * .04;
    raw.lr[i] = .00002 * Math.min(1, p * 12) * (1 - p);
    raw.grad_norm[i] = .14 + random() * .1;
    if (run.scenario === 'noisy') raw.loss[i] += random() * .6;
    if (run.scenario === 'divergence') raw.loss[i] = .3 + p * 6 + random() * .1;
    if (run.scenario === 'plateau') raw.loss[i] = .8 + random() * .01;
    if (run.scenario === 'small-lr') raw.lr[i] *= 1e-4;
    if (run.scenario === 'sparse') raw.step[i] = i * 17;
    if (run.scenario === 'gaps' && i >= 4096) raw.step[i] += 100;
  }
  if (n === 0) return raw;
  const middle = Math.floor(n / 2);
  switch (run.scenario) {
    case 'spike':
      raw.loss[n === 1_000_000 ? 500001 : middle] = 100;
      break;
    case 'missing':
      raw.loss[middle] = NaN;
      raw.loss[n - 1] = NaN;
      break;
    case 'pos-inf':
      raw.loss[middle] = Infinity;
      break;
    case 'neg-inf':
      raw.loss[middle] = -Infinity;
      break;
    case 'duplicates':
      for (let i = 100; i < 110; i++) {
        raw.step[i] = raw.step[99];
        for (const m of ['loss', 'lr', 'grad_norm'] as const) raw[m][i] = raw[m][99];
      }
      break;
    case 'conflicts':
      raw.step[101] = raw.step[100];
      raw.loss[101] = 12;
      raw.loss[n - 1] = NaN;
      raw.step[n - 1] = raw.step[n - 2];
      break;
    case 'unsorted':
      for (const m of ['step', 'loss', 'lr', 'grad_norm'] as const) {
        const v = raw[m][20];
        raw[m][20] = raw[m][4000];
        raw[m][4000] = v;
      }
      break;
    case 'zero':
      raw.loss[middle] = 0;
      raw.loss[n - 1] = 0;
      break;
    case 'grad-spike':
      raw.grad_norm[middle] = 9;
      break;
    case 'mixed':
      raw.loss[10] = NaN;
      raw.lr[20] = Infinity;
      raw.grad_norm[30] = -Infinity;
      raw.step[41] = raw.step[40];
      raw.loss[41] = 8;
      break;
  }
  return raw;
}
