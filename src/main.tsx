import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)