/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kavoon: ['Kavoon', 'cursive'],
      },
    },
    colors:{
      white: "#ffffff",
      black:'#000000',
      bgOrange: "#FF8C3F",
      textOrange: "#FF6600",
      lightOrange: "#fff2e9",
      grey:"#DEDEDE",
      textGrey: '#676767'

    }
  },
  plugins: [],
}

