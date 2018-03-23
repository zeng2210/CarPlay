import Axios from '../../../../assets/js/AxiosPlugin'

const contextPath = '/scp-patrolapp'
// const contextPath = ''
// 获取巡更设备异常列表
export const getPartolAbnorData = (params) => {
  return Axios.get(contextPath + '/patrolDeviceStatus/listDeviceStatus', { params: params })
}
// 解除设备异常预警接口
export const postPartolDeviceDissmissData = (params) => {
  return Axios.post(contextPath + '/patrolDeviceStatus/updateDeviceStatus', params)
}
// 发送消息接口
export const postGuardAbnormalSentMessData = (params) => {
  return Axios.post('/scp-patrolapp/patrolMessage/sendDeviceMsg', params)
}
