import Axios from '@/assets/js/AxiosPlugin'

// 查询门禁预警列表
export const getMockDateList = () => {
  return Axios.get('/ParkingLot/mockData/getAccessList').then(res => res.data)
}
// 解除门禁mock
export const endParkingLot = () => {
  return Axios.get('/ParkingLot/mockData/updateEventStatus').then(res => res.data)
}

// 查询车场下拉
export const parkingSelect = () => {
  return Axios.get('/ParkingLot/mockData/parkingSelect').then(res => res.data)
}

//  查询车场区域下拉
export const getParkinglot = () => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkinglot'
  ).then(res => res.data)
}

//  查询地图上的区域信息
export const queryStyleData = () => {
  return Axios.get('/ParkingLot/mockData/queryStyleData').then(res => res.data)
}

//  查询车场首页地图
export const getParkinglotFloor = (orgId) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkinglotFloor?orgId=' + orgId).then(res => res.data)
}

// export const getParkinglotFloor = () => {
//   return Axios.get('/ParkingLot/mockData/getParkinglotFloor').then(res => res.data)
// }

//  查询车场内页地图
export const getParkinglotArea = (sceneId) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkinglotArea?sceneId=' + sceneId).then(res => res.data)
}

// export const getParkinglotArea = () => {
//   return Axios.get('/ParkingLot/mockData/getParkinglotArea').then(res => res.data)
// }

export const getAlarmCount = (orgId) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkinglotFloor?orgId=' + orgId
  ).then(res => res.data)
}

export const getCarPlaceCount = () => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/totalParkSeat'
  ).then(res => res.data)
}

// 根据车牌获取车辆信息 增加车位编号参数
export const queryCarInfo = (carNo, parkSeatCode) => {
  // return Axios.get('/ParkingLot/mockData/queryCarInfo').then(res => res.data)
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkCarInfo?carNo=' + encodeURIComponent(carNo) + '&parkSeatCode=' + parkSeatCode).then(res => res.data)
}
// 地图上查询单个警告
export const getParkinglotOccupied = (id) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkSeatOccupiedAlarm?id=' + id).then(res => res.data)
}
export const getParkinglotCarException = (id) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getCarPatkingLongTimeAlarm?id=' + id).then(res => res.data)
}
export const getParkArrearsWarn = (id) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkSeatExpiredAlarm?id=' + id).then(res => res.data)
}
export const getParkTimeEndWarn = (id) => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkSeatExpiringAlarm?id=' + id).then(res => res.data)
}
