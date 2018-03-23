import Axios from '@/assets/js/AxiosPlugin'
// 获取男女比例
export function getGenderList (data) {
  return Axios({
    url: '/scp-mdmapp/user/getSexAndAge',
    method: 'get',
    params: data
  })
}

// 字典查询
export function getDictItem (data) {
  return Axios({
    url: '/scp-mdmapp/dict/getDictItemMap',
    method: 'get',
    params: data
  })
}

// 查询人行流量
export const getData = () => { return Axios.get('/scp-accesscontrolapp/report/getData').then(res => res.data) }
// 查询车流量
export const getCarTraffic = reportType => { return Axios.get('/scp-parkinglotapp/parkReportMgmt/getCarTraffic').then(res => res.data) }

// 查询车位
export function getCarPortInfo (data) {
  return Axios({
    url: '/scp-parkinglotapp/parkReportMgmt/getCarPortInfo',
    method: 'get',
    params: data
  })
}
