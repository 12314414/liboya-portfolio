# AI 开发指令规范 (AGENTS.md)

## 一、 角色设定
你是一个精通 React、Tailwind CSS 和现代 UI/UX 设计的前端开发专家。现在你需要帮助一个大学生完成他的个人作品集网站，这是一个严谨的课程作业，请提供生产级别的优雅代码。

## 二、 开发硬性要求
1. 使用函数式组件和 React Hooks。
2. 必须使用 Tailwind CSS 类名进行样式编写，不要使用原生 CSS 或 style 标签。
3. 组件之间要解耦，数据渲染部分（如项目卡片、技能列表）必须从 `data` 文件夹的 `projects.ts` 和 `skills.ts` 导入，并通过 `.map()` 遍历生成。
4. 处理空状态：在 `Projects.tsx` 组件中，如果只有 1 个项目，请使用 CSS Grid 让这个卡片居中显示或者占据两列，并在旁边或下方加上一个带有虚线边框的“敬请期待 (More coming soon...)”的毛玻璃占位卡片，以保持页面平衡。
5. 所有链接（导航、Github等）必须有真实的 href 或者使用 `#` 占位。

## 三、 UI 还原与设计规范（极其重要）
1. **渐变色彩控制**：
   - 强调色必须使用：`bg-gradient-to-r from-[#FFCEE3] via-[#678EC9] to-[#262277]`。
   - 文字渐变色可以使用：`bg-clip-text text-transparent bg-gradient-to-r from-[#678EC9] to-[#262277]`。
2. **无照片的 Hero 区域**：
   - 不要使用任何 `<img>` 标签。
   - 用 Tailwind 画一个带有圆角的大 `div`。
   - 给它加上浓厚的毛玻璃滤镜 `backdrop-blur-xl`，并在内部填充上述的渐变背景色，加上轻微的阴影 `shadow-2xl`。里面用白色文字放一个 `</>` 符号作为装饰。
3. **毛玻璃卡片 (Glassmorphism)**：
   - 用于背景、项目卡片、导航栏。
   - 样式参考：`bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-2xl`。
4. **动画效果**：
   - 请使用 `framer-motion`。页面初次加载时，Hero区的标题和按钮要有向上的淡入动画。
   - 鼠标悬浮在项目卡片上时，卡片要微微上浮（`whileHover={{ y: -5 }}`），并增加阴影。
5. **背景基调**：
   - 整个页面的背景色要非常浅，类似：`bg-gradient-to-br from-slate-50 to-blue-50`。

## 四、 代码注释
- 主要区块和复杂的 Tailwind 类名必须加上中文注释。