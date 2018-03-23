<template>
  <el-container class="people-main">
    <div class="route-line-park">
      <span><img src="./assets/images/u16193.png" alt=""> 已巡更点</span>
      <span><img src="./assets/images/u16194.png" alt=""> 未巡更点</span>
      <span><img src="./assets/images/warnpic.png" alt=""> 未按时巡更</span>
    </div>
    <div class="content">
      <el-container class="main-container" width="100%">
        <el-aside class="main-show" width="75%">
          <div class="security-warning">
            <el-button type="text" @click="showWarning" style="display:none">预警</el-button>
            <security-warning :showWarningDetail="showWarningDetail" @infoSentnSuccClick='infoSentnSuccClick' :goMessage="goMessage" @refresh="refresh" :sendObject="sendObject" @closeWarnDetail="closeWarnDetail" @mapPointRefresh="mapPointRefresh"></security-warning>
          </div>
          <template>
            <p class="show-warning" v-if="dissWarnSucc">警报解除成功</p>
          </template>
          <transition>
            <p class="show-warning" v-show="infoSentnSucc">消息发送成功</p>
          </transition>
          <people-mgmt-map @securityList="securityList" @isShowPark="showPark" ref="peopleMap" @sentInfo="sentInfo" @showWarning="showWarning"></people-mgmt-map>
          <security-information v-if="showSecurityPeople" :gardenData="gardenData"></security-information>
          <sent-info :isInfoDialog="isInfoDialog" @closeInfo='closeInfoEvent' @sentInfoSucc="sentInfoSuccEvent" :id="id"></sent-info>
        </el-aside>
        <el-main width="480px" class="main-menu">
          <div>
            <el-row v-if="isShowPark" class='scene-select'>
              <el-col :span="24">
                <el-select placeholder="请选择楼层" v-model="selectDefault" @change="parkSelectChange">
                  <el-option v-for="item in sceneList" :key="item.sceneName" :label="item.sceneName" :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-tabs type="card" v-model="activeName" v-show="showSecurity">
              <el-tab-pane label="保安" name="first" class="main-nav">
                <el-scrollbar :native="false" :style="getHeightStyle(60)" :noresize="false" ref="SecurityTreeScroll">
                  <el-menu class="el-menu-vertical-demo">
                    <el-menu-item v-for="(item,i) in gardenSecurityData" :key="i" :index="++i+''" @click="getSecurityGuard(item)">
                      <span>{{item.deviceName }}</span>
                      <span class="online-security fr">当前巡更人员：{{ item.userName }}
                        <i class="el-icon-arrow-right"></i>
                      </span>
                    </el-menu-item>
                  </el-menu>
                </el-scrollbar>
              </el-tab-pane>
            </el-tabs>
            <div class="security fade-in-right" v-if="isShow">
              <header>
                <div class="security-header" @click="backToSecurityGuard">
                  <span><img class="back-to-security" src="./assets/images/u16759.png" alt=""></span>
                  <span>保安</span>
                </div>
              </header>
              <el-scrollbar :native="false" :style="getHeightStyle(60)" :noresize="false" ref="SecurityTreeScroll">
                <h4>设备号：{{this.securityinfo.deviceName}} </h4>
                <div class="security-content">
                  <div class="people">
                    <div class="patro-card">当前巡更人员</div>
                    <div class="people-msg clearfix">
                      <div class="people-img fl"><img :src="this.securityinfo.propertyDto.facePic" alt=""></div>
                      <div class="people-information fl">
                        <div class="people-security">
                          <span class="security-name">{{ this.securityinfo.propertyDto.name }}</span>
                          <span v-show="this.securityinfo.propertyDto.personType==5">保安</span>
                        </div>
                        <p class="phone-color"><img src="./assets/images/u15709.png" alt="">{{ this.securityinfo.propertyDto.phone }}</p>
                        <p class='guadr-address'>{{ this.securityinfo.propertyDto.company }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="security-number">
                    <el-table :data="this.securityinfo.patrolHistoryPoints" style="width: 100%">
                      <el-table-column prop="orderNo" label="序号" width="50" align="center">
                      </el-table-column>
                      <el-table-column prop="pointName" label="巡更点" width="180" align="center">
                      </el-table-column>
                      <el-table-column prop="pointTime" label="打卡时间" width="180" align="center">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="people">
                    <div class="patro-card">历史巡更人员</div>
                  </div>
                  <div v-for="(item,index) in  this.patrolHistory" :key="index">
                    <div v-if="item.propertyDto !== null">
                      <div class="people-msg clearfix">
                        <div class="people-img fl"><img :src="item.propertyDto.facePic" alt=""></div>
                        <div class="people-information fl">
                          <div class="people-security">
                            <span class="security-name">{{item.propertyDto.name}}</span>
                            <span>保安</span>
                          </div>
                          <p class="phone-color"><img src="./assets/images/u15709.png" alt="">{{item.propertyDto.phone}}</p>
                          <p class="guadr-address">{{item.propertyDto.company}}</p>
                        </div>
                      </div>
                      <div class="security-number">
                        <el-table :data="item.patrolHistoryPoints" style="width: 100%">
                          <el-table-column prop="orderNo" label="序号" width="50" align="center">
                          </el-table-column>
                          <el-table-column prop="pointName" label="巡更点" align="center" width="160">
                          </el-table-column>
                          <el-table-column prop="historyPointStatus" align="left" width="40">
                            <template slot-scope="scope">
                              <el-button size="small" type="text" v-show="scope.row.historyPointStatus=== '2' ||scope.row.historyPointStatus=== '3'" @click="historyShowWarning(scope.$index,item.patrolHistoryPoints,item)">
                                <img src="./assets/images/warnpic.png" alt="">
                              </el-button>
                            </template>
                          </el-table-column>
                          <el-table-column prop="pointTime" label="打卡时间" width="180" align="center">
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>
<script>
import { getGuardeDetailData, getPatrolRouteData } from '@/views/PeopleMgmt/apis'
import securityInformation from './components/SecurityInformation'
import securityWarning from './components/SecurityWarning'
import peopleMgmtMap from './components/PeopleMgmtMap'
import sentInfo from './components/PushMessage'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapCommonState } = createNamespacedHelpers('common')
export default {
  name: 'PeopleMgmt',
  components: {
    securityInformation: securityInformation,
    securityWarning: securityWarning,
    peopleMgmtMap: peopleMgmtMap,
    sentInfo: sentInfo
  },
  data () {
    return {
      sendObject: {
        clockUpPosition: '',
        clockUpTime: '',
        timeoutTime: '',
        deviceNumber: '',
        keepName: '',
        warnUuid: '',
        deviceId: ''
      },
      goMessage: false,
      isShowPark: false,
      showWarningDetail: false,
      activeName: 'first',
      showSecurity: true,
      isShow: false,
      showSecurityPeople: false,
      gardenSecurityData: [],
      patrolHistory: [],
      dissWarnSucc: false,
      sceneList: [],
      securityinfo: {},
      sceneId: '',
      selectDefault: '',
      patrolRouteData: [],
      gardenData: {},
      isInfoDialog: false,
      infoSentnSucc: false,
      id: ''
    }
  },
  methods: {
    getHeightStyle (h = 0) {
      return { height: (this.mainContainHeight - h) + 'px' }
    },
    // 地图点击弹出保安超时预警
    showWarning (warnData) {
      this.showWarningDetail = true
      this.goMessage = true
      this.sendObject = {}
      this.sendObject = {
        clockUpPosition: warnData.pointName,
        clockUpTime: warnData.planTime,
        timeoutTime: warnData.timeOut,
        deviceNumber: warnData.deviceName,
        keepName: warnData.userName,
        uuid: warnData.uuid,
        isMapClick: true,
        pointTime: warnData.pointTime,
        deviceId: warnData.deviceId
      }
    },
    // 历史巡更人员预警信息
    historyShowWarning (index, item, ros) {
      this.showWarningDetail = true
      this.sendObject = {
        clockUpPosition: item[index].pointName,
        clockUpTime: item[index].planTime,
        timeoutTime: item[index].timeOut,
        deviceNumber: ros.deviceName,
        keepName: ros.propertyDto.name,
        uuid: item[index].uuid
      }
      this.goMessage = false
    },
    closeWarnDetail () {
      this.showWarningDetail = false
    },
    handleNodeExpand (node) {
      this.$refs.SecurityTreeScroll.update()
    },
    // 更新超时预警信息(查询点击的超时打卡点 根据uuid查)
    refresh () {
      let sumHistory = this.patrolHistory
      for (let i = 0; i < sumHistory.length; i++) {
        for (let j = 0; j < sumHistory[i].patrolHistoryPoints.length; j++) {
          if (sumHistory[i].patrolHistoryPoints[j].uuid === this.sendObject.uuid) {
            this.patrolHistory[i].patrolHistoryPoints[j].historyPointStatus = '4'
          }
        }
      }
    },
    // 当前巡查保安详细信息
    getSecurityGuard (item) {
      getGuardeDetailData({
        deviceId: item.deviceId,
        pageNo: 1,
        pageSize: 3
      }).then(res => {
        if (res.data.code === '00000') {
          if (res.data.data.length > 0) {
            this.showSecurity = !this.showSecurity
            this.isShow = !this.isShow
            this.securityinfo = res.data.data[0]
            this.gardenData = res.data.data[0]
            this.patrolHistory = res.data.data.slice(1)
            getPatrolRouteData({
              paramId: this.securityinfo.paramId,
              sceneId: this.sceneId
            }).then(res => {
              if (res.data.code === '00000') {
                this.patrolRouteData = res.data.data
                this.$refs.peopleMap.guardTaskpoint(this.securityinfo)
                this.$refs.peopleMap.patrolRouteData(this.patrolRouteData)
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$message({
              message: '查询保安详细信息失败，请刷新重试',
              type: 'warning',
              center: true
            })
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 返回保安巡查列表
    backToSecurityGuard () {
      this.$refs.peopleMap.backToSecurityGuard()
      this.showSecurity = !this.showSecurity
      this.isShow = !this.isShow
    },
    // 显示解除预警成功
    infoSentnSuccClick () {
      this.showWarningDetail = false
      this.dismissWarnSucc()
    },
    // 延迟
    dismissWarnSucc () {
      this.dissWarnSucc = true
      var timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 当前巡查保安列表
    securityList (rows, sceneId) {
      this.gardenSecurityData = rows
      this.sceneId = sceneId
      this.isShow = false
      this.showSecurity = true
    },
    /* 停车场园区切换
     @param 显示停车场场景切换下拉项
     @param 场景列表项
   */
    showPark (isShowPark, sceneList) {
      this.isShowPark = isShowPark
      this.isShow = false
      this.showSecurity = true
      this.$refs.peopleMap.backToSecurityGuard()
      if (sceneList) {
        this.sceneList = sceneList[1].options
        this.selectDefault = this.sceneList[0].id
      }
    },
    // 停车场场景切换
    parkSelectChange () {
      this.$refs.peopleMap.toggleSceneId(this.selectDefault)
      this.showSecurity = true
      this.isShow = false
    },
    // 保安弹窗发送消息
    sentInfo (id) {
      this.isInfoDialog = true
      this.id = id
    },
    // 发送消息弹窗关闭
    closeInfoEvent () {
      this.isInfoDialog = false
    },
    // 发送消息成功
    sentInfoSuccEvent () {
      this.infoSentnSucc = true
      var timer = setTimeout(() => {
        this.infoSentnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 更新巡更点状态
    mapPointRefresh (params) {
      this.$refs.peopleMap.updatePoint(params)
    }
  },
  computed: {
    ...mapCommonState(['mainContainHeight'])
  },
  watch: {
    'mainContainHeight' () {
      this.$refs.SecurityTreeScroll.update()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url("./assets/less/variable.less");
.people-main {
  .content {
    height: 100%;
    width: 100%;
    .main-container {
      height: 100%;
    }
    .main-show {
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
      }
    }
  }
  .el-aside,
  .el-main {
    overflow: hidden;
  }
  .main-menu {
    padding: 0;
    height: 100%;
    .main-nav {
      height: 100%;
      margin: 0px;
      border: none;
      .scroll {
        height: 720px;
      }
    }
    .card {
      border: none;
      padding: 0;
    }
    .nav-item {
      height: 64px;
      line-height: 60px;
      margin: 0;
      padding: 0;
      padding-left: 20px;
      font-size: 14px;
      cursor: pointer;
      border-bottom: 1px solid @border-color;
      box-sizing: border-box;
    }
    .nav-item:hover {
      background-color: @hover-color;
    }
    .nav-item.isActive {
      background-color: #ddd;
    }
    .oneline-security {
      position: relative;
      right: 0px;
    }
    .cleaner:hover {
      background-color: @hover-color;
    }
    .cleaner {
      width: 490px;
      height: 128px;
      padding-top: 20px;
      padding-left: 15px;
      cursor: pointer;
      border-bottom: 1px solid @border-color;
      box-sizing: border-box;
    }
    .cleaner-right {
      font-weight: 400;
      font-style: normal;
      font-size: 12px;
      color: #999999;
      padding-left: 15px;
      text-align: left;
      .cleaner-info {
        line-height: 1.2;
      }
    }
    .cleaner-right > p {
      margin: 0;
      line-height: 22px;
    }
    .cleaner-right > p.phone-color {
      color: #666;
      vertical-align: text-top;
      img {
        width: 16px;
        position: relative;
        top: 3px;
      }
    }
    .cleaner-right > p.cleaner-color {
      color: #797979;
    }
    .cleaner-name {
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      color: @black;
      margin-right: 30px;
    }
    box-sizing: border-box;
    border: 1px solid #ccc;
    .fade-in-right {
      animation: fadeInRight 0.1s ease-out;
    }
    .line {
      position: relative;
      top: 60px;
      // left: 194px; //有保洁的时候
      left: 97px; //没保洁栏的时候
      height: 2px;
      width: 100%;
      display: block;
    }
  }
  .security {
    width: 480px;
    text-decoration: none;
    color: #333;
    header {
      height: 50px;
      border: 1px solid #ddd;
      box-sizing: border-box;
    }
    .security-header {
      width: 100px;
      cursor: pointer;
      span {
        height: 100%;
        line-height: 50px;
        padding-left: 10px;
      }
      .back-to-security {
        position: relative;
        top: 3px;
      }
    }
    h4 {
      margin-top: 15px;
      margin-bottom: 15px;
      font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
      font-weight: 700;
      font-style: normal;
      padding-left: 20px;
      font-size: 14px;
    }
    .security-content {
      padding-left: 20px;
      font-size: 14px;
    }
    .people-line {
      position: relative;
      top: -3px;
      padding-left: 8px;
    }
    .people-msg {
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #cad3db;
    }
    .people-information {
      font-weight: 400;
      font-style: normal;
      font-size: 12px;
      color: #999999;
      padding-left: 25px;
      text-align: left;
    }
    .people-information > p {
      line-height: 26px;
    }
    .people-information > p.phone-color {
      color: #666;
      vertical-align: text-top;
      margin-top: 15px;
      img {
        width: 16px;
        position: relative;
        top: 3px;
      }
    }
    .security-name {
      font-size: 15px;
      font-weight: bold;
      font-style: normal;
      color: #556a79;
      margin-right: 20px;
    }
    .patro-card {
      height: 30px;
      line-height: 30px;
      background: #c7d1d9;
      padding-left: 5px;
      color: #fff;
      margin-right: 24px;
    }
    .people-img {
      width: 90px;
    }
    .people-img > img {
      width: 84px;
      height: 84px;
      border: 1px solid #e4e9ed;
    }
    .security-number {
      margin-bottom: 10px;
      button {
        width: 30px;
      }
      .el-table__row .cell {
        padding-left: 10px;
      }
    }
  }
  .show-warning {
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
    z-index: 1000;
  }
  .scene-select {
    padding-left: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }
  .route-line-park {
    position: absolute;
    font-size: 12px;
    bottom: 34px;
    left: 20px;
    width: 360px;
    height: 60px;
    line-height: 60px;
    background: #ddd;
    z-index: 999;
    border-radius: 4px;
    img {
      vertical-align: middle;
      margin-right: 3px;
    }
    span {
      padding-left: 28px;
    }
  }
}
</style>
<style lang="less">
@import url("./assets/less/variable.less");
@import url("../../assets/css/animate.css");
@import url("./assets/less/common.css");
.people-main {
  height: 760px;
  position: relative;
  .main-menu {
    .main-nav {
      .el-icon-arrow-right {
        font-weight: bold;
        position: relative;
        right: -5px;
      }
      .is-active {
        color: #333;
        background-color: @border-color;
      }
    }
    .el-menu-item {
      border-top: 1px solid #ddd;
      height: 70px;
      line-height: 70px;
    }
    .el-menu-item:last-child {
      border-bottom: 1px solid #ddd;
    }
    .el-menu-item:hover {
      background-color: @border-color;
    }
    .online-security {
      padding-right: 30px;
    }
  }
  .el-tabs__header {
    width: 100%;
    height: 70px;
    margin: 0;
    .el-tabs__item {
      width: 97px;
      height: 70px;
      line-height: 70px;
      background: inherit;
      box-sizing: border-box;
      font-size: 16px;
      color: #666666;
      text-align: center;
      border: none;
    }
    .el-tabs__item.is-active {
      border-top-width: 4px;
      height: 71px;
      font-weight: bold;
      border-bottom-color: @white;
    }
  }
  .el-tabs__nav-scroll {
    height: 71px;
    .el-tabs__nav {
      border: none;
    }
  }
  .security-number .el-table__row .cell {
    padding-left: 10px;
  }
  .el-tabs__nav {
    width: 100%;
  }
  .el-table {
    border: none;
  }
  .el-table td,
  .el-table th.is-leaf,
  .el-table tr,
  .el-table td {
    border-bottom: none;
  }
  .el-table__body-wrapper {
    border-bottom: none;
  }
  .el-table__row {
    background-color: #fff;
  }
  .el-table__row:hover {
    background-color: #fff !important;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    content: none;
  }
  .el-scrollbar > .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .el-input__inner {
    width: 200px;
  }
}
</style>