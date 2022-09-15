/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
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
