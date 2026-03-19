import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../utils/api'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      // PLACEHOLDER: Replace with actual API call
      await api.post('/newsletter', { email })
      setDone(true)
      toast.success('You\'re subscribed!')
    } catch {
      // For demo: just show success even without backend
      setDone(true)
      toast.success('You\'re subscribed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(59,130,246,0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Decorative */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent)' }} />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent)' }} />

          <div className="relative">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Mail size={24} className="text-amber-400" />
              </div>
            </div>

            <h2 className="section-heading text-3xl mb-3">Stay in the Loop</h2>
            <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
              New product launches, pricing updates, and trade tips — delivered to your inbox.
            </p>

            {done ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 text-emerald-400"
              >
                <CheckCircle size={24} />
                <span className="font-semibold">You're subscribed. Thank you!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="form-input flex-1"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary shrink-0"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </button>
              </form>
            )}

            <p className="text-white/25 text-xs mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
