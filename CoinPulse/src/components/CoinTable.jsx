import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { useCurrency } from '../context/CurrencyContext'
import { useNavigate } from 'react-router-dom'

export default function CoinTable({ coins }) {
  const { symbol } = useCurrency()
  const navigate = useNavigate()

  return (
    <div className="w-full overflow-hidden rounded-[0.35rem] border border-zinc-800 bg-zinc-900/95">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-zinc-800/80 bg-amber-400 hover:bg-amber-400">
            <TableHead className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-950">Coin</TableHead>
            <TableHead className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-950">Price</TableHead>
            <TableHead className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-950">24h</TableHead>
            <TableHead className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-950">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="border-b border-zinc-800/70 hover:bg-zinc-800/50 cursor-pointer"
            >
              <TableCell className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <img src={coin.image} alt={coin.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-zinc-100">{coin.name}</p>
                    <p className="text-sm text-zinc-500">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-5 font-medium text-zinc-100">
                {symbol}{coin.current_price?.toLocaleString()}
              </TableCell>
              <TableCell className={`px-6 py-5 ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </TableCell>
              <TableCell className="px-6 py-5 text-zinc-400">
                {symbol}{coin.market_cap?.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
