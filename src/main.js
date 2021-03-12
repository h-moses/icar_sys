import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import store from "./store/store";
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL = 'https://5f5533f7-edc6-432d-90c4-0a4d8dcccf25.mock.pstmn.io/'
Object.defineProperty(Vue.prototype, '$http', {
    value: axios
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
