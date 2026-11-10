import { useId, useState } from 'react'
import { Funnel } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { RunManifestEntry } from '@/data/types'
import { SearchField } from '@/components/arc/search-field/search-field'
import { Button } from '@/components/arc/button/button'
import { ResponsiveDisclosure } from '@/features/shared/ResponsiveDisclosure'
import { issueCount } from '@/features/shared/Workspace'

export function RunNavigator({ runs, selected, compact, open, onToggle, onSelect }: {
  runs: readonly RunManifestEntry[]
  selected: string
  compact: boolean
  open: boolean
  onToggle: (open: boolean) => void
  onSelect: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [limit, setLimit] = useState(6)
  const id = useId()
  const needle = query.trim().toLowerCase()
  const matched = runs.filter(run => `${run.name} ${run.model} ${run.method} ${run.scenario}`.toLowerCase().includes(needle)
    && (filter === 'all' || filter === 'running' && run.status === 'Running' || filter === 'findings' && issueCount(run.quality) > 0 || filter === 'clean' && issueCount(run.quality) === 0))
  const visible = matched.slice(0, limit)
  const active = runs.find(run => run.id === selected) ?? runs[0]
  if (!needle && filter === 'all' && !visible.some(run => run.id === selected)) visible.splice(Math.max(0, visible.length - 1), 1, active)

  function clear() {
    setQuery('')
    setFilter('all')
    setFilterOpen(false)
    setLimit(6)
  }

  return <ResponsiveDisclosure label="Change run" meta={active.name} className="calm-navigator" breakpoint={1000} mobileOpen={open} onMobileToggle={onToggle}>
    <aside aria-label="Run navigator" className="calm-run-navigator">
      <div className="calm-navigator-heading"><h2>Runs</h2><span>{runs.length}</span></div>
      <div className="calm-run-search"><SearchField label="Search runs" placeholder="Search runs" value={query} onValueChange={value => { setQuery(value); setLimit(6) }} /><Button variant="secondary" aria-label="Filter runs" aria-expanded={filterOpen} aria-controls={`${id}-filters`} onClick={() => setFilterOpen(value => !value)}><Funnel size={17} aria-hidden="true" /></Button></div>
      {compact && <div className="calm-native-picker"><label htmlFor={`${id}-run`}>Selected experiment</label><select id={`${id}-run`} value={selected} onChange={event => onSelect(event.target.value)}>{runs.map(run => <option value={run.id} key={run.id}>{run.name}</option>)}</select></div>}
      <div id={`${id}-filters`} className="calm-run-filters" hidden={!filterOpen}><label htmlFor={`${id}-filter`}>Run filter</label><select id={`${id}-filter`} value={filter} onChange={event => { setFilter(event.target.value); setLimit(6) }}><option value="all">All runs</option><option value="running">Running</option><option value="findings">With findings</option><option value="clean">Clean source</option></select></div>
      {visible.length ? <ul className="calm-run-list">{visible.map(run => <li key={run.id}><button type="button" aria-pressed={run.id === selected} onClick={() => onSelect(run.id)}><span className="calm-run-name"><span className="sr-only">Select </span>{run.name}{issueCount(run.quality) > 0 && <><i className="calm-finding-dot" aria-hidden="true" /><span className="sr-only"> · Source findings</span></>}</span><small>{run.model} · {run.method}</small></button></li>)}</ul> : <div className="calm-no-runs"><p>No matching runs</p><Button variant="ghost" size="sm" onClick={clear}>Clear run filters</Button></div>}
      <div className="calm-navigator-footer"><output>Showing {visible.length} of {matched.length} matching runs</output>{visible.length < matched.length && <button type="button" onClick={() => setLimit(value => value + 6)}>Show more matching runs</button>}<Link to="/runs">View all {runs.length} runs</Link>{visible.length > 0 && (needle || filter !== 'all') && <span><button type="button" onClick={clear}>Clear run filters</button></span>}</div>
    </aside>
  </ResponsiveDisclosure>
}
