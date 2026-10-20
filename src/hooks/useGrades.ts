import { useEffect, useMemo, useReducer, useState } from 'react';
import type { GradesAction, ScoreRange, SortConfig, StudentScore } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { computeStatistics } from '../modules/statistics';
import { DEFAULT_RANGE, DEFAULT_SORT, filterByRange, sortScores } from '../modules/filters';
import { buildDistribution } from '../modules/distribution';
import { isStudentScoreArray } from '../modules/validation';

const gradesReducer = (state: StudentScore[], action: GradesAction): StudentScore[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const useGrades = () => {
  const [saved, setSaved, storageError] = useLocalStorage<StudentScore[]>('grades', [], isStudentScoreArray);
  const [grades, dispatch] = useReducer(gradesReducer, saved);
  const [range, setRange] = useState<ScoreRange>(DEFAULT_RANGE);
  const [sort, setSort] = useState<SortConfig>(DEFAULT_SORT);

  useEffect(() => setSaved(grades), [grades, setSaved]);

  const filtered = useMemo(() => filterByRange(grades, range), [grades, range]);
  const sorted = useMemo(() => sortScores(filtered, sort), [filtered, sort]);
  const statistics = useMemo(() => computeStatistics(filtered.map((g) => g.score)), [filtered]);
  const distribution = useMemo(() => buildDistribution(filtered.map((g) => g.score)), [filtered]);

  return {
    sorted, statistics, distribution, storageError,
    sort, setSort, setRange,
    add: (item: StudentScore) => dispatch({ type: 'ADD', payload: item }),
    remove: (id: string) => dispatch({ type: 'REMOVE', payload: { id } }),
    clear: () => dispatch({ type: 'CLEAR' }),
  };
};
