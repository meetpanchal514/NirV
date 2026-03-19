import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Target, Globe, Award, ArrowRight, CheckCircle } from 'lucide-react'

const timeline = [
  { year: '2025', title: 'Founded', desc: 'Nir Trades was established with a clear mission: supply professional-grade coil nails to builders, manufacturers, and contractors across the US.' },
  { year: '2025', title: 'Catalog Launch', desc: 'Launched our full product catalog spanning 7 categories and 12 nail types — from wire-weld pallet nails to stainless roofing nails.' },
  { year: 'Now', title: 'Open for Business', desc: 'Actively taking first orders and building relationships with contractors, manufacturers, and distributors nationwide.' },
]

const values = [
  { Icon: Target, title: 'Precision', desc: 'Every specification matters. We maintain tight tolerances across every batch.' },
  { Icon: Award, title: 'Quality First', desc: 'We never compromise on material grade, coating thickness, or collation consistency.' },
  { Icon: Users, title: 'Partnership', desc: 'We treat every client as a long-term partner, not just a transaction.' },
  { Icon: Globe, title: 'Reliability', desc: 'Consistent stock, on-time shipping, and responsive support — every time.' },
]

const team = [
  { name: 'Neil P', role: 'Founder & CEO', initials: 'NP' },
  { name: 'Aaron V', role: 'Sales Director', initials: 'AV' },
  { name: 'Vince P', role: 'Head of Operations', initials: 'VP' },
  { name: 'Mike P', role: 'Quality and Client service Manager', initials: 'MP' },
]

export default function About() {
  return (
    <div className="page-wrapper pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 mb-20 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(59,130,246,0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245,158,11,0.06), transparent)' }} />

          <div className="relative">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4"
            >
              Our Story
            </motion.p>
            <h1 className="section-heading text-4xl md:text-6xl mb-6">
              Built on Precision.<br />Driven by Trust.
            </h1>
            <p className="text-white/55 text-xl max-w-2xl mx-auto leading-relaxed">
              Nir Trades launched in 2025 with a clear mission: be the fastener supplier that builders,
              manufacturers, and contractors can actually rely on when every nail counts.
            </p>
          </div>
        </motion.div>

        {/* Mission & Values */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Mission
              </p>
              <h2 className="section-heading text-3xl md:text-4xl mb-6">
                Fasteners That Never Let You Down
              </h2>
              <p className="text-white/55 leading-relaxed mb-6">
                We founded Nir Trades on a simple belief: the fastener is the last line of defense between
                a finished structure and failure. That's why we obsess over every millimeter of wire diameter,
                every gram of galvanizing zinc, and every degree of collation angle.
              </p>
              <p className="text-white/55 leading-relaxed mb-8">
                We're selective about what we stock and who we source from. Every product in our catalog
                has been chosen because it meets the standards professionals actually need on the job site.
              </p>
              <div className="space-y-3">
                {['Sourced to industrial specifications', 'Consistent wire diameter and collation', 'Bulk pricing from your first order', 'Direct line to our team — always'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-white/70 text-sm">
                    <CheckCircle size={16} className="text-amber-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {values.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-5"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <Icon size={18} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Where We Are</p>
            <h2 className="section-heading">Our Story So Far</h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.3), transparent)' }} />

            <div className="space-y-8">
              {timeline.map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <div className="glass p-5 inline-block text-left max-w-sm">
                      <span className="text-amber-400 font-bold text-xl">{year}</span>
                      <h3 className="text-white font-semibold mt-1 mb-2">{title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex items-start justify-center w-6 shrink-0 mt-5">
                    <div className="w-3 h-3 rounded-full border-2 border-amber-400"
                      style={{ background: 'rgba(245,158,11,0.3)' }} />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Team</p>
            <h2 className="section-heading">The People Behind Nir Trades</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map(({ name, role, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 text-center group hover:scale-[1.02] transition-transform"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold text-black group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  {initials}
                </div>
                <p className="text-white font-semibold text-sm">{name}</p>
                <p className="text-white/40 text-xs mt-1">{role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center glass-md p-12 rounded-3xl"
        >
          <h2 className="section-heading text-3xl mb-4">Ready to Work Together?</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
            Whether you're a large manufacturer or a local contractor, we're ready to quote, source, and deliver.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products" className="btn-primary text-base px-8 py-4">
              View Products <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary text-base px-8 py-4">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
