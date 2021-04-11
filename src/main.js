import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import {Message, MessageBox} from "element-ui";
import qs from 'qs'
import echarts from 'echarts'


Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$echarts = echarts

axios.defaults.baseURL = 'http://47.93.22.218:8080/'
axios.interceptors.request.use(config => {
    config.data = qs.stringify(config.data)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
})
Date.prototype.format = function(fmt){
    const o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };

    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(const k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(
                RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }

    return fmt;
}

Vue.config.errorHandler = function (err, vm, info) {
    if (vm) {
        console.log("Error:" + err.toString())
        console.log("vm:" + vm.toString())
        console.log("info:" + info.toString())
    }
}
Vue.config.warnHandler = function (msg, vm, trace) {
    if (vm) {
        console.log(new Date().format("yyyy-MM-dd hh:mm:ss"))
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
