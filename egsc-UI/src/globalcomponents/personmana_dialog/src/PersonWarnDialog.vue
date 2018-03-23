<template>
  <div>
    <el-dialog :visible.sync="display" :close-on-click-modal="true" class="person-warn-dialog" :modal="false" top="23vh">
      <div>
        <h3>
          <span>{{personData.title}}</span>
          <span>（在线
            <span class="color-red">{{this.onlineNum}}</span>人/总
            <span>{{this.totalNum}}</span>人）
          </span>
        </h3>
        <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll" class="guardAbormal-table">
          <el-table :show-header="true" :data="guardAbnormalData" stripe @selection-change="handleSelectionChange">
            <EmptyIcon slot="empty"></EmptyIcon>
            <el-table-column type="selection" width="50" align="left" :selectable="isCheckDisabled">
            </el-table-column>
            <el-table-column prop="happenTime" width="180" label="时间" align="left" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="alarmAddr" width="120" class-name="selcol-style" label="地址" align="left" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="alarmDetail" width="130" class-name="selcol-style" label="描述" align="left" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="deviceName" width="100" class-name="selcol-style" label="设备编号" align="left" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="userName" width="80" class-name="selcol-style" label="姓名" align="left" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="phone" class-name="selcol-style" width="120" label="电话" align="left" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="statusDetail" width="100" class-name="selcol-style" label="事件状态" align="left" show-overflow-tooltip>
            </el-table-column>
            <el-table-column width="120" label="操作" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="guardAbnormalSentInfo(scope.$index,guardAbnormalData)" size="mini" type="primary">发送消息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <div class="dismiss-warn" slot-scope="">
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
    <dismiss-warn :isWarnShow="isWarnShowDialog" @closeWarn="closeWarnEvent" :alarmIds="alarmIds" @overdisuccMultiple="overdisuccMultiple" @dismissWarnSucc="dismissWarnSucc"></dismiss-warn>
    <!-- 发送消息对话框 -->
    <sent-info :isInfoDialog="isInfoShowDialog" @closeInfo='closeInfoEvent' @sentInfoSucc="sentInfoSuccEvent" :deviceId="deviceId"></sent-info>
  </div>
</template>
<script>
import dismisswarndialog from '../src/components/DismissWarnDialog'
import sentInfo from '../src/components/SentInfo'
import { getGuardAbnormalListData, getGuardOnlineNumData, postMultipleDissmissData } from './apis/index'
import EmptyIcon from '@/components/EmptyIcon'
export default {
  name: 'PersonDialog',
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
    },
    personData: {
      type: Object
    }
  },
  data () {
    return {
      display: this.open, // 是否显示弹窗
      isClick: true, // 列表上解除预警按钮是否可点击
      title: '保安异常信息',
      isWarnShowDialog: false, // 解除预警对话框显示
      dissWarnSucc: false, // 解除预警结果显示
      isInfoShowDialog: false, // 发送消息对话框显示
      infoSentnSucc: false, // 发送消息结果显示
      guardAbnormalData: [], // 列表数据
      multipleSelection: [], // 选中的列表数据
      currentPage: 1, // 列表起始页
      hasNext: false, // 列表数据是否还有下一页
      isAddLister: false,
      alarmIds: {}, // 批量解除预警id
      deviceId: '',
      onlineNum: '', // 在线保安人数
      totalNum: '' // 总保安人数
    }
  },
  methods: {
    // 设置高度
    getHeightStyle (h = 0) {
      return { height: (this.mainContainHeight - h) + 'px' }
    },
    // 获取保安异常信息
    guardAbnormal () {
      this.returnStatus = false
      let tableScroll = document.querySelector('.guardAbormal-table .el-scrollbar__wrap')
      let lastScrollTop = tableScroll.scrollTop
      getGuardAbnormalListData({
        pageNo: this.currentPage,
        pageSize: '18'
      }).then(res => {
        if (res.data.code === '00000') {
          this.guardAbnormalData.push.apply(this.guardAbnormalData, res.data.data.rows)
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
    // 多选框发生变化
    handleSelectionChange (val) {
      this.multipleSelection = val
      if (val.length > 0) {
        this.isClick = false
      } else { this.isClick = true }
    },
    // 判断多选是否可以点击
    isCheckDisabled (row, index) {
      if (this.personData.title === '保安异常信息') {
        if (row.statusDetail === '预警中') {
          return true
        } else {
          return false
        }
      }
    },
    // 解除预警
    dismissWarn () {
      let dissWarnObj = {
        taskPointIds: [],
        alarmIds: []
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].statusDetail !== '预警已解除') {
          // 批量解除超时预警id
          if (this.multipleSelection[i].taskPointId) {
            dissWarnObj.taskPointIds.push(this.multipleSelection[i].taskPointId)
          } else {
            // 批量解除越界预警id
            dissWarnObj.alarmIds.push(this.multipleSelection[i].alarmId)
          }
        }
      }
      // 解除越界预警
      if (dissWarnObj.alarmIds.length > 0) {
        this.alarmIds = dissWarnObj
        this.isWarnShowDialog = true
      } else { // 解除超时预警
        postMultipleDissmissData({
          taskPointIds: dissWarnObj.taskPointIds
        }).then(res => {
          if (res.data.code === '00000') {
            this.overdisuccMultiple()
            this.dismissWarnSucc()
          }
        }).catch(err => {
          console.log(err)
        })
      }
      // }
    },
    // 显示发生消息弹窗
    guardAbnormalSentInfo (index, guardAbnormalData) {
      this.deviceId = guardAbnormalData[index].deviceId
      this.isInfoShowDialog = true
    },
    // 解除警告框关闭
    closeWarnEvent () {
      this.isWarnShowDialog = false
    },
    // 解除警告成功后显示
    dismissWarnSucc () {
      this.dissWarnSucc = true
      // this.initgurdAbnormal()
      let timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
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
    // 添加滚动监听事件
    guardAbnormalScroll () {
      let self = this
      let tableScroll = document.querySelector('.guardAbormal-table  .el-scrollbar__wrap')
      tableScroll.addEventListener('scroll', function () {
        let sign = Math.floor(100 * (this.clientHeight / this.scrollHeight)) + 2
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance <= sign) {
          if (self.returnStatus) {
            if (self.hasNext) {
              self.currentPage++
              self.guardAbnormal()
            }
          }
        }
      })
    },
    // 查询保安在线/离线人数
    guardOnline () {
      getGuardOnlineNumData().then(res => {
        if (res.data.code === '00000') {
          this.onlineNum = res.data.data.onlineNum
          this.totalNum = res.data.data.totalNum
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 批量解除越界预警
    overdisuccMultiple () {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection[i].statusDetail = '预警已解除'
        this.isCheckDisabled(this.multipleSelection[i], i)
      }
      this.isClick = true
      this.multipleSelection = []
    }
  },
  watch: {
    open (v) {
      this.display = this.open
      // 打开弹窗
      if (v) {
        this.currentPage = 1
        this.hasNext = false
        if (this.personData.title === '保安异常信息') {
          this.guardAbnormalData = []
          this.guardOnline()
          this.$nextTick(function () {
            this.guardAbnormal()
            if (!this.isAddLister) {
              this.isAddLister = true
              this.guardAbnormalScroll()   // 让监听事件在table加载完成后只触发一次
            }
          })
        }
      }
    },
    display () {
      this.$emit('update:open', this.display)
    }
  }
}
</script>
<style lang="less"  scoped>
.person-warn-dialog {
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
.person-warn-dialog {
  .el-table__empty-block {
    height: 335px;
    overflow: hidden;
  }
  .el-table__header-wrapper {
    position: fixed;
    margin-top: -50px;
    width: 1000px;
    z-index: 2;
  }
  .el-scrollbar > .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}
@import url("./assets/css/person_mana.less");
</style>

