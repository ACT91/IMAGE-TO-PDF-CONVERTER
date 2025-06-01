import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './HomePage';
import SavedPage from "./SavedPage";
import ConvertPage from '../pages/Converter/ConvertPage';
import { useTheme } from '../scripts/ThemeProvider';
import About from '../pages/About App/About';
// 定义一个名为App的函数组件
const App = () => {
  // 使用useTheme钩子获取主题
  const { theme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/convert" element={<ConvertPage darkMode={darkMode} />} />
      <Route path="/about" element={<About />} />
      <Route path ="/settings" element={<div>Settings Page</div>} />
      <Route path="/saved" element={<SavedPage />} />
    </Routes>
  );
};

export default App;
