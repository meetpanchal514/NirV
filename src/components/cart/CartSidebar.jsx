import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import CartItem from './CartItem'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartSidebar() {
  const { items, totalItems, totalPrice, isOpen, setIsOpen, clearCart } = useCart()

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-[70] flex flex-col"
            style={{
              background: 'rgba(3,12,30,0.97)',
              backdropFilter: 'blur(40px)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '-16px 0 48px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/8">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-amber-400" />
                <h2 className="text-white font-semibold">Cart</h2>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-black"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 gap-4"
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <ShoppingCart size={28} className="text-amber-400/60" />
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 font-medium">Your cart is empty</p>
                      <p className="text-white/30 text-sm mt-1">Add some nails to get started</p>
                    </div>
                    <Link
                      to="/products"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary text-xs px-5 py-2.5"
                    >
                      Browse Products
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => <CartItem key={item.id} item={item} />)
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-white/8 space-y-4">
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span className="text-white">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Shipping</span>
                    <span className="text-amber-400 text-xs">Calculated at checkout</span>
                  </div>
                  <div className="glass-divider" />
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-amber-400 text-lg">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                {/* CTAs */}
                <Link
                  to="/quote"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Request Quote <ArrowRight size={16} />
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full flex items-center justify-center gap-2 text-white/40 hover:text-red-400 text-sm transition-colors py-1"
                >
                  <Trash2 size={14} />
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
