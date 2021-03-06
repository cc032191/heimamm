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

// 导入store
import store from './store/index.js'

// 导入全局filter
// 导入日期处理
import './filters/timeFilter.js';


// 导入全局组件
import subject from "./components/subjectcom.vue";
import ent from "./components/ent";
// 城市选择器
import citycom from "./components/citycom";
// 富文本
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor)
// 全局注册
Vue.component('subjectcom', subject)
Vue.component('entcom', ent)
Vue.component('citycom', citycom)



// 防止同路由点击报错
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载router
  router,
  // 挂载store
  store
}).$mount('#app')