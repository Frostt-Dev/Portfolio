/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--color-main)",
        text: "var(--color-text)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
        surface: "var(--color-surface)",
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px var(--color-shadow)',
        'neo-lg': '8px 8px 0px 0px var(--color-shadow)',
        'neo-sm': '2px 2px 0px 0px var(--color-shadow)',
      },
      borderColor: {
        DEFAULT: "var(--color-border)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Keep Inter for now, maybe switch to Space Grotesk later if requested
      },
    },
  },
  plugins: [],
}
