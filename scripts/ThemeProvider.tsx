import React, { useEffect, useState, createContext, useContext } from 'react';

// Theme context type
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use theme
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always initialize with light theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Force light theme on first load
  useEffect(() => {
    // Force light theme initially
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Then check localStorage
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setTheme('dark');
    }
  }, []);

  // Update document attributes and localStorage when theme changes
 useEffect(() => {
  console.log('Theme changed to:', theme);

  // Update HTML attributes
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Save preference
  localStorage.setItem('theme', theme);

  // Update body background
  document.body.classList.remove('bg-white', 'dark:bg-black');
  document.body.classList.add(theme === 'dark' ? 'bg-black' : 'bg-white');

  // 🔄 Update favicon dynamically
  const favicon = document.getElementById('web-icon') as HTMLLinkElement | null;
  if (favicon) {
    favicon.href = theme === 'dark' ? '/red-icon.svg' : '/blue-icon.svg';
  }
}, [theme]);

  // Theme toggler function for context consumers
  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Switching to:', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

