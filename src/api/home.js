// 用来封装所有首页的网络请求的方法
import instance from '../utils/myaxios'

// 封装获取用户信息的接口
export function getuserinfo() {
    return instance({
        url: '/info',
        // get请求可以省略不写
        // headers: {
        //     token: getToken()
        // },
    })
}
// 封装退出登录的方法
export function logout() {
    return instance({
        url: '/logout',
        // headers: {
        //     token: getToken()
        // }
    })
}