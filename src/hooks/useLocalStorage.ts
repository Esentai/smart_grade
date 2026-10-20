import { useEffect, useState } from 'react';

type Guard<T> = (v: unknown) => v is T;

const readStorage = <T>(key: string, initialValue: T, isValid: Guard<T>) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return { value: initialValue, error: null };

    const parsed: unknown = JSON.parse(saved);
    if (isValid(parsed)) return { value: parsed, error: null };

    return { value: initialValue, error: 'Данные в localStorage повреждены, список очищен' };
  } catch {
    return { value: initialValue, error: 'Не удалось прочитать данные из localStorage' };
  }
};


export function useLocalStorage<T>(key: string, initialValue: T, isValid: Guard<T>) {
  const [initial] = useState(() => readStorage(key, initialValue, isValid));
  const [value, setValue] = useState<T>(initial.value);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Ошибка записи в localStorage', e);
    }
  }, [key, value]);

  return [value, setValue, initial.error] as const;
}
