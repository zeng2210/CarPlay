<template>
  <div>
    <el-dialog :visible="monitorVisible"  :modal="true" top="4%" width="60%" title="异常视频" @close="handleWarnClose" :center="true">
      <span slot="title" class="dialog-title">
        <el-button  @click="switchToVideoDialog" style="float:left">查看实时监控</el-button>
        <span style="text-align:center"><h3>异常视频</h3></span>
      </span>
      <hr/>
      <div class="warning-box">
        <div class="warn-content">
          <div class="aside">
            <div class="ocx" v-show="warnOcxShow">
              <ocx-playback :deviceId="{deviceCode}" ref='warnOcx'></ocx-playback>
            </div>
            <!-- <iframe src="about:blank" frameborder="0" class="ocx-iframe"></iframe> -->
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ocxPlayback from '@/globalcomponents/warning_dialog/components/OcxPlayback.vue'
export default {
  name: 'MonitorDialog',
  components: {
    ocxPlayback: ocxPlayback
  },
  props: {
    monitorVisible: {
      require: true,
      type: Boolean,
      default: false
    },
    deviceCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      deviceId: {},
      title: '园区周边预警',
      msg: '2017-11-14 12:14 发现在1栋北门有人越出边界',
      isdispatch: false,
      isLiftReason: false,
      selectArry: [],
      warnOcxShow: true,
      selectWarnData: []
    }
  },
  methods: {
    // 监控视频放大
    handleWarnToPreview () {
      this.$emit('onWarnToPreview')
    },
    closeGurdEvent () {
      this.isdispatch = false
      this.warnOcxShow = true
    },
    handleWarnClose (val) {
      this.$emit('update:monitorVisible', false)
    },
    switchToVideoDialog (val) {
      this.$emit('switchToVideoDialog')
    }
  },
  mounted () {
  },
  computed: {
  },
  watch: {
    // open (val) {
    //   // 打开窗口时响应
    //   if (val) {
    //     this.$nextTick(() => {
    //       this.deviceId = this.warningData.mapVideoId
    //       console.log(this.warningData.mapVideoId)
    //     })
    //   }
    // }
  }
}
</script>
</script>
<style lang='less' scoped>
.warning-box {
  padding-bottom: 50px;
  text-align: center;
  padding-top: 10px;
  & > h3 {
    font-size: 20px;
    padding: 16px;
    margin: 0;
    border-bottom: 1px solid #ccc;
  }
  & > p {
    margin: 40px auto;
    color: #f54118;
    font-weight: 600;
    font-size: 18px;
  }
  .warn-content {
    overflow: hidden;
    padding: 40px 30px;
  }
  .aside {
    width: 48%;
    height: 500px;
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

// .inner-dialog {
//   .el-dialog {
//     width: 950px !important;
//     height: 580px;
//   }
//   .el-dialog__header {
//     padding: 0;
//     text-align: center;
//     background-image: linear-gradient(-180deg, #ffffff 0%, #f1f4f6 100%);
//     box-shadow: 0 1px 0 0 #d9dce0;
//     border-radius: 6px 6px 0 0;
//     border-bottom: 1px solid #d9dce0;
//     height: 60px;
//     line-height: 60px;
//   }
//   .el-dialog__headerbtn {
//     height: 60px;
//     width: 60px;
//     top: 0;
//     right: 0;
//   }
//   .el-dialog__close {
//     font-size: 20px;
//     font-weight: 600;
//   }
//   .el-table__row {
//     height: 70px;
//   }
//   div.cell {
//     font-size: 16px;
//     text-align: center;
//   }
//   .selcol-style div.cell,
//   .selcol-style div.cell {
//     color: #b0b1b2;
//   }
//   .el-table__row .el-button--primary {
//     font-size: 14px;
//     width: 140px;
//     height: 36px;
//     margin-left: -60px;
//     background-color: #0d912c;
//     &:hover {
//       background-color: #85ce61;
//     }
//   }
//   .lift-reason-box {
//     text-align: center;
//     padding: 38px;
//   }
//   textarea[name="liftReason"] {
//     width: 760px;
//     height: 320px;
//     font-size: 18px;
//     padding: 24px 30px;
//     box-sizing: border-box;
//   }
//   textarea::-webkit-input-placeholder {
//     /* WebKit, Blink, Edge */
//     font-family: "PingFangSC-Medium";
//     font-size: 18px;
//     color: #b0b1b2;
//     letter-spacing: 0;
//     text-align: left;
//   }
//   textarea::-moz-placeholder {
//     /* Mozilla Firefox 19+ */
//     font-family: "PingFangSC-Medium";
//     font-size: 18px;
//     color: #b0b1b2;
//     letter-spacing: 0;
//     text-align: left;
//   }
//   textarea:-ms-input-placeholder {
//     /* Internet Explorer 10-11 */
//     font-family: "PingFangSC-Medium";
//     font-size: 18px;
//     color: #b0b1b2;
//     letter-spacing: 0;
//     text-align: left;
//   }
//   .lift-btn-box {
//     text-align: center;
//   }
//   .show-msg {
//     color: #fff;
//     background: rgba(23, 23, 24, 0.9);
//     border-radius: 2px;
//     width: 300px;
//     height: 50px;
//     line-height: 50px;
//     text-align: center;
//     position: absolute;
//     top: 40%;
//     left: 50%;
//     transform: translate(-50%, -20%);
//   }
// }
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
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang='less'>
// @import url("./assets/css/warningDialog.less");
</style>
