import { ArrowRight, ChartNoAxesColumn, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/arc/button/button';

interface Props {
  selected: string[];
  hiddenCount: number;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CompareSelectionBar({ selected, hiddenCount, onRemove, onClear }: Props) {
  if (!selected.length) return null;
  return (
    <section className="compare-selection-bar" aria-label="Comparison selection" data-testid="compare-selection-bar">
      <div className="compare-selection-summary">
        <ChartNoAxesColumn size={20} aria-hidden="true" />
        <div aria-live="polite">
          <strong>{selected.length} {selected.length === 1 ? 'run' : 'runs'} selected</strong>
          <span>{selected.length === 1 ? 'Select one more run to compare' : 'Ready to compare metrics'}{hiddenCount > 0 ? ` · ${hiddenCount} hidden by filters` : ''}</span>
        </div>
      </div>
      <ul className="compare-selection-chips" aria-label="Selected runs">
        {selected.map(id => (
          <li key={id}>
            <button type="button" onClick={() => onRemove(id)} aria-label={`Remove ${id.replace('kazakh-sft-', 'Run ')} from comparison`} title={id}>
              <span>{id.replace('kazakh-sft-', 'Run ')}</span><X size={14} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <div className="compare-selection-actions">
        <Button variant="ghost" size="sm" onClick={onClear}>Clear selection</Button>
        {selected.length >= 2 ? (
          <Link className="compare-selection-submit" to={`/compare?runs=${selected.join(',')}`}>
            Compare {selected.length} runs <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : <button className="compare-selection-submit" type="button" disabled>Compare runs <ArrowRight size={16} aria-hidden="true" /></button>}
      </div>
    </section>
  );
}
