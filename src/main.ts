import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import { setupGlobalCom } from './components'
import { setupGlobalDirective } from './directives'
import ElongUI from 'elong-vue3-ui/es/components'

// global css
import '@/styles/index.scss'
import './permission'
import 'uno.css'

// 上线注释的调试工具
import eruda from 'eruda'
// eruda.init()

const app = createApp(App)

// 注册全局组件
setupGlobalCom(app)
// 注册全局指令
setupGlobalDirective(app)
// app.use(Button)
app.use(router)
app.use(ElongUI)

app.use(createPinia())

app.mount('#app')
