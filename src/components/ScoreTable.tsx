import type { StudentScore } from '../types';

interface ScoreTableProps {
  rows: StudentScore[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const ScoreTable = ({ rows, onRemove, onClear }: ScoreTableProps) => {
  if (rows.length === 0) {
    return (
      <div className="card">
        <h2>Оценки</h2>
        <p className="hint">Список пуст.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Оценки</h2>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Балл</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, name, score }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{score}</td>
              <td>
                <button type="button" className="secondary" onClick={() => onRemove(id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="danger" onClick={onClear}>Очистить всё</button>
    </div>
  );
};
