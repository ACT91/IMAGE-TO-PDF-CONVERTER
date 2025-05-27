import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { MdHome, MdSave, MdInfo, MdSettings, MdDarkMode, MdLightMode } from 'react-icons/md'

interface HomePageProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  
  function toggleTheme(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    setDarkMode((prev) => !prev);
  }
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <header className="navbar bg-white dark:bg-black transition-colors duration-300">
        <div className="flex-1">
          <span className="text-2xl font-bold">
            <span className="text-[#007bff] dark:text-[#ff0000] transition-colors duration-300">
              IMAGE TO PDF
            </span>{" "}
            <span className="text-black dark:text-white transition-colors duration-300">
              CONVERTER
            </span>
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
                className={({ isActive }) => `
                  btn btn-ghost btn-circle transition-all duration-300
                  ${isActive ? 
                    'bg-[#007bff]/20 text-[#007bff] dark:bg-[#ff0000]/20 dark:text-[#ff0000]' : 
                    'text-black dark:text-white hover:text-[#007bff] dark:hover:text-[#ff0000]'
                  }
                `}
              >
                {item.icon}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn btn-square btn-ghost md:hidden transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-[#007bff] dark:text-[#ff0000] transition-colors duration-300" 
                 fill="none" 
                 stroke="currentColor" 
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
            bg-white dark:bg-gray-900
            shadow-xl dark:shadow-2xl
            transition-all duration-300 transform
            md:hidden
            flex flex-col items-stretch
            z-50
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            {/* Add Close Button */}
            <button
              className="absolute top-4 right-4 p-2 text-[#007bff] dark:text-[#ff0000] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
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
                  className={({ isActive }) => `
                    px-8 py-4 text-lg font-medium
                    transition-all duration-300
                    ${isActive ? 
                      'bg-[#007bff]/10 text-[#007bff] dark:bg-[#ff0000]/10 dark:text-[#ff0000]' : 
                      'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-4rem)] bg-white dark:bg-black transition-colors duration-300">
        <div className="flex flex-col items-center gap-12 -mt-20">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-[#007bff] dark:text-[#ff0000] transition-colors duration-300">
              Transform Images to PDFs
            </h1>
            <p className="text-xl text-black dark:text-white transition-colors duration-300 opacity-80 max-w-2xl">
              Convert your images to high-quality PDF documents with just one click.
            </p>
          </div>

          <button
            className="btn bg-[#007bff] dark:bg-[#ff0000] hover:bg-[#0056b3] dark:hover:bg-[#cc0000] 
                       text-white btn-lg px-8 py-4 text-lg font-bold transition-all duration-300"
            onClick={() => navigate('/convert')}
          >
            START CONVERTING NOW
          </button>
        </div>
      </main>

      <button
        className="btn btn-circle btn-lg fixed bottom-8 right-8 
                   bg-[#007bff] dark:bg-[#ff0000] 
                   text-white shadow-xl 
                   transition-all duration-300 
                   hover:scale-110 hover:shadow-2xl"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {darkMode ? (
          <MdLightMode className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <MdDarkMode className="w-6 h-6 transition-transform duration-300" />
        )}
      </button>
    </div>
  )
}

export default HomePage