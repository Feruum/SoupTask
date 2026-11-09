/** Reproduce exact intended failures, not merely any process with exit code 1. */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
const dir=dirname(fileURLToPath(import.meta.url));
const ordinary=['W03','W03','W03','W03','W04','W05','W06','W08','W10','W12','W15','W16','W18'];
const cases=[
  {name:'firstminmax',mode:'firstminmax',file:'firstminmax-pass.txt',expected:[]},
  {name:'nth',mode:'nth',file:'nth-expected-fail.txt',expected:[...ordinary,'W07']},
  {name:'mean',mode:'mean',file:'mean-expected-fail.txt',expected:ordinary},
  {name:'v2-original-regression',mode:'firstminmax',module:'./v2-original/reference-sampler.mjs',file:'v2-regression-before.txt',expected:['W19','W21']},
];
const sha=f=>createHash('sha256').update(readFileSync(join(dir,f))).digest('hex');
const results=[];
let success=true;
for(const item of cases){
  const env={...process.env,SAMPLER:item.mode};
  delete env.REFERENCE_MODULE;
  if(item.module)env.REFERENCE_MODULE=item.module;
  const run=spawnSync(process.execPath,['--test','--test-reporter=tap',join(dir,'reference-tests.mjs')],{
    cwd:dir,env,encoding:'utf8',timeout:30000,maxBuffer:4*1024*1024,
  });
  const output=(run.stdout??'')+(run.stderr??'');
  writeFileSync(join(dir,item.file),output);
  const count=key=>Number(output.match(new RegExp(`^# ${key} (\\d+)$`,'m'))?.[1]??NaN);
  const failedNames=[...output.matchAll(/^not ok \d+ - (.+)$/gm)].map(x=>x[1]);
  const failedIds=failedNames.map(n=>n.match(/^W\d+/)?.[0]??'UNKNOWN').sort();
  const expectedIds=[...item.expected].sort();
  const failedAssertions=(output.match(/code: 'ERR_ASSERTION'/g)??[]).length;
  const tests=count('tests'),pass=count('pass'),fail=count('fail');
  const expectedExit=expectedIds.length?1:0;
  const accepted=!run.error&&run.signal===null&&run.status===expectedExit&&tests===25&&
    pass+fail===25&&fail===expectedIds.length&&failedAssertions===fail&&
    count('cancelled')===0&&count('skipped')===0&&count('todo')===0&&
    JSON.stringify(failedIds)===JSON.stringify(expectedIds);
  const record={sampler:item.name,module:item.module??'./reference-sampler.mjs',
    exitCode:run.status,expectedExit,signal:run.signal,error:run.error?.message??null,
    tests,pass,fail,failedNames,expectedFailIds:expectedIds,assertionFailures:failedAssertions,
    accepted,log:item.file,logSha256:sha(item.file)};
  results.push(record);
  if(!accepted){success=false;console.error('Unexpected witness outcome',record);}
}
const sourceNames=['reference-sampler.mjs','reference-tests.mjs','run-witness.mjs','v2-original/reference-sampler.mjs'];
const manifest={version:'2.1',scope:'Standalone Node witness; not the Soup UI, browser acceptance or performance evidence',
  executedAt:new Date().toISOString(),node:process.version,platform:process.platform,arch:process.arch,
  expectedTestsPerProcess:25,success,
  sources:Object.fromEntries(sourceNames.map(f=>[f,sha(f)])),results};
writeFileSync(join(dir,'witness-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest,null,2));
if(!success)process.exitCode=1;
