/** @type {import('tailwindcss').Config} */

const path = require("path");
const baseConfig = require("../../tailwind.config.cjs");

module.exports = {
  ...{ baseConfig },
  content: [
    path.join(__dirname, "./src/pages/**/*.{js,ts,jsx,tsx}"),
    path.join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx}"),
  ],
  plugins: [require("@tailwindcss/line-clamp")],
};
