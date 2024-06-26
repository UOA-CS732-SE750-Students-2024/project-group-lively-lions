/*eslint-env node*/ //telling ESLint that this file is running in Node environment

const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'] // Default font for the entire app
    },
    extend: {
      backgroundImage: {
        'drawer-bottom':
          "url('/src/assets/level-select/drawer_bottom_sprite.png')",
        'card-background': "url('/src/assets/common/card_texture.png')"
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'phone-ring': {
          '0%, 33%, 66%, 100%': { transform: 'rotate(0deg)' },
          '11%, 44%, 77%': { transform: 'rotate(8deg)' },
          '22%, 55%, 88%': { transform: 'rotate(-8deg)' }
        },
        'book-shuffle': {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%, 75%': { transform: 'rotate(-4deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'phone-ring': 'phone-ring 0.9s ease-out',
        'book-shuffle': 'book-shuffle 0.5s ease-in-out'
      },
      rotate: {
        30: '30deg'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
