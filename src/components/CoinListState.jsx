export default function CoinListState({ error, isLoading, children }) {
  if (error) {
    return <p className="rounded-2xl border border-red-600 bg-red-950/40 p-4 text-red-200">{error}</p>
  }

  if (isLoading) {
    return <p className="text-slate-400">Loading trending coins…</p>
  }

  return <>{children}</>
}
