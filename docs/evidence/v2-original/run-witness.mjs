/** Run the standalone algorithm witness and preserve genuine green/red output. */
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
const dir = dirname(fileURLToPath(import.meta.url));
const cases = [
  {name:'firstminmax', file:'firstminmax-pass.txt', expectedExit:0},
  {name:'nth', file:'nth-expected-fail.txt', expectedExit:1},
  {name:'mean', file:'mean-expected-fail.txt', expectedExit:1},
];
const results=[];
for (const item of cases) {
  const run = spawnSync(process.execPath, ['--test', join(dir,'reference-tests.mjs')], {
    cwd:dir, env:{...process.env,SAMPLER:item.name}, encoding:'utf8', timeout:30000,
  });
  const output=(run.stdout??'')+(run.stderr??'');
  writeFileSync(join(dir,item.file), output);
  const count = key => Number(output.match(new RegExp(`^# ${key} (\\d+)$`,'m'))?.[1] ?? NaN);
  const record={sampler:item.name, exitCode:run.status, expectedExit:item.expectedExit,
    tests:count('tests'), pass:count('pass'), fail:count('fail'), log:item.file};
  results.push(record);
  if(run.error || run.status!==item.expectedExit || record.tests!==18 ||
     (item.expectedExit===1 && !(record.fail>0))) {
    console.error(record,run.error??'Unexpected witness outcome'); process.exitCode=1;
  }
}
const sha = f => createHash('sha256').update(readFileSync(join(dir,f))).digest('hex');
const manifest = {scope:'Standalone Node algorithm witness, not Soup UI, Vitest/E2E, or performance results',
  executedAt:new Date().toISOString(), node:process.version, platform:process.platform, arch:process.arch,
  sources:{'reference-sampler.mjs':sha('reference-sampler.mjs'),'reference-tests.mjs':sha('reference-tests.mjs')},
  results};
writeFileSync(join(dir,'witness-manifest.json'), JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest,null,2));
