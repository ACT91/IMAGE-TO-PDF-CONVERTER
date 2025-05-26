import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdHome, MdSave, MdInfo, MdSettings, MdDarkMode, MdLightMode } from 'react-icons/md'

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleThemeToggle = () => setDark(d => !d);

  return (
    <div className="min-h-screen bg-base-100">
      <header className="navbar bg-base-200 px-4">
        <div className="flex-1">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            IMAGE TO PDF <span className="text-accent">CONVERTER</span>
          </span>
        </div>
        
        <div className="flex-none">
          <div className={`menu menu-horizontal ${menuOpen ? 'block' : 'hidden'} md:block`}>
            <NavLink to="/" end className="btn btn-ghost btn-circle">
              <MdHome className="w-6 h-6" />
            </NavLink>
            <NavLink to="/saved" className="btn btn-ghost btn-circle">
              <MdSave className="w-6 h-6" />
            </NavLink>
            <NavLink to="/about" className="btn btn-ghost btn-circle">
              <MdInfo className="w-6 h-6" />
            </NavLink>
            <NavLink to="/settings" className="btn btn-ghost btn-circle">
              <MdSettings className="w-6 h-6" />
            </NavLink>
          </div>
          
          <button
            className="btn btn-square btn-ghost md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 text-4xl">
            <span className="text-6xl">🖼️</span>
            <span className="text-4xl">➡️</span>
            <span className="text-6xl">📄</span>
          </div>
          
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/convert')}
          >
            CONVERT IMAGE TO PDF
          </button>
        </div>
      </main>

      <button
        className="btn btn-circle btn-lg fixed bottom-4 right-4"
        onClick={handleThemeToggle}
        aria-label="Toggle theme"
      >
        {dark ? (
          <MdLightMode className="w-6 h-6" />
        ) : (
          <MdDarkMode className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}

export default HomePage