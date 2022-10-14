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
        white: "#e4ebfa",
        gray: {
          300: "#ccc",
          500: "#555",
          600: "#444",
          700: "#333",
          800: "#222",
        },
        slate: {
          400: "#bdc3cf",
          500: "#7b7e85",
        },
        neutral: {
          200: "#eee",
          500: "#777",
          600: "#666",
          800: "#444",
        },
        black: "#111",
        "red-400": "#f59c9c",
        "amber-200": "#fadf98",
        green: {
          50: "#f1fcef",
          200: "#dbf7d7",
          300: "#c3f2bc",
        },
        "emerald-700": "#728a6f",
        blue: "#b8ceff",
        blue: {
          300: "#dce7ff",
          400: "#a1bfff",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
