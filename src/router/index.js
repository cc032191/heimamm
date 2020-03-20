import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
// 导入登录组件
import login from '../views/login/index.vue'
// 导入主页
import home from '@/views/home/index.vue'
// 导入主内容区域组件
import chart from '../views/chart/index.vue'
import enterprise from '../views/enterprise/index.vue';
import question from '../views/question/index.vue';
import subject from '../views/subject/index.vue';
import user from '../views/user/index.vue';
// 导入token方法
import {
    getToken
} from "@/utils/mytoken.js"
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [{
        path: '/login',
        component: login
    }, {
        path: '/',
        redirect: '/login'
    }, {
        path: '/home',
        component: home,
        children: [{
                path: '/chart',
                component: chart
            },
            {
                path: '/enterprise',
                component: enterprise
            },
            {
                path: '/question',
                component: question
            },
            {
                path: '/subject',
                component: subject
            },
            {
                path: '/user',
                component: user
            }
        ]

    }]
})
// 配置导航守卫
router.beforeEach((to, from, next) => {
    // to  将要访问的路径
    // form 代表从哪个路径跳转而来
    // next 是一个函数   表示放行  
    // next()   无参数表示放行   next('/login') 有参数表示强制跳转
    if (to.path === '/login') {
        //login页面直接放行   不需要token
        return next()
    }
    // 拿到token
    if (!getToken()) {
        //如果没有 token则强制返回到登录页
        return next('/login')
    } else {
        // 如果有则直接放行
        next()
    }
})
export default router