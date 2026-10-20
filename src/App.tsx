import { useGrades } from './hooks/useGrades';
import { ScoreForm } from './components/ScoreForm';
import { FilterPanel } from './components/FilterPanel';
import { SortControls } from './components/SortControls';
import { StatsCards } from './components/StatsCards';
import { DistributionChart } from './components/DistributionChart';
import { ScoreTable } from './components/ScoreTable';

export const App = () => {
  const { sorted, statistics, distribution, storageError, sort, setSort, setRange, ...actions } = useGrades();

  return (
    <div className="app">
      <header className="header">
        <h1>Smart Grade &amp; Statistics Analyzer</h1>
        <ScoreForm onAdd={actions.add} />
      </header>

      {storageError && <p className="error">{storageError}</p>}

      <main className="layout">
        <aside className="sidebar">
          <FilterPanel onChange={setRange} />
        </aside>

        <section className="content">
          <StatsCards statistics={statistics} />
          <DistributionChart data={distribution} />
          <SortControls sort={sort} onChange={setSort} />
          <ScoreTable rows={sorted} onRemove={actions.remove} onClear={actions.clear} />
        </section>
      </main>
    </div>
  );
};
