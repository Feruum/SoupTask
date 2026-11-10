from pathlib import Path
from collections import Counter,deque
from array import array
import gzip,json,sys,gc

root=Path(sys.argv[1]);report=json.loads((root/'results.json').read_text(encoding='utf-8'))
def load(label):
    return json.loads(gzip.decompress((root/(label+'.heapsnapshot.gz')).read_bytes()))
def ids(label):
    data=load(label);nf=data['snapshot']['meta']['node_fields'];n=len(nf);ix=nf.index('id')
    return set(data['nodes'][ix::n])
def analyze(case):
    baseline=ids(case['baseline']);target=ids(case['target']);allocated=target-baseline;del target,baseline;gc.collect()
    data=load(case['final']);meta=data['snapshot']['meta'];nf=meta['node_fields'];ef=meta['edge_fields'];nt=meta['node_types'][0];et=meta['edge_types'][0];ns=data['nodes'];es=data['edges'];ss=data['strings'];nw=len(nf);ew=len(ef);ni={v:i for i,v in enumerate(nf)};ei={v:i for i,v in enumerate(ef)};count=len(ns)//nw
    candidates={ns[i+ni['id']] for i in range(0,len(ns),nw) if ns[i+ni['id']] in allocated}
    classes=Counter();sizes=Counter();detached=[];interesting=[]
    for k in range(count):
        o=k*nw;ident=ns[o+ni['id']];name=ss[ns[o+ni['name']]];typ=nt[ns[o+ni['type']]]
        if ident not in candidates:continue
        short=name[:110] if typ not in ['string','concatenated string','sliced string'] else '(string content omitted)'
        key=typ+' | '+short;classes[key]+=1;sizes[key]+=ns[o+ni['self_size']]
        if ni.get('detachedness') is not None and ns[o+ni['detachedness']]==2:
            detached.append(k)
            if 'canvas' in name.lower() or 'uplot' in name.lower():interesting.append(k)
    offsets=array('I',[0]);total=0
    for k in range(count):total+=ns[k*nw+ni['edge_count']]*ew;offsets.append(total)
    def name(k):return ss[ns[k*nw+ni['name']]][:120]
    def edge_name(o):
        typ=et[es[o+ei['type']]];value=es[o+ei['name_or_index']]
        return str(value) if typ in ['element','hidden'] else ss[value][:120]
    def paths(ignore_alternate=False):
        parents=array('i',[-2])*count;links=array('i',[-1])*count;parents[0]=-1;q=deque([0])
        wanted=set((interesting+detached)[:16])
        while q and wanted:
            k=q.popleft();wanted.discard(k)
            for o in range(offsets[k],offsets[k+1],ew):
                typ=et[es[o+ei['type']]]
                if typ=='weak' or ignore_alternate and edge_name(o)=='alternate':continue
                child=es[o+ei['to_node']]//nw
                if parents[child]!=-2:continue
                parents[child]=k;links[child]=o;q.append(child)
        result=[]
        for k in (interesting+detached)[:16]:
            if parents[k]==-2:continue
            chain=[];current=k
            while current>=0:
                chain.append({'id':ns[current*nw+ni['id']],'name':name(current),'type':nt[ns[current*nw+ni['type']]],'via':edge_name(links[current]) if links[current]>=0 else None})
                current=parents[current]
            result.append({'target':name(k),'chain':list(reversed(chain))})
        return result
    return {**case,'candidateCount':len(candidates),'candidateShallowBytes':sum(sizes.values()),'topCandidateClasses':classes.most_common(20),'topCandidateSelfBytes':sizes.most_common(15),'candidateDetachedNodes':len(detached),'candidateChartCanvasNodes':len(interesting),'retainerPaths':paths(),'pathsWithoutReactAlternateEdges':paths(True),'interpretation':'(T minus B) intersect F is a superset, not a verdict. Strong-edge BFS excludes weak edges. Alternate-edge exclusion is a separate diagnostic path search, not proof that all React-retained objects are leaks. Native resource ownership sizes require MemoryInfra.'}
results=[]
for case in report['cases']:
    value=analyze(case);results.append(value);print(json.dumps({k:value[k] for k in ['transitions','candidateCount','candidateDetachedNodes','candidateChartCanvasNodes']}));gc.collect()
(root/'retainer-analysis.json').write_text(json.dumps({'sourceHash':report['sourceHash'],'buildHash':report['buildHash'],'method':'Meta MemLab B/T/F set-difference method, independently implemented parser; not a claim to have run the MemLab CLI. Heap object IDs from one persistent profiler session. Paths contain real heap edges. Loaded modules, font/Intl caches and bounded React alternates require contextual disposition.','results':results},indent=2),encoding='utf-8')
