<template>
  <div id="mainMap" class="map">
    <div class="countpop-content">
      <area-count-dialog :areaCount="areaCount" id="countPop" :jumpMap="jumpMap"></area-count-dialog>
      <security-dialog :gurdData="gurdData" id="securityInfo" style="width: 400px;height: 180px;background:#fff" @showSentInfo="showSentInfo" ref="sentInfoDialog"></security-dialog>
      <div id="robotInfo" >
        <p>name: {{robotPop.robot}}</p>
        <p>battery: {{robotPop.battery}}</p>
        <p>error: {{robotPop.error}}</p>
      </div>
    </div>
    <!-- 保安发送消息弹窗 -->
    <sent-info :isInfoDialog="isInfoShowDialog" @sentInfoSucc="sentInfoSuccEvent" @closeSentInfo="closeSentInfo" :deviceId="deviceId"></sent-info>
    <transition>
      <p class="show-msg" v-show="sentInfoSucc">消息发送成功</p>
    </transition>
    <h4 v-if="isInitMapFail" class="init-map-fail">地图加载失败……</h4>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AreaCountDialog from '@/views/Map/AreaCountDialog'
import cameraIconChange from '@/assets/images/u349.png'
import broadcastIconChange from '@/assets/images/u939.png'
import normalCountBgIcon from '@/assets/images/u540.png'
import warningCountBgIcon from '@/assets/images/u659.png'
import icoWarning from '@/assets/images/u484.png'
import icoCameraWarn from '@/assets/images/ico-local-abnormal.png'
import icoSecurity from '@/assets/images/ico_local_security.png'
import { formatArea, formatMarker } from '@/views/Map/assets/js/util'
import SentInfo from '@/globalcomponents/partolequipabnor_dialog/src/components/SentInfo'
import expressRobots from '@/views/Map/mixin/express-robot'
import {
  getMarkerListData,
  getAreaListData,
  getSceneInfoData,
  getSecurityListData,
  getSceneListData,
  LOG_TAG
} from '@/views/Map/apis/index'

var tempParam = null
export default {
  name: 'map-init',
  components: {
    AreaCountDialog,
    SentInfo
  },
  props: ['mapDetail', 'datalist'],
  data () {
    return {
      // 地图加载是否成功
      isInitMapFail: false,
      sceneId: '',
      originMap: {},
      currentMap: {},
      mapList: {},
      // map对象
      mapObj: null,
      // 区域统计信息
      areaCount: {},
      showCountPopup: false,
      // 保安信息
      gurdData: {},
      isInfoShowDialog: false,
      sentInfoSucc: false,
      deviceId: '',
      // 所有区域信息(包括区域和电子围栏边界等)
      areaArr: [],
      // 区域列表
      areaList: [],
      // 保安列表
      securityList: [],
      // 是否发送请求
      isRefresh: {
        area: false,
        security: false,
        marker: false
      },
      // 摄像头及广播点位列表
      markerList: [],
      // 保安点位刷新定时器
      securityMarkerTimer: null,
      // 机器人弹窗
      robotPop: {}
    }
  },
  mounted: function () {
    console.log(LOG_TAG + 'mounted MapInit')
    tempParam = this
    getSceneListData({ sceneType: '1' })
      .then(res => {
        let mapDetail = res.data.data[0]
        // 将小区全图地图信息保存至originMap
        tempParam.originMap = res.data.data[0]
        // 如果路由跳转携带参数,即从楼栋图跳回至区域图时
        if (tempParam.$route.params.sceneFrom) {
          getSceneInfoData(tempParam.$route.params.sceneFrom)
            .then(res => {
              let mapDetailNext = res.data.data
              // 将当前地图(currentMap)设置为请求获得的区域图信息
              tempParam.currentMap = mapDetailNext
              // 加载地图信息
              tempParam.changeMap(mapDetailNext)
            })
            .catch(err => {
              // 加载地图失败
              this.isInitMapFail = true
              // 保存popup
              this.mapObj.saveOutterPopup(['countPop', 'securityInfo', 'robotInfo'])
              // 清空地图视口
              this.mapObj.getMap().setTarget(null)
              console.warn(LOG_TAG + err)
            })
        } else {
          // 当前地图设为小区全图
          tempParam.currentMap = mapDetail
          // 加载地图信息
          tempParam.changeMap(mapDetail)
        }
      })
      .catch(err => {
        console.warn(LOG_TAG + err)
        this.isInitMapFail = true
        if (this.mapObj) {
          this.mapObj.saveOutterPopup(['countPop', 'securityInfo', 'robotInfo'])
          this.mapObj.getMap().setTarget(null)
        }
      })
  },
  /**
   * @description 关闭保安点位刷新定时器
   */
  destroyed: function () {
    if (tempParam.securityMarkerTimer) {
      clearInterval(tempParam.securityMarkerTimer)
      tempParam.securityMarkerTimer = null
    }
  },
  mixins: [expressRobots],
  methods: {
    /**
     * @description 保安发送消息显示事件
     */
    showSentInfo () {
      this.isInfoShowDialog = true
    },
    /**
     * @description 消息框关闭
     */
    closeSentInfo () {
      this.isInfoShowDialog = false
    },
    /**
     * @description 保安发送消息成功
     */
    sentInfoSuccEvent () {
      this.isInfoShowDialog = false
      this.sentInfoSucc = true
      var timer = setTimeout(() => {
        this.sentInfoSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    ...mapActions(['showReturn', 'hideReturn']),
    /**
     * @description 切换地图的方法
     * @param {Object} mapDetail 地图信息
     */
    changeMap: function (mapDetail) {
      if (mapDetail === null) {
        this.mapObj && this.mapObj.saveOutterPopup(['countPop', 'securityInfo', 'robotInfo'])
        this.mapObj && this.mapObj.getMap().setTarget(null)
        this.isInitMapFail = true
        return false
      }
      this.isInitMapFail = false
      // 控制返回按钮是否显示
      if (mapDetail.id === this.originMap.id) {
        this.hideReturn()
      } else {
        this.showReturn(() => {
          this.changeMap(this.originMap)
        })
      }
      let curScene = mapDetail.id
      // 如果地图对象存在
      if (this.mapObj) {
        // 如果mapDetail是当前地图, 则更新区域点位信息后return
        if (tempParam.currentMap.id === mapDetail.id) {
          this.refreshMap(mapDetail)
          return false
        }
        /*
          如果mapDetail不是当前地图, 即切换地图时
          保存popup
        */
        this.mapObj.saveOutterPopup(['countPop', 'securityInfo', 'robotInfo'])
        // 清除点位信息
        this.mapObj.clearMap()
        // 如果保安点位刷新的定时器存在则清除定时器
        if (tempParam.securityMarkerTimer) {
          clearInterval(tempParam.securityMarkerTimer)
          tempParam.securityMarkerTimer = null
        }
        // 清空所有列表信息
        tempParam.areaList = []
        tempParam.areaArr = []
        tempParam.securityList = []
        tempParam.markerList = []
        // 保安弹窗-关闭弹窗
        this.mapObj.closePopup()
        this.gurdData = {}
        // 清空地图视口
        this.mapObj.getMap().setTarget(null)
      }
      // 如果地图加载过
      if (tempParam.mapList[curScene]) {
        console.log(LOG_TAG + 'exist map')
        // mapObj设为该地图
        tempParam.mapObj = tempParam.mapList[curScene]
        // 切换地图
        tempParam.mapObj.getMap().setTarget('mainMap')
        // 添加统计浮框
        this.mapObj.addPopup('countPop')
        document.getElementById('countPop').parentNode.style.border = 'none'
        // 添加保安信息弹框
        this.mapObj.addPopup({
          domId: 'securityInfo',
          visible: true,
          arrow: true
        })
        // 添加机器人信息弹框
        this.mapObj.addPopup({
          domId: 'robotInfo',
          visible: true,
          arrow: true
        })
        tempParam.showCountPopup = true
        // 发送区域及点位请求, 更新区域和点位信息
        this.refreshMap(mapDetail)
      } else {
        // 如果地图没有加载过, 则加载该地图
        console.log(LOG_TAG + 'init map')
        tempParam.addMap(mapDetail, function () {
          tempParam.mapObj.getMap().setTarget('mainMap')
        })
      }
      // 当前地图设为mapDetail
      this.currentMap = mapDetail
    },
    /**
     * @description 加载地图
     * @param {Object} mapDetail 地图信息
     * @param {string} cb 回调函数
     */
    addMap: function (mapDetail, cb) {
      this.sceneId = mapDetail.id
      let sceneId = this.sceneId
      let centerGPSData = [mapDetail.centerLon, mapDetail.centerLat]
      try {
        // 初始化地图信息并保存至mapList数组中, 数组下标为该地图的id
        // eslint-disable-next-line
        this.mapList[sceneId] = new hdmap.initMap({
          gisEngine: 'bitmap',
          sizeW: 1920,
          sizeH: 1080,
          domId: 'mainMap',
          mapUrl: mapDetail.url,
          maxZoom: 4,
          minZoom: 2,
          center: [0, 0],
          centerGPS: centerGPSData,
          scale: mapDetail.scale,
          scaleType: mapDetail.scaleType
        })
      } catch (error) {
        console.warn(LOG_TAG + error)
      }
      console.log(LOG_TAG + 'initMap end')
      this.mapObj = this.mapList[sceneId]
      // 添加统计浮框
      this.mapObj.addPopup('countPop')
      document.getElementById('countPop').parentNode.style.border = 'none'
      // 添加保安信息弹框
      this.mapObj.addPopup({
        domId: 'securityInfo',
        visible: true,
        arrow: true
      })
      // 添加机器人信息弹框
      this.mapObj.addPopup({
        domId: 'robotInfo',
        visible: true,
        arrow: true
      })
      this.refreshMap(mapDetail)
      // 添加鼠标点击事件
      this.mapObj.regEventListener('singleclick', args1 => {
        console.log(args1)
        console.log(LOG_TAG + 'single click event')
        // 如果点击空白地方则关闭所有弹窗
        if (!args1.feature) {
          this.mapObj.closePopup()
          // 保安弹窗-清空保安弹窗信息
          this.gurdData = {}
          console.log(LOG_TAG + 'It`s empty')
          return false
        } else if (args1.feature.markerType) {
          console.log(LOG_TAG + 'It`s a marker')
          // 如果点击的是保安点位
          if (args1.feature.markerType === 'guarder') {
            // 显示保安弹窗
            this.mapObj.showPopup('securityInfo', args1.feature.position, { top: 0, left: 0 })
            this.gurdData.gurdId = args1.feature.id
            this.deviceId = args1.feature.deviceId
            this.$refs.sentInfoDialog.getData()
          } else if (args1.feature.markerType === 'robot') {
            this.robotPop = args1.feature
            this.mapObj.showPopup('robotInfo', args1.feature.position, { top: 0, left: 0 })
          } else {
            // 否则上报点位信息
            tempParam.$emit('singleClickEvent', args1.feature)
          }
        } else if (args1.feature.areaType) {
          // 如果点击的是楼栋区域
          if (args1.feature.areaType === 2) {
            // 封装路由跳转携带参数
            let data = {}
            data.queryData = {}
            data.queryData.parentArea = args1.feature.id
            data.sceneFrom = {}
            data.sceneFrom.sceneId = this.currentMap.id
            // 如果保安点位刷新定时器存在, 则清空定时器
            if (tempParam.securityMarkerTimer) {
              clearInterval(tempParam.securityMarkerTimer)
              tempParam.securityMarkerTimer = null
            }
            // 路由跳转至楼栋页面(buildplan)
            tempParam.$router.push({
              path: '/buildplan',
              name: 'BuildPlan',
              params: data
            })
          } else {
            // 如果点击的是分区区域, 则切换地图至区域图
            let params = {}
            params.sceneId = args1.feature.linkSceneId
            tempParam.jumpMap(params)
            console.log(LOG_TAG + 'It`s an area')
          }
        } else if (args1.feature.lineType === 5) {
          // 如果点击的是电子围栏
          console.log(LOG_TAG + 'It`s an fence')
          // 电子围栏是报警状态则上报警告点位信息
          if (args1.feature.warnMarker) {
            tempParam.$emit('singleClickEvent', args1.feature.warnMarker)
          }
        } else {
          console.log(LOG_TAG + 'Some wrong with param or other type')
        }
      })
      cb && typeof (cb === 'function') && cb()
    },
    /**
     * @description 切换至区域图
     * @param {Object} params 为包含sceneId属性的对象
     */
    jumpMap: function (params) {
      // sceneId为空时弹出提示信息
      if (params.sceneId === '') {
        this.$message({
          message: '没有关联的场景',
          type: 'warning'
        })
      } else {
        getSceneInfoData(params)
          .then(res => {
            let mapDetail = res.data.data
            this.changeMap(mapDetail)
          })
          .catch(err => {
            // 提示地图加载失败
            this.isInitMapFail = true
            // 保存popup
            this.mapObj.saveOutterPopup(['countPop', 'securityInfo', 'robotInfo'])
            // 清空地图视口
            this.mapObj.getMap().setTarget(null)
            console.warn(LOG_TAG + err)
          })
      }
    },
    /**
     * @description 刷新地图
     * @param {Object} mapDetail 地图信息
     */
    refreshMap: function (mapDetail) {
      this.isRefresh.area = false
      this.isRefresh.security = false
      this.isRefresh.marker = false
      let params = {}
      params.sceneId = mapDetail.id
      // 获取区域列表
      getAreaListData(params).then(res => {
        console.log(res.data.data)
        this.areaList = []
        this.areaArr = formatArea(res.data.data)
        this.isRefresh.area = true
      })
        .catch(err => {
          this.isRefresh.area = true
          console.warn(LOG_TAG + err)
        })
      // 获取保安列表
      params.hasTask = 'true'
      getSecurityListData(params).then(res => {
        console.log(res.data.data.rows)
        this.securityList = res.data.data.rows
        this.isRefresh.security = true
      })
        .catch(err => {
          this.isRefresh.security = true
          console.warn(LOG_TAG + err)
        })
      if (mapDetail.id !== tempParam.originMap.id) {
        getMarkerListData(params).then(res => {
          console.log(res.data.data)
          // 包装点位信息
          this.markerList = formatMarker(res.data.data)
          this.isRefresh.marker = true
        })
          .catch(err => {
            this.isRefresh.security = true
            console.warn(LOG_TAG + err)
          })
      }
    },
    /**
     * @description 更新点位信息
     * @param {Object} params 场景对象
     */
    updateMarkers: function (params) {
      // 如果是主图则显示摄像头广播的统计点位
      if (params.sceneType === 1) {
        // 添加鼠标移入移出事件
        this.mapObj.regEventListener('pointermove', args2 => {
          // 如果是区域
          if (args2.feature) {
            // 如果统计弹窗未显示
            if (!this.showCountPopup) {
              console.log(LOG_TAG + 'pointermove event')
              this.showCountPopup = true
              // 计算区域中心点
              let borderPoints = hdmap.utils.getAreaCenter(
                args2.feature.extProperties.borderPoints[0]
              )
              // 在区域中心点显示统计弹窗
              this.mapObj.showPopup('countPop', borderPoints)
              // 将区域信息保存至areaCount, 用于统计弹窗子组件AreaCountDialog显示
              this.areaCount = args2.feature.extProperties
            }
          } else {
            // 如果不是区域并且统计弹框显示时
            if (this.showCountPopup) {
              // 关闭统计弹窗
              this.mapObj.closeCommonPopup()
              this.showCountPopup = false
            }
          }
        })
      }
      let that = this
      // 如果没有保安点位刷新的定时器则添加该定时器
      if (that.securityMarkerTimer === null) {
        that.securityMarkerTimer = setInterval(function () {
          let securityParams = {}
          securityParams.sceneId = params.id
          securityParams.hasTask = 'true'
          getSecurityListData(securityParams).then(res => {
            that.securityList = res.data.data.rows
            that.isRefresh.security = true
            that.addSecurityMarkers()
          })
            .catch(err => {
              that.isRefresh.security = true
              console.warn(LOG_TAG + err)
            })
        }, 60000)
      }
    },
    /**
     * @description 添加摄像头广播点位
     */
    showMarkers: function () {
      // 批量添加点位信息
      this.mapObj.addMarkers(this.markerList, { scale: 0.7 })
      // 控制点位信息的显示和隐藏
      !this.datalist[0].isActived && this.mapObj.hideMarkers('camera')
      !this.datalist[1].isActived && this.mapObj.hideMarkers('video')
    },
    /**
     * @description 加载区域信息
     * @param {Object} params 包含sceneId属性的对象
     * @param {number} type sceneType
     */
    showAreas: function (params, type) {
      for (let i = 0; i < this.areaArr.length; i++) {
        // 为小区区域(areaType:1)和楼栋(areaType:2)添加区域和统计点位, 若区域为报警则更新报警区域样式
        if (this.areaArr[i].areaType === 1 || this.areaArr[i].areaType === 2) {
          // 为区域信息添加countSecurity属性, 并默认为0
          this.areaArr[i].countSecurity = 0
          // 保存区域信息数组
          this.areaList.push(this.areaArr[i])
          this.mapObj.addArea(this.areaArr[i])
          // 更新预警区域样式
          if (this.areaArr[i].countWarning > 0) {
            // 开启区域报警动画
            this.mapObj.warnAnimation(this.areaArr[i])
            // 添加报警统计点位
            this.addCountMarker('countWarning', this.areaArr[i])
          } else {
            // 取消区域报警动画
            this.mapObj.warnCancel(this.areaArr[i])
          }
          // 若是小区全图,则添加摄像头和广播的统计点位
          if (type === 1) {
            this.addCountMarker('countCamera', this.areaArr[i])
            this.addCountMarker('countBroadcast', this.areaArr[i])
            !this.datalist[0].isActived && this.mapObj.hideCountMarkers('countCamera')
            !this.datalist[1].isActived && this.mapObj.hideCountMarkers('countBroadcast')
          }
        }
        // 更新电子围栏样式
        if (this.areaArr[i].areaType === 5) {
          // 添加电子围栏的线
          let lineInfo = {}
          lineInfo.id = this.areaArr[i].id
          lineInfo.name = this.areaArr[i].areaName
          lineInfo.lineType = this.areaArr[i].areaType
          lineInfo.borderPoints = this.areaArr[i].borderPoints[0]
          if (this.areaArr[i].borderPoints[0].length > 0) {
            this.mapObj.addLine(lineInfo, { color: '#7740dc', width: 8 })
            // 更新电子围栏报警样式
            if (this.areaArr[i].areaDetailInfo.areaStatus !== 101) {
              hdmap.commonConfig.getRouteStyleAnimation(this.mapObj, lineInfo)
              // 添加电子围栏报警点位
              lineInfo.warnMarker = {}
              lineInfo.warnMarker.position = hdmap.utils.getWarningPosition(lineInfo)
              lineInfo.warnMarker.id = lineInfo.id
              lineInfo.warnMarker.markerType = 'fence'
              lineInfo.warnMarker.markerName = lineInfo.id
              lineInfo.warnMarker.imgUrl = icoCameraWarn
              this.mapObj.addMarker(lineInfo.warnMarker, { anchor: [0.5, 0.9], scale: 0.7 })
            } else {
              // 取消电子围栏报警样式
              hdmap.commonConfig.warnRouteCancel(this.mapObj, lineInfo)
            }
          }
        }
      }
      this.addSecurityMarkers()
    },
    /**
     * @description 添加保安点位函数
     */
    addSecurityMarkers: function () {
      console.log(LOG_TAG + 'add security marker')
      // 清除原先的保安点位
      this.mapObj.removeLayerByLayerKey('guarderLayer')
      // 将区域信息中保安统计数量置为0
      for (let i = 0; i < this.areaList.length; i++) {
        this.areaList[i].countSecurity = 0
      }
      // 清除原先的popup
      this.mapObj.closePopup()
      // 获得新的保安点位列表
      for (let j = 0; j < this.securityList.length; j++) {
        if (this.securityList[j].lng !== null && this.securityList[j].lat !== null) {
          // 将保安的GPS坐标转换后设为保安坐标
          let securityPositionXY = this.mapObj.transfromWGSToBitMap(
            [this.securityList[j].lng, this.securityList[j].lat]
          )
          this.securityList[j].position = securityPositionXY
          // 添加安保人员的点位
          this.securityList[j].userId && this.mapObj.addMarker({
            id: this.securityList[j].userId,
            deviceId: this.securityList[j].deviceId,
            markerType: 'guarder',
            markerName: this.securityList[j].userName,
            position: securityPositionXY,
            imgUrl: icoSecurity
          }, { scale: 0.7 })
          // 控制保安点位的显示及隐藏
          !this.datalist[2].isActived && this.mapObj.hideMarkers('guarder')
          // 计算该区域内安保人员
          for (let i = 0; i < this.areaList.length; i++) {
            // 判断点位是否在区域内
            let inOrOut = hdmap.utils.judgePointInsidePolygon(
              this.securityList[j].position,
              this.areaList[i].borderPoints[0]
            )
            // 如果保安点位在区域内, 则该区域的保安统计数量加1
            if (inOrOut !== 'out') {
              this.areaList[i].countSecurity++
            }
          }
          // 保安弹窗-显示保安弹窗
          if (JSON.stringify(this.gurdData) !== '{}' && this.securityList[j].userId === this.gurdData.gurdId) {
            this.mapObj.showPopup('securityInfo', this.securityList[j].position, { top: 0, left: 0 })
          }
        }
      }
    },
    /**
     * @description 添加统计点位函数
     * @param {string} type 统计点位类型
     * @param {Object} params 区域信息
     */
    addCountMarker: function (type, params) {
      let countMarkerData = {}
      countMarkerData.id = params.id
      countMarkerData.sceneId = params.linkSceneId
      switch (type) {
        case 'countCamera':
          countMarkerData.markerType = 'countCamera'
          countMarkerData.position = hdmap.utils.getCameraCountPoint(
            params.borderPoints[0]
          )
          countMarkerData.url = cameraIconChange
          countMarkerData.baseUrl = normalCountBgIcon
          countMarkerData.cameraNum = params.countCamera.toString()
          this.mapObj.addCountMarker(countMarkerData)
          break
        case 'countBroadcast':
          countMarkerData.markerType = 'countBroadcast'
          countMarkerData.position = hdmap.utils.getBroadcastCountPoint(
            params.borderPoints[0]
          )
          countMarkerData.url = broadcastIconChange
          countMarkerData.baseUrl = normalCountBgIcon
          countMarkerData.broadcastNum = params.countBroadCast.toString()
          this.mapObj.addCountMarker(countMarkerData)
          break
        case 'countWarning':
          countMarkerData.markerType = 'countWarning'
          countMarkerData.position = hdmap.utils.getWarningConutPoint(
            params.borderPoints[0]
          )
          countMarkerData.url = icoWarning
          countMarkerData.baseUrl = warningCountBgIcon
          countMarkerData.warnNum = params.countWarning.toString()
          this.mapObj.addCountMarker(countMarkerData)
      }
    }
  },
  watch: {
    // 监听请求是否发出
    isRefresh: {
      handler: function (isRefresh) {
        if (tempParam.currentMap.id === tempParam.originMap.id) {
          if (this.isRefresh.area && this.isRefresh.security) {
            this.mapObj.clearMap()
            this.showAreas(this.currentMap.id, this.currentMap.sceneType)
            this.updateMarkers(this.currentMap)
            this.isRefresh.area = false
            this.isRefresh.security = false
          }
        } else {
          if (this.isRefresh.area && this.isRefresh.security && this.isRefresh.marker) {
            this.mapObj.clearMap()
            this.showAreas(this.currentMap.id, this.currentMap.sceneType)
            this.updateMarkers(this.currentMap)
            // 如果是分区区域图则显示摄像头广播点位
            this.showMarkers()
            this.isRefresh.area = false
            this.isRefresh.security = false
            this.isRefresh.marker = false
          }
        }
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/* @import '/assets/css/animate.css'; */

.countpop-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 100px;
  z-index: -1;
}

.init-map-fail {
  color: #fff;
}

#mainMap {
  height: 100%;
  width: 100%;
  position: relative;
  .init-map-fail {
    position: absolute;
    top: 0;
    left: 50%;
    transition: translateX(-50%);
  }
}

.show-msg {
  color: #fff;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 2px;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
</style>
