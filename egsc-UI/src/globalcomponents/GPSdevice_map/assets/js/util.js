import broadcastImg from '@/globalcomponents/device_map/assets/ico_local_broadcast.png'
import cameraImg from '@/globalcomponents/device_map/assets/ico_local_camera.png'
import guarderImg from '@/globalcomponents/GPSdevice_map/assets/guard.png'

/**
 * 加载地图参数格式化
 * @param {Object} options 地图参数
 */
export const mapOptionFormat = options => {
  let formatedOption = {}
  formatedOption.mapId = options.id
  formatedOption.sceneName = options.sceneName
  formatedOption.gisEngine = 'bitmap'
  formatedOption.sizeW = 1920
  formatedOption.sizeH = 1000
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
  formatedOption.minZoom = 2.5
  formatedOption.maxZoom = 4
  formatedOption.zoom = 2.5
  formatedOption.popupDom = {
    popup: 'GPSdevice_popup',
    popupcloser: 'GPSdevice_popup-closer',
    popupcontent: 'GPSdevice_popup-content'
  }
  return formatedOption
}

/**
 * 根据图片type加载相应图片
 * @param {Number} type 图片类型
 */
export const getImgByType = (type) => {
  let img
  if (type === 1) {
    img = guarderImg
  } else if (type === 2) {
    img = broadcastImg
  } else {
    img = cameraImg
  }
  return img
}
