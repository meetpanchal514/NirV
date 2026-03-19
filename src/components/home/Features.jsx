import { motion } from 'framer-motion'
import { Shield, Zap, Package, Award, Wrench, Globe } from 'lucide-react'

const features = [
  {
    Icon: Shield,
    title: 'Industrial Grade Quality',
    desc: 'We source only low-carbon steel with consistent wire diameters — built to the specifications that pneumatic nailers and professional job sites demand.',
    color: '#f59e0b',
  },
  {
    Icon: Zap,
    title: 'High-Speed Compatible',
    desc: 'Engineered for pneumatic coil nailers. Consistent collation angle and tight tolerances ensure smooth feeding with zero jams in high-volume production settings.',
    color: '#3b82f6',
  },
  {
    Icon: Package,
    title: 'Bulk Pricing Available',
    desc: 'Volume discounts starting at 10 boxes. Request a custom quote for pallet quantities. We work directly with manufacturers and contractors for the best per-nail pricing.',
    color: '#10b981',
  },
  {
    Icon: Award,
    title: 'Consistent Specifications',
    desc: 'We source to strict tolerances — wire diameter, coating weight, and collation angle are verified before anything makes it into our catalog.',
    color: '#8b5cf6',
  },
  {
    Icon: Wrench,
    title: 'Full Product Range',
    desc: 'From 15° wire-weld pallet nails to 21° plastic-strip framing nails — 12 products across 7 categories to cover your application.',
    color: '#f59e0b',
  },
  {
    Icon: Globe,
    title: 'Nationwide Shipping',
    desc: 'We ship across all 50 states. Get a quote and we\'ll confirm lead times and freight options for your location and order size.',
    color: '#3b82f6',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Features() {
  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Why Choose Nir Trades
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-heading"
          >
            Built for Professionals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mt-4"
          >
            We obsess over the details so you can focus on the build.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map(({ Icon, title, desc, color }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass p-6 group cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                  boxShadow: `0 0 20px ${color}15`,
                }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>

              {/* Hover bottom accent */}
              <div
                className="mt-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
