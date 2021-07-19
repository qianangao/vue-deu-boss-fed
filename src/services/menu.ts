import request from "@/utils/request";

/**
*
* @param data
 * 菜单管理相关模块
 */
// 添加或修改菜单
export const createOrUpdateMenu = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/menu/saveOrUpdate',
        data
    })
}

// 获取编辑菜单页面信息
export const getEditMenuInfo = (id:string | number = -1) => {
    return request({
        method: 'get',
        url: '/boss/menu/getEditMenuInfo',
        params: {
            id
        }
    })
}
// 获取所有菜单数据
export const getAllMenu = () => {
    return request({
        method: 'get',
        url: '/boss/menu/getAll'
    })
}
// 删除菜单数据
export const deleteMenu = (id: number) => {
    return request({
        method: 'delete',
        url: `/boss/menu/${id}`
    })
}
// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
    return request({
        method: 'get',
        url: '/boss/menu/getMenuNodeList'
    })
}
// 给角色分配菜单
export const allocateRoleMenus = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/menu/allocateRoleMenus',
        data
    })
}

// 获取角色拥有的菜单列表
export const getRoleMenus = (roleId: string | number) => {
    return request({
        method: 'get',
        url: '/boss/menu/getRoleMenus',
        params: {
            roleId
        }
    })
}
