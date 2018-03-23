<template>
  <div>
    <div class="search-top-line"></div>
    <div class="search-container">
      <el-row>
        <el-col :span="7">
          <search-input current="SearchPicResult" v-on:SearchPicResult="reloadData"></search-input>
        </el-col>
      </el-row>

      <origin-pic :imageUrl="imageUrl" :totalFace="totalFace" :totalCapt="totalCapt"></origin-pic>

      <result-title-bar title="与该图片相似的人员信息" :total="totalFace" :is-pic-search="true" :toMoreTarget="SEARCH_TARGETS.PIC_FACE" :picDataList="allDataListFaceLib"></result-title-bar>
      <div class="result-list">
        <pic-face-item v-for="item in currentListFaceLib" :item="item" :key="item.peopleId"></pic-face-item>
      </div>

      <result-title-bar title="与该图片相似的抓拍信息" :total="totalCapt" :is-pic-search="true" :toMoreTarget="SEARCH_TARGETS.PIC_CAPT" :picDataList="allDataListCaptLib"></result-title-bar>
      <div class="result-list">
        <pic-capt-item v-for="item in currentListCaptLib" :item="item" :key="item.imageURL" v-on:onPlayVideoBtnClick="callOcxPlayBack"></pic-capt-item>
      </div>
    </div>
    <abnormal-dialog :abnormalData="abnormalData" :open.sync="abnormaVisible" @close="handleAbnormalClose" @onAbnormalToVideo="handleAbnormalToVideo"></abnormal-dialog>
    <video-dialog :abnormalShow="abnormalShow" :previewData="previewData" :open.sync="previewVisible" @close="handlePreviewClose" @onPreviewBackToAbnormal="handlePreviewBackToAbnormal"></video-dialog>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import { showLoading, closeLoading } from './assets/js/index'
import { searchImage } from './apis/index'
import PicFaceItem from './components/PicFaceItem'
import ResultTitleBar from './components/ResultTitleBar'
import PicCaptItem from './components/PicCaptItem'
import OriginPic from './components/OriginPic'
import { CONFIG } from './assets/js/config'
export default {
  components: {
    OriginPic,
    PicCaptItem,
    ResultTitleBar,
    PicFaceItem,
    SearchInput
  },
  data () {
    return {
      imageUrl: this.$route.query.imageUrl,
      loading: null,
      keyword: '',
      totalFace: 0,
      totalCapt: 0,
      currentListFaceLib: [],
      allDataListFaceLib: [],
      currentListCaptLib: [],
      allDataListCaptLib: [],
      abnormalData: {},
      abnormaVisible: false,
      abnormalShow: false,
      warnShow: false,
      previewVisible: false,
      previewData: {},
      SEARCH_TARGETS: {}
    }
  },
  methods: {
    /**
     * 调用接口请求数据
     */
    loadData () {
      this.loading = showLoading()
      searchImage(this.imageUrl).then(
        function (result) {
          this.resetData()
          closeLoading(this.loading)
          console.log('search pic list result: ' + JSON.stringify(result))
          if (result && result.data && (typeof result.data) === 'object') {
            result = result.data

            this.allDataListFaceLib = result.faceLibList
            this.totalFace = this.allDataListFaceLib.length
            if (this.totalFace > 4) {
              this.currentListFaceLib = result.faceLibList.slice(0, 4)
            } else {
              this.currentListFaceLib = result.faceLibList
            }

            this.allDataListCaptLib = result.captureLibList
            this.totalCapt = this.allDataListCaptLib.length
            if (this.totalCapt > 4) {
              this.currentListCaptLib = this.allDataListCaptLib.slice(0, 4)
            } else {
              this.currentListCaptLib = result.captureLibList
            }
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
    resetData () {
      this.currentListFaceLib = []
      this.allDataListFaceLib = []
      this.currentListCaptLib = []
      this.allDataListCaptLib = []
    },
    /**
     * 重新加载数据
     * @param data  再次上传的图片路径
     */
    reloadData (data) {
      this.imageUrl = data
      this.loadData()
    },
    /**
     * 前端分页
     * @param currentPage 页码（从1开始编号）
     */
    changePage (currentPage) {
      let beginIndex = (currentPage - 1) * this.pageSize
      this.currentListCaptLib = this.allDataListCaptLib.slice(beginIndex, beginIndex + this.pageSize)
    },
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
    }
  },
  mounted () {
    this.SEARCH_TARGETS = CONFIG.ROUTE_NAME
    if (this.imageUrl) {
      this.loadData()
    }
  }
}
</script>

<style lang="less" scoped>
@import './assets/css/index';
</style>
