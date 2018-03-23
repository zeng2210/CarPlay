import Mock from 'mockjs'

// 配置保安卡片数据
Mock.mock('/mock/video/pie/getAbnormalEventPie', 'get', {
  code: '00000',
  message: '',
  data: {
    managedEvent: 156,
    continueDays: 256,
    abnormalEvents: [{
      name: '园区越界',
      percent: 36,
      count: 35,
      color: '#4C84FF'
    }, {
      name: '亲水平台越界',
      percent: 12,
      count: 46,
      color: '#4ED8DA'
    }, {
      name: '违停、占道',
      percent: 32,
      count: 27,
      color: '#5A6B78'
    }, {
      name: '人员脱岗',
      percent: 6,
      count: 13,
      color: '#FFD100'
    }, {
      name: '人员徘徊',
      percent: 7,
      count: 23,
      color: '#77CD48'
    }]
  }
})
