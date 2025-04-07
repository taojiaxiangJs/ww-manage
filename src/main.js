import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// import './assets/style/style.css'
import 'uno.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Antd)
app.mount('#app')