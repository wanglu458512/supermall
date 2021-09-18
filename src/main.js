import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import toast from "components/common/toast"
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 安装插件
Vue.use(toast)
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
