import { motion } from 'framer-motion'
import { CATEGORIES, COATINGS } from '../../data/products'
import { SlidersHorizontal, X } from 'lucide-react'

export default function ProductFilters({ filters, setFilters, resultCount, onClose }) {
  const hasFilters = filters.category !== 'all' || filters.coating !== 'all'

  const clearFilters = () => setFilters({ category: 'all', coating: 'all', inStockOnly: false })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80">
          <SlidersHorizontal size={16} />
          <span className="text-sm font-semibold">Filters</span>
        </div>
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <X size={12} /> Clear
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-white/40 hover:text-white lg:hidden">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <p className="text-white/35 text-xs">{resultCount} product{resultCount !== 1 ? 's' : ''}</p>

      {/* Category */}
      <div>
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Category</p>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setFilters((f) => ({ ...f, category: id }))}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-all ${
                filters.category === id
                  ? 'text-amber-300 font-medium'
                  : 'text-white/50 hover:text-white/80'
              }`}
              style={
                filters.category === id
                  ? { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }
                  : { background: 'transparent', border: '1px solid transparent' }
              }
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="glass-divider" />

      {/* Coating */}
      <div>
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Coating</p>
        <div className="flex flex-col gap-1.5">
          {COATINGS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilters((f) => ({ ...f, coating: id }))}
              className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                filters.coating === id
                  ? 'text-amber-300 font-medium'
                  : 'text-white/50 hover:text-white/80'
              }`}
              style={
                filters.coating === id
                  ? { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }
                  : { background: 'transparent', border: '1px solid transparent' }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="glass-divider" />

      {/* In Stock */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))}
            className={`w-10 h-5 rounded-full relative transition-all duration-200 ${
              filters.inStockOnly ? 'bg-amber-500' : 'bg-white/10'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                filters.inStockOnly ? 'left-5' : 'left-0.5'
              }`}
            />
          </div>
          <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  )
}
