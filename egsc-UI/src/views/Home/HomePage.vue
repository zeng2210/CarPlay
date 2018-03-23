<template>
  <el-container id="app">
    <el-container id="mainContainer">
      <el-main class="map-content" :class="{'map-whole':!isCollapseOn,'map-part':isCollapseOn}">
        <div class="warning-bar animated fadeInRight" :class="{ 'collapse-on':isCollapseOn}" id="homewrap">
          <div class="icon-btn" @click="onChangeStyle(index,item)" v-for="(item, index) in datalist" :key="item.name" :class="{ togbefore: item.isActived===true, togafter: item.isActived===false}">
            <img class="arrow" :src="item.activeSrc" height="100%" width="100%">
          </div>
          <div v-on:click="onCollapse" class="icon-btn" v-if="isCollapseOn===true">
            <img class="arrow" :src="iocons.offCollapse" height="100%" width="100%">
          </div>
          <div v-on:click="onUnfold" class="icon-btn" v-else>
            <img class="arrow" :src="iocons.onCollapse" height="100%" width="100%">
          </div>
          <!--模拟推送消息 -->
          <!-- <div class="icon-btn" @click="mockSendMsg()">
            <img class="arrow" height="16">
            <p>模拟推送</p>
          </div> -->
        </div>
        <transition name="fade" mode="out-in">
          <map-init ref="mapInit" :datalist="datalist" @singleClickEvent="singleClickEvent"></map-init>
        </transition>
        <transition>
          <p class="show-msg" v-show="dissWarnSucc">警报解除成功</p>
        </transition>
        <!-- 可视对讲组件 begin -->
        <!-- <CellGateCall ref="call" :videoIntercomData="videoIntercomData" :videoIntercomCellGateRecordData="videoIntercomCellGateRecordData" @cellGateCallDialogClose="cellGateCallDialogClose" @getAllCallRecordData="getAllCallRecordData" @getCallRecordData="getCallRecordData" v-if="showAJBCellGateDialog" :open.sync="showAJBCellGateDialog"></CellGateCall>
        <OwnerCall ref="call" :videoIntercomData="videoIntercomData" :videoIntercomOwnerRecordData="videoIntercomOwnerRecordData" @ownerCallDialogClose="ownerCallDialogClose" @getAllCallRecordData="getAllCallRecordData" @getCallRecordData="getCallRecordData" v-if="showAJBOwnerDialog" :open.sync="showAJBOwnerDialog"></OwnerCall>
        <div v-show=false>
          <object type='application/x-vlc-plugin' ref='PlayOcx_2' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...'>
            <param name='wmode' value='transparent'>
          </object>
        </div> -->
        <!-- 可视对讲组件 end -->
      </el-main>
      <div id="aside" v-show="isCollapseOn===true">
        <side-bar></side-bar>
      </div>
    </el-container>

    <!-- <keep-alive>
        <home-footer></home-footer>
      </keep-alive> -->
    <broadcast-dialog :broadcastData="broadcastData" :open.sync="broadcastVisible" :deviceId="deviceId"></broadcast-dialog>
    <accessDialog :alarmData="alarmData" :open.sync="isPopOut" v-if="isPopOut"></accessDialog>
    <ParkinglotDialog :parkinglotData="parkinglotData" :open.sync="isParkinglotDialogVisible" v-if="isParkinglotDialogVisible"></ParkinglotDialog>
    <park-dialog :warnData="warnData" :open.sync="isWarnOut" @warningDialogOn="warningDialogOn" ref='warnList'></park-dialog>
    <person-dialog :personData="personData" :open.sync="isPersonWarn"></person-dialog>
    <!-- <personoff-dialog :open.sync="personoffVisible" :personoffData="personoffData"></personoff-dialog> -->
    <partolabnor-Dialog :open.sync="partolabnorVisible"></partolabnor-Dialog>
    <video-dialog :previewData="previewData" :warnShow="warnShow" :open="previewVisible" @close="handleVideoClose" @onPreviewBackToWarn="handlePreviewBackToWarn"></video-dialog>
    <warn-dialog :warningData="warningData" :open.sync="warningVisible" @close="handleWarnClose" @onWarnToPreview="handleWarnToPreview" @dismissWarnSuccShow="dismissWarnSuccShow" @updateGuardStatus="updateGuardStatus"></warn-dialog>
  </el-container>
</template>


<script>
import MapInit from '@/views/Map/MapInit'
import SideBar from '@/components/SideBar'
import ParkDialog from '@/globalcomponents/warn_dialog/src/ParkWarnDialog'
import accessDialog from '@/globalcomponents/doorAccess_dialog/src/AccessWarnDialog'
import ParkinglotDialog from '@/globalcomponents/parkinglot_dialog/src/ParkinglotDialog'
// 摄像头选中状态
import cameraIconChange from '@/assets/images/icon_camera_active.png'
// 摄像头未选中状态
import cameraIcon from '@/assets/images/icon_camera_default.png'
// 广播选中状态
import broadcastIconChange from '@/assets/images/icon_broadcast_active.png'
// 广播未选中状态
import broadcastIcon from '@/assets/images/icon_broadcast_default.png'
// 保安人员选中状态
import securityIconChange from '@/assets/images/icon_security_active.png'
// 保安人员未选中状态
import securityIcon from '@/assets/images/icon_security_default.png'
// 展开预警按钮 <<
import onCollapse from '@/assets/images/icon_warning_unfold.png'
// 收起预警按钮 >>
import offCollapse from '@/assets/images/icon_warning_fold.png'
import { getParkinglotWarnCount } from '@/views/Home/apis/index'
import { sendMessage } from '@/websocket/index'
import { mapActions } from 'vuex'
// import moment from 'moment'
import parkWarnCode from '@/views/Home/mixin/parkwarn_code'
import accessWarnCode from '@/views/Home/mixin/accesswarn-code'
// 图片数组,用于控制图标的是否active的样式更替
const images = [
  { first: cameraIcon, second: cameraIconChange },
  { first: broadcastIcon, second: broadcastIconChange },
  { first: securityIcon, second: securityIconChange }
]

export default {
  name: 'Home',
  components: {
    MapInit,
    SideBar,
    ParkDialog,
    accessDialog,
    ParkinglotDialog
  },
  data () {
    return {
      deviceId: '',
      // 广播弹框
      broadcastData: {},
      broadcastVisible: false,
      // map对象
      msg: '这是首页的地图页面！请添加相应的功能',
      // 预警栏是否显示
      isCollapseOn: false,
      // onCollapse-展开 offCollapse-收起
      iocons: {
        onCollapse: onCollapse,
        offCollapse: offCollapse
      },
      activeName: '1',
      num: 0,
      // 地图右上角图标类型
      datalist: [
        {
          name: '摄像头',
          activeSrc: images[0].second,
          isActived: true
        },
        {
          name: '广播',
          activeSrc: images[1].first,
          isActived: false
        },
        {
          name: '保安',
          activeSrc: images[2].first,
          isActived: false
        }
      ],
      isWarnOut: false,
      isPopOut: false,
      alarmData: {},

      // 刷新地图timer
      refreshMapTimer: null,
      // 停车场
      parkinglotData: {},
      isParkinglotDialogVisible: false
    }
  },
  mixins: [parkWarnCode, accessWarnCode],
  methods: {
    ...mapActions(['updateWarmingNum', 'updateAllCallNum', 'updateOnCallNum']),
    /**
     * @description 点位单击事件
     * @param {Object} params 点位信息
     */
    singleClickEvent (params) {
      console.log(params)
      switch (params.markerType) {
        case 'camera':
          this.showOcxDialog(params)
          if (params.markerTypeOrigin === 1) {
            console.log('枪机摄像头')
          } else {
            console.log('球机摄像头')
          }
          break
        case 'warning':
          this.showOcxDialog(params)
          break
        case 'video':
          this.deviceId = params.deviceId
          this.alertBroadcastDialog('broadcastView')
          break
        case 'countCamera':
        case 'countBroadcast':
        case 'countWarning':
          this.$refs.mapInit.jumpMap({ sceneId: params.sceneId })
          break
        case 'fence':
          console.log('电子围栏报警弹窗')
          break
      }
    },
    /**
     * @description 折叠
     */
    onCollapse () {
      this.isCollapseOn = false
      document.getElementsByClassName('ol-zoom')[0].style.left = '8px'
    },
    /**
     * @description 打开
     */
    onUnfold () {
      this.isCollapseOn = true
      document.getElementsByClassName('ol-zoom')[0].style.left = '296px'
    },
    accessWarnDialog (type) {
      this.isPopOut = true
      this.alarmData.type = type
    },
    /**
     * @description 广播弹框
     * @param {string} type 类型
     */
    alertBroadcastDialog (type) {
      this.broadcastVisible = true
      this.broadcastData.type = type
      this.broadcastData.monitorID = '1'
    },
    /**
     * @description 更换按钮图片
     * @param {number} index 下标
     * @param {string} item 图标类型
     */
    onChangeStyle (index, item) {
      item.isActived = !item.isActived
      item.activeSrc = item.isActived
        ? images[index].second
        : images[index].first
      switch (index) {
        case 0:
          this.cameraClick(item.isActived)
          break
        case 1:
          this.broadcastClick(item.isActived)
          break
        case 2:
          this.securityClick(item.isActived)
          break
      }
    },
    /**
     * @description 点击摄像头图标
     * @param {boolean} showOrHide 显示或隐藏
     */
    cameraClick (showOrHide) {
      console.log('this is cameraClick')
      this.showOrHideMarkers(showOrHide, 'countCamera') ||
        this.showOrHideMarkers(showOrHide, 'camera')
    },
    /**
     * @description 点击广播图标
     * @param {boolean} showOrHide 显示或隐藏
     */
    broadcastClick (showOrHide) {
      console.log('this is broadcastClick')
      this.showOrHideMarkers(showOrHide, 'countBroadcast') ||
        this.showOrHideMarkers(showOrHide, 'video')
    },
    /**
     * @description 点击保安图标
     * @param {boolean} showOrHide 显示或隐藏
     */
    securityClick (showOrHide) {
      console.log('this is securityClick')
      this.showOrHideMarkers(showOrHide, 'guarder')
      if (!showOrHide) {
        this.$refs.mapInit.mapObj.closePopup()
        this.$refs.mapInit.gurdData = {}
      }
    },
    /**
     * @description 显示或隐藏
     * @param {boolean} showOrHide 显示或隐藏
     * @param {string} type 类型
     */
    showOrHideMarkers (showOrHide, type) {
      if (this.$refs.mapInit.mapObj) {
        if (showOrHide) {
          this.$refs.mapInit.mapObj.showCountMarkers(type) ||
            this.$refs.mapInit.mapObj.showMarkers(type)
        } else {
          this.$refs.mapInit.mapObj.hideCountMarkers(type) ||
            this.$refs.mapInit.mapObj.hideMarkers(type)
        }
      }
    },
    /**
     * @description 处理可视对讲呼叫消息
     * @param {Object} data
     */
    processWebsocketData (data) {
      console.log('processWebsocketData:' + data.info)
    },
    /* 模拟服务器推送消息 */
    mockSendMsg () {
      sendMessage()
    }
  },
  mounted: function () {
    console.log('mounted HomePage')
    this.updateAllCallNum([])
    // 初次加载车位占用预警数量
    getParkinglotWarnCount(1).then(res => {
      this.updateWarmingNum(['parkingOccupiedNum', res.data.data])
    }).catch(err => {
      console.warn(err)
    })
    // 初次加载车辆异常预警数量
    getParkinglotWarnCount(2).then(res => {
      this.updateWarmingNum(['carExceptionNum', res.data.data])
    }).catch(err => {
      console.warn(err)
    })
    this.$root.Bus.$on('onParkingOccupiedWarming', () => {
      console.log('点击车位占用')
      this.isParkinglotDialogVisible = true
      this.parkinglotData.type = 'parkinglotoccupied'
      console.log(this.parkinglotData.type)
      this.parkinglotData.dialogTitle = '固定车位被占预警'
    })
    this.$root.Bus.$on('onCarExceptionWarming', () => {
      console.log('点击车辆异常')
      this.isParkinglotDialogVisible = true
      this.parkinglotData.type = 'carexception'
      console.log(this.parkinglotData.type)
      this.parkinglotData.dialogTitle = '车辆异常(长时停放)'
    })
  },
  computed: {
    websocketMessage () {
      return this.$store.getters.getWebsocketMessage
    },
    warmingNums () {
      return this.$store.state.mutations.warmingNums
    }
  },
  watch: {
    websocketMessage (data) {
      console.log('watch' + JSON.stringify(data))
      console.log('业主呼叫未处理数量' + this.warmingNums.ownerCallNum)
      console.log('单元门呼叫未处理数量' + this.warmingNums.cellGateCallNum)
      // 初始化用于临时保存正在呼叫记录数量的变量
      this.ownerCallNum = this.onOwnerCallNum
      this.cellGateCallNum = this.onCellGateCallNum

      // 门禁范围
      if (typeof (data) === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      if (data.type >= 30000 && data.type <= 39999) {
        console.log(data)
        if (data.info) {
          let infoObj = JSON.parse(data.info)
          if (infoObj.deviceType === 1) {
            this.updateWarmingNum(['entranceDeviceNum', infoObj.count])
          } else if (infoObj.deviceType === 2) {
            this.updateWarmingNum(['sidewalkDeviceNum', infoObj.count])
          }
        }
      } else if ((data.type >= 20000 && data.type <= 29999) || (data.type >= 91001 && data.type <= 93000)) {
        let that = this
        that.$refs.mapInit.changeMap(that.$refs.mapInit.currentMap)
        if (that.refreshMapTimer) {
          clearTimeout(that.refreshMapTimer)
        }
        that.refreshMapTimer = setTimeout(function () {
          that.$refs.mapInit.changeMap(that.$refs.mapInit.currentMap)
        }, 1000)
      } else if (data.type === '00010') {
        var countInfo = JSON.parse(data.info)
        this.updateWarmingNum(['parkingOccupiedNum', countInfo.occupyNum])
        this.updateWarmingNum(['carExceptionNum', countInfo.abnormalNum])
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/* @import '/assets/css/animate.css'; */

body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100%;
  background-color: #fff !important;
}

.el-main {
  color: #333;
  width: 100%;
  padding: 0;
  text-align: center;
  background-color: #fff;
}

.map {
  padding: 0;
}

#mainContainer {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #55616d;
  position: relative;
}

.el-header {
  height: 100px !important;
}

.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  cursor: pointer;
}

.row-bg {
  padding: 10px 0;
}

.map-content {
  width: 100%;
  position: absolute;
  background: #55616d;
  height: 100%;
  left: 0;
  top: 0;
  &.map-whole {
    left: 0;
  }
  &.map-part {
    left: -288px;
  }
}

.warning-bar {
  position: absolute;
  top: 31px;
  right: 30px;
  height: 64px;
  width: 320px;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  &.collapse-on {
    right: 262px;
  }
  .icon-btn {
    display: inherit;
    flex-direction: column;
    align-items: center;
    width: 64px;
    height: 64px;
    text-align: center;
    vertical-align: middle;
    z-index: 10;
    font-size: 0.7em;
    cursor: pointer;
    color: #666;
    border-radius: 2px;
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    opacity: 0.9;
    border-radius: 5px;
    margin-left: 12px;
    &.togbefore {
      color: white;
      background: #1d8fe1;
    }
    &.togafter {
      color: #666;
      background: #f2f2f2;
    }
  }
  p {
    line-height: 30px;
  }
}

#time {
  color: #13d5dc;
  text-align: right;
  margin-right: 10px;
}

#aside {
  background-color: white;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
  bottom: 0;
  overflow-y: hidden;
}

.show-msg {
  color: #fff;
  background: rgba(23, 23, 24, 0.9);
  border-radius: 2px;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -20%);
}
</style>
