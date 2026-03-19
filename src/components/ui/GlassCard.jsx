import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function GlassCard({
  children,
  className = '',
  hover = false,
  variant = 'default',
  animate = false,
  delay = 0,
  onClick,
  ...props
}) {
  const variants = {
    default: 'glass',
    md: 'glass-md',
    lg: 'glass-lg',
    gold: 'glass-gold',
    blue: 'glass-blue',
    sm: 'glass-sm',
  }

  const baseClass = `${variants[variant] || variants.default} ${hover ? 'glass-hover' : ''} ${className}`

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className={baseClass}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClass} onClick={onClick} {...props}>
      {children}
    </div>
  )
}
