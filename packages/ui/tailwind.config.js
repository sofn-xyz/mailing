/** @type {import('tailwindcss').Config} */

const path = require("path");

module.exports = {
  content: [
    path.join(__dirname, "./src/components/**/*.{ts,tsx}"),
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
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
