import { useRef, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import type { StudentScore } from '../types';
import { validateEntry } from '../modules/validation';

interface ScoreFormProps {
  onAdd: (item: StudentScore) => void;
}

export const ScoreForm = ({ onAdd }: ScoreFormProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  const open = () => {
    setName('');
    setScore('');
    setError('');
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateEntry(name, score);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    onAdd(result.value);
    close();
  };

  return (
    <>
      <button type="button" onClick={open}>+ Добавить оценку</button>

      <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}
        aria-labelledby="modal-title">
        <form className="modal-body" onSubmit={handleSubmit} noValidate>
          <h2 id="modal-title">Добавить оценку</h2>

          <label htmlFor="name">Имя студента</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />

          <label htmlFor="score">Балл</label>
          <input id="score" value={score} onChange={(e) => setScore(e.target.value)} />

          <p className="error" aria-live="polite">{error}</p>
          <div className="row">
            <button type="submit" className="fullWidth">Добавить</button>
            <button type="button" className="secondary fullWidth" onClick={close}>Отмена</button>
          </div>
        </form>
      </dialog>
    </>
  );
};
