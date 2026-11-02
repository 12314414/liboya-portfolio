import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sparkles, Loader2, AlertCircle, FileText, MessageSquareText } from 'lucide-react'
import { callQwenInterview, type InterviewResult } from '../api'
import {
  positionCategories,
  DEFAULT_CATEGORY_ID,
  getPositionsByCategory,
  getCategoryById,
} from '../data/positions'

/**
 * Interview - AI 简历面试官独立页面
 *
 * 布局结构：
 * 1. 顶部导航栏（返回首页按钮）
 * 2. 表单区域（个人经历 textarea + 专业大类 select + 细分岗位 select + 渐变色提交按钮）
 *    - 专业大类 → 细分岗位 两级联动
 * 3. 结果展示区域（左右毛玻璃卡片：简历建议 / 面试问题）
 */
function Interview() {
  // ============ 表单状态 ============
  const [experience, setExperience] = useState('')

  // 两级联动状态：先选大类，再选细分岗位
  const [categoryId, setCategoryId] = useState<string>(DEFAULT_CATEGORY_ID)
  const [position, setPosition] = useState<string>('')

  // ============ 请求状态 ============
  const [isLoading, setIsLoading] = useState(false) // 按钮 loading 状态
  const [result, setResult] = useState<InterviewResult | null>(null) // AI 返回结果
  const [errorMsg, setErrorMsg] = useState<string | null>(null) // 错误提示

  // ============ 联动逻辑 ============

  /** 当前大类下可用的细分岗位列表（useMemo 缓存，categoryId 变化时才重算） */
  const availablePositions = useMemo(
    () => getPositionsByCategory(categoryId),
    [categoryId],
  )

  /** 当前选中大类的显示名称（用于 Prompt 拼接） */
  const categoryName = useMemo(
    () => getCategoryById(categoryId)?.name ?? '',
    [categoryId],
  )

  /** 大类切换时，自动重置细分岗位为该大类下的第一个选项 */
  useEffect(() => {
    if (availablePositions.length > 0) {
      setPosition(availablePositions[0])
    } else {
      setPosition('')
    }
  }, [availablePositions])

  /**
   * 处理表单提交：校验 → 调用 API → 更新状态
   */
  const handleSubmit = async () => {
    // 1. 基础校验
    if (!experience.trim()) {
      setErrorMsg('请先填写你的个人经历或简历内容')
      return
    }
    if (!categoryId || !position) {
      setErrorMsg('请完整选择专业大类和目标岗位')
      return
    }

    // 2. 重置错误提示，进入 loading
    setErrorMsg(null)
    setIsLoading(true)

    try {
      // 3. 调用 AI API：传入大类名称 + 细分岗位（组合后送入 Prompt）
      const data = await callQwenInterview(experience.trim(), categoryName, position)
      setResult(data)
    } catch (err) {
      // 4. 捕获错误，展示友好提示
      const message = err instanceof Error ? err.message : '请求失败，请稍后重试'
      setErrorMsg(message)
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // 全局背景：与首页保持一致的粉白蓝渐变
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 text-slate-800 antialiased">
      {/* ============ 顶部导航栏 ============ */}
      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* 返回首页按钮：使用 react-router-dom 的 Link，避免整页刷新 */}
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#262277]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            返回首页
          </Link>

          {/* 页面品牌 Tag */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FFCEE3]/50 via-[#678EC9]/30 to-[#262277]/20 px-3 py-1 text-xs font-medium text-[#262277]">
            <Sparkles className="h-3 w-3" />
            AI 简历面试官
          </div>
        </div>
      </nav>

      {/* ============ 主体区域 ============ */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* ===== 页面标题区 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            AI 简历
            {/* 品牌渐变文字高光 */}
            <span className="bg-gradient-to-r from-[#678EC9] to-[#262277] bg-clip-text text-transparent">
              面试官
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-slate-500">
            输入你的个人经历，选择目标岗位，AI 将为你生成定制化简历建议并模拟面试。
          </p>
        </motion.div>

        {/* ===== 表单区域：毛玻璃卡片包裹 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 rounded-2xl border border-white/50 bg-white/40 p-8 shadow-sm backdrop-blur-md"
        >
          {/* 个人经历输入区 */}
          <div className="space-y-2">
            <label
              htmlFor="experience"
              className="block text-sm font-semibold text-slate-700"
            >
              你的个人经历或当前简历内容
            </label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              rows={6}
              disabled={isLoading}
              placeholder="例如：我是数字经济专业大三学生，会一点 Python 和数据分析...\n\n可包含：教育背景、实习经历、项目经验、技能特长等"
              className="w-full resize-none rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-inner backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-[#678EC9]/50 focus:outline-none focus:ring-2 focus:ring-[#678EC9]/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* ===== 两级联动岗位选择区 ===== */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* 第一级：专业大类 */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-slate-700"
              >
                专业大类
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={isLoading}
                className="w-full cursor-pointer rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-700 shadow-inner backdrop-blur-sm transition-all focus:border-[#678EC9]/50 focus:outline-none focus:ring-2 focus:ring-[#678EC9]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {positionCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 第二级：细分岗位（联动自第一级） */}
            <div className="space-y-2">
              <label
                htmlFor="position"
                className="block text-sm font-semibold text-slate-700"
              >
                目标细分岗位
              </label>
              <select
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                disabled={isLoading || availablePositions.length === 0}
                className="w-full cursor-pointer rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-slate-700 shadow-inner backdrop-blur-sm transition-all focus:border-[#678EC9]/50 focus:outline-none focus:ring-2 focus:ring-[#678EC9]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {availablePositions.length > 0 ? (
                  availablePositions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))
                ) : (
                  // 无选项时显示占位
                  <option value="">暂无细分岗位</option>
                )}
              </select>
            </div>
          </div>

          {/* 错误提示 */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50/80 p-3 text-sm text-red-600 backdrop-blur-sm"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 渐变色提交按钮 */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#262277]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#262277]/30 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:brightness-100"
          >
            {isLoading ? (
              // Loading 状态：显示旋转图标 + 禁用点击
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                AI 正在深度分析中...
              </>
            ) : (
              // 默认状态：Sparkles 图标 + 文案
              <>
                <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                开始 AI 模拟面试
              </>
            )}
          </button>
        </motion.div>

        {/* ===== 结果展示区域 ===== */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              // 左右卡片布局：手机端上下排列
              className="mt-10 grid gap-6 md:grid-cols-2"
            >
              {/* ----- 左侧卡片：简历修改建议 ----- */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-white/50 bg-white/40 p-6 shadow-sm backdrop-blur-md"
              >
                {/* 卡片标题：FileText 图标 + 品牌渐变装饰条 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#678EC9]/20 to-[#262277]/10">
                    <FileText className="h-5 w-5 text-[#262277]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">简历修改建议</h3>
                    <div className="mt-1 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277]" />
                  </div>
                </div>

                {/* 建议内容：保留换行，使用 whitespace-pre-wrap */}
                <div className="mt-5 max-h-96 overflow-y-auto pr-1 text-sm leading-relaxed text-slate-600">
                  {result.resumeTips}
                </div>
              </motion.div>

              {/* ----- 右侧卡片：面试官提问 ----- */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-white/50 bg-white/40 p-6 shadow-sm backdrop-blur-md"
              >
                {/* 卡片标题 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#678EC9]/20 to-[#262277]/10">
                    <MessageSquareText className="h-5 w-5 text-[#262277]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">面试官提问</h3>
                    <div className="mt-1 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277]" />
                  </div>
                </div>

                {/* 面试问题列表：有序编号 */}
                <ul className="mt-5 space-y-4">
                  {result.interviewQuestions.map((question, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex gap-3 rounded-xl bg-white/50 p-3 text-sm leading-relaxed text-slate-600"
                    >
                      {/* 编号徽章：渐变背景 + 白色数字 */}
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#678EC9] to-[#262277] text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <span>{question}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ============ 页面底部版权 ============ */}
      <footer className="border-t border-white/40 py-6 text-center text-xs text-slate-400">
        Powered by 通义千问 AI · 仅供学习与参考
      </footer>
    </div>
  )
}

export default Interview
