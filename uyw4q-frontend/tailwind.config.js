/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070D1E',
          900: '#0D172E',
          800: '#15223F',
          700: '#1E2F54',
          600: '#2A3F6D',
          500: '#3D5489',
        },
        terracota: {
          900: '#7C2D12',
          800: '#9A3412',
          700: '#C2410C',
          600: '#D4513B',
          500: '#E05A47',
          400: '#EA7A6A',
          100: '#FDEEEB',
          50: '#FDF6F4',
        },
        sand: {
          50: '#FBFBFA',
          100: '#F5F5F3',
          200: '#EAEAE6',
          300: '#DCDCD7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
