/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'data-bg': "url('/data-bg.jpeg')",
        'abstract':"url('/abstract.jpeg')",
        'smc':"url('/login-bg.png')"
      },
      colors: {
        'atos-dark-blue': '#00005c',
        'atos-medium-blue': '#0073e6',
        'atos-light-blue': '#3dc7ff'

      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}