/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin:{
        
        '100':'10em',
        '200':'20em',
      }
    },
  },
  plugins: [],
}

