/* oxlint-disable jsx-a11y/prefer-tag-over-role -- The interactive SVG has native selectors and an exact-count table alternative. */
import { useMemo } from 'react'
import type { KeyboardEvent } from 'react'
import type { Metric, RunManifestEntry } from '@/data/types'
import { formatStep } from '@/data/format'
import { METRICS, NAMES } from '@/features/shared/Workspace'
import { experimentGroups, finiteTileRows } from './dashboard-model'
import logo from '../../../assets/soup-logo.svg'

export const GROUP_COLORS = ['--chart-ochre', '--chart-purple', '--chart-teal', '--chart-line']

function position(radius: number, degrees: number) {
  const angle = degrees * Math.PI / 180
  return { x: 300 + radius * Math.cos(angle), y: 300 + radius * Math.sin(angle) }
}

function sector(inner: number, outer: number, from: number, to: number) {
  const a = position(inner, from), b = position(outer, from), c = position(outer, to), d = position(inner, to)
  return `M${a.x},${a.y}L${b.x},${b.y}A${outer},${outer} 0 0 1 ${c.x},${c.y}L${d.x},${d.y}A${inner},${inner} 0 0 0 ${a.x},${a.y}Z`
}

export function ExperimentMap({ runs, selected, metric, onSelect }: {
  runs: readonly RunManifestEntry[]
  selected: string
  metric: Metric
  onSelect: (runId: string, metric: Metric) => void
}) {
  const groups = useMemo(() => experimentGroups(runs), [runs])
  const orderedRuns = useMemo(() => groups.flatMap(group => group.methods.flatMap(method => method.runs)), [groups])
  const bands = useMemo(() => {
    const colorByRun = new Map(groups.flatMap(group => group.methods.flatMap(method => method.runs.map(run => [run.id, method.color] as const))))
    const maxima = Object.fromEntries(METRICS.map(key => [key, Math.max(1, ...runs.map(run => run.summaries[key].finiteCount))])) as Record<Metric, number>
    const angle = 360 / runs.length
    return orderedRuns.flatMap((run, index) => METRICS.map((key, band) => {
      const rows = finiteTileRows(run.summaries[key].finiteCount, maxima[key])
      const from = index * angle - 90 + 1.2, to = (index + 1) * angle - 90 - 1.2
      const quality = run.quality.metrics[key]
      return {
        run, index, metric: key, band, from, to,
        color: colorByRun.get(run.id) ?? 0,
        findings: quality.invalidCount + quality.conflicts + quality.gaps,
        tiles: Array.from({ length: rows * 6 }, (_, tile) => {
          const row = Math.floor(tile / 6), column = tile % 6
          return position(94 + band * 49 + row * 4.1, from + (column + .5) * (to - from) / 6)
        }),
      }
    }))
  }, [runs, groups, orderedRuns])
  const run = runs.find(item => item.id === selected) ?? runs[0]

  function navigate(event: KeyboardEvent<SVGPathElement>, runIndex: number, band: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(orderedRuns[runIndex].id, METRICS[band])
      return
    }
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
    event.preventDefault()
    const next = (runIndex + (event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0) + runs.length) % runs.length
    const nextBand = (band + (event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0) + METRICS.length) % METRICS.length
    const svg = event.currentTarget.ownerSVGElement
    onSelect(orderedRuns[next].id, METRICS[nextBand])
    requestAnimationFrame(() => svg?.querySelector<SVGElement>(`[data-sector="${orderedRuns[next].id}"][data-metric="${METRICS[nextBand]}"]`)?.focus())
  }

  return <section className="experiment-map-panel" aria-labelledby="experiment-map-title">
    <div className="dashboard-panel-title"><div><h2 id="experiment-map-title">Experiment map</h2><p>{runs.length} runs · {METRICS.length} metrics</p></div><span className="dashboard-map-index">01—{runs.length}</span></div>
    <svg className="experiment-map" viewBox="0 0 600 620" role="group" aria-labelledby="map-title map-description">
      <title id="map-title">Training experiments by model, method and metric</title>
      <desc id="map-description">Each sector is a run. Inner, middle and outer bands are Loss, Learning rate and Gradient norm. Tile length encodes finite source-row counts on a logarithmic scale. Colors identify model and method groups; diamonds mark data findings. Arrow keys select a run and metric. Exact counts are available in the table below.</desc>
      <g aria-hidden="true" className="map-routing">{[0, 7, 14, 21].map(offset => <path key={offset} d={`M350 ${53 - offset}V${12 - offset}H590M240 ${548 + offset}V${585 + offset}H590`} />)}</g>
      <g aria-hidden="true">
        {[78, 89, 137, 186, 236, 250, 258].map(radius => <circle key={radius} cx="300" cy="300" r={radius} className="map-guide" />)}
        <path d="M38 300H562M300 38V562" className="map-crosshair" />
        {bands.map(item => <g key={`${item.run.id}-${item.metric}`}>
          {item.run.id === selected && item.metric === metric && <path d={sector(90 + item.band * 49, 137 + item.band * 49, item.from - .5, item.to + .5)} className="map-selected-sector" />}
          {item.tiles.map((tile, index) => <rect key={index} x={tile.x - 2} y={tile.y - 2} width={4} height={4} rx={.7} fill={`var(${item.run.id === selected ? '--chart-line' : GROUP_COLORS[item.color]})`} />)}
          {item.findings > 0 && (() => { const at = position(136 + item.band * 49, (item.from + item.to) / 2); return <path className="map-finding-mark" d={`M${at.x},${at.y - 3.5}l3.5 3.5-3.5 3.5-3.5-3.5Z`} /> })()}
        </g>)}
      </g>
      {bands.map(item => <path key={`hit-${item.run.id}-${item.metric}`} role="button" tabIndex={item.run.id === selected && item.metric === metric ? 0 : -1}
        data-sector={item.run.id} data-metric={item.metric} aria-label={`${item.run.name}, ${NAMES[item.metric]} quality`} aria-pressed={item.run.id === selected && item.metric === metric}
        d={sector(90 + item.band * 49, 137 + item.band * 49, item.from, item.to)} className="map-hit-target" onClick={() => onSelect(item.run.id, item.metric)} onKeyDown={event => navigate(event, item.index, item.band)}>
        <title>{item.run.name} · {NAMES[item.metric]} · {formatStep(item.run.summaries[item.metric].finiteCount)} finite observations · {item.findings} findings</title>
      </path>)}
      <g aria-hidden="true"><circle cx="300" cy="300" r="61" className="map-center" /><image href={logo} x="278" y="254" width="44" height="44" /><text x="300" y="319" textAnchor="middle" className="map-center-run">RUN {selected.slice(-3)}</text><text x="300" y="337" textAnchor="middle" className="map-center-metric">{NAMES[metric]}</text></g>
      <g aria-hidden="true">{orderedRuns.map((item, index) => { const at = position(272, (index + .5) * 360 / runs.length - 90); return <text key={item.id} x={at.x} y={at.y + 3} textAnchor="middle" className="map-run-label">{item.id.slice(-2)}</text> })}</g>
    </svg>
    <div className="map-group-legend">{groups.flatMap(group => group.methods.map(method => <span key={`${group.model}-${method.method}`}><i style={{ background: `var(${GROUP_COLORS[method.color]})` }} aria-hidden="true" />{group.model.replace('Qwen2.5-', '')} / {method.method}</span>))}<span><i className="map-legend-finding" aria-hidden="true" />Source findings</span></div>
    <p className="map-reading-key">Tile length: finite rows (log). Inner → outer: Loss / LR / Grad norm.</p>
    <div className="map-selectors"><div><label htmlFor="dashboard-experiment">Inspect experiment</label><select id="dashboard-experiment" value={selected} onChange={event => onSelect(event.target.value, metric)}>{runs.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></div><div><label htmlFor="dashboard-metric">Metric</label><select id="dashboard-metric" value={metric} onChange={event => onSelect(selected, event.target.value as Metric)}>{METRICS.map(key => <option value={key} key={key}>{NAMES[key]}</option>)}</select></div></div>
    <details className="source-details map-source-table"><summary>Accessible quality table</summary><div className="table-scroll"><table><caption>Same source summaries as the radial map. Selected: {run.name}.</caption><thead><tr><th scope="col">Run</th>{METRICS.map(key => <th scope="col" key={key}>{NAMES[key]}</th>)}</tr></thead><tbody>{runs.map(item => <tr key={item.id}><th scope="row"><button onClick={() => onSelect(item.id, metric)} aria-pressed={item.id === selected}>{item.name}</button></th>{METRICS.map(key => <td key={key}>{formatStep(item.summaries[key].finiteCount)} finite; {item.quality.metrics[key].invalidCount} invalid / {item.quality.metrics[key].conflicts} conflicts / {item.quality.metrics[key].gaps} gaps</td>)}</tr>)}</tbody></table></div></details>
  </section>
}
