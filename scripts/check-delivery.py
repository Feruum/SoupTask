from pathlib import Path
from io import BytesIO
import zipfile, hashlib, gzip, json, re
from pypdf import PdfReader
root = Path.cwd()
archive = root / 'output/soup-training-monitor-source.zip'
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None, 'ZIP CRC failure'
    names = set(bundle.namelist())
    required = ['README.md', 'src/worker/training.worker.ts', 'src/worker/hover-samples.ts', 'src/worker/aligned-wire.ts', 'src/core/engine.ts', 'src/sampling/block-index.ts', 'reports/evidence-manifest.json', 'reports/deployment.json', 'output/pdf/soup-submission-note.pdf', 'docs/acceptance-matrix.md']
    assert all(name in names for name in required), 'Missing required delivery file'
    assert not any(name.startswith(('node_modules/', 'tmp/', '.git/', '.vercel/', '.env')) for name in names), 'Excluded credential/cache path in ZIP'
    evidence = json.loads(bundle.read('reports/evidence-manifest.json'))
    for artifact in evidence['artifacts']:
        assert artifact['path'] in names, f"Missing indexed artifact: {artifact['path']}"
        with bundle.open(artifact['path']) as stream:
            assert hashlib.file_digest(stream, 'sha256').hexdigest() == artifact['sha256'], f"Artifact hash differs: {artifact['path']}"
    for key in ('performance','performanceConfirmation','performanceWithoutTrace','visibleLatency','contrast','memory','retainerAnalysis','nativeAttribution'):
        assert evidence['inputs'][key] in names, f'Missing current {key} evidence'
    assert evidence['unit']['passed'] == 109 and evidence['unit']['failed'] == 0
    assert evidence['browser']['expected'] == 131 and evidence['browser']['unexpected'] == 0
    assert evidence['browser']['skipped'] == 0 and evidence['browser']['flaky'] == 0
    assert evidence['pending'] == [], 'Delivery evidence is incomplete'
    misses = evidence['engineeringTargetMisses']
    assert (evidence['verdict'].startswith("DON'T SHIP against the expanded latency targets") if misses else evidence['verdict'] == 'SHIP'), 'Verdict must preserve actual latency misses'
    assert evidence['deployment']['verified'] is True
    assert evidence['deployment']['remoteBuildVerification']['verified'] is True
    assert evidence['contrastReview']['dispositions']['verified-text'] == evidence['contrastReview']['occurrences']
    history = json.loads(bundle.read('reports/git-history-rewrite.json'))
    assert history['requestedFirstCommitDate'] == '2026-11-10T20:00:00+05:00'
    assert history['authorReportedEveningSessionStart'] == '2026-11-10T19:00:00+05:00'
    original = json.loads(bundle.read('reports/perf-targets-2026-11-10/final-checks.json'))
    assert history['originalMeasuredApplicationCommit'] == original['sourceCommit']
    note_bytes = bundle.read('output/pdf/soup-submission-note.pdf')
    assert note_bytes == (root / 'output/pdf/soup-submission-note.pdf').read_bytes()
    assert len(PdfReader(BytesIO(note_bytes)).pages) == 2
    traces = json.loads(bundle.read('reports/trace-archives.json'))['entries']
    for trace in traces:
        compressed = bundle.read(trace['archive'])
        assert hashlib.sha256(compressed).hexdigest() == trace['archiveSha256']
        assert hashlib.sha256(gzip.decompress(compressed)).hexdigest() == trace['rawSha256']
    memory_path = evidence['inputs']['memory']
    memory = json.loads(bundle.read(memory_path))
    memory_trace = memory['trace']
    memory_bytes = bundle.read(memory_path.rsplit('/',1)[0]+'/'+memory_trace['file'])
    assert hashlib.sha256(memory_bytes).hexdigest() == memory_trace['compressedSha256']
    assert hashlib.sha256(gzip.decompress(memory_bytes)).hexdigest() == memory_trace['rawSha256']
    commit = bundle.comment.decode().strip()
links = []
for document in ['README.md', 'docs/git-history.md', 'docs/engineering-notes.md', 'docs/data-contract.md', 'docs/implementation-status.md', 'docs/performance-results.md', 'docs/performance-research-2026-11-10.md', 'docs/accessibility-review.md', 'docs/acceptance-matrix.md', 'docs/submission-note.md']:
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)', (root/document).read_text(encoding='utf-8')):
        if target.startswith(('https://', 'http://', '#')): continue
        assert (root/document).parent.joinpath(target.split('#')[0]).exists(), f'Missing local link: {document} -> {target}'
        links.append({'document': document, 'target': target})
hash_value = hashlib.file_digest(archive.open('rb'), 'sha256').hexdigest()
(root/'output/soup-training-monitor-source.sha256').write_text(f'{hash_value}  {archive.name}\n', encoding='ascii')
report = {'verified': True, 'gitCommit': commit, 'archiveBytes': archive.stat().st_size, 'sha256': hash_value, 'files': len(names), 'verifiedLosslessTraces': len(traces), 'pdfPages': 2, 'engineeringTargetMisses': misses, 'localLinks': links, 'scope': 'Delivery archive verification, not a claim that all engineering targets pass. Exact ZIP CRC, committed snapshot, excluded paths, indexed raw/compressed trace hashes, documentation links and final PDF.'}
(root/'output/delivery-check.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps({key: report[key] for key in ['verified','gitCommit','files','verifiedLosslessTraces','pdfPages','archiveBytes','sha256']}))
