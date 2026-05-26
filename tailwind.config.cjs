/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#888888",
        tertiary: "#0f0f0f",
        "black-100": "#0a0a0a",
        "black-200": "#050505",
        "white-100": "#f0f0f0",
      },
      boxShadow: {
        card: "0px 20px 60px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
