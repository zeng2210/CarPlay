<template>
  <div class="security-dialog" v-show="true">
    <div class="guard-dialog">
      <div class='gurd-pic'>
        <img :src="guardInfo.facePic" alt="">
      </div>
      <div class="gurd-info">
        <el-row>
          <el-col :span="10">
            <div class="grid-content grid-right">姓名</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content">{{guardInfo.name}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div class="grid-content grid-right">职务</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content">保安</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div class="grid-content grid-right">手机号</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content">{{guardInfo.phone}}</div>
          </el-col>
        </el-row>
        <el-row class='sent-btn'>
          <el-col :span="24">
            <el-button @click="guardSentInfo">发送消息</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { getGurdInfoData } from './apis/index'
export default {
  name: 'SecurityDialog',
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    gurdData: {
      type: Object
    }
  },
  data () {
    return {
      sentInfoSucc: false,
      tipsMsg: '',
      sentContent: '',
      guardInfo: {
        facePic: '',
        name: '',
        phone: ''
      },
      isInfoShowDialog: false,
      deviceId: ''
    }
  },
  methods: {
    // 点击发送消息
    guardSentInfo () {
      this.$emit('showSentInfo')
    },
    // 获取保安卡片信息
    getData () {
      // this.gurdData.gurdId 获取保安id
      getGurdInfoData({ uuid: this.gurdData.gurdId }).then(res => {
        if (res.data.code === '00000') {
          this.guardInfo = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击确认发送
    sentInfoSuccEvent (sentContent) {
      this.isInfoShowDialog = false
      this.sentInfoSucc = true
      this.tipsMsg = '消息发送成功'
      var timer = setTimeout(() => {
        this.sentInfoSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 消息框关闭
    closeInfoEvent () {
      this.isInfoShowDialog = false
    }
  },
  watch: {
    open (v) {
      this.display = this.open
      if (v) {
        this.getData()
      }
    },
    display () {
      this.$emit('update:open', this.display)
    }
  }
}
</script>
<style  scoped lang="less">
.security-dialog {
  .guard-dialog {
    position: absolute;
    width: 400px;
    height: 180px;
    box-sizing: border-box;
    border: 1px solid #edeef0;
    background: #fff;
    box-shadow: 0px 0px 4px 1px #c7d1d9;
    .gurd-pic {
      float: left;
      height: 180px;
      width: 180px;
      margin-right: 26px;
    }
    .gurd-pic > img {
      width: 160px;
      height: 160px;
      margin: 10px 0px 10px 10px;
      border: 1px solid #edeef0;
    }
  }
  .gurd-info {
    float: left;
    width: 192px;
    height: 130px;
    margin-top: 23px;
    font-size: 12px;
    .sent-btn {
      text-align: left;
      margin-left: 10px;
    }
    .sent-btn button {
      background: #144ea1;
      width: 64px;
      height: 28px;
      border-radius: 2px;
      color: #fff;
      padding: 0;
      font-size: 12px;
    }
  }
  .el-col .grid-right {
    color: #5a6b78;
    text-align: right;
    margin-right: 30px;
  }
  .grid-content {
    color: rgb(51, 51, 51);
    text-align: left;
  }
  .dialog-box .el-button {
    padding: 9px 15px;
  }
  .el-row {
    margin: 0;
    line-height: 24px;
    margin: 8px 0;
  }
}

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
  textarea {
    width: 347px;
    height: 100px;
    font-size: 14px;
    padding: 6px;
    box-sizing: border-box;
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
    padding-left: 40px;
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
}
</style>
<style lang='less'>
@import url("./assets/css/security.less");
</style>

