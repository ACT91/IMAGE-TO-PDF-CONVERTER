import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ConvertPage from '../pages/Converter/ConvertPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/convert" element={<ConvertPage />} />
    </Routes>
  );
};

export default App;