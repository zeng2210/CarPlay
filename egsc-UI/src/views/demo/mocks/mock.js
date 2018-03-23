import Mock from 'mockjs'
// 引用子模块的mock文件
import '@/views/demo/mocks/mock.js'

// 配置mock过滤路径
Mock.mock('/test/mockData', function() {
  return {
    status: 'Mock returned the data'
  }
})
// 查询用户
Mock.mock(
  '/demo/user/queryPageData?currentPage=1&pageSize=10&userId=9008',
  function() {
    console.log('mock query user')
    return {
      pageCount: 2,
      user: [
        {
          id: '11',
          userName: '1',
          userCode: '11'
        },
        {
          id: '12',
          userName: '2',
          userCode: '12'
        }
      ]
    }
  }
)

// 添加用户
Mock.mock('/demo/user/create', function() {
  console.log('mock create user')
  return {}
})
// 删除用户
Mock.mock('/demo/user/delete?userId=11', function() {
  console.log('mock delete user')
  return {}
})
// 修改用户
Mock.mock('/demo/user/update', function() {
  console.log('mock update user')
  return {}
})
