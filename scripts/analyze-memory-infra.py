from pathlib import Path
import json,sys,gzip

root=Path(sys.argv[1]);source=root/'memory-infra.json'
raw=json.loads(source.read_text(encoding='utf-8') if source.exists() else gzip.decompress((root/'memory-infra.json.gz').read_bytes()));records=[]
def attrs(node):
    return {k:int(v['value'],16) for k,v in node.get('attrs',{}).items() if v.get('type')=='scalar' and v.get('units')=='bytes'}
def frontier(allocators,prefix,metric):
    selected=[]
    for key in sorted(allocators,key=lambda n:(n.count('/'),n)):
        if key!=prefix and not key.startswith(prefix+'/'):continue
        value=attrs(allocators[key]).get(metric)
        if value is None or any(key==parent or key.startswith(parent+'/') for parent,_ in selected):continue
        selected.append((key,value))
    return {'bytes':sum(v for _,v in selected),'paths':selected}
for sample in raw['samples']:
    merged={};totals={}
    for event in sample['events']:
        pid=event['pid'];dump=event['args']['dumps'];merged.setdefault(pid,{}).update(dump.get('allocators',{}));totals.setdefault(pid,{}).update(dump.get('process_totals',{}))
    a=merged[sample['rendererPid']]
    categories={name:{'root':attrs(a.get(name,{})),'effectiveFrontier':frontier(a,name,'effective_size'),'sizeFrontier':frontier(a,name,'size')} for name in ['malloc','partition_alloc','v8','blink_gc','blink_objects','cc','gpu','skia','discardable','web_cache']}
    groups={pid:{'allocatorCount':len(values),'processTotals':totals[pid],'roots':{key:attrs(value) for key,value in values.items() if '/' not in key}} for pid,values in merged.items()}
    records.append({'label':sample['label'],'rendererPid':sample['rendererPid'],'cdpReturnedGuid':sample['cdpReturnedGuid'],'traceDumpIds':sample['traceDumpIds'],'association':sample['association'],'rendererProcessTotals':totals[sample['rendererPid']],'categories':categories,'topRendererSizeEntries':sorted([{'path':key,**attrs(value)} for key,value in a.items() if attrs(value).get('size',0)],key=lambda v:v['size'],reverse=True)[:35],'processes':groups})
    print(json.dumps({'label':sample['label'],'categoriesMiB':{name:round(value['effectiveFrontier']['bytes']/1048576,2) for name,value in categories.items()},'privateFootprintMiB':round(int(totals[sample['rendererPid']].get('private_footprint_bytes','0'),16)/1048576,2)}))
(root/'native-attribution.json').write_text(json.dumps({'sourceHash':raw['sourceHash'],'buildHash':raw['buildHash'],'scope':'Detailed Chromium MemoryInfra, unambiguously associated through begin/end UserTiming spans. Renderer and other process providers remain separate. Per-category frontier selects topmost provided paths to avoid nested double counting; categories must not be added to OS footprint or treated as universal tab/GPU totals. Root effective_size, size and allocated_objects_size are preserved. Missing provider values are not evidence of zero native use. B/T/F snapshots force GC and load profiler metadata: these are diagnostic allocations, not natural-GC footprint benchmarks.','samples':records},indent=2),encoding='utf-8')
