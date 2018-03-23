import Mock from 'mockjs'
// 配置mock过滤路径
Mock.mock('/test/mockData', function () {
  return {
    status: 'Mock returned the data'
  }
})
// 模拟首页车位占用
// Mock.mock('/scp-parkinglotapp/parkingLotMonitor/queryParkSeatOccupiedAlarm?currentPage=1&type=&id=', function () {
//   return Mock.mock({
//     data: {
//       'result|3-6': [{
//         parkSeatCode: 'A93',
//         nowStopCarNum: '粤B-3096',
//         occupiedTime: Mock.mock('@datetime'),
//         'ownerName|+1': /^([\u4e00-\u9fa5]){2,7}$/,
//         // 'ownerUserName|+1': Mock.mock('@cname()'),
//         ownerPhone: /^1[0-9]{10}$/,
//         'dispatchState|+1': [0, 1],
//         'alarmState|+1': [0, 1],
//         pictureUrl: ''
//       }]
//     }
//   })
// })
// // 模拟车辆超时停放
// Mock.mock('/scp-parkinglotapp/parkingLotMonitor/queryCarPatkingLongTimeAlarm', function () {
//   return Mock.mock({
//     'data|3-6': [{
//       parkSeatCode: 'A93',
//       carNum: '粤B-3096',
//       inTime: Mock.mock('@datetime'),
//       patkingTime: '2天',
//       cash: '180元',
//       'dispatchState|+1': [0, 1],
//       'alarmState|+1': [0, 1],
//       pictureUrl: ''
//     }]
//   })
// })
Mock.mock('/scp-accesscontrolapp/parkinglot/queryParkArrearsWarnData', function () {
  return Mock.mock({
    'rows|3-20': [{
      parkSeat: 'A93',
      clientName: /^([\u4e00-\u9fa5]){2,7}$/,
      parkSeatType: '固定车位',
      parkFee: '80',
      'payStatus|+1': [0, 1],
      lackFee: /^[0-9]{2}$/
    }]
  })
})

Mock.mock('/scp-accesscontrolapp/parkinglot/queryParkTimeEndWarmData', function () {
  return Mock.mock({
    'rows|3-6': [{
      parkSeat: 'A93',
      escption: '即将到期',
      escptTime: Mock.mock('@datetime'),
      clientName: /^([\u4e00-\u9fa5]){2,7}$/,
      clientTel: /^1[0-9]{10}$/,
      leftDays: /^[0-9]{1}$/
    }]
  })
})
// // 首页车位占用数字
// Mock.mock('/scp-parkinglotapp/parkingLotMonitor/queryParkinglotWarnCount?type=1', function () {
//   return Mock.mock({
//     message: '预警数量',
//     code: '00000',
//     data: 20
//   })
// })
// // 首页车辆异常
// Mock.mock('/scp-parkinglotapp/parkingLotMonitor/queryParkinglotWarnCount?type=2', function () {
//   return Mock.mock({
//     message: '预警数量',
//     code: '00000',
//     data: 30
//   })
// })
