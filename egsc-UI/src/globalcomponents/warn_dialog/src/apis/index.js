import Axios from '../../../../assets/js/AxiosPlugin'
const contextPath = '/scp-videogatewayapp'
// const contextPath = ''
// 获取园区安全预警列表
export const getWarnEventListData = (params) => {
  return Axios.get(contextPath + '/video/event/list', { params: params })
}
// 解除预警
export const postUpdateEvtWarnStatusData = (params) => {
  return Axios.post(contextPath + '/video/event/warningStatus/batchUpdate', params)
}
