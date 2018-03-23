<template>
  <div>
    <div class="search-top-line"></div>
    <div class="search-container">
      <el-row>
        <el-col :span="7">
          <search-input v-bind:keyword="keyword" current="PicMoreCapt"></search-input>
        </el-col>
      </el-row>

      <result-title-bar title="与该图片相似的抓拍信息" :total="totalRecord" :is-pic-search="true"></result-title-bar>
      <div class="result-list">
        <pic-capt-item v-for="item in currentList" :item="item" :key="item.imageURL" v-on:onPlayVideoBtnClick="callOcxPlayBack"></pic-capt-item>
      </div>

      <div class="result-pager">
        <el-pagination background layout="prev, pager, next, jumper" v-show="totalRecord > pageSize" :page-size="pageSize" :total="totalRecord" @current-change="changePage">
        </el-pagination>
      </div>
    </div>
    <abnormal-dialog :abnormalData="abnormalData" :open.sync="abnormaVisible" @close="handleAbnormalClose" @onAbnormalToVideo="handleAbnormalToVideo"></abnormal-dialog>
    <video-dialog :abnormalShow="abnormalShow" :previewData="previewData" :open.sync="previewVisible" @close="handlePreviewClose" @onPreviewBackToAbnormal="handlePreviewBackToAbnormal"></video-dialog>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import ResultTitleBar from './components/ResultTitleBar'
import PicCaptItem from './components/PicCaptItem'
import { CONFIG } from './assets/js/config'
export default {
  components: {
    PicCaptItem,
    ResultTitleBar,
    SearchInput
  },
  data () {
    return {
      imageUrl: this.$route.query.imageUrl,
      loading: null,
      keyword: '',
      currentList: [],
      allDataList: this.$route.params.allDataList,
      totalRecord: 0,
      pageSize: 12,
      abnormalData: {},
      abnormaVisible: false,
      abnormalShow: false,
      warnShow: false,
      previewVisible: false,
      previewData: {}
    }
  },
  methods: {
    /**
     * 关闭异常视频
     */
    handleAbnormalClose () {
      this.abnormaVisible = false
    },
    /**
     * 异常视频跳入预览
     */
    handleAbnormalToVideo () {
      this.abnormaVisible = false
      this.previewVisible = true
      this.abnormalShow = true
      let deviceId = this.abnormalData.deviceId
      this.previewData = { deviceId: deviceId }
    },
    callOcxPlayBack (item) {
      this.abnormaVisible = true
      this.abnormalData = {
        startTime: item.triggerTime,
        endTime: item.triggerTime,
        deviceId: item.subDeviceId
      }
    },
    /**
     * 关闭预览
     */
    handlePreviewClose () {
      this.previewVisible = false
      this.abnormalShow = false
    },
    /**
     * 预览回到异常视频
     */
    handlePreviewBackToAbnormal () {
      this.abnormaVisible = true
      this.previewVisible = false
      // this.abnormalShow = true
    },
    /**
     * 前端分页
     * @param currentPage 页码（从1开始编号）
     */
    changePage (currentPage) {
      let beginIndex = (currentPage - 1) * this.pageSize
      this.currentList = this.allDataList.slice(beginIndex, beginIndex + this.pageSize)
    }
  },
  mounted () {
    this.pageSize = CONFIG.PAGE_SIZE
    this.totalRecord = this.allDataList ? this.allDataList.length : 0
    if (this.totalRecord > 0) {
      this.currentList = this.allDataList.slice(0, this.pageSize)
    }
  }
}
</script>

<style lang="less" scoped>
@import './assets/css/index';
</style>
