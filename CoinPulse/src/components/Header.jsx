import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className=" border-zinc-700 bg-zinc-800/90 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link to="/" className="text-3xl font-bold tracking-tight text-amber-400">
          CoinPulse
        </Link>
        <div className="flex flex-wrap items-center gap-3 ">
          <select className="rounded-md border border-slate-700 bg-amber-400 px-3 py-2 text-sm font-semibold text-black">
            <option value="usd" className="font-semibold">USD</option>
            <option value="inr" className="font-semibold">INR</option>
            <option value="eur" className="font-semibold">EUR</option>
          </select>
          <button className="rounded-md border border-slate-700 bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-slate-700">
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
