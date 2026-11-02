/**
 * AI 简历面试官 - 前端 API 服务层
 *
 * 安全架构：
 * 前端 → EdgeOne Edge Function（/api/interview）→ DashScope API
 *              ↑
 *     QWEN_API_KEY 存在这里（服务端 env），永不暴露给前端
 *
 * 前端不再持有任何 DashScope 凭据，只发普通 HTTP 请求。
 */

// ============ 类型定义 ============

/** AI 返回的解析结果类型 */
export interface InterviewResult {
  resumeTips: string // 简历修改建议（富文本 Markdown 或纯文本）
  interviewQuestions: string[] // 3 个面试问题数组
}

// ============ 核心函数 ============

/**
 * 调用 EdgeOne Edge Function 代理，由服务端转发到 DashScope
 *
 * @param experience 用户的个人经历文本
 * @param categoryName 专业大类名称（如 "计算机与互联网类"）
 * @param targetPosition 细分岗位（如 "前端开发"）
 * @returns 解析后的 InterviewResult 对象
 * @throws 网络错误 / 服务端返回的错误信息
 */
export async function callQwenInterview(
  experience: string,
  categoryName: string,
  targetPosition: string,
): Promise<InterviewResult> {
  // 请求发到同源 /api/interview，Edge Functions 路由会自动拦截并处理
  const response = await fetch('/api/interview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      experience,
      categoryName,
      targetPosition,
    }),
  })

  // 解析服务端返回
  let data: InterviewResult | { error?: string }
  try {
    data = await response.json()
  } catch {
    throw new Error('服务响应格式异常')
  }

  // HTTP 非 2xx 时，服务端会返回 { error: "xxx" }
  if (!response.ok) {
    const errMsg = (data as { error?: string })?.error ?? `请求失败 (${response.status})`
    throw new Error(errMsg)
  }

  // 校验字段完整性
  const result = data as InterviewResult
  if (!result.resumeTips || !Array.isArray(result.interviewQuestions)) {
    throw new Error('服务返回格式异常，请稍后重试')
  }

  return result
}
