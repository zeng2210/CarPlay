import Axios from '@/assets/js/AxiosPlugin'
// 查询未处理预警数
export const getEntranceWarnCount = deviceType => {
  return Axios.get(
    '/scp-accesscontrolapp/AlarmEvent/queryAlarmEventCount?deviceType=' + deviceType
  ).then(res => res.data)
}
