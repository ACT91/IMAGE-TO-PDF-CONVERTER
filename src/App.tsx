import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './HomePage';
import ConvertPage from '../pages/Converter/ConvertPage';
// Make sure 'index.css' exists in the same folder as 'App.tsx' or update the path accordingly
  


const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <Routes>
      <Route path="/" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
      <Route path="/convert" element={<ConvertPage darkMode={darkMode} />} />
    </Routes>
  );
};

export default App;