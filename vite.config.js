import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),UnoCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 确保 @ 指向 src 目录
    },
  },
})
