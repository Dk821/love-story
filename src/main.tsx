import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
// Poppins is loaded from src/assets/fonts (see the @font-face rules in global.css)
import './styles/global.css'
import './styles/sections.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Reduced motion: slides, zooms and parallax become gentle fades. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
)
