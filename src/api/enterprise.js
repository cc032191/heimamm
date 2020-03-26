// 用来封装企业列表的网络请求的方法
import instance from '../utils/myaxios'
// 获取企业列表信息接口
export function apigetenterpriselist({
    name,
    page,
    limit,
    eid,
    username,
    status
}) {
    return instance({
        url: '/enterprise/list',
        // get请求可以省略不写
        // headers: {
        //     token: getToken()
        // },
        params: {
            name,
            page,
            limit,
            eid,
            username,
            status
        }
    })
}
// 改变状态值
export function apicreatestatus({
    id
}) {
    return instance({
        url: '/enterprise/status',
        method: 'POST',
        // headers: {
        //     token: getToken()
        // },
        data: {
            id
        }
    })
}
// 新增企业
export function apiaddenterprise({
    eid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/enterprise/add',
        method: 'POST',
        // headers: {
        //     token: getToken()
        // },
        data: {
            eid,
            name,
            short_name,
            intro,
            remark
        }
    })
}
// 删除企业
export function apiremoveenterprise({
    id
}) {
    return instance({
        url: '/enterprise/remove',
        method: 'POST',
        // headers: {
        //     token: getToken()
        // },
        data: {
            id
        }
    })
}
// 编辑企业
export function apicompileenterprise({
    tag,
    name,
    short_name,
    intro,
    remark,
    id,
    eid
}) {
    return instance({
        url: '/enterprise/edit',
        method: 'POST',
        data: {
            tag,
            name,
            short_name,
            intro,
            remark,
            id,
            eid //必须传入   后台bug
        }
    })
}