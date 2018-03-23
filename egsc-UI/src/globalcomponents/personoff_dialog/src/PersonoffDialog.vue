<template>
  <div>
    <el-dialog :visible.sync="display" :close-on-click-modal="true" class="personoff-dialog" :modal="false" top="23vh">
      <div>
        <h3>
          <span>人员脱岗</span>
          <span>（在线
            <span class="color-red" v-html='onlineNum'></span>人/总
            <span v-html='totalNum'>3</span>
            人）
          </span>
        </h3>
        <el-table :show-header="true" :data="personOffserviceData" stripe style="width: 100%" @selection-change="handleSelectionChange" class="personoff-table">
          <el-table-column type="selection" :selectable="isCheckDisabled" align="center" width="50">
          </el-table-column>
          <el-table-column prop="startTime" width="180" label="时间" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="resourceName" class-name="selcol-style" label="地址" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="content" class-name="selcol-style" label="描述" align="center" show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column prop="name" width="130" class-name="selcol-style" label="姓名" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="phone" width="130" class-name="selcol-style" label="电话" align="center" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="warningStatusMessage" class-name="selcol-style" label="事件状态" align="center" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="dismiss-warn" slot-scope="">
          <el-button type="info" disabled v-show="isClick">解除预警</el-button>
          <el-button type="primary" @click="dismissWarn" v-show="!isClick">解除预警</el-button>
        </div>
        <transition>
          <p class="show-msg" v-show="dissWarnSucc">警报解除成功</p>
        </transition>
      </div>
    </el-dialog>
    <!-- 解除警告对话框 -->
    <dismiss-warn :isWarnShow="isWarnShowDialog" @closeWarn="closeWarnEvent" @dismissWarnSucc="dismissWarnSucc" :dismissArray="selectArry" @updatePersonoffSatus="updatePersonoffSatus"></dismiss-warn>
  </div>
</template>
<script>
import dismisswarndialog from '../src/components/DismissWarnDialog'
import { warnEventList } from './apis/index'
export default {
  name: 'PersonoffDialog',
  components: {
    dismissWarn: dismisswarndialog
  },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    personoffData: {
      type: Object
      // validator: function (id) {

      //   return id
      // }
    }
  },
  data () {
    return {
      display: this.open,
      isClick: true,
      isWarnShowDialog: false,
      dissWarnSucc: false,
      isInfoShowDialog: false,
      personOffserviceData: [],
      multipleSelection: [],
      currentPage: 1,
      hasNext: false,
      isAddLister: false,
      onlineNum: 0,
      totalNum: 0,
      selectArry: []
    }
  },
  methods: {
    personOffserviceList () {
      let clickTim = this.personoffData.clickTime
      this.returnStatus = false
      warnEventList({
        pageNo: this.currentPage,
        pageSize: 18,
        subEventType: 5,
        clickTime: clickTim
      }).then(res => {
        if (res.data.code === '200') {
          // console.log(res.data.data.rows)
          this.personOffserviceData.push.apply(this.personOffserviceData, res.data.data.rows)
          this.hasNext = res.data.data.hasNext
          this.returnStatus = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectionChange (val) {
      // console.log(val)
      this.multipleSelection = val
      if (val.length > 0) {
        this.isClick = false
      } else { this.isClick = true }
    },
    // 判断多选是否可以点击
    isCheckDisabled (row, index) {
      if (row.warningStatus === 0) {
        return true
      } else {
        return false
      }
    },
    dismissWarn () {
      this.selectArry = this.multipleSelection
      this.isWarnShowDialog = true
    },
    // 解除警告框关闭
    closeWarnEvent () {
      this.isWarnShowDialog = false
    },
    dismissWarnSucc () {
      this.dissWarnSucc = true
      // this.initgurdAbnormal()
      var timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 消息框关闭
    closeInfoEvent () {
      this.isInfoShowDialog = false
    },
    personOffScroll () {
      let self = this
      // console.log(document.getElementsByClassName('el-table'))
      let tableScroll = document.getElementsByClassName('personoff-table')[0]
      tableScroll.addEventListener('scroll', function () {
        let sign = 100
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        // console.log(scrollDistance)
        if (scrollDistance <= sign) {
          if (self.returnStatus) {
            if (self.hasNext) {
              self.currentPage++
              self.personOffserviceList()
            }
          }
        }
      })
    },
    // 解除成功后更新列表状态
    updatePersonoffSatus () {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection[i].warningStatusMessage = '预警已解除'
        this.multipleSelection[i].warningStatus = 1
        this.isCheckDisabled(this.multipleSelection[i], i)
        this.isClick = true
      }
    }
  },
  computed: {

  },
  mounted () {
  },
  watch: {
    open (v) {
      this.display = this.open
      if (v) {
        this.currentPage = 1
        this.hasNext = false
        this.personOffserviceData = []
        this.personOffserviceList()
        if (!this.isAddLister) {
          this.$nextTick(function () {
            this.isAddLister = true
            this.personOffScroll()  // 让监听事件在table加载完成后只触发一次
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
.personoff-dialog {
  h3 {
    padding: 0;
    margin: 0;
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
  .el-table {
    height: 386px;
    overflow: auto;
    overflow-x: hidden;
    tr {
      height: 56px;
      line-height: 56px;
    }
  }
  .show-msg {
    color: #fff;
    background: rgba(23, 23, 24, 0.8);
    border-radius: 2px;
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .color-red {
    color: red;
  }
}
</style>
<style lang='less'>
@import url("./assets/css/personoff.less");
</style>

