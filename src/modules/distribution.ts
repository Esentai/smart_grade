import type { DistributionBucket } from '../types';

const BUCKETS = [
  { label: '0–59', from: 0, to: 59.99 },
  { label: '60–69', from: 60, to: 69.99 },
  { label: '70–79', from: 70, to: 79.99 },
  { label: '80–89', from: 80, to: 89.99 },
  { label: '90–100', from: 90, to: 100 },
];

export const buildDistribution = (scores: number[]): DistributionBucket[] =>
  BUCKETS.map(({ label, from, to }) => ({
    label,
    count: scores.filter((s) => s >= from && s <= to).length,
  }));
