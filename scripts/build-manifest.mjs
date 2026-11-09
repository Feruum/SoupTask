import { RUNS } from '../src/data/catalog.ts';
import { generateRun } from '../src/data/generator.ts';
import { normalize, NORMALIZER_VERSION } from '../src/core/engine.ts';
import { writeFileSync, readFileSync } from 'node:fs';
const entries = [];
for (const run of RUNS) {
  const n = normalize(generateRun(run), run);
  entries.push({
    ...run,
    normalizerVersion: NORMALIZER_VERSION,
    summaries: n.summaries,
    quality: n.quality,
    domain: n.domain
  });
}
const output = JSON.stringify(entries, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (readFileSync('src/data/manifest.json', 'utf8').replace(/^\uFEFF/, '') !== output) throw Error('Manifest differs from generator/normalizer');
  console.log('20 manifest entries match regenerated raw facts');
} else {
  writeFileSync('src/data/manifest.json', output);
  console.log('Generated compact manifest for', entries.length, 'runs');
}
