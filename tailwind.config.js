/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF8F5',
        surface: '#F2EFE9',
        ink: '#151419',
        muted: '#52505B',
        ribbon: '#5B21B6',
        lavender: '#EDE9FE',
        crimson: '#9F1239',
        hairline: '#E3DDD3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
