import Axios from '@/assets/js/AxiosPlugin'

const contextPath = '/scp-searchenginecomponent'

/**
 * 搜索摄像头
 * @param keyword 查询关键字
 */
export const getCameraList = (keyword) => {
  return Axios.get(contextPath + '/searchengine/getCameraList?cameraName=' + encodeURIComponent(keyword))
    .then(res => res.data)
}

/**
 * 上传图片
 * @param data
 */
export const uploadImage = (data) => {
  return Axios.post(contextPath + '/searchengine/uploadPeopleImage', data)
    .then(res => res.data)
}

/**
 * 以图搜图
 */
export const searchImage = (url) => {
  return Axios.get(contextPath + '/searchengine/getPeopleImageList?url=' + url)
    .then(res => {
      console.log('searchImage res: ')
      console.info(res)
      return res.data
    })
}

/**
 * 搜索姓名
 * @param keyword 查询关键字
 */
export const getUserList = (keyword) => {
  return Axios.get(contextPath + '/searchengine/getPeopleAccessInfoList?peopleName=' + encodeURIComponent(keyword))
    .then(res => res.data)
}

/**
 * 搜索巡更设备
 * @param keyword 查询关键字
 */
export const getDeviceList = (keyword) => {
  return Axios.get(contextPath + '/searchengine/getPatrolEqpmtList?patrolEqpmtNum=' + encodeURIComponent(keyword))
    .then(res => res.data)
}

/**
 * 搜索车
 * @param keyword 查询关键字
 */
export const getCarList = (keyword) => {
  return Axios.get(contextPath + '/searchengine/getVehicleList?vehicleNum=' + encodeURIComponent(keyword))
    .then(res => res.data)
}
/**
 * 搜索全部
 * @param keyword 查询关键字
 */
export const getAllList = (keyword) => {
  return Axios.get(contextPath + '/searchengine/getAllInfoList?inputValue=' + encodeURIComponent(keyword))
    .then(res => res.data)
}

/**
 * 查询搜索历史记录
 */
export const getHistory = () => {
  return Axios.get(contextPath + '/searchhistory/getSearchHistoryList')
    .then(res => res.data)
}

/**
 * 给巡更设备发送消息
 */
export const sendMessage = (deviceId, msg) => {
  return Axios.post(contextPath + '/searchengine/sendMsgToPatrolEqpmt?deviceId=' + deviceId + '&msgContent=' + encodeURIComponent(msg))
    .then(res => res.data)
}
