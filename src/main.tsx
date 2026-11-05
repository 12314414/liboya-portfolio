import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

/**
 * 路由基路径：GitHub Pages 把站点挂在 /liboya-portfolio/ 子路径下，
 * 浏览器上报的 pathname 会带这个前缀，必须交给 Router 剥离，否则匹配不到路由。
 * - 生产环境 BASE_URL = '/liboya-portfolio/' → 去掉结尾斜杠
 * - 开发环境 BASE_URL = '/' → 直接用根路径
 */
const baseUrl = import.meta.env.BASE_URL
const routerBasename = baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter 包裹整个应用，启用前端路由 */}
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
