/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff"
      }
    },
    screens: {
      xs: "480",
      ss: "620",
      sm: "768",
      md: "1060",
      lg: "1200"
    }
  },
  plugins: [],
}

