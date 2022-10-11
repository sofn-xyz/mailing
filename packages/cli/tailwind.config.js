/** @type {import('tailwindcss').Config} */

const path = require("path");

module.exports = {
  content: [
    path.join(__dirname, "./src/pages/**/*.{js,ts,jsx,tsx}"),
    path.join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        white: "#E4EBFA",
        black: "#111",
        blue: "#B8CEFF",
        "gray-300": "#ccc",
        "gray-600": "#444",
        "gray-700": "#333",
        mint: "#C3F2BC",
        "mint-50": "rgba(195, 242, 188, 0.5)",
        "light-red": "#F59C9C",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
