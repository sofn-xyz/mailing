/** @type {import('tailwindcss').Config} */

module.exports = {
  extend: {
    colors: {
      white: "#e4ebfa",
      "gray-300": "#ccc",
      "gray-500": "#555",
      "gray-600": "#444",
      "gray-700": "#333",
      "gray-800": "#222",
      "slate-300": "#bdc3cf",
      "slate-400": "#a5aab4",
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
      "blue-600": "#3a70e3",
    },
    fontSize: {
      "6xl": "64px",
    },
    animation: {
      "delayed-fade": "delay-fade 1s ease",
    },
    keyframes: {
      "delay-fade": {
        "0%, 50%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    },
  },
};
