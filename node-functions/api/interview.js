/**
 * EdgeOne Node Function: DashScope AI 代理
 *
 * 文件路径: ./node-functions/api/interview.js
 * 访问路径: /api/interview
 *
 * 作用: 接收前端传来的求职信息，调用阿里云通义千问 API，返回 JSON 结果
 *       API Key 通过 context.env.QWEN_API_KEY（服务端环境变量）读取，永不暴露给前端
 *
 * Node Functions 优势（比 Edge Functions 更适合调远程 API）：
 * - Node.js v20 运行时，fetch natively 支持
 * - 墙上时间限制 30s（Edge Functions 仅 200ms CPU 时间片）
 * - 代码包 128MB / 请求体 6MB（Edge 分别 5MB / 1MB）
 */

// ============ 常量 ============

const QWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
const MODEL_NAME = 'qwen-plus'

// Prompt 模板：与前端 api.ts 保持一致（升级维护时请同时同步）
function buildPrompt(experience, categoryName, targetPosition) {
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

/** 清洗 AI 返回内容，去除可能包裹的 Markdown 代码块标记 */
function cleanJsonContent(content) {
  const trimmed = content.trim()
  return trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()
}

/** 统一 CORS 响应头（允许任意来源，因为这是公开 API） */
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
}

// ============ HTTP Handlers ============

// CORS 预检请求
export function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

// 主处理：POST /api/interview
export async function onRequestPost(context) {
  // 1. 读取服务端环境变量（安全！不会泄露到前端）
  const apiKey = context.env.QWEN_API_KEY
  if (!apiKey) {
    return jsonError('服务未配置 API Key，请联系管理员', 500)
  }

  // 2. 解析前端请求体
  let body
  try {
    body = await context.request.json()
  } catch {
    return jsonError('请求体格式错误，需要 JSON', 400)
  }

  const { experience, categoryName, targetPosition } = body

  if (!experience?.trim() || !categoryName || !targetPosition) {
    return jsonError('缺少必填字段：experience / categoryName / targetPosition', 400)
  }

  // 3. 调用 DashScope API（Node Function 发起 fetch，绕过浏览器 CORS + 隐藏 Key）
  try {
    const aiResp = await fetch(QWEN_API_URL, {
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
            content: buildPrompt(experience.trim(), categoryName, targetPosition),
          },
        ],
        temperature: 0.7,
      }),
    })

    if (!aiResp.ok) {
      const text = await aiResp.text()
      return jsonError(`AI 服务暂时不可用 (${aiResp.status})`, 502)
    }

    const data = await aiResp.json()
    const rawContent = data?.choices?.[0]?.message?.content

    if (!rawContent) {
      return jsonError('AI 返回内容为空', 502)
    }

    // 4. 解析 JSON
    const result = JSON.parse(cleanJsonContent(rawContent))

    if (!result.resumeTips || !Array.isArray(result.interviewQuestions)) {
      return jsonError('AI 返回格式不完整', 502)
    }

    // 5. 返回给前端
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (err) {
    return jsonError('AI 服务请求失败，请稍后重试', 502)
  }
}

/** 辅助：返回 JSON 错误 */
function jsonError(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: corsHeaders,
  })
}

// 其他 HTTP 方法一律 405
export function onRequestGet() {
  return jsonError('请使用 POST 请求', 405)
}
export function onRequestPut() {
  return jsonError('请使用 POST 请求', 405)
}
export function onRequestDelete() {
  return jsonError('请使用 POST 请求', 405)
}
