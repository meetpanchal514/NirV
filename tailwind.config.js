/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020817',
          900: '#030d1e',
          800: '#061029',
          700: '#091534',
          600: '#0d1e45',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        glass: {
          white: 'rgba(255,255,255,0.05)',
          'white-md': 'rgba(255,255,255,0.08)',
          'white-lg': 'rgba(255,255,255,0.12)',
          gold: 'rgba(245,158,11,0.1)',
          blue: 'rgba(59,130,246,0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 70%)',
        'radial-blue': 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)',
        'gradient-dark': 'linear-gradient(135deg, #020817 0%, #061029 50%, #020817 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.3), transparent)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-gold': '0 8px 32px rgba(245,158,11,0.2), inset 0 1px 0 rgba(245,158,11,0.1)',
        'glass-blue': '0 8px 32px rgba(59,130,246,0.2), inset 0 1px 0 rgba(59,130,246,0.1)',
        'glow-gold': '0 0 30px rgba(245,158,11,0.4)',
        'glow-blue': '0 0 30px rgba(59,130,246,0.4)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5)',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
        '4xl': '80px',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
