// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import App from './App'
import router from './routers'
import axios from '@/assets/js/AxiosPlugin'
import store from './stores'
import 'hdmap'
import 'hdmap/dist/hdmap.css'
import globalCom from './globalcomponents'
import echarts from 'echarts'
// mock 启动
import './mocks/mock'
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
// 使用mock时，将引入mock，取消注释
// import './mocks/mock'
// mock 启动
if (/localhost/.test(location.href)) {
  // require('@/mocks/mock')
}
Vue.use(globalCom)
Vue.use(ElementUI)
// Vue.use(ajax)

Vue.config.productionTip = false

// //axios全局配置
// axios.defaults.baseURL = 'http://localhost:8082';
// //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.axios = axios;

const Bus = new Vue()

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render (create) {
    return create(App)
  },
  router,
  template: '<App/>',
  components: { App },
  data: {
    Bus
  }
})
