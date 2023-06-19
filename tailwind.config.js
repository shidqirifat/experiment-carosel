/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#111",
        grey: "#757575",
        "gray-active": "#e5e5e5",
        "gray-inactive": "#f5f5f5",
      }
    },
  },
  plugins: [],
}

