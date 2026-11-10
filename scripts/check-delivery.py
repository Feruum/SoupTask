from pathlib import Path
from io import BytesIO
import zipfile, hashlib, gzip, json, re
from pypdf import PdfReader
root = Path.cwd()
archive = root / 'output/soup-training-monitor-source.zip'
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None, 'ZIP CRC failure'
    names = set(bundle.namelist())
    required = ['README.md', 'src/worker/training.worker.ts', 'src/core/engine.ts', 'src/sampling/block-index.ts', 'reports/evidence-manifest.json', 'reports/deployment.json', 'reports/hover-guarded-performance/results.json', 'output/pdf/soup-submission-note.pdf', 'docs/acceptance-matrix.md']
    assert all(name in names for name in required), 'Missing required delivery file'
    assert not any(name.startswith(('node_modules/', 'tmp/', '.git/', '.vercel/', '.env')) for name in names), 'Excluded credential/cache path in ZIP'
    evidence = json.loads(bundle.read('reports/evidence-manifest.json'))
    assert evidence['unit']['passed'] == 99 and evidence['unit']['failed'] == 0
    assert evidence['browser']['expected'] == 94 and evidence['browser']['unexpected'] == 0
    assert evidence['deployment']['verified'] is True
    note_bytes = bundle.read('output/pdf/soup-submission-note.pdf')
    assert note_bytes == (root / 'output/pdf/soup-submission-note.pdf').read_bytes()
    assert len(PdfReader(BytesIO(note_bytes)).pages) == 2
    traces = json.loads(bundle.read('reports/trace-archives.json'))['entries']
    for trace in traces:
        compressed = bundle.read(trace['archive'])
        assert hashlib.sha256(compressed).hexdigest() == trace['archiveSha256']
        assert hashlib.sha256(gzip.decompress(compressed)).hexdigest() == trace['rawSha256']
    commit = bundle.comment.decode().strip()
links = []
for document in ['README.md', 'docs/data-contract.md', 'docs/implementation-status.md', 'docs/performance-results.md', 'docs/accessibility-review.md', 'docs/acceptance-matrix.md', 'docs/submission-note.md']:
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)', (root/document).read_text(encoding='utf-8')):
        if target.startswith(('https://', 'http://', '#')): continue
        assert (root/document).parent.joinpath(target.split('#')[0]).exists(), f'Missing local link: {document} -> {target}'
        links.append({'document': document, 'target': target})
hash_value = hashlib.file_digest(archive.open('rb'), 'sha256').hexdigest()
(root/'output/soup-training-monitor-source.sha256').write_text(f'{hash_value}  {archive.name}\n', encoding='ascii')
report = {'verified': True, 'gitCommit': commit, 'archiveBytes': archive.stat().st_size, 'sha256': hash_value, 'files': len(names), 'verifiedLosslessTraces': len(traces), 'pdfPages': 2, 'localLinks': links, 'scope': 'Exact source ZIP CRC, committed snapshot comment, excluded paths, all compressed/raw trace hashes, primary local documentation links and the final PDF.'}
(root/'output/delivery-check.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps({key: report[key] for key in ['verified','gitCommit','files','verifiedLosslessTraces','pdfPages','archiveBytes','sha256']}))