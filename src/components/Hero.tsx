import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

/**
 * Hero 首屏个人介绍：
 * 左侧（60%）：Hello 标签 -> 深色大标题 -> 蓝色渐变副标题 -> 自我介绍 -> 双按钮
 * 右侧（40%）：极简毛玻璃气泡装饰，填补右侧空白（无 </> 色块、无任何 <img>）
 * 首屏高度 min-h-[85vh]，内容垂直居中，向下轻滚即可看到「关于我」
 */

// 统一的「向上淡入」动画变体，各元素配合不同 delay 交错入场
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

function Hero() {
  return (
    // 首屏容器：min-h-[85vh] 占 85% 视口高度；flex + items-center 垂直居中；
    // pt-28/md:pt-32（112/128px）为顶部悬浮胶囊导航留出充足安全区，避免任何遮挡
    <section id="home" className="relative flex min-h-[85vh] items-center overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16">
      {/* 内容栅格：移动端单列；md 及以上左右分栏，比例 3:2（左 60% 右 40%） */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-[3fr_2fr] md:gap-12">
        {/* ========== 左侧：文字介绍区 ========== */}
        <div>
          {/* Hello 小标签：浅色圆角胶囊 */}
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-1.5 text-sm text-slate-600 shadow-sm"
          >
            ✨ HELLO / 你好
          </motion.span>

          {/* 大标题：深色加粗极大字号，浅色背景上清晰醒目 */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl"
          >
            Hi, 我是李博雅
          </motion.h1>

          {/* 副标题：蓝色渐变文字高光（bg-clip-text + text-transparent） */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 bg-gradient-to-r from-[#678EC9] to-[#262277] bg-clip-text text-2xl font-semibold text-transparent md:text-3xl"
          >
            数字经济专业大学生
          </motion.p>

          {/* 自我介绍：次级灰色，弱化层级 */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-4 max-w-md leading-relaxed text-slate-500"
          >
            欢迎来到我的个人作品集，这里记录着我在数字经济与前端开发方向上的学习成果与项目实践。
          </motion.p>

          {/* 按钮组：主按钮品牌渐变（小面积应用），次按钮白底描边 */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {/* 主按钮「查看作品」：品牌渐变胶囊，悬浮轻微放大 */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#678EC9]/30 transition-transform duration-300 hover:scale-105"
            >
              查看作品
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* 次按钮「联系我」：白底 + 浅灰描边，悬浮时描边变为品牌蓝 */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-[#678EC9] hover:text-[#262277]"
            >
              联系我
              <Mail className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* ========== 右侧：极简毛玻璃气泡装饰（移动端隐藏，桌面端展示） ========== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative hidden h-[380px] md:block"
        >
          {/* 大气泡：右上，淡粉渐变玻璃质感，缓慢上下漂浮 */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-8 top-4 h-56 w-56 rounded-full border border-white/90 bg-gradient-to-br from-[#FFCEE3]/70 to-[#678EC9]/35 shadow-xl shadow-[#678EC9]/15 backdrop-blur-md"
          />
          {/* 中气泡：左下，淡蓝渐变，错峰反向漂浮 */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="absolute bottom-8 left-6 h-32 w-32 rounded-full border border-white/90 bg-gradient-to-br from-white/80 to-[#678EC9]/40 shadow-lg shadow-[#678EC9]/10 backdrop-blur-md"
          />
          {/* 小气泡：中间点缀 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-24 right-24 h-16 w-16 rounded-full border border-white/90 bg-white/70 shadow-md backdrop-blur-md"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
