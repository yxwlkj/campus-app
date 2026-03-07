import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👇 新增这一行：关键修复，适配手机端和Vercel部署
  base: './',
  server: {
    host: true,
    port: 5173,
  }
})