// 导入axios
import axios from 'axios'
// 导出获取验证码的方法
export function apigetCode({
    code,
    phone
}) {
    // 网络请求的结果返回给外界
    return axios({
        url: process.env.VUE_APP_ONLINEURL + "/sendsms",
        method: 'post',
        data: {
            code,
            phone
        },
        // 跨域必须携带 cookie
        withCredentials: true
    })
}