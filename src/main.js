import Vue from 'vue'
import App from './App.vue'

import router from './router/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



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