import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import CoinChart from '../components/CoinChart'
import { SingleCoin } from '../lib/coingecko'
import { useCurrency } from '../context/CurrencyContext'
import { useAuth } from '../context/AuthContext'

export default function CoinPage() {
  const { id } = useParams()
  const { currency, symbol } = useCurrency()
  const { user, wishlist, addToWishlist, removeFromWishlist } = useAuth()
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(SingleCoin(id))
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch coin details')
        }
        return res.json()
      })
      .then((data) => {
        setCoin(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />
        <div className="flex h-[80vh] items-center justify-center">
          <p className="text-zinc-400 animate-pulse text-sm">Loading coin details...</p>
        </div>
      </div>
    )
  }

  if (error || !coin) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />
        <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
          <p className="text-red-400 text-sm font-medium">{error || 'Coin details not found'}</p>
        </div>
      </div>
    )
  }

  const currentPrice = coin.market_data?.current_price?.[currency] || 0
  const marketCap = coin.market_data?.market_cap?.[currency] || 0
  const change24h = coin.market_data?.price_change_percentage_24h || 0
  const isWishlisted = wishlist.includes(coin.id)

  const handleWishlistClick = () => {
    if (!user) {
      alert('Please log in to add coins to your wishlist!')
      return
    }
    if (isWishlisted) {
      removeFromWishlist(coin.id)
    } else {
      addToWishlist(coin.id)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Side Panel */}
        <div className="w-full md:w-80 border-zinc-800 md:border-r p-8 flex flex-col items-center shrink-0">
          <img
            src={coin.image?.large}
            alt={coin.name}
            className="h-36 w-36 object-contain"
          />
          <h1 className="mt-4 text-3xl font-bold text-zinc-100">{coin.name}</h1>
          
          <div className="mt-8 w-full space-y-4 text-sm">
            <div className="flex justify-between border-b border-zinc-800/60 pb-3">
              <span className="text-zinc-400 font-medium">Rank</span>
              <span className="font-semibold text-zinc-100">#{coin.market_cap_rank}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 pb-3">
              <span className="text-zinc-400 font-medium">Current Price</span>
              <span className="font-semibold text-zinc-100">
                {symbol}{currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 pb-3">
              <span className="text-zinc-400 font-medium">24h Change</span>
              <span className={`font-semibold ${change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between pb-3">
              <span className="text-zinc-400 font-medium">Market Cap</span>
              <span className="font-semibold text-zinc-100">
                {symbol}{marketCap.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleWishlistClick}
            className={`mt-6 w-full rounded py-2.5 text-sm font-semibold transition cursor-pointer ${
              isWishlisted
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-amber-400 text-black hover:bg-amber-500'
            }`}
          >
            {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>

        {/* Right Side: Chart Section */}
        <div className="flex-1 p-8">
          <CoinChart coinId={id} />
        </div>
      </div>
    </div>
  )
}
