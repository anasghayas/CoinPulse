import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'
import { useAuth } from '../context/AuthContext'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../users/firebase'
import { CoinList } from '../lib/coingecko'
import { X, Trash2 } from 'lucide-react'

export default function Header() {
  const { currency, symbol, setCurrency } = useCurrency()
  const { user, wishlist, removeFromWishlist } = useAuth()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(null)
  
  const [allCoins, setAllCoins] = useState([])

  // Fetch all coins to match metadata (images, prices) for wishlisted items
  useEffect(() => {
    fetch(CoinList(currency))
      .then((res) => res.json())
      .then((data) => setAllCoins(data || []))
      .catch((err) => console.error(err))
  }, [currency])

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    setAuthError(null)
    
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setEmail('')
          setPassword('')
          setIsSidebarOpen(false)
        })
        .catch((err) => {
          setAuthError(err.message.replace('Firebase: ', ''))
        })
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setEmail('')
          setPassword('')
          setIsSidebarOpen(false)
        })
        .catch((err) => {
          setAuthError(err.message.replace('Firebase: ', ''))
        })
    }
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsSidebarOpen(false)
      })
      .catch((err) => console.error(err))
  }

  // Filter out the coins from the top 100 that are in the user's wishlist
  const wishlistedCoins = allCoins.filter((c) => wishlist.includes(c.id))
  // Filter out the IDs in wishlist that are NOT in the top 100 list
  const otherWishlistIds = wishlist.filter((id) => !allCoins.some((c) => c.id === id))

  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-900/90 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link to="/" className="text-3xl font-bold tracking-tight text-amber-400">
            CoinPulse
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-md border border-zinc-700 bg-amber-400 px-3 py-2 text-sm font-semibold text-black focus:outline-none"
            >
              <option value="usd" className="font-semibold">USD</option>
              <option value="inr" className="font-semibold">INR</option>
              <option value="eur" className="font-semibold">EUR</option>
            </select>
            <button
              onClick={() => {
                setAuthError(null)
                setIsSidebarOpen(true)
              }}
              className="rounded-md border border-zinc-700 bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-500 cursor-pointer transition"
            >
              {user ? 'Profile' : 'Login'}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer Container */}
      <div className={`fixed right-0 top-0 h-screen w-80 md:w-96 bg-zinc-950 border-l border-zinc-800 z-50 p-6 flex flex-col shadow-2xl transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <h2 className="text-lg font-bold text-zinc-100">
            {user ? 'My Profile' : isSignUp ? 'Sign Up' : 'Login'}
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-zinc-400 hover:text-zinc-100 p-1 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* If logged out, render authentication forms */}
        {!user ? (
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            {authError && (
              <p className="text-xs text-red-400 bg-red-950/20 border border-red-500/20 rounded p-2 text-center font-medium">
                {authError}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded bg-amber-400 py-2.5 text-sm font-semibold text-black hover:bg-amber-500 cursor-pointer transition"
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp((prev) => !prev)
                setAuthError(null)
              }}
              className="text-xs text-amber-400 hover:underline text-center cursor-pointer mt-1"
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </form>
        ) : (
          /* If logged in, render profile + wishlist details */
          <div className="flex flex-col flex-1 overflow-hidden text-zinc-300">
            <div className="mb-6">
              <p className="text-xs text-zinc-400 font-medium">Logged in as</p>
              <p className="text-sm font-semibold text-zinc-200 truncate mt-1">{user.email}</p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full rounded bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer transition"
              >
                Logout
              </button>
            </div>

            <div className="border-t border-zinc-800 pt-4 flex-1 flex flex-col overflow-hidden">
              <h3 className="text-md font-bold text-zinc-100 mb-4">My Wishlist</h3>
              
              {wishlist.length === 0 ? (
                <p className="text-zinc-500 text-sm mt-4 text-center">Your wishlist is empty.</p>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {/* Render matched coins */}
                  {wishlistedCoins.map((coin) => (
                    <div
                      key={coin.id}
                      className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/80 hover:border-zinc-700 transition"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
                        <div className="overflow-hidden">
                          <Link
                            to={`/coin/${coin.id}`}
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-sm font-semibold text-zinc-100 hover:text-amber-400 transition truncate block"
                          >
                            {coin.name}
                          </Link>
                          <span className="text-xs text-zinc-400">
                            {symbol}{coin.current_price?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(coin.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer transition shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}

                  {/* Render fallbacks for any items loading/not in top 100 */}
                  {otherWishlistIds.map((id) => (
                    <div
                      key={id}
                      className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/80"
                    >
                      <div className="overflow-hidden pr-2">
                        <Link
                          to={`/coin/${id}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className="text-sm font-semibold text-zinc-100 hover:text-amber-400 transition truncate block"
                        >
                          {id}
                        </Link>
                        <span className="text-xs text-zinc-500">Loading details...</span>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(id)}
                        className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer transition shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
