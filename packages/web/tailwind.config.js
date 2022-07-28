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
        "5xl": ["48px", "67px"],
      },
    },
  },
  plugins: [],
};
