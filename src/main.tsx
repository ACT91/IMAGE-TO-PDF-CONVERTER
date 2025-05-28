import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/index.css';
import ThemeProvider from './ThemeProvider'

// Force light theme on initial load
document.documentElement.classList.remove('dark');
document.documentElement.setAttribute('data-theme', 'light');

// Override any system preference
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', () => {
  // If system preference changes, don't automatically change the theme
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }
});

// Always default to light mode if no theme is set
let theme = localStorage.getItem('darkMode');
if (theme === null) {
  localStorage.setItem('darkMode', 'false');
  theme = 'false';
}
if (theme === 'true') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
>>>>>>> recovery-branch
  </StrictMode>
)