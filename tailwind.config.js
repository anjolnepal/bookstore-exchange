/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#20261F',
        paper: '#FBF7EE',
        paper2: '#F1E9D6',
        spine: {
          DEFAULT: '#2F4A3B',
          dark: '#1E3227',
        },
        mustard: {
          DEFAULT: '#D79A2C',
          dark: '#B37F1E',
        },
        line: '#DCD2B8',
        muted: '#736C5B',
        paperWhite: '#FFFDF8',
        danger: '#A34438',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Work Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        card: '0 12px 24px rgba(32,38,31,.12)',
        dropdown: '0 10px 24px rgba(30,50,39,.18)',
      },
    },
  },
  plugins: [],
};