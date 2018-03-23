<template>
  <el-container class="sent-info-dialog">
    <el-dialog title="发送消息" :visible="isInfoDialog" class="info-dialog" top="30vh">
      <div class="info-content-box">
        <textarea name="infoContent" placeholder="请输入消息内容" v-model="sentContent"></textarea>
      </div>
      <div class="info-btn-box">
        <el-button type="primary" class="cancle-btn" @click="closeEvent">取消</el-button>
        <el-button type="primary" class="sent-info-btn" @click="confirmSent(sentContent)">确认发送</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import { postPushMessageData } from '@/views/PeopleMgmt/apis/index'
export default {
  name: 'infoDialog',
  props: {
    isInfoDialog: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    id: {
      typr: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      sentContent: ''
    }
  },
  methods: {
    //  点击确认发送
    confirmSent (sentContent) {
      let paramVal = /^\s+$/gi.test(sentContent) || sentContent.length === 0
      // 发送内容非空验证
      if (paramVal) {
        this.$message({
          message: '请输入发送内容',
          type: 'warning',
          center: true
        })
        return
      }
      // 发送内容文本长度限制
      if (sentContent.length >= 200) {
        this.$message({
          message: '发送消息文本长度不能超过200',
          type: 'warning',
          center: true
        })
        return
      }
      postPushMessageData({
        deviceId: this.id,
        content: sentContent,
        eventId: '1'
      }).then(res => {
        if (res.data.code === '00000') {
          this.closeEvent()
          this.$emit('sentInfoSucc')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 关闭消息框
    closeEvent () {
      this.$emit('closeInfo')
      this.sentContent = ''
    }
  }
}
</script>
<style  scoped lang="less">
.sent-info-dialog {
  .info-dialog {
    textarea {
      width: 347px;
      height: 100px;
      font-size: 14px;
      padding: 6px;
      box-sizing: border-box;
      overflow: auto;
    }
    textarea::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      font-family: "MicrosoftYaHei";
      font-size: 14px;
      color: #b0b1b2;
      letter-spacing: 0;
      text-align: left;
    }
    textarea::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-family: "MicrosoftYaHei";
      font-size: 14px;
      color: #b0b1b2;
      letter-spacing: 0;
      text-align: left;
    }
    textarea:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      font-family: "MicrosoftYaHei";
      font-size: 14px;
      color: #b0b1b2;
      letter-spacing: 0;
      text-align: left;
    }
    .info-btn-box {
      margin-top: 20px;
      text-align: center;
      & > button {
        font-size: 16px;
        font-weight: 400;
        width: 122px;
        height: 42px;
      }
    }
    .cancle-btn {
      background: #fff;
      border-color: rgb(19, 213, 220);
      color: rgb(19, 213, 220);
    }
    .sent-info-btn {
      background: rgb(19, 213, 220);
      border-color: rgb(19, 213, 220);
    }
    .cancle-btn:hover,
    .cancle-btn:focus {
      background: #fff;
      border-color: rgb(19, 213, 220);
      color: rgb(19, 213, 220);
    }
    .security-dialog .show-msg {
      color: #fff;
      background: rgba(0, 0, 0, 0.9);
      border-radius: 2px;
      width: 420px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-48%, 350%);
    }
  }
}
</style>
<style lang='less'>
.info-dialog {
  .el-dialog {
    width: 425px;
  }
  .el-dialog__header {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    padding-top: 30px;
    color: #333;
    font-family: "MicrosoftYaHei";
  }
  .el-dialog__header > button {
    display: none;
  }
  .el-dialog__body {
    padding: 10px 37px 20px;
  }
}
</style>
