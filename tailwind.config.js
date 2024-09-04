
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C8102E',  
        secondary: '#FFFFFF',
        accent: '#FF0000',  
      },
    },
  },
  plugins: [],
}
