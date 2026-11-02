import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data/projects'

/**
 * Projects 项目作品展示：
 * - 数据全部来自 data/projects.ts，通过 .map() 遍历渲染（数据与视图解耦）
 * - 响应式网格：移动端单列，md 双列，lg 三列；
 * - 卡片为毛玻璃风格，悬浮时微微上浮并加深阴影
 */
function Projects() {
  // 3 个项目固定三列布局（移动端单列）
  const gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    // scroll-mt-28：锚点跳转时为悬浮胶囊导航预留顶部空间，避免标题被遮挡
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      {/* ===== 模块标题区 ===== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">我的作品</h2>
        {/* 标题下方的品牌渐变装饰条（小面积应用） */}
        <div className="mt-3 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277]" />
        <p className="mt-4 text-slate-500">一些课程作业与个人项目实践</p>
      </motion.div>

      {/* ===== 项目卡片网格 ===== */}
      <div className={`mt-12 grid gap-8 ${gridClass}`}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* 更多项目提示：仅一行不起眼的小字，不占用额外空间 */}
      <p className="mt-8 text-center text-sm text-slate-400">更多项目正在开发中...</p>
    </section>
  )
}

/**
 * 单个项目卡片：渐变占位头图 + 名称 / 描述 / 技术栈标签 / 链接
 * - 内部路由（link 以 / 开头）使用 react-router-dom 的 Link
 * - 外部链接（demo / link 以 http 开头）使用原生 a 标签 + target="_blank"
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  // 判断是否为内部路由跳转
  const isInternalRoute = project.link.startsWith('/')

  return (
    // 毛玻璃卡片主体；whileHover 上浮 5px，配合阴影加深实现悬浮效果
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/40 shadow-sm backdrop-blur-md transition-shadow duration-300 hover:shadow-xl hover:shadow-[#678EC9]/20"
    >
      {/* 卡片头图：h-60 与封面图 2.1:1 的比例匹配，完整展示截图内容；无封面时用品牌渐变占位 */}
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFCEE3] via-[#678EC9] to-[#262277]">
        {project.cover ? (
          // 封面图按裁剪比例填充（object-cover），保证不留白
          <img
            src={project.cover}
            alt={`${project.title} 项目预览`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            {/* 装饰性柔光圆 */}
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-xl" />
            <div className="absolute -bottom-10 -right-6 h-36 w-36 rounded-full bg-white/10 blur-xl" />
            {/* 头图中央装饰：白色半透明代码符号 */}
            <span className="select-none text-5xl font-bold text-white/80">{'</>'}</span>
          </>
        )}
      </div>

      {/* 卡片内容区 */}
      <div className="flex flex-1 flex-col p-6">
        {/* 项目名称 */}
        <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>

        {/* 项目描述：最多显示 3 行，超出省略 */}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
          {project.description}
        </p>

        {/* 技术栈标签：圆角胶囊 + 淡渐变底色 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gradient-to-r from-[#678EC9]/15 to-[#262277]/10 px-3 py-1 text-xs font-medium text-[#262277]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 链接区：根据 link 类型智能选择跳转方式 */}
        <div className="mt-auto flex items-center gap-4 pt-6">
          {isInternalRoute ? (
            // 内部路由：使用 Link 组件，SPA 无刷新跳转
            <Link
              to={project.link}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#678EC9] to-[#262277] bg-clip-text text-sm font-semibold text-transparent transition-opacity hover:opacity-75"
            >
              <ExternalLink className="h-4 w-4 text-[#678EC9]" />
              进入体验
            </Link>
          ) : project.demo ? (
            // 有在线预览地址则跳转外部 demo
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#678EC9] to-[#262277] bg-clip-text text-sm font-semibold text-transparent transition-opacity hover:opacity-75"
            >
              <ExternalLink className="h-4 w-4 text-[#678EC9]" />
              在线预览
            </a>
          ) : (
            // 无可用链接时显示占位
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400">
              <ExternalLink className="h-4 w-4" />
              敬请期待
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default Projects
