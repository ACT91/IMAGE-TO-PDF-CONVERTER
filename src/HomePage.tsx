import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../scripts/ThemeProvider'

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { theme, toggleTheme: toggleThemeContext } = useTheme();
  const darkMode = theme === 'dark';
  
  function toggleTheme(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    toggleThemeContext();
  }
  
  return (
    <div className="min-h-screen" 
         style={{ backgroundColor: darkMode ? '#000000' : '#ffffff' }}>
      <header className="navbar"
              style={{ backgroundColor: darkMode ? '#000000' : '#ffffff' }}>
        <div className="flex-1">
          <span className="text-2xl font-bold">
            <span style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
              IMAGE TO PDF
            </span>{" "}
            <span style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              CONVERTER
            </span>
          </span>
        </div>
        
        <div className="flex-none">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            {[
              { to: "/", label: "Home" },
              { to: "/saved", label: "Saved" },
              { to: "/about", label: "About" },
              { to: "/settings", label: "Settings" }
            ].map((item) => (
              <NavLink 
                key={item.to}
                to={item.to} 
                className="btn btn-ghost"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? (darkMode ? 'rgba(255,0,0,0.2)' : 'rgba(0,123,255,0.2)') : 'transparent',
                  color: isActive 
                    ? (darkMode ? '#ff0000' : '#007bff')
                    : (darkMode ? '#ffffff' : '#000000')
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn btn-square btn-ghost md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" 
                 fill="none" 
                 stroke={darkMode ? '#ff0000' : '#007bff'} 
                 viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Menu Backdrop */}
          {menuOpen && (
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-40"
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Mobile Menu */}
          <div className={`
            fixed top-0 right-0 
            w-64 h-screen
            shadow-xl
            transform
            md:hidden
            flex flex-col items-stretch
            z-50
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          style={{ 
            backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
            boxShadow: darkMode ? '0 20px 25px -5px rgba(255,255,255,0.1)' : '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            {/* Add Close Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{ 
                color: darkMode ? '#ff0000' : '#007bff',
                backgroundColor: darkMode ? 'rgba(75,85,99,0.2)' : 'rgba(243,244,246,0.7)'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Items - adjust top padding to account for close button */}
            <div className="pt-16 flex flex-col items-stretch">
              {[
                { to: "/", label: "Home" },
                { to: "/saved", label: "Saved" },
                { to: "/about", label: "About" },
                { to: "/settings", label: "Settings" }
              ].map((item) => (
                <NavLink 
                  key={item.to}
                  to={item.to} 
                  className="px-8 py-4 text-lg font-medium"
                  style={({ isActive }) => ({
                    color: isActive 
                      ? (darkMode ? '#ff0000' : '#007bff')
                      : (darkMode ? '#ffffff' : '#000000'),
                    backgroundColor: isActive
                      ? (darkMode ? 'rgba(255,0,0,0.1)' : 'rgba(0,123,255,0.1)')
                      : 'transparent'
                  })}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-4rem)]"
            style={{ backgroundColor: darkMode ? '#000000' : '#ffffff' }}>
        <div className="flex flex-col items-center gap-12 -mt-20">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold"
                style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
              Transform Images to PDFs
            </h1>
            <p className="text-xl opacity-80 max-w-2xl"
               style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              Convert your images to high-quality PDF documents with just one click.
            </p>
          </div>

          <button
            className="btn px-8 py-4 text-lg font-bold text-white"
            style={{ 
              backgroundColor: darkMode ? '#ff0000' : '#007bff',
              borderColor: darkMode ? '#cc0000' : '#0056b3'
            }}
            onClick={() => navigate('/convert')}
          >
            START CONVERTING NOW
          </button>
        </div>
      </main>

      <button
        className="btn btn-circle btn-lg fixed bottom-8 right-8 text-white shadow-xl"
        style={{ 
          backgroundColor: darkMode ? '#ff0000' : '#007bff'
        }}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {darkMode ? (
          <MdLightMode className="w-6 h-6" />
        ) : (
          <MdDarkMode className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}

export default HomePage