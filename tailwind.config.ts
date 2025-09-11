/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'colombia-yellow': '#FDE047',
        'colombia-blue': '#1E40AF',
        'colombia-red': '#DC2626',
      },
    },
  },
  plugins: [],
}