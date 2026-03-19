import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/products/ProductCard'
import ProductFilters from '../components/products/ProductFilters'
import ProductSearch from '../components/products/ProductSearch'
import products from '../data/products'

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'Name A–Z' },
]

export default function Products() {
  const [filters, setFilters] = useState({ category: 'all', coating: 'all', inStockOnly: false })
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]

    if (filters.category !== 'all') list = list.filter((p) => p.category === filters.category)
    if (filters.coating !== 'all') list = list.filter((p) => p.coating === filters.coating)
    if (filters.inStockOnly) list = list.filter((p) => p.inStock)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          (p.specs?.Gauge || '').toLowerCase().includes(q)
      )
    }

    if (sort === 'price-asc') list.sort((a, b) => a.pricePerBox - b.pricePerBox)
    else if (sort === 'price-desc') list.sort((a, b) => b.pricePerBox - a.pricePerBox)
    else if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    return list
  }, [filters, search, sort])

  return (
    <div className="page-wrapper pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2"
          >
            Catalog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-heading"
          >
            All Coil Nails
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg mt-3 max-w-2xl"
          >
            Browse our full range of industrial coil nails — every gauge, length, and coating.
          </motion.p>
        </div>

        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1">
            <ProductSearch value={search} onChange={setSearch} />
          </div>
          <div className="flex gap-3 shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-input w-44 cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} style={{ background: '#020817' }}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden btn-secondary gap-2 shrink-0"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="glass p-5 sticky top-28">
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                resultCount={filtered.length}
              />
            </div>
          </aside>

          {/* Mobile filters drawer */}
          <AnimatePresence>
            {filtersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setFiltersOpen(false)}
                  className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 28 }}
                  className="fixed inset-y-0 left-0 z-50 w-72 p-6 lg:hidden"
                  style={{ background: 'rgba(3,12,30,0.97)', backdropFilter: 'blur(40px)', borderRight: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="pt-16">
                    <ProductFilters
                      filters={filters}
                      setFilters={setFilters}
                      resultCount={filtered.length}
                      onClose={() => setFiltersOpen(false)}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <span className="text-5xl">🔍</span>
                <p className="text-white/60 font-medium text-lg">No products found</p>
                <p className="text-white/35 text-sm">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearch(''); setFilters({ category: 'all', coating: 'all', inStockOnly: false }) }}
                  className="btn-secondary mt-2 text-sm px-5 py-2.5"
                >
                  Clear all
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} delay={Math.min(i * 0.05, 0.3)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
