import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { HistoricalChart } from '../lib/coingecko'
import { useCurrency } from '../context'

export default function CoinChart({ coinId }) {
  const { currency, symbol } = useCurrency()
  const [days, setDays] = useState(1)
  const [isHour, setIsHour] = useState(false)
  const [historicData, setHistoricData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(HistoricalChart(coinId, days, currency))
      .then((res) => res.json())
      .then((data) => {
        let prices = data.prices || []
        if (isHour) {
          // Get the last 1 hour of data points (the last 12 entries since each is 5 mins)
          prices = prices.slice(-12)
        }
        setHistoricData(prices)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [coinId, days, currency, isHour])

  // Formats data for Recharts
  const chartData = historicData.map((coin) => {
    const date = new Date(coin[0])
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return {
      label: days === 1 ? time : date.toLocaleDateString(),
      price: coin[1]
    }
  })

  const chartConfig = {
    price: {
      label: `Price in ${currency.toUpperCase()}`,
      color: '#EEBC1D'
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
      {loading ? (
        <div className="flex h-[320px] items-center justify-center">
          <p className="text-zinc-400">Loading Chart...</p>
        </div>
      ) : (
        <>
          <div className="h-[320px] w-full relative">
            <ChartContainer config={chartConfig} className="h-full w-full aspect-auto">
              <LineChart data={chartData} margin={{ top: 10, right: 65, left: 10, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis
                  orientation="right"
                  domain={['auto', 'auto']}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${symbol}${val.toLocaleString()}`}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#EEBC1D"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
          <div className="mt-6 flex justify-around">
            {[
              { label: '1H', value: 1, hour: true },
              { label: '24H', value: 1, hour: false },
              { label: '7D', value: 7, hour: false },
              { label: '30D', value: 30, hour: false },
              { label: '90D', value: 90, hour: false },
              { label: '1Y', value: 365, hour: false },
              { label: 'MAX', value: 'max', hour: false }
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => {
                  setDays(btn.value)
                  setIsHour(btn.hour)
                }}
                className={`rounded px-4 py-1.5 text-xs font-semibold cursor-pointer ${
                  days === btn.value && isHour === btn.hour
                    ? 'bg-amber-400 text-black'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
