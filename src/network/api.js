//请求在api里发送
import { request } from './request'

//登入请求
export const reqLogin = ({ username, password }) => {
    return request({
        url: 'login',
        method: 'post',
        data: { username, password }
    })
}

//右侧菜单权限
export const reqMenu = () => {
    return request({
        url: 'menus',
        method: 'get',

    })
}

//用户列表请求
export const reqUserList = (params) => request({ url: 'users', method: 'get', params })

//改变用户状态
export const reqUpdateState = (uId, type) => request({ url: `users/${uId}/state/${type}`, method: "put" })

//添加用户

export const reqAddUser = (userInfo) => request({ url: 'users', method: 'post', data: userInfo })

//编辑用户
export const reqUpdateUser = (id, email, mobile) => request({ url: `users/${id}`, method: 'put', data: { email, mobile } })

//删除用户
export const reqDelUser = (id) => request({ url: `users/${id}`, method: 'delete' })

//角色管理
export const reqRoleList = () => request({ url: 'roles', method: 'get' })

//分配角色  users/:id/role
export const reqRoleUser = (id, rid) => request({ url: `users/${id}/role`, method: 'put', data: { rid } })

//获取权限列表
export const reqRightsList = () => request({ url: 'rights/list', method: 'get' })

//删除指定的权限roles/:roleId/rights/:rightId
export const reqDelRights = (roleId, rightId) => request({ url: `roles/${roleId}/rights/${rightId}`, method: 'delete' })