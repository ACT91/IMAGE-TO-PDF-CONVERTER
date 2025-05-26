import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdHome, MdSave, MdInfo, MdSettings, MdDarkMode, MdLightMode } from 'react-icons/md'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './styles/animations.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleThemeToggle = () => {
    setDark(d => !d);
    // Add a quick flash effect when changing theme
    document.documentElement.style.transition = 'background-color 0.5s ease';
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      <header className="navbar bg-base-200 px-4 shadow-lg transition-all duration-300">
        <div className="flex-1">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#007bff] to-[#800000] bg-clip-text text-transparent">
            IMAGE TO PDF <span className="text-[#800000]">CONVERTER</span>
          </span>
        </div>
        
        <div className="flex-none">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {[
              { to: "/", icon: <MdHome className="w-6 h-6" />, label: "Home" },
              { to: "/saved", icon: <MdSave className="w-6 h-6" />, label: "Saved" },
              { to: "/about", icon: <MdInfo className="w-6 h-6" />, label: "About" },
              { to: "/settings", icon: <MdSettings className="w-6 h-6" />, label: "Settings" }
            ].map((item) => (
              <NavLink 
                key={item.to}
                to={item.to} 
                className={({ isActive }) => 
                  `btn btn-ghost btn-circle ${isActive ? 'bg-[#007bff]/20 text-[#007bff]' : ''}`
                }
              >
                {item.icon}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn btn-square btn-ghost md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[#007bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Backdrop */}
          {menuOpen && (
            <div 
              className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Mobile Dropdown Menu */}
          <div className={`
            fixed top-0 right-0 
            w-64 h-screen
            bg-white dark:bg-gray-800
            shadow-xl dark:shadow-2xl
            transition-all duration-300 transform
            md:hidden
            flex flex-col items-center justify-center gap-8
            z-50
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <button
              className="absolute top-4 right-4 btn btn-ghost btn-circle dark:hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="w-6 h-6 text-[#007bff] dark:text-[#80b3ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {[
              { to: "/", icon: <MdHome className="w-8 h-8" />, label: "Home" },
              { to: "/saved", icon: <MdSave className="w-8 h-8" />, label: "Saved" },
              { to: "/about", icon: <MdInfo className="w-8 h-8" />, label: "About" },
              { to: "/settings", icon: <MdSettings className="w-8 h-8" />, label: "Settings" }
            ].map((item) => (
              <NavLink 
                key={item.to}
                to={item.to} 
                className={({ isActive }) => `
                  btn btn-ghost btn-circle w-16 h-16
                  ${isActive ? 
                    'text-[#007bff] dark:text-[#80b3ff] bg-[#007bff]/5 dark:bg-[#80b3ff]/10' : 
                    'text-gray-700 dark:text-gray-300'
                  }
                  dark:hover:bg-gray-700
                `}
                onClick={() => setMenuOpen(false)}
              >
                {item.icon}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-12">
          
        

          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#007bff] to-[#800000] bg-clip-text text-transparent">
              Transform Images to PDFs
            </h1>
            <p className="text-xl opacity-80 max-w-2xl">
              Convert your images to high-quality PDF documents with just one click. Fast, secure, and easy to use.
            </p>
          </div>

          <button
            className="convert-btn btn bg-[#007bff] hover:bg-[#0056b3] text-white btn-lg px-8 py-4 text-lg font-bold transition-all duration-300"
            onClick={() => {
              navigate('/convert');
              // Add ripple effect
              const button = document.querySelector('.convert-btn');
              if (button) {
                button.classList.add('animate-pulse');
                setTimeout(() => button.classList.remove('animate-pulse'), 500);
              }
            }}
          >
            START CONVERTING NOW
          </button>
        </div>
      </main>

      <button
        className="btn btn-circle btn-lg fixed bottom-8 right-8 shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
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