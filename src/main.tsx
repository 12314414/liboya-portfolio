import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter 包裹整个应用，启用前端路由 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
