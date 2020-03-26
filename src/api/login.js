// 登录的接口
// 导入axios
import axios from 'axios'

// 创建一个新的 axios 对象，并且设置基准地址
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 跨域必须携带 cookie
    withCredentials: true
})
// 导出登录的的方法
export function loginindex({
    phone,
    password,
    code
}) {
    // 网络请求的结果返回给外界
    return instance({
        url: "/login",
        method: 'post',
        data: {
            code,
            phone,
            password
        },
    })
}