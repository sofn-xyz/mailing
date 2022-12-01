/** @type {import('tailwindcss').Config} */

const theme = require("../cli/theme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme,
  plugins: [require("@tailwindcss/typography")],
};
