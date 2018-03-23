<template>
  <div class="ocx">
    <div v-if="ocxPlaybackShow">
      <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" width="512" height="288" ref="playbackOcx"></object>
    </div>
    <div class="error-img" v-else>
      <download-ocx></download-ocx>
    </div>
  </div>
</template>
<script>
import { getPlaybackData } from '../../abnormal_dialog/src/apis/index'
export default {
  props: {
    deviceData: {
      type: Object,
      default: {}
    },
    ocxPlaybackShow: {
      require: true,
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      playbackData: {},
      errorImg: false,
      manufacturer: '',
      ocxShow: true,
      playData: []
    }
  },
  mounted () {
    // 刷新时调用释放接口
    window.onbeforeunload = () => {
      this.releaseOcx()
    }
  },
  beforeDestroy () {
    this.releaseOcx()
  },
  methods: {
    // ocx初始化
    initOcx () {
      this.$nextTick(() => {
        let Plugin = this.$refs.playbackOcx
        try {
          // 创建视频接口
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 0,
            width: 512,
            height: 288
          }))
          // 处理回调
          Plugin.OCX_SetCallback((rs) => {
            this.funOnEvent(rs)
          })
        } catch (e) {
          this.ocxShow = false
          this.$emit('changeOcxPlaybackShow')
        }
      })
    },
    // 播放回放
    setPlayback () {
      let Plugin = this.$refs.playbackOcx
      try {
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 7,
          play: 1,
          manufacturer: this.manufacturer,
          data: this.playData
        }))
      } catch (e) {
      }
    },
    // 获取视频数据
    getData () {
      this.$nextTick(() => {
        getPlaybackData(this.deviceData).then(res => {
          this.playData = res.data.rows
          this.manufacturer = res.data.manufacturer || ''
          this.setPlayback()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 回调
    funOnEvent (val) {
      let callBackdata = JSON.parse(val)
      switch (callBackdata.cmd) {
        case 1:
          if (callBackdata.result === 'ok') {
            this.getData()
          }
          break
      }
    },
    // 释放ocx资源
    releaseOcx () {
      this.playData = []
      let Plugin = this.$refs.playbackOcx
      try {
        Plugin.OCX_CloseFrame(JSON.stringify({ cmd: 9 }))
      } catch (e) {
      }
    }
  }
}
</script>
<style scoped lang='less'>
.error-img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 512px;
  height: 288px;
  z-index: 200;
}
</style>


