import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, ChevronDown, Wrench } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, setIsOpen: setCartOpen } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'backdrop-blur-md'
        }`}
        style={{
          background: scrolled
            ? 'rgba(2,8,23,0.85)'
            : 'linear-gradient(to bottom, rgba(2,8,23,0.7), transparent)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                <Wrench size={18} className="text-black rotate-45" />
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', boxShadow: '0 0 20px rgba(245,158,11,0.6)' }} />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="gold-text">Nir</span>
                  <span className="text-white"> Trades</span>
                </span>
                <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase -mt-0.5">
                  Premium Coil Nails
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-amber-400'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-amber-400"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Link
                to="/quote"
                className="hidden md:inline-flex btn-primary text-xs px-4 py-2"
              >
                Get a Quote
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-72 z-40 pt-20 px-6 pb-8 flex flex-col"
            style={{
              background: 'rgba(6,16,41,0.97)',
              backdropFilter: 'blur(40px)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <nav className="flex flex-col gap-2 mt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="glass-divider my-2" />
              <Link to="/quote" className="btn-primary text-center mt-2">
                Get a Quote
              </Link>
            </nav>

            <div className="mt-auto">
              <p className="text-white/30 text-xs text-center">
                © 2025 Nir Trades. Premium Coil Nails.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
