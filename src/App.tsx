import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Interview from './pages/Interview'

/**
 * 首页 Layout 组件：
 * 作品集首页，按 PRD 顺序组装各模块
 */
function HomeLayout() {
  return (
    // 全局背景：极淡的粉白蓝渐变，干净清透；品牌渐变仅用于按钮 / 文字高光 / 小标签
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 text-slate-800 antialiased">
      {/* 顶部导航栏（固定定位） */}
      <Header />

      {/* 页面主体：各模块按 PRD 顺序组装 */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

/**
 * App 核心组装：
 * 使用 React Router 管理多页面跳转
 * - / ：作品集首页
 * - /interview ：AI 简历面试官独立页面
 */
function App() {
  return (
    <Routes>
      {/* 首页路由 */}
      <Route path="/" element={<HomeLayout />} />
      {/* AI 简历面试官独立页面路由 */}
      <Route path="/interview" element={<Interview />} />
    </Routes>
  )
}

export default App
