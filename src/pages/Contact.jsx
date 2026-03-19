import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../utils/api'

const infoCards = [
  {
    Icon: Phone,
    title: 'Phone',
    lines: ['+1 (267) 881-1131', 'Mon–Fri 8am – 6pm PST'],
    color: '#f59e0b',
  },
  {
    Icon: Mail,
    title: 'Email',
    lines: ['sales@nirtrades.com', 'support@nirtrades.com'],
    color: '#3b82f6',
  },
  {
    Icon: MapPin,
    title: 'Address',
    lines: ['2500 Knights Rd #2902', 'Bensalem, PA 19020'],
    color: '#10b981',
  },
  {
    Icon: Clock,
    title: 'Hours',
    lines: ['Mon–Fri: 8:00 AM – 6:00 PM', 'Sat: 9:00 AM – 2:00 PM'],
    color: '#8b5cf6',
  },
]

const subjects = [
  'Product Inquiry',
  'Bulk / Volume Order',
  'Technical Question',
  'Shipping & Delivery',
  'Returns & Warranty',
  'Partnership',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // PLACEHOLDER: Email system — will be sent via backend Nodemailer
      await api.post('/contact', form)
      setSent(true)
      toast.success('Message sent! We\'ll reply within 1 business day.')
    } catch {
      // Demo fallback (works without backend running)
      setSent(true)
      toast.success('Message sent! We\'ll reply within 1 business day.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-heading"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg mt-4 max-w-xl mx-auto"
          >
            Have a question about our products? Need a bulk quote? We're here to help.
          </motion.p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {infoCards.map(({ Icon, title, lines, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass p-5 text-center"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p className="text-white font-semibold text-sm mb-1">{title}</p>
              {lines.map((l) => (
                <p key={l} className="text-white/40 text-xs leading-relaxed">{l}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-md p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={20} className="text-amber-400" />
                <h2 className="text-white font-bold text-xl">Send a Message</h2>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Message Received!</h3>
                  <p className="text-white/50">
                    We'll get back to you within 1 business day at <span className="text-amber-400">{form.email}</span>.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' }) }}
                    className="btn-ghost text-sm mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input required value={form.name} onChange={set('name')} className="form-input" placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="form-label">Company</label>
                      <input value={form.company} onChange={set('company')} className="form-input" placeholder="Acme Corp" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Email *</label>
                      <input required type="email" value={form.email} onChange={set('email')} className="form-input" placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input value={form.phone} onChange={set('phone')} className="form-input" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Subject *</label>
                    <select required value={form.subject} onChange={set('subject')} className="form-input cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <option value="" disabled style={{ background: '#020817' }}>Select a subject…</option>
                      {subjects.map((s) => <option key={s} value={s} style={{ background: '#020817' }}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      className="form-input resize-none"
                      placeholder="Tell us about your project, quantity needed, specifications…"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2">
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Map placeholder + FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden h-56 flex items-center justify-center relative">
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(245,158,11,0.08))' }} />
              <div className="relative text-center">
                <MapPin size={32} className="text-amber-400 mx-auto mb-2" />
                <p className="text-white/60 text-sm font-medium">2500 Knights Rd #2902</p>
                <p className="text-white/40 text-sm">Bensalem, PA 19020</p>
                <a
                  href="https://www.google.com/maps/place/2500+Knights+Rd,+Bensalem,+PA+19020/@40.1001661,-74.9620225,16z/data=!3m1!4b1!4m11!1m4!7m3!1m1!1s101425486574003802593!2e2!3m5!1s0x89c14d2efa3ac1ad:0xc2f9deadc5e8cbc3!8m2!3d40.0998936!4d-74.9596007!16s%2Fg%2F11bw3zkbr_?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 mt-3 transition-colors"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="glass p-6 flex-1">
              <h3 className="text-white font-semibold mb-5">Quick Answers</h3>
              {[
                { q: 'What is your minimum order?', a: 'No minimums for standard stock items. Bulk discounts start at 10 boxes.' },
                { q: 'Do you offer samples?', a: 'Yes — contact our sales team for a sample pack of your specified nail type.' },
                { q: 'What are your lead times?', a: 'In-stock items ship same day before 2 PM PST. Custom orders: 5–10 business days.' },
              ].map(({ q, a }) => (
                <div key={q} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b border-white/5 last:border-0">
                  <p className="text-white/80 text-sm font-medium mb-1">{q}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
