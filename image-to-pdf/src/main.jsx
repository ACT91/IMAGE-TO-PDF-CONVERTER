import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import ConvertPage from '../pages/Converter/ConvertPage'
import './HomePage.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/convert" element={<ConvertPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
