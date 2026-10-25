# 技术设计

## 1. 技术栈
- 核心框架：React + TypeScript
- 构建工具：Vite
- 样式方案：Tailwind CSS
- 动画库：Framer Motion
- 图标库：lucide-react

## 2. 核心数据定义 (用于渲染页面)
## 技能数据 (skills.ts)
- 格式：字符串数组。
- 示例：['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'Figma']

## 项目数据 (projects.ts)
- 格式：对象数组。每个对象包含：
  - id: 唯一标识符
  - title: 项目名称 (string)
  - description: 项目描述 (string)
  - techStack: 技术栈标签数组 (string[])
  - link: Github 链接 (string)
  
### 你的项目数据填写区（请按照下面的格式自己填写，我会让AI读取）：
const projects = [
  {
    id: 1,
    title: "【今天吃什么】",
    description: "一款基于大语言模型视觉能力的 AI 应用。用户上传冰箱食材照片，AI 即可智能识别并推荐“三菜一汤”。项目支持疾病忌口自动排除（如糖尿病规避高糖）、多菜品组合烹饪时间规划、以及用户登录与历史记录存储等功能。",
    techStack: ["AI 视觉识别", "Prompt 调优",  "前端状态管理"], 
    link: "【 #】"
  }
  // 以后有第二个项目，直接复制上面这串 {} 的内容，用逗号隔开即可。
];

## 3. 文件目录结构
src/
├── components/
│   ├── Header.tsx      # 导航栏
│   ├── Hero.tsx        # 首屏（含抽象渐变色块）
│   ├── About.tsx       # 个人介绍与技能
│   ├── Projects.tsx    # 作品网格（必须处理只有1个项目时的居中排版，以及“敬请期待”占位）
│   ├── Contact.tsx     # 联系与页脚
│   └── ui/             # 通用UI组件
├── data/
│   ├── skills.ts       # 技能数据
│   └── projects.ts     # 你的项目数据（包含上面的代码）
├── App.tsx             # 核心组装
└── index.css           # 全局样式及Tailwind指令