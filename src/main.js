import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './plugins/axios'
import store from "./store/store";
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'

// axios.defaults.baseURL = ''
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype,'$http',{
  value:axios
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
