import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './HomePage';
import ConvertPage from '../pages/Converter/ConvertPage';

const App = () => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/convert" element={<ConvertPage />} />
    </Routes>
  );
};

export default App;
