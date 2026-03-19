import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart, ArrowLeft, CheckCircle, Package, Truck, Shield, Star } from 'lucide-react'
import { Suspense, lazy } from 'react'
import toast from 'react-hot-toast'
import products from '../data/products'
import { useCart } from '../contexts/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import Badge from '../components/ui/Badge'
import ProductCard from '../components/products/ProductCard'

const ProductViewer = lazy(() => import('../components/three/ProductViewer'))

const benefitIcons = [
  { Icon: Package, text: 'Ships same day' },
  { Icon: Truck, text: 'Free freight over $500' },
  { Icon: Shield, text: 'Quality guaranteed' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="page-wrapper pt-32 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">Product not found</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    toast.success(`Added ${qty}x ${product.name.split(' ').slice(0, 3).join(' ')}`)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="page-wrapper pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link to="/" className="hover:text-white/70">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white/70">Products</Link>
          <span>/</span>
          <span className="text-amber-400 truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative h-80 md:h-[460px] rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(59,130,246,0.06) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Suspense
                fallback={
                  <div className="h-full flex items-center justify-center text-6xl opacity-60">🔩</div>
                }
              >
                <ProductViewer className="absolute inset-0" />
              </Suspense>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/30 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                Drag to rotate
              </div>
            </div>

            {/* Badges below viewer */}
            <div className="flex flex-wrap gap-2 mt-4">
              {benefitIcons.map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-white/60"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon size={13} className="text-amber-400" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Category + badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
                {product.category} nails
              </span>
              {product.badge && <Badge color={product.badgeColor || 'gold'}>{product.badge}</Badge>}
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating placeholder */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/40 text-sm">(48 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span
                className="text-4xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {formatCurrency(product.pricePerBox)}
              </span>
              <span className="text-white/40 text-sm ml-2">/ {product.unit}</span>
            </div>

            {/* Description */}
            <p className="text-white/55 leading-relaxed mb-6">{product.description}</p>

            {/* Applications */}
            <div className="mb-6">
              <p className="text-white/70 text-sm font-semibold mb-2">Applications</p>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <span
                    key={app}
                    className="px-3 py-1 rounded-full text-xs text-white/60"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 flex-wrap mb-6">
              {/* Qty */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="text-white font-semibold w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  added
                    ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                    : 'btn-primary'
                }`}
              >
                {added ? (
                  <><CheckCircle size={18} /> Added to Cart</>
                ) : (
                  <><ShoppingCart size={18} /> Add to Cart</>
                )}
              </button>
            </div>

            {/* Quote CTA */}
            <Link to="/quote" className="btn-secondary justify-center">
              Request Bulk Quote
            </Link>

            {/* Stock status */}
            <p className={`text-xs mt-3 flex items-center gap-1.5 ${product.inStock ? 'text-emerald-400' : 'text-red-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
              {product.inStock ? 'In Stock — Ready to ship' : 'Out of Stock'}
            </p>
          </motion.div>
        </div>

        {/* Specs table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-md p-8 mb-16"
        >
          <h2 className="text-white font-bold text-2xl mb-6">Technical Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex items-start justify-between gap-4 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-white/50 text-sm shrink-0">{key}</span>
                <span className="text-white text-sm font-medium text-right">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-white font-bold text-2xl mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} delay={i * 0.1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
