<template>
  <el-dialog title="解除警报" :visible="isWarnShow" append-to-body class="inner-dialog" top="18vh" :show-close="false">
    <div class="lift-reason-box">
      <textarea name="liftReason" placeholder="请输入解除警报原因" v-model='liftReason'></textarea>
    </div>
    <div class="repeat-warn">
      <span>是否重复报警</span>
      <el-radio v-model="radio" label="1">是</el-radio>
      <el-radio v-model="radio" label="0">否</el-radio>
    </div>
    <div class="lift-btn-box">
      <el-button class="cancle-btn" @click="closeEvent">取消</el-button>
      <el-button type="primary" class="self-btn-style" @click="confirmLift(liftReason)">确认解除</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { postMultipleDissmissData } from '../apis/index'
export default {
  name: 'infoDialog',
  props: {
    isWarnShow: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    alarmIds: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      liftReason: '',
      radio: '0'
    }
  },
  methods: {
    closeEvent () {
      this.liftReason = ''
      this.radio = '0'
      this.$emit('closeWarn')
    },
    confirmLift (liftReason) {
      let paramVal = /^\s+$/gi.test(liftReason) || liftReason.length === 0
      // 解除原因非空验证
      if (paramVal) {
        this.$message({
          message: '请输入解除警报原因',
          type: 'warning',
          center: true
        })
        return
      }
      // 解除原因长度限制
      if (!paramVal) {
        if (liftReason.length >= 256) {
          this.$message({
            message: '解除预警原因文本长度不能超过256',
            type: 'warning',
            center: true
          })
          return
        }
      }
      if (this.alarmIds.alarmIds) {
        let warnStatusData = {
          repeat: this.radio,
          reason: liftReason,
          alarmIds: this.alarmIds.alarmIds,
          taskPointIds: this.alarmIds.taskPointIds
        }
        postMultipleDissmissData(warnStatusData).then(res => {
          if (res.data.code === '00000') {
            // 弹出警报解除成功提示
            this.closeEvent()
            this.$emit('dismissWarnSucc')
            this.$emit('overdisuccMultiple')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.inner-dialog {
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
  div.cell {
    font-size: 16px;
    text-align: center;
  }
  .selcol-style div.cell {
    color: #b0b1b2;
  }
  .el-table__row .el-button--primary {
    font-size: 14px;
    width: 140px;
    height: 36px;
    margin-left: -60px;
    background-color: #0d912c;
  }
  .el-table__row .el-button--primary:hover {
    background-color: #85ce61;
  }
  .lift-reason-box {
    text-align: center;
    padding: 38px;
    padding-bottom: 10px;
  }
  textarea[name="liftReason"] {
    width: 760px;
    height: 320px;
    font-size: 18px;
    padding: 24px 30px;
    box-sizing: border-box;
    overflow: auto;
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
  .lift-btn-box {
    text-align: center;
    & > .el-button {
      font-size: 18px;
      font-weight: 400;
      width: 160px;
      height: 60px;
    }
  }
  .cancle-btn {
    background: #fff;
    border-color: #409eff;
    color: #409eff;
  }
  .cancle-btn:hover,
  .cancle-btn:focus {
    background: #fff;
    border-color: #409eff;
    color: #409eff;
  }
  .repeat-warn {
    margin-bottom: 15px;
  }
  .repeat-warn > span {
    // color: red;
    padding-left: 74px;
    padding-right: 20px;
  }
}
</style>