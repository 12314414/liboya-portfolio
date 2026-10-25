import { motion } from 'framer-motion'
import { GraduationCap, Compass } from 'lucide-react'
import { skills } from '../data/skills'

/**
 * About 关于我 & 技能：
 * 左栏为文字介绍（教育背景 + 学习方向），右栏为技能标签云。
 * 技能数据全部来自 data/skills.ts，通过 .map() 遍历渲染（数据与视图解耦）。
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

      {/* ===== 左右两栏布局：移动端堆叠，md 及以上并排 ===== */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* ---------- 左栏：文字介绍（从左侧滑入） ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          // 毛玻璃卡片：半透明白底 + 白色细边框 + 背景模糊 + 轻阴影
          className="flex flex-col gap-8 rounded-2xl border border-white/50 bg-white/40 p-8 shadow-sm backdrop-blur-md"
        >
          {/* 教育背景（文案可直接在此修改） */}
          <div className="flex gap-4">
            {/* 图标底托：品牌渐变圆角方块 */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCEE3] via-[#678EC9] to-[#262277] shadow-lg shadow-[#678EC9]/30">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">教育背景</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                数字经济专业本科在读，主修经济学原理、数据分析、数字贸易等课程，具备经济学与信息技术交叉的复合视角。
              </p>
            </div>
          </div>

          {/* 学习方向（文案可直接在此修改） */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFCEE3] via-[#678EC9] to-[#262277] shadow-lg shadow-[#678EC9]/30">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">学习方向</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                目前专注于前端开发（React / TypeScript / Tailwind CSS），同时在探索
                Python 数据分析与 AI 应用开发，希望用技术把专业知识变成真正好用的产品。
              </p>
            </div>
          </div>
        </motion.div>

        {/* ---------- 右栏：技能标签云（从右侧滑入） ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/50 bg-white/40 p-8 shadow-sm backdrop-blur-md"
        >
          <h3 className="text-lg font-bold text-slate-900">技能标签</h3>

          {/* 标签云：圆角胶囊 + 渐变底色；每隔两个使用实心渐变高亮，营造云的层次感 */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
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
        </motion.div>
      </div>
    </section>
  )
}

export default About
