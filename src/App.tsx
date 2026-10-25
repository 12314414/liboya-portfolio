import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

/**
 * App 核心组装：
 * 页面整体使用极淡的粉白蓝渐变背景，营造轻盈通透的气泡感氛围
 */
function App() {
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

export default App
