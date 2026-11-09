export type Metric = 'loss' | 'lr' | 'grad_norm';
export type Scenario = 'clean' | 'slow' | 'noisy' | 'divergence' | 'spike' | 'missing' | 'pos-inf' | 'neg-inf' | 'duplicates' | 'conflicts' | 'unsorted' | 'gaps' | 'zero' | 'plateau' | 'small-lr' | 'grad-spike' | 'mixed' | 'sparse' | 'singleton' | 'stale';
export interface RunDescriptor {
  id: string;
  name: string;
  model: string;
  method: string;
  scenario: Scenario;
  seed: number;
  rowCount: number;
  revision: string;
  generatorVersion: string;
  scenarioVersion: string;
  status: 'Running' | 'Completed' | 'Failed' | 'Cancelled';
  sourceUpdatedAt: string;
  expectedCadence?: number;
}
export interface RawColumns {
  step: Float64Array;
  loss: Float64Array;
  lr: Float64Array;
  grad_norm: Float64Array;
}
export type PlotData = [number[], (number | null | undefined)[]];
export interface RenderPoint {
  sourceIndex: number;
  step: number;
  value: number;
  segment: number;
}
export interface MetricSummary {
  latest: number | null;
  latestStep: number | null;
  latestStatus: 'finite' | 'invalid' | 'conflict' | 'empty';
  min: number | null;
  max: number | null;
  minStep: number | null;
  maxStep: number | null;
  finiteCount: number;
  invalidCount: number;
  conflictCount: number;
  lastFinite: RenderPoint | null;
}
export interface MetricQuality {
  nan: number;
  posInf: number;
  negInf: number;
  conflicts: number;
  gaps: number;
  invalidCount: number;
}
export interface QualityCounts {
  nan: number;
  posInf: number;
  negInf: number;
  duplicateRows: number;
  duplicateGroups: number;
  conflictGroups: number;
  invalidX: number;
  outOfOrder: number;
  gaps: number;
  metrics: Record<Metric, MetricQuality>;
}
export type IssueKind = 'nan' | 'posInf' | 'negInf' | 'duplicate' | 'conflict' | 'invalidX' | 'outOfOrder' | 'gap';
export interface QualityIssue {
  kind: IssueKind;
  metric: Metric | null;
  sourceIndex: number;
  step: number;
  value: number | null;
  message: string;
}
export interface SourceRow {
  sourceIndex: number;
  step: number;
  loss: number;
  lr: number;
  grad_norm: number;
}
export interface MetricRenderView {
  points: RenderPoint[];
  conflicts: RenderPoint[];
  breaks: {
    from: number;
    to: number;
    kind: string;
  }[];
  mode: 'line' | 'disconnected-extrema';
  min: number | null;
  max: number | null;
  rawCount: number;
  representedCount: number;
}
export interface RunManifestEntry extends RunDescriptor {
  normalizerVersion: string;
  summaries: Record<Metric, MetricSummary>;
  quality: QualityCounts;
  domain: {
    min: number;
    max: number;
  } | null;
}
