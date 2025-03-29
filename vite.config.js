import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
console.log(process.env.NODE_ENV);
// development  production

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? './' : '/takeout',
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 确保 @ 指向 src 目录
    },
  },
})
