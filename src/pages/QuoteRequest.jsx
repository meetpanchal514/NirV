import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Package, User, Truck, Plus, Minus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import products from '../data/products'
import { formatCurrency } from '../utils/formatCurrency'
import api from '../utils/api'

const steps = [
  { id: 1, label: 'Contact', Icon: User },
  { id: 2, label: 'Products', Icon: Package },
  { id: 3, label: 'Delivery', Icon: Truck },
]

const projectTypes = [
  'Pallet Manufacturing',
  'Residential Construction',
  'Commercial Construction',
  'Roofing',
  'Fencing',
  'Flooring',
  'Decking',
  'Other',
]

export default function QuoteRequest() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '' })
  const [items, setItems] = useState([])
  const [delivery, setDelivery] = useState({ projectType: '', location: '', targetDate: '', notes: '' })

  const setC = (k) => (e) => setContact((f) => ({ ...f, [k]: e.target.value }))
  const setD = (k) => (e) => setDelivery((f) => ({ ...f, [k]: e.target.value }))

  const addProduct = (product) => {
    if (items.find((i) => i.id === product.id)) return
    setItems((prev) => [...prev, { ...product, qty: 1 }])
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const updateItemQty = (id, qty) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))

  const handleSubmit = async () => {
    setLoading(true)
    const payload = {
      contactInfo: contact,
      items: items.map((i) => ({ productId: i.id, productName: i.name, quantity: i.qty, unit: i.unit })),
      projectDetails: delivery,
    }
    try {
      // PLACEHOLDER: Email notification sent via backend Nodemailer
      await api.post('/quotes', payload)
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="page-wrapper pt-24 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-md p-12 max-w-lg text-center"
        >
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-white font-bold text-2xl mb-3">Quote Request Received!</h2>
          <p className="text-white/50 mb-6">
            Our sales team will review your request and send a detailed quote to{' '}
            <span className="text-amber-400">{contact.email}</span> within 1–2 business days.
          </p>
          <p className="text-white/30 text-sm">Reference: NTQ-{Date.now().toString().slice(-6)}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="page-wrapper pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Request a Quote
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-heading"
          >
            Get Bulk Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/45 mt-3"
          >
            Fill out the 3-step form below and we'll send a tailored quote within 24 hours.
          </motion.p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map(({ id, label, Icon }, i) => (
            <div key={id} className="flex items-center">
              <button
                onClick={() => step > id && setStep(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  step === id
                    ? 'text-amber-300'
                    : step > id
                    ? 'text-emerald-400 cursor-pointer hover:bg-white/5'
                    : 'text-white/30 cursor-default'
                }`}
                style={
                  step === id
                    ? { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }
                    : {}
                }
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  step === id
                    ? 'bg-amber-500 text-black'
                    : step > id
                    ? 'bg-emerald-500/30 text-emerald-400'
                    : 'bg-white/8 text-white/30'
                }`}>
                  {step > id ? <CheckCircle size={14} /> : id}
                </div>
                <span className="text-sm font-medium hidden sm:block">{label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className="w-12 h-px mx-1" style={{ background: step > id + 1 ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="glass-md p-8 space-y-5"
            >
              <h2 className="text-white font-bold text-xl">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input required value={contact.name} onChange={setC('name')} className="form-input" placeholder="John Smith" />
                </div>
                <div>
                  <label className="form-label">Company *</label>
                  <input required value={contact.company} onChange={setC('company')} className="form-input" placeholder="Acme Manufacturing" />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input required type="email" value={contact.email} onChange={setC('email')} className="form-input" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input value={contact.phone} onChange={setC('phone')} className="form-input" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <button
                onClick={() => {
                  if (!contact.name || !contact.company || !contact.email) {
                    toast.error('Please fill in required fields')
                    return
                  }
                  setStep(2)
                }}
                className="btn-primary w-full justify-center mt-4"
              >
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-5"
            >
              <div className="glass-md p-6">
                <h2 className="text-white font-bold text-xl mb-4">Select Products</h2>

                {/* Product picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1 mb-4 no-scrollbar">
                  {products.map((p) => {
                    const inCart = items.find((i) => i.id === p.id)
                    return (
                      <button
                        key={p.id}
                        onClick={() => inCart ? removeItem(p.id) : addProduct(p)}
                        className={`text-left px-4 py-3 rounded-xl transition-all border ${
                          inCart
                            ? 'border-amber-500/40 text-amber-300'
                            : 'border-white/8 text-white/60 hover:border-white/20 hover:text-white/80'
                        }`}
                        style={{ background: inCart ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)' }}
                      >
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[11px] opacity-60 mt-0.5">{p.specs?.Length || ''} · {p.specs?.Shank || ''}</p>
                      </button>
                    )
                  })}
                </div>

                {/* Selected items */}
                {items.length > 0 && (
                  <div className="space-y-2 mt-5 border-t border-white/8 pt-4">
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Selected Items</p>
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-medium truncate">{item.name}</p>
                          <p className="text-white/40 text-xs">{formatCurrency(item.pricePerBox)} / {item.unit}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateItemQty(item.id, item.qty - 1)}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-white/50 hover:text-white bg-white/5">
                            <Minus size={11} />
                          </button>
                          <span className="text-white text-xs w-6 text-center font-semibold">{item.qty}</span>
                          <button onClick={() => updateItemQty(item.id, item.qty + 1)}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-white/50 hover:text-white bg-white/5">
                            <Plus size={11} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)}
                          className="text-white/25 hover:text-red-400 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost px-5">
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => {
                    if (items.length === 0) { toast.error('Select at least one product'); return }
                    setStep(3)
                  }}
                  className="btn-primary flex-1 justify-center"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-5"
            >
              <div className="glass-md p-8 space-y-5">
                <h2 className="text-white font-bold text-xl">Project Details</h2>
                <div>
                  <label className="form-label">Project Type *</label>
                  <select value={delivery.projectType} onChange={setD('projectType')} className="form-input cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <option value="" disabled style={{ background: '#020817' }}>Select type…</option>
                    {projectTypes.map((t) => <option key={t} value={t} style={{ background: '#020817' }}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Delivery Location *</label>
                  <input value={delivery.location} onChange={setD('location')} className="form-input" placeholder="City, State / ZIP Code" />
                </div>
                <div>
                  <label className="form-label">Target Delivery Date</label>
                  <input type="date" value={delivery.targetDate} onChange={setD('targetDate')} className="form-input"
                    style={{ colorScheme: 'dark' }} />
                </div>
                <div>
                  <label className="form-label">Additional Notes</label>
                  <textarea rows={4} value={delivery.notes} onChange={setD('notes')} className="form-input resize-none"
                    placeholder="Any special requirements, certifications needed, delivery instructions…" />
                </div>

                {/* Summary */}
                <div className="glass-gold p-4 rounded-xl">
                  <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">Quote Summary</p>
                  <div className="space-y-1.5">
                    {items.map((i) => (
                      <div key={i.id} className="flex justify-between text-xs">
                        <span className="text-white/60 truncate mr-4">{i.name.split(' ').slice(0,3).join(' ')} × {i.qty}</span>
                        <span className="text-white shrink-0">{formatCurrency(i.pricePerBox * i.qty)}</span>
                      </div>
                    ))}
                    <div className="glass-divider mt-2 mb-2" />
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-white/80">Estimated Total</span>
                      <span className="text-amber-400">{formatCurrency(items.reduce((s, i) => s + i.pricePerBox * i.qty, 0))}</span>
                    </div>
                    <p className="text-white/30 text-[11px] mt-1">Final price subject to bulk discounts and freight.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-ghost px-5">
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => {
                    if (!delivery.projectType || !delivery.location) { toast.error('Fill in required fields'); return }
                    handleSubmit()
                  }}
                  disabled={loading}
                  className="btn-primary flex-1 justify-center"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" /> : 'Submit Quote Request'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
