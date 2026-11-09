import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root = 'reports/negative-controls';
const executedAt = new Date().toISOString();
const directory = `${root}/${executedAt.replace(/[:.]/g, '-')}`;
mkdirSync(directory, {
  recursive: true
});
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const manifest = {
  executedAt,
  node: process.version,
  platform: process.platform,
  coreSha256: hash('src/core/engine.ts'),
  testsSha256: hash('src/core/engine.test.ts'),
  topologyTestsSha256: hash('src/core/topology.test.ts'),
  results: []
};
for (const fault of ['nth', 'mean', 'fabricated', 'bridged']) {
  const report = `${directory}/${fault}.json`;
  const log = `${directory}/${fault}.txt`;
  const result = spawnSync(process.execPath, ['node_modules/vitest/vitest.mjs', 'run', 'src/core/engine.test.ts', 'src/core/topology.test.ts', '--reporter=default', '--reporter=json', `--outputFile=${report}`], {
    encoding: 'utf8',
    env: {
      ...process.env,
      SAMPLER_FAULT: fault
    }
  });
  writeFileSync(log, result.stdout + result.stderr);
  const parsed = JSON.parse(readFileSync(report, 'utf8'));
  const failures = parsed.testResults.flatMap(file => file.assertionResults.filter(test => test.status === 'failed'));
  const expected = ['exact spike provenance width 1', 'exact spike provenance width 320', 'exact spike provenance width 768', 'exact spike provenance width 1440', 'excludes offscreen spike and includes inclusive endpoints/single step', 'independent raw-window oracle preserves both extrema and exact provenance on seeded cases', 'independent interval oracle checks every bucket and segment first/min/max/last'];
  const topology = ['isolated spike keeps both NaN breaks and distinct source segments', 'known cadence gap remains disconnected without a fabricated null row'];
  if (fault === 'nth') {
    expected.splice(expected.indexOf('exact spike provenance width 320'), 1);
    expected.push(...topology);
  }
  if (fault === 'fabricated') expected.splice(0, expected.length, ...expected.slice(0, 4), 'independent raw-window oracle preserves both extrema and exact provenance on seeded cases', topology[0]);
  if (fault === 'bridged') expected.splice(0, expected.length, ...topology);
  const names = failures.map(test => test.title);
  if (result.status !== 1 || parsed.numPendingTests !== 0 || parsed.numTotalTests !== 12 || !expected.every(name => names.includes(name)) || names.some(name => !expected.includes(name)) || failures.some(test => !test.failureMessages.some(message => message.includes('AssertionError')))) throw Error(`Negative control ${fault} did not fail exact expected assertions: ${JSON.stringify(names)}`);
  copyFileSync(report, `${root}/${fault}.json`);
  copyFileSync(log, `${root}/${fault}.txt`);
  manifest.results.push({
    fault,
    exitCode: result.status,
    testCount: parsed.numTotalTests,
    failedTests: names,
    report,
    log,
    logSha256: hash(log)
  });
  console.log(`${fault}: detected ${failures.length} expected assertion failures; genuine output preserved`);
}
writeFileSync(`${directory}/manifest.json`, JSON.stringify(manifest, null, 2));
writeFileSync(`${root}/manifest.json`, JSON.stringify(manifest, null, 2));
