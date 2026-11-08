import { motion } from 'framer-motion'
import { GraduationCap, Compass, Camera, Code2, Trophy } from 'lucide-react'
import { skills } from '../data/skills'
import { awards } from '../data/awards'

/**
 * 三个文字信息模块（图标 + 标题 + 正文）
 * 文案集中在此处，后续替换真实内容只需修改 content 字段。
 * 技能标签卡片作为第四格直接在下方 JSX 中渲染。
 */
const aboutModules = [
  {
    icon: GraduationCap,
    title: '教育背景',
    content:
      '数字经济专业本科在读，主修经济学原理、数据分析、数字贸易等课程，具备经济学与信息技术交叉的复合视角。专业绩点：3.334/5。',
  },
  {
    icon: Compass,
    title: '学习方向',
    content:
      '目前专注于前端开发（React / TypeScript / Tailwind CSS），同时在探索 Python 数据分析与 AI 应用开发，希望用技术把专业知识变成真正好用的产品。',
  },
  {
    icon: Camera,
    title: '兴趣爱好',
    content:
      '热爱摄影与旅行，擅长用镜头记录城市与校园的细节；日常也喜欢阅读商业与科技类书籍，关注产品背后的商业逻辑。',
  },
]

/** 单个信息卡片：图标 + 标题 + 正文，带依次淡入与悬浮上浮动画 */
function InfoCard({ module, index }: { module: (typeof aboutModules)[number]; index: number }) {
  const { icon: Icon, title, content } = module
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      // 依次淡入，营造从左到右的阅读节奏
      transition={{ duration: 0.5, delay: index * 0.08 }}
      // 悬浮时卡片轻微上浮并加深阴影
      whileHover={{ y: -5 }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-white/50 bg-white/40 p-8 shadow-sm backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-[#678EC9]/20"
    >
      {/* 图标 + 标题：图标底托使用品牌渐变小面积强调 */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCEE3] via-[#678EC9] to-[#262277] shadow-lg shadow-[#678EC9]/30">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-slate-500">{content}</p>
    </motion.article>
  )
}

/**
 * About 关于我 & 技能：
 * 2×2 毛玻璃卡片网格 —— 教育背景 / 学习方向 / 技能标签 / 兴趣爱好。
 * 技能数据来自 data/skills.ts，通过 .map() 遍历渲染。
 */
function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      {/* ===== 模块标题区（与 Projects 模块风格统一） ===== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">关于我</h2>
        {/* 标题下方的品牌渐变装饰条（小面积应用） */}
        <div className="mt-3 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277]" />
      </motion.div>

      {/* ===== 四张卡片：移动端单列，md 及以上 2×2 网格 ===== */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 第一行：教育背景 / 学习方向 */}
        <InfoCard module={aboutModules[0]} index={0} />
        <InfoCard module={aboutModules[1]} index={1} />

        {/* 第二行左侧：技能标签卡片（占据原校园经历的位置） */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.16 }}
          whileHover={{ y: -5 }}
          className="flex h-full flex-col gap-4 rounded-2xl border border-white/50 bg-white/40 p-8 shadow-sm backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-[#678EC9]/20"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCEE3] via-[#678EC9] to-[#262277] shadow-lg shadow-[#678EC9]/30">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">技能标签</h3>
          </div>

          {/* 标签云：圆角胶囊 + 渐变底色；每隔两个使用实心渐变高亮，营造云的层次感 */}
          <div className="flex flex-wrap items-center gap-2.5">
            {skills.map((skill, index) => {
              // 第 1、4、7... 个标签使用实心品牌渐变高亮，其余使用浅渐变
              const isHighlight = index % 3 === 0
              return (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className={
                    isHighlight
                      ? // 高亮标签：实心品牌渐变 + 白字 + 柔和投影
                        'rounded-full bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277] px-4 py-1.5 text-sm font-medium text-white shadow-md shadow-[#678EC9]/30'
                      : // 普通标签：浅渐变底 + 深紫蓝文字
                        'rounded-full bg-gradient-to-r from-[#678EC9]/15 to-[#262277]/10 px-4 py-1.5 text-sm font-medium text-[#262277]'
                  }
                >
                  {skill}
                </motion.span>
              )
            })}
          </div>
        </motion.article>

        {/* 第二行右侧：兴趣爱好 */}
        <InfoCard module={aboutModules[2]} index={3} />
      </div>

      {/* ===== 荣誉与奖项：横跨整行的毛玻璃区块，移动端可横向滑动 ===== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className="mt-6 rounded-2xl border border-white/50 bg-white/40 p-8 shadow-sm backdrop-blur-md"
      >
        <h3 className="text-lg font-bold text-slate-900">荣誉与奖项</h3>

        {/* 移动端：横向滚动；md 及以上：紧凑网格 */}
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {awards.map((award, index) => (
            <motion.div
              key={award}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="flex shrink-0 items-center gap-3 rounded-xl border border-white/60 bg-white/50 px-4 py-3 shadow-sm"
            >
              <Trophy className="h-5 w-5 shrink-0 text-[#678EC9]" />
              <span className="text-sm font-medium text-slate-800">{award}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default About
