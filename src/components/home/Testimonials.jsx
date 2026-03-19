import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Handshake, BadgeCheck, MessageSquare } from 'lucide-react'

const commitments = [
  {
    Icon: BadgeCheck,
    title: 'Quality You Can Count On',
    desc: 'Every product in our catalog is sourced to meet industrial specifications. We pick suppliers who take tolerances seriously — because your nailer and your project depend on it.',
  },
  {
    Icon: Handshake,
    title: 'Be Among Our First Partners',
    desc: "We're just getting started, and we're looking for contractors, manufacturers, and distributors who want a supplier that treats them like a partner — not an order number.",
  },
  {
    Icon: MessageSquare,
    title: 'Direct Access to Us',
    desc: "As an early customer, you'll work directly with our founding team. No hold queues, no ticket systems — just a real conversation about what you need.",
  },
]

export default function Testimonials() {
  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Early Stage
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            We're Just Getting Started
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mt-4"
          >
            Nir Trades launched in 2025. We don't have years of testimonials — but we have a clear commitment to the customers we're about to earn.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {commitments.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-md p-7 text-center"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Icon size={22} className="text-amber-400" />
              </div>
              <h3 className="text-white font-semibold mb-3">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/quote" className="btn-primary text-base px-8 py-4">
            Request a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
