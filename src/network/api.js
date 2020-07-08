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