import {readFile,writeFile} from 'node:fs/promises'
const root=process.argv[2]??'reports/memory-investigation-2026-11-10/release-final-v2'
const json=async file=>JSON.parse(await readFile(file,'utf8'))
const [meta,unit,browser,latency,contrast,axe,memory,retained,lighthouse]=await Promise.all([
 json('reports/build-metadata.json'),json(`${root}/final-unit.json`),json(`${root}/final-browser/results.json`),json(`${root}/visible-latency.json`),json(`${root}/final-contrast/ledger.json`),json(`${root}/final-a11y-summary.json`),json(`${root}/final-memory/results.json`),json(`${root}/final-roundtrip/retainer-analysis.json`),json(`${root}/final-lighthouse/summary.json`)
])
if(!unit.success||browser.stats.unexpected||browser.stats.skipped||!latency.verified||!latency.confirmed)throw Error('Required final records are not complete')
const n=value=>Number(value).toFixed(1),mb=value=>n(value/1048576),source=meta.git.commit
const limits=latency.targets,occurrences=contrast.summary.occurrences
const names={cold:'Cold meaningful render',detailZoom:'Detail zoom',detailHover:'Detail hover on entry',compareZoom:'Compare zoom',compareHover:'Compare hover on entry',detailContinuous:'Detail continuous hover',compareContinuous:'Compare continuous hover'}
const measured=Object.entries(limits).map(([name,value])=>`| ${names[name]} | ${n(value.actualMs)} | ${value.limitMs} | ${value.actualMs<=value.limitMs?'Pass':'Miss'} |`).join('\n')
const memoryAll=memory.checkpoints.map(sample=>`| ${sample.label} | ${mb(sample.tabOwnedPrivateCommittedBytes)} | ${mb(sample.tabOwnedWorkingSetBytes)} |`).join('\n')
const perfScores=lighthouse.results.map(result=>Math.round(result.categories.performance*100))
const verdict=latency.misses.length?`Expanded limits remain unmet for ${latency.misses.map(name=>names[name].toLowerCase()).join(', ')}. Stable sub-50ms hover is not established. The demo is delivered with these measured limits; no100/100 grade is asserted.`:'The recorded expanded latency budgets pass in both final full-trace runs; this is not a universal latency guarantee or external100/100 grade.'
const link=file=>`../${root}/${file}`
const disclosure='The author designed the architecture and data pipeline, made the key engineering decisions and reviewed the code. AI helped implement and fix code, develop tests and independent oracles, run automated browser checks, collect traces and measurements, and research implementation options. Human NVDA/VoiceOver testing was not recorded. The author sends the submission email personally.'
await writeFile('docs/performance-results.md',`# Production performance and memory —11 November2026

Frozen source commit: \`${source}\`. [Source/build metadata](../reports/build-metadata.json) binds the current application. Historical reports remain archived and do not replace final-source acceptance.

## Corrected visible-hover endpoint

Earlier readouts could sit below the viewport. Those historical results measured DOM plus two RAFs and did not prove readable on-screen values. The desktop table now occupies a permanent area below a separate chart scroller. The current criterion requires original source DOM before BOTH RAF checks; at the second check, actual-step/metric text must fit viewport and clipping bounds and pass cell-center occlusion sampling. Missing observations are explicit. No physical monitor presentation or every-pixel occlusion guarantee is asserted. [Correction, experiments and limits](visible-hover-verification.md).

Windows11, Ryzen7 8845HS, Chromium158,1440×900,DPR1, production. CPU×4 applies to the main renderer; Worker throttling commands were unsupported. Each full recording uses five fresh browser contexts, two warmups and30 range/hover pairs in details and separately30 in four-run Compare, plus separate30-sample continuous movement series. Nearest-rank p95, no forced GC, no pooled samples. Shared-machine sequential measurements are not randomized causal proof.

| p95,ms | Worse of two final full recordings | Limit | Result |
|---|---:|---:|---|
${measured}

${verdict}

[Full recording1](${link('performance-trace/results.json')}) · [confirmation](${link('performance-confirmation/results.json')}) · [separate no-trace regime](${link('performance-no-trace/results.json')}) · [independent visible-value gate](${link('visible-latency.json')}) · [same-harness comparison](${link('latency-comparison.json')}). Trace overhead remains included; no-trace results never replace a failing recorded result.

The earlier correct-visibility baseline had detail/Compare hover p95 of57.5/70.0ms, cold2859.4ms and detail/Compare zoom138.7/164.8ms. The final measurements improve some metrics and regress others; the complete comparison retains both. The older offscreen numbers are a different evidence scope.

## Scoped native memory

[Current natural-GC process counters](${link('final-memory/results.json')}) deduplicate renderer and live dedicated-Worker PIDs using their own trace markers. Private committed memory and working set include native allocations; JS heap and typed buffers are separate and must not be added to them. Shared GPU/browser/utility processes are not wholly assigned to the tab. This is not universal total tab/GPU memory or a Task Manager screenshot.

| Checkpoint | Private committed,MiB | Working set,MiB |
|---|---:|---:|
${memoryAll}

The confirmed interrupted-drag leak was an outstanding uPlot document mouseup listener. Cleanup removes the actual registered listener before destroy. Canvas bitmaps are zero-sized on unmount; timing entries are capped128/name; Intl formatter caches are bounded32; decorative art now uses128/256/512px variants instead of1254px decoding. Raw R05 storage remains32,000,000bytes; the owned indexed buffer ledger is76,696,612bytes including raw. No raw ownership or numerical guarantee was weakened.

[Final B→T→F retainer analysis](${link('final-roundtrip/retainer-analysis.json')}) and [native MemoryInfra attribution](${link('final-roundtrip/native-attribution.json')}) are separate forced-snapshot diagnostics. Rolling-baseline20/60-round results do not mean zero total detached objects or universal leak freedom. [Full investigation and before-fix retaining chain](memory-investigation.md) preserves the original document→listener→uPlot path, native raster findings and natural-memory limits.

## Reproduction

Use fresh output directories. Run build and build-metadata, then set PERF_OUT and PERF_MODES=indexed before npm run perf. PERF_TRACE=off selects a separately labelled regime. MEMORY_OUT selects the natural Windows-counter experiment; ROUNDTRIP_OUT and ROUNDTRIP_DRAG=true select the separate retained-memory diagnosis. Heavy checks run sequentially. node scripts/trace-archives.mjs --unpack verifies/restores exact archived profiler JSON. Final Lighthouse scores are${Math.min(...perfScores)}–${Math.max(...perfScores)} Performance; Accessibility/Best Practices100. These settings differ from the custom CPU4 protocol.
`)
await writeFile('docs/implementation-status.md',`# Acceptance status —11 November2026

The five screens and20 deterministic demo snapshots are implemented. Frozen application/test snapshot: \`${source}\`. Build, lint,${unit.numPassedTests} unit tests and${browser.stats.expected} Chromium tests pass; no skipped, flaky, unexpected tests or test retries in the accepted run. Manifest regeneration covers all20runs. [Evidence manifest](../reports/evidence-manifest.json) supplies actual hashes and the final publication verdict.

The common readout is visible on wide screens, with full text-bound/clipping checks and both RAF callbacks retained. Explicit layout ownership replaces global body:has; text nodes are reused; microtasks coalesce source writes; Pin uses the row actually displayed. Raw metrics, extrema, invalid values, gaps and identity guards remain intact.

${verdict}

${axe.audits} axe audits report zero violations. All${occurrences} current contrast incomplete occurrences have pixel dispositions; the original516 remain separately archived. Lighthouse Performance${Math.min(...perfScores)}–${Math.max(...perfScores)}, Accessibility/Best Practices100. Browser evidence is not human assistive-technology certification. [Accessibility review](accessibility-review.md).

A real interrupted-drag listener leak was fixed. Current-source retained-object, MemoryInfra, native process-memory and boundary checks are recorded. Memory remains scoped; no universal leak-freedom or flat private-memory claim is made. [Memory investigation](memory-investigation.md).

[GitHub](https://github.com/Feruum/SoupTask) and the separate [production project](https://soup-training-monitor.vercel.app) are the delivery targets. Exact remote-byte and route smoke results are in the deployment record. There is no backend, live telemetry, smoothing, log scale, training control or invented GPU telemetry. Original live-discussion scoring/cancellation email was not verified; no100/100 grade is claimed.

${disclosure}
`)
await writeFile('docs/accessibility-review.md',`# Accessibility and runtime review —11 November2026

Source \`${source}\`; [current${browser.stats.expected}-test browser run](${link('final-browser/results.json')}) includes five screens, both themes,320/768/1440px,DPR2, keyboard, synthesized Chromium touch/gestures, locale/timezone, focus and lifecycle checks. No skips, unexpected/flaky cases or retries in that run. Physical-device and human screen-reader certification are unrecorded.

[${axe.audits} axe audits](${link('final-a11y-summary.json')}) have zero violations. All${occurrences} fresh color-contrast incomplete occurrences have [individual same-build pixel dispositions](${link('final-contrast/ledger.json')}). The [original516](../reports/perf-targets-2026-11-10/contrast-full/ledger.json) remain verified and archived; the later528-occurrence release is also historical. Raw incomplete findings are retained, not silently removed or promoted to automatic passes.

[Runtime actual Canvas/SVG checks](${link('final-runtime-retry/runtime-contrast.json')}) require series pixels≥3:1 and SVG labels≥4.5:1 in both themes. It also records20 settled transitions with one Worker/three plots and zero observed Workers after close. The first runtime attempt failed at Chrome screenshot capture; its failure log and partial result remain beside the accepted fresh retry. These observations are not universal leak freedom.

The common source table retains actual step, all three raw metrics, distance, revision/sourceIndex and Pin/group actions. Its scroll region is keyboard accessible. Desktop values occupy a persistent dock; shorter/narrower layouts retain an in-flow table. Actual source-cell clipping and hidden/opacity/occlusion negative controls supplement axe. The unchanged-row regression targets the visible part of the chart in the new main scroller. [Visible-value acceptance](visible-hover-verification.md).

[Impeccable technical audit](${link('impeccable-final-review.md')}) records detector limitations and code/runtime evidence. The four earlier corrections remain covered: Inspector empty/error feedback, intermediate-width preview, accurate zoom hints and readable issue labels. Test fixtures repaired for the new visibility boundary are retained with their real earlier failures.

Neither Lighthouse100 nor zero axe violations establishes every engine, every text-size/zoom setting, full WCAG certification or human NVDA/VoiceOver approval.
`)
await writeFile('docs/acceptance-matrix.md',`# Requirement-to-evidence map

Frozen source: \`${source}\`. All links below are executed evidence; older experiments remain under their original directories.

| Requirement | Current evidence |
|---|---|
|20runs, four fields,1M exact unique spike,32MB raw | [Unit/oracle results](${link('final-unit.json')}), [four release commands](${link('final-checks.json')}) |
| Truthful extrema, gaps, conflicts, source identity and bounded inspection | Unit/property tests; [${browser.stats.expected} browser tests](${link('final-browser/results.json')}); [actual Canvas controls](${link('final-canvas/manifest.json')}) |
| Stale replies, ABA/revisions, queues and ownership | Unit races; [named stale-control failure](../reports/async-negative/manifest.json); browser lifecycle |
| Five screens, routing, search/filters/selection, keyboard/mobile/themes | Browser run; [production smoke](../reports/deployment.json) |
| Visible actual values and two-frame endpoint | [Independent frame/cell confirmation](${link('visible-latency.json')}); source-cell fault cases |
| Accessibility, formatting and fresh incomplete findings | [Axe](${link('final-a11y-summary.json')}), [${occurrences} pixel dispositions](${link('final-contrast/ledger.json')}), original516 retained |
| Memory and resource lifetime | [B/T/F retainer chains](${link('final-roundtrip/retainer-analysis.json')}), [MemoryInfra](${link('final-roundtrip/native-attribution.json')}), [natural process counters](${link('final-memory/results.json')}) |
| Module boundaries and telemetry | [Boundary graph](${link('module-boundaries.json')}), [bounded-page/full-trace control](${link('final-timing-trace/results.json')}) |
| Production latency and separate no-trace | [Comparison](${link('latency-comparison.json')}), [visible target gate](${link('visible-latency.json')}) |
| Submission | README, [two-page note](../output/pdf/soup-submission-note.pdf), [AI disclosure](submission-note.md), [evidence manifest](../reports/evidence-manifest.json) |

${verdict} The original PDF has no numeric latency ceiling. Exact published bytes/routes are checked separately; the author sends the local email draft personally. A100/100 grade, scientific validity of logger input and universal browser/accessibility correctness are not asserted.
`)
// The submission note is edited by the author and rendered separately.
await writeFile('docs/submission-email.md',`# Local submission draft —not sent

To: team@trysoup.dev

Subject: Soup Frontend Engineer task —Training Monitor

Hello Soup team,

Source: https://github.com/Feruum/SoupTask
Application: https://soup-training-monitor.vercel.app
Two-page note: https://github.com/Feruum/SoupTask/blob/main/output/pdf/soup-submission-note.pdf
Evidence: https://github.com/Feruum/SoupTask/blob/main/reports/evidence-manifest.json

The five screens use20 reproducible snapshots, including the million-row exact source spike. Final build/lint,${unit.numPassedTests} unit and${browser.stats.expected} browser tests pass. The repository retains real fault-control failures, traces, visible-source checks, memory analysis and AI disclosure. ${verdict}

Please see the note and acceptance matrix for measured limits and reproduction. Human screen-reader certification was not recorded.

Thank you.

The author sends this draft personally; it has not been sent by the agent.
`)
let readme=(await readFile('README.md','utf8')).replace(/\r\n/g,'\n')
const marker='<!-- release-evidence:start -->'
const start=readme.includes(marker)?readme.indexOf(marker):readme.indexOf('The latest recorded release checks'),end=readme.indexOf('<details>\n<summary><img src="assets/readme/soup-icons/soup-recipe.png"',start)
if(start<0||end<0)throw Error('README release section markers not found')
readme=readme.slice(0,start)+`${marker}
The11 November2026 accepted run records **${unit.numPassedTests} unit tests and${browser.stats.expected} Chromium tests**, without skips, unexpected/flaky cases or retries. Source/build hashes and earlier failures remain in the [evidence manifest](reports/evidence-manifest.json).

| Evidence | Record |
|---|---|
| Unit/oracles | [${unit.numPassedTests} passes](${root}/final-unit.json) |
| Browser acceptance | [${browser.stats.expected} passes](${root}/final-browser/results.json) |
| Actual visible source values | [Two-RAF/cell confirmation](${root}/visible-latency.json) |
| Accessibility | [Fresh${occurrences} pixel dispositions](${root}/final-contrast/ledger.json) |
| Memory | [Retaining chains](${root}/final-roundtrip/retainer-analysis.json), [native process counters](${root}/final-memory/results.json) |
| Publication | [Direct routes and exact served bytes](reports/deployment.json) |
| Design review | [Impeccable technical audit](${root}/impeccable-final-review.md) |

**${verdict}** Earlier offscreen-readout timings do not prove readable on-screen values. The final criterion keeps current source DOM before both RAF callbacks and validates actual text geometry. Raw R05 storage is32,000,000bytes; heap, owned buffers and native process memory are distinct, non-additive scopes. A real interrupted-drag listener leak and oversized raster cost were corrected; universal leak freedom is not claimed.

[Measurements](docs/performance-results.md) · [Acceptance map](docs/acceptance-matrix.md) · [Memory investigation](docs/memory-investigation.md)

`+readme.slice(end)
await writeFile('README.md',readme)
let engineering=await readFile('docs/engineering-notes.md','utf8')
engineering=engineering.replace(/Build\/lint, 106 unit tests and 113 Chromium tests pass\./,`Build/lint,${unit.numPassedTests} unit tests and${browser.stats.expected} Chromium tests pass.`)
engineering=engineering.replace(/Source commit41ae67f contains the tested application; release commits also add evidence and documentation\./,`Frozen application/test snapshot${source} contains the accepted inputs; later release commits add documentation and evidence.`)
const p=engineering.indexOf('Set `PERF_OUT`'),q=engineering.indexOf('[Source repository]',p)
if(p>=0&&q>=0)engineering=engineering.slice(0,p)+`Use a fresh PERF_OUT and PERF_MODES=indexed with npm run perf; PERF_TRACE=off is separate. Final full traces, no-trace results and native memory are under${root}. [Current results](performance-results.md) replace the old offscreen-readout timing claim. ${verdict}

Natural Windows renderer/Worker footprint, retained heap paths and MemoryInfra are separate scopes. A real interrupted-drag listener leak, unbounded timing entries, formatter churn and oversized native raster caches were addressed. [Investigation](memory-investigation.md) records the exact retaining chain and limits. Source raw arrays stay Worker-owned.

Lighthouse and contrast run separately from performance. The current audit has${occurrences} individually reviewed incomplete occurrences; the original516 remain archived. Human screen-reader certification is not claimed.

`+engineering.slice(q)
engineering=engineering.replace('checks served HTML/JS/CSS/Worker bytes','checks every served build artifact, including HTML/JS/CSS/Worker/font/image bytes')
await writeFile('docs/engineering-notes.md',engineering)
let contract=await readFile('docs/data-contract.md','utf8')
contract=contract.replace('final106 unit/113 browser outputs under reports/perf-targets-2026-11-10.',`current${unit.numPassedTests} unit/${browser.stats.expected} browser outputs in reports/evidence-manifest.json.`)
await writeFile('docs/data-contract.md',contract)
let history=await readFile('docs/git-history.md','utf8')
history=history.replace('Application/source hash comparison verifies that the final release still contains the exact measured application inputs.','The rewrite preserved the then-measured application tree. Later fixes have new frozen source/build identities; historical reports are not promoted to current acceptance.')
await writeFile('docs/git-history.md',history)
const review=`# Impeccable4.6 technical audit —final source${source}

This is a bounded technical audit, not an external task grade or human assistive-technology certificate. The existing product/design context was retained; the requested4.8 update remains deferred. detect src scanned101 CSS/TS/TSX files with regex only and found no deterministic issues; parsed-page contrast/tiny-text rules did not run. [Actual detector log](impeccable-detect.log). Runtime evidence supplies distinct checks.

| Dimension | Score/4 | Evidence/limit |
|---|---:|---|
| Accessibility |3|${axe.audits} axe audits, zero violations,${occurrences} pixel dispositions; no human screen-reader certification |
| Performance |2| Visible-value tracing is corrected; expanded hover target misses remain explicit |
| Theming |3| Existing Arc semantic tokens and actual dark/light Canvas/SVG/DOM checks; bounded coverage |
| Responsive |3|320/768/1440,DPR2, keyboard and synthesized touch; physical devices/every engine untested |
| Implementation integrity |4| Source oracles, real Canvas controls, explicit snapshots, bounded ownership and epoch/revision guards |
| Total |15/20|Good, with measured latency limitation; not the task's external score |

The four earlier issues remain corrected: Inspector empty/error feedback, intermediate preview width, truthful zoom hints and readable issue names. The new persistent readout removes appearing-coordinate layout shifts. Actual source cells are on screen in desktop timing; clipping/opacity/occlusion faults cannot be accepted. Global body:has was removed in favor of a leased layout class and static membership metadata; cleanup restores prior state. Original text nodes are reused. Microtasks coalesce writes without changing both RAF checks; Pin acts on the displayed row. Independent [phase/ownership review](../../../docs/performance-phase-review.md) records causal evidence, rejected experiments and scope.

Final${unit.numPassedTests} unit/${browser.stats.expected} browser tests pass. The earlier obsolete mock and clipped-input fixture failures are preserved, with corrected accepted runs. A runtime Chrome screenshot protocol failure has a fresh accepted retry; it is not hidden. Actual contrast and lifecycle evidence is under this release directory. ${verdict}
`
await writeFile(`${root}/impeccable-final-review.md`,review)
let investigation=await readFile('docs/memory-investigation.md','utf8')
investigation=investigation.replace('Application source for final memory acceptance: `cd01873a47796a8a396631b67419e01d6ca7db7e`; source/build hashes are in [build metadata](../reports/build-metadata.json).',`Earlier memory-fix phase source: \`cd01873a47796a8a396631b67419e01d6ca7db7e\`; its identities remain in [that phase's checks](../reports/memory-investigation-2026-11-10/final-checks.json). The final release is revalidated on \`${source}\`: [retainer chains](${link('final-roundtrip/retainer-analysis.json')}), [native attribution](${link('final-roundtrip/native-attribution.json')}) and [natural process counters](${link('final-memory/results.json')}). These phases are not conflated.`)
await writeFile('docs/memory-investigation.md',investigation)
const tidy=text=>text.replace(/\b(All|all|After|after|The|the|both|under|with|over|in|of|for|sourceIndex|step|value|snapshot|scanned|Only|original|fresh|and|final|than|includes|no|has|cold|zoom|hover|Performance|Practices|raw|buffers|separate|recording)(?=\d)/g,'$1 ').replace(/(\d)(?=(?:unit|Chromium|browser|runs|bytes|rows|px|ms|MiB|MB|axe|workload|occurrences|Performance)\b)/g,'$1 ').replace(/\b(November|Windows|Chromium|Ryzen|DPR)(?=\d)/g,'$1 ').replace(/\bCPU×/g,'CPU ×').replace(/—(?=\d)/g,'— ')
for(const file of ['README.md','docs/performance-results.md','docs/implementation-status.md','docs/accessibility-review.md','docs/acceptance-matrix.md','docs/submission-email.md','docs/engineering-notes.md',`${root}/impeccable-final-review.md`])await writeFile(file,tidy(await readFile(file,'utf8')))
console.log(JSON.stringify({source,unit:unit.numPassedTests,browser:browser.stats.expected,contrast:occurrences,latencyMisses:latency.misses,retainerCases:retained.results.length}))
