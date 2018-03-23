import Axios from '@/assets/js/AxiosPlugin'

/**
 * 调控当前广播音量, 向后台提交相关参数后更改广播音量值
 * @param {string} deviceId   设备编号
 * @param {string} devipplayAreaId  设备IP
 * @param {array} playAreaId  播放小区
 * @param {number} vol    当前音量
 */
export const postBroadcastVolumeData = data => {
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/volume/upOrDown',
    data
  })
}

/**
 * 查询当前区域音量
 * @param {array} playAreaId  播放小区
 * @return {Object} 返回
 * {
    'code': '00000',
    'message': '音量查询',
    'data': {
      'volumeId': null,
      'vol': 15,
      'devip': null,
      'playAreaId': null,
      'deviceId': null
    }
 */
export const getBroadcastVolumeData = playAreaId => {
  return Axios({
    method: 'get',
    url: '/scp-broadcastapp/broadcast/volume/search/',
    params: playAreaId
  })
}

/**
 * 查询音量以及正在播放歌曲
 * @param {string} deviceId 设备编号
 */
export const postGetBroadcast = data => {
  console.log(data)
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/search',
    data
  })
}

/**
 * 播放暂停
 * @param {num} sessionId
 * @param {num} operation
 * @param {string} deviceId
 * @param {num} allPlayArea
 */
export const playBroadcast = data => {
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/startOrStop',
    data
  })
}

/**
 * 上一首下一首
 * @param {num} operation
 * @param {string} deviceId
 * @param {num} allPlayArea
 */
export const changePlayState = data => {
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/lastOrNext',
    data
  })
}
