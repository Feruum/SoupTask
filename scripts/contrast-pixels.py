from pathlib import Path
from PIL import Image
import json,sys,collections
root=Path(sys.argv[1]);ledger=json.loads((root/'ledger.json').read_text(encoding='utf-8'))
def luminance(rgb):
    values=[v/255 for v in rgb]
    return sum((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)*k for v,k in zip(values,[.2126,.7152,.0722]))
def ratio(a,b):
    x,y=luminance(a),luminance(b)
    return (max(x,y)+.05)/(min(x,y)+.05)
for entry in ledger['entries']:
    for run in entry['observations']:
        if run['status']!='pixel-review':continue
        image=Image.open(run['background']).convert('RGB')
        original=Image.open(run['original']).convert('RGB')
        colors=collections.Counter(bg for fg,bg in zip(original.get_flattened_data(),image.get_flattened_data()) if sum(abs(x-y) for x,y in zip(fg,bg))>3)
        run['inkPixels']=sum(colors.values())
        if not colors:
            run['status']='needs-review'
            run['reason']='No visible glyph difference between original and background-only capture'
            continue
        alpha=run['color'][3]/255*run['opacity']
        values=[(ratio([f*alpha+b*(1-alpha) for f,b in zip(run['color'][:3],bg)],bg),bg,count) for bg,count in colors.items()]
        worst=min(values)
        run['worstContrast']=worst[0];run['worstBackground']=worst[1];run['backgroundColorCount']=len(colors)
        run['status']='verified-pass' if worst[0]>=run['threshold'] else 'needs-review'
    statuses=[r['status'] for r in entry['observations']]
    entry['disposition']='unresolved' if entry.get('error') or 'needs-review' in statuses else 'verified-text' if 'verified-pass' in statuses else 'not-painted'
summary={'occurrences':len(ledger['entries']),'dispositions':dict(collections.Counter(e['disposition'] for e in ledger['entries'])),'scope':'Exact per-occurrence static replay with original and text-masked screenshots; computed foreground/ancestor opacity and worst actual background pixel contrast. Hidden/clipped cases retained with geometry. Not universal WCAG or human review certification.'}
ledger['summary']=summary
(root/'ledger.json').write_text(json.dumps(ledger,indent=2),encoding='utf-8')
(root/'summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary))
