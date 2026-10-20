import type { SortConfig, SortField, SortOrder } from '../types';

interface SortControlsProps {
  sort: SortConfig;
  onChange: (sort: SortConfig) => void;
}

export const SortControls = ({ sort, onChange }: SortControlsProps) => (
  <div className="sort">
    <label htmlFor="sort-field">Сортировать:</label>
    <select
      id="sort-field"
      value={sort.field}
      onChange={(e) => onChange({ ...sort, field: e.target.value as SortField })}
    >
      <option value="score">по баллу</option>
      <option value="name">по имени</option>
    </select>

    <label htmlFor="sort-order" className="visually-hidden">Порядок</label>
    <select
      id="sort-order"
      value={sort.order}
      onChange={(e) => onChange({ ...sort, order: e.target.value as SortOrder })}
    >
      <option value="asc">по возрастанию</option>
      <option value="desc">по убыванию</option>
    </select>
  </div>
);
