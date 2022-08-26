/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // fontSize: {
      //   'xsm': ['1em', {
      //     letterSpacing: '-0.01em',
      //   }]
      // },
      lineHeight: {
        '1': '1.5rem',
      }
    },
  },
  plugins: [],
}
