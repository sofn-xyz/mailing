/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [require("../tailwind.config.cjs")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
};
