/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E11D48',
        'primary-hover': '#BE123C',
        accent: '#10B981',
        bg: '#FAFAF9',
        card: '#FFFFFF',
        'text-dark': '#18181B',
        'text-muted': '#71717A',
        border: '#E4E4E7',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 18s linear infinite'
      }
    },
  },
  plugins: [],
}