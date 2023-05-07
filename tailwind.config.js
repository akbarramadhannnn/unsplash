/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black1: "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
