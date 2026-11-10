# Soup Training Monitor

Full frontend delivery - 10 November 2026. [Production application](https://soup-training-monitor.vercel.app). Five screens: Dashboard, Training runs, Run details, Compare and Data quality. All sources are explicitly labelled demonstration snapshots. The existing Soup landing project was not redeployed.

## Product and source truth

Circle sectors select a run and metric, update its facts/preview and expose source/quality actions. Charts support mouse wheel, touchpad pinch, Shift-wheel pan, drag selection and keyboard range controls. Compare provides consistent series emphasis, original-step cursors, three-metric summaries and pinned exact source rows. Quality findings lead to revision-qualified source indices.

Twenty seeded scenarios cover convergence, divergence, nonfinite values, duplicates, ordering, cadence gaps, zero/tiny values and a singleton. R05 has 1,000,000 rows; its unique injected Loss maximum is sourceIndex 500001, step 500001, value 100. Four raw Float64 columns remain Worker-owned. Rendering retains source provenance and visible extrema; conflicts and known gaps break the authoritative line. It does not promise every local oscillation or a scientific training-stop decision.

## Verification

Production build and lint pass; 95 unit tests and 49 Chromium acceptance tests pass, with no skipped or flaky browser tests. Coverage includes controlled async identities/queues, independent raw-data oracles, real Canvas spike/gap pixels, gestures, keyboard activation, 320/768/1440 px, DPR2 and locale/timezone checks. Six fault classes produce genuine expected assertion failures, including suppressed drawing. Raw red/green output is preserved.

Thirty axe audits report zero violations; incomplete findings are retained and reviewed separately. Lighthouse desktop performance is 96-97 across five screens; accessibility and best-practices scores are 100. Actual unfocused Canvas series contrast is at least 7.89:1 dark / 4.94:1 light; SVG text is at least 8.41:1 / 6.15:1. These checks do not constitute human screen-reader certification.

## Measured performance

Windows 11, Ryzen 7 8845HS, Chromium 158, 1440x900, DPR1: five cold contexts and thirty zoom/hover pairs per variant, separately for Compare. Main renderer CPU rate 4; Worker throttling was attempted and explicitly unsupported. Nearest-rank p95 cold/zoom/accepted-hover: scan 3340/671/25 ms; stream 3406/442/24 ms; indexed 3118/230/22 ms. Indexed Compare zoom/hover: 309/41 ms. Hover stops at accepted raw response, not final pixel paint. Traces, all samples and timing definitions accompany the source.

<!-- pagebreak -->

## Verdict and first fix

**DON'T SHIP as a fully accepted hand-in yet.** The implemented frontend is published and functional, but required Chrome Task Manager footprint/JavaScript-memory evidence remains unrecorded. Native window binding failed twice despite discovering the correct isolated Chrome window; a human readout was requested. CDP heap is not relabelled as Task Manager or total tab memory.

First complete that footprint capture and review it alongside the saved Worker/buffer ledger. Cold render <=3000 ms and zoom <=200 ms engineering targets were also missed; profile the remaining main-render path and repeat the same protocol before claiming those budgets pass. No unresolved extrema loss, gap bridging or stale overwrite is known in the tested source, but tests cannot establish universal absence.

## Memory, changes and surprises

R05 raw element storage is exactly 32,000,000 bytes. Its normalized/index typed-buffer ledger is 76,696,612 bytes, including a 1,696,608-byte exact index built in approximately 243 ms. Main used heap was 7.08 MB initially and 16.60 MB after twenty SPA switches without forced GC. These distinct scopes exclude browser/GPU/process footprint and retiring isolates; they are not summable tab memory or a leak-freedom proof.

A separate unthrottled lifecycle check observed one settled Worker and three charts after each of twenty transitions, then zero Workers after context close. Retiring large-run Workers took 279-372 ms to disappear; the initial over-eager assertion failure is preserved. Profiling also exposed a redraw/cursor feedback loop and duplicate full paints. Both were corrected; removing duplicate paint did not establish a detail-zoom timing improvement (226 to 230 ms), while Compare changed from 334 to 309 ms. Range drafts and page labels now follow numerical ranges and accepted source replies respectively.

## AI disclosure and reproduction

AI assisted architecture, implementation, tests, independent oracle code, fault injection, browser automation, profiling and documentation. Proposals were checked against original rows and actual Canvas pixels; faulty variants were required to fail named assertions. Human actions recorded here are the supplied requirements/references, project choice and Vercel authentication. No human NVDA/VoiceOver or scientific-model review is claimed. The original changed-deadline email was not found.

Use README.md, docs/performance-results.md and reports/evidence-manifest.json for reproduction, commands, hashes, raw results, publication smoke and remaining limitations. Source archives retain lossless gzip traces; `node scripts/trace-archives.mjs --unpack` verifies/restores their exact originals. The local Git repository and source archive accompany this two-page note.
