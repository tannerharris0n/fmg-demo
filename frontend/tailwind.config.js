/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      // Named type scale - every UI size maps to one of these.
      fontSize: {
        '2xs':  ['10.5px', { lineHeight: '14px' }],  // uppercase labels, badges
        xs:     ['11.5px', { lineHeight: '16px' }],  // meta, captions
        sm:     ['12.5px', { lineHeight: '18px' }],  // default UI text
        base:   ['13.5px', { lineHeight: '20px' }],  // emphasized rows, tile titles
        md:     ['14.5px', { lineHeight: '20px' }],  // inputs, drawer titles
        lg:     ['17px',   { lineHeight: '24px' }],  // page titles
      },
      colors: {
        // Surface palette - dark-first, slightly cool
        surface: {
          950: '#090B0F',  // page background
          900: '#10131A',  // raised panels
          800: '#161A22',  // inner cards
          700: '#1E232D',  // hover
          600: '#283040',  // borders
          500: '#3A4354',
        },
        ink: {
          50:  '#F3F5F8',  // primary text
          200: '#C6CCD6',  // secondary
          400: '#939BA8',  // tertiary
          600: '#6B7482',  // muted (still readable on 950)
        },
        accent: {
          DEFAULT: '#3D8EF0',
          soft: '#16304F',
        },
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.04) inset',
        tile: '0 1px 0 0 rgba(255,255,255,0.035) inset, 0 1px 2px 0 rgba(0,0,0,0.35)',
        lift: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 8px 24px -8px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-in':   'fadeIn 200ms ease-out',
        'slide-up':  'slideUp 260ms cubic-bezier(0.2, 0.9, 0.3, 1)',
        'skeleton':  'shimmer 1.8s ease-in-out infinite',
        'toast-in':  'toastIn 220ms cubic-bezier(0.2, 0.9, 0.3, 1)',
        'stagger-1': 'slideUp 280ms cubic-bezier(0.2,0.9,0.3,1) both',
        'stagger-2': 'slideUp 280ms 50ms cubic-bezier(0.2,0.9,0.3,1) both',
        'stagger-3': 'slideUp 280ms 100ms cubic-bezier(0.2,0.9,0.3,1) both',
        'stagger-4': 'slideUp 280ms 150ms cubic-bezier(0.2,0.9,0.3,1) both',
        'stagger-5': 'slideUp 280ms 200ms cubic-bezier(0.2,0.9,0.3,1) both',
        'stagger-6': 'slideUp 280ms 250ms cubic-bezier(0.2,0.9,0.3,1) both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        toastIn: {
          '0%':   { opacity: 0, transform: 'translateY(6px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
