import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite 配置：React 插件 + Tailwind CSS v4 官方插件
// 生产环境部署在 https://12314414.github.io/liboya-portfolio/ 子路径下，
// base 必须带仓库名前缀，否则静态资源会 404；本地开发仍使用根路径
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/liboya-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
