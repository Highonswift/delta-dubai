// postcss.config.mjs

/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        boldfont: ['Boldfont', 'sans-serif'],
      },
      keyframes: {
        slideInFromTopLeft: {
          '0%': { transform: 'translate(-100%)', opacity: '0' },
          '100%': { transform: 'translate(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fader: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in-fast': 'slideInFromTopLeft 0.5s ease-out forwards',
        'slide-in-slow': 'slideInFromTopLeft 1.5s ease-out forwards',
        'slide-in-right': 'slideInFromRight 1.5s ease-out forwards',
        'fade-in-slow': 'fader 2s ease-in forwards',
      },
    },
  },
};


export default {
  plugins: {
    '@tailwindcss/postcss': config,
    'autoprefixer': {},
  },
};