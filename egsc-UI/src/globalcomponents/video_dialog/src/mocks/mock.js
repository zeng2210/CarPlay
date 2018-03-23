import Mock from 'mockjs'

// 配置mock过滤路径
Mock.mock('/test/mockData', function () {
  return {
    status: 'Mock returned the data'
  }
})
// 配置保安卡片数据
Mock.mock('/gurdlist/info', function () {
  return {
    tableData: [{
      guardId: 1,
      name: '王小虎',
      distance: '距离200米',
      status: '正常'
    }, {
      guardId: 2,
      name: '刘强',
      distance: '距离400米',
      status: '正常'
    }]
  }
})
// ocx请求
Mock.mock('/allVideo/Videolist', function (val) {
  console.log(val)
  return {
    'code': '200',
    'data': [{
      'total': 1,
      'pageNo': 1,
      'pageSize': 10,
      'rows': [
        {
          'deviceID': '34020000001320000001',
          'deviceName': 'camera',
          'deviceDesc': 'IPC枪机',
          'deviceTypeCode': '2001',
          'deviceTypeName': 'camera',
          'orgID': '50ee7595f5994a3e9807f2a00889fc56',
          'orgName': '恒大山水城恒大酒店poc12F广州厅',
          'deviceIP': '192.168.199.8',
          'devicePort': '5060',
          'installAddress': '恒大酒店二楼广州厅',
          'providerCode': '1001',
          'subDeviceID': '34020000001320000123',
          'subDeviceName': 'camera_video_channel',
          'subDeviceDesc': 'IPC枪机通道一',
          'uuid': null,
          'templateId': null
        }
      ]
    }],
    'message': 'Success!'
  }
})
let isMock = 'false' // 打开mock时置为''
// 获取预置点
Mock.mock('/scp-videogatewayapp/presetCruise/preset/list' + isMock, function () {
  return Mock.mock({
    'code': '200',
    'data|255': [
      {
        'presetCruiseName|+1': '预置点' + 255,
        'ptzCmd': 'A50F4D8200010084'
      }
    ]
  })
})
// 获取巡航点
Mock.mock('/scp-videogatewayapp/presetCruise/cruise/list' + isMock, function () {
  return Mock.mock({
    'code': '200',
    'data|8': [
      {
        'presetCruiseName': '巡航路径1',
        'ptzCmd': 'A50F4D880100008A'
      }
    ]
  })
})
// 开始预置点巡航点
Mock.mock('/scp-videogatewayapp/presetCruise/cruise/start' + isMock, function () {
  return {
    'code': '200',
    'data': []
  }
})
// 停止预置点巡航
Mock.mock('/scp-videogatewayapp/presetCruise/cruise/stop' + isMock, function () {
  return {
    'code': '200',
    'data': []
  }
})
// 滚动加载更多的数据
Mock.mock('video/event/batchUpdateWarningStatus', function () {
  return Mock.mock({
    success: true,
    'data|10': [
      {
        'url': '/static/img/face.3b125dd.png'
      }
    ],
    code: 200,
    message: '成功',
    hasNext: true,
    timeStamp: '1518056092172'

  })
})
