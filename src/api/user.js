// 用来封装用户列表的网络请求的方法
import instance from '../utils/myaxios'

// 获取用户列表
export function getuser({
    username,
    email,
    role_id,
    page,
    limit
}) {
    return instance({
        url: '/user/list',
        params: {
            username,
            email,
            role_id,
            page,
            limit
        }
    })
}
// 创建用户
export function adduser({
    username,
    email,
    phone,
    role_id,
    status,
    remark,
}) {
    return instance({
        url: '/user/add',
        method: 'POST',
        data: {
            username,
            email,
            phone,
            role_id,
            status,
            remark,
        }
    })
}
// 设置状态
export function alteruser({
    id
}) {
    return instance({
        url: '/user/status',
        method: 'POST',
        data: {
            id
        }
    })
}
// 删除用户
export function removeuser({
    id
}) {
    return instance({
        url: '/user/remove',
        method: 'POST',
        data: {
            id
        }
    })
}
//编辑用户
export function edituser({
    id,
    username,
    phone,
    email,
    avatar,
    password,
    remark,
    status,
    role_id,
}) {
    return instance({
        url: '/user/edit',
        method: 'POST',
        data: {
            id,
            username,
            phone,
            email,
            avatar,
            password,
            remark,
            status,
            role_id,
        }

    })
}