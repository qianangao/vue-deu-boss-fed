import request from "@/utils/request";

// 按条件分页查询资源
export const getResourceList = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/resource/getResourcePages',
        data
    })
}
// 查询资源分类列表
export const getResourceSelect = () => {
    return request({
        method: 'get',
        url: '/boss/resource/category/getAll'
    })
}

// 保存或更新资源
export const saveOrUpdateResource = (data: any) => {
    return request({
        method: 'post',
        url: `/boss/resource/saveOrUpdate`,
        data
    })
}
// 获取所有菜单并按层级展示
export const getResource = () => {
    return request({
        method: 'get',
        url: '/boss/resource/getAll'
    })
}
// 给角色分配资源
export const allocateRoleResources = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/resource/allocateRoleResources',
        data
    })
}

// 获取角色拥有的资源列表
export const getRoleResources = (roleId: string | number) => {
    return request({
        method: 'get',
        url: '/boss/resource/getRoleResources',
        params: {
            roleId
        }
    })
}
