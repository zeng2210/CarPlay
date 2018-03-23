import Mock from 'mockjs'
// import imgUrl1 from '../assets/images/1.png'
// import imgUrl2 from '../assets/images/2.png'
// import car from '../assets/images/car.png'
// import w1 from '../assets/images/w1.png'
// 引用子模块的mock文件
// import '@/views/ParkingLot/mocks/mock.js'

// 配置mock过滤路径
Mock.mock('/ParkingLot/mockData/getAccessList', function () {
  return {
    data: [{
      date: '2016-05-03',
      address: '园区北门',
      remark: '强行关闭',
      securityStatus: '未派遣',
      evenStatus: '预警中',
      monitor: 'src/views/ParkingLot/assets/images/car_video.png'
    }, {
      date: '2016-05-02',
      address: '园区北门',
      remark: '长时间未关闭',
      securityStatus: '未派遣',
      evenStatus: '预警中',
      monitor: 'src/views/ParkingLot/assets/images/car_video.png'
    }, {
      date: '2016-05-04',
      address: '园区北门',
      remark: '长时间未关闭',
      securityStatus: '未派遣',
      evenStatus: '预警中',
      monitor: 'src/views/ParkingLot/assets/images/car_video.png'
    }, {
      date: '2016-05-01',
      address: '园区北门',
      remark: '长时间未关闭',
      securityStatus: '未派遣',
      evenStatus: '预警中',
      monitor: 'src/views/ParkingLot/assets/images/car_video.png'
    }, {
      date: '2016-05-07',
      address: '园区北门',
      remark: '长时间未关闭',
      securityStatus: '未派遣',
      evenStatus: '预警中',
      monitor: 'src/views/ParkingLot/assets/images/car_video.png'
    }, {
      date: '2016-05-07',
      address: '园区北门',
      remark: '长时间未关闭',
      securityStatus: '未派遣',
      evenStatus: '预警中',
      monitor: 'src/views/ParkingLot/assets/images/car_video.png'
    }, {
      date: '2017-12-07',
      address: '园区北门',
      remark: '长时间未关闭',
      securityStatus: '未派遣',
      evenStatus: '预警中',
      monitor: 'src/views/ParkingLot/assets/images/car_video.png'
    }, {
      date: '2017-01-01',
      address: '园区北门',
      remark: '长时间未关闭',
      securityStatus: '未派遣',
      evenStatus: '预警中',
      monitor: 'src/views/ParkingLot/assets/images/car_video.png'
    }],
    multipleSelection: []
  }
})

// 解除预警
Mock.mock('/ParkingLot/mockData/updateEventStatus', function () {
  console.log('mock audioClip update')
  return {
    statue: true,
    code: 200,
    message: 'update success'
  }
})

// 查询停车场下拉
Mock.mock('/ParkingLot/mockData/parkingSelect', function () {
  return {
    data: [{
      value: '1期停车场',
      label: '负1楼停车场'
    }, {
      value: '1期停车场',
      label: '负2楼停车场'
    }, {
      value: '2期停车场',
      label: '负2楼停车场'
    }, {
      value: '2期停车场',
      label: '负3楼停车场'
    }]
  }
})

//  获取所有数据
Mock.mock('/ParkingLot/mockData/queryStyleData', function () {
  return {
    // 首页地图区域鼠标放入样式
    indexStyleList: [{
      fillColor: 'rgba(192,218,251, 0.5)',    //  填充色 选填
      strokeColor: '#3E88E2',  //  边框色 选填
      strokeWidth: 4        //  边框宽度 选填
    }, {
      fillColor: 'rgba(217,239,203, 0.5)',    //  填充色 选填
      strokeColor: '#82CA5A', //  边框色 选填
      strokeWidth: 4       //  边框宽度 选填
    }, {
      fillColor: 'rgba(253,241,181, 0.5)',    //  填充色 选填
      strokeColor: '#FCCE18',  //  边框色 选填
      strokeWidth: 4        //  边框宽度 选填
    }, {
      fillColor: 'rbga(252,203,188, 0.5)',
      strokeColor: '#F8591B',
      strokeWidth: 4
    }, {
      fillColor: 'rbga(252,203,188, 0.5)',
      strokeColor: '#F8591B',
      strokeWidth: 4
    }, {
      fillColor: 'rbga(252,203,188, 0.5)',
      strokeColor: '#F8591B',
      strokeWidth: 4
    }],
    innerStyleList: [{
      fillColor: 'rgba(229,205,248, 0.5)',    //  填充色 选填
      strokeColor: '#BB74F4',  //  边框色 选填
      strokeWidth: 2,       //  边框宽度 选填
      lineDash: [0, 0]      //  边框是否实线
    }, {
      fillColor: 'rgba(241,218,212, 0.5)',    //  填充色 选填
      strokeColor: '#E8B1A6',  //  边框色 选填
      strokeWidth: 2,       //  边框宽度 选填
      lineDash: [0, 0]      //  边框是否实线
    }, {
      fillColor: 'rgba(220,238,217, 0.5)',    //  填充色 选填
      strokeColor: '#A8D8A0',  //  边框色 选填
      strokeWidth: 2,       //  边框宽度 选填
      lineDash: [0, 0]      //  边框是否实线
    }, {
      fillColor: 'rgba(227,227,227, 0.5)',    //  填充色灰色
      strokeColor: '#B4B4B4',  //  边框色 选填
      strokeWidth: 2,       //  边框宽度 选填
      lineDash: [0, 0]      //  边框是否实线
    }]
  }
})

// 查询停车场首页信息
Mock.mock('/ParkingLot/mockData/getParkinglotFloor', function () {
  return {
    data: {
      allAlarm: {  // 统计所有类型警告数量
        countLongTime: 0,  // 长时间停放
        countExpired: 0,  // 车位欠费
        countExpiring: 0, // 即将过期
        countOccupy: 0  // 车位占用
      },
      totalParkSeat: {  // 车位信息统计
        tempParkSeatCount: 0,  // 临停车位数
        fixedParkSeatCount: 0, // 固定车位数
        monthParkSeatCount: 0, // 月保车位数
        unavailableParkSeatCount: 0, // 不可用车位数
        idleTempParkSeatCount: 0, // 空余临停车位数
        totalCarCount: 0, // 车辆总数
        totalParkSeatCount: 0 // 总车位数
      },
      parkingFloorSceneMap: { // 停车场楼层地图
        sceneId: '09c1f2f4b3f54c988e4b9871a800dcb0', // 地图场景ID
        sceneName: null,
        sceneImageUrl: 'http://192.168.0.246:8888/group1/M00/0D/49/wKgA9lpys3WADR3mAACKWI113Kg089.jpg',  // 地图图片URL
        centerLat: null,
        centerLon: null,
        orgId: null,
        areaInfoVos: [ // 停车场楼层区域列表信息
          {
            areaId: '5cc5b1e25eab450db15f19e65fb839e8',  // 区域ID
            areaName: 'B区停车场',
            orgId: null,
            borderPoints: [[[-956.2312532209156, 531.8288051759802], [-266.9531307230992, 538.8265526125062], [-265.2036938639676, -356.8851192628289], [-959.7301269391787, -358.6345561219604]]], // 点位坐标
            alarmCount: 0, // 区域警告数量
            areaType: 3, // 区域类型
            sceneId: 'd5bb472aca2d40f6ab26d792dd244644',
            linkSceneId: 'd5bb472aca2d40f6ab26d792dd244644', // 对应的场景ID
            parkSeatId: null,
            parkSeatCode: null,
            carNum: null,
            centerPoint: null,
            angle: null,
            alarmId: null,
            alarmType: null
          },
          {
            areaId: '5d7ad2f6fede4f2f8a76e1316126db5c',
            areaName: 'A区停车场',
            orgId: null,
            borderPoints: [[[-216.2194618082856, 409.3682250367743], [-224.96664610394316, -353.3862455445658], [394.33400202861264, -383.1266721498015], [322.60709080422055, 428.6120304872209]]],
            alarmCount: 30,
            areaType: 3,
            sceneId: '9211c385d1c8419181b2872099147763',
            linkSceneId: '9211c385d1c8419181b2872099147763',
            parkSeatId: null,
            parkSeatCode: null,
            carNum: null,
            centerPoint: null,
            angle: null,
            alarmId: null,
            alarmType: null
          }
        ],
        deviceMarkerVos: null
      }
    }
  }
})

// 查询停车场内页数据
Mock.mock('/ParkingLot/mockData/getParkinglotArea', function () {
  return {
    data: {
      floorAreaSceneMap: {
        sceneId: '5a0a7df14ba74d0ab02f77efa9299ba7',
        sceneName: '捷顺停车场测试-一期负一楼A区', // 停车场楼层区域场景名称
        sceneImageUrl: 'http://192.168.0.246:8888/group1/M00/0D/BB/wKgA9lpz2d-AWcsSAAFUR2BBTS8280.png', // 停车场楼层区域地图URL
        centerLat: null,
        centerLon: null,
        orgId: null,
        areaInfoVos: [ // 车位区域列表
          {
            areaId: '5a0a7df14ba74d0ab02f77efa9299ba8', // 区域ID
            areaName: null,
            orgId: null,
            borderPoints: [[[59.02463441839789, 469.09804809082397], [121.29732817254583, 469.09804809082397], [121.29732817254583, 344.55266058252806],
            [59.02463441839789, 344.55266058252806], [59.02463441839789, 469.09804809082397]]], // 车位区域点位信息
            alarmCount: 0,
            areaType: 1, // 车位区域类型
            sceneId: null,
            linkSceneId: null,
            parkSeatType: 1,  // 车位类型用于车位颜色
            parkSeatId: null, // 车位ID
            parkSeatCode: null, // 车位编号
            carNum: '粤A123486', // 车位上停放的车牌号
            centerPoint: [ // 车位区域中心点
              83.93371192005706,
              419.27989308750557
            ],
            angle: 90, // 车位角度
            alarmId: '3241324', // 警告ID
            alarmType: 0 // 警告类型
          },
          {
            areaId: '37946d5dd3014ebd99b67d50ff8dba1b',
            areaName: null,
            orgId: null,
            borderPoints: [[[155.80228564329792, 469.6052456410239], [217.0196769476458, 469.6052456410239], [217.0196769476458, 347.17046303232814],
            [155.80228564329792, 347.17046303232814], [155.80228564329792, 469.6052456410239]]],
            alarmCount: 0,
            areaType: 2,
            sceneId: null,
            linkSceneId: null,
            parkSeatType: 2,  // 车位类型用于车位颜色
            parkSeatId: null,
            parkSeatCode: null,
            carNum: '粤A121436',
            centerPoint: [
              180.28924216503705,
              420.63133259754557
            ],
            angle: 120,
            alarmId: 'ds123',
            alarmType: 1
          },
          {
            areaId: '7ba99ef4c5614bc88e2994ae82e9bd01',
            areaName: null,
            orgId: null,
            borderPoints: [[[47.925724885215416, 103.17086715718884], [111.14623770572823, 103.17086715718884], [111.14623770572823, -23.27015848383681],
            [47.925724885215416, -23.27015848383681], [47.925724885215416, 103.17086715718884]]],
            alarmCount: 0,
            areaType: 3,
            sceneId: null,
            linkSceneId: null,
            parkSeatType: 3,  // 车位类型用于车位颜色
            parkSeatId: null,
            parkSeatCode: null,
            carNum: null,
            centerPoint: [
              73.21393001342054,
              52.594456900778574
            ],
            angle: 150,
            alarmId: '1234',
            alarmType: 2
          }
        ],
        deviceMarkerVos: [
          {
            markerId: '6efb4e6b291947e89d42de82206ffb45',
            deviceId: '1001200358FCDBD8341E',
            point: [
              168.28125,
              -248.4375
            ],
            markerType: 4
          },
          {
            markerId: 'dbd5aad2d72e4cc080c28fbbdc6fc2e7',
            deviceId: '10022003784f4386ee3f',
            point: [
              68.28125,
              -148.4375
            ],
            markerType: 4
          }
        ]
      },
      allAlarm: {
        countLongTime: 0,
        countExpired: 0,
        countExpiring: 0,
        countOccupy: 0
      },
      totalParkSeat: {
        tempParkSeatCount: 0,
        fixedParkSeatCount: 0,
        monthParkSeatCount: 0,
        unavailableParkSeatCount: 0,
        idleTempParkSeatCount: 0,
        totalCarCount: 0,
        totalParkSeatCount: 0
      }
    }
  }
})

//  获取车辆信息
Mock.mock('/ParkingLot/mockData/queryCarInfo', function () {
  return {
    data: {
      images: 'src/views/ParkingLot/assets/images/car_pic.png',
      carno: '粤A123456',
      carport: 'B321',
      carowners: '张三',
      phone: '13403840233',
      startTime: '2017-1-3 21:32:34',
      cost: '400元/月'
    }
  }
})
