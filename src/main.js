import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
// 导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入axios
// import axios from 'axios'
// 基地址配置
// axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public'
// axios放入Vue原型中
// Vue.prototype.$axios = axios

// 导入全局样式
import './style/index.css'


// 防止同路由点击报错
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')