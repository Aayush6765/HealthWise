/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
        accent: "#8b5cf6",
        danger: "#ef4444",
        "dark-bg": "#0f172a",
        "light-bg": "#f8fafc"
      },
    },
  },
  plugins: [],
} 