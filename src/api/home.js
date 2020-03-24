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

// 封装获取用户信息的接口
export function getuserinfo() {
    return instance({
        url: '/info',
        // get请求可以省略不写
        headers: {
            token: getToken()
        },
    })
}
// 封装退出登录的方法
export function logout() {
    return instance({
        url: '/logout',
        headers: {
            token: getToken()
        }
    })
}