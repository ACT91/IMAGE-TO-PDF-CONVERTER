// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
<<<<<<< HEAD
  theme: { extend: {} },
  plugins: [require('daisyui')],
=======
  darkMode: 'class', // Use class strategy for dark mode
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark" ,
  }
>>>>>>> recovery-branch
}