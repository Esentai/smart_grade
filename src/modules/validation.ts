import type { StudentScore, ValidationResult } from '../types';

const NUMBER_REGEX = /^-?\d+(\.\d+)?$/;

export const createId = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export const validateEntry = (rawName: string, rawScore: string): ValidationResult => {
  const name = rawName.trim();
  const scoreText = rawScore.trim();

  if (name === '') return { ok: false, error: 'Введите имя студента' };
  if (scoreText === '') return { ok: false, error: 'Введите балл' };
  if (!NUMBER_REGEX.test(scoreText)) return { ok: false, error: `"${scoreText}" не является числом` };

  const score = Number(scoreText);
  if (score < 0 || score > 100) {
    return { ok: false, error: `Балл должен быть от 0 до 100 (введено ${score})` };
  }

  return { ok: true, value: { id: createId(), name, score } };
};

export const isStudentScore = (value: unknown): value is StudentScore => {
  if (typeof value !== 'object' || value === null) return false;
  const { id, name, score } = value as Record<string, unknown>;
  return typeof id === 'string' && typeof name === 'string' && typeof score === 'number';
};

export const isStudentScoreArray = (value: unknown): value is StudentScore[] =>
  Array.isArray(value) && value.every(isStudentScore);
