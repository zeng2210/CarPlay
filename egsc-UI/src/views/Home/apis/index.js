import Axios from '@/assets/js/AxiosPlugin'
// 查询未处理预警数
export const getEntranceWarnCount = deviceType => {
  return Axios.get(
    '/scp-accesscontrolapp/AlarmEvent/queryAlarmEventCount?deviceType=' +
      deviceType
  ).then(res => res.data)
}

// 查询车位占用和车辆异常预警数量
export const getParkinglotWarnCount = type => {
  return Axios.get(
    '/scp-parkinglotapp/parkingLotMonitor/queryParkinglotWarnCount?type=' +
    type
  )
}
