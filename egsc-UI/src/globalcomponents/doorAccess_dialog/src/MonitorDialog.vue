<template>
  <div>
    <el-dialog :visible="open" class="warnning-dialog" @close="handleWarnClose">
      <div class="warning-box">
        <h3>
          <span v-if="warningData.titleName!==undefined">{{warningData.titleName}}</span>
          <span v-else v-html="title"></span>
        </h3>
        <p v-if="warningData.eventName!==undefined"  class="spanLeft">{{warningData.eventName}}</p>
        <p v-html="msg" v-else class="spanLeft"></p>
        <div class="warn-content">
          <div class="aside">
            <h4>预警视频片段</h4>
            <div class="ocx" v-show="warnOcxShow">
              <!-- <ocx-playback :deviceId="deviceId" ref='warnOcx'></ocx-playback> -->
              <ocx-playback :deviceData="deviceData" :ocxPlaybackShow="ocxPlaybackShow" @changeOcxPlaybackShow="changeOcxPlaybackShow" ref='warnOcx'></ocx-playback>
            </div>
            <iframe src="about:blank" frameborder="0" class="ocx-iframe"></iframe>
            <i @click='handleWarnToPreview' class='warn-imgup'>
              <img src="../images/imgup_icon.png" alt="">
            </i>
          </div>
          <div class="main">
            <h4>抓拍图片</h4>
            <img :src="warningData.imgUrl" alt="" v-if="warningData.imgUrl">
            <img src="../images/warnpic.png" alt="" v-else>
          </div>
        </div>
        <el-button type="primary" plain @click="dispatchPerson" class="self-btn-style" v-if="warningData.titleName!==undefined" :disabled="warningData.eventStatus == 1">派遣保安</el-button>
        <el-button type="primary" plain @click="dispatchPerson" class="self-btn-style" v-else>派遣保安</el-button>
        <el-button type="primary" @click="dismissWarn" class="self-btn-style" v-if="warningData.titleName!==undefined" :disabled="warningData.eventStatus == 1">解除预警</el-button>
        <el-button type="primary" @click="dismissWarn" class="self-btn-style" v-else>解除预警</el-button>
      </div>
    </el-dialog>
    <!-- 派遣保安对话框 -->
    <gurd-list :isdispatchShow="isdispatch" @closeGurd="closeGurdEvent"></gurd-list>
    <dismiss-warn :isWarnShow="isLiftReason" @closeWarn="closeWarnEvent" @dismissWarnSucc="dismissWarnSucc" :dismissArray="selectArry"></dismiss-warn>
  </div>
</template>
<script>
import gurdList from '../../video_dialog/src/components/GurdList'
import dismissdialog from './DismissWarnDialog.vue'
import { getDeviceByCameraData } from '@/globalcomponents/video_dialog/src/apis/index'
import ocxPlayback from '@/globalcomponents/warning_dialog/components/OcxPlayback.vue'
export default {
  name: 'MonitorDialog',
  components: {
    gurdList: gurdList,
    dismissWarn: dismissdialog,
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
      deviceId: '',
      title: '园区周边预警',
      msg: '2017-11-14 12:14 发现在1栋北门有人越出边界',
      isdispatch: false,
      isLiftReason: false,
      selectArry: [],
      warnOcxShow: true,
      selectWarnData: [],
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
    // 1."派遣保安"--点击相关操作
    dispatchPerson () {
      // this.isdispatch = true
      // this.warnOcxShow = false
    },
    // chrome时显示下载
    changeOcxPlaybackShow () {
      this.ocxPlaybackShow = false
    },
    closeGurdEvent () {
      this.isdispatch = false
      this.warnOcxShow = true
    },
    // 解除警告
    dismissWarn () {
      this.isLiftReason = true
      this.selectWarnData = this.warningData.selectArry
      this.warnOcxShow = false
    },
    // 关闭警告
    closeWarnEvent () {
      this.isLiftReason = false
      this.warnOcxShow = true
    },
    dismissWarnSucc () {
      this.display = false
      this.dissWarnSucc = true
      var timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
      this.$emit('dismissWarnSuccShow')
    },
    handleWarnClose () {
      this.$refs.warnOcx.releaseOcx()
      this.$emit('close')
    }
  },
  mounted () {
  },
  watch: {
    open (val) {
      // 打开窗口时响应
      this.warnOcxShow = true
      if (val) {
        // this.$nextTick(() => {
        //   this.deviceId = this.warningData.mapVideoId
        //   console.log(this.warningData.mapVideoId)
        // })
        this.$nextTick(() => {
          this.ocxPlaybackShow = true
          getDeviceByCameraData({ cameraCode: this.warningData.mapVideoId }).then(res => {
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
    /* margin: 40px auto;
    color: #f54118;
    font-weight: 600;
    font-size: 18px; */
    margin: 20px auto;
    margin-top: 50px;
    color: #f54118;
    font-weight: 600;
    font-size: 18px;
  }
  .spanLeft {
    /* text-align: left; */
    padding-left: 3%;
  }
  .warn-content {
    overflow: hidden;
    /* padding: 40px 30px; */
    padding: 80px 52px;
    padding-top: 10px;
  }
  .aside,
  .main {
    width: 48%;
    height: 297px;
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
.el-button.self-btn-style {
  font-size: 18px;
  font-weight: 400;
  width: 160px;
  height: 60px;
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
    width: 51px;
    height: 51px;
    right: 4%;
    bottom: 4%;
    background-color: #fff;
    z-index: 100;
  }
  .warn-imgup {
    display: block;
    cursor: pointer;
    position: absolute;
    width: 51px;
    height: 51px;
    right: 4%;
    bottom: 4%;
    background-color: #fff;
    border-radius: 50%;
    z-index: 101;
    & > img {
      margin-top: 10px;
    }
  }
}
.aside {
  .ocx {
    /* width: 100%;
    height: 100%; */
    width: 512px;
    height: 288px;
    position: relative;
  }
}
</style>
<style lang='less'>
@import url("./assets/css/warningDialog.less");
</style>
