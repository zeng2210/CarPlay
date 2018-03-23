import Mock from 'mockjs'
// import { prePath } from '../apis/index.js'
// 配置mock过滤路径
Mock.mock('/test/mockData', function () {
  return {
    status: 'Mock returned the data'
  }
})
// 模拟首页预警数据
// Mock.mock('/parkAroumdWarn/list', function () {
//   return Mock.mock({
//     'tableData1|3-6': [{
//       time: Mock.mock('@datetime'),
//       address: Mock.mock('@region'),
//       discribe: '发现人员靠近',
//       gurdStatus: '未派遣',
//       eventStatus: '预警中'
//     }],
//     'tableData2|5-7': [{
//       time: Mock.mock('@datetime'),
//       address: Mock.mock('@county()'),
//       discribe: '发现人员靠近',
//       gurdStatus: '未派遣',
//       eventStatus: '预警中'
//     }],
//     'tableData3|3-5': [{
//       time: Mock.mock('@datetime'),
//       address: Mock.mock('@county()'),
//       discribe: '发现人员靠近',
//       gurdStatus: '未派遣',
//       eventStatus: '预警中'
//     }],
//     'tableData4|2-5': [{
//       time: Mock.mock('@datetime'),
//       address: Mock.mock('@county()'),
//       discribe: '发现人员靠近',
//       gurdStatus: '未派遣',
//       eventStatus: '预警中'
//     }]
//   })
// })
// 根据接口文档模拟预警数据
// Mock.mock(prePath + 'event/list', function () {
//   return Mock.mock({
//     success: true,
//     data: {
//       code: 200,
//       message: '成功',
//       total: 50,
//       pageNo: 1,
//       'rows|9': [
//         {
//           uuid: '4197c10633a544a2844f91333b6b00cf',
//           eventType: 30009,
//           eventTypeName: '越界',
//           createTime: '2018-01-07 10:41:45',
//           eventTime: '2018-01-03 10:41:45',
//           creator: 'vgc',
//           deviceCode: '34020000001320000002',
//           orgName: '事件描述信息1',
//           eventStatus: '1',
//           securityStatus: 0,
//           securityStatusMessage: '未派遣',
//           resourceName: '恒大酒店二楼广州厅',
//           description: '事件发生地点',
//           imgUrl: 'http://192.168.0.236:9047/VIID/showimages/group1@M00@00@B5@wKgA9lpMQ2GAHY9ZAAgNbsnT0-89943580'
//         },
//         {
//           uuid: '4197c10633a544a2844f91333b6b00cf',
//           eventType: 30009,
//           eventTypeName: '越界',
//           createTime: '2018-01-07 10:41:45',
//           eventTime: '2018-01-03 10:41:45',
//           creator: 'vgc',
//           deviceCode: '34020000001320000002',
//           orgName: '事件描述信息1',
//           eventStatus: 0,
//           securityStatus: 0,
//           securityStatusMessage: '未派遣',
//           resourceName: '恒大酒店二楼广州厅',
//           description: '事件发生地点',
//           imgUrl: 'http://192.168.0.236:9047/VIID/showimages/group1@M00@00@B5@wKgA9lpMQ2GAHY9ZAAgNbsnT0-89943580'
//         }
//       ]
//     }
//   })
// })
// Mock.mock('/scp-accesscontrolapp/AlarmEvent/queryAlarmList', function () {
//   return Mock.mock({
//     'rows|9': [
//       {
//         uuid: '4197c10633a544a2844f91333b6b00cf',
//         eventType: 30009,
//         eventTypeName: '越界',
//         createTime: '2018-01-07 10:41:45',
//         eventTime: '2018-01-03 10:41:45',
//         creator: 'vgc',
//         deviceCode: '34020000001320000002',
//         orgName: '事件描述信息1',
//         eventStatus: 0,
//         securityStatus: 0,
//         securityStatusMessage: '未派遣',
//         resourceName: '恒大酒店二楼广州厅',
//         description: '事件发生地点',
//         imgUrl: 'http://192.168.0.236:9047/VIID/showimages/group1@M00@00@B5@wKgA9lpMQ2GAHY9ZAAgNbsnT0-89943580'
//       },
//       {
//         uuid: '4197c10633a544a2844f91333b6b00cf',
//         eventType: 30009,
//         eventTypeName: '越界',
//         createTime: '2018-01-07 10:41:45',
//         eventTime: '2018-01-03 10:41:45',
//         creator: 'vgc',
//         deviceCode: '34020000001320000002',
//         orgName: '事件描述信息',
//         eventStatus: 0,
//         securityStatus: 0,
//         securityStatusMessage: '未派遣',
//         resourceName: '恒大酒店二楼广州厅',
//         description: '事件发生地点',
//         imgUrl: 'http://192.168.0.236:9047/VIID/showimages/group1@M00@00@B5@wKgA9lpMQ2GAHY9ZAAgNbsnT0-89943580'
//       }
//     ]
//   })
// })
