<template>
  <el-container class="map-container">
    <div id="bitmap" class="bitmap">
      <h3 v-if="isLoadingMap" class="init-map-fail">地图加载中，请稍等……</h3>
      <h3 v-if="isInitMapFail" class="init-map-fail">地图加载失败……</h3>
    </div>
    <div id="point-popup" style=" height: 306px; width: 466px; position: absolute;" class="point-popup">
      <security-information v-if="showSecurityPeople" :gardenData="gardenData" @sentInfo="sentInfo"></security-information>
    </div>
    <div class="refresh" @click="reLoad">
      <img src="../assets/images/首页刷新.png" alt="">
    </div>
    <div class="people-garden-park">
      <p class="fl garden" :class="[{'people-garden': isShowClass}, {'people-park': isShowPark}]" @click="getShowClass($event)">园区</p>
      <p class="fl park" :class="[{'people-park': isShowClass}, {'people-garden': isShowPark}]" @click="getShowClass($event)">停车场</p>
    </div>
  </el-container>
</template>
<script>
import { extendObj, showLinePoint } from '@/views/PeopleMgmt/assets/js/index'
import {
  getSceneListData,
  getRedPointsData,
  getGardenSecurityData,
  getHistoryTaskPointData,
  updateSecurityGpsData
} from '@/views/PeopleMgmt/apis/index'
import securityImg from '@/views/PeopleMgmt/assets/images/u15704.png'
import patrolSta0 from '@/views/PeopleMgmt/assets/images/point4.png'
import patrolSta1 from '@/views/PeopleMgmt/assets/images/point3.png'
import patrolSta2 from '@/views/PeopleMgmt/assets/images/point2.png'
import patrolSta3 from '@/views/PeopleMgmt/assets/images/point1.png'
import securityInformation from './SecurityInformation'
import { getGuardeDetailData } from '@/views/PeopleMgmt/apis'
export default {
  components: {
    securityInformation: securityInformation
  },
  data () {
    return {
      partolLine: {},
      sceneList: [],
      sceneId: '',
      isLoadingMap: false,
      isInitMapFail: false,
      coordinate: [],
      center: [113.26, 23.15],
      centerGPS: [113.26, 23.15],
      redLineInfo: {
        id: '',
        name: '',
        areaType: 6,
        borderPoints: []
      },
      // 当前的地图对象
      mapObj: null,
      cacheMapList: {},
      isShowClass: true,
      isShowPark: false,
      showSecurityPeople: false,
      patrolPoints: [],
      removeArr: [],
      timer: -1,
      removeSecurity: []
    }
  },
  mounted () {
    this.isLoadingMap = true
    // 获取场景并加载地图
    getSceneListData()
      .then(res => {
        if (res.code === '00000') {
          this.isLoadingMap = false
          this.sceneList = res.data
          this.redLineInfo.id = res.data[0].options[0].id
          this.redLineInfo.name = res.data[0].options[0].sceneName
          this.createMap(res.data[0].options[0], '123')
        }
      })
      .catch(err => {
        console.warn(err)
        this.isLoadingMap = false
        this.isInitMapFail = true
      })
  },
  methods: {
    // @params 园区地图传参 任意参数
    createMap (option, params) {
      this.redLineInfo.id = option.id
      this.redLineInfo.name = option.sceneName
      this.sceneId = option.id
      option.mapUrl = option.url
      option.sizeW = option.width
      option.sizeH = option.height
      option.center = [0, 0]
      option.centerGPS = [option.centerLon, option.centerLat]
      if (this.mapObj) {
        this.mapObj.saveOutterPopup(['point-popup'])
        this.mapObj.getMap().setTarget(null)
      }
      // 已经初始化的地图可以直接获取地图对象，进行地图的替换即可
      if (this.cacheMapList[option.id]) {
        this.mapObj = this.cacheMapList[option.id]
        this.mapObj.getMap().setTarget('bitmap')
        this.mapObj.addPopup({
          domId: 'point-popup',
          visible: true,
          arrow: true
        })
        return
      }
      // 如果没有初始化过，才需要进行地图的初始化
      let mapOption = extendObj({
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: '',
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 8,
        minZoom: 1,
        scaleType: 1,
        scale: 2,
        center: [0, 0],
        centerGPS: [113.26, 23.15],
        popupDom: {
          popup: 'popup',
          popupcloser: 'popup-closer',
          popupcontent: 'popup-content'
        }
      }, option)
      // eslint-disable-next-line
      this.cacheMapList[option.id] = new hdmap.initMap(mapOption)
      this.mapObj = this.cacheMapList[option.id]
      // this.mapObj = new hdmap.initMap(mapOption)
      this.mapObj.getMap().setTarget('bitmap')
      this.mapObj.addPopup({
        domId: 'point-popup',
        visible: true,
        arrow: true
      }
      )
      // 获取并显示红线
      getRedPointsData({ sceneId: this.redLineInfo.id, areaType: this.redLineInfo.areaType })
        .then(res => {
          if (res.code === '00000' || res.data.length > 0) {
            this.areaId = res.data[0].id
            this.redLineInfo.borderPoints = showLinePoint(res.data[0].borderPoints)
            this.mapObj.addLine({
              lineType: this.redLineInfo.areaType,
              id: this.redLineInfo.id,
              name: this.redLineInfo.name,
              borderPoints: this.redLineInfo.borderPoints
            }, { color: '#f00', width: 3, lineDash: [10, 10] })
          }
        })
        .catch(res => {
          console.log(res)
        })
      // 获取地图保安点位信息
      // TODO 只有在园区才显示保安
      if (params) {
        this.querySecurity('123')
        clearInterval(this.timer)
        // 启动定时器，更新保安Gps
        this.updateSecurityPoint()
      } else {
        clearInterval(this.timer)
        this.querySecurity()
      }
      // 注册地图上的点击事件
      let that = this
      that.mapObj.regEventListener('singleclick', function (e) {
        that.coordinate = e.coordinate
        if (e.feature) {
          if (e.feature.markerType === 'security') {
            getGuardeDetailData({
              deviceId: e.feature.id,
              pageNo: 1,
              pageSize: 1
            }).then(res => {
              if (res.data.code === '00000') {
                if (res.data.data.length > 0) {
                  that.mapObj.showPopup('point-popup', that.coordinate, { left: 0, top: 0 })
                  that.gardenData = res.data.data[0]
                  that.showSecurityPeople = true
                } else {
                  alert('接口没有保安信息')
                }
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            that.mapObj.closePopup('point-popup')
          }
          if (e.feature.markerType === '2') {
            getHistoryTaskPointData({
              uuid: e.feature.id
            }).then(res => {
              that.$emit('showWarning', res.data.data)
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          that.mapObj.closePopup('point-popup')
        }
      })
    },
    // 园区显示保安图标
    querySecurity (params) {
      getGardenSecurityData({
        'mapId': this.sceneId,
        'hasTask': '43'
      }).then(res => {
        let arr = []
        if (res.data.code === '00000') {
          this.securityList = res.data.data.rows
          this.$emit('securityList', this.securityList, this.sceneId)
          if (params) {
            this.securityList.map(item => {
              let obj = {
                markerType: 'security',
                position: this.mapObj.transfromWGSToBitMap([item.lng, item.lat]),
                imgUrl: securityImg,
                size: [40, 40],
                id: item.deviceId
              }
              arr.push(obj)
            })
            this.removeSecurity = arr
            this.removeSecurity.forEach(item => {
              this.mapObj.removeMarkerBylayerKey(item.id, 'commonLayer')
            })
            this.mapObj.addMarkers(arr)
          }
        }
      })
    },
    // 点击切换园区/停车场
    getShowClass (e) {
      this.cacheMapList = {}
      // 点击园区
      if (e.target.innerHTML === '园区') {
        // 页面在停车场时触发
        if (this.isShowPark) {
          this.isShowClass = true
          this.isShowPark = false
          this.$emit('isShowPark', this.isShowPark)
          this.showSecurity = true
          this.createMap(this.sceneList[0].options[0], '123')
          // this.querySecurity('123')
          clearInterval(this.timer)
          this.updateSecurityPoint()
        }
      } else if (!this.isShowPark) {
        clearInterval(this.timer)
        this.isShowClass = false
        this.isShowPark = true
        this.$emit('isShowPark', this.isShowPark, this.sceneList)
        this.showSecurity = true
        this.createMap(this.sceneList[1].options[0])
        // this.querySecurity()
        // this.updateSecurityPoint()
      }
    },
    reLoad () {
      this.cacheMapList = {}
      // 获取场景地图列表
      getSceneListData()
        .then(res => {
          if (res.code === '00000') {
            this.sceneList = res.data
          }
        })
        .catch(err => {
          console.warn(err)
          this.isInitMapFail = true
        })
      this.sceneList.forEach(item => {
        item.options.forEach(i => {
          if (i.id === this.sceneId) {
            if (this.mapObj.mapConfig.sceneType === 1) {
              this.createMap(i, '123')
            } else {
              this.createMap(i)
            }
          }
        })
      })
    },
    // 返回
    backToSecurityGuard () {
      if (this.removeArr.length > 0) {
        this.removePoints()
      }
      if (this.partolLine.id) {
        this.mapObj.removeLine(this.partolLine)
      }
    },
    // 切换场景地图
    toggleSceneId (id) {
      this.cacheMapList = {}
      this.backToSecurityGuard()
      this.sceneId = id
      this.sceneList.forEach(item => {
        item.options.forEach(i => {
          if (i.id === this.sceneId) {
            this.createMap(i)
          }
        })
      })
    },
    // 渲染巡更路线
    patrolRouteData (params) {
      this.partolLine.borderPoints = showLinePoint(params.borderPoints)
      this.partolLine.lineType = params.areaType
      this.partolLine.id = params.id
      this.partolLine.name = params.areaName
      this.mapObj.addLine(this.partolLine, { color: 'yellow', width: 8 })
    },
    // 渲染巡更点位
    guardTaskpoint (guardInfo) {
      this.patrolPoints = guardInfo.patrolHistoryPoints
      let arr = []
      this.patrolPoints.map((item) => {
        if (item.sceneId === this.sceneId) {
          let obj = {}
          if (item.historyPointStatus === '0') {
            obj.imgUrl = patrolSta0
            obj.markerType = '0'
          } else if (item.historyPointStatus === '1') {
            obj.imgUrl = patrolSta1
            obj.markerType = '1'
          } else if (item.historyPointStatus === '2') {
            obj.imgUrl = patrolSta2
            obj.markerType = '2'
          } else if (item.historyPointStatus === '3') {
            obj.imgUrl = patrolSta3
            obj.markerType = '2'
          } else if (item.historyPointStatus === '4') {
            if (item.pointTime) {
              obj.imgUrl = patrolSta1
            } else {
              obj.imgUrl = patrolSta0
            }
            obj.markerType = '1'
          }
          obj.position = [item.xValue, item.yValue]
          obj.size = [40, 40]
          obj.id = item.uuid
          arr.push(obj)
        }
      })
      this.removeArr = arr
      this.mapObj.addMarkers(arr)
    },
    // 批量移除点位
    removePoints () {
      this.removeArr.forEach(item => {
        this.mapObj.removeMarkerBylayerKey(item.id, 'commonLayer')
      })
    },
    // 更新点位
    // @params guardInfo必传
    updatePoint (guardInfo) {
      let param = {}
      param.id = guardInfo.uuid
      if (guardInfo.historyPointStatus === '0') {
        param.imgUrl = patrolSta0
        param.markerType = '0'
      } else if (guardInfo.historyPointStatus === '1') {
        param.imgUrl = patrolSta1
        param.markerType = '1'
      } else if (guardInfo.historyPointStatus === '2') {
        param.imgUrl = patrolSta2
        param.markerType = '2'
      } else if (guardInfo.historyPointStatus === '3') {
        param.imgUrl = patrolSta3
        param.markerType = '2'
      } else if (guardInfo.historyPointStatus === '4') {
        if (guardInfo.pointTime) {
          param.imgUrl = patrolSta1
        } else {
          param.imgUrl = patrolSta0
        }
        param.markerType = '1'
      }
      this.mapObj.updateMarker(param)
    },
    // 发送解除预警消息
    sentInfo (id) {
      this.$emit('sentInfo', id)
    },
    // 更新保安点位
    updateSecurityPoint () {
      let that = this
      this.timer = setInterval(() => {
        updateSecurityGpsData({
          'mapId': this.sceneId,
          'hasTask': '43'
        }).then(res => {
          let updateData = res.data.data
          // 批量删除
          this.removeSecurity.forEach(item => {
            this.mapObj.removeMarkerBylayerKey(item.id, 'commonLayer')
          })
          // 批量添加
          this.removeSecurity = []
          updateData.map(item => {
            let obj = {
              markerType: 'security',
              position: this.mapObj.transfromWGSToBitMap([item.lng, item.lat]),
              imgUrl: securityImg,
              size: [40, 40],
              id: item.deviceId
            }
            this.removeSecurity.push(obj)
          })
          that.mapObj.addMarkers(this.removeSecurity)
        }).catch(err => {
          console.log(err)
        })
      }, 60000)
    }
  },
  computed: {
    websocketMessage () {
      return this.$store.getters.getWebsocketMessage
    }
  },
  watch: {
    // 接收websocket消息，并更新
    websocketMessage (data) {
      if (data.type === '70008') {
        this.updatePoint(JSON.parse(data.info))
      }
      if (data.type === '70006') {
        this.reLoad()
      }
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.map-container {
  height: 100%;
  width: 100%;
  background: #55616d;
  .bitmap {
    width: 100%;
    position: relative;
  }
  .init-map-fail {
    color: #fff;
    text-align: center;
    margin: 30px 0;
  }
  .people-garden-park {
    box-sizing: border-box;
    position: absolute;
    bottom: 34px;
    right: 20px;
    z-index: 999;
    .garden {
      border-radius: 4px 0 0 4px;
      & > p {
        border-radius: 4px 0 0 4px;
      }
    }
    .park {
      background-image: linear-gradient(-180deg, #ecf0f1 0%, #ffffff 100%);
      border-radius: 0 4px 4px 0;
      width: 62px;
      height: 62px;
      & > p {
        border-radius: 0 4px 4px 0px;
      }
    }
    .people-garden {
      background: #1d8fe1;
      color: #fff;
    }
    .people-park {
      cursor: pointer;
      color: #5a6b78;
    }
  }
  .people-garden-park > p,
  .people-park > p {
    width: 62px;
    height: 62px;
    line-height: 62px;
    text-align: center;
    margin: 0;
    background-color: #fff;
    opacity: 0.85;
    a {
      color: #666;
      text-decoration: none;
    }
  }
  .refresh {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 999;
    cursor: pointer;
  }
}
</style>