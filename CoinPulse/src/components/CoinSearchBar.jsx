import { Input } from './ui/input'

export default function CoinSearchBar({ value, onChange }) {
  return (
    <div className="mb-6 w-full">
      <Input
        placeholder="Search by coin name or symbol"
        value={value}
        onChange={onChange}
        className="h-14 w-full rounded-[0.35rem] border-zinc-700 bg-zinc-800/90 text-zinc-100 placeholder:text-zinc-400"
      />
    </div>
  )
}
