/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'data-bg': "url('/data-bg.jpeg')",
        'abstract':"url('/abstract.jpeg')"
      }
    },
  },
  plugins: [],
}