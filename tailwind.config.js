/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cardo: {
          50: '#f2f9f3',
          100: '#e1f2e5',
          500: '#2b8a3e',
          600: '#237032',
          700: '#1c5627',
          800: '#16431f',
          900: '#0e2b14',
        }
      }
    },
  },
  plugins: [],
}
