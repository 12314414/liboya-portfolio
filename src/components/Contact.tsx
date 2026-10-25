import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

/**
 * Contact 联系方式 & Footer：
 * 居中渐变标题 + Github / 邮箱图标链接 + 底部版权信息。
 */

// GitHub 图标：新版 lucide-react 已移除品牌图标，这里使用内联 SVG 实现
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.2-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

// 联系方式数据：新增渠道时直接在此数组追加对象即可（邮箱地址请替换成自己的）
const contactLinks = [
  {
    name: 'GitHub',
    href: '#', // TODO: 替换为你的 GitHub 主页地址
    icon: GithubIcon,
  },
  {
    name: '邮箱',
    href: 'mailto:your-email@example.com', // TODO: 替换为你的邮箱地址
    icon: Mail,
  },
]

function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 pt-24">
      {/* ===== 联系方式主体区 ===== */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* 居中大标题：蓝紫渐变文字 */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#678EC9] to-[#262277] bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
        >
          Let's Connect
        </motion.h2>

        {/* 引导文案 */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-4 max-w-md leading-relaxed text-slate-500"
        >
          无论是课程交流、项目合作，还是任何想法，都欢迎随时联系我。
        </motion.p>

        {/* 图标链接组：毛玻璃圆形按钮，悬浮上浮并加深阴影，依次交错入场 */}
        <div className="mt-10 flex items-center justify-center gap-6">
          {contactLinks.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
              whileHover={{ y: -5 }}
              // 毛玻璃圆形按钮 + 悬浮品牌色阴影
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/40 text-slate-600 shadow-sm backdrop-blur-md transition-colors hover:border-[#678EC9]/50 hover:text-[#262277] hover:shadow-xl hover:shadow-[#678EC9]/25"
            >
              <item.icon className="h-7 w-7" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* ===== Footer：顶部白色细边分隔的毛玻璃底栏 ===== */}
      <footer className="mt-20 border-t border-white/50 bg-white/40 backdrop-blur-md">
        <p className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-slate-500">
          {/* 年份自动取当前年份，无需每年手动修改 */}
          © {new Date().getFullYear()} 李博雅. 保留所有权利。
        </p>
      </footer>
    </section>
  )
}

export default Contact
