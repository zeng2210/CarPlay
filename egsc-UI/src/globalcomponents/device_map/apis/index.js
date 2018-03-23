import Axios from '@/assets/js/AxiosPlugin'

// 代码提交部署时使用/scp-mapapp作上下文
const contextPath = '/scp-mapapp'
// 调试用上下文字段为空
// const contextPath = ''

/**
 * 获取点位信息
 * @param {string} deviceID 设备id
 */
export const getMarkerInfo = deviceID => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getMarkerInfo',
    params: deviceID
  })
}

/**
 * 获取场景信息
 * @param {string} sceneID 场景id
 */
export const getSceneInfo = sceneID => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getSceneInfo',
    params: sceneID
  })
}
