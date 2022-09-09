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
      },
    },
  },
  plugins: [],
};
