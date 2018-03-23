<template>
  <div>
    <el-dialog :visible="open" class="video-dialog" @close="closeDialog" :width="videoWidth">
      <div class="dialog-box">
        <el-button plain class="back-look-btn" v-show="warnShow" @click="handlePreviewBackToWarn">
          <i class="el-icon-arrow-left"></i> 返回查看警报
        </el-button>
        <el-button plain class="back-look-btn" v-show="abnormalShow" @click="handlePreviewBackToAbnormal">
          <i class="el-icon-arrow-left"></i> 返回异常视频
        </el-button>
        <el-tabs v-model="activeName">
          <el-tab-pane label="监控画面" name="first">
            <div class="detail-box">
              <div class="ocx-box">
                <ocx-preview :deviceId="deviceId" v-show="ocxShow" ref="playMixin" @getCamareKind="getCamareKind" :ocxPreviewShow="ocxPreviewShow" @changeOcxPreviewShow="changeOcxPreviewShow" @changeLayer="changeLayer"></ocx-preview>
              </div>
              <!-- 预置点和人脸抓拍 -->
              <div class="capture" v-show="captureShow">
                <div class="mask-layer" v-show="masklayerShow"></div>
                <face-recognition v-if="faceRecognitionShow" :cameraId="cameraData.deviceId" ref="facePicture"></face-recognition>
                <camera-preset v-else :cameraData="cameraData" ref="preset"></camera-preset>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="摄像头定位" name="second">
            <div class="detail-box">
              <DeviceMap class="map-box" ref="deviceMapInit"></DeviceMap>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer-menu" class="dialog-footer" v-show="isShowFooter">
          <el-button @click="screenshot"><img src='../images/icon_cut.png' class="icon-img">
            <span>截图</span>
          </el-button>
          <el-button @click="angleControl" :disabled="masklayerShow"><img src='../images/icon_angle.png' class="icon-img">
            <span>角度</span>
          </el-button>
          <el-button @click="doDispatchGuard"><img src='../images/icon_send.png' class="icon-img">
            <span>派遣</span>
          </el-button>
          <ul class="code-stream-tool">
            <li :class="{active: streamActiveIndex === 0}" @click="handleStreamClick(0)">高清</li>
            <li :class="{active: streamActiveIndex === 1}" @click="handleStreamClick(1)">标清</li>
          </ul>
          <div class="code-mask-layer" v-show="masklayerShow"></div>
        </div>
      </div>
    </el-dialog>
    <!-- 派遣保安对话框 -->
    <gurd-list :isdispatchShow="isdispatch" @closeGurd="closeGurdEvent" ref="guardList"></gurd-list>
  </div>
</template>
<script>
import videoImg from '../images/u687.gif'
import ocxPreview from './components/OcxPreview'
import gurdList from './components/GurdList'
import cameraPreset from './components/CameraPreset'
import faceRecognition from './components/FaceRecognition'
export default {
  name: 'VideoDialog',
  components: { gurdList, ocxPreview, cameraPreset, faceRecognition },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    previewData: {
      type: Object,
      default: {}
    },
    // 返回预警所需要的参数
    warnShow: {
      require: true,
      type: Boolean,
      default: false
    },
    // 返回异常视频所需要的参数
    abnormalShow: {
      require: true,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowFooter: true,
      activeName: 'first',
      imgSrc: videoImg,
      showScreenshot: false,
      endScreenshot: false,
      iconRadio: true,
      ocxShow: true,
      isdispatch: false,
      deviceId: '',
      videoWidth: '1160px',
      faceRecognitionShow: false,
      cameraKind: 2001,
      streamActiveIndex: 0,
      ocxPreviewShow: false,
      cameraData: {},
      mapObject: {
        width: '1056px',
        height: '594px'
      },
      masklayerShow: false, // 预置点遮罩层
      captureShow: false
    }
  },
  methods: {
    // 是否显示ocx
    changeOcxPreviewShow () {
      this.ocxPreviewShow = false
    },
    // 获取设备类型
    getCamareKind (data) {
      this.cameraKind = data.cameraKind
      this.cameraData = {
        cameraId: data.parentId,
        deviceId: this.deviceId
      }
      switch (this.cameraKind) {
        case 2001:
          this.videoWidth = '1160px'
          this.captureShow = false
          break
        case 2004:
          this.videoWidth = '1290px'
          this.captureShow = true
          this.faceRecognitionShow = true
          this.$nextTick(() => {
            this.$refs.facePicture.onDialogOpen() // 获取人脸抓拍图片
          })
          break
        case 2003:
          this.videoWidth = '1290px'
          this.captureShow = true
          this.faceRecognitionShow = false
          this.$nextTick(() => {
            this.$refs.preset.fnGetPreset() // 获取预置点
            this.$refs.preset.fnGetCruise() // 获取巡航点
          })
          break
      }
    },
    // 截图相关操作
    screenshot () {
      this.$refs.playMixin.setCapture()
    },
    // 角度调控相关操作
    angleControl () {
      if (this.cameraKind === 2003) {
        this.$refs.playMixin.sendPtzOcx()
      }
    },
    // 派遣保安
    doDispatchGuard () {
      this.isdispatch = true
      // this.ocxPreviewShow = false
      this.$refs.guardList.getGuardList(this.deviceId, 'previewData')
    },
    // 关闭派遣保安列表
    closeGurdEvent () {
      this.isdispatch = false
      // this.ocxPreviewShow = true
    },
    // 关闭当前预览窗，回到预警窗
    handlePreviewBackToWarn () {
      this.$emit('onPreviewBackToWarn')
    },
    // 关闭当前预览窗，回到异常视频
    handlePreviewBackToAbnormal () {
      this.$emit('onPreviewBackToAbnormal')
    },
    // 绘制地图定位功能
    renderMap () {
      this.$refs.deviceMapInit.addMap(Object.assign({ deviceID: this.deviceId }, this.mapObject))
    },
    // 是否显示遮罩层
    changeLayer (data) {
      if (data === 10) {
        this.masklayerShow = true
      } else {
        this.masklayerShow = false
      }
    },
    // 关闭弹窗
    closeDialog () {
      this.ocxShow = false
      this.captureShow = false
      this.masklayerShow = false
      this.$refs.playMixin.releaseOcx()
      this.activeName = 'first'
      if (this.cameraKind === 2003) {
        this.$refs.preset.closePreset()
      }
      if (this.cameraKind === 2004) {
        this.$refs.facePicture.onDialogClose()
      }
      this.cameraKind = 2001
      this.$emit('close')
    },
    handleStreamClick (activeIndex) {
      this.streamActiveIndex = activeIndex
      this.$refs.playMixin.changeStream(activeIndex)
    }
  },
  watch: {
    // 预览窗口打开和关闭
    open (val) {
      if (val) {
        // 获取视频所需参数
        this.ocxShow = true
        this.streamActiveIndex = 0
        this.$nextTick(() => {
          this.ocxPreviewShow = true
          this.deviceId = this.previewData.deviceId
          this.$refs.playMixin.initOcx()
        })
      }
    },
    // 监控与定位切换
    activeName (value) {
      if (value === 'first') {
        this.isShowFooter = true
        console.log(this.cameraKind)
        if (this.cameraKind === 2001) {
          this.videoWidth = '1160px'
        } else {
          this.videoWidth = '1290px'
          this.captureShow = true
        }
      } else {
        this.isShowFooter = false
        this.captureShow = false
        this.videoWidth = '1160px'
        this.renderMap()
      }
    }
  }
}
</script>
<style lang='less' scoped>
@import "./assets/css/preview";
</style>
<style lang="less">
@import "./assets/css/videodialog";
</style>















