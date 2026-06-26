import Header from '../components/Header'

export default function CoinPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-semibold">Coin Details</h1>
        <p className="mt-2 text-slate-300">This page will show the selected coin, market cap, price, and chart.</p>
      </main>
    </div>
  )
}
