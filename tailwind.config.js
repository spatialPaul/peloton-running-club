/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD700",    // Yellow
        secondary: "#800080",  // Purple
        accent: "#4A90E2",     // Complementary blue
        neutral: "#F4F4F4"     // Light gray
      }
    }
  },
  plugins: [],
}