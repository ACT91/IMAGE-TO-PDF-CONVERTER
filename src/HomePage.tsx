import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
<<<<<<< HEAD
<<<<<<< HEAD
import type { Dispatch, SetStateAction } from 'react'
import { MdHome, MdSave, MdInfo, MdSettings, MdDarkMode, MdLightMode } from 'react-icons/md'
=======
import { MdHome, MdSave, MdInfo, MdSettings, MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from './ThemeProvider'
>>>>>>> recovery-branch
=======
import { MdHome, MdSave, MdInfo, MdSettings, MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from './ThemeProvider'
>>>>>>> recovery-branch

interface HomePageProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
<<<<<<< HEAD
<<<<<<< HEAD
  
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
=======
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
=======
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
>>>>>>> recovery-branch
            <span style={{ color: darkMode ? '#ff0000' : '#007bff' }}>
              IMAGE TO PDF
            </span>{" "}
            <span style={{ color: darkMode ? '#ffffff' : '#000000' }}>
<<<<<<< HEAD
>>>>>>> recovery-branch
=======
>>>>>>> recovery-branch
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
<<<<<<< HEAD
<<<<<<< HEAD
                className={({ isActive }) => `
                  btn btn-ghost btn-circle transition-all duration-300
                  ${isActive ? 
                    'bg-[#007bff]/20 text-[#007bff] dark:bg-[#ff0000]/20 dark:text-[#ff0000]' : 
                    'text-black dark:text-white hover:text-[#007bff] dark:hover:text-[#ff0000]'
                  }
                `}
=======
=======
>>>>>>> recovery-branch
                className="btn btn-ghost btn-circle"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? (darkMode ? 'rgba(255,0,0,0.2)' : 'rgba(0,123,255,0.2)') : 'transparent',
                  color: isActive 
                    ? (darkMode ? '#ff0000' : '#007bff')
                    : (darkMode ? '#ffffff' : '#000000')
                })}
<<<<<<< HEAD
>>>>>>> recovery-branch
=======
>>>>>>> recovery-branch
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
<<<<<<< HEAD
<<<<<<< HEAD
            <svg className="w-6 h-6 text-[#007bff] dark:text-[#ff0000] transition-colors duration-300" 
                 fill="none" 
                 stroke="currentColor" 
=======
            <svg className="w-6 h-6" 
                 fill="none" 
                 stroke={darkMode ? '#ff0000' : '#007bff'} 
>>>>>>> recovery-branch
=======
            <svg className="w-6 h-6" 
                 fill="none" 
                 stroke={darkMode ? '#ff0000' : '#007bff'} 
>>>>>>> recovery-branch
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
<<<<<<< HEAD
<<<<<<< HEAD
            bg-white dark:bg-gray-900
            shadow-xl dark:shadow-2xl
            transition-all duration-300 transform
=======
            shadow-xl
            transform
>>>>>>> recovery-branch
=======
            shadow-xl
            transform
>>>>>>> recovery-branch
            md:hidden
            flex flex-col items-stretch
            z-50
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
<<<<<<< HEAD
<<<<<<< HEAD
          `}>
            {/* Add Close Button */}
            <button
              className="absolute top-4 right-4 p-2 text-[#007bff] dark:text-[#ff0000] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
=======
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
=======
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
>>>>>>> recovery-branch
              style={{ 
                color: darkMode ? '#ff0000' : '#007bff',
                backgroundColor: darkMode ? 'rgba(75,85,99,0.2)' : 'rgba(243,244,246,0.7)'
              }}
<<<<<<< HEAD
>>>>>>> recovery-branch
=======
>>>>>>> recovery-branch
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
<<<<<<< HEAD
<<<<<<< HEAD
                  className={({ isActive }) => `
                    px-8 py-4 text-lg font-medium
                    transition-all duration-300
                    ${isActive ? 
                      'bg-[#007bff]/10 text-[#007bff] dark:bg-[#ff0000]/10 dark:text-[#ff0000]' : 
                      'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
=======
=======
>>>>>>> recovery-branch
                  className="px-8 py-4 text-lg font-medium"
                  style={({ isActive }) => ({
                    color: isActive 
                      ? (darkMode ? '#ff0000' : '#007bff')
                      : (darkMode ? '#ffffff' : '#000000'),
                    backgroundColor: isActive
                      ? (darkMode ? 'rgba(255,0,0,0.1)' : 'rgba(0,123,255,0.1)')
                      : 'transparent'
                  })}
<<<<<<< HEAD
>>>>>>> recovery-branch
=======
>>>>>>> recovery-branch
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </header>

<<<<<<< HEAD
<<<<<<< HEAD
      <main className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-4rem)] bg-white dark:bg-black transition-colors duration-300">
        <div className="flex flex-col items-center gap-12 -mt-20">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-[#007bff] dark:text-[#ff0000] transition-colors duration-300">
              Transform Images to PDFs
            </h1>
            <p className="text-xl text-black dark:text-white transition-colors duration-300 opacity-80 max-w-2xl">
=======
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
>>>>>>> recovery-branch
=======
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
>>>>>>> recovery-branch
              Convert your images to high-quality PDF documents with just one click.
            </p>
          </div>

          <button
<<<<<<< HEAD
<<<<<<< HEAD
            className="btn bg-[#007bff] dark:bg-[#ff0000] hover:bg-[#0056b3] dark:hover:bg-[#cc0000] 
                       text-white btn-lg px-8 py-4 text-lg font-bold transition-all duration-300"
=======
=======
>>>>>>> recovery-branch
            className="btn px-8 py-4 text-lg font-bold text-white"
            style={{ 
              backgroundColor: darkMode ? '#ff0000' : '#007bff',
              borderColor: darkMode ? '#cc0000' : '#0056b3'
            }}
<<<<<<< HEAD
>>>>>>> recovery-branch
=======
>>>>>>> recovery-branch
            onClick={() => navigate('/convert')}
          >
            START CONVERTING NOW
          </button>
        </div>
      </main>

      <button
<<<<<<< HEAD
<<<<<<< HEAD
        className="btn btn-circle btn-lg fixed bottom-8 right-8 
                   bg-[#007bff] dark:bg-[#ff0000] 
                   text-white shadow-xl 
                   transition-all duration-300 
                   hover:scale-110 hover:shadow-2xl"
=======
=======
>>>>>>> recovery-branch
        className="btn btn-circle btn-lg fixed bottom-17 right-8 text-white shadow-xl"
        style={{ 
          backgroundColor: darkMode ? '#ff0000' : '#007bff'
        }}
<<<<<<< HEAD
>>>>>>> recovery-branch
=======
>>>>>>> recovery-branch
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {darkMode ? (
<<<<<<< HEAD
<<<<<<< HEAD
          <MdLightMode className="w-6 h-6 transition-transform duration-300" />
=======
=======
>>>>>>> recovery-branch
          <MdLightMode className="w-6 h-6" />
>>>>>>> recovery-branch
        ) : (
          <MdDarkMode className="w-6 h-6 transition-transform duration-300" />
        )}
      </button>
    </div>
  )
}

export default HomePage