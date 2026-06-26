import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const currencies = [
  { label: 'USD', value: 'usd' },
  { label: 'INR', value: 'inr' },
  { label: 'EUR', value: 'eur' },
]

export default function Header() {
  const [currency, setCurrency] = useState('usd')

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-white">
          CoinPulse
        </Link>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-11 min-w-[96px] justify-between rounded-[0.35rem] border-amber-400/70 bg-amber-400 px-4 text-sm font-semibold text-slate-950 hover:bg-amber-300 focus:bg-amber-400"
              >
                {currency.toUpperCase()}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 rounded-[0.35rem] border border-amber-400/70 bg-amber-400 p-1 shadow-lg">
              {currencies.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => setCurrency(item.value)}
                  className="rounded-[0.25rem] text-sm font-semibold text-slate-950 focus:bg-slate-950 focus:text-amber-300"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="h-11 rounded-[0.35rem] border border-amber-400/70 bg-amber-400 px-5 text-sm font-semibold text-slate-950 hover:bg-amber-300">
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
