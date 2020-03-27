// 导入主内容区域组件
import chart from '../views/chart/index.vue'
import enterprise from '../views/enterprise/index.vue';
import question from '../views/question/index.vue';
import subject from '../views/subject/index.vue';
import user from '../views/user/index.vue';
import welcome from '../views/welcome/index.vue'


export default [{
        path: '/welcome',
        component: welcome,
        meta: {
            title: 'welcome',
            roles: ['超级管理员', '管理员', '老师', '学生'],
            id: 1
        }
    },
    {
        path: '/chart',
        component: chart,
        meta: {
            title: '数据概览',
            roles: ['超级管理员', '管理员', '老师'],
            id: 2
        }
    },
    {
        path: '/user',
        component: user,
        meta: {
            title: '用户列表',
            roles: ['超级管理员', '管理员', '老师'],
            id: 3
        }
    },
    {
        path: '/question',
        component: question,
        meta: {
            title: '题库列表',
            roles: ['超级管理员', '管理员', '老师', '学生'],
            id: 4
        }
    },
    {
        path: '/enterprise',
        component: enterprise,
        meta: {
            title: '企业列表',
            roles: ['超级管理员', '管理员'],
            id: 5,
        }
    },

    {
        path: '/subject',
        component: subject,
        meta: {
            title: '学科列表',
            roles: ['超级管理员', '管理员'],
            id: 6,
        }
    },

]