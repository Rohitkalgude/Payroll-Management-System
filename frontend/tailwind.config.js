/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btnclr: '#4A4AEF',
        divBg : '#FFFFFF',
        sideTextClr : '#636D82',
        sideBgClr : '#f3f8fb',
        manual : "rgba(74, 74, 239,0.3)"

      },
      boxShadow: {
        shadowStyle:  '2px 6px 15px  rgba(0, 0, 0, 0.1)'
      },
      fontFamily: {
        Inter: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    },
  },

  plugins: [],
}

