import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

import * as axios from 'axios'
import 'element-plus/dist/index.css'
import router from '../router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.config.globalProperties.axios = axios
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.mount('#app')
