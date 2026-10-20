import { useState } from 'react';
import type { ScoreRange } from '../types';
import { DEFAULT_RANGE } from '../modules/filters';

interface FilterPanelProps {
  onChange: (range: ScoreRange) => void;
}

export const FilterPanel = ({ onChange }: FilterPanelProps) => {
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('100');
  const [error, setError] = useState('');

  const apply = () => {
    const from = Number(min);
    const to = Number(max);

    if (min === '' || max === '' || Number.isNaN(from) || Number.isNaN(to)) {
      setError('Введите числа');
    } else if (from > to) {
      setError('Минимум не может быть больше максимума');
    } else {
      setError('');
      onChange({ min: from, max: to });
    }
  };

  const reset = () => {
    setMin('0');
    setMax('100');
    setError('');
    onChange(DEFAULT_RANGE);
  };

  return (
    <div className="card">
      <h2>Фильтр</h2>
      <div className="row">
        <div>
          <label htmlFor="min">От</label>
          <input id="min" type="number" value={min} onChange={(e) => setMin(e.target.value)} />
        </div>
        <div>
          <label htmlFor="max">До</label>
          <input id="max" type="number" value={max} onChange={(e) => setMax(e.target.value)} />
        </div>
      </div>
      <p className="error" aria-live="polite">{error}</p>
      <div className="row">
        <button type="button" className="fullWidth" onClick={apply}>Применить</button>
        <button type="button" className="secondary fullWidth" onClick={reset}>Сбросить</button>
      </div>
    </div>
  );
};
