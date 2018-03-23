<template>
  <div class="search-root">
    <div class="search-top-line"></div>
    <div class="search-container">
      <el-row>
        <el-col :span="7">
          <search-input current="SearchDeviceResult" :keyword="keyword" v-on:SearchDeviceResult="reloadData"></search-input>
        </el-col>
      </el-row>

      <result-title-bar title="搜索设备号" :keyword="keyword" :total="totalRecord"></result-title-bar>
      <div class="result-list">
        <device-item v-for="item in currentList" :item="item" :key="item.deviceId" v-on:onShowMsgBtnClick="openMsgDialog" v-on:onShowLocationBtnClick="openLocationDialog"></device-item>
      </div>

      <div class="result-pager">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          v-show="totalRecord > pageSize"
          :page-size="pageSize"
          :total="totalRecord"
          @current-change="changePage">
        </el-pagination>
      </div>
    </div>
    <send-msg-dialog :visible="sendMsgDialogVisible" :deviceId="currentDeviceId" @closeMsgDialog="closeMsgDialog()"></send-msg-dialog>
    <view-location-dialog :visible="viewLocationDialogVisible" :item="currentItem" @closeLocationDialog="closeLocationDialog()"></view-location-dialog>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import {showLoading, closeLoading} from './assets/js/index'
import {getDeviceList} from './apis/index'
import SendMsgDialog from './components/SendMsgDialog'
import ViewLocationDialog from './components/ViewLocationDialog'
import DeviceItem from './components/DeviceItem'
import ResultTitleBar from './components/ResultTitleBar'
import {CONFIG} from './assets/js/config'
export default {
  components: {
    ResultTitleBar,
    DeviceItem,
    SearchInput,
    SendMsgDialog,
    ViewLocationDialog
  },
  data () {
    return {
      keyword: this.$route.query.keyword,
      totalRecord: 0,   // 总记录数
      currentList: [],  // 当前页显示的数据
      allDataList: [],      // 全部数据
      pageSize: 12,
      loading: null,
      videoVisible: false,
      videoParam: {},
      sendMsgDialogVisible: false,
      viewLocationDialogVisible: false,
      currentDeviceId: '',
      currentItem: null
    }
  },
  methods: {
    /**
     * 重置数据
     */
    resetData() {
      this.totalRecord = 0
      this.currentList = []
      this.allDataList = []
    },
    /**
     * 调用接口请求数据
     */
    loadData() {
      this.loading = showLoading()
      this.keyword = this.keyword ? this.keyword.trim() : ''
      getDeviceList(this.keyword).then(
        function (result) {
          this.resetData()
          closeLoading(this.loading)
          console.log('getDeviceList result: ' + JSON.stringify(result))
          if (result && result.data && (typeof result.data) === 'object') {
            this.allDataList = result.data
            this.totalRecord = result.data.length
            this.currentList = this.allDataList.slice(0, this.pageSize)
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
    reloadData(data) {
      this.keyword = data
      this.loadData()
    },
    /**
     * 前端分页
     * @param currentPage 页码（从1开始编号）
     */
    changePage(currentPage) {
      let beginIndex = (currentPage - 1) * this.pageSize
      this.currentList = this.allDataList.slice(beginIndex, beginIndex + this.pageSize)
    },
    /**
     * 点击“发送消息”按钮，显示发送消息弹窗
     */
    openMsgDialog(deviceId) {
      this.currentDeviceId = deviceId
      this.sendMsgDialogVisible = true
    },
    /**
     * 点击“查看设备位置”按钮，显示地图弹窗
     */
    openLocationDialog(item) {
      this.viewLocationDialogVisible = true
      this.currentItem = item
    },
    closeMsgDialog() {
      this.sendMsgDialogVisible = false
    },
    closeLocationDialog() {
      this.viewLocationDialogVisible = false
      this.currentItem = null
    }
  },
  mounted() {
    this.pageSize = CONFIG.PAGE_SIZE
    if (this.keyword) {
      this.loadData()
    }
    this.currentDeviceId = ''
  }
}
</script>

<style lang="less" scoped>
@import "./assets/css/index";
</style>
