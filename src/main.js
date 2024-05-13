import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import store from './store'
import 'dayjs/locale/zh-cn'
import '@/vab'

/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

createApp(App).use(store).use(router).use(Antd).mount('#app')
