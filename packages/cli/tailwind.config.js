const path = require("path");
const theme = require("./theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, "./src/pages/**/*.{js,ts,jsx,tsx}"),
    path.join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme,
  plugins: [require("@tailwindcss/line-clamp")],
};
