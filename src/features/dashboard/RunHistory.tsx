import { useId, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCatalog } from '@/features/shared/Catalog';
import { HISTORY_AS_OF, historyDateLabel, historyDayDescription, historyDays, runHistory } from '@/data/run-history';
import type { HistoryDay } from '@/data/run-history';
const arrowOffsets: Record<string, number> = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };

export function RunHistory() {
  const catalog = useCatalog(), headingId = useId();
  const days = useMemo(() => historyDays(runHistory(catalog)), [catalog]);
  const [selectedDate, setSelectedDate] = useState<string | null>(() => days.findLast(day => day.runs.length > 0)?.date ?? null);
  const [hovered, setHovered] = useState<HistoryDay | null>(null);
  const [focusedDate, setFocusedDate] = useState(selectedDate ?? HISTORY_AS_OF);
  const selected = days.find(day => day.date === selectedDate);
  const leading = (new Date(`${days[0].date}T00:00:00Z`).getUTCDay() + 6) % 7;
  const cells: (HistoryDay | null)[] = [...Array<null>(leading).fill(null), ...days];
  while (cells.length % 7) cells.push(null);
  const weeks = cells.length / 7;
  const months = days.flatMap((day, index) => index === 0 || day.date.slice(8) === '01' ? [{
    label: new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(new Date(`${day.date}T00:00:00Z`)),
    column: Math.floor((leading + index) / 7) + 1,
  }] : []);
  const total = days.reduce((sum, day) => sum + day.runs.length, 0);
  const activeDays = days.filter(day => day.runs.length > 0).length;
  const level = (count: number) => Math.min(4, count);

  return <section className="source-panel run-history-panel" aria-labelledby={headingId}>
    <div className="panel-heading">
      <div><h2 id={headingId}>Run history</h2><p>Starts per day · {historyDateLabel(days[0].date)} – {historyDateLabel(HISTORY_AS_OF)} · UTC</p></div>
      <span className="snapshot-badge">Demo history</span>
    </div>
    <div className="run-history-body">
      <div className="run-history-totals"><CalendarDays size={18} aria-hidden="true" /><strong>{total} runs</strong><span>across {activeDays} active days</span></div>
      <p className="run-history-hint">Select a day to explore its experiments. Dates are reproducible demo metadata, separate from source update times.</p>
      <div className="run-history-chart" style={{ '--history-weeks': weeks } as CSSProperties}>
        <div className="run-history-months" aria-hidden="true">{months.map(month => <span key={month.label} style={{ gridColumn: month.column }}>{month.label}</span>)}</div>
        <div className="run-history-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
        <fieldset className="run-history-cells"><legend className="sr-only">Daily run starts. Use arrow keys to move between days and Enter to select.</legend>
          {cells.map((day, index) => day ? <button key={day.date} type="button" className={`history-day history-level-${level(day.runs.length)}`}
            data-history-date={day.date} aria-label={historyDayDescription(day)} aria-pressed={selectedDate === day.date}
            tabIndex={focusedDate === day.date ? 0 : -1} title={historyDayDescription(day)} onPointerEnter={() => setHovered(day)} onPointerLeave={() => setHovered(null)}
            onFocus={() => { setHovered(day); setFocusedDate(day.date); }} onBlur={() => setHovered(null)} onClick={() => setSelectedDate(day.date)}
            onKeyDown={event => {
              const offset = arrowOffsets[event.key];
              if (offset === undefined) return;
              event.preventDefault();
              const target = cells[index + offset];
              if (target) event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[data-history-date="${target.date}"]`)?.focus();
            }}>
            <span className="sr-only">{day.runs.length}</span>
          </button> : <span key={`outside-${index}`} className="history-outside" aria-hidden="true" />)}
        </fieldset>
      </div>
      <label className="run-history-date-picker">Inspect history date<input type="date" min={days[0].date} max={HISTORY_AS_OF} value={selectedDate ?? HISTORY_AS_OF} onChange={event => {
        if (days.some(day => day.date === event.target.value)) { setSelectedDate(event.target.value); setFocusedDate(event.target.value); }
      }} /></label>
      <div className="run-history-caption">
        <output>{hovered ? historyDayDescription(hovered) : selected ? historyDayDescription(selected) : '90 days · Select a square to see its runs'}</output>
        <figure className="run-history-legend" aria-label="Color intensity indicates daily run count"><span>Less</span>{[0, 1, 2, 3, 4].map(value => <i key={value} className={`history-level-${value}`} aria-hidden="true" />)}<span>More</span></figure>
      </div>
      {selected && <div className="run-history-detail" aria-live="polite">
        <div className="run-history-detail-heading"><h3>{historyDateLabel(selected.date)}</h3>{selected.runs.length > 0 && <Link className="text-link" to={`/runs?startedOn=${selected.date}`}>View {selected.runs.length} {selected.runs.length === 1 ? 'run' : 'runs'} <ArrowRight size={15} aria-hidden="true" /></Link>}</div>
        {selected.runs.length ? <ul>{selected.runs.map(event => {
          const run = catalog.find(item => item.id === event.runId)!;
          return <li key={event.runId}><Link to={`/runs/${event.runId}`}>{run.name}<ArrowRight size={14} aria-hidden="true" /></Link><span>{event.status}</span><time dateTime={event.startedAt}>{event.startedAt.slice(11, 16)} UTC</time></li>;
        })}</ul> : <p>No runs started on this day in the demo history.</p>}
      </div>}
    </div>
  </section>;
}
