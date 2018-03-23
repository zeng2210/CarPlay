<template>
  <div>
    <el-dialog :visible.sync="display" :close-on-click-modal="true" class="partolabnor-dialog" :modal="false" top="23vh">
      <div>
        <h3>
          <span>巡更设备预警</span>
        </h3>
        <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll" class="partolabnor-table">
          <el-table :show-header="true" :data="partolAbnorData" stripe @selection-change="handleSelectionChange">
            <EmptyIcon slot="empty"></EmptyIcon>
            <el-table-column type="selection" width="50" align="left" :selectable="isCheckDisabled">
            </el-table-column>
            <el-table-column prop="offlineTime" width="180" label="时间" align="left">
            </el-table-column>
            <el-table-column prop="deviceName" width="150" class-name="selcol-style" label="设备编号" align="left">
            </el-table-column>
            <el-table-column width="130" class-name="selcol-style" label="描述" align="left">
              <template slot-scope="scope">
                <span>无数据上报</span>
              </template>
            </el-table-column>
            <el-table-column prop="userName" width="130" class-name="selcol-style" label="登录人员" align="left">
            </el-table-column>
            <el-table-column prop="phone" width="130" class-name="selcol-style" label="联系电话" align="left">
            </el-table-column>
            <el-table-column prop="offlineDetail" class-name="selcol-style" label="事件状态" align="left">
            </el-table-column>
            <el-table-column width="120" label="操作" align="left">
              <template slot-scope="scope">
                <el-button @click="partolAbnorSentInfo(scope.$index,partolAbnorData)" size="mini" type="primary">发送消息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <div class="dismiss-warn">
          <el-button type="info" disabled v-show="isClick">解除预警</el-button>
          <el-button type="primary" @click="dismissWarn" v-show="!isClick">解除预警</el-button>
        </div>
        <transition>
          <p class="show-msg" v-show="dissWarnSucc">警报解除成功</p>
        </transition>
        <transition>
          <p class="show-msg" v-show="infoSentnSucc">消息发送成功</p>
        </transition>
      </div>
    </el-dialog>
    <!-- 解除警告对话框 -->
    <dismiss-warn :isWarnShow="isWarnShowDialog" @closeWarn="closeWarnEvent" @dismissWarnSucc="dismissWarnSucc" :dismissArray="selectArry" @updatePartolSatus="updatePartolSatus"></dismiss-warn>
    <!-- 发送消息对话框 -->
    <sent-info :isInfoDialog="isInfoShowDialog" @closeSentInfo='closeInfoEvent' @sentInfoSucc="sentInfoSuccEvent" :deviceId="deviceId"></sent-info>
  </div>
</template>
<script>
import dismisswarndialog from '../src/components/DismissWarnDialog'
import { getPartolAbnorData } from './apis/index'
import sentInfo from '../src/components/SentInfo'
import EmptyIcon from '@/components/EmptyIcon'
export default {
  name: 'PartolabnorDialog',
  components: {
    dismissWarn: dismisswarndialog,
    sentInfo: sentInfo,
    EmptyIcon: EmptyIcon
  },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      display: this.open, // 是否显示弹窗
      isClick: true, // 列表上解除预警按钮是否可点击
      isWarnShowDialog: false, // 解除预警对话框显示
      dissWarnSucc: false, // 解除预警结果显示
      partolAbnorData: [], // 设备异常列表数据
      multipleSelection: [], // 选中的列表数据
      selectArry: [], // 解除预警列表数据
      infoSentnSucc: false,  // 发送消息结果显示
      isInfoShowDialog: false, // 发送消息对话框显示
      deviceId: '', // 设备deviceId
      currentPage: 1, // 列表起始页
      hasNext: false, // 列表数据是否还有下一页
      isAddLister: false
    }
  },
  methods: {
    // 设置高度
    getHeightStyle (h = 0) {
      return { height: (this.mainContainHeight - h) + 'px' }
    },
    // 获取设备异常列表
    partolEquipAbnorList () {
      this.returnStatus = false
      let tableScroll = document.querySelector('.partolabnor-table  .el-scrollbar__wrap')
      let lastScrollTop = tableScroll.scrollTop
      getPartolAbnorData({
        pageNo: this.currentPage,
        pageSize: '18'
      }).then(res => {
        if (res.data.code === '00000') {
          this.partolAbnorData.push.apply(this.partolAbnorData, res.data.data.rows)
          if (res.data.data.total > 0) {
            this.hasNext = true
          } else {
            this.hasNext = false
          }
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
    // 多选框勾选变化
    handleSelectionChange (val) {
      this.multipleSelection = val
      if (val.length > 0) {
        this.isClick = false
      } else { this.isClick = true }
    },
    // 判断多选是否可以点击
    isCheckDisabled (row, index) {
      if (row.offlineStatus === 0) {
        return true
      } else {
        return false
      }
    },
    // 解除预警框弹出
    dismissWarn () {
      this.selectArry = this.multipleSelection
      this.isWarnShowDialog = true
    },
    // 解除警告框关闭
    closeWarnEvent () {
      this.isWarnShowDialog = false
    },
    // 解除预警成功后显示
    dismissWarnSucc () {
      this.dissWarnSucc = true
      let timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 解除成功后更新列表状态
    updatePartolSatus () {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection[i].offlineDetail = '预警已解除'
        this.multipleSelection[i].offlineStatus = 1
        this.isCheckDisabled(this.multipleSelection[i], i)
        this.isClick = true
      }
    },
    // 消息框关闭
    closeInfoEvent () {
      this.isInfoShowDialog = false
    },
    // 发送消息成功后显示
    sentInfoSuccEvent () {
      this.infoSentnSucc = true
      let timer = setTimeout(() => {
        this.infoSentnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 发送消息框弹出
    partolAbnorSentInfo (index, partolAbnorData) {
      this.deviceId = partolAbnorData[index].deviceId
      this.isInfoShowDialog = true
    },
    // 添加滚动监听事件
    partolAbnorScroll () {
      let self = this
      let tableScroll = document.querySelector('.partolabnor-table .el-scrollbar__wrap')
      tableScroll.addEventListener('scroll', function () {
        // let sign = 100
        let sign = Math.floor(100 * (this.clientHeight / this.scrollHeight)) + 2
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance <= sign) {
          if (self.returnStatus) {
            if (self.hasNext) {
              self.currentPage++
              self.partolEquipAbnorList()
            }
          }
        }
      })
    }
  },
  watch: {
    open (v) {
      this.display = this.open
      // 打开预警弹窗
      if (v) {
        this.currentPage = 1
        this.hasNext = false
        this.partolAbnorData = []
        this.$nextTick(function () {
          this.partolEquipAbnorList()
          if (!this.isAddLister) {
            this.isAddLister = true
            this.partolAbnorScroll()   // 让监听事件在table加载完成后只触发一次
          }
        })
      }
    },
    display () {
      this.$emit('update:open', this.display)
    }
  }
}
</script>

<style lang="less"  scoped>
.partolabnor-dialog {
  h3 {
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
    & > button {
      width: 160px;
      height: 46px;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  // .el-table {
  //   height: 386px;
  //   overflow: auto;
  //   overflow-x: hidden;
  //   tr {
  //     height: 56px;
  //     line-height: 56px;
  //   }
  // }
  .el-scrollbar {
    height: 336px;
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
    transform: translate(-50%, -50%);
    z-index: 99;
  }
  .color-red {
    color: red;
  }
}
</style>
<style lang='less'>
.partolabnor-dialog {
  .el-table__empty-block {
    height: 335px;
    overflow: hidden;
  }
  .el-table__header-wrapper {
    position: fixed;
    margin-top: -50px;
    z-index: 2;
  }
  .el-scrollbar > .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}
@import url("./assets/css/partolabnor.less");
</style>

