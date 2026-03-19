import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Suspense, lazy } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import CartSidebar from '../cart/CartSidebar'

const ThreeBackground = lazy(() => import('../three/ThreeBackground'))

function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
        >
          <span className="text-black font-bold text-lg">N</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-navy-950 overflow-x-hidden">
      {/* Three.js background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Gradient overlays for depth */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% -10%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 30% at 80% 80%, rgba(245,158,11,0.08) 0%, transparent 50%)',
        }}
      />

      {/* Content layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>

      {/* Cart sidebar */}
      <CartSidebar />

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Toasts */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(6,16,41,0.95)',
            backdropFilter: 'blur(20px)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          },
          success: {
            iconTheme: { primary: '#f59e0b', secondary: '#000' },
          },
        }}
      />
    </div>
  )
}
