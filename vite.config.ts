import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite 配置：React 插件 + Tailwind CSS v4 官方插件
// base 使用相对路径，便于部署到 GitHub Pages 等子路径站点
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
