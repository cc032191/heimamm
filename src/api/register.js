// 注册的接口
// 导入axios
import axios from 'axios'

// 创建一个新的 axios 对象，并且设置基准地址
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL
})
// axios.create: 单独创建一个新的 axios 实例
//      这个实例的用法与 axios 对象是一样的，
//      只不过实现可以创建多个，并且它们之间不会相互干扰
//   如果将来有这样的需求：
//       我们前端对应的服务器接口有两个：
//          第一个的基准地址： 139.160.1.1
//          第二个的基准地址： 120.110.11.1
//      那么我们就可以为两个基准地址分别创建两个 axios 实现，这样一来他们之互不干扰
// 注意点：
//  如果创建了 axios 的实例，我们需要在下面使用它
// 导出获取验证码的方法
export function apigetCode({
    code,
    phone
}) {
    // 网络请求的结果返回给外界
    return instance({
        url: "/sendsms",
        method: 'post',
        data: {
            code,
            phone
        },
        // 跨域必须携带 cookie
        withCredentials: true
    })
}
// 导出注册的方法
export function register({
    username,
    phone,
    email,
    avatar,
    password,
    rcode
}) {
    return instance({
        url: '/register',
        method: 'post',
        data: {
            username,
            phone,
            email,
            avatar,
            password,
            rcode
        }
    })
}