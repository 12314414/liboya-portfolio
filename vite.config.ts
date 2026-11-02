import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite 配置：React 插件 + Tailwind CSS v4 官方插件
// 生产环境部署到 https://12314414.github.io/liboya-portfolio/
// base 路径需要加仓库名前缀，开发环境用根路径即可
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/liboya-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
