import { Link } from 'react-router-dom'
import { Wrench, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

const productLinks = [
  { label: 'Pallet Nails', to: '/products?category=pallet' },
  { label: 'Framing Nails', to: '/products?category=framing' },
  { label: 'Roofing Nails', to: '/products?category=roofing' },
  { label: 'Siding Nails', to: '/products?category=siding' },
  { label: 'Flooring Nails', to: '/products?category=flooring' },
  { label: 'Fencing Nails', to: '/products?category=fencing' },
]

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Products', to: '/products' },
  { label: 'Request a Quote', to: '/quote' },
  { label: 'Contact Us', to: '/contact' },
]

const socialLinks = [
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32">
      {/* Top divider glow */}
      <div className="h-px w-full" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.4) 30%, rgba(59,130,246,0.4) 70%, transparent 100%)'
      }} />

      <div
        className="border-t border-white/5"
        style={{ background: 'rgba(2,8,23,0.95)', backdropFilter: 'blur(40px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  <Wrench size={18} className="text-black rotate-45" />
                </div>
                <div>
                  <span className="text-xl font-bold">
                    <span className="gold-text">Nir</span>
                    <span className="text-white"> Trades</span>
                  </span>
                </div>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Your trusted source for premium industrial coil nails. Engineered for precision, built to last.
              </p>

              {/* Social */}
              <div className="flex items-center gap-2">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                Products
              </h4>
              <ul className="space-y-2.5">
                {productLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-white/50 hover:text-amber-400 text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-white/50 hover:text-amber-400 text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-white/50 text-sm">
                    123 Industrial Pkwy,<br />Commerce City, CA 90040
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-amber-400 shrink-0" />
                  <a href="tel:+18005551234" className="text-white/50 hover:text-white text-sm transition-colors">
                    +1 (800) 555-1234
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-amber-400 shrink-0" />
                  <a href="mailto:sales@nirtrades.com" className="text-white/50 hover:text-white text-sm transition-colors">
                    sales@nirtrades.com
                  </a>
                </li>
              </ul>

              {/* Hours */}
              <div className="mt-5 p-4 rounded-xl" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                  Business Hours
                </p>
                <p className="text-white/45 text-xs">Mon–Fri: 8:00 AM – 6:00 PM</p>
                <p className="text-white/45 text-xs">Sat: 9:00 AM – 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className="glass-divider mt-12 mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} Nir Trades. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</a>
              <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
