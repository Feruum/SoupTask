import {readFile,writeFile} from 'node:fs/promises'
import assert from 'node:assert/strict'
const input=process.argv[2]??'reports/memory-investigation-2026-11-10/dependency-graph.json'
const graph=JSON.parse(await readFile(input,'utf8')),metadata=JSON.parse(await readFile('reports/build-metadata.json','utf8'))
const production=graph.modules.filter(m=>m.source.startsWith('src/')&&!/\.test\./.test(m.source))
const runtime=dependencies=>dependencies.filter(d=>!d.dependencyTypes.includes('type-only'))
function cycles(modules,includeTypes=false){
 const edges=new Map(modules.map(m=>[m.source,(includeTypes?m.dependencies:runtime(m.dependencies)).map(d=>d.resolved)])),visited=new Set(),active=[],found=new Set()
 function visit(node){const at=active.indexOf(node);if(at>=0){found.add([...active.slice(at)].sort().join('|'));return}if(visited.has(node))return;visited.add(node);active.push(node);for(const next of edges.get(node)??[])if(edges.has(next))visit(next);active.pop()}
 for(const node of edges.keys())visit(node)
 return [...found].map(s=>s.split('|'))
}
function violations(modules){
 const errors=[]
 for(const m of modules)for(const d of m.dependencies){
  if(/(?:\.test\.|\/e2e\/|(?:^|\/)(?:vitest|@playwright)\/)/.test(d.resolved))errors.push({rule:'production-cannot-import-tests',from:m.source,to:d.resolved})
  if(/^src\/(core|sampling)\//.test(m.source)&&/(?:^src\/(features|charts|components|app)\/|(?:^|\/)(react|react-dom|uplot)\/)/.test(d.resolved))errors.push({rule:'core-sampling-remain-ui-free',from:m.source,to:d.resolved})
  if(/^src\/worker\//.test(m.source)&&/^src\/features\//.test(d.resolved))errors.push({rule:'worker-cannot-import-pages',from:m.source,to:d.resolved})
  if(/^src\/charts\//.test(m.source)&&/^src\/data\/(generator|demo)\./.test(d.resolved))errors.push({rule:'charts-cannot-generate-source-datasets',from:m.source,to:d.resolved})
 }
 for(const cycle of cycles(modules))errors.push({rule:'runtime-cycle',members:cycle})
 return errors
}
const errors=violations(production),runtimeCycles=cycles(production),allCycles=cycles(production,true)
assert.equal(graph.summary.error,0,'dependency-cruiser found unresolved or forbidden dependencies')
assert.deepEqual(errors,[],'Production module boundaries failed')
const faults=[
 {name:'UI dependency in core',modules:[{source:'src/core/fault.ts',dependencies:[{resolved:'src/features/Page.tsx',dependencyTypes:['import']}]}],rule:'core-sampling-remain-ui-free'},
 {name:'test dependency in production',modules:[{source:'src/charts/fault.ts',dependencies:[{resolved:'src/data/engine.test.ts',dependencyTypes:['import']}]}],rule:'production-cannot-import-tests'},
 {name:'runtime cycle',modules:[{source:'src/a.ts',dependencies:[{resolved:'src/b.ts',dependencyTypes:['import']}]},{source:'src/b.ts',dependencies:[{resolved:'src/a.ts',dependencyTypes:['import']}]}],rule:'runtime-cycle'}
].map(fault=>{assert(violations(fault.modules).some(v=>v.rule===fault.rule),fault.name);return{name:fault.name,expectedRule:fault.rule,detected:true}})
const result={verified:true,sourceHash:metadata.sourceHash,buildHash:metadata.buildHash,tool:graph.summary.environment.version,modules:graph.summary.totalCruised,dependencies:graph.summary.totalDependenciesCruised,runtimeCycles,typeInclusiveCycles:allCycles,errors,controlledFaults:faults,scope:'dependency-cruiser actual TypeScript graph incl type-only imports. Runtime cycles exclude erased type edges; type-inclusive cycle paths remain explicit architectural coupling. Pure core/sampling imports are checked; DOM global usage also requires code review.'}
await writeFile(input.replace('dependency-graph.json','module-boundaries.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result))
