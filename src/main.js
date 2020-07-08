import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Store from "store"

//使用Store存数据方法名，数据名，数据
// Store.set("user", { name: "123", age: 222 })
//使用Store取数据
// console.log(Store.get("user"))

Vue.use(ElementUI);


Vue.config.productionTip = false


//请求登入
// import { request } from "@network/request";
// request({
//     url: "login",
//     method: "post",
//     data: {
//         username: "lls",
//         password: "228252"
//     }
// }).then(data => {
//     console.log(data);

// });

new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
    // import { from } from 'core-js/fn/array'