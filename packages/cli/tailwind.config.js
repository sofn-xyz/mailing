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
        "gray-300": "#ccc",
        "gray-500": "#555",
        "gray-600": "#444",
        "gray-700": "#333",
        "gray-800": "#222",
        "slate-400": "#bdc3cf",
        "slate-500": "#7b7e85",
        "neutral-200": "#eee",
        "neutral-500": "#777",
        "neutral-600": "#666",
        "neutral-800": "#444",
        black: "#111",
        "red-400": "#f59c9c",
        "amber-200": "#fadf98",
        "green-200": "#dbf7d7",
        "green-300": "#c3f2bc",
        "emerald-700": "#728a6f",
        blue: "#b8ceff",
        "blue-300": "#dce7ff",
        "blue-400": "#a1bfff",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
