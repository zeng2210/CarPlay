import Axios from '@/assets/js/AxiosPlugin'
let context = '/scp-videogatewayapp'
// let context = ''
// 获取ocx控件需要的数据
export const getPlaybackData = params => {
  return Axios.get(context + '/video/record/list', { params: params }).then(res => res.data)
}
