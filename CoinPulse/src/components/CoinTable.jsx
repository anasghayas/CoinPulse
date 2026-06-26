import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export default function CoinTable({ coins }) {
  return (
    <div className="w-full overflow-hidden rounded-[0.35rem] border border-slate-800 bg-slate-900/95">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-800/80 bg-amber-400/95">
            <TableHead className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">Coin</TableHead>
            <TableHead className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">Price</TableHead>
            <TableHead className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">24h</TableHead>
            <TableHead className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id} className="border-b border-slate-800/70 hover:bg-slate-800/50">
              <TableCell className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <img src={coin.image} alt={coin.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-white">{coin.name}</p>
                    <p className="text-sm text-slate-500">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-5 font-medium text-white">
                ${coin.current_price?.toLocaleString()}
              </TableCell>
              <TableCell className={`px-6 py-5 ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </TableCell>
              <TableCell className="px-6 py-5 text-slate-300">
                ${coin.market_cap?.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
