export interface StudentScore {
  id: string;
  name: string;
  score: number;
}

export interface Statistics {
  count: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  variance: number;
  stdDev: number;
}

export interface ScoreRange {
  min: number;
  max: number;
}

export type SortField = 'score' | 'name';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export type ValidationResult =
  | { ok: true; value: StudentScore }
  | { ok: false; error: string };

export type GradesAction =
  | { type: 'ADD'; payload: StudentScore }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR' };

export interface DistributionBucket {
  label: string;
  count: number;
}
