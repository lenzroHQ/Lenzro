/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // important for next-themes
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        agrandir: ["Agrandir", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
