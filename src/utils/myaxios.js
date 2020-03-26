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

export default instance