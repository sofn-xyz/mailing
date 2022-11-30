/** @type {import('tailwindcss').Config} */

const theme = require("../cli/theme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
      fontFamily: {
        ...theme.extend.fontFamily,
        serif: ["swear-display-cilati", "Georgia", "Times New Roman", "serif"],
        sans: [
          "neue-haas-unica",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
