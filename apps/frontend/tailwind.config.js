/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New color scheme based on screenshot
        primary: {
          900: "#0f1424", // Darkest blue (sidebar)
          800: "#151a2d", // Dark blue (table rows)
          700: "#1b2139", // Medium dark blue (table header)
          600: "#232942", // Lighter blue (hover states)
          500: "#2a3050", // Light blue accents
        },
        accent: {
          500: "#f7e05a", // Yellow for buttons
          600: "#e9d252", // Darker yellow for hover states
        },
        status: {
          green: "#4ade80",
          yellow: "#facc15",
        }
      },
    },
  },
  plugins: [],
}
