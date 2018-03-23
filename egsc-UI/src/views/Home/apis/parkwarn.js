import Axios from '@/assets/js/AxiosPlugin'
// 园区预警条数
const contextParkPath = '/scp-videogatewayapp'
// const contextParkPath = ''
export const getParkWarnCountData = params => {
  return Axios.get(contextParkPath + '/video/event/warningCount/list')
}
// 获取地图点击后预警信息
export const getVideoWarningInfoData = params => {
  return Axios.get(contextParkPath + '/video/event/warning/get', { params: params })
}
// 保安异常初始化条数
export const getGuardWarnCountData = params => {
  return Axios.get('/scp-patrolapp/patrolException/countPatrolException')
}
// 巡更设备异常
export const getPartolAbnorCountData = params => {
  return Axios.get('/scp-patrolapp/patrolDeviceStatus/countDeviceStatus')
}
