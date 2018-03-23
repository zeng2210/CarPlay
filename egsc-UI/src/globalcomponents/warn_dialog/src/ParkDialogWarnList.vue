<template>
  <div class="park-dialog">
    <h3 :warnType="warnType" :clickTime="clickTime">
      <span>
        <span v-html="title"></span>
      </span>
    </h3>
    <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll" class="parksafe-table">
      <el-table :show-header="true" :data="parkAroundWarnData" stripe @selection-change="handleSelectionChange">
        <EmptyIcon slot="empty"></EmptyIcon>
        <el-table-column type="selection" :selectable="isCheckDisabled" width="50" align="left">
        </el-table-column>
        <el-table-column prop="startTime" width="180" label="时间" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="resourceName" width="180" class-name="selcol-style" label="地点" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="content" class-name="selcol-style" label="描述" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="securityStatusMessage" width="120" class-name="selcol-style" label="保安状态" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="warningStatusMessage" width="120" class-name="selcol-style" label="事件状态" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="100" label="监控" align="left">
          <template slot-scope="scope">
            <img src='../images/icon_monitor.png' @click="onMonitorClick(scope.$index,parkAroundWarnData)">
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div class="dismiss-warn">
      <el-button type="info" disabled v-show="isClick">解除预警</el-button>
      <el-button type="primary" @click="onDismissWarnClick" v-show="!isClick">解除预警</el-button>
    </div>
    <transition>
      <p class="show-msg" v-show="dissWarnSucc">警报解除成功</p>
    </transition>
  </div>
</template>
<script>
import { getWarnEventListData } from './apis/index'
import EmptyIcon from '@/components/EmptyIcon'
export default {
  name: 'parkDialog',
  components: {
    EmptyIcon: EmptyIcon
  },
  props: {
    warnType: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    clickTime: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    isMonitor: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    dissWarnSucc: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      outerVisible: false,
      isClick: true,
      title: '园区周界预警',
      parkAroundWarnData: [],
      multipleSelection: [],
      eventTypeName: 0,
      hasNext: false,
      returnStatus: false,
      currentPage: 1,
      selectionArray: []
    }
  },
  mounted () {
    this.scroll()
  },
  methods: {
    // 设置高度
    getHeightStyle (h = 0) {
      return { height: (this.mainContainHeight - h) + 'px' }
    },
    // 获取预警列表数据
    getEventList () {
      let clickTim = this.clickTime
      this.returnStatus = false
      let tableScroll = document.querySelector('.parksafe-table .el-scrollbar__wrap')
      let lastScrollTop = tableScroll.scrollTop
      getWarnEventListData({
        pageNo: this.currentPage,
        pageSize: 18,
        subEventType: this.eventTypeName,
        clickTime: clickTim
      }).then(res => {
        if (res.data.code === '200') {
          this.parkAroundWarnData.push.apply(this.parkAroundWarnData, res.data.data.rows)
          this.hasNext = res.data.data.hasNext
          this.$nextTick(() => {
            this.$refs.SecurityTreeScroll.update()
            tableScroll.scrollTop = lastScrollTop
            this.returnStatus = true
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 多选框发生变化
    handleSelectionChange (val) {
      this.multipleSelection = val
      let add = 0
      for (let i = 0; i < this.multipleSelection.length; i++) {
        add = add + this.multipleSelection[i].warningStatus
      }
      if (add === this.multipleSelection.length) {
        this.isClick = true
      } else {
        this.isClick = false
      }
    },
    // 解除预警
    onDismissWarnClick () {
      if (this.multipleSelection.length > 0) {
        this.$emit('dismissWarn', this.multipleSelection)
      }
    },
    // 点击监控图标
    onMonitorClick (index, data) {
      let wanrInfoObj = {}
      wanrInfoObj.eventName = data[index].startTime + '  ' + data[index].content  // 预警事件名称
      wanrInfoObj.index = index
      wanrInfoObj.titleName = this.title  // 预警抬头名称
      wanrInfoObj.currentArray = []
      wanrInfoObj.imgUrl = data[index].imgUrl
      wanrInfoObj.currentArray.push(data[index])
      this.selectionArray = wanrInfoObj.currentArray
      this.$emit('warningDialog', wanrInfoObj)
    },
    // 判断多选是否可以点击
    isCheckDisabled (row, index) {
      if (row.warningStatus === 0) {
        return true
      } else {
        return false
      }
    },
    // 添加滚动监听
    scroll () {
      let self = this
      let tableScroll = document.querySelector('.parksafe-table .el-scrollbar__wrap')
      tableScroll.addEventListener('scroll', function () {
        let sign = Math.floor(100 * (this.clientHeight / this.scrollHeight)) + 2
        let scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance <= sign) {
          if (self.returnStatus) {
            if (self.hasNext) {
              self.currentPage++
              self.getEventList()
            }
          }
        }
      })
    },
    // 初始化
    init () {
      document.querySelector('.el-scrollbar__wrap').scrollTop = 0
      this.currentPage = 1
      if (this.warnType === 'onGardenPerimeterWarming') {
        this.title = '园区周界预警'
        this.eventTypeName = 1
        this.parkAroundWarnData = []
        this.getEventList()
      } else if (this.warnType === 'onLakePerimeterWarming') {
        this.title = '人工湖周界预警'
        this.eventTypeName = 2
        this.parkAroundWarnData = []
        this.getEventList()
      } else if (this.warnType === 'onGardenActionWarming') {
        this.title = '人员徘徊预警'
        this.eventTypeName = 3
        this.parkAroundWarnData = []
        this.getEventList()
      } else if (this.warnType === 'onChannelOccupiedWarming') {
        this.title = '通道占用预警'
        this.eventTypeName = 4
        this.parkAroundWarnData = []
        this.getEventList()
      }
    },
    // 预警解除成功
    minitorDissWarnSucc () {
      this.selectionArray[0].warningStatusMessage = '预警已解除'
      this.selectionArray[0].warningStatus = 1
      this.isCheckDisabled(this.selectionArray[0], 0)
      this.selectionArray = []
      let add = 0
      for (let i = 0; i < this.multipleSelection.length; i++) {
        add = add + this.multipleSelection[i].warningStatus
      }
      if (add === this.multipleSelection.length) {
        this.isClick = true
      } else {
        this.isClick = false
      }
    },
    // 批量解除成功
    multiDisWarnSucc () {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection[i].warningStatusMessage = '预警已解除'
        this.multipleSelection[i].warningStatus = 1
        this.isCheckDisabled(this.multipleSelection[i], i)
        this.isClick = true
      }
    },
    // 派遣成功后更新列表保安状态
    updateGuardStatus () {
      this.selectionArray[0].securityStatusMessage = '已派遣'
      this.selectionArray[0].securityStatus = 1
    }
  }
}
</script>
<style scoped lang="less">
.park-dialog {
  & > h3 {
    padding: 0;
    margin: 0;
    margin-bottom: 50px;
    text-align: center;
    background-image: linear-gradient(-180deg, #ffffff 0%, #f1f4f6 100%);
    box-shadow: 0 1px 0 0 #d9dce0;
    border-bottom: 1px solid #d9dce0;
    border-radius: 6px 6px 0 0;
    height: 60px;
    line-height: 60px;
  }
  .dismiss-warn {
    height: 80px;
    line-height: 80px;
    text-align: center;
    & > button {
      width: 160px;
      height: 46px;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  .el-scrollbar {
    height: 330px;
    .el-table {
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      tr {
        height: 56px;
        line-height: 56px;
      }
    }
  }

  .show-msg {
    color: #fff;
    background: rgba(23, 23, 24, 0.9);
    border-radius: 2px;
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -20%);
    z-index: 99;
  }
}
</style>
<style lang='less'>
.park-dialog {
  .el-table__header-wrapper {
    position: fixed;
    margin-top: -50px;
    z-index: 2;
  }
  .el-scrollbar > .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .el-table__empty-block {
    height: 330px;
    overflow: hidden;
  }
}
@import url("./assets/css/parkwarn.less");
</style>