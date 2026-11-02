import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// 读取 Vite base 路径并归一化：适配 GitHub Pages / EdgeOne Pages 等子路径部署
// BrowserRouter 的 basename 要求以 '/' 开头、不带结尾 '/'
const _raw = import.meta.env.BASE_URL || '/'
const routerBasename = _raw === './' || _raw === '/' ? '/' : _raw.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter：用 basename 适配子路径部署场景 */}
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
