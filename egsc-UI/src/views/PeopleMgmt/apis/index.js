import Axios from '@/assets/js/AxiosPlugin'

const contextParkPath = '/scp-patrolapp'
// const contextParkPath = ''

// 真实数据
// 获取场景列表
export const getSceneListData = () => {
  return Axios.get(contextParkPath + '/redLineManage/listSceneId').then(res => res.data)
}

// 查询所有红线点
export const getRedPointsData = params => {
  return Axios.get(contextParkPath + '/redLineManage/listRedPoint', { params: params }).then(res => res.data)
}

// 当前有任务的设备及人员列表
export const getGardenSecurityData = params => {
  return Axios.get(contextParkPath + '/patrolDeviceManage/listDeviceUser', { params: params })
}

// 获取任务信息
export const getGuardeDetailData = params => {
  return Axios.get(contextParkPath + '/patrolTaskMng/listHistoryPoints', { params: params })
}

// 解除警报
export const postClosePoliceData = (params) => {
  return Axios.post(contextParkPath + '/patrolTaskPoint/updateTaskPoint', params)
}

// 发消息
export const postPushMessageData = (params) => {
  return Axios.post(contextParkPath + '/patrolMessage/sendDeviceMsg', params)
}
// 根据路线id查询巡查路线地图信息
export const getPatrolRouteData = (params) => {
  return Axios.get(contextParkPath + '/patrolRouteManage/getPatrolRoute', { params: params })
}
// 根据id查历史巡查点
export const getHistoryTaskPointData = (params) => {
  return Axios.get(contextParkPath + '/patrolTaskPoint/getTaskPoint', { params: params })
}
// 更新保安点位Gps信息
export const updateSecurityGpsData = (params) => {
  return Axios.get(contextParkPath + '/patrolGpsEvent/listDeviceGps', { params: params })
}
