<template>
  <div class="history">
    <div class="history-title">搜索历史</div>
    <div class="history-list">
      <a class="history-item" v-for="item in historyList" :title="item.historyData" @click="onHistoryItemClick(item)">{{item.historyData}}</a>
    </div>
  </div>
</template>

<script>
import {getHistory} from '../apis/index'
import {CONFIG} from '../assets/js/config'
export default {
  name: 'SearchHistory',
  data () {
    return {
      historyList: []
    }
  },
  methods: {
    loadData () {
      getHistory().then(
        function (result) {
          this.historyList = []
          console.log('getHistoryList result: ' + JSON.stringify(result))
          if (result && result.data) {
            this.historyList = result.data
          } else {
            this.$message.error(result)
          }
        }.bind(this)
      ).catch(
        function (error) {
          this.historyList = []
          console.log(error)
        }.bind(this))
    },
    onHistoryItemClick (item) {
      if (!item || !item.historyType) {
        this.$message.error('未知搜索类型，请重新搜索')
        return
      }
      switch (item.historyType) {
        case CONFIG.SEARCH_TYPE.ALL:
          this.goToTarget(CONFIG.ROUTE_NAME.ALL, CONFIG.ROUTE_PATH.ALL, item.historyData)
          break
        case CONFIG.SEARCH_TYPE.NAME:
          this.goToTarget(CONFIG.ROUTE_NAME.NAME, CONFIG.ROUTE_PATH.NAME, item.historyData)
          break
        case CONFIG.SEARCH_TYPE.CAMERA:
          this.goToTarget(CONFIG.ROUTE_NAME.CAMERA, CONFIG.ROUTE_PATH.CAMERA, item.historyData)
          break
        case CONFIG.SEARCH_TYPE.DEVICE:
          this.goToTarget(CONFIG.ROUTE_NAME.DEVICE, CONFIG.ROUTE_PATH.DEVICE, item.historyData)
          break
        case CONFIG.SEARCH_TYPE.CAR:
          this.goToTarget(CONFIG.ROUTE_NAME.CAR, CONFIG.ROUTE_PATH.CAR, item.historyData)
          break
      }
    },
    goToTarget (targetName, path, keyword) {
      keyword = keyword.trim()
      if (keyword === '') {
        this.$message.error('请输入关键字')
        return
      }
      if (!/^[A-Za-z0-9\s\u4e00-\u9fa5]+$/gi.test(keyword)) {
        this.$message.error('请输入正确的关键字')
        return
      }
      if (this.current === targetName) {
        this.$emit(targetName, keyword)
      } else {
        this.$router.push({
          path: CONFIG.ROUTE_PATH.PREFIX + path,
          query: {
            keyword: keyword
          }
        })
      }
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style lang="less" scoped>
@itemMarginLeft: 15px;
@itemWidth: 118px - 30px;

.history {
  width: 720px;
  margin-top: 60px;
  padding: 0px;

  .history-title {
    font-size:20px;
    color:#edeef0;
  }

  .history-list {
    width: 100%;
    height: 450px;
    margin-top: 15px;
    overflow-y: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;

    .history-item {
      width: @itemWidth - 2;
      height: 38px;
      line-height: 38px;
      margin: 15px @itemMarginLeft;
      padding: 0 15px;
      border:2px solid #FFFFFF;
      background:rgba(255,255,255,0.90);
      color:#5a6b78;
      font-size:14px;
      text-align:center;
      font-family: "PingFangSC-Medium";
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        height: 36px;
        border: 2px solid #1d8fe1;
        background:#ffffff;
        color: #1d8fe1;
      }
    }

    .history-item:nth-child(5n + 1) {
      margin-left: 0 !important;
    }

    .history-item:nth-child(5n) {
      margin-right: 0px !important;
      margin-left: 13px !important;
    }
  }
}
</style>
