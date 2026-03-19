import { Search, X } from 'lucide-react'
import { useRef } from 'react'

export default function ProductSearch({ value, onChange }) {
  const inputRef = useRef()

  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search nails by name, gauge, or type..."
        className="form-input pl-10 pr-10"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
        >
          <X size={15} />
        </button>
      )}
    </div>
  )
}
