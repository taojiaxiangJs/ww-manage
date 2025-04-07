import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
    // presetIcons({
    //   collections: {
    //     'custom': () => import('@iconify-json/mdi').then(i => i.icons),
    //     // 'ant-design': () => import('@iconify-json/ant-design').then(i => i.icons)
    //   }
    // })
  ],
  theme: {
    colors: {
      primary: '#1890ff', // 可直接使用 $primary-color 的值
      background: '#f0f2f5'
    }
  },
  rules: [
    // ...custom rules
  ],
})