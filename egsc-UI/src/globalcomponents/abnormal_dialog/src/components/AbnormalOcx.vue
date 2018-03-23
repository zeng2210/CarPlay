<template>
  <div class="ocx">
    <div v-if="ocxShow">
      <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" width="1056" height="620" ref="abnormalOcx"></object>
    </div>
    <div class="error-img" v-else>
      <download-ocx></download-ocx>
    </div>
  </div>
</template>
<script>
import { getPlaybackData } from '../apis/index'
export default {
  props: {
    deviceData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      playData: [],
      errorImg: false,
      manufacturer: '',
      ocxShow: true
    }
  },
  mounted () {
    // 刷新时调用释放接口
    window.onbeforeunload = () => {
      this.releaseOcx()
    }
  },
  // 销毁组件时调用
  beforeDestroy () {
    this.releaseOcx()
  },
  methods: {
    // ocx初始化
    initOcx () {
      this.$nextTick(() => {
        let Plugin = this.$refs.abnormalOcx
        try {
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 0,
            width: 1056,
            height: 594
          })) // 创建视频接口
          // 处理回调
          Plugin.OCX_SetCallback((val) => {
            this.funOnEvent(val)
          })
        } catch (e) {
          this.ocxShow = false
        }
      })
    },
    // 视频回调函数
    funOnEvent (val) {
      let callBackdata = JSON.parse(val)
      switch (callBackdata.cmd) {
        case 1:
          if (callBackdata.result === 'ok') {
            this.getOcxData()
          }
          break
      }
    },
    // 播放回放
    setPlayback () {
      let Plugin = this.$refs.abnormalOcx
      try {
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 7,
          play: 1,
          manufacturer: this.manufacturer,
          data: this.playData
        }))
      } catch (e) { }
    },
    // 释放ocx
    releaseOcx () {
      this.playData = []
      try {
        let Plugin = this.$refs.abnormalOcx
        Plugin.OCX_CloseFrame(JSON.stringify({ cmd: 9 }))
      } catch (e) { }
    },
    // 获取视频所需数据
    getOcxData () {
      this.$nextTick(() => {
        getPlaybackData(this.deviceData).then(res => {
          this.playData = res.data.rows
          this.manufacturer = res.data.manufacturer || ''
          this.setPlayback()
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>
<style scoped lang='less'>
.ocx {
  position: relative;
}
.error-img {
  display: block;
  width: 1056px;
  height: 620px;
  position: absolute;
  top: 0;
}
</style>

