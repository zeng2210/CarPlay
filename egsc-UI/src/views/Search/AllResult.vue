<template>
  <div class="search-root">
    <div class="search-top-line"></div>
    <div class="search-container">
      <el-row>
        <el-col :span="7">
          <search-input current="AllResult" :keyword="keyword" v-on:AllResult="reloadData"></search-input>
        </el-col>
      </el-row>

      <!-- 姓名 BEGIN -->
      <div>
        <result-title-bar title="搜索姓名" :keyword="keyword" :total="peopleTotal" toMoreTarget="SearchPeopleResult"></result-title-bar>
        <div class="result-list">
          <people-item v-for="item in peopleList" :item="item" :key="item.peopleId"></people-item>
        </div>
      </div>
      <!-- 姓名 END -->

      <!-- 车牌 BEGIN -->
      <div>
        <result-title-bar title="搜索车牌号" :keyword="keyword" :total="vehicleTotal" toMoreTarget="SearchCarResult"></result-title-bar>
        <div class="result-list">
          <car-item v-for="item in vehicleList" :item="item" :key="item.vehicleNum" v-on:onShowVideoBtnClick="showVideo"></car-item>
        </div>
      </div>
      <!-- 车牌 END -->

      <!-- 巡更设备 BEGIN -->
      <div>
        <result-title-bar title="搜索设备号" :keyword="keyword" :total="patrolEqpmtTotal" toMoreTarget="SearchDeviceResult"></result-title-bar>
        <div class="result-list">
          <device-item v-for="item in patrolEqpmtList" :item="item" :key="item.deviceId" v-on:onShowMsgBtnClick="openMsgDialog" v-on:onShowLocationBtnClick="openLocationDialog"></device-item>
        </div>
      </div>
      <!-- 巡更设备 END -->

      <!-- 摄像头 BEGIN -->
      <div>
        <result-title-bar title="搜索摄像头" :keyword="keyword" :total="cameTotal" toMoreTarget="SearchVideoResult"></result-title-bar>
        <div class="result-list">
          <video-item v-for="item in cameList" :item="item" :key="item.cameraId" v-on:onShowVideoBtnClick="showVideo"></video-item>
        </div>
      </div>
      <!-- 摄像头 END -->

      <send-msg-dialog :visible="sendMsgDialogVisible" :deviceId="currentDeviceId" @closeMsgDialog="closeMsgDialog()"></send-msg-dialog>
      <view-location-dialog :visible="viewLocationDialogVisible" :item="currentDeviceItem" @closeLocationDialog="closeLocationDialog()"></view-location-dialog>

      <!-- 视频组件 点击摄像头时调用 -->
      <video-dialog :previewData="videoParam" :open="videoVisible" @close="closeVideo"></video-dialog>
    </div>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import { showLoading, closeLoading, formatCarInTime } from './assets/js/index'
import { getAllList } from './apis/index'
import SendMsgDialog from './components/SendMsgDialog'
import ViewLocationDialog from './components/ViewLocationDialog'
import PeopleItem from './components/PeopleItem'
import VideoItem from './components/VideoItem'
import CarItem from './components/CarItem'
import DeviceItem from './components/DeviceItem'
import ResultTitleBar from './components/ResultTitleBar'
export default {
  components: {
    ResultTitleBar,
    DeviceItem,
    CarItem,
    PeopleItem,
    VideoItem,
    SearchInput,
    SendMsgDialog,
    ViewLocationDialog
  },
  data () {
    return {
      keyword: this.$route.query.keyword,
      cameList: [],     // 摄像头
      peopleList: [],   // 姓名
      patrolEqpmtList: [],  // 巡更设备
      vehicleList: [],  // 车牌
      cameTotal: 0,
      peopleTotal: 0,
      patrolEqpmtTotal: 0,
      vehicleTotal: 0,
      loading: null,
      videoVisible: false,
      videoParam: {},
      sendMsgDialogVisible: false,
      viewLocationDialogVisible: false,
      currentDeviceId: null,
      currentDeviceItem: null
    }
  },
  methods: {
    /**
     * 重置数据
     */
    resetData () {
    },
    /**
     * 调用接口请求数据
     */
    loadData () {
      this.loading = showLoading()
      this.keyword = this.keyword ? this.keyword.trim() : ''
      getAllList(this.keyword).then(
        function (result) {
          this.resetData()
          closeLoading(this.loading)
          console.log('getDeviceList result: ' + JSON.stringify(result))
          if (result && result.data && (typeof result.data) === 'object') {
            this.cameTotal = result.data.cameList.length
            this.peopleTotal = result.data.peopleList.length
            this.patrolEqpmtTotal = result.data.patrolEqpmtList.length
            this.vehicleTotal = result.data.vehicleList.length

            this.cameList = result.data.cameList.slice(0, 4)
            this.peopleList = result.data.peopleList.slice(0, 4)
            this.patrolEqpmtList = result.data.patrolEqpmtList.slice(0, 4)
            this.vehicleList = result.data.vehicleList.slice(0, 4)
          } else {
            this.$message.error(result)
          }
        }.bind(this)
      ).catch(
        function (error) {
          this.resetData()
          closeLoading(this.loading)
          console.log(error)
        }.bind(this))
    },
    /**
     * 重新加载数据
     * @param data  关键字
     */
    reloadData (data) {
      this.keyword = data
      this.loadData()
    },
    /**
     * 前端分页
     * @param currentPage 页码（从1开始编号）
     */
    changePage (currentPage) {
      let beginIndex = (currentPage - 1) * this.pageSize
      this.currentList = this.allDataList.slice(beginIndex, beginIndex + this.pageSize)
    },
    /**
     * 点击“发送消息”按钮，显示发送消息弹窗
     */
    openMsgDialog (deviceId) {
      this.currentDeviceId = deviceId
      this.sendMsgDialogVisible = true
    },
    /**
     * 点击“查看设备位置”按钮，显示地图弹窗
     */
    openLocationDialog (item) {
      this.viewLocationDialogVisible = true
      this.currentDeviceItem = item
    },
    closeMsgDialog () {
      this.sendMsgDialogVisible = false
    },
    closeLocationDialog () {
      this.viewLocationDialogVisible = false
    },
    showVideo (subDeviceId) {
      this.videoVisible = true
      this.videoParam = { deviceId: subDeviceId }
    },
    closeVideo () {
      this.videoVisible = false
      this.videoParam = {}
    }
  },
  mounted () {
    if (this.keyword) {
      this.loadData()
    }
  },
  filters: {
    carInTime (txt) {
      return formatCarInTime(txt)
    }
  }
}
</script>

<style lang="less" scoped>
@import './assets/css/index';
</style>
