import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true
    const step = end / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 12, suffix: '', label: 'Products Available', desc: 'across 7 nail categories' },
  { value: 7, suffix: '', label: 'Product Categories', desc: 'from pallet to roofing nails' },
  { value: 2025, suffix: '', label: 'Year Founded', desc: 'new company, built with purpose' },
  { value: 50, suffix: '', label: 'States Covered', desc: 'shipping anywhere in the US' },
]

export default function Stats() {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Background card */}
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-14"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />

          <div className="relative text-center mb-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2"
            >
              What We Bring
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading"
            >
              Built to Deliver
            </motion.h2>
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, suffix, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fcd34d 50%, #d97706 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <Counter end={value} suffix={suffix} />
                </div>
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-white/40 text-xs">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
