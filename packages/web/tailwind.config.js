/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#fafa98",
        blue: {
          300: "#dce7ff",
          400: "#a1bfff",
        },
      },
      fontSize: {
        "6xl": "64px",
      },
    },
  },
  plugins: [],
};
