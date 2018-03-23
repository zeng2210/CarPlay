import Axios from '@/assets/js/AxiosPlugin'
let context = '/scp-videogatewayapp'
// let context = ''

// 获取列表数据
// 真实接口
export const getVideoData = () => {
  return Axios.get(context + '/organization/device/getOrganizations').then(res => res.data)
}
// allvideo 二次ocx数据二次请求
export const getVideoListData = pramas => {
  return Axios.get(context + '/organization/device/getCameraByOrgId?orgId=' + pramas).then(res => res.data)
}
// allvideo 分页数据ocx
export const postVideoListData = pramas => {
  return Axios.post(context + '/organization/device/getCameraPageByOrgId', pramas)
}
// customizeVideo 请求方式列表
export const getCustomGrounpData = () => {
  return Axios.get(context + '/custom/group/list').then(res => res.data)
}
export const getCustomVideoData = (params) => {
  return Axios.get(context + '/custom/group/videos/list', { params: params })
}
// 获取异常分组视频
export const getAbnormalVideoData = (params) => {
  // return Axios.get(context + '/monitor-mock/video/event/warning/general/list', { params: params }).then(res => res.data)
  return Axios.get(context + '/video/event/warning/general/list', {
    params: params
  }).then(res => res.data)
}
// 获取异常视频
export const getAbnormalVideosData = (params) => {
  // return Axios.get(context + '/monitor-mock/video/event/warnings/list', { params: params }).then(res => res.data)
  return Axios.get(context + '/video/event/warnings/list', {
    params: params
  }).then(res => res.data)
}
// 获取鹰眼设备
export const getEagleEyeData = () => {
  return Axios.get(context + '/organization/device/getEagleEyeDeviceList').then(res => res.data)
}
// 获取异常视频数据
export const getAbnormalData = (params) => {
  return Axios.get(context + '/video/event/warning/all/list', {
    params: params
  }).then(res => res.data)
}
