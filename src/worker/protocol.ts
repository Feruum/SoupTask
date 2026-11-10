import type { Metric, MetricSummary, RunDescriptor, QualityCounts, MetricRenderView, SourceRow, QualityIssue, IssueKind } from '@/data/types'
export interface StepRange { min: number; max: number }
export interface SessionIdentity { runId: string; revision: string; activationEpoch: number }
export interface WorkspaceIdentity { workspaceEpoch: number; selectionKey: string; members: SessionIdentity[] }
export interface RunMetadata { run: RunDescriptor; summaries: Record<Metric, MetricSummary>; quality: QualityCounts; domain: StepRange | null; allocationBytes: number; rawBufferBytes: number; generationMs: number; normalizationMs: number; indexBuildMs?: number; indexBufferBytes?: number; indexVersion?: string }
export type SamplerMode = 'scan' | 'stream' | 'indexed'
export type HoverSamples = Map<number, Record<string, SourceRow[]>>
export type AlignedMetricData=[number[]|Float64Array,...(number|null|undefined)[][]]
export interface WorkspaceView { viewSeq: number; range: StepRange; runs: Record<string, Record<Metric, MetricRenderView>>; alignment?:Record<Metric,AlignedMetricData> }
export interface IssueQuery { metric?: Metric; kind?: IssueKind; page?: number; pageSize?: number }
export type AcceptedIssueQuery = IssueQuery & { runId: string; page: number; pageSize: number }
export interface SourceQuery { sourceIndex?: number; step?: number; page?: number }
export type Operation =
  | { kind: 'activate'; runs: RunDescriptor[]; mode?: SamplerMode }
  | { kind: 'view'; range: StepRange; width: number; widths?: Partial<Record<Metric, number>>; mode: SamplerMode }
  | { kind: 'hover'; step: number }
  | { kind: 'prepare-hover'; steps: number[] }
  | { kind: 'inspect'; runId: string; query: SourceQuery }
  | { kind: 'rows'; runId: string; page: number }
  | { kind: 'issues'; runId: string; query: IssueQuery }
export type WorkerRequest = Operation & { identity: WorkspaceIdentity; requestId: number; viewSeq: number; hoverSeq: number; inspectSeq: number }
export type WorkerPayload =
  | { kind: 'activated'; runs: Record<string, RunMetadata>; domain: StepRange | null }
  | { kind: 'view'; view: WorkspaceView }
  | { kind: 'hover'; step: number; observations: Record<string, SourceRow[]> }
  | { kind: 'hover-prepared'; samples: HoverSamples; rowCount: number }
  | { kind: 'inspect'; rows: SourceRow[]; total: number; page: number }
  | { kind: 'rows'; rows: SourceRow[]; page?: number; runId?: string }
  | { kind: 'issues'; rows: QualityIssue[]; total: number; query?: IssueQuery; runId?: string }
  | { kind: 'error'; message: string; operation: Operation['kind'] }
export type WorkerReply = WorkerPayload & Pick<WorkerRequest, 'identity' | 'requestId' | 'viewSeq' | 'hoverSeq' | 'inspectSeq'>
export function matchesSession(a: SessionIdentity, b: SessionIdentity): boolean { return a.runId === b.runId && a.revision === b.revision && a.activationEpoch === b.activationEpoch }
export function matchesWorkspace(a: WorkspaceIdentity, b: WorkspaceIdentity): boolean {
  return a.workspaceEpoch === b.workspaceEpoch && a.selectionKey === b.selectionKey && a.members.length === b.members.length && a.members.every((member, index) => matchesSession(member, b.members[index]))
}
export function priority(operation: Operation): number { return operation.kind === 'activate' ? 4 : operation.kind === 'view' ? 3 : operation.kind === 'prepare-hover' ? 0 : operation.kind === 'hover' ? 1 : 2 }




