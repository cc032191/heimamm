// 封装所有用于处理localStorage   token的方法


// 定义统一的key
let TOKEN_KEN = 'token'

// 设置 token
export function setToken(value) {
    // localStorage只能保存字符串
    // 将 value 对象转为字符串
    // var strValue = JSON.stringify(value)
    window.localStorage.setItem(TOKEN_KEN, value)
}

//获取token
export function getToken() {
    //  取出是要返回给外界
    return window.localStorage.getItem(TOKEN_KEN)
}

//删除token
export function removeToken() {
    window.localStorage.removeItem(TOKEN_KEN)
}