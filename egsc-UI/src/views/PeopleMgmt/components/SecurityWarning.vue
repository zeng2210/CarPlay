<template>
  <el-container class="security-warning">
    <el-container class="security-content">
      <el-dialog title="打卡超时" :visible.sync="centerDialogVisible" center @close="handleCancel">
        <div class="warning-content clearfix">
          <el-row>
            <el-col :span="8">
              <div class="row-left">打卡位置 :</div>
            </el-col>
            <el-col :span="16">
              <div class="">{{sendObject.clockUpPosition}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="row-left">打卡时间 :</div>
            </el-col>
            <el-col :span="16">
              <div class="">{{sendObject.clockUpTime}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="row-left">已超时间 :</div>
            </el-col>
            <el-col :span="16">
              <div class="">{{sendObject.timeoutTime}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="row-left">设备名称 :</div>
            </el-col>
            <el-col :span="16">
              <div class="">{{sendObject.deviceNumber}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="row-left">巡更人员 :</div>
            </el-col>
            <el-col :span="16">
              <div class="">{{sendObject.keepName}}</div>
            </el-col>
          </el-row>
          <el-button type="primary" class="primaryButton" v-if='goMessage' @click="sentInfo">发送消息</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dismissWarnShow">解除警报</el-button>
          <el-button @click="handleCancel">取 消</el-button>
        </span>
        <transition>
          <p class="show-msg" v-if="infoSentnSucc">消息发送成功</p>
        </transition>
        <!-- <transition>
          <p class="show-warning" v-if="dissWarnSucc">警报解除成功</p>
        </transition> -->
      </el-dialog>
    </el-container>
    <sent-info :isInfoDialog="isInfoDialog" @closeInfo='closeInfoEvent' @sentInfoSucc="sentInfoSuccEvent" :id="deviceId"></sent-info>
  </el-container>
</template>
<script>
import sentInfo from '../components/PushMessage'
import { postClosePoliceData } from '../apis/index'
export default {
  name: 'SecurityWarning',
  components: {
    sentInfo
  },
  props: {
    goMessage: {
      require: true,
      type: Boolean,
      default: false
    },
    sendObject: {
      clockUpPosition: '',
      clockUpTime: '',
      timeoutTime: '',
      deviceNumber: '',
      keepName: '',
      warnUuid: '',
      deviceId: ''
    },
    showWarningDetail: {
      require: false,
      type: Boolean,
      default: false
    }
  },
  // props: ['showWarningDetail'],
  data () {
    return {
      isInfoDialog: false,
      infoSentnSucc: false,
      centerDialogVisible: this.showWarningDetail,
      dissWarnSucc: false,
      isDismissWarnIndex: -1,
      deviceId: ''
    }
  },
  methods: {
    // 发送消息
    sentInfo () {
      this.isInfoDialog = true
      this.deviceId = this.sendObject.deviceId
    },
    // 关闭发送消息窗口
    closeInfoEvent () {
      this.isInfoDialog = false
    },
    // 发送成功后显示
    sentInfoSuccEvent () {
      this.infoSentnSucc = true
      let timer = setTimeout(() => {
        this.infoSentnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 解除警报
    dismissWarnShow () {
      let params = {
        'uuid': this.sendObject.uuid,
        'historyPointStatus': '4'
      }
      postClosePoliceData(params).then(rs => {
        if (rs.data.code === '00000') {
          if (this.sendObject.isMapClick) {
            this.sendObject.historyPointStatus = '4'
            // console.log('123q', this.sendObject)
            this.$emit('mapPointRefresh', this.sendObject)
            this.$emit('infoSentnSuccClick')
          } else {
            this.$emit('infoSentnSuccClick')
            this.$emit('refresh')
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 关闭当前窗口
    handleCancel () {
      this.$emit('closeWarnDetail')
    }
    // 解除警告成功提示
    // dismissWarnSucc () {
    //   // this.isDismissWarnIndex = this.commonData.index
    //   // console.log(this.isDismissWarnIndex)
    //   this.closeWarn()
    //   // this.$emit('closeWarnDetail')
    //   this.dissWarnSucc = true
    //   let timer = setTimeout(() => {
    //     this.dissWarnSucc = false
    //     clearTimeout(timer)
    //   }, 1000)
    // }
  },
  watch: {
    showWarningDetail () {
      this.centerDialogVisible = this.showWarningDetail
    },
    centerDialogVisible () {
      this.$emit('update:showWarningDetail', this.centerDialogVisible)
    }
  }
}
</script>
<style lang="less">
.security-content {
  .el-dialog {
    height: 459px;
    width: 520px;
  }
  .el-dialog__header {
    box-sizing: border-box;
    font-size: 20px;
    padding-top: 17px;
    text-align: center;
    background-image: linear-gradient(-180deg, #ffffff 0%, #f1f4f6 100%);
    box-shadow: 0 1px 0 0 #d9dce0;
    border-radius: 6px 6px 0 0;
    width: 520px;
    height: 60px;
    .el-dialog__title {
      font-size: 20px;
      line-height: 28px;
      color: #f43509;
      font-weight: bold;
    }
  }
  .el-dialog__footer {
    .el-button {
      width: 160px;
      height: 60px;
      font-family: "PingFangSC-Medium";
      font-size: 18px;
      letter-spacing: 0;
      text-align: center;
      font-weight: 500;
    }
    .el-button--primary {
      color: #ffffff;
    }
    .el-button--default {
      color: #1d8fe1;
      box-sizing: border-box;
      border: 1px solid #1d8fe1;
    }
  }
  .el-row {
    margin: 0;
  }
}
.security-content {
  .sent-info-dialog {
    .park-warn-dialog {
      position: absolute;
      overflow: hidden;
      .el-dialog {
        width: 50%;
        left: 0;
      }
      .el-dialog__close {
        font-weight: 700;
      }
      .el-dialog__body {
        padding: 0;
      }
      .caret-wrapper {
        display: none;
      }
    }
  }
}
</style>
<style lang="less" scoped>
@import url("../assets/less/variable.less");
@import url("../assets/less/common.css");
.security-warning {
  .warning-content {
    font-family: "PingFangSC-Semibold";
    font-size: 14px;
    color: #566b79;
    letter-spacing: 0;
    line-height: 40px;
    text-align: left;
    .row-left {
      text-align: center;
    }
    .el-button {
      background: #144ea1;
      border-radius: 3px;
      width: 80px;
      height: 34px;
      padding: 0;
      line-height: 20px;
      position: absolute;
      right: 150px;
      bottom: 175px;
    }
    .el-button--primary {
      border: none;
    }
    .phone-color {
      margin-left: 30px;
      color: #666;
      vertical-align: text-top;
      img {
        width: 16px;
        position: relative;
        top: 3px;
      }
    }
  }
  .show-msg {
    color: #fff;
    background: rgba(23, 23, 24, 0.9);
    border-radius: 2px;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -20%);
    z-index: 1000;
  }
}
</style>
