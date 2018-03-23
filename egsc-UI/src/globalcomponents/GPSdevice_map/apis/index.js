import Axios from '@/assets/js/AxiosPlugin'

// 代码提交部署时使用/scp-mapapp作上下文
const contextPath = '/scp-mapapp'
// 调试用上下文字段为空
// const contextPath = ''

/**
 * 获取场景列表
 * @param {string} sceneType 场景类型
 */
export const getSceneList = sceneType => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getSceneList',
    params: sceneType
  })
}
