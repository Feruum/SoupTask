# Retained memory investigation — 11 November 2026

The confirmed leak was an interrupted uPlot drag: leaving the page before mouseup left a listener on `document`. Native raster bloat was a separate issue: large decorative source images were repeatedly cached at about6MiB each. Both have targeted fixes and real red/green evidence. Ordinary Windows private committed memory is **not flat** and is not claimed to have fallen substantially.

Earlier memory-fix phase source: `cd01873a47796a8a396631b67419e01d6ca7db7e`; its identities remain in [that phase's checks](../reports/memory-investigation-2026-11-10/final-checks.json). The final release is revalidated on `408d27bdc6b0baf2c2136927ba5774dbac799a60`: [retainer chains](../reports/memory-investigation-2026-11-10/release-final-v2/final-roundtrip/retainer-analysis.json), [native attribution](../reports/memory-investigation-2026-11-10/release-final-v2/final-roundtrip/native-attribution.json) and [natural process counters](../reports/memory-investigation-2026-11-10/release-final-v2/final-memory/results.json). These phases are not conflated. Numerical data/core/sampling semantics are unchanged. The author owns the architecture, pipeline and engineering decisions/review; AI implemented fixes, tests and automated investigations.

## 1. Retainer analysis using Meta's MemLab method

[Method](https://meta.github.io/memlab/docs/how-memlab-works/): compute `(target minus baseline) intersect final`, then inspect actual strong paths from GC roots. This is an independently implemented snapshot parser, not a claim that the MemLab CLI was installed or run.

A warm neutral Not found route is the baseline. The workload opens R05 and a four-run Compare, starts a native DOM mousedown, and returns without mouseup. All snapshots use the same persistent profiler session; snapshots imply GC. One workload round includes detail, Compare and return; the20/60-round cases therefore exercise60/180 SPA navigations. Synthetic interrupted input is explicitly distinguished from physical-device testing.

The [before-fix path](../reports/memory-investigation-2026-11-10/interrupted-drag-before/retainer-analysis.json) includes:

`GC roots → HTMLDocument → EventTargetData → RegisteredEventListener → V8EventListener → uPlot mouseup handler → closure context → uplot root/Canvas/event path`.

The installed library registers document mouseup in `mouseDown`, while its `destroy()` clears bookkeeping without removing an outstanding document listener. The adapter now preserves the native binder's actual arguments, tracks the returned listener and removes it during cleanup. It clones the bind object to avoid modifying shared defaults. The browser regression observes that the listener exists during drag and is removed **before** a later mouseup could hide the defect.

| B/T/F candidate result | Detached candidates | Chart/Canvas candidates | Workers after return |
|---|---:|---:|---:|
| Before fix, one interrupted round | 687 | 10 | 0 |
| Final fix, first round | 133 | 5 | 0 |
| Final fix,20 additional rounds | 0 | 0 | 0 |
| Final fix,60 additional rounds | 0 | 0 | 0 |

[Final retained-object analysis](../reports/memory-investigation-2026-11-10/final-roundtrip/retainer-analysis.json) contains real object IDs and edge paths. The first returned snapshot still contains a bounded Window/V8 allocation-site feedback/accessor path. Rolling-baseline20/60 results mean **no newly accumulating detached candidates**, not zero detached objects in the entire heap. Loaded code, caches, profiling objects and return-only allocations require contextual review; this is not universal leak-freedom proof.

## 2. Chromium MemoryInfra and native resources

[MemoryInfra](https://chromium.googlesource.com/chromium/src/+/main/docs/memory-infra/README.md) separates V8, Blink, compositor, Skia, allocators and other process providers. The experiment brackets each detailed dump with unique UserTiming markers. Returned CDP GUIDs and trace IDs are preserved; a unique dump group in the request span establishes association instead of assuming the IDs are equal.

Comparing source3ee28c5 (listener fixed, full-size art) with final cd01873 (responsive art), same warm round-trip workload:

| Renderer provider after60-round return | Before responsive art, MiB | Final, MiB |
|---|---:|---:|
| Compositor `cc` effective frontier | 201.84 | 18.29 |
| PartitionAlloc effective frontier | 55.07 | 3.97 |
| V8 effective frontier | 9.69 | 10.44 |
| Skia effective frontier | 0.19 | 0.19 |
| Renderer private footprint | 162.51 | 112.41 |

The large growing compositor branch was `cc/image_memory/.../at_raster`, with unlocked source-image entries around6MiB. SoupArt's1254×1254 RGBA sources need6,290,064 pixel bytes, although their UI boxes are80–128px. [Responsive128/256/512 PNGs](../assets/ui/manifest.json) use deterministic nearest-neighbour delivery, with1x/2x/4x selection. Original artwork is retained. At DPR1 a128×128 image needs65,536 pixel bytes; DPR2 uses256×256. Actual recipe/empty-state captures at desktop dark DPR1 and mobile light DPR2 were visually reviewed under [artwork-review](../reports/memory-investigation-2026-11-10/artwork-review/results.json).

[Native attribution](../reports/memory-investigation-2026-11-10/final-roundtrip/native-attribution.json) keeps provider paths, raw sizes, effective sizes and other processes separate. Nested entries are not summed twice, GPU/shared services are not assigned wholly to the tab, and an absent provider is not zero usage. These GC/snapshot diagnostic numbers do not replace the natural-GC OS experiment. Blink committed pages exceed live allocated-object bytes, and warmed allocator/code/cache footprints need not immediately return to initial levels.

## 3. Resource ownership and architectural review

The [independent ownership review](resource-ownership-review.md) follows [Google's review criteria](https://google.github.io/eng-practices/review/reviewer/looking-for.html): design, concurrency, complexity and useful tests. It covers Worker raw/index ownership(max4 runs), controller queue(max1 running+1 pending), view/revision-bound cursor cache(max8192 targets/16384 rows), uPlot/Canvas, listeners, observers, RAFs and module caches.

Additional targeted fixes bound UserTiming entries128 per fixed name/type and timestamp formatters32 per locale/timezone key. A constructor regression recorded1500 `Intl.DateTimeFormat` allocations for1000 outputs before reuse; the green test permits at most2 while checking identical timezone/DST output and eviction. Canvas dimensions are zeroed on teardown even if an external reference retains the node. No forced GC is added to production.

## 4. Automated module boundaries

[dependency-cruiser graph](../reports/memory-investigation-2026-11-10/dependency-graph.json) and [rule results](../reports/memory-investigation-2026-11-10/module-boundaries.json) check production-to-test imports, unresolved dependencies, pure core/sampling, Worker-to-page dependencies and chart-to-generator dependencies. Runtime cycle detection excludes erased type imports; type-inclusive cycle paths remain explicit coupling, not hidden as runtime failures. Controlled bad edges and a runtime cycle prove the checker recognizes named violations. The QA parser is temporary TypeScript5.9.3 with dependency-cruiser18.7.2; project dependencies/TypeScript are unchanged.

## 5. Performance control and natural memory

[Interleaving guidance](https://google.github.io/benchmark/user_guide.html#random-interleaving) motivates old/new/old/new runs on external power with the same CPU×4 main renderer,30 interactions per workspace, trace mode and original pointer→committed-source-DOM→two-RAF endpoint. This fixed ordering is not randomized. Active-agent and agent-idle series are saved separately; neither series may be replaced by only its fastest run. See [performance results](performance-results.md) for actual budgets and limitations.

Natural-GC Windows counters, one isolated browser, unthrottled memory experiment:

| Checkpoint | Previous private/working set, MiB | Final run1 | Final run2 |
|---|---:|---:|---:|
| R05 settled | 146.2 /245.9 | 147.2 /241.1 | 145.7 /239.1 |
| After20 Runs→detail workload rounds | 265.3 /444.9 | 263.6 /376.1 | 263.4 /375.9 |
| R05+three runs in Compare | 266.6 /445.4 | 273.2 /390.2 | 272.5 /389.1 |

[Final run1](../reports/memory-investigation-2026-11-10/final-memory-fixed/results.json), [repeat](../reports/memory-investigation-2026-11-10/final-memory-fixed-repeat/results.json) and [previous-build sample](../reports/memory-investigation-2026-11-10/before-natural-memory/results.json) retain all counters, PID association, backing-buffer ledgers and traces. Final runs are on power; the previous natural sample preceded that change, so this is not a randomized same-power memory effect estimate. Working set is lower in these samples, while private committed memory is effectively unchanged. Do not conflate active1M-workspace memory with the smaller returned-neutral-page diagnostic.

The separate160-round main/Worker GC diagnosis found constant active Worker backing storage about76.7MB and post-GC Worker JS heap about0.5MB. Ordinary post-GC20/40/60 DOM/listener counts plateau; final returned round-trip states have0 Workers,319 DOM nodes and208 listeners. This constrains the observed leak mechanism and does not promise zero browser cache, every possible gesture sequence, all listener lifetimes or all hardware behavior.
