import request from "@/utils/request";

// 按条件查询角色
export const getRole = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/role/getRolePages',
        data
    })
}
// 根据Id查询角色
export const getRoleById = (id: string | number) => {
    return request({
        method: 'get',
        url: `/boss/role/${id}`
    })
}

// 保存或更新角色
export const saveOrUpdateRole = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/role/saveOrUpdate',
        data
    })
}
// 根据Id删除角色
export const deleteRole = (id: string | number) => {
    return request({
        method: 'delete',
        url: `/boss/role/${id}`
    })
}
