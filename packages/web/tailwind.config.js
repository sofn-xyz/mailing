/** @type {import('tailwindcss').Config} */

const baseConfig = require("../../tailwind.config.cjs");

module.exports = {
  ...{ baseConfig },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
};
