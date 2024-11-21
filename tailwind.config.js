import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D5AD45",
        secondary: "#1F263E",
        black: "#000000",
        white: "#FFFFFF",
      },
      backgroundImage: {
        doctors: `url('/assets/Testimonials/transparentGradient.png')`,
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "1rem",
      },
    },
    maxWidth: {
      "2xl": "1536px",
    },
  },

  darkMode: "class",
  plugins: [nextui()],
};