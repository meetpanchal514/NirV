import { motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-3 p-3 rounded-xl group"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Nail icon placeholder */}
      <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <span className="text-2xl">🔩</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
        <p className="text-white/40 text-xs mt-0.5 truncate">
          {item.unit}
        </p>
        <div className="flex items-center justify-between mt-2">
          {/* Qty controls */}
          <div className="flex items-center gap-1.5 rounded-lg p-1"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => updateQty(item.id, item.quantity - 1)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <Minus size={12} />
            </button>
            <span className="text-white text-xs font-semibold w-5 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQty(item.id, item.quantity + 1)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <Plus size={12} />
            </button>
          </div>

          <span className="text-amber-400 font-semibold text-sm">
            {formatCurrency(item.pricePerBox * item.quantity)}
          </span>
        </div>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="self-start mt-1 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}
