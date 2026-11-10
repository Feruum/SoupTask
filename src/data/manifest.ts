import manifest from './manifest.json';
import type { RunManifestEntry } from './types';
export const RUN_MANIFEST = manifest as RunManifestEntry[];
export { RUNS, METRICS } from './catalog';
