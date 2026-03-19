import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Stats from '../components/home/Stats'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/Newsletter'
import ProductCard from '../components/products/ProductCard'
import products from '../data/products'

const featuredProducts = products.filter((p) => p.featured)

export default function Home() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <Hero />

      {/* Features */}
      <Features />

      {/* Featured Products */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2"
              >
                Our Products
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-heading"
              >
                Top Sellers
              </motion.h2>
            </div>
            <Link
              to="/products"
              className="btn-ghost text-amber-400/80 hover:text-amber-400 flex items-center gap-2"
            >
              View all products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry CTA Banner */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-10 md:p-14"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(59,130,246,0.1) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(245,158,11,0.08), transparent)' }} />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="section-heading text-3xl md:text-4xl mb-3">
                  Need a Custom Quote?
                </h2>
                <p className="text-white/55 text-lg max-w-xl">
                  Volume pricing, custom specifications, and dedicated account management — tell us what you need.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/quote" className="btn-primary text-base px-8 py-4">
                  Get a Quote
                </Link>
                <Link to="/contact" className="btn-secondary text-base px-8 py-4">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
