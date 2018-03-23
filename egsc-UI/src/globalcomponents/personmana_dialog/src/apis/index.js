import Axios from '../../../../assets/js/AxiosPlugin'

// 保安异常接口
export const getGuardAbnormalListData = (params) => {
  return Axios.get('/scp-patrolapp/patrolException/listPatrolException', { params: params })
}
// 查询保安在线人数
export const getGuardOnlineNumData = (params) => {
  return Axios.get('/scp-patrolapp/patrolDeviceManage/countOnlineNum', { params: params })
}
// 批量解除保安异常预警
export const postMultipleDissmissData = (params) => {
  return Axios.post('/scp-patrolapp/patrolException/removeAlarm', params)
}
// 发送消息接口
export const postGuardAbnormalSentMessData = (params) => {
  return Axios.post('/scp-patrolapp/patrolMessage/sendDeviceMsg', params)
}
