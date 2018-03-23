import Mock from 'mockjs'

// 业主呼叫记录
Mock.mock('/api/videoOwnerRecord', {
  code: '000',
  totalCount: '100',
  'datas|18': [
    {
      'id|+1': 1, // 内容：npm安装后 mockjs/src/mock/random/xxx.js
      callTime: "@date('yyyy-MM-dd hh:mm:ss')",
      'iscalling|1': Boolean,
      'SerialNumber|+1': 1,
      'type|1': 2,
      'room|1000-10000': 0, // 1000-10000以内随机整数, 0只是用来确定类型
      answerTime: "@date('yyyy-MM-dd')",
      hangupTime: "@date('yyyy-MM-dd')",
      'isLock|1': Boolean
    }
  ]
})

// 单元门呼叫记录
Mock.mock('/api/videoUnitDoorRecord', {
  code: '000',
  totalCount: '100',
  'datas|18': [
    {
      'id|+1': 1, // 内容：npm安装后 mockjs/src/mock/random/xxx.js
      callTime: "@date('yyyy-MM-dd hh:mm:ss')",
      'iscalling|0.5': Boolean,
      'SerialNumber|+1': 1,
      'type|1': 2,
      'room|1000-10000': 0, // 1000-10000以内随机整数, 0只是用来确定类型
      answerTime: "@date('yyyy-MM-dd')",
      hangupTime: "@date('yyyy-MM-dd')",
      'isLock|1': Boolean
    }
  ]
})
