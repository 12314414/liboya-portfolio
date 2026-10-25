/**
 * Header 胶囊状悬浮导航栏：
 * 固定于屏幕顶部，圆角胶囊 + 毛玻璃质感；锚点链接配合 html 的 scroll-smooth 实现平滑滚动
 */
function Header() {
  return (
    // 固定悬浮：距顶部 1rem，水平居中
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      {/* 胶囊导航：浅色毛玻璃 + 细边框 + 大圆角 */}
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-6 rounded-full border border-slate-200/70 bg-white/70 px-6 shadow-lg shadow-slate-900/5 backdrop-blur-md">
        {/* 左侧 Logo（纯文字） */}
        <a href="#home" className="shrink-0 text-sm font-bold tracking-widest text-slate-900">
          MY PORTFOLIO
        </a>

        {/* 中间导航链接：锚点跳转 + 平滑滚动（小屏隐藏） */}
        <div className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
          <a href="#about" className="transition-colors hover:text-[#262277]">
            关于我
          </a>
          <a href="#projects" className="transition-colors hover:text-[#262277]">
            项目作品
          </a>
          <a href="#contact" className="transition-colors hover:text-[#262277]">
            联系我
          </a>
        </div>

        {/* 右侧：品牌渐变胶囊「下载简历」按钮（渐变小面积应用） */}
        <a
          href="#"
          className="shrink-0 rounded-full bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277] px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          下载简历
        </a>
      </nav>
    </header>
  )
}

export default Header
