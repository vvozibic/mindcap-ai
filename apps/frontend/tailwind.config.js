import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          ...defaultTheme.colors.gray,
          400: "#73757d", // принудительно установить оригинальный цвет
          500: "#73757d", // принудительно установить оригинальный цвет
        },
        primary: {
          900: "#000000", // Full black background
          800: "#171717", // Slightly lighter black (containers)
          700: "#111111", // Hover state / borders
          600: "#171717", // Hover state / borders
        },
        accent: {
          500: "#00ff99", // Neon green for main accents
          600: "#00cc7a", // Darker green for hover states
        },
        text: {
          primary: "#ffffff", // White text
          secondary: "#73757d", // Muted gray text
          muted: "#73757d", // Muted gray text
        },
        status: {
          green: "#22c55e", // Tailwind green-500
          red: "#ef4444",   // Tailwind red-500
        },
      },
    },
  },
  plugins: [],
}
