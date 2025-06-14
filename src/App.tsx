import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SavedPage from "./SavedPage";
import ConvertPage from '../pages/Converter/ConvertPage';
import { useTheme } from '../scripts/ThemeProvider';
import About from '../pages/About App/About';

const App = () => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/convert" element={<ConvertPage darkMode={darkMode} />} />
      <Route path="/about" element={<About />} />
      <Route path="/settings" element={<div>Settings Page</div>} />
      <Route path="/saved" element={<SavedPage />} />
    </Routes>
  );
};

export default App;
