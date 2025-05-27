// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
<<<<<<< HEAD
<<<<<<< HEAD
  theme: { extend: {} },
  plugins: [require('daisyui')],
=======
=======
>>>>>>> recovery-branch
  darkMode: 'class', // Use class strategy for dark mode
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
<<<<<<< HEAD
>>>>>>> recovery-branch
=======
>>>>>>> recovery-branch
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark" ,
  }
}