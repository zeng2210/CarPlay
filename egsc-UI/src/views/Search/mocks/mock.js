// import Mock from 'mockjs'
//
// const contextPath = '/scp-searchenginecomponent'
// //
// const imageUrl = 'http://192.168.0.246:8888/group1/M00/01/66/wKgA9lpfFSOACOb9AABnnWwwmzU571.jpg'
//
// const userListSimple = [
//   {
//     'peopleId': '02ae4049436122cddc',
//     'peopleName': '测试111',
//     'peopleType': '2',
//     'visitAddress': '恒大山水城-1214',
//     'tel': '13568958457',
//     'imageURL': 'http://192.168.0.246:8888/group1/M00/0C/8C/wKgA9lpxhYSAVFpCAACgmIUWmjk719.jpg',
//     'deleteFlag': 1
//   }, {
//     'peopleId': '39b1ce5a9dedce8ec1',
//     'peopleName': '23112',
//     'peopleType': '2',
//     'visitAddress': '恒大山水城-1210',
//     'tel': '13045787878',
//     'imageURL': 'http://192.168.0.246:8888/group1/M00/0B/0B/wKgA9lpvM26AMfT9AAFkl30HazM410.jpg',
//     'deleteFlag': 1
//   }
// ]
//
// const userListMore = [
//   {
//     'userId': '1',
//     'name': '张三1',
//     'userType': '01',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '2',
//     'name': '张三2',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': '',
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '3',
//     'name': '张三3',
//     'userType': '03',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '4',
//     'name': '张三4',
//     'userType': '01',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '5',
//     'name': '张三5',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '6',
//     'name': '张三6',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '7',
//     'name': '张三7',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '8',
//     'name': '张三8',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '9',
//     'name': '张三9',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '10',
//     'name': '张三10',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '11',
//     'name': '张三11',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '12',
//     'name': '张三12',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '13',
//     'name': '张三13',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '14',
//     'name': '张三14',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '15',
//     'name': '张三15',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '16',
//     'name': '张三16',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }, {
//     'userId': '17',
//     'name': '张三17',
//     'userType': '02',
//     'address': '广州市增城区',
//     'facePic': imageUrl,
//     'imageId': 'string',
//     'imageName': 'string',
//     'imageSimilarity': 'string',
//     'intime': '2018-01-01 11:11',
//     'outTime': '2018-01-01 14:14',
//     'job': 'string',
//     'machedImageUrl': 'string',
//     'sourceImageUrl': 'string',
//     'tel': '1333333333',
//     'visitAddress': 'abcdefg'
//   }
// ]
//
// const cameraList = [
//   {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera1',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': '',
//     'subDeviceId': '123123'
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera2',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera3',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera4',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera5',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera6',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera7',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera8',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera9',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera10',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera11',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera12',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera13',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera14',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera15',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera16',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera17',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera18',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }, {
//     'cameraId': '34020000001320000001',
//     'cameraName': 'camera19',
//     'cameraLocation': '恒大酒店二楼广州厅',
//     'cameraImageUrl': '',
//     'deviceMonitorLink': '',
//     'cameraStatus': ''
//   }
// ]
//
// const userImageList = {
//   'faceLibList': [
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     },
//     {
//       'intime': '',
//       'outTime': '',
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100'
//     }
//   ],
//   'captureLibList': [
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T11:22:52Z',
//       'subDeviceId': '12312321'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100.00',
//       'cameraVo': {
//         'cameraId': 'c1f12b7aa9c441a2ba3df5e63375f00b',
//         'cameraName': '摄像机',
//         'cameraLocation': '恒大',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '123.123.123.2:11'
//       },
//       'triggerTime': '2018-01-18T11:22:50Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T11:21:13Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T11:19:34Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100.00',
//       'cameraVo': {
//         'cameraId': 'c1f12b7aa9c441a2ba3df5e63375f00b',
//         'cameraName': '摄像机',
//         'cameraLocation': '恒大',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '123.123.123.2:11'
//       },
//       'triggerTime': '2018-01-18T11:19:33Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T11:09:12Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '100.00',
//       'cameraVo': {
//         'cameraId': 'c1f12b7aa9c441a2ba3df5e63375f00b',
//         'cameraName': '摄像机',
//         'cameraLocation': '恒大',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '123.123.123.2:11'
//       },
//       'triggerTime': '2018-01-18T11:09:10Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '99.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T11:33:50Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '99.00',
//       'cameraVo': {
//         'cameraId': 'c1f12b7aa9c441a2ba3df5e63375f00b',
//         'cameraName': '摄像机',
//         'cameraLocation': '恒大',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '123.123.123.2:11'
//       },
//       'triggerTime': '2018-01-18T11:33:48Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '99.00',
//       'cameraVo': {
//         'cameraId': 'c1f12b7aa9c441a2ba3df5e63375f00b',
//         'cameraName': '摄像机',
//         'cameraLocation': '恒大',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '123.123.123.2:11'
//       },
//       'triggerTime': '2018-01-18T11:21:12Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '99.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T11:02:23Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '99.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T11:00:28Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '98.00',
//       'cameraVo': {
//         'cameraId': 'c1f12b7aa9c441a2ba3df5e63375f00b',
//         'cameraName': '摄像机',
//         'cameraLocation': '恒大',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '123.123.123.2:11'
//       },
//       'triggerTime': '2018-01-18T11:02:09Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '95.00',
//       'cameraVo': {
//         'cameraId': 'c1f12b7aa9c441a2ba3df5e63375f00b',
//         'cameraName': '摄像机',
//         'cameraLocation': '恒大',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '123.123.123.2:11'
//       },
//       'triggerTime': '2018-01-18T11:00:26Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '81.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T10:43:39Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '72.00',
//       'cameraVo': {
//         'cameraId': '32d92e8064194f6a844b93470263abb5',
//         'cameraName': 'cameral',
//         'cameraLocation': 'hengda',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '192.168.200.104:null'
//       },
//       'triggerTime': '2018-01-18T11:32:14Z'
//     },
//     {
//       'imageURL': 'http://192.168.0.246:8888/group1/M00/0A/0A/wKgA9lpmlo2AOgJiAAd-nHqNKNg54.jpeg',
//       'imageSimilarity': '69.00',
//       'cameraVo': {
//         'cameraId': 'c1f12b7aa9c441a2ba3df5e63375f00b',
//         'cameraName': '摄像机',
//         'cameraLocation': '恒大',
//         'cameraStatus': 'false',
//         'cameraMonitorLink': '123.123.123.2:11'
//       },
//       'triggerTime': '2018-01-18T11:32:13Z'
//     }
//   ]
// }
//
// const carList = [
//   {
//     vehicleNum: '粤A888881',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }, {
//     vehicleNum: '粤A888882',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }, {
//     vehicleNum: '粤A888883',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }, {
//     vehicleNum: '粤A888884',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }, {
//     vehicleNum: '粤A888885',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }, {
//     vehicleNum: '粤A888885',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }, {
//     vehicleNum: '粤A888886',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }, {
//     vehicleNum: '粤A888887',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }, {
//     vehicleNum: '粤A888888',
//     parkingNum: '1-A231',
//     parkingType: '固定车位',
//     inTime: '2017-11-12 18:00:00',
//     parkingFee: '85',
//     vehicleOwnerId: '1111',
//     vehicleOwnerName: '张三',
//     vehicleOwnerTel: '1333333333',
//     subDeviceId: '',
//     vehicleIMGUrl: ''
//   }
// ]
//
// const deviceList = [
//   {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'false',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'false',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'false',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }, {
//     patrolEqpmId: 'MD1111',
//     subDeviceId: '111111',
//     patrolEqpmNum: 'AAAAAA',
//     longitude: '123123',
//     latitude: '123123',
//     patrolEqpmStatus: 'true',
//     patrolEqpmSecurity: '张三',
//     tel: '1333333333',
//     msg: '消息的内容'
//   }
// ]
//
// const allInfoList = {
//   cameList: cameraList,
//   peopleList: userListSimple,
//   patrolEqpmtList: deviceList,
//   vehicleList: carList
// }
//
// const getData = (data) => {
//   return {
//     'code': '',
//     'msg': '',
//     'data': data
//   }
// }
//
// /**
//  * 搜索摄像头列表
//  */
// Mock.mock(contextPath + '/searchengine/getCameraList?cameraName=test', function () {
//   console.log('mock get getCameraList')
//   return getData(cameraList)
// })
// /**
//  * 上传图片
//  */
// Mock.mock(contextPath + '/searchengine/uploadPeopleImage', function () {
//   return getData(imageUrl)
// })
// /**
//  * 以图搜图
//  */
// Mock.mock(contextPath + '/searchengine/getPeopleImageList?url=' + imageUrl, function () {
//   // return getData(userListSimple)
//   return getData(userImageList)
// })
// /**
//  * 搜索姓名(少)
//  */
// Mock.mock(contextPath + '/searchengine/getPeopleAccessInfoList?peopleName=test', function () {
//   return getData(userListSimple)
// })
// /**
//  * 搜索姓名(多)
//  */
// Mock.mock(contextPath + '/searchengine/getPeopleAccessInfoList?peopleName=more', function () {
//   return getData(userListMore)
// })
// /**
//  * 搜索车
//  */
// Mock.mock(contextPath + '/searchengine/getVehicleList?vehicleNum=more', function () {
//   return getData(carList)
// })
// /**
//  * 搜索巡更设备
//  */
// Mock.mock(contextPath + '/searchengine/getPatrolEqpmtList?patrolEqpmtNum=more', function () {
//   return getData(deviceList)
// })
//
// /**
//  * 搜索全部
//  */
// Mock.mock(contextPath + '/searchengine/getAllInfoList?inputValue=more', function () {
//   return getData(allInfoList)
// })
