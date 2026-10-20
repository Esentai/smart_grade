import type { ScoreRange, SortConfig, StudentScore } from '../types';

export const DEFAULT_RANGE: ScoreRange = { min: 0, max: 100 };
export const DEFAULT_SORT: SortConfig = { field: 'score', order: 'desc' };

export const filterByRange = (scores: StudentScore[], { min, max }: ScoreRange): StudentScore[] =>
  scores.filter(({ score }) => score >= min && score <= max);

export const sortScores = (scores: StudentScore[], { field, order }: SortConfig): StudentScore[] => {
  const sign = order === 'asc' ? 1 : -1;
  return [...scores].sort((a, b) =>
    field === 'score' ? (a.score - b.score) * sign : a.name.localeCompare(b.name) * sign,
  );
};
