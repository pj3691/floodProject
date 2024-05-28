import './theme/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import ElementPlus from "element-plus"; //全局引入el-plus

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(ElementPlus)
app.use(createPinia())
app.use(router) //use函数用于全局引入已经写好的插件，所有组件文件无需引用即可使用插件

app.mount('#app')
