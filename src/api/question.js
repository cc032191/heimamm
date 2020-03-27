// 用来封装题库列表的网络请求的方法
import instance from '../utils/myaxios'


// 获取题目列表
export function apigetque({
    title,
    subject,
    enterprise,
    type,
    step,
    username,
    status,
    difficulty,
    create_date,
    page,
    limit
}) {
    return instance({
        url: '/question/list',
        params: {
            title,
            subject,
            enterprise,
            type,
            step,
            username,
            status,
            difficulty,
            create_date,
            page,
            limit
        }
    })
}

// 发布题目
export function apiaddque({
    title,
    subject,
    step,
    enterprise,
    city,
    type,
    difficulty,
    single_select_answer,
    multiple_select_answer,
    short_answer,
    video,
    answer_analyze,
    remark,
    select_options
}) {
    return instance({
        url: '/question/add',
        method: 'POST',
        data: {
            title,
            subject,
            step,
            enterprise,
            city,
            type,
            difficulty,
            single_select_answer,
            multiple_select_answer,
            short_answer,
            video,
            answer_analyze,
            remark,
            select_options
        }
    })
}
// 获取单个题目详细信息接口
export function apiaddone({
    id
}) {
    return instance({
        url: '/question/one',
        method: 'POST',
        data: {
            id
        }
    })
}
// 修改题目状态。 启用或者禁用账号
export function apialterque({
    id
}) {
    return instance({
        url: '/question/status',
        method: 'POST',
        data: {
            id
        }
    })
}
// 删除题目
export function removeque({
    id
}) {
    return instance({
        url: '/question/remove',
        method: 'POST',
        data: {
            id
        }
    })
}


// 题目编辑接口
export function apieditqus({
    id,
    title,
    subject,
    step,
    enterprise,
    city,
    type,
    difficulty,
    single_select_answer,
    multiple_select_answer,
    short_answer,
    video,
    answer_analyze,
    remark,
    select_option,
}) {
    return instance({
        url: '/question/edit',
        method: 'POST',
        data: {
            id,
            title,
            subject,
            step,
            enterprise,
            city,
            type,
            difficulty,
            single_select_answer,
            multiple_select_answer,
            short_answer,
            video,
            answer_analyze,
            remark,
            select_option,
        }
    })
}
