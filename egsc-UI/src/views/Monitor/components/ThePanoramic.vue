<template>
  <div class="panoramic-style">
    <div v-if="ocxShow" class="eagle-eye-box">
      <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" ref="eagleEye" class="eagle-eye"> </object>
    </div>
    <div class="loading" v-else>
      <!-- 加载失败 -->
      <download-ocx></download-ocx>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('monitor')
export default {
  name: 'thePanoramic',
  data () {
    return {
      ocxShow: true,
      eagleFullData: [] // 全景参数
      // eagleSemiData: {} //  半景参数
    }
  },
  mounted () {
    this.initOcx()
    window.onbeforeunload = () => {
      this.releaseOcx()
    }
  },
  beforeDestroy () {
    this.releaseOcx()
    console.log('鹰眼销毁')
  },
  methods: {
    ...mapMutations(['UPDATE_ASIDE_LOADING']),
    // 鹰眼初始化
    initOcx () {
      this.$nextTick(() => {
        try {
          let Plugin = this.$refs.eagleEye
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1, // 鹰眼初始化
            showMode: 2,
            width: Plugin.offsetWidth,
            height: Plugin.offsetHeight
          }))
          Plugin.OCX_SetCallback((data) => { this.ocxCallBack(data) })
        } catch (e) {
          this.ocxShow = false
        }
      })
    },
    // 获取鹰眼数据
    getEagleEyeParams (val) {
      console.log(val)
      this.closePreview()
      if (val.subEagleEyeDtoList && val.subEagleEyeDtoList.length === 2) {
        this.UPDATE_ASIDE_LOADING(true)
        this.eagleFullData = [
          {
            deviceID: val.subEagleEyeDtoList[0].subDeviceID || '',
            parentID: val.deviceID,
            mediaIP: val.streamIp,
            mediaPort: val.streamPort,
            streamProfile: 0,
            fullView: val.subEagleEyeDtoList[0].fullView
          }, {
            deviceID: val.subEagleEyeDtoList[1].subDeviceID || '',
            parentID: val.deviceID,
            mediaIP: val.streamIp,
            mediaPort: val.streamPort,
            streamProfile: 0,
            fullView: val.subEagleEyeDtoList[1].fullView
          }
        ]
        setTimeout(() => {
          this.$nextTick(() => {
            this.playPreview()
            this.UPDATE_ASIDE_LOADING(false)
          })
        }, 1000)
      }
    },
    // 播放预览
    playPreview () {
      try {
        let Plugin = this.$refs.eagleEye
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 2,
          data: this.eagleFullData
        }))
        this.getPlaybackData()
      } catch (e) { }
    },
    // 停止预览
    closePreview () {
      try {
        let Plugin = this.$refs.eagleEye
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 3, data: this.eagleFullData }))
      } catch (e) { }
    },
    // 释放ocx资源
    releaseOcx () {
      this.playbackRequestData = []
      try {
        let Plugin = this.$refs.eagleEye
        Plugin.OCX_CloseFrame(JSON.stringify({ cmd: 9 }))
      } catch (e) { }
    },
    // ocx返回的参数
    ocxCallBack (data) {
      window.focus()
      let callBackdata = JSON.parse(data)
      switch (callBackdata.cmd) {
        case 12:
          this.UPDATE_ASIDE_LOADING(false)
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.panoramic-style {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  .eagle-eye-box {
    width: 100%;
    height: 100%;
  }
  .eagle-eye {
    width: 100%;
    height: 100%;
  }
  .loading {
    width: 1345px;
    height: 690px;
    background: yellowgreen;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>
