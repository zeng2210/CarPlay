<template>
  <div id="mapcontainer">
    <div v-if="errorComment" class="error-info">该设备未在地图中配置信息</div>
    <div id="device-map" v-show="!errorComment">
      <div id="showname" v-show="!errorComment" v-text="mapTitle"></div>
    </div>
  </div>
</template>

<script>
import {
  getMarkerInfo,
  getSceneInfo
} from '@/globalcomponents/device_map/apis/index'
import {
  markerInfoFormat,
  mapOptionFormat
} from '@/globalcomponents/device_map/assets/js/util'
export default {
  name: 'DeviceMap',
  data() {
    return {
      errorComment: false,
      sceneId: '',
      mapObj: null,
      mapTitle: ''
    }
  },
  methods: {
    /**
     * @description 加载地图
     * @param {Object} data 父组件传值数据
    */
    addMap: function(data) {
      if (data) {
        let dom = document.getElementById('device-map')
        dom.style.width = data.width
        dom.style.height = data.height
        dom.style.margin = '0 auto'
        var _this = this
        getMarkerInfo({ deviceId: data.deviceID })
          .then(res => {
            this.errorComment = false
            let markerInfo = markerInfoFormat(res.data.data)
            this.sceneId = markerInfo.sceneId
            // 获取场景信息
            getSceneInfo({ sceneId: this.sceneId }).then(res => {
              let options = mapOptionFormat(res.data.data)
              // 判断地图是否已存在
              if (this.mapObj) {
                this.mapObj.getMap().setTarget(null)
              }
              // 加载地图
              // eslint-disable-next-line
              this.mapObj = new hdmap.initMap(options)
              this.mapObj.getMap().setTarget('device-map')
              this.mapObj.setCenter(markerInfo.position)
              this.mapObj.addMarker(markerInfo, { scale: 0.7 })
              this.mapTitle = options.sceneName
              this.errorComment = false
            })
          })
          .catch(function() {
            console.warn(
              'The device does not configure the information in the map'
            )
            _this.errorComment = true
          })
      }
    }
  }
}
</script>
<style lang="less" scoped>
#mapcontainer {
  margin: 0 auto;
  background: #55616d;
  overflow: hidden;
}
.error-info {
  width: 300px;
  margin: 50px auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: white;
}
#device-map {
  position: relative;
}
#showname {
  position: absolute;
  left: 50px;
  top: 30px;
  z-index: 999;
  color: rgb(164, 113, 211);
  color: white;
  font-size: 20px;
}
</style>
