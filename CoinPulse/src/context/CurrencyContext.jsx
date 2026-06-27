import { createContext, useContext, useEffect, useState } from 'react'

const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState('inr')
  const [symbol, setSymbol] = useState('₹')

  useEffect(() => {
    if (currency === 'inr') {
      setSymbol('₹')
    } else if (currency === 'eur') {
      setSymbol('€')
    } else {
      setSymbol('$')
    }
  }, [currency])

  const setCurrency = (val) => {
    setCurrencyState(val.toLowerCase())
  }

  return (
    <CurrencyContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
