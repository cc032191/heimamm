// 用来封装所有首页的网络请求的方法
// 导入axios
import axios from 'axios'
// 导入获取token的方法
import {
    getToken
} from '@/utils/mytoken.js'

// 创造一个axios实例
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 跨域必须携带 cookie
    withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 获取学科列表信息接口
export function getsubjectlist({
    name,
    page,
    limit,
    rid,
    username,
    status
}) {
    return instance({
        url: '/subject/list',
        // get请求可以省略不写
        // headers: {
        //     token: getToken()
        // },
        params: {
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    })
}
// 改变状态值
export function createstatus({
    id,
    status
}) {
    return instance({
        url: '/subject/status',
        method: 'POST',
        // headers: {
        //     token: getToken()
        // },
        data: {
            id,
            status
        }
    })
}
// 新增学科
export function addsuBject({
    rid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/subject/add',
        method: 'POST',
        // headers: {
        //     token: getToken()
        // },
        data: {
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })
}
// 删除学科
export function removesuBject({
    id
}) {
    return instance({
        url: '/subject/remove',
        method: 'POST',
        // headers: {
        //     token: getToken()
        // },
        data: {
            id
        }
    })
}
// 编辑学科
export function compilesuBject({
    rid,
    name,
    short_name,
    intro,
    remark,
    id
}) {
    return instance({
        url: '/subject/edit',
        method: 'POST',
        data: {
            rid,
            name,
            short_name,
            intro,
            remark,
            id
        }
    })
}