import axios from "axios"

export const request = (config) => {
    const ins = axios.create({
        baseURL: "http://127.0.0.1:8888/api/private/v1/",
        timeout: 5000
    });
    ins.interceptors.response.use((response) => {
        return response.data;
    });
    ins.interceptors.request.use(config => { //请求拦截，在发出去的时候拦下来

        config.headers.Authorization = sessionStorage.getItem('token') //给所有的请求头加token
        return config

    })
    return ins(config)
}