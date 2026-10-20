import type { Statistics } from '../types';
import { formatNumber } from '../modules/statistics';

interface StatsCardsProps {
  statistics: Statistics | null;
}

export const StatsCards = ({ statistics }: StatsCardsProps) => {
  if (!statistics) {
    return (
      <div className="card">
        <h2>Статистика</h2>
        <p className="hint">Нет данных</p>
      </div>
    );
  }

  const { count, mean, median, min, max, variance, stdDev } = statistics;
  const items = [
    { label: 'Среднее', value: mean },
    { label: 'Медиана', value: median },
    { label: 'Минимум', value: min },
    { label: 'Максимум', value: max },
    { label: 'Дисперсия', value: variance },
    { label: 'Ст. отклонение', value: stdDev },
  ];

  return (
    <div className="card">
      <h2>Статистика (оценок: {count})</h2>
      <div className="stats">
        {items.map(({ label, value }) => (
          <div key={label} className="stat">
            <span>{label}</span>
            <strong>{formatNumber(value)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};
