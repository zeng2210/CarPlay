import data from './mockmsg'
import SockJS from 'sockjs-client'
// import { setTimeout } from 'timers'

let websocket
export const loadWebsocket = function (wspath, callback) {
  websocket = new SockJS('http://' + wspath)
  websocket.onopen = () => {
    console.log('WebSocket连接开始')
    console.log(new Date())
  }
  websocket.onmessage = event => {
    console.log('数据已接收...' + event.data)
    callback(event.data)
  }
  websocket.onclose = event => {
    console.log(event)
    console.log('WebSocket连接关闭...尝试重连')
    websocket = loadWebsocket(wspath, callback)
  }
  websocket.onerror = event => {
    console.log('WebSocket连接出错...')
  }
  console.log('status: ' + websocket.readyState)
  return websocket
}

export const sendMessage = function () {
  if (websocket !== null) {
    // console.log('send message: ' + JSON.stringify(data))
    if (data) {
      data.sendTimeStamp = new Date().getTime()
    }
    websocket.send(JSON.stringify(data))
  }
}
