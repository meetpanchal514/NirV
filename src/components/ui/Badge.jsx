const colorMap = {
  gold: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  blue: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  green: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  red: 'bg-red-500/20 text-red-300 border border-red-500/30',
  silver: 'bg-slate-400/20 text-slate-300 border border-slate-400/30',
  default: 'bg-white/10 text-white/70 border border-white/20',
}

export default function Badge({ children, color = 'default', className = '' }) {
  return (
    <span className={`badge ${colorMap[color] || colorMap.default} ${className}`}>
      {children}
    </span>
  )
}
