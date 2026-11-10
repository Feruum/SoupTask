import json,sys,collections
from pathlib import Path
root=Path(sys.argv[1])
events=json.loads((root/'chrome-trace.json').read_text(encoding='utf8'))['traceEvents']
frames=[e for e in events if e.get('name')=='soup:hover-frame']
def detail(e):
    value=e.get('args',{}).get('data',{}).get('detail','{}')
    return json.loads(value) if isinstance(value,str) else value
windows=[]
for end in sorted(frames,key=lambda e:detail(e).get('requestToFrameMs',0),reverse=True)[:5]:
    data=detail(end);start=end['ts']-data['requestToFrameMs']*1000
    selected=[e for e in events if e.get('pid')==end['pid'] and e.get('tid')==end['tid'] and start<=e['ts']<=end['ts']]
    phases=collections.defaultdict(lambda:{'count':0,'sumMs':0})
    invalidations=[]
    for e in selected:
        if e.get('ph')=='X':phases[e['name']]['count']+=1;phases[e['name']]['sumMs']+=e.get('dur',0)/1000
        if 'Invalidation' in e['name'] or e['name']=='InvalidateLayout':invalidations.append({'name':e['name'],'offsetMs':(e['ts']-start)/1000,'args':e.get('args')})
    windows.append({'detail':data,'phases':dict(phases),'invalidations':invalidations,'timeline':[{'name':e['name'],'offsetMs':(e['ts']-start)/1000,'durationMs':e.get('dur',0)/1000,'args':e.get('args')} for e in selected if e['name'] in ['Layout','Paint','FireAnimationFrame','UpdateLayoutTree']]})
body_has_schedules=sum(e.get('name')=='ScheduleStyleInvalidationTracking' and e.get('args',{}).get('data',{}).get('nodeName')=='BODY' and e.get('args',{}).get('data',{}).get('changedPseudo')=='has' for e in events)
result={'scope':'Five slowest request-to-verified-source-frame windows; per-event-type sums can overlap and are not additive across types. Extra invalidation/stack trace is diagnostic, not standard acceptance.','frames':len(frames),'bodyHasSchedules':body_has_schedules,'windows':windows}
(root/'phase-analysis.json').write_text(json.dumps(result,indent=2),encoding='utf8')
for window in windows[:2]:
    print('requestToFrameMs',window['detail']['requestToFrameMs'],'verificationMs',window['detail'].get('verificationMs'))
    print(sorted(window['phases'].items(),key=lambda pair:pair[1]['sumMs'],reverse=True)[:8])
    for event in window['invalidations'][:6]:print(event)
