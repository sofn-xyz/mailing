/** @type {import('tailwindcss').Config} */

const theme = require("./theme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme,
  plugins: [],
};
