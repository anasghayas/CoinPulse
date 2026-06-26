import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import CoinCarousel from '../components/CoinCarousel'
import CoinListState from '../components/CoinListState'
import CoinPagination from '../components/CoinPagination'
import CoinSearchBar from '../components/CoinSearchBar'
import CoinTable from '../components/CoinTable'
import { CoinList } from '../lib/coingecko'

const PAGE_SIZE = 10

export default function HomePage() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetch(CoinList('usd'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch coins')
        }
        return response.json()
      })
      .then((data) => setCoins(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  const filteredCoins = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return coins

    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
      )
    })
  }, [coins, search])

  const totalPages = Math.max(1, Math.ceil(filteredCoins.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginatedCoins = filteredCoins.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="mx-auto w-full max-w-[1800px] px-2 py-6 sm:px-3 lg:px-4">
        <CoinCarousel />
        <CoinSearchBar
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <CoinListState error={error} isLoading={isLoading}>
          <CoinTable coins={paginatedCoins} />

          <div className="mt-6">
            <CoinPagination
              totalPages={totalPages}
              currentPage={safePage}
              onPageChange={setPage}
            />
          </div>
        </CoinListState>
      </main>
    </div>
  )
}
