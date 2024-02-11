/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.45rem',
        sm: '0.75rem',
        lg: '1.5rem',
        xl: '3rem',
        '2xl': '4rem',
      },
    },
    extend: {
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300'
      }
    },
  },
  plugins: [],
}

