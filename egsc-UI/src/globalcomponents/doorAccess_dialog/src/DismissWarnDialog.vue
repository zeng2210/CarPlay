<template>
  <el-dialog width="30%" title="解除警报" :visible="isWarnShow" append-to-body class="inner-dialog" @close="closeEvent"  style="left:-100px">
    <div class="lift-reason-box">
      <textarea name="liftReason" placeholder="请输入解除警报原因" v-model='liftReason'></textarea>
      <!-- <el-alert title= {{errorTip}} type="error" :visible="false" center show-icon></el-alert> -->
    </div>
    <div class="lift-btn-box">
      <el-button type="primary" plain class="self-btn-style" @click="closeEvent">取消</el-button>
      <el-button type="primary" class="self-btn-style" @click="confirmLift(liftReason)">确认解除</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {releaseAlarm} from './apis/index'
export default {
  name: 'dismissdialog',
  props: {
    isWarnShow: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    errorTip: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      liftReason: '',
      isValid: false
    }
  },
  methods: {
    closeEvent () {
      this.liftReason = ''
      this.$emit('closeWarn')
    },
    confirmLift (liftReason) {
      // console.log(this.$parent.selectWarnData)
      this.liftReason = liftReason.trim()
      var list = this.$parent.selectWarnData
      if (list.length === 0 || this.liftReason === '') {
        this.$message({
          message: '请输入解除警报原因',
          type: 'warning',
          center: true
        })
      } else if (this.liftReason.length > 256) {
        this.$message({
          message: '解除预警原因过长，不能超过256字',
          type: 'warning',
          center: true
        })
      } else {
        releaseAlarm({
          alarmList: list,
          reason: this.liftReason
        }).then(res => {
          console.log(res)
          if (res.data.code === '00000' && res.status === 200) {
            // 弹出警报解除成功提示
            this.liftReason = ''
            this.$emit('dismissWarnSucc')
            this.$emit('closeWarn')
            // location.reload()
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
    padding-top: 5px;
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
  .lift-btn-box {
    text-align: center;
  }
  .el-button.self-btn-style {
    font-size: 18px;
    font-weight: 400;
    width: 160px;
    height: 60px;
  }
}
</style>
<style lang='less'>
@import url("./assets/css/parkwarn.less");
</style>