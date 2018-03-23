import Axios from '@/assets/js/AxiosPlugin'
let contextPath = '/scp-videointercomapp'
// let contextPath = ''
// export const getTestUserList = () => {
//   return Axios.get('/test/mockData').then(res => res.data)
// }
export const callinConfirm = (
  callId,
  audioIp,
  audioPort,
  videoIp,
  videoPort
) => {
  let params = {
    audioIp: audioIp,
    audioPort: audioPort,
    callId: callId,
    videoIp: videoIp,
    videoPort: videoPort
  }
  console.log(params)
  return Axios.post(contextPath + '/call/callinConfirm', params).then(
    res => res.data
  )
}
export const ringing = (callId, sdp) => {
  let params = {
    callId: callId,
    sdp: sdp
  }
  return Axios.post(contextPath + '/call/callinRinging', params).then(
    res => res.data
  )
}

/**
 * PC可视对讲应用点提机接口
 */
export const offHook = (callId, sdp) => {
  let params = {
    callId: callId,
    sdp: sdp
  }
  return Axios.post(contextPath + '/call/offHook', params).then(res => res.data)
}

/**
 * PC可视对讲应用点挂机接口
 */
export const onHook = callId => {
  let params = {
    callId: callId
  }
  return Axios.post(contextPath + '/call/onHook', params).then(res => res.data)
}

/**
 * PC端可视对讲发起远程开门
 * @argument callId
 * @argument deviceCode 设备编码
 */
export const openDoor = (callId, deviceCode) => {
  let params = {
    callId: callId,
    deviceCode: deviceCode
  }
  return Axios.post(contextPath + '/call/openDoor', params).then(
    res => res.data
  )
}
/**
 * PC 未接呼叫回拨/外拨
 * @argument callId
 * @argument deviceCode 设备编码
 */
export const callout = (callId, toDeviceCode, from, to, audioIp, audioPort) => {
  let params = {
    callId: callId,
    toDeviceCode: toDeviceCode,
    from: from,
    to: to,
    audioIp: audioIp,
    audioPort: audioPort
  }
  return Axios.post(contextPath + '/call/callout', params).then(res => res.data)
}

/**
 * 可视对讲应用外拨、回拨时，需要发送音频的SDP信息给门口机
 */
export const calloutConfirm = (callId, sdp) => {
  let params = {
    callId: callId,
    sdp: sdp
  }
  return Axios.post(contextPath + '/call/calloutConfirm', params).then(
    res => res.data
  )
}
/**
 * 获取呼叫记录
 */
export const getCallRecordData = (
  callTypes,
  startTime,
  endTime,
  pageNum,
  pageSize,
  answer,
  queryMode,
  direction
) => {
  let params =
    'callTypes=' +
    callTypes +
    '&startTime=' +
    startTime +
    '&endTime=' +
    endTime +
    '&pageNum=' +
    pageNum +
    '&pageSize=' +
    pageSize +
    '&answer=' +
    answer +
    '&queryMode=' +
    queryMode +
    '&direction=' +
    direction
  return Axios.get(contextPath + '/callLog/list?' + params).then(
    res => res.data
  )
}
/**
 * 更新回拨记录状态
 */
export const callLogStatusUpdate = (uuid) => {
  let params = {
    uuid: uuid
  }
  return Axios.post(contextPath + '/callLog/update', params).then(
    res => res.data
  )
}
/**
 * 查询ip列表
 */
export const ipList = () => {
  let params = {}
  return Axios.get(contextPath + '/VideointercomAppPcIp/list', params).then(
    res => res.data
  )
}
