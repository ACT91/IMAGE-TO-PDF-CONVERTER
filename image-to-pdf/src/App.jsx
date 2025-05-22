import './App.css'
import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdHome, MdSave, MdInfo, MdSettings, MdDarkMode, MdLightMode } from 'react-icons/md'

function App() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-theme', dark);
  }, [dark]);

  const handleThemeToggle = () => setDark(d => !d);

  return (
    <>
      <header className="header">
        <div className="header-title">
          <span className="gradient-title">
            IMAGE TO PDF <span className="converter-word">CONVERTER</span>
          </span>
        </div>
        <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            <MdHome className="nav-icon" />
          </NavLink>
          <NavLink to="/saved" onClick={() => setMenuOpen(false)}>
            <MdSave className="nav-icon" />
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            <MdInfo className="nav-icon" />
          </NavLink>
          <NavLink to="/settings" onClick={() => setMenuOpen(false)}>
            <MdSettings className="nav-icon" />
          </NavLink>
       
          {menuOpen && (
            <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu">&times;</button>
          )}
        </nav>
        {!menuOpen && (
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </button>
        )}
      </header>
      <div className="container">
        <div className="animation-wrapper">
          <div className="image-icon">🖼️</div>
          <div className="arrow">➡️</div>
          <div className="pdf-icon">📄</div>
        </div>
        <button
          className="convert-btn"
          onClick={() => navigate('/convert')}
        >
          CONVERT IMAGE TO PDF
        </button>
      </div>
      {/* Floating Theme Toggle Button */}
      <button
        className="theme-toggle-fab"
        onClick={handleThemeToggle}
        aria-label="Toggle theme"
        type="button"
      >
        {dark ? (
          <MdLightMode className="theme-icon sun" />
        ) : (
          <MdDarkMode className="theme-icon moon" />
        )}
      </button>
    </>
  )
}

export default App
