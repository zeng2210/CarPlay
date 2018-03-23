import Mock from 'mockjs'
// // 引用子模块的mock文件
// import '@/views/demo/mocks/mock.js'

Mock.mock('/redLineManage/listSceneId', 'get', {
  'code': '0',
  'data': [
    {
      'sceneType': '1',
      'options': [
        {
          'courtUuid': 'UNKOWN',
          'orgName': '37栋',
          'centerLon': 116.121332,
          'sceneName': 'Mock小区全图_勿删',
          'scale': 200,
          'updateUser': 'admin',
          'updateTime': 1517395279295,
          'url': 'http://192.168.0.246:8888/group1/M00/0B/07/wKgA9lpvHXWAMXaPABVqJoQfUZE352.png',
          'deleteFlag': 1,
          'createTime': 1517231477298,
          'scaleType': 1,
          'sceneType': 1,
          'countWarning': 3,
          'orgCode': '42e7c47696d8496a8c32a3e095c37e9c',
          'parentArea': '',
          'width': 960,
          'createUser': 'testUser',
          'centerLat': 45.123343,
          'id': 'b8b286b23a5c4336a3568321a5b92356',
          'height': 0
        }
      ]
    },
    {
      'sceneType': '4',
      'options': [
        {
          'realHeight': 950,
          'courtUuid': 'UNKOWN',
          'orgName': '梯控期',
          'sceneName': 'weryup-改',
          'scale': 9736,
          'updateUser': 'admin',
          'updateTime': 1517407270517,
          'url': 'http://192.168.0.246:8888/group1/M00/0C/C4/wKgA9lpxzCaAELb4AAwi051sk34660.jpg',
          'deleteFlag': 1,
          'createTime': 1517392036191,
          'scaleType': 2,
          'sceneType': 4,
          'orgCode': '',
          'width': 0,
          'createUser': 'testUser',
          'id': '3c7891bbca60447d94714135bbd7df65',
          'realWidth': 2630,
          'height': 0
        },
        {
          'courtUuid': 'UNKOWN',
          'orgName': 'fg',
          'sceneName': '猜猜',
          'updateUser': 'admin',
          'updateTime': 1517403709924,
          'url': 'http://192.168.0.246:8888/group1/M00/0C/49/wKgA9lpxaP-AZ1RHAAK8hml0w74008.jpg',
          'deleteFlag': 1,
          'createTime': 1517381874589,
          'sceneType': 4,
          'orgCode': '',
          'parentArea': 'c534c4dd6d114c8eb744c5db5ddc51d2',
          'width': 1920,
          'createUser': 'testUser',
          'id': 'bde830470e0a4965a478992bc59e9ec6',
          'height': 0
        },
        {
          'courtUuid': 'UNKOWN',
          'orgName': 'fg',
          'centerLon': 0,
          'sceneName': 'wqewq',
          'scale': 0,
          'updateUser': 'admin',
          'updateTime': 1517381388328,
          'url': 'http://192.168.0.246:8888/group1/M00/0C/45/wKgA9lpxZxaACZs3AAD_oETcWo0217.jpg',
          'deleteFlag': 1,
          'createTime': 1517381386072,
          'scaleType': 1,
          'sceneType': 4,
          'orgCode': '43dfcf78f94a42229b69caeb8d289eeb',
          'width': 746,
          'createUser': 'testUser',
          'centerLat': 0,
          'id': '827e8135c6ea4c4482b683243f727ec7',
          'height': 470
        },
        {
          'realHeight': 600,
          'courtUuid': 'UNKOWN',
          'orgName': '负1楼停车场',
          'sceneName': '一期停车场负一楼',
          'scale': 3773,
          'updateUser': 'admin',
          'updateTime': 1517359042648,
          'url': 'http://192.168.0.246:8888/group1/M00/0B/63/wKgA9lpxD8aANzzlAACKWI113Kg947.jpg',
          'deleteFlag': 1,
          'createTime': 1517359034157,
          'scaleType': 2,
          'sceneType': 4,
          'orgCode': 'e644e77cb0c74db6a8e05c9181d830d3',
          'width': 650,
          'createUser': 'testUser',
          'id': '0cca8992dbc14c8dade1fefe579523af',
          'realWidth': 800,
          'height': 0
        }
      ]
    }
  ],
  'message': '获取场景ID成功'
})
