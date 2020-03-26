// 导入vue
import Vue from 'vue'
// 导入moment
import moment from 'moment';
Vue.filter('data', function (value) {
    return moment(value).format('YYYY-MM-DD')
})