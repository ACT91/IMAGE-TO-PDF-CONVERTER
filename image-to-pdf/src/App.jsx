import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="animation-wrapper">
        <div className="image-icon">🖼️</div>
        <div className="arrow">➡️</div>
        <div className="pdf-icon">📄</div>
      </div>
      <button
        className="convert-btn"
        onClick={() => navigate('/convert')}
      >
        CONVERT IMAGE TO PDF
      </button>
    </div>
  )
}

export default App
