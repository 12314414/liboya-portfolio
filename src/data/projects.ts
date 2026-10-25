// 项目数据的类型定义
export interface Project {
  id: number // 唯一标识符
  title: string // 项目名称
  description: string // 项目描述
  techStack: string[] // 技术栈标签数组
  link: string // Github 链接（暂无则用 # 占位）
  demo?: string // 在线预览地址（可选）
}

// 项目数据：以后新增项目时，直接复制一个对象用逗号隔开追加即可
export const projects: Project[] = [
  {
    id: 1,
    title: '【今天吃什么】',
    description:
      '一款基于大语言模型视觉能力的 AI 应用。用户上传冰箱食材照片，AI 即可智能识别并推荐"三菜一汤"。项目支持疾病忌口自动排除（如糖尿病规避高糖）、多菜品组合烹饪时间规划、以及用户登录与历史记录存储等功能。',
    techStack: ['AI 视觉识别', 'Prompt 调优', '前端状态管理'],
    link: '#',
    demo: 'https://app-eil8f1799ptt.miaoda.online',
  },
]
