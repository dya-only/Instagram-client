/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'noto': ['Noto Sans KR']
    },
    screen: {
      'mid': '1260px',
      'sub': '1160px'
    }
  },
  plugins: [],
}
