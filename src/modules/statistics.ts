import type { Statistics } from '../types';

export const sum = (values: number[]): number => values.reduce((acc, v) => acc + v, 0);

export const mean = (values: number[]): number => sum(values) / values.length;

export const median = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
};

export const variance = (values: number[]): number => {
  const mu = mean(values);
  const squares = values.map((v) => (v - mu) ** 2);
  return sum(squares) / values.length;
};

export const computeStatistics = (values: number[]): Statistics | null => {
  if (values.length === 0) return null;

  const varValue = variance(values);
  return {
    count: values.length,
    mean: mean(values),
    median: median(values),
    min: values.reduce((a, b) => Math.min(a, b)),
    max: values.reduce((a, b) => Math.max(a, b)),
    variance: varValue,
    stdDev: Math.sqrt(varValue),
  };
};

export const formatNumber = (value: number, digits = 2): string =>
  String(Math.round(value * 10 ** digits) / 10 ** digits);
