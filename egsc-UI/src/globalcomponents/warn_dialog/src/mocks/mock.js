import Mock from 'mockjs'
// 配置mock过滤路径
Mock.mock('/test/mockData', function () {
  return {
    status: 'Mock returned the data'
  }
})
// 模拟首页预警数据
Mock.mock('/parkAroumdWarn/list', function () {
  return Mock.mock({
    'tableData1|3-6': [{
      time: Mock.mock('@datetime'),
      address: Mock.mock('@region'),
      discribe: '发现人员靠近',
      gurdStatus: '未派遣',
      eventStatus: '预警中'
    }],
    'tableData2|5-7': [{
      time: Mock.mock('@datetime'),
      address: Mock.mock('@county()'),
      discribe: '发现人员靠近',
      gurdStatus: '未派遣',
      eventStatus: '预警中'
    }],
    'tableData3|3-5': [{
      time: Mock.mock('@datetime'),
      address: Mock.mock('@county()'),
      discribe: '发现人员靠近',
      gurdStatus: '未派遣',
      eventStatus: '预警中'
    }],
    'tableData4|2-5': [{
      time: Mock.mock('@datetime'),
      address: Mock.mock('@county()'),
      discribe: '发现人员靠近',
      gurdStatus: '未派遣',
      eventStatus: '预警中'
    }]
  })
})
// 根据接口文档模拟预警数据
Mock.mock('/video/event/list11', function () {
  return Mock.mock({
    success: true,
    code: 200,
    data: {
      message: '成功',
      total: 50,
      pageNo: 1,
      'rows|3': [
        {
          eventLogId: '4197c10633a544a2844f91333b6b00cf',
          eventType: 20009,
          eventTypeName: '越界',
          startTime: '2018-01-07 10:41:45',
          endTime: '2018-01-03 10:41:45',
          content: '',
          creator: 'vgc',
          deviceCode: '34020000001320000002',
          deviceName: '摄像头一',
          cameraCode: '监控点编码',
          cameraName: '监控点名称',
          deviceiP: '监控点所属设备IP',
          devicePort: '设备端口',
          resourceCode: '0029',
          eventDescription: '事件描述信息',
          warningStatus: 0,
          warningStatusMessage: '预警中',
          securityStatus: 1,
          securityStatusMessage: '未派遣',
          resourceName: '恒大酒店二楼广州厅',
          eventPlace: '事件发生地点',
          status: 2,
          statusMessage: '事件脉冲',
          imgUrl: 'http://192.168.0.236:9047/VIID/showimages/group1@M00@00@B5@wKgA9lpMQ2GAHY9ZAAgNbsnT0-89943580'
        },
        {
          eventLogId: '4197c10633a544a2844f91333b6b00ca',
          eventType: 20009,
          eventTypeName: '越界',
          startTime: '2018-01-05 10:41:45',
          endTime: '2018-01-03 10:41:45',
          content: '',
          creator: 'vgc',
          deviceCode: '34020000001320000002',
          deviceName: '摄像头一',
          cameraCode: '监控点编码',
          cameraName: '监控点名称',
          deviceiP: '监控点所属设备IP',
          devicePort: '设备端口',
          resourceCode: '0029',
          eventDescription: '事件描述信息',
          warningStatus: 0,
          warningStatusMessage: '预警中',
          securityStatus: '1',
          securityStatusMessage: '未派遣',
          resourceName: '恒大酒店二楼广州厅',
          eventPlace: '事件发生地点',
          status: 2,
          statusMessage: '事件脉冲',
          imgUrl: 'http://192.168.0.236:9047/VIID/showimages/group1@M00@00@B5@wKgA9lpMQ2GAHY9ZAAgNbsnT0-89943580'
        },
        {
          eventLogId: '4197c10633a544a2844f91333b6b00cb',
          eventType: 20009,
          eventTypeName: '越界',
          startTime: '2018-01-05 10:41:45',
          endTime: '2018-01-03 10:41:45',
          content: '',
          creator: 'vgc',
          deviceCode: '34020000001320000002',
          deviceName: '摄像头一',
          cameraCode: '监控点编码',
          cameraName: '监控点名称',
          deviceiP: '监控点所属设备IP',
          devicePort: '设备端口',
          resourceCode: '0029',
          eventDescription: '事件描述信息',
          warningStatus: 0,
          warningStatusMessage: '预警中',
          securityStatus: '1',
          securityStatusMessage: '未派遣',
          resourceName: '恒大酒店二楼广州厅',
          eventPlace: '事件发生地点',
          status: 2,
          statusMessage: '事件脉冲',
          imgUrl: 'http://192.168.0.236:9047/VIID/showimages/group1@M00@00@B5@wKgA9lpMQ2GAHY9ZAAgNbsnT0-89943580'
        },
        {
          eventLogId: '4197c10633a544a2844f91333b6b00cc',
          eventType: 20009,
          eventTypeName: '越界',
          startTime: '2018-01-05 10:41:45',
          endTime: '2018-01-03 10:41:45',
          content: '',
          creator: 'vgc',
          deviceCode: '34020000001320000002',
          deviceName: '摄像头一',
          cameraCode: '监控点编码',
          cameraName: '监控点名称',
          deviceiP: '监控点所属设备IP',
          devicePort: '设备端口',
          resourceCode: '0029',
          eventDescription: '事件描述信息',
          warningStatus: 1,
          warningStatusMessage: '预警已解除',
          securityStatus: '0',
          securityStatusMessage: '预警已解除',
          resourceName: '恒大酒店二楼广州厅',
          eventPlace: '事件发生地点',
          status: 2,
          statusMessage: '事件脉冲',
          imgUrl: 'http://192.168.0.236:9047/VIID/showimages/group1@M00@00@B5@wKgA9lpMQ2GAHY9ZAAgNbsnT0-89943580'
        }
      ]
    }
  })
})
// 解除预警模拟数据
Mock.mock('video/event/batchUpdateWarningStatus11', function () {
  return {
    success: true,
    data: {
    },
    code: 200,
    message: '成功'
  }
})
