import { Input } from './ui/input'

export default function CoinSearchBar({ value, onChange }) {
  return (
    <div className="mb-6 w-full">
      <Input
        placeholder="Search by coin name or symbol"
        value={value}
        onChange={onChange}
        className="h-14 w-full rounded-[0.35rem] border-slate-700 bg-slate-900/90 text-base text-white shadow-none"
      />
    </div>
  )
}
