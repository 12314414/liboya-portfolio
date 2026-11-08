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
  businessValue: string // 业务价值 / 产品思考（卡片中以浅蓝小框展示）
  link: string // 内部路由跳转路径（如 /interview）或 # 占位
  demo?: string // 在线预览地址（可选）
  cover?: string // 项目封面图地址（可选，缺省时用渐变占位色块）
  chart?: {
    // 迷你图表数据（可选）：存在时卡片头图改为渲染折线图
    label: string // 图表标题
    note: string // 图表下方说明（数据量 / 方法）
    points: { name: string; value: number }[] // 折线图数据点
  }
}

// 项目数据：以后新增项目时，直接复制一个对象用逗号隔开追加即可
export const projects: Project[] = [
  {
    id: 1,
    title: '【今天吃什么】',
    description:
      '一款基于大语言模型视觉能力的 AI 应用。用户上传冰箱食材照片，AI 即可智能识别并推荐"三菜一汤"。项目支持疾病忌口自动排除（如糖尿病规避高糖）、多菜品组合烹饪时间规划、以及用户登录与历史记录存储等功能。从 0 到 1 独立完成全栈原型设计，累计处理 Prompt 交互 500+ 次。',
    techStack: ['LLM 应用开发', '千问大模型接入', 'Prompt Engineering', 'AIGC 交互', 'AI Agent'],
    businessValue:
      '洞察年轻群体"做饭难、选择困难"的痛点，通过 AI 降低决策成本，未来可延展至生鲜电商导购场景。',
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
    businessValue:
      '针对学生专注力缺失问题，结合白噪音与正向反馈，探索数字疗法在时间管理领域的商业价值。',
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
    businessValue:
      '打破求职信息差，用大模型技术平替高昂的线下模拟面试服务，具备 To C 付费订阅潜力。',
    link: '/interview',
    cover: aiInterviewCover,
  },
  {
    id: 4,
    title: 'Z世代消费趋势数据洞察',
    description:
      '基于 1000 份问卷调研数据，对年轻人消费习惯进行清洗与分析。构建线性回归模型，洞察影响购买决策的核心因素，并输出可视化分析报告。',
    techStack: ['Python 数据分析', '市场调研', '数据可视化', 'SPSS'],
    businessValue:
      '把课堂统计方法落到真实消费场景：用回归结果定位影响购买决策的核心变量，为面向年轻人的选品与定价策略提供数据依据。',
    link: '#',
    // 头图使用迷你折线图，数据为问卷调查的月均消费支出
    chart: {
      label: 'Z 世代月均消费支出（元）',
      note: '样本量 n = 1000 · Python 清洗 + SPSS 回归',
      points: [
        { name: '3月', value: 620 },
        { name: '4月', value: 690 },
        { name: '5月', value: 740 },
        { name: '6月', value: 820 },
        { name: '7月', value: 880 },
        { name: '8月', value: 910 },
      ],
    },
  },
]
