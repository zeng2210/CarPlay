<template>
  <div id="mapcontainer">
    <div id="gps-map"></div>
  </div>
</template>

<script>
import { getSceneList } from '@/globalcomponents/GPSdevice_map/apis/index'
import {
  mapOptionFormat,
  getImgByType
} from '@/globalcomponents/GPSdevice_map/assets/js/util'

export default {
  name: 'GPSDeviceMap',
  data () {
    return {
      sceneType: '1',
      mapObj: null
    }
  },
  methods: {
    /**
     * @description 加载地图
     * @param {} data 父组件传值数据
    */
    showMap: function (data) {
      // 获取地图信息
      getSceneList({ sceneType: this.sceneType }).then(res => {
        let options = mapOptionFormat(res.data.data[0])
        if (data && data.zoom) {
          options.zoom = data.zoom
        }
        // 加载地图
        if (this.mapObj) {
          this.mapObj.getMap().setTarget(null)
        }
        // eslint-disable-next-line
        this.mapObj = new hdmap.initMap(options)
        this.mapObj.getMap().setTarget('gps-map')
        console.log(options)
        if (data) {
          let dom = document.getElementById('gps-map')
          dom.style.width = data.width
          dom.style.height = data.height
          dom.style.margin = '0 auto'
          this.addMarker(data)
        }
      })
    },
    /**
     * @description 添加点位
     * @param {} data 父组件传值数据
    */
    addMarker (data) {
      let position = this.mapObj.transfromWGSToBitMap(data.GPS)
      let markerInfo = {
        markerType: 'guarder',
        id: 'guarder_001',
        markerName: 'guarder_001',
        imgUrl: getImgByType(data.type),
        position: position
      }
      console.log(markerInfo)
      this.mapObj.addMarker(markerInfo)
    }
  }
}
</script>
<style lang="less" scoped>
#mapcontainer {
  margin: 0 auto;
  background: #55616d;
}
</style>
