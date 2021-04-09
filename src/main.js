import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import {Message, MessageBox} from "element-ui";
import echarts from 'echarts'

axios.defaults.baseURL = 'http://47.93.22.218:8080/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Object.defineProperty(Vue.prototype, '$http', {
    value: axios
})
Object.defineProperty(Vue.prototype, '$confirm', {
    value: MessageBox.confirm
})
Object.defineProperty(Vue.prototype, '$message', {
    value: Message
})
Object.defineProperty(Vue.prototype,'$echarts',{
    value:echarts
})
Vue.config.errorHandler = function (err, vm, info) {
    if (vm) {
        console.log("Error:" + err.toString())
        console.log("vm:" + vm.toString())
        console.log("info:" + info.toString())
    }
}
Vue.config.warnHandler = function (msg, vm, trace) {
    if (vm) {
        console.log("msg:" + msg)
        console.log("vm:" + vm.toString())
        console.log("trace:" + trace)
    }
}
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
