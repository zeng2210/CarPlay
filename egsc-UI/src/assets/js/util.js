import Vue from 'vue'
import { Message } from 'element-ui'
Vue.component(Message.name, Message)

// ajax错误处理
export const catchError = function (error) {
  if (error.response) {
    let messageInfo = error.response.data.message
    if (messageInfo === null || messageInfo === '' || messageInfo === undefined) {
      messageInfo = error.response.data
    }
    if (messageInfo !== undefined && ((messageInfo.indexOf('499') !== -1) || (messageInfo.indexOf('非法请求【缓存无效】') !== -1) || (messageInfo.indexOf('缓存无效') !== -1))) {
      Vue.prototype.$message({
        message: messageInfo || '非法请求【缓存无效】',
        type: 'error'
      })
    }
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: messageInfo || '请求参数异常',
          type: 'error'
        })
        break
      case 401:
        // localStorage.removeItem('user')
        Vue.prototype.$message({
          message: messageInfo || '密码错误或账号不存在！',
          type: 'warning'
        })
        break
      case 403:
        Vue.prototype.$message({
          message: messageInfo || '无访问权限，请联系企业管理员',
          type: 'warning'
        })
        break
      case 404:
        Vue.prototype.$message({
          message: messageInfo || '404错误，访问路径没找到，请联系技术支持',
          type: 'error'
        })
        break
      case 500:
        Vue.prototype.$message({
          message: messageInfo || '500服务器内部错误，请联系技术支持',
          type: 'error'
        })
        break
      default:
        Vue.prototype.$message({
          message: messageInfo || '服务端异常，请联系技术支持',
          type: 'error'
        })
    }
  }
  return Promise.reject(error)
}
