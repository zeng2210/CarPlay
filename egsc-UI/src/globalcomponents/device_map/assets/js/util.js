import broadcastImg from '@/globalcomponents/device_map/assets/ico_local_broadcast.png'
import cameraImg from '@/globalcomponents/device_map/assets/ico_local_camera.png'
import defaultImg from '@/globalcomponents/device_map/assets/ico_local_default.png'
import boltImg from '@/globalcomponents/device_map/assets/u3396.png'

/*
  点位类型
  1-视频设备
  2-广播设备
  3-巡更点
  4-汽车
*/
/**
 * 根据类型获取图片
 * @param {string} type 类型
 */
const getImgByType = (type) => {
  let img
  if (type === 1) {
    img = boltImg
  } else if (type === 2) {
    img = broadcastImg
  } else if (type === 3) {
    img = defaultImg
  } else if (type === 4) {
    img = cameraImg
  }
  return img
}

/**
 * 加载地图参数格式化
 * @param {Object} options 地图参数
 */
export const mapOptionFormat = options => {
  console.log(options)
  let formatedOption = {}
  formatedOption.mapId = options.id
  formatedOption.sceneName = options.sceneName
  formatedOption.gisEngine = 'bitmap'
  formatedOption.sizeW = 1920
  formatedOption.sizeH = 1080
  formatedOption.realHeight = options.realHeight
  formatedOption.realWidth = options.realWidth
  formatedOption.mapUrl = options.url
  formatedOption.center = [0, 0]
  formatedOption.centerGPS = []
  formatedOption.centerGPS.push(options.centerLon)
  formatedOption.centerGPS.push(options.centerLat)
  formatedOption.scale = options.scale
  formatedOption.scaleType = options.scaleType
  formatedOption.countWarning = options.countWarning
  formatedOption.controlZoom = false
  formatedOption.minZoom = 2.8
  formatedOption.maxZoom = 4
  formatedOption.zoom = 2.8
  formatedOption.popupDom = {
    popup: 'device_popup',
    popupcloser: 'device_popup-closer',
    popupcontent: 'device_popup-content'
  }
  return formatedOption
}

/**
 * 扩展对象
 * @param {Object} object 主队象
 * @param {Object} extend 扩展对象
 */
export const extendObj = (object, extend) => {
  for (let key in extend) {
    object[key] = extend[key]
  }
  return object
}

/**
 * 加载点位参数格式化
 * @param {Object} markerInfo 点位信息
 */
export const markerInfoFormat = markerInfo => {
  let formatedInfo = {}
  formatedInfo.markerId = markerInfo.id
  formatedInfo.sceneId = markerInfo.sceneId
  formatedInfo.id = markerInfo.deviceId
  formatedInfo.deviceId = markerInfo.deviceId
  formatedInfo.markerType = markerInfo.markerType
  formatedInfo.position = []
  formatedInfo.position.push(markerInfo.positionX)
  formatedInfo.position.push(markerInfo.positionY)
  formatedInfo.GPS = []
  formatedInfo.GPS.push(markerInfo.longitude)
  formatedInfo.GPS.push(markerInfo.latitude)
  formatedInfo.name = markerInfo.markerName
  formatedInfo.imgUrl = getImgByType(markerInfo.markerType)
  return formatedInfo
}
