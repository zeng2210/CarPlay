<template>
  <div class="search-root">
    <div class="search-top-line"></div>
    <div class="search-container">
      <el-row>
        <el-col :span="7">
          <search-input current="SearchCarResult" :keyword="keyword" v-on:SearchCarResult="reloadData"></search-input>
        </el-col>
      </el-row>

      <result-title-bar title="搜索车牌号" :keyword="keyword" :total="totalRecord"></result-title-bar>
      <div class="result-list">
        <car-item v-for="item in currentList" :item="item" :key="item.vehicleNum" v-on:onShowVideoBtnClick="showVideo"></car-item>
      </div>

      <div class="result-pager">
        <el-pagination background layout="prev, pager, next, jumper" v-show="totalRecord > pageSize" :page-size="pageSize" :total="totalRecord" @current-change="changePage">
        </el-pagination>
      </div>
    </div>
    <!-- 视频组件 点击摄像头时调用 -->
    <video-dialog :previewData="videoParam" :open="videoVisible" @close="closeVideo"></video-dialog>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import { showLoading, closeLoading } from './assets/js/index'
import { getCarList } from './apis/index'
import CarItem from './components/CarItem'
import ResultTitleBar from './components/ResultTitleBar'
import { CONFIG } from './assets/js/config'

export default {
  components: {
    ResultTitleBar,
    CarItem,
    SearchInput
  },
  data () {
    return {
      keyword: this.$route.query.keyword,
      totalRecord: 0,   // 总记录数
      currentList: [],  // 当前页显示的数据
      allDataList: [],      // 全部数据
      pageSize: 12,
      loading: null,
      camera: require('./assets/images/itemcamera.png'),
      defaultImage: require('./assets/images/vedio.png'),
      videoVisible: false,
      videoParam: {}
    }
  },
  methods: {
    /**
     * 重置数据
     */
    resetData () {
      this.totalRecord = 0
      this.currentList = []
      this.allDataList = []
    },
    /**
     * 调用接口请求数据
     */
    loadData () {
      this.loading = showLoading()
      getCarList(this.keyword).then(
        function (result) {
          this.resetData()
          closeLoading(this.loading)
          console.log('getCameraList result: ' + JSON.stringify(result))
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
    this.pageSize = CONFIG.PAGE_SIZE
    if (this.keyword) {
      this.loadData()
    }
  }
}
</script>

<style lang="less" scoped>
@import './assets/css/index';
</style>
