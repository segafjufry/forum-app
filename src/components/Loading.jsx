import { useSelector } from 'react-redux';

function Loading() {
  const isLoading = useSelector((states) => states.loading.count > 0);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__bar" />
      <span className="sr-only">Memuat data…</span>
    </div>
  );
}

export default Loading;
