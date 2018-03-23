import Axios from '@/assets/js/AxiosPlugin'
// 代码提交部署使用
let context = '/scp-videogatewayapp'
// 本地开发调试使用
// let context = ''
// 派遣保安列表
export const getGuardlistData = (params) => {
  return Axios.get('/scp-patrolapp/patrolSendUser/queryUserState', { params: params }).then(res => res.data)
}
// 派遣保安
export const postDispatchData = (params) => {
  return Axios.post('/scp-patrolapp/patrolSendUser/screenSendUser', params).then(res => res.data)
}
// 获取ocx控件需要的数据
export const getDeviceByCameraData = params => {
  return Axios.get(context + '/organization/device/getDeviceByCameraCode', { params: params }).then(res => res.data)
}
// 发送到云平台
export const postPtzCmdData = (params) => {
  return Axios.post(context + '/ptzCmd/postPtzCmd', params).then(res => res.data)
}
// 获取预置点
export const getPresetData = (params) => {
  return Axios.get(context + '/presetCruise/preset/list', { params: params }, { headers: { 'Content-Type': 'application/json' } })
}
// 获取巡航点
export const getCruiseData = (params) => {
  return Axios.get(context + '/presetCruise/cruise/list', { params: params }, { headers: { 'Content-Type': 'application/json' } })
}
// 开始预置点巡航点
export const postStartCruiseData = (params) => {
  return Axios.post(context + '/presetCruise/cruise/start', params, { headers: { 'Content-Type': 'application/json' } })
}
// 开始预置点巡航点
export const postStopCruiseData = (params) => {
  return Axios.post(context + '/presetCruise/cruise/stop', params, { headers: { 'Content-Type': 'application/json' } })
}
// 滚动加载更多
export const getFaceEventData = (params) => {
  return Axios.get(context + '/video/event/faceCapture/list', { params: params }, { headers: { 'Content-Type': 'application/json' } })
}
