import Axios from '../../../../assets/js/AxiosPlugin'
let ip = '192.168.1.1'
let port = '50000'
export const prePath = 'http://' + ip + ':' + port + '/contex/video/'

export const parkAroundWarnList = (params) => {
  return Axios.get('/parkAroumdWarn/list', params,
    {
      headers: { 'Content-Type': 'application/json' }
    })
}

export const warnEventList = (params) => {
  return Axios.post(prePath + 'event/list', params,
    {
      headers: { 'Content-Type': 'application/json' }
    })
}
// 查询预警事件列表
export const queryAlertList = (deviceType, currentPage, pageSize, firstPageCount, clickTime) => {
  return Axios.get('/scp-accesscontrolapp/AlarmEvent/queryAlarmList?deviceType=' + deviceType + '&currentPage=' + currentPage + '&pageSize=' + pageSize + '&firstPageCount=' + firstPageCount + '&clickTime=' + clickTime
  ).then(res => res.data)
}

export const releaseAlarm = (params) => {
  return Axios.post('/scp-accesscontrolapp/AlarmEvent/releaseAlarm', params,
    {
      headers: { 'Content-Type': 'application/json' }
    })
}
