<template>
  <div class="parkinglot-table">
    <h3>
      <span>
        <span v-html="parkinglotData.dialogTitle"></span>
      </span>
    </h3>
    <!-- 车位占用表格 -->
    <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll"  v-if="parkinglotData.type=='parkinglotoccupied'">
      <el-table ref="alarmTable" :data="parkingOccupiedWarmingData" stripe style="width:100%"  @selection-change="handleSelectionChange" >
        <EmptyIcon slot="empty"></EmptyIcon>
        <el-table-column type="selection" :selectable="(row,index)=>{return row.alarmState===1}">
        </el-table-column>
        <el-table-column prop="parkSeatCode" width="130" class-name="selcol-style" label="车位" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="nowStopCarNum" width="120" class-name="selcol-style" label="现停车牌"></el-table-column>
        <el-table-column prop="occupiedTime" width="170" label="占用时间" :formatter="createTimeFormat"></el-table-column>
        <el-table-column prop="ownerName" width="140" class-name="selcol-style" label="业主姓名"></el-table-column>
        <el-table-column prop="ownerPhone" width="130" class-name="selcol-style" label="业主电话"></el-table-column>
        <el-table-column prop="dispatchState" width="95" class-name="selcol-style" label="保安状态" :formatter="securityStatusFormat">
        </el-table-column>
        <el-table-column prop="alarmState" width="95" class-name="selcol-style" label="事件状态" :formatter="eventStatusFormat">
        </el-table-column>
        <el-table-column width="75" label="监控">
          <template slot-scope="scope">
            <img src='../images/icon_monitor.png' @click="showMonitorDialog(scope.row)">
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- 车辆异常表格（临时车长停放） -->
    <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll" v-if="parkinglotData.type=='carexception'">
      <el-table ref="alarmTable" :data="carExceptionWarmingData" stripe  style="width: 100%" @selection-change="handleSelectionChange" >
        <EmptyIcon slot="empty"></EmptyIcon>
        <el-table-column type="selection" :selectable="(row,index)=>{return row.alarmState===1}">
        </el-table-column>
        <el-table-column prop="parkSeatCode" width="120" class-name="selcol-style" label="车位"  :show-overflow-tooltip="true"/>
        <el-table-column prop="carNum" width="120" class-name="selcol-style" label="车牌" />
        <el-table-column prop="inTime" width="170" label="入场时间" :formatter="createTimeFormat">
        </el-table-column>
        <el-table-column prop="parkDays" width="170" class-name="selcol-style" label="停放时长" :formatter="parkDaysFormat"></el-table-column>
        <el-table-column prop="feeAmount" width="95" class-name="selcol-style" label="费用" :formatter="feeAmountFormat">
        </el-table-column>
        <el-table-column prop="dispatchState" width="140" class-name="selcol-style" label="保安状态" :formatter="securityStatusFormat">
        </el-table-column>
        <el-table-column prop="alarmState" width="139" class-name="selcol-style" label="事件状态" :formatter="eventStatusFormat">
        </el-table-column>
        <el-table-column v-show="false" width="1" label="监控"  >
          <template slot-scope="scope">
            <img src='../images/icon_monitor.png' @click="showMonitorDialog(scope.row)">
          </template>
        </el-table-column>
      </el-table> 
    </el-scrollbar>
    <!-- <span style="width:24px;height:24px; display:inline-block"></span> -->
     <!-- 车位欠费表格 -->
    <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll" v-if="parkinglotData.type=='parkingArrears'" class="securityTree">
      <el-table ref="alarmTable" :data="ParkArrearsWarnData" stripe @selection-change="handleSelectionChange" >
        <EmptyIcon slot="empty"></EmptyIcon>
        <el-table-column type="selection" :selectable="(row,index)=>{return row.alarmState===1}">
        </el-table-column>
        <el-table-column prop="parkSeatCode" width="120" class-name="selcol-style" label="车位"  :show-overflow-tooltip="true"/>
        <!-- <el-table-column prop="carNo" width="120" class-name="selcol-style" label="车牌" /> -->
        <el-table-column prop="ownerName" width="150" class-name="selcol-style" label="车主" />
       <el-table-column prop="parkSeatTypeString" width="150" class-name="selcol-style" label="类型"
          :render-header="renderHeader">
        </el-table-column>
        <!-- <el-table-column prop="parkSeatTypeString" width="150" class-name="selcol-style" label="类型"
          :filters="[{ text: '月保车位', value: '月保车位' }, { text: '产权车位', value: '产权车位' }]" :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <div :type="scope.row.parkSeatTypeString === '月保车位' ? 'primary' : 'success'"
              close-transition>{{scope.row.parkSeatTypeString}}</div>
        </template> 
      </el-table-column> -->
        <el-table-column prop="payMoney" class-name="selcol-style" label="费用" :formatter="payMoneyFormat"/>
        <el-table-column prop="payStatus" class-name="selcol-style" label="缴费状态" :formatter="payStatusFormat">
        </el-table-column>
        <el-table-column prop="arrears" class-name="selcol-style" label="欠费(元)" sortable :formatter="arrearsFormat">
        </el-table-column>
        <el-table-column width="1" label="监控" v-show="false">
          <template slot-scope="scope">
            <img src='../images/icon_monitor.png' @click="showMonitorDialog(scope.row)">
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
     <!-- 车位即将到期表格 -->
    <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll" v-if="parkinglotData.type=='parkTimeEnd'">
      <el-table ref="alarmTable" :data="parkTimeEndWarmData" stripe @selection-change="handleSelectionChange" >
        <EmptyIcon slot="empty"></EmptyIcon>
        <el-table-column type="selection" :selectable="(row,index)=>{return row.alarmState===1}">
        </el-table-column>
        <el-table-column prop="parkSeatCode" width="150" class-name="selcol-style" label="车位"  :show-overflow-tooltip="true"/>
        <el-table-column prop="alarmDesc" width="150" class-name="selcol-style" label="异常情况" />
        <el-table-column prop="alarmTime" width="180" label="异常时间" :formatter="createTimeFormat"/>
        <el-table-column prop="ownerName" width="150" class-name="selcol-style" label="业主姓名" />
        <el-table-column prop="ownerPhone" class-name="selcol-style" label="业主电话"/>
        <el-table-column prop="remainingDay" class-name="selcol-style" label="剩余天数" :formatter="remaindaysFormat"/>
        <el-table-column width="1" label="监控"  v-show="false">
          <template slot-scope="scope">
            <img src='../images/icon_monitor.png' @click="showMonitorDialog(scope.row)">
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div class="dismiss-warn">
      <el-button :type="isClick?'primary':'info'" :disabled="!isClick" @click="onClickDismissWarn">解除预警</el-button>
    </div>
    <!-- 解除警告对话框 -->
    <dismissWarn :isWarnShow.sync="isWarnShow" :dissmissType="dissmissType" :dismissArray="dismissArray" @closeWarn="closeWarnEvent" @dismissWarnSucc="dismissWarnSucc"></dismissWarn>    
    <transition>
      <p class="show-msg" v-show="dismissResultVisible">{{dismissResult}}</p>
    </transition>
  </div>
</template>
<script>
  import api from './apis/index'
  import DismissWarnDialog from './components/DismissWarnDialog.vue'
  import {formatDate} from '@/views/VideoIntercomApp/assets/js/date.js'
  import EmptyIcon from '@/components/EmptyIcon'
  export default {
    components: {
      dismissWarn: DismissWarnDialog, EmptyIcon: EmptyIcon
    },
    props: {
      parkinglotData: {
        type: Object
      }
    },
    data() {
      return {
        isWarnShow: false, // 显示解除预警对话框
        dissmissType: '', // 预警类型
        dismissArray: [], // 解除预警的数组
        dismissResult: '警报解除成功', // 解除预警结果
        dismissResultVisible: false, // 显示解除警报结果
        isClick: false, // 列表上解除预警按钮是否可点击
        eventType: '', // 预警类型
        ParkArrearsWarnData: [], // 车位欠费数据
        parkTimeEndWarmData: [], // 车位到期数据
        parkingOccupiedWarmingData: [], // 车位占用数据
        carExceptionWarmingData: [], // 临时车长停放数据
        multipleSelection: [], // 选中的列表数据
        currentPage: 1, // 列表查询起始页
        pageSize: 6, // 列表查询分页大小
        type: '', // org-组织类型、map-地图类型
        firstPageCount: 6,
        returnStatus: false,
        hasNext: false,
        carportType: '' // 车位类型：0-临停，1-月保，2-产权
      }
    },
    methods: {
      // 渲染车辆欠费表头下拉框
      renderHeader(render, { column }) {
        console.log(this)
        return (
          <el-dropdown trigger="click" style="line-height:10px; color:#909399">
          <span class="el-dropdown-link">
            {column.label}<i class="el-icon-arrow-down el-icon--right" style='display: inherit;'></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1" nativeOnClick={this.handleMounthPlace}>月保车位</el-dropdown-item>
            <el-dropdown-item command="2" nativeOnClick={this.handlefixPlace}>产权车位</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        )
      },
      handleMounthPlace () {
       // 待条件刷新表格
        this.carportType = 1
        this.loadTableData()
      },
      handlefixPlace () {
        // 待条件刷新表格
        this.carportType = 2
        this.loadTableData()
      },
      // 加载表格数据
      loadTableData() {
        this.eventType = this.parkinglotData.type
        if (this.parkinglotData.isOnMap === true) {
          this.type = 'map'
          this.parkId = this.parkinglotData.areaId
        } else if (this.parkinglotData.isOnMap === false) {
          this.type = 'org'
          this.parkId = this.parkinglotData.parkId
        } else {
          this.type = ''
          this.parkId = ''
        }
        this.returnStatus = false
        var that = this
        if (this.eventType === 'parkinglotoccupied') {
          console.log('加载车位占用数据...')
          let tableScroll = document.querySelector('.parkinglot-table .el-scrollbar__wrap')
          let lastScrollTop = tableScroll.scrollTop
          api.queryParkinglotOccupiedData(this.currentPage, this.type, this.parkId).then(response => {
            console.log(response.data)
            // this.parkingOccupiedWarmingData = response.data
            that.parkingOccupiedWarmingData.push.apply(that.parkingOccupiedWarmingData, response.data.result)
            // tableScroll.scrollTop = lastScrollTop
            // that.returnStatus = true
            that.hasNext = response.data.hasNext
            this.returnStatus = true
            this.$nextTick(() => {
              this.$refs.SecurityTreeScroll.update()
              tableScroll.scrollTop = lastScrollTop
            })
          })
        } else if (this.eventType === 'carexception') {
          console.log('加载车辆异常数据...')
          api.queryParkinglotCarExceptionData(this.currentPage, this.type, this.parkId).then(response => {
            console.log(response)
            let tableScroll = document.querySelector('.parkinglot-table .el-scrollbar__wrap')
            let lastScrollTop = tableScroll.scrollTop
            that.carExceptionWarmingData.push.apply(that.carExceptionWarmingData, response.data.result)
            that.hasNext = response.data.hasNext
            that.returnStatus = true
            that.$nextTick(() => {
              that.$refs.SecurityTreeScroll.update()
              tableScroll.scrollTop = lastScrollTop
            })
          })
        } else if (this.eventType === 'parkingArrears') {
          console.log('加载车辆欠费数据...')
          api.queryParkArrearsWarnData(this.currentPage, this.type, this.parkId, this.carportType).then(response => {
            console.log(response)
            let tableScroll = document.querySelector('.parkinglot-table .el-scrollbar__wrap')
            let lastScrollTop = tableScroll.scrollTop
            if (that.carportType !== 0 && that.carportType !== '') {
              that.ParkArrearsWarnData = response.data.result
            } else {
              that.ParkArrearsWarnData.push.apply(that.ParkArrearsWarnData, response.data.result)
            }
            that.hasNext = response.data.hasNext
            this.$nextTick(() => {
              this.$refs.SecurityTreeScroll.update()
              tableScroll.scrollTop = lastScrollTop
              this.returnStatus = true
            })
          })
        } else if (this.eventType === 'parkTimeEnd') {
          console.log('加载车位即将到期数据...')
          api.queryParkTimeEndWarmData(this.currentPage, this.type, this.parkId).then(response => {
            console.log(response)
            let tableScroll = document.querySelector('.parkinglot-table .el-scrollbar__wrap')
            let lastScrollTop = tableScroll.scrollTop
            that.parkTimeEndWarmData.push.apply(that.parkTimeEndWarmData, response.data.result)
            that.hasNext = response.data.hasNext
            this.returnStatus = true
            this.$nextTick(() => {
              this.$refs.SecurityTreeScroll.update()
              tableScroll.scrollTop = lastScrollTop
            })
          })
        }
      },
      toggleSelection (rows) {
        let _this = this
        if (rows) {
          rows.forEach(row => {
            _this.$refs.alarmTable.toggleRowSelection(row, true)
          })
        } else {
          _this.$refs.alarmTable.clearSelection()
        }
      },
      // 判断多选是否可以点击
      isCheckDisabled: function (row, index) {
        if (row.alarmState === 1) {
          return true
        } else {
          return false
        }
      },
      // 显示解除预警对话框
      onClickDismissWarn() {
        this.dismissArray = this.multipleSelection
        this.dissmissType = this.parkinglotData.type
        this.isWarnShow = true
      },
      // 获取解除警告结果
      dismissWarnSucc(result) {
        if (result === '0') {
          this.$emit('dismissRefresh')
          // this.$refs.alarmTable.clearSelection()
          for (let dismiss of this.dismissArray) {
            dismiss.alarmState = 0
          }
        } else {
          this.dismissResult = '解除预警失败'
        }
        this.dismissResultVisible = true
        var timer = setTimeout(() => {
          this.dismissResultVisible = false
          clearTimeout(timer)
        }, 1000)
      },
      // 关闭警告
      closeWarnEvent() {
        this.isWarnShow = false
      },
      // 停车天数格式化
      parkDaysFormat: function(row, column) {
        let inTime = row.inTime
        let nTime = new Date().getTime() - inTime
        // 计算出相差天数
        let days = Math.floor(nTime / (24 * 3600 * 1000))
        // 计算天数后剩余的毫秒数
        let leave1 = nTime % (24 * 3600 * 1000)
        let hours = Math.floor(leave1 / (3600 * 1000))
        return days + '天' + hours + '小时'
      },
      // 费用格式化
      feeAmountFormat: function(row, column) {
        if (row.feeAmount !== null) {
          return row.feeAmount / 100 + '元'
        }
      },
      // 保安状态格式化
      securityStatusFormat: function (row, column) {
        var guardStatus = row.dispatchState
        if (guardStatus === 0) {
          return '未派遣'
        } else if (guardStatus === 1) {
          return '已派遣'
        }
        return '/'
      },
      // 事件状态格式化
      eventStatusFormat: function (row, column) {
        var eventStatus = row.alarmState
        if (eventStatus === 1) {
          return '预警中'
        } else if (eventStatus === 0) {
          return '预警已解除'
        }
        return '/'
      },
      // 剩余天数格式化
      remaindaysFormat: function (row, column) {
        let remainingDay = row.remainingDay + '天'
        return remainingDay
      },
       // 时间格式化
      createTimeFormat: function (row, column) {
        let createTime = row.alarmTime || row.inTime || row.occupiedTime
        let date = ''
        if (createTime) {
          date = new Date(parseInt(createTime))
        } else {
          date = new Date()
        }
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },

      // 费用格式化
      payMoneyFormat: function (row, column) {
        var chargeType = row.chargeType
        var chargeAmount = row.payMoney
        if (chargeType === 'MONTH') {
          return chargeAmount / 100 + '元/月'
        } else if (chargeType === 'THREE') {
          return chargeAmount / 100 + '元/季'
        } else if (chargeType === 'SIX') {
          return chargeAmount / 100 + '元/半年'
        } else if (chargeType === 'YEAR') {
          return chargeAmount / 100 + '元/年'
        }
      },
      // 缴费状态格式化 缴费状态：0即将到期，1欠费，2已缴费
      payStatusFormat: function (row, column) {
        var status = row.payStatus
        if (status === 0 || status === '0') {
          return '即将到期'
        } else if (status === 1 || status === '1') {
          return '欠费'
        } else if (status === 2 || status === '2') {
          return '已缴费'
        }
      },
      // 欠费单位格式化
      arrearsFormat: function (row, column) {
        let fee = row.arrears
        return fee / 100
      },
      // 选择列表行
      handleSelectionChange(val) {
        this.multipleSelection = val
        if (val.length > 0) {
          this.isClick = true
        } else {
          this.isClick = false
        }
      },
      // 点击显示监控按钮
      showMonitorDialog(row) {
        let monitorDialogObj = {}
        monitorDialogObj.type = this.parkinglotData.type
        monitorDialogObj.data = row
        if (this.parkinglotData.type === 'parkinglotoccupied') {
          monitorDialogObj.titleName = '车位占用预警'
        } else if (this.parkinglotData.type === 'carexception') {
          monitorDialogObj.titleName = '临停车长时停放预警'
        } else if (this.parkinglotData.type === 'parkTimeEnd') {
          monitorDialogObj.titleName = '车位即将到期预警'
        } else if (this.parkinglotData.type === 'parkingArrears') {
          monitorDialogObj.titleName = '车位欠费预警'
        }
        this.$emit('showMonitorDialog', monitorDialogObj)
      },
      // 列表滚动
      addScrollListener() {
        let self = this
        let tableScroll = document.querySelector('.parkinglot-table .el-scrollbar__wrap')
        tableScroll.addEventListener('scroll', function () {
          let sign = 50
          sign = Math.floor(100 * (this.clientHeight / this.scrollHeight)) + 2
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign) {
            if (self.returnStatus && self.hasNext) {
              self.currentPage++
              self.loadTableData()
            }
          }
        })
      }
    },
    mounted() {
      this.loadTableData()
      this.addScrollListener()
    }
  }
</script>
<style scoped lang="less">
  .parkinglot-table {
    &>h3 {
      padding: 0;
      margin: 0;
      margin-bottom: 50px;
      text-align: center;
      background-image: linear-gradient(-180deg, #ffffff 0%, #f1f4f6 100%);
      box-shadow: 0 1px 0 0 #d9dce0;
      border-radius: 6px 6px 0 0;
      border-bottom: 1px solid #d9dce0;
      height: 60px;
      line-height: 60px;
    }
    .dismiss-warn {
      height: 80px;
      line-height: 80px;
      text-align: center;
      &>button {
        width: 180px;
      }
      .el-button {
        margin-left: 0;
      }
    }
    /* .el-table {
      max-height: 380px;
      overflow-y: scroll;
      .caret-wrapper {
        display: none;
    	}
    } */
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
    .show-msg {
      color: #fff;
      background: rgba(23, 23, 24, 0.9);
      border-radius: 2px;
      width: 300px;
      height: 60px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -20%);
      z-index: 2100;
    }
    .el-table:before{
      display: none;
    }
  }
  .el-table__row .cell {
     padding-left: 10px;
  }  
</style>
<style lang="less">
   .parkinglot-table .el-table__header-wrapper {
    position: fixed;
    margin-top: -50px;
    z-index: 2;
  }
  .parkinglot-table .el-table__empty-block {
    height: 360px;
    overflow: hidden
  }
  .parkinglot-table .el-table__row .cell{
  padding-left: 10px;
}
 /*.parkinglot-table .el-scrollbar > .el-scrollbar__wrap {
    overflow-x: hidden !important;
    overflow-y: scroll;
  } */
  .parkinglot-table .el-scrollbar__wrap {
    overflow: scroll;
    height: 95%;
    overflow-x: hidden;
}
.securityTree .el-table .caret-wrapper{
  position: absolute;
  top:-4px;
}
.parkinglot-table .el-table__body-wrapper{
  overflow-x: hidden;
}
.parkinglot-table .el-table th{
  padding:2px 0;
}
</style>