import icoBroadCast from '@/assets/images/ico_local_broadcast.png'
import icoBallheadCamera from '@/assets/images/ico_local_camera.png'
import icoCamera from '@/views/Map/assets/images/u3396.png'
import icoCameraWarn from '@/assets/images/ico-local-abnormal.png'
import broadcastImg from '@/views/Map/assets/images/ico_local_broadcast.png'
import cameraImg from '@/views/Map/assets/images/ico_local_camera.png'
import defaultImg from '@/views/Map/assets/images/ico_local_default.png'
/*
  点位类型
  1-视频设备
  2-广播设备
  3-巡更点
  4-汽车
*/
const getImgByType = (type) => {
  let img
  if (type === 1) {
    img = cameraImg
  } else if (type === 2) {
    img = broadcastImg
  } else {
    img = defaultImg
  }
  return img
}

export const mapOptionFormat = options => {
  /* initMap需要的options结构
  {
    mapId: option.id,
    gisEngine: 'bitmap',
    sizeW: 1920,
    sizeH: 1080,
    domId: 'mapDiv',
    mapUrl: mapImageUrl,
    maxZoom: 10,
    minZoom: 1,
    center: [112.334403, 39.8],
    popupDom: {
      popup: 'popup',
      popupcloser: 'popup-closer',
      popupcontent: 'popup-content'
    }
  }
  原始得到的sceneList结构
 {
    id: '1e9286c5df964ffbafcbb1b314ae7f9b',
    courtUuid: '123',
    sceneName: '单条搜索',
    url: 'testUrl',
    gpsLon: null,
    gpsLat: null,
    centerLon: 202.121332,
    centerLat: 202.123343,
    scale: 200,
    scaleType: 1,
    height: 120.0,
    width: 230.0,
    realHeight: null,
    realWidth: null,
    orgCode: null,
    sceneType: 1,
    parentArea: null,
    countWarning: null
  }
  */
  let formatedOption = {}
  formatedOption.mapId = options.id
  formatedOption.sceneName = options.sceneName
  formatedOption.gisEngine = 'bitmap'
  formatedOption.sizeW = options.width
  formatedOption.sizeH = options.height
  formatedOption.realHeight = options.realHeight
  formatedOption.realWidth = options.realWidth
  formatedOption.mapUrl = options.mapImage
  formatedOption.center = [0, 0]
  formatedOption.centerGPS = []
  formatedOption.centerGPS.push(options.centerLon)
  formatedOption.centerGPS.push(options.centerLat)
  formatedOption.scale = options.scale
  formatedOption.scaleType = options.scaleType
  formatedOption.countWarning = options.countWarning

  return formatedOption
}

export const extendObj = (object, extend) => {
  for (let key in extend) {
    object[key] = extend[key]
  }
  return object
}

/* marker 需要结构
  {
    id: id,
    markerType: 'camera',
    position: [-40, 3.76],
    markerName: 'aa',
    imgUrl: markerImg,
    size: [32, 48]
  }
  后台返回的markerInfo结构
  {
    id: '4b23566be698427682e5ebe3089e3f8d',
    sceneId: '0',
    deviceId: '0',
    longitude: 0,
    latitude: 0,
    positionX: 0,
    positionY: 0,
    markerType: 0,
    markerOrder: 0
  }
 */
export const markerInfoFormat = markerInfo => {
  let formatedInfo = {}
  formatedInfo.markerId = markerInfo.id
  formatedInfo.id = markerInfo.deviceId
  formatedInfo.deviceId = markerInfo.deviceId
  formatedInfo.markerType = markerInfo.markerType
  formatedInfo.position = []
  formatedInfo.position.push(markerInfo.positionX)
  formatedInfo.position.push(markerInfo.positionY)
  formatedInfo.GPS = []
  formatedInfo.GPS.push(markerInfo.longitude)
  formatedInfo.GPS.push(markerInfo.latitude)
  formatedInfo.markerName = markerInfo.markerName
  formatedInfo.imgUrl = getImgByType(markerInfo.markerType)
  return formatedInfo
}

export const markerListFormat = markerList => {
  let formatedList = []
  for (let i = 0; i < markerList.length; i++) {
    formatedList.push(markerInfoFormat(markerList[i]))
  }
  return formatedList
}

export const featureToMarker = featureInfo => {
  let markerInfo = {}
  markerInfo.id = featureInfo.markerId
  markerInfo.positionX = featureInfo.position[0]
  markerInfo.positionY = featureInfo.position[1]
  return markerInfo
}

export const formatArea = areasList => {
  let areaArray = []
  for (let i = 0; i < areasList.length; i++) {
    areaArray[i] = []
    areaArray[i][0] = []
    for (let j = 0; j < areasList[i].borderPoints.length; j++) {
      let pointX = areasList[i].borderPoints[j].pointX
      let pointY = areasList[i].borderPoints[j].pointY
      areaArray[i][0][j] = [pointX, pointY]
    }
    areasList[i].borderPoints = areaArray[i]
  }
  return areasList
}

export const formatMarker = markerList => {
  let markerArr = []
  let currentMarkerData = {}
  for (let i = 0; i < markerList.length; i++) {
    currentMarkerData = {}
    switch (markerList[i].markerType) {
      case 1:
        if (markerList[i].markerStatus === 101) {
          currentMarkerData.imgUrl = icoCamera
          currentMarkerData.markerType = 'camera'
          currentMarkerData.markerTypeOrigin = markerList[i].markerType
        } else {
          currentMarkerData.imgUrl = icoCameraWarn
          currentMarkerData.markerType = 'warning'
          currentMarkerData.markerTypeOrigin = markerList[i].markerType
        }
        break
      case 2:
        currentMarkerData.markerType = 'video'
        currentMarkerData.imgUrl = icoBroadCast
        break
      case 4:
        if (markerList[i].markerStatus === 401) {
          currentMarkerData.imgUrl = icoBallheadCamera
          currentMarkerData.markerType = 'camera'
          currentMarkerData.markerTypeOrigin = markerList[i].markerType
        } else {
          currentMarkerData.imgUrl = icoCameraWarn
          currentMarkerData.markerType = 'warning'
          currentMarkerData.markerTypeOrigin = markerList[i].markerType
        }
        break
        /*
      case 4:
        currentMarkerType = 'cleanKeepping'
        currentMarkerImage = icoCleanKeepping
        break
      */
    }
    currentMarkerData.deviceId = markerList[i].deviceId
    currentMarkerData.id = markerList[i].id
    currentMarkerData.markerName = markerList[i].markerName
    currentMarkerData.markerStatus = markerList[i].markerStatus
    currentMarkerData.position = []
    currentMarkerData.position[0] = markerList[i].positionX
    currentMarkerData.position[1] = markerList[i].positionY
    markerArr.push(currentMarkerData)
  }
  return markerArr
}
