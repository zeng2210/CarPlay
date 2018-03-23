import Mock from 'mockjs'

// 配置mock过滤路径
// 模拟后台调控当前音量接口
Mock.mock('/broadcast/volume/upOrDown', function() {
  return {
    data: {
      status: '音量提交成功'
    }
  }
})

// 模拟查询当前音量接口
Mock.mock('/broadcast/volume/search/0', function() {
  return {
    code: '00000',
    message: '音量查询',
    data: {
      volumeId: null,
      vol: 15,
      devip: null,
      playAreaId: null,
      deviceId: null
    }
  }
})

// // 模拟查询音量以及正在播放歌曲
// Mock.mock('/scp-broadcastapp/map/search', function() {
//   return {
//     code: '00000',
//     data: {
//       audioclipName: '歌曲名',
//       sessionId: 1,
//       vol: 5,
//       status: 1
//     }
//   }
// })

// // 模拟上一首/下一首
// Mock.mock('/scp-broadcastapp/map/lastOrNext', function() {
//   return {
//     code: '00000',
//     data: {
//       audioclipName: '歌曲名2',
//       sessionId: 1
//     }
//   }
// })

// // 模拟播放暂停
// Mock.mock('/scp-broadcastapp/map/startOrStop', function() {
//   return {
//     code: '00000',
//     data: {
//       audioclipName: '歌曲名1',
//       sessionId: 1
//     }
//   }
// })

// // 模拟修改音量
// Mock.mock('/scp-broadcastapp/map/volume/upOrDown', function() {
//   return {
//     data: {
//       audioclipName: '歌曲名3',
//       sessionId: 1
//     }
//   }
// })
