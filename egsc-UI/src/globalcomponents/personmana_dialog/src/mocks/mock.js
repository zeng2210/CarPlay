import Mock from 'mockjs'

// 配置mock过滤路径
Mock.mock('/test/mockData', function () {
  return {
    status: 'Mock returned the data'
  }
})
// 配置保安数据
Mock.mock('/patrolException/listPatrolException123', function () {
  return Mock.mock({
    message: 'xxx',
    code: 200,
    data: {
      total: 100,
      'rows|10': [{
        taskId: 'xxx',
        alarmType: 'xxx',   // 0-超时预警 1-越界预警  aa
        deviceName: '',
        deviceId: '1231145555',
        userName: '张三',
        phone: '12355000000',
        taskName: '',
        alarmId: '越界预警ID',
        historyPointId: '历史巡查点ID',
        status: '',    // 0:未巡查 1:已巡查 2:超时未巡查 预警中 3:超时已巡查 预警解除 4：越界预警中 5：越界预警已解除”,
        reason: '原因',
        happenTime: '2018-01-30 12:00:00',
        courtUuid: '',
        createUser: '',
        updateUser: '',
        updateTime: '',
        statusDetail: '预警中',
        alarmAddr: '广州',
        alarmDetail: '越界'
      }]
    }
  })
})
