// 用来封装用户列表的网络请求的方法
import instance from '../utils/myaxios'

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