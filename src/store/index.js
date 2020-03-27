//  导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex)
// 创建vuex实例
const store = new Vuex.Store({
    state: {
        username: '',
        userimg: '',
        role: ''
    },
    mutations: {
        // 定义一个设置用户信息的方法
        changeuser: function (state, payload) {
            state.username = payload.username
            state.userimg = payload.userimg

        },
        setRole: function (state, payload) {
            state.role = payload
        }
    }
})
// 导出
export default store