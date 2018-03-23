import Axios from '@/assets/js/AxiosPlugin'
// websocket地址
export const WEB_SOCKET_URL = 'ws://127.0.0.1:8082/scp-accesscontrolapp/websocket'

// 获取园区大门
export const allOrg = params => { return Axios.get('scp-accesscontrolapp/record/gate/orgs', params).then(res => res.data) }

// 获取开门记录
export const gateRecords = params => { return Axios.post('scp-businesscommonapp/track/list', params).then(res => res.data) }

// 获取大门人流数据统计
export const gateStatistics = params => { return Axios.get('scp-accesscontrolapp/record/statis', params).then(res => res.data) }

// 获取大门人流数据统计
export const queryUserById = params => { return Axios.get('scp-accesscontrolapp/record/user/one', params).then(res => res.data) }

// 获取大门人流数据统计
export const imageUrl = params => { return Axios.get('scp-accesscontrolapp/record/image?imageId=' + params.imageId).then(res => res.data) }

// 查询全景相机上的图片ID
export const queryIPCImageId = params => { return Axios.get('scp-accesscontrolapp/record/fullViewIPCImageId', params).then(res => res.data) }

// 字典查询
export function getDictItem (data) {
  return Axios({
    url: '/scp-mdmapp/dict/getDictItemMap',
    method: 'get',
    params: data
  })
}
