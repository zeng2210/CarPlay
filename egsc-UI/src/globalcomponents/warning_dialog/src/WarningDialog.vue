<template>
  <div>
    <el-dialog :visible="open" class="warnning-dialog" @close="handleWarnClose">
      <div class="warning-box">
        <h3>
          <span v-if="warningData.titleName!==undefined">{{warningData.titleName}}</span>
          <span v-else v-html="title"></span>
        </h3>
        <p v-if="warningData.eventName!==undefined">{{warningData.eventName}}</p>
        <p v-html="msg" v-else></p>
        <div class="warn-content">
          <div class="aside">
            <h4>预警视频片段</h4>
            <div class="ocx" v-show="warnOcxShow">
              <ocx-playback :deviceData="deviceData" :ocxPlaybackShow="ocxPlaybackShow" @changeOcxPlaybackShow="changeOcxPlaybackShow" ref='warnOcx'></ocx-playback>
            </div>
            <iframe src="about:blank" frameborder="0" class="ocx-iframe"></iframe>
            <i @click='handleWarnToPreview' class='warn-imgup'>
              <img src="../images/big.png" alt="">
            </i>
          </div>
          <div class="main">
            <h4>抓拍图片</h4>
            <img :src="warningData.imgUrl || errorImg" alt="" :onerror="defaultImg">
            <!-- <img src="../images/warnpic.png" alt="" v-else> -->
          </div>
        </div>
        <el-button type="primary" plain @click="dispatchPerson" class="dispath-btn" v-if="warningData.selectArry!==undefined" :disabled="warningData.selectArry[0].warningStatus>0">派遣保安</el-button>
        <el-button type="primary" plain @click="dispatchPerson" class="dispath-btn" v-else>派遣保安</el-button>
        <el-button type="primary" @click="dismissWarn" class="self-btn-style" v-if="warningData.selectArry!==undefined" :disabled="warningData.selectArry[0].warningStatus>0">解除预警</el-button>
        <el-button type="primary" @click="dismissWarn" class="self-btn-style" v-else>解除预警</el-button>
      </div>
    </el-dialog>
    <!-- 派遣保安对话框 -->
    <gurd-list :isdispatchShow="isdispatch" @closeGurd="closeGurdEvent" ref="guardList" @updateGuardStatus="updateGuardStatus"></gurd-list>
    <dismiss-warn :isWarnShow="isLiftReason" @closeWarn="closeWarnEvent" @dismissWarnSucc="dismissWarnSucc" :dismissArray="selectArry"></dismiss-warn>
  </div>
</template>
<script>
import gurdList from '../../video_dialog/src/components/GurdList'
import dismisswarndialog from '../../warn_dialog/src/components/DismissWarnDialog'
import ocxPlayback from '../components/OcxPlayback'
import { getDeviceByCameraData } from '../../video_dialog/src/apis/index'
export default {
  name: 'WarnDialog',
  components: {
    gurdList: gurdList,
    dismissWarn: dismisswarndialog,
    ocxPlayback: ocxPlayback
  },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    warningData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      title: '园区周边预警',
      msg: '2017-11-14 12:14 发现在1栋北门有人越出边界',
      isdispatch: false,
      isLiftReason: false,
      selectArry: [],
      warnOcxShow: true,
      errorImg: require('../images/loadError.png'),
      defaultImg: 'this.src="' + require('../images/loadError.png') + '"',
      ocxPlaybackShow: false,
      deviceData: {}
    }
  },
  methods: {
    // 监控视频放大
    handleWarnToPreview () {
      this.warnOcxShow = false
      this.$emit('onWarnToPreview')
    },
    // chrome时显示下载
    changeOcxPlaybackShow () {
      this.ocxPlaybackShow = false
    },
    // 1."派遣保安"--点击相关操作
    dispatchPerson () {
      this.isdispatch = true
      this.warnOcxShow = false
      this.$refs.guardList.getGuardList(this.warningData.selectArry[0])
    },
    // 关闭派遣
    closeGurdEvent () {
      this.isdispatch = false
      this.warnOcxShow = true
    },
    // 解除警告
    dismissWarn () {
      this.isLiftReason = true
      this.selectArry = this.warningData.selectArry
      this.warnOcxShow = false
    },
    // 关闭警告
    closeWarnEvent () {
      this.isLiftReason = false
      this.warnOcxShow = true
    },
    // 派遣保安
    dismissWarnSucc () {
      this.display = false
      this.dissWarnSucc = true
      var timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
      this.$emit('dismissWarnSuccShow')
    },
    // 关闭弹窗
    handleWarnClose () {
      this.$refs.warnOcx.releaseOcx()
      this.$emit('close')
    },
    // 派遣成功更新保安状态
    updateGuardStatus () {
      this.$emit('updateGuardStatus')
    }
  },
  watch: {
    open (val) {
      // 打开窗口时响应
      if (val) {
        this.warnOcxShow = true
        this.$nextTick(() => {
          this.ocxPlaybackShow = true
          getDeviceByCameraData({ cameraCode: this.warningData.deviceId }).then(res => {
            this.deviceData = {
              startTime: this.warningData.startTime,
              endTime: this.warningData.startTime,
              ip: res.data.deviceIP,
              port: Number(res.data.devicePort)
            }
            this.$refs.warnOcx.initOcx()
          }).catch(err => {
            console.log(err)
          })
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.warning-box {
  padding-bottom: 50px;
  text-align: center;
  & > h3 {
    font-size: 20px;
    padding: 16px;
    margin: 0;
    border-bottom: 1px solid #ccc;
  }
  & > p {
    margin: 20px auto;
    margin-top: 50px;
    color: #f54118;
    font-weight: 600;
    font-size: 18px;
  }
  .warn-content {
    overflow: hidden;
    padding: 80px 52px;
    padding-top: 10px;
  }
  .aside,
  .main {
    width: 512px;
    height: 353px;
  }
  .aside {
    float: right;
    h4 {
      height: 40px;
      line-height: 40px;
      letter-spacing: 2px;
      margin-top: 0;
      font-size: 18px;
      text-align: center;
      font-weight: 500;
      color: #333333;
    }
  }
  .main {
    float: left;
    h4 {
      height: 40px;
      line-height: 40px;
      margin-top: 0;
      letter-spacing: 2px;
      font-size: 18px;
      text-align: center;
      font-weight: 500;
      color: #333333;
    }
    img {
      display: block;
      width: 512px;
      height: 288px;
    }
  }
}
.el-button {
  font-size: 18px;
  font-weight: 400;
  width: 160px;
  height: 60px;
}
.el-button.dispath-btn {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
.el-button.dispath-btn:hover,
.el-button.dispath-btn:focus {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
.el-button.is-plain.self-btn-style:hover,
.el-button.is-plain.self-btn-style:focus {
  background: #ecf5ff;
  border-color: #b3d8ff;
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

.inner-dialog {
  .el-dialog {
    width: 950px !important;
    height: 580px;
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
  .el-table__row {
    height: 70px;
  }
  div.cell {
    font-size: 16px;
    text-align: center;
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
.warning-box {
  .aside {
    position: relative;
  }
  .ocx-iframe {
    display: block;
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    right: 15px;
    bottom: 15px;
    // background-color: rgba(255, 255, 255, 0);
    background-color: #444444;
    z-index: 100;
  }
  .warn-imgup {
    display: block;
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    right: 15px;
    bottom: 15px;
    background-color: rgba(255, 255, 255, 0);
    z-index: 101;
    & > img {
      margin-top: 0px;
    }
  }
}
.aside {
  .ocx {
    width: 512px;
    height: 288px;
    position: relative;
  }
}
</style>
<style lang='less'>
@import url("./assets/css/warningDialog.less");
</style>
