<template>
  <div>
    <div class="search-top-line"></div>
    <div class="search-container">
      <el-row>
        <el-col :span="7">
          <search-input v-bind:keyword="keyword" current="PicMoreFace"></search-input>
        </el-col>
      </el-row>

      <result-title-bar title="与该图片相似的人员信息" :total="totalRecord" :is-pic-search="true"></result-title-bar>
      <div class="result-list">
        <pic-face-item v-for="item in currentList" :item="item" :key="item.peopleId"></pic-face-item>
      </div>

      <div class="result-pager">
        <el-pagination background layout="prev, pager, next, jumper" v-show="totalRecord > pageSize" :page-size="pageSize" :total="totalRecord" @current-change="changePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import PicFaceItem from './components/PicFaceItem'
import ResultTitleBar from './components/ResultTitleBar'
import { CONFIG } from './assets/js/config'
export default {
  components: {
    ResultTitleBar,
    PicFaceItem,
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
      pageSize: 12
    }
  },
  methods: {
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
