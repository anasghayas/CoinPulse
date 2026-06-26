import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CoinList } from '../lib/coingecko'
import { BackgroundGradientAnimation } from './ui/background-gradient-animation'

const STEP_WIDTH = 324

export default function CoinCarousel() {
  const [coins, setCoins] = useState([])
  const [position, setPosition] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    fetch(CoinList('usd'))
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load carousel coins')
        return response.json()
      })
      .then((data) => setCoins(data.slice(0, 10)))
      .catch(() => setCoins([]))
  }, [])

  const loopedCoins = useMemo(() => {
    if (coins.length === 0) return []
    return [...coins, ...coins]
  }, [coins])

  useEffect(() => {
    if (!coins.length || isPaused) return undefined

    const intervalId = window.setInterval(() => {
      setPosition((current) => (current + 1) % loopedCoins.length)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [coins.length, isPaused, loopedCoins.length])

  return (
    <section className="mb-4 w-full overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none">
      <BackgroundGradientAnimation
        interactive={false}
        containerClassName="h-[38vh] min-h-[360px] w-full overflow-hidden rounded-[0.35rem] border border-white/10 bg-slate-950/40 shadow-none"
        className="relative z-10 flex h-full items-center"
      >
        <div className="relative flex h-full w-full items-center overflow-hidden px-0 py-4 sm:px-0 lg:px-0">
          <div
            className="flex items-center transition-transform duration-[2600ms] ease-linear will-change-transform"
            style={{ transform: `translateX(-${position * STEP_WIDTH}px)` }}
          >
            {loopedCoins.map((coin, index) => (
              <Link
                key={`${coin.id}-${index}`}
                to={`/coin/${coin.id}`}
                className="mr-4 flex min-w-[300px] flex-col items-center rounded-[0.35rem] px-6 py-6 text-center transition hover:bg-white/10"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img src={coin.image} alt={coin.name} className="mb-3 h-16 w-16 rounded-full" />
                <p className="text-lg font-semibold text-white">{coin.name}</p>
                <p className="text-sm text-slate-300">{coin.symbol.toUpperCase()}</p>
                <p className="mt-2 text-sm font-medium text-white">${coin.current_price?.toLocaleString()}</p>
                <span className={`mt-1 text-sm font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </Link>
            ))}
          </div>
        </div>
      </BackgroundGradientAnimation>
    </section>
  )
}
