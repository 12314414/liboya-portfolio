/**
 * AI API 服务层
 * - 封装阿里云通义千问（DashScope）的调用逻辑
 * - 通过环境变量 VITE_QWEN_API_KEY 读取密钥，不写死在代码中
 * - 请求失败统一抛错，由上层 UI 捕获并展示友好提示
 */

// ============ 类型定义 ============

/** AI 返回的解析结果类型 */
export interface InterviewResult {
  resumeTips: string // 简历修改建议（富文本 Markdown 或纯文本）
  interviewQuestions: string[] // 3 个面试问题数组
}

/** 千问 API 的 chat completion 响应结构（简化版，仅保留用到的字段） */
interface QwenChatResponse {
  choices: Array<{
    message: {
      content: string // AI 返回的原始文本
    }
  }>
}

// ============ 常量 ============

// 通义千问 API 端点（DashScope 兼容 OpenAI 协议）
const QWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'

// 使用的模型名称（可按需切换，如 qwen-plus / qwen-max）
const MODEL_NAME = 'qwen-plus'

// ============ 核心函数 ============

/**
 * 构建 Prompt：将用户的个人经历 + 专业大类 + 细分岗位 拼接成结构化指令
 * 要求 AI 返回严格的 JSON 格式，便于前端直接解析
 *
 * @param experience 用户的个人经历文本
 * @param categoryName 专业大类名称（如 "计算机与互联网类"）
 * @param targetPosition 细分岗位（如 "前端开发"）
 */
function buildPrompt(experience: string, categoryName: string, targetPosition: string): string {
  return `你是一位拥有 10 年经验的资深 HR 面试官，擅长简历优化和面试辅导。

请根据以下信息提供求职辅导：

【我的个人经历/简历】
${experience}

【目标岗位】
专业大类：${categoryName}
细分岗位：${targetPosition}

请以 JSON 格式返回结果，包含两个字段：
1. "resumeTips"：针对这份简历的修改建议（200-300 字，分点列出具体可操作的建议）
2. "interviewQuestions"：模拟面试官会提出的 3 个核心面试问题（数组形式，每个问题一句话）

要求：
- 严格返回 JSON，不要包含任何额外的解释文字或 Markdown 代码块标记
- 建议要具体、可落地，贴近「${categoryName}」领域下「${targetPosition}」岗位的实际招聘标准
- 面试问题要贴近真实场景，考察岗位核心能力`
}

/**
 * 调用通义千问 API
 *
 * @param experience 用户的个人经历文本
 * @param categoryName 专业大类名称（用于 Prompt 拼接）
 * @param targetPosition 细分岗位（用于 Prompt 拼接）
 * @returns 解析后的 InterviewResult 对象
 * @throws 当 API Key 缺失、网络错误或返回格式异常时抛出 Error
 */
export async function callQwenInterview(
  experience: string,
  categoryName: string,
  targetPosition: string,
): Promise<InterviewResult> {
  // 1. 检查环境变量中的 API Key
  const apiKey = import.meta.env.VITE_QWEN_API_KEY
  if (!apiKey) {
    throw new Error('缺少 API Key：请在 .env 文件中配置 VITE_QWEN_API_KEY')
  }

  // 2. 发起请求
  const response = await fetch(QWEN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [
        {
          role: 'user',
          content: buildPrompt(experience, categoryName, targetPosition),
        },
      ],
      temperature: 0.7, // 适中的创造性，保证建议有新意但不离谱
    }),
  })

  // 3. 检查 HTTP 状态码
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`AI 请求失败 (${response.status})：${errorText || '请稍后重试'}`)
  }

  // 4. 解析响应
  const data: QwenChatResponse = await response.json()
  const rawContent = data?.choices?.[0]?.message?.content

  if (!rawContent) {
    throw new Error('AI 返回内容为空，请稍后重试')
  }

  // 5. 处理 JSON 提取：AI 可能在 JSON 外包裹 Markdown 代码块，需要清洗
  const jsonStr = cleanJsonContent(rawContent)

  try {
    const parsed = JSON.parse(jsonStr) as InterviewResult

    // 6. 简单校验返回字段完整性
    if (!parsed.resumeTips || !Array.isArray(parsed.interviewQuestions)) {
      throw new Error('AI 返回格式不完整')
    }

    return parsed
  } catch {
    throw new Error('AI 返回格式异常，请稍后重试')
  }
}

/**
 * 清洗 AI 返回的内容，去除可能存在的 Markdown 代码块标记
 * 例如：```json\n{...}\n``` → {...}
 */
function cleanJsonContent(content: string): string {
  const trimmed = content.trim()
  // 如果开头和结尾有 ``` 或 ```json，去掉
  const cleaned = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()
  return cleaned
}
