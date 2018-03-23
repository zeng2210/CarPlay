<template>
  <div class="search-root">
    <div class="search-top-line"></div>
    <div class="search-container">
      <el-row>
        <el-col :span="7">
          <search-input current="SearchPeopleResult" :keyword="keyword" v-on:SearchPeopleResult="reloadData" :showDropList="false"></search-input>
        </el-col>
      </el-row>

      <result-title-bar title="搜索姓名" :keyword="keyword" :total="totalRecord"></result-title-bar>
      <div class="result-list">
        <people-item v-for="item in currentList" :item="item" :key="item.peopleId"></people-item>
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
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import {showLoading, closeLoading} from './assets/js/index'
import {getUserList} from './apis/index'
import PeopleItem from './components/PeopleItem'
import ResultTitleBar from './components/ResultTitleBar'
import {CONFIG} from './assets/js/config'
export default {
  components: {
    ResultTitleBar,
    PeopleItem,
    SearchInput
  },
  data () {
    return {
      keyword: this.$route.query.keyword, // 查询关键字
      totalRecord: 0,     // 总记录数
      currentList: [],    // 当前页显示的数据
      allDataList: [],    // 全部数据
      pageSize: 12,
      loading: null
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
      getUserList(this.keyword).then(
        function (result) {
          this.resetData()
          closeLoading(this.loading)
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
    }
  },
  mounted() {
    this.pageSize = CONFIG.PAGE_SIZE
    if (this.keyword) {
      this.loadData()
    }
  }
}
</script>

<style lang="less" scoped>
@import "./assets/css/index";
</style>
