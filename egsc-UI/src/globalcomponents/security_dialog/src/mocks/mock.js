import Mock from 'mockjs'

// 配置mock过滤路径
Mock.mock('/test/mockData', function () {
  return {
    status: 'Mock returned the data'
  }
})
// 配置保安卡片数据
Mock.mock('/gurdCards/list', function () {
  return {
    guarddData: [{
      guardId: 1,
      gurdImg: '',
      guardName: '张三',
      guardWorker: '保安',
      guardPhone: '13600000000',
      guardPostion: '御湖3街12号'
    }, {
      guardId: 2,
      gurdImg: '',
      guardName: '邯郸',
      guardWorker: '保安',
      guardPhone: '13800000000',
      guardPostion: '御湖1街12号'
    }]
  }
})
