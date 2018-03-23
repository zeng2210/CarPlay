/**
 * 获取WebSocket的地址
 * TODO 临时方案，后续建议在后台配置，通过接口放回，以满足不同环境的需要
 */
export const getWebSocketUrl = () => {
  const url = window.location.href

  // Dev2环境
  if (/192.168.0.242/.test(url)) {
    return '192.168.0.242:39018'
  }

  // Dev3环境
  if (/192.168.0.161/.test(url)) {
    return '192.168.0.161:39018'
  }

  // test环境
  if (/192.168.0.236/.test(url)) {
    return '192.168.0.236:9018'
  }

  // test2环境
  if ((/192.168.0.176/.test(url)) ||
    (/192.168.0.177/.test(url)) ||
    (/192.168.0.178/.test(url))) {
    return '192.168.0.178:9018'
  }

  // 本地开发
  return '192.168.0.242:39018'
}
