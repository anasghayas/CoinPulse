import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoinPage from './pages/CoinPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/coin/:id" element={<CoinPage />} />
    </Routes>
  )
}

export default App
