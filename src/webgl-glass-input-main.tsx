import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { WebGLGlassInputDemo } from './pages/WebGLGlassInputDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebGLGlassInputDemo />
  </StrictMode>,
)
