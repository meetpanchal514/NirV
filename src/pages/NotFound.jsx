import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="page-wrapper pt-24 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto px-4"
      >
        {/* 404 */}
        <div
          className="text-[9rem] font-black leading-none mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </div>

        <div className="w-16 h-1 rounded-full mx-auto mb-8"
          style={{ background: 'linear-gradient(90deg, #f59e0b, #3b82f6)' }} />

        <h1 className="text-white font-bold text-2xl mb-3">Page Not Found</h1>
        <p className="text-white/45 mb-10 leading-relaxed">
          Looks like this nail missed the mark. The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => window.history.back()} className="btn-secondary gap-2">
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link to="/" className="btn-primary">
            <Home size={16} /> Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
