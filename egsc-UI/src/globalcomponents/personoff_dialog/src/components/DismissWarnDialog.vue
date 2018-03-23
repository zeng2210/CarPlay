<template>
  <el-dialog title="解除警报" :visible="isWarnShow" append-to-body class="inner-dialog" top="18vh" :show-close="false">
    <div class="lift-reason-box">
      <textarea name="liftReason" placeholder="请输入解除警报原因" v-model='liftReason'></textarea>
    </div>
    <div class="lift-btn-box">
      <el-button class="cancle-btn" @click="closeEvent">取消</el-button>
      <el-button type="primary" class="self-btn-style" @click="confirmLift(liftReason)">确认解除</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateEvtWarnStatus } from '../apis/index'
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
    dismissArray: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      liftReason: ''
    }
  },
  methods: {
    closeEvent () {
      this.liftReason = ''
      this.$emit('closeWarn')
    },
    confirmLift (liftReason) {
      var a = /^\s+$/gi.test(liftReason) || liftReason.length === 0
      if (!a) {
        if (liftReason.length >= 256) {
          this.$message({
            message: '取消预警原因文本长度不能超过256',
            type: 'warning',
            center: true
          })
          return
        }
        let warnStatusData = []
        for (var i = 0; i < this.dismissArray.length; i++) {
          warnStatusData.push({
            status: 1, // 1预警已解除 0预警中
            updateReason: liftReason,
            eventLogId: this.dismissArray[i].eventLogId
          })
        }
        updateEvtWarnStatus(warnStatusData).then(res => {
          // console.log(res.data)
          if (res.data.code === '200') {
            // 弹出警报解除成功提示
            this.liftReason = ''
            this.$emit('closeWarn')
            this.$emit('updatePersonoffSatus')
            this.$emit('dismissWarnSucc')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message({
          message: '请输入解除警报原因',
          type: 'warning',
          center: true
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
}
</style>