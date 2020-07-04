import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () =>
    import ("@views/login/Login")

const routes = [{
    path: '/',
    redirect: "/login"
}, {
    path: '/login',
    component: Login
}]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router