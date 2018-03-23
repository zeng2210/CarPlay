import Axios from '@/assets/js/AxiosPlugin'

// 代码提交部署时使用/scp-mapapp作上下文
const contextPath = '/scp-mapapp'
// 调试用上下文字段为空
// const contextPath = ''
/**
 * 获取点位列表
 * @param {obj} data 包含sceneId属性的对象
 */
export const getMarkerListData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getMarkerList',
    params: data
  })
}

/**
 * 获取区域列表
 * @param {obj} data 包含sceneId属性的对象
 */
export const getAreaListData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getAreaList',
    params: data
  })
}

/**
 * 获取场景信息
 * @param {obj} data 包含sceneId属性的对象
 */
export const getSceneInfoData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getSceneInfo',
    params: data
  })
}

/**
 * 获取安保人员位置信息
 * @param {obj} data
 * {
 *  sceneId: '5da6dc1bb22a4913ba17fe37915d837c' 必填
 *  hasTask: 'true' 选填, 默认为空字符串, 查询全部保安, 非空字符串时查询有任务的保安
 * }
 */
export const getSecurityListData = data => {
  return Axios({
    method: 'get',
    url: '/scp-patrolapp/patrolDeviceManage/listDeviceUser',
    params: data
  })
}

/**
 * 获取场景列表
 * @param {obj} data 包含场景type属性的对象
 */
export const getSceneListData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getSceneList',
    params: data
  })
}

// MapInit.vue的日志标签
export const LOG_TAG = '[MapInit] '
