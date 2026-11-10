# Immutable performance runtime inputs

before-runtime.zip contains the internally stable scan/stream/indexed comparison source. after-runtime.zip contains the final guarded indexed application and the exact performance harness used for the latest measurement. ZIP hashes are in manifest.json; result directories retain source/build/lock/harness hashes.

Extract each ZIP into a separate empty directory, install the locked dependencies with Node24.22.1/npm11+, install Playwright Chromium, set PERF_OUT to a fresh directory, then run `node scripts/performance.mjs`. For the after experiment set PERF_MODES=indexed. Use shell-appropriate environment syntax. The expected environment is recorded in each results.json. Do not run measurements concurrently.

These archives preserve runtime and performance inputs, not a complete test checkout. Tests, Vitest/Playwright configs, documentation, and all red/green evidence are in the main repository. No node_modules, personal environment files, deployment credentials or browser profiles are included.

Different revisions and uncontrolled shared-machine background activity limit causal conclusions. All intermediate measurements are retained; the latest result is not chosen by lowest latency.
