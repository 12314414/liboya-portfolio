import { motion } from 'framer-motion'
import { Code, ExternalLink } from 'lucide-react'
import { projects, type Project } from '../data/projects'

/**
 * Projects 项目作品展示：
 * - 数据全部来自 data/projects.ts，通过 .map() 遍历渲染（数据与视图解耦）
 * - 响应式网格：移动端单列，md 双列，lg 三列；
 *   只有 1 个项目时改为宽度适中的单卡居中展示
 * - 卡片为毛玻璃风格，悬浮时微微上浮并加深阴影
 */
function Projects() {
  // 仅 1 个项目时单卡居中（限制最大宽度），2 个及以上时按响应式网格排列
  const gridClass =
    projects.length === 1
      ? 'mx-auto max-w-lg grid-cols-1'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

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
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      {/* 卡片头图：品牌三色渐变占位色块（不使用真实截图），内部用柔光圆形做装饰 */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFCEE3] via-[#678EC9] to-[#262277]">
        {/* 装饰性柔光圆 */}
        <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-xl" />
        <div className="absolute -bottom-10 -right-6 h-36 w-36 rounded-full bg-white/10 blur-xl" />
        {/* 头图中央装饰：白色半透明代码符号 */}
        <span className="select-none text-5xl font-bold text-white/80">{'</>'}</span>
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

        {/* 链接区：查看源码 + 在线预览（有 demo 地址时才显示），mt-auto 保证对齐卡片底部 */}
        <div className="mt-auto flex items-center gap-4 pt-6">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-[#262277]"
          >
            <Code className="h-4 w-4" />
            查看源码
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              // 在线预览链接使用蓝紫渐变文字，突出可点击
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#678EC9] to-[#262277] bg-clip-text text-sm font-semibold text-transparent transition-opacity hover:opacity-75"
            >
              <ExternalLink className="h-4 w-4 text-[#678EC9]" />
              在线预览
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default Projects
