<template>
  <!-- 派遣保安对话框 -->
  <div>
    <el-dialog title="选择派遣人员" :visible="isdispatchShow" append-to-body @close="closeEvent" width="30%" class="inner-dialog">
      <div class="dispatch">
        <iframe src="about:blank" frameborder="0"></iframe>
      </div>
      <el-table :show-header="false" :data="guardInfo" stripe style="width: 100%">
        <el-table-column prop="name" width="150">
        </el-table-column>
        <el-table-column prop="distance" width="150" class-name="selcol-style">
        </el-table-column>
        <el-table-column prop="status" class-name="selcol-style">
        </el-table-column>
        <el-table-column width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="dispatchControl(scope.$index,$event)" v-html="btnText">派遣</el-button>
          </template>
        </el-table-column>
      </el-table>
      <transition>
        <p class="show-msg" v-show="isclickDispatch" v-html="tipsMsg"></p>
      </transition>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import { getGurdlistInfo } from '../apis/index'
export default {
  name: 'GurdList',
  props: {
    isdispatchShow: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      isShowList: false,
      isclickDispatch: false,
      tipsMsg: '',
      btnText: '派遣',
      guardInfo: []
    }
  },
  methods: {
    getData () {
      getGurdlistInfo().then(res => {
        this.guardInfo = res.data.tableData
      })
    },
    // "派遣保安"
    dispatchControl (index, e) {
      var el = e.currentTarget
      el.style.backgroundColor = '#b0b1b2'
      e.currentTarget.innerHTML = moment(new Date()).format('MM-DD mm:ss') + ' 派遣'
      this.tipsMsg = '已派遣' + this.guardInfo[index].name
      this.guardInfo[index].status = '忙碌'
      this.isclickDispatch = true
      e.currentTarget.disabled = true
      var timer = setTimeout(() => {
        this.isclickDispatch = false
        clearTimeout(timer)
      }, 1000)
    },
    closeEvent () {
      this.$emit('closeGurd')
    }
  },
  watch: {
    isdispatchShow() {
      if (this.isdispatchShow) {
        // alert(1)
        this.getData()
      }
    }
  }
}
</script>
<style scoped lang="less">
.dispatch {
  iframe {
    width: 950px;
    height: 580px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
.inner-dialog {
  .el-dialog {
    width: 950px !important;
    height: 580px;
  }
  .el-button:disabled,
  .el-button:disabled:hover {
    border-color: #f0f0f0;
  }
  .el-button.is-plain.selfBtnStyle {
    color: #409eff;
    background: #fff;
    border-color: #409eff;
  }
  .el-button.is-plain.selfBtnStyle:hover,
  .el-button.is-plain.selfBtnStyle:focus {
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
  .el-dialog__header {
    padding: 0;
    text-align: center;
    background-image: linear-gradient(-180deg, #ffffff 0%, #f1f4f6 100%);
    box-shadow: 0 1px 0 0 #d9dce0;
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid #d9dce0;
    height: 60px;
    line-height: 60px;
  }
  .el-dialog__headerbtn {
    height: 60px;
    width: 60px;
    top: 0;
    right: 0;
  }
  .el-dialog__close {
    font-size: 20px;
    font-weight: 600;
  }
  .el-dialog__body {
    padding: 0px;
  }
  .el-table__row {
    height: 70px;
  }
  .selcol-style div.cell,
  .selcol-style div.cell {
    color: #b0b1b2;
  }
  .el-table__row .el-button--primary {
    font-size: 14px;
    width: 140px;
    height: 36px;
    margin-left: -60px;
    background-color: #0d912c;
    &:hover {
      background-color: #85ce61;
    }
  }
  .liftReasonBox {
    text-align: center;
    padding: 38px;
  }
  textarea[name="liftReason"] {
    width: 760px;
    height: 320px;
    font-size: 18px;
    padding: 24px 30px;
    box-sizing: border-box;
  }
  textarea::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    font-family: "PingFangSC-Medium";
    font-size: 18px;
    color: #b0b1b2;
    letter-spacing: 0;
    text-align: left;
  }
  textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: "PingFangSC-Medium";
    font-size: 18px;
    color: #b0b1b2;
    letter-spacing: 0;
    text-align: left;
  }
  textarea:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: "PingFangSC-Medium";
    font-size: 18px;
    color: #b0b1b2;
    letter-spacing: 0;
    text-align: left;
  }
  .liftBtnBox {
    text-align: center;
  }
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
}
.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: opacity 1s;
}
.v-leave-to {
  opacity: 0;
}
</style>

