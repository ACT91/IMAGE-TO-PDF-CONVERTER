// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'icon-sequence': {
          '0%': { 
            opacity: '1',
            transform: 'scale(1) translateX(0)'
          },
          '33%': { 
            opacity: '0',
            transform: 'scale(0.7) translateX(50px)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.5) translateX(100px)'
          }
        }
      },
      animation: {
        'icon-sequence': 'icon-sequence 4s ease-in-out infinite',
      }
    }
  },
  plugins: [require("daisyui")],
}