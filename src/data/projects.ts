// 项目封面图：由 Vite 打包时生成带哈希的相对路径，部署到子目录也能正确加载
import todayEatCover from '../assets/projects/today-eat-cover.jpg'
import healingFocusTimerCover from '../assets/projects/healing-focus-timer-cover.jpg'
import aiInterviewCover from '../assets/projects/ai-interview-cover.png'

// 项目数据的类型定义
export interface Project {
  id: number // 唯一标识符
  title: string // 项目名称
  description: string // 项目描述
  techStack: string[] // 技术栈标签数组
  link: string // 内部路由跳转路径（如 /interview）或 # 占位
  demo?: string // 在线预览地址（可选）
  cover?: string // 项目封面图地址（可选，缺省时用渐变占位色块）
}

// 项目数据：以后新增项目时，直接复制一个对象用逗号隔开追加即可
export const projects: Project[] = [
  {
    id: 1,
    title: '【今天吃什么】',
    description:
      '一款基于大语言模型视觉能力的 AI 应用。用户上传冰箱食材照片，AI 即可智能识别并推荐"三菜一汤"。项目支持疾病忌口自动排除（如糖尿病规避高糖）、多菜品组合烹饪时间规划、以及用户登录与历史记录存储等功能。从 0 到 1 独立完成全栈原型设计，累计处理 Prompt 交互 500+ 次。',
    techStack: ['LLM 应用开发', '千问大模型接入', 'Prompt Engineering', 'AIGC 交互', 'AI Agent'],
    link: '#',
    demo: 'https://12314414.github.io/today-eats/',
    cover: todayEatCover,
  },
  {
    id: 2,
    title: '治愈系专注计时器',
    description:
      '一款集成了白噪音播放与 AI 随机鼓励语的极简番茄钟，帮助用户快速进入心流状态。优化后打包体积减小 20%，课程作业获评优秀。',
    techStack: ['React', 'Tailwind CSS', '交互设计', '音频流控制'],
    link: '#',
    demo: 'https://12314414.github.io/healing-focus-timer/',
    cover: healingFocusTimerCover,
  },
  {
    id: 3,
    title: 'AI 简历面试官',
    description:
      '基于大语言模型开发的求职辅助工具。用户输入个人经历并选择目标岗位，AI 将自动生成定制化简历修改建议，并模拟真实面试官提出 3 个核心面试问题。覆盖 4 大专业类、35+ 细分岗位，输出结构化反馈。',
    techStack: ['React Router', 'LLM API', 'Prompt 工程', '表单交互'],
    link: '/interview',
    cover: aiInterviewCover,
  },
]
