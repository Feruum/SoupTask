import test from 'node:test';
import assert from 'node:assert/strict';
const {generate, sample, buildRangeIndex, mulberry32} = await import(process.env.REFERENCE_MODULE ?? './reference-sampler.mjs');
const MODE=process.env.SAMPLER ?? 'firstminmax';
console.log(`REVIEW WITNESS; sampler=${MODE}; Node ${process.version}; not browser acceptance or performance evidence`);
const data=generate(1_000_000); const spike=500_001; data.y[spike]=100;
const run=(d,a,b,w,breaks)=>sample(d,a,b,w,MODE,breaks);
const finiteMax=(d,a,b)=>{let m=-Infinity; for(let i=0;i<d.x.length;i++)if(d.x[i]>=a&&d.x[i]<=b&&Number.isFinite(d.y[i]))m=Math.max(m,d.y[i]); return m;};
const finiteMin=(d,a,b)=>{let m=Infinity; for(let i=0;i<d.x.length;i++)if(d.x[i]>=a&&d.x[i]<=b&&Number.isFinite(d.y[i]))m=Math.min(m,d.y[i]); return m;};
function prove(d,a,b,w,result) {
  const {points}=result;
  for (let j=0;j<points.length;j++) {
    const p=points[j];
    assert.ok(p.x>=a&&p.x<=b,'point outside viewport');
    assert.equal(p.x,d.x[p.i],'X provenance'); assert.equal(p.y,d.y[p.i],'Y provenance');
    assert.ok(Number.isFinite(p.y),'nonfinite output');
    if(j) assert.ok(points[j-1].x < p.x,'X must be strictly increasing');
  }
  const expectedMin=finiteMin(d,a,b);
  assert.equal(points.reduce((m,p)=>Math.min(m,p.y),Infinity),expectedMin,'exact visible minimum');
  const expected=finiteMax(d,a,b);
  assert.equal(points.reduce((m,p)=>Math.max(m,p.y),-Infinity),expected,'exact visible maximum');
}
test('W01 same seed produces equal four-column data',()=>{
  const a=generate(1000,17),b=generate(1000,17); for(const k of ['x','y','lr','grad'])assert.deepEqual(a[k],b[k]);
});
test('W02 1M rows: raw numeric buffers are 32000000 bytes, not total app memory',()=>{
  assert.equal(data.x.length,1_000_000);
  let injectedCount=0; for(const y of data.y)if(y===100)injectedCount++;
  assert.equal(injectedCount,1,'one unique injected spike');
  assert.equal(Object.values(data).reduce((s,a)=>s+a.byteLength,0),32_000_000);
});
for(const width of [1,320,768,1440])test(`W03 exact spike and provenance: width=${width}`,()=>{
  const r=run(data,0,999_999,width); prove(data,0,999_999,width,r);
  assert.equal(r.points.filter(p=>p.i===spike&&p.x===spike&&p.y===100).length,1);
});
test('W04 inclusive window edges and zero-width data query',()=>{
  for(const [a,b] of [[400000,600000],[spike,spike],[spike,spike+20],[spike-20,spike]]){
    const r=run(data,a,b,320); prove(data,a,b,320,r); assert.ok(r.points.some(p=>p.i===spike));
  }
});
test('W05 windows excluding spike must not inherit its maximum',()=>{
  for(const [a,b]of [[499900,500000],[500002,500100]]){
    const r=run(data,a,b,5); prove(data,a,b,5,r); assert.ok(!r.points.some(p=>p.i===spike));
  }
});
test('W06 spike exactly on bucket boundary or right viewport edge',()=>{
  for(const at of [0,10,20,100]){
    const d=generate(101); d.y.fill(1); d.y[at]=20; const r=run(d,0,100,10); prove(d,0,100,10,r);
    assert.ok(r.points.some(p=>p.i===at&&p.y===20));
  }
});
test('W07 NaN on both sides keeps an isolated spike and breaks its segment',()=>{
  const d=generate(101);d.y.fill(1);d.y[49]=NaN;d.y[50]=20;d.y[51]=NaN;
  const r=run(d,0,100,1); prove(d,0,100,1,r);
  const p=r.points.find(p=>p.i===50); assert.ok(p);
  assert.deepEqual(r.points.filter(q=>q.segment===p.segment).map(q=>q.i),[50]);
  assert.deepEqual(r.invalidIndices,[49,51]);
});
test('W08 negative trough retained as an exact original point',()=>{
  const d=generate(101);d.y.fill(1);d.y[51]=-20;
  assert.ok(run(d,0,100,1).points.some(p=>p.i===51&&p.y===-20));
});
test('W09 NaN and both infinities are not coerced to finite values',()=>{
  const d=generate(101);d.y[20]=NaN;d.y[40]=Infinity;d.y[60]=-Infinity;
  const r=run(d,0,100,10); assert.deepEqual(r.invalidIndices,[20,40,60]);
  assert.ok(r.points.every(p=>Number.isFinite(p.y)&&![20,40,60].includes(p.i)));
});
test('W10 known gap breaks line topology even without a NaN row',()=>{
  const d=generate(101),r=run(d,0,100,1,new Set([50]));
  assert.ok(r.points.some(p=>p.i===49)); assert.ok(r.points.some(p=>p.i===50));
  assert.notEqual(r.points.find(p=>p.i===49).segment,r.points.find(p=>p.i===50).segment);
});
test('W11 empty viewport and all-invalid viewport return no finite samples',()=>{
  assert.deepEqual(run(data,-100,-1,320).points,[]);
  const d=generate(10); d.y.fill(NaN); assert.equal(run(d,0,9,1).points.length,0);
});
test('W12 ordered first/min/max/last without duplicate output indices',()=>{
  const d={x:Float64Array.from([0,1,2,3,4,5]),y:Float64Array.from([3,9,4,-1,2,5])};
  const r=run(d,0,5,1); assert.deepEqual(r.points.map(p=>p.i),[0,1,3,5]);
});
test('W13 >= alone misses a fabricated higher peak; exact provenance rejects it',()=>{
  const fake={i:spike,x:spike,y:101}; assert.ok(fake.y>=data.y[spike]);
  assert.throws(()=>prove(data,spike,spike,1,{points:[fake]}),/Y provenance/);
});
test('W14 range-index witness matches an independent scan on 400 seeded queries',()=>{
  const d=generate(8192,11); d.y[4097]=100;d.y[37]=NaN;d.y[118]=Infinity;
  const query=buildRangeIndex(d.y),rng=mulberry32(9001);
  for(let j=0;j<400;j++){
    let a=Math.floor(rng()*8192),b=Math.floor(rng()*8192);if(a>b)[a,b]=[b,a];b++;
    let imin=-1,imax=-1;
    for(let i=a;i<b;i++)if(Number.isFinite(d.y[i])){
      if(imin<0||d.y[i]<d.y[imin])imin=i;if(imax<0||d.y[i]>d.y[imax])imax=i;
    }
    assert.deepEqual(query(a,b),{imin,imax});
  }
});
test('W15 preserve extrema on 100 seeded irregular-X cases',()=>{
  const rng=mulberry32(81);
  for(let k=0;k<100;k++){
    const d=generate(301,k+1);for(let i=1;i<d.x.length;i++)d.x[i]=d.x[i-1]+1+Math.floor(rng()*10);
    const a=d.x[30],b=d.x[270],w=1+Math.floor(rng()*50);prove(d,a,b,w,run(d,a,b,w));
  }
});

// Small, exhaustive selection oracle: assign with interval comparisons rather than
// the production sampler's floor formula. Never import the sampler's bucket helper.
function expectedSelection(d,a,b,width,breaks=new Set()) {
  const B=Math.max(1,Math.min(2048,Math.floor(width)));
  const bounds=Array.from({length:B+1},(_,j)=>a+(b-a)*j/B);
  bounds[0]=a; bounds[B]=b;
  const groups=new Map(); let segment=-1,previousFinite=false;
  for(let i=0;i<d.x.length;i++) {
    if(d.x[i]<a||d.x[i]>b)continue;
    if(!Number.isFinite(d.y[i])) {previousFinite=false;continue;}
    if(!previousFinite||breaks.has(i))segment=i;
    previousFinite=true;
    let bucket=0;
    while(bucket<B-1 && d.x[i]>=bounds[bucket+1])bucket++;
    const key=`${segment}:${bucket}`;
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push(i);
  }
  const expected=new Set();
  for(const ids of groups.values()) {
    const low=ids.reduce((p,i)=>d.y[i]<d.y[p]?i:p,ids[0]);
    const high=ids.reduce((p,i)=>d.y[i]>d.y[p]?i:p,ids[0]);
    for(const i of [ids[0],low,high,ids.at(-1)])expected.add(i);
  }
  return [...expected].sort((a,b)=>a-b);
}

test('W16 per-bucket per-segment first min max last equals exhaustive oracle',()=>{
  const rng=mulberry32(216);
  for(let k=0;k<80;k++) {
    const d=generate(301,k+9),breaks=new Set();
    for(let i=0;i<301;i++) {
      d.x[i]=i===0?0:d.x[i-1]+1+Math.floor(rng()*7);
      d.y[i]=Math.floor(rng()*200)-100;
      if(i%29===5)d.y[i]=NaN;
      if(i%53===7)d.y[i]=Infinity;
      if(i%47===13)breaks.add(i);
    }
    const a=d.x[17],b=d.x[285],width=1+Math.floor(rng()*33);
    const r=run(d,a,b,width,breaks); prove(d,a,b,width,r);
    assert.deepEqual(r.points.map(p=>p.i),expectedSelection(d,a,b,width,breaks),'bucket/segment extremum or endpoint lost');
    for(let j=1;j<r.points.length;j++) {
      const p=r.points[j-1],q=r.points[j];
      if(p.segment===q.segment)for(let i=p.i+1;i<=q.i;i++) {
        assert.ok(Number.isFinite(d.y[i])&&!breaks.has(i),'declared segment bridges a break');
      }
    }
  }
});
test('W17 sampling does not mutate raw columns including non-finite values',()=>{
  const d=generate(101);d.y[40]=NaN;d.y[41]=Infinity;d.y[42]=-Infinity;
  const copy=Object.fromEntries(Object.entries(d).map(([k,v])=>[k,v.slice()]));
  run(d,0,100,3);
  for(const k of Object.keys(d))assert.deepEqual(d[k],copy[k]);
});
test('W18 ties and repeated selection use deterministic original identities',()=>{
  const d={x:Float64Array.from([0,1,2,3,4,5]),y:Float64Array.from([0,7,-4,7,-4,0])};
  const a=run(d,0,5,1),b=run(d,0,5,1);
  assert.deepEqual(a,b); assert.deepEqual(a.points.map(p=>p.i),[0,1,2,5]);
});
test('W19 range index rejects non-integer non-finite and out-of-range bounds',()=>{
  const query=buildRangeIndex(Float64Array.from([1,2,3]));
  for(const [a,b]of [[NaN,2],[0,NaN],[0.5,2],[0,2.5],[-1,2],[0,4],[2,1],[0,Infinity]]) {
    assert.throws(()=>query(a,b),RangeError,`invalid bounds ${a},${b}`);
  }
});
test('W20 index handles empty singleton ties and non-finite-only ranges',()=>{
  const y=Float64Array.from([NaN,4,4,-2,-2,Infinity]),q=buildRangeIndex(y);
  assert.deepEqual(q(0,0),{imin:-1,imax:-1});
  assert.deepEqual(q(6,6),{imin:-1,imax:-1});
  assert.deepEqual(q(0,1),{imin:-1,imax:-1});
  assert.deepEqual(q(1,2),{imin:1,imax:1});
  assert.deepEqual(q(0,6),{imin:3,imax:1});
  assert.deepEqual(buildRangeIndex(new Float64Array())(0,0),{imin:-1,imax:-1});
});
test('W21 validate mode and viewport before an empty input can hide errors',()=>{
  const d=generate(0);
  assert.throws(()=>sample(d,0,1,1,'misspelled-mode'),RangeError);
  assert.throws(()=>sample(d,-Number.MAX_VALUE,Number.MAX_VALUE,1,MODE),RangeError);
  for(const width of [0,-1,NaN,Infinity])assert.throws(()=>run(d,0,1,width),RangeError);
  assert.throws(()=>run(d,5,4,1),RangeError);
  assert.throws(()=>sample({x:new Float64Array(1),y:new Float64Array(0)},0,1,1,MODE),/Unequal/);
});
test('W22 documented limitation: not every local peak survives a one-bucket overview',()=>{
  // This is a specific counterexample for the correct selector, not a promise
  // that every local maximum must survive every reduction.
  const d={x:Float64Array.from([0,1,2,3,4,5,6]),y:Float64Array.from([1,4,2,9,3,0,1])};
  const r=sample(d,0,6,1,'firstminmax');
  assert.ok(r.points.some(p=>p.i===3&&p.y===9));
  assert.ok(!r.points.some(p=>p.i===1));
  prove(d,0,6,1,r);
});
