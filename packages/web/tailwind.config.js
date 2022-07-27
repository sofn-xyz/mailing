/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#fafa98",
      },
      fontSize: {
        "3xl": ["32px"],
        "5xl": ["42px", "59px"],
        "8xl": ["84px", "92px"],
      },
    },
  },
  plugins: [],
};
