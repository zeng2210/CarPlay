/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import axios from 'axios'
import {catchError} from './util'

const Axios = axios.create({
  timeout: 10000
})

// 暂时不启用过滤
Axios.interceptors.request.use(config => {
  // 用户登录后,存储token，发送请求时，设置token sessionStorage.token
  // 前端Header中需要传入FrontType字段：  scp-admin-ui 小区管理平台   scp-egsc-ui 小区大屏平台    egc-admin-ui 云管理平台    egc-owner-ui 云业主平台 egc-mobile-ui 云手机平台
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token
  }
  config.headers.FrontType = 'scp-egsc-ui'

  // 请求参数添加时间戳防止缓存
  if (config.method === 'get') {
    config.params = {
      _t: new Date().getTime(),
      ...config.params
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Add a response interceptor
Axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    catchError(error)
    return Promise.reject(error)
  }
)

export default Axios
