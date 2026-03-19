import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'
import Badge from '../ui/Badge'
import toast from 'react-hot-toast'

const coatingColorMap = {
  bright: 'bg-slate-400/20 text-slate-300',
  galvanized: 'bg-sky-500/20 text-sky-300',
  'electro-galvanized': 'bg-cyan-500/20 text-cyan-300',
  stainless: 'bg-purple-500/20 text-purple-300',
  'vinyl-coated': 'bg-pink-500/20 text-pink-300',
}

export default function ProductCard({ product, delay = 0 }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setAdded(true)
    toast.success(`${product.name.split(' ').slice(0, 3).join(' ')} added!`)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div
          className="h-full rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Image / illustration area */}
          <div
            className="relative h-44 flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(59,130,246,0.06) 100%)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Decorative nail graphic */}
            <div className="text-6xl opacity-70 group-hover:scale-110 transition-transform duration-500">
              🔩
            </div>
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at center, rgba(245,158,11,0.1), transparent 70%)' }} />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {product.badge && (
                <Badge color={product.badgeColor || 'gold'}>{product.badge}</Badge>
              )}
              {!product.inStock && (
                <Badge color="red">Out of Stock</Badge>
              )}
            </div>

            {/* Coating tag */}
            <div className="absolute bottom-3 right-3">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider ${coatingColorMap[product.coating] || 'bg-white/10 text-white/50'}`}>
                {product.specs?.Coating || product.coating}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category */}
            <p className="text-amber-400/80 text-xs font-semibold uppercase tracking-widest mb-1.5">
              {product.category} nails
            </p>

            {/* Name */}
            <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-amber-100 transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Short desc */}
            <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-2">
              {product.shortDesc}
            </p>

            {/* Key specs row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
              {product.specs?.Gauge && (
                <span className="text-xs text-white/40">
                  <span className="text-white/60">Gauge</span> {product.specs.Gauge}
                </span>
              )}
              {product.specs?.Length && (
                <span className="text-xs text-white/40">
                  <span className="text-white/60">Length</span> {product.specs.Length}
                </span>
              )}
              {product.specs?.['Nails per Coil'] && (
                <span className="text-xs text-white/40">
                  <span className="text-white/60">Coil</span> {product.specs['Nails per Coil']}
                </span>
              )}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {formatCurrency(product.pricePerBox)}
                </p>
                <p className="text-white/30 text-xs">{product.unit}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    added
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                      : 'text-white/60 hover:text-amber-400 hover:bg-amber-500/10'
                  }`}
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  title="Add to cart"
                >
                  {added ? <CheckCircle size={16} /> : <ShoppingCart size={16} />}
                </button>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 transition-all group-hover:text-amber-400"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
