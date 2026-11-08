import { motion } from 'framer-motion'
import { ExternalLink, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data/projects'

/**
 * Projects 项目作品展示：
 * - 数据全部来自 data/projects.ts，通过 .map() 遍历渲染（数据与视图解耦）
 * - 响应式网格：移动端单列，md 及以上双列（4 个项目 = 2×2）
 * - 卡片为毛玻璃风格，悬浮时微微上浮并加深阴影
 */
function Projects() {
  // 4 个项目：电脑端 2×2 排列，平板同为两列，移动端单列
  const gridClass = 'grid-cols-1 md:grid-cols-2'

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
      {/* 卡片头图：数据分析项目渲染迷你折线图，其余项目用封面图或渐变占位 */}
      <div className="relative h-60 overflow-hidden">
        {project.chart ? (
          <MiniChart chart={project.chart} />
        ) : (
          // 头图：h-60 与封面图 2.1:1 的比例匹配；无封面时用品牌渐变占位
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#FFCEE3] via-[#678EC9] to-[#262277]">
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

        {/* 业务价值 / 产品思考：浅蓝圆角小框，灯泡图标引导阅读 */}
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#3B3486]" />
          <p className="text-sm leading-relaxed text-slate-600">{project.businessValue}</p>
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

type ChartSpec = NonNullable<Project['chart']>

/**
 * MiniChart 迷你折线图：
 * - 纯前端 SVG 手写绘制，不引入图表库，避免增大打包体积
 * - 折线与面积填充使用站点主题蓝紫渐变（#678EC9 → #262277）
 */
function MiniChart({ chart }: { chart: ChartSpec }) {
  const width = 380 // SVG 逻辑宽度（实际通过 viewBox 自适应缩放）
  const height = 112
  const padX = 16 // 左右内边距，防止首尾数据点贴边
  const padTop = 12
  const padBottom = 22 // 底部留给月份标签

  const values = chart.points.map((point) => point.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const span = maxValue - minValue || 1

  // 上下各留 8% 余量，避免数据点压在参考线或边框上
  const scaleY = (value: number) =>
    padTop +
    (1 - (value - minValue + span * 0.08) / (span * 1.16)) * (height - padTop - padBottom)
  const stepX = (width - padX * 2) / (chart.points.length - 1)
  const scaleX = (index: number) => padX + index * stepX

  const linePoints = chart.points.map((point, index) => `${scaleX(index)},${scaleY(point.value)}`)
  // 面积路径：折线起点 → 折线各点 → 右下角 → 左下角闭合
  const areaPath = `M ${padX},${height - padBottom} L ${linePoints.join(' L ')} L ${
    scaleX(chart.points.length - 1)
  },${height - padBottom} Z`

  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-br from-white/90 via-white/70 to-blue-50 p-5">
      {/* 图表标题 + 数据洞察小徽章 */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[#3B3486]">{chart.label}</span>
        <span className="shrink-0 rounded-full bg-[#3B3486]/10 px-2 py-0.5 text-[10px] font-medium text-[#3B3486]">
          数据洞察
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label={chart.label}>
        <defs>
          {/* 折线颜色：左浅右深，呼应站点主题渐变 */}
          <linearGradient id="projectChartStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#678EC9" />
            <stop offset="100%" stopColor="#262277" />
          </linearGradient>
          {/* 折线下方面积：由浅蓝紫渐隐到透明 */}
          <linearGradient id="projectChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#678EC9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#262277" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#projectChartFill)" />
        <polyline
          points={linePoints.join(' ')}
          fill="none"
          stroke="url(#projectChartStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 数据点 + 月份标签 */}
        {chart.points.map((point, index) => (
          <g key={point.name}>
            <circle
              cx={scaleX(index)}
              cy={scaleY(point.value)}
              r="3"
              fill="#ffffff"
              stroke="#262277"
              strokeWidth="1.5"
            />
            <text
              x={scaleX(index)}
              y={height - 6}
              textAnchor="middle"
              fontSize="10"
              fill="#64748b"
            >
              {point.name}
            </text>
          </g>
        ))}
      </svg>

      {/* 数据来源说明 */}
      <p className="text-[10px] text-slate-500">{chart.note}</p>
    </div>
  )
}
