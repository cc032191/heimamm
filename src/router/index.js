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
import welcome from '../views/welcome/index.vue'
// 导入message方法   js文件使用element-ui里面的方法   需要单独导入  另外使用格式为Message.success('')
import {
    Message
} from 'element-ui'
// 导入token方法
import {
    getToken
} from "@/utils/mytoken.js"
// 导入获取用户信息的方法
import {
    getuserinfo
} from '../api/home'
// 注册 vue-router
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
        redirect: '/welcome',
        children: [{
                path: '/chart',
                component: chart,
                meta: {
                    title: '数据概览'
                }
            },
            {
                path: '/enterprise',
                component: enterprise,
                meta: {
                    title: '数据概览'
                }
            },
            {
                path: '/question',
                component: question,
                meta: {
                    title: '题库列表'
                }
            },
            {
                path: '/subject',
                component: subject,
                meta: {
                    title: '学科列表'
                }
            },
            {
                path: '/user',
                component: user,
                meta: {
                    title: '用户列表'
                }
            },
            {
                path: '/welcome',
                component: welcome,
                meta: {
                    title: 'welcome'
                }
            }
        ]

    }]
})

// 导入nprogress进度条
// 导入脚本
import NProgress from 'nprogress'
// 导入样式
import 'nprogress/nprogress.css'
// 配置前置导航守卫
router.beforeEach((to, from, next) => {
    // 得到title属性 
    const title = to.meta.title
    // 判断是否有,有就设置给每个组件的title
    if (title) {
        document.title = title
    }

    // 如果是login页面则可以直接访问
    if (to.path === '/login') {
        // 直接放行
        next()
    } else {
        // 不是login页面则判断是否有token,没有则返回login页面
        if (!getToken()) {
            Message.error('你还没有登录')
            // 跳转到login页面
            next('/login')
        } else {
            // 判断token是否为真
            getuserinfo().then(res => {
                if (res.data.code === 200) {
                    // 等于200则放行   开启进度条
                    NProgress.start();
                    next()
                } else if (res.data.code === 206) {
                    // 不等于200则表示token错误
                    window.console.log(res.data.message)
                    Message.error('你还没有登录');
                    next("/login");
                }
            })
        }
    }
    // 进度条开启
    // to  将要访问的路径
    // form 代表从哪个路径跳转而来
    // next 是一个函数   表示放行  
    // next()   无参数表示放行   next('/login') 有参数表示强制跳转
    // if (to.path === '/login') {
    //     //login页面直接放行   不需要token
    //     return next()
    // }
    // // 拿到token
    // if (!getToken()) {
    //     //如果没有 token则强制返回到登录页
    //     return next('/login')
    // } else {
    //     // 如果有则直接放行
    //     NProgress.start();
    //     next()
    // }
})
// 配置后置导航守卫
router.afterEach(() => {
    // to  将要访问的路径
    // form 代表从哪个路径跳转而来
    // 进度条关闭
    NProgress.done();
})
export default router