import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { GlassInputDemo } from './pages/GlassInputDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlassInputDemo />
  </StrictMode>,
)
