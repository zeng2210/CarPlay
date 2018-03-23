<template>
  <div class="access-dialog">
    <h3 :type="warnType" :clickTime="clickTime">
      <span>
        <span v-html="title"></span>
      </span>
    </h3>
    <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll"  v-if='showPark===5' >
      <el-table ref="multipleTable" :show-header="true" v-loading="loading"  :data="entranceWarnData"   stripe style="width: 100%"  @selection-change="handleSelectionChange" :default-sort = "{prop: 'createTime, eventStatus', order: 'descending'}">
       <EmptyIcon slot="empty"></EmptyIcon>
       <el-table-column type="selection" :selectable="handleUnselect">
       </el-table-column>
       <el-table-column prop="eventTime" width="180" label="时间" :formatter="eventTimeFormat">
       </el-table-column>
       <el-table-column prop="orgName" width="190" class-name="selcol-style" label="地点">
       </el-table-column>
       <el-table-column prop="description" width="180" class-name="selcol-style" label="描述">
       </el-table-column>
       <el-table-column prop="securityStatus" width="120" class-name="selcol-style" label="保安状态" :formatter="securityStatusFormat">
       </el-table-column>
       <el-table-column prop="eventStatus" width="120" class-name="selcol-style" label="事件状态" :formatter="eventStatusFormat">
       </el-table-column>
       <el-table-column width="100" label="监控">
         <template slot-scope="scope">
           <img src='../images/icon_monitor.png' @click="monitor(scope.$index,entranceWarnData)">
         </template>
       </el-table-column>
     </el-table>
    </el-scrollbar>
    <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll"  v-if='showPark===6' >
      <el-table ref="multipleTable" :show-header="true" :data="sidewalkWarmData"   stripe style="width: 100%" @selection-change="handleSelectionChange"   :default-sort = "{prop: 'createTime, eventStatus', order: 'descending'}">
        <EmptyIcon slot="empty" ></EmptyIcon>
        <el-table-column type="selection" :selectable="handleUnselect">
          <!-- <template slot-scope="scope"><el-checkbox v-model="checked" v-if="scope.row.eventStatus==0"></el-checkbox></template> -->
        </el-table-column>
        <el-table-column prop="eventTime" width="180" label="时间"  :formatter="eventTimeFormat">
        </el-table-column>
        <el-table-column prop="orgName" width="170" class-name="selcol-style" label="地点">
        </el-table-column>
        <el-table-column prop="description" width="170" class-name="selcol-style" label="描述">
        </el-table-column>
        <el-table-column prop="securityStatus" width="120" class-name="selcol-style" label="保安状态" :formatter="securityStatusFormat">
        </el-table-column>
        <el-table-column prop="eventStatus" width="120" class-name="selcol-style" label="事件状态" :formatter="eventStatusFormat">
        </el-table-column>
        <el-table-column width="100" label="监控">
          <template slot-scope="scope">
            <img src='../images/icon_monitor.png' @click="monitor(scope.$index,sidewalkWarmData)">
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div class="dismiss-warn">
      <el-button type="info" disabled v-show="isClick" >解除预警</el-button>
      <el-button type="primary" @click="dismissWarn" v-show="!isClick">解除预警</el-button>
    </div>
    <transition>
      <p class="show-msg" v-show="dissWarnSucc">警报解除成功</p>
    </transition>
  </div>
</template>
<script>
import {warnEventList, queryAlertList} from './apis/index'
import {formatDate} from '@/views/VideoIntercomApp/assets/js/date.js'
import EmptyIcon from '@/components/EmptyIcon'
export default {
  name: 'accessDialog',
  props: {
    warnType: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    dissWarnSucc: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    clickTime: {
      type: String,
      required: false,
      default () {
        return ''
      }
    }
  },
  components: {
    EmptyIcon
  },
  data() {
    return {
      // Mock.mock(
      eventName: 1,
      outerVisible: false,
      isClick: true,
      title: '门禁预警',
      showPark: 1,
      entranceWarnData: [],
      sidewalkWarmData: [],
      multipleSelection: [],
      cacheSelection: [],
      currentPage: 1,
      pageSize: 6,
      firstPageCount: 6,
      loading: false,
      hasNext: false
    }
    // )
  },
  methods: {
    EventList () {
      let that = this
      that.loading = true
      warnEventList({
        pageNo: 1,
        pageSize: 6,
        eventType: '20009'
      }).then(res => {
        // console.log(res)
        let tableScroll = document.querySelector('.el-scrollbar__wrap')
        let lastScrollTop = tableScroll.scrollTop
        that.loading = false
        if (res.data.success) {
          if (res.data.data.rows.length > that.entranceWarnData.length) {
            that.entranceWarnData = that.entranceWarnData.concat(res.data.data.rows)
          } else {
            that.entranceWarnData = that.entranceWarnData
          }
          if (this.currentPage === 1) {
            this.hasNext = res.data.total > 6
          } else {
            this.hasNext = res.data.total > (this.currentPage - 1) * 18 + 6
          }
          this.$nextTick(() => {
            this.$refs.SecurityTreeScroll.update()
            tableScroll.scrollTop = lastScrollTop
            // this.returnStatus = true
          })
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    entranceWarnList() {
      console.log('进入预警列表查询：' + this.eventName)
      let that = this
      let clickTim = this.clickTime
      if (this.currentPage > 1) {
        this.pageSize = 18
      }
      queryAlertList(this.eventName, this.currentPage, this.pageSize, this.firstPageCount, clickTim).then(res => {
        console.log(res)
        if (that.eventName === 1) { // 门禁预警列表填充
          if (res.total > that.entranceWarnData.length) {
            // that.entranceWarnData = that.entranceWarnData.concat(res.rows)
            this.entranceWarnData.push.apply(that.entranceWarnData, res.rows)
          } else {
            that.entranceWarnData = that.entranceWarnData
          }
          if (this.currentPage === 1) {
            this.hasNext = res.total > 6
          } else {
            this.hasNext = res.total > (this.currentPage - 1) * 18 + 6
          }
          let tableScroll = document.querySelector('.el-scrollbar__wrap')
          let lastScrollTop = tableScroll.scrollTop
          this.$nextTick(() => {
            this.$refs.SecurityTreeScroll.update()
            tableScroll.scrollTop = lastScrollTop
          })
        } else if (that.eventName === 2) { // 人行道闸列表填充
          if (res.total > that.sidewalkWarmData.length) {
            that.sidewalkWarmData = that.sidewalkWarmData.concat(res.rows)
          } else {
            that.sidewalkWarmData = that.sidewalkWarmData
          }
          if (this.currentPage === 1) {
            this.hasNext = res.total > 6
          } else {
            this.hasNext = res.total > (this.currentPage - 1) * 18 + 6
          }
          let tableScroll = document.querySelector('.el-scrollbar__wrap')
          let lastScrollTop = tableScroll.scrollTop
          this.$nextTick(() => {
            this.$refs.SecurityTreeScroll.update()
            tableScroll.scrollTop = lastScrollTop
          })
        }
        this.toggleSelection(that.multipleSelection)
      }).catch(err => {
        console.log(err)
        this.EventList()
      })
    },
    // 保安状态格式化
    securityStatusFormat: function (row, column) {
      var securityStatus = row.securityStatus
      if (securityStatus === 0) {
        return '未派遣'
      } else if (securityStatus === 1) {
        return '已派遣'
      }
      return '/'
    },
    // 事件状态格式化
    eventStatusFormat: function (row, column) {
      var eventStatus = row.eventStatus
      if (eventStatus === 0) {
        return '预警中'
      } else if (eventStatus === 1) {
        return '预警已解除'
      }
      return '/'
    },
    // 时间格式化
    eventTimeFormat: function (row, column) {
      let eventTime = row.eventTime
      let date = ''
      if (eventTime) {
        date = new Date(parseInt(eventTime))
      } else {
        date = new Date()
      }
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    handleUnselect (row, index) {
      console.log(row + ',' + index)
      if (row.eventStatus === 0) {
        return true
      } else {
        return false
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.cacheSelection = val
      // console.log(val)
      let add = 0
      for (let i = 0; i < this.multipleSelection.length; i++) {
        add = add + this.multipleSelection[i].eventStatus
      }
      // console.log(add)
      if (add === this.multipleSelection.length) {
        this.isClick = true
      } else {
        this.isClick = false
      }
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 解除预警
    dismissWarn () {
      // console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        this.$emit('dismissWarn', this.multipleSelection)
      } else {
        this.$emit('dismissWarn')
      }
    },
    monitor (index, data) {
      let wanrInfoObj = {}
      var startTime = formatDate(new Date(data[index].createTime), 'yyyy-MM-dd hh:mm:ss')
      var address = data[index].description == null ? '' : data[index].description
      wanrInfoObj.eventName = startTime + '  ' + address // 预警事件名称
      wanrInfoObj.startTime = startTime
      wanrInfoObj.index = index
      wanrInfoObj.titleName = this.title  // 预警抬头名称
      wanrInfoObj.eventId = data[index].uuid
      wanrInfoObj.imgUrl = this.constructFullImageURL(data[index].picUrl)
      wanrInfoObj.currentArray = []
      wanrInfoObj.currentArray.push(data[index])
      wanrInfoObj.eventStatus = data[index].eventStatus
      this.multipleSelection = wanrInfoObj.currentArray
      this.$emit('warningDialog', wanrInfoObj)
      this.dismissIndex = index
    },
    constructFullImageURL (url) {
      if (url == null || url === '') {
        return null
      }
      if (url.substr(0, 4).toLowerCase() === 'http') {
        return url
      }
      var suffixLen = url.slice(url.lastIndexOf('.')).length
      var fullImgURL = ''
      if (suffixLen > 1 && suffixLen <= 5) {
        fullImgURL = 'http://192.168.0.246:8888' + '/' + url.trim().trimLeft('/')
      } else {
        fullImgURL = 'http://192.168.0.242:39047/VIID/showimages?id=' + url.trim().trimLeft('/')
      }
      return fullImgURL
    },
    scroll () {
      let self = this
      let tableScroll = document.querySelector('.el-scrollbar__wrap')
      tableScroll.addEventListener('scroll', function () {
        let sign = 50
        sign = Math.floor(100 * (this.clientHeight / this.scrollHeight)) + 2
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        // console.log(scrollDistance)
        if (scrollDistance <= sign) {
          if (self.hasNext) {
            self.currentPage ++
            self.entranceWarnList()
          }
        }
      })
    }
  },
  mounted () {
    let self = this
    if (this.warnType === 'onEntranceDeviceWarming') {
      this.title = '门禁预警'
      this.showPark = 5
      this.eventName = 1
      self.entranceWarnList()
    } else if (this.warnType === 'onSidewalkDeviceWarming') {
      this.title = '人行道闸预警'
      this.showPark = 6
      this.eventName = 2
      self.entranceWarnList()
    }
    this.$nextTick(function () {
      this.scroll()
    })

    this.$root.Bus.$on('PreClose', (done) => {
      this.multipleSelection = []
      this.toggleSelection()
      done()
    })
  },
  watch: {
    dissWarnSucc (bool) {
      if (bool) {
        let add = 0
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.multipleSelection[i].eventStatus = 1
          this.handleUnselect(this.multipleSelection[i], i)
          add = add + this.multipleSelection[i].eventStatus
        }
        if (add === this.multipleSelection.length) {
          this.isClick = true
        } else {
          this.isClick = false
        }
      }
    },
    warnType (v) {
      if (v === 'onEntranceDeviceWarming') {
        this.title = '门禁预警'
        this.showPark = 5
        this.eventName = 1
        this.currentPage = 1 // 防止currentPage增加后，切换其他切面没有归位
        this.entranceWarnList()
      } else if (v === 'onSidewalkDeviceWarming') {
        this.title = '人行道闸预警'
        this.showPark = 6
        this.eventName = 2
        this.currentPage = 1
        this.entranceWarnList()
      }
    }
  }
}
</script>
<style scoped lang="less">
.access-dialog {
  & > h3 {
    padding: 0;
    margin: 0;
    margin-bottom: 50px !important;
    text-align: center;
    background-image: linear-gradient(-180deg, #ffffff 0%, #f1f4f6 100%);
    box-shadow: 0 1px 0 0 #d9dce0;
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid #d9dce0;
    height: 60px;
    line-height: 60px;
    margin-bottom: 0;
  }
  .el-scrollbar {
      height: 345px;
      .el-table {
        height: 100%;
        // overflow: auto;
        overflow-x: hidden;
        tr {
          height: 56px;
          line-height: 56px;
        }
      }
    }
  .dismiss-warn {
    height: 75px;
    line-height: 80px;
    text-align: center;
    & > button {
      width: 180px;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  /* .el-table {
    height: 370px;
    .caret-wrapper {
      display: none;
    }
    
  } */
  .show-msg {
    color: #fff;
    background: rgba(23, 23, 24, 0.9);
    border-radius: 2px;
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -20%);
  }
  /* .el-table__empty-block {
    height: 200px;
    overflow-y: hidden;
  } */
}
.el-table:before{
  display: none;
}
.nodta{
  overflow-y:scroll!important 
}
</style>

<style lang='less'>
@import url("./assets/css/parkwarn.less");
</style>
<style lang="less">
  .access-dialog .el-table__header-wrapper {
    position: fixed;
    margin-top: -50px;
    z-index: 2;
   }
  .access-dialog .el-table__empty-block {
    height: 360px;
    overflow: hidden
   }
  .access-dialog .el-table__row .cell{
    padding-left: 10px;
  }
  .access-dialog .el-scrollbar__wrap {
    overflow: scroll;
    height: 90%;
    overflow-x: hidden;
  }
  </style>