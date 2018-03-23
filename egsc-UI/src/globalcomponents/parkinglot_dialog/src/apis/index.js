import Axios from '@/assets/js/AxiosPlugin'
const queryParkinglotOccupiedData = (currentPage, type, id) => {
  // return Axios.get('/scp-parkinglotapp/parkingLotMonitor/queryParkSeatOccupiedAlarm?currentPage=' + currentPage + '&type=' + type + '&id=' + id
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/queryParkSeatOccupiedAlarm?currentPage=' + currentPage + '&type=' + type + '&id=' + id
  ).then(res => res.data)
}
const queryParkinglotCarExceptionData = (currentPage, type, id) => {
  // return Axios.get('/scp-parkinglotapp/parkingLotMonitor/queryCarPatkingLongTimeAlarm?currentPage=' + currentPage + '&type=' + type + '&id=' + id
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/queryCarPatkingLongTimeAlarm?currentPage=' + currentPage + '&type=' + type + '&id=' + id
  ).then(res => res.data)
}
const queryParkArrearsWarnData = (currentPage, type, id, carportType) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/queryParkSeatExpiredAlarm?currentPage=' + currentPage + '&type=' + type + '&id=' + id + '&carportType=' + carportType
  ).then(res => res.data)
}
const queryParkTimeEndWarmData = (currentPage, type, id) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/queryParkSeatExpiringAlarm?currentPage=' + currentPage + '&type=' + type + '&id=' + id
  ).then(res => res.data)
}
export const releaseAlarm = (params) => {
  return Axios.post('/scp-parkinglotapp/parkingLotMonitor/releaseAlarm', params
  ).then(res => res.data)
}
export const sendPhoneMsg = (phoneNum, msg) => {
  console.log('phoneNum:' + phoneNum + ', msg:' + msg)
  return Axios.post('/scp-parkinglotapp/common/sendPhoneMsg?phoneNum=' + phoneNum + '&msg=' + encodeURIComponent(msg)).then(res => res.data)
}
export const getGurdlistInfo = (params) => {
  return Axios.get('/gurdlist/info', params, { headers: { 'Content-Type': 'application/json' } })
}
export default {
  queryParkinglotOccupiedData, queryParkinglotCarExceptionData, queryParkArrearsWarnData, queryParkTimeEndWarmData, releaseAlarm
}
