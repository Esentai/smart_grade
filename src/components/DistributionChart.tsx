import type { DistributionBucket } from '../types';

interface DistributionChartProps {
  data: DistributionBucket[];
}

export const DistributionChart = ({ data }: DistributionChartProps) => (
  <div className="card">
    <h2>Распределение оценок</h2>
    <div className="stats stats-5">
      {data.map(({ label, count }) => (
        <div key={label} className="stat">
          <span>{label}</span>
          <strong>{count}</strong>
        </div>
      ))}
    </div>
  </div>
);
