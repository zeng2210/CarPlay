import Axios from '@/assets/js/AxiosPlugin'
let context = '/scp-videogatewayapp'
// let context = ''
// 发送到云平台
export const getvideoRecordData = (params) => {
  return Axios.get(context + '/video/record/list', { params: params }).then(res => res.data)
}
