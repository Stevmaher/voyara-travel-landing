/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#102A43',
        ocean: '#176B87',
        teal: { DEFAULT: '#2AA198', dark: '#23877F' },
        sand: '#F5F2EB',
        ink: '#17324D',
        muted: '#718096',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        brand: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px -20px rgba(16,42,67,.35)',
        glow: '0 0 0 1px rgba(255,255,255,.55), 0 0 22px rgba(255,255,255,.18)',
      },
    },
  },
  plugins: [],
};
