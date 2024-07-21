/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'customdark': '#000014',
        'gold-gradient-start': '#ff7a00',
        'gold-gradient-end': '#ffcc00',
      },
      keyframes: {
        colorPulse: {
          '0%': { backgroundColor: '#000014' },
          '50%': { backgroundColor: '#ffcc00' },
          '100%': { backgroundColor: '#000014' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        colorPulse: 'colorPulse 2s infinite',
        scaleUp: 'scaleUp 0.6s ease-in-out',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
