<template>
  <div class="ocx">
    <div v-if="ocxPreviewShow" class="ocx-show" :cameraData="cameraData">
      <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" width="1056" height="594" ref="prewviewOcx"></object>
    </div>
    <div class="error-img" v-else>
      <download-ocx v-show="downLoadShow"></download-ocx>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { getPlaybackData } from '../../../abnormal_dialog//src/apis/index'
import { getDeviceByCameraData, postPtzCmdData } from '../apis/index'
export default {
  props: {
    deviceId: {
      type: String,
      default: ''
    },
    ocxPreviewShow: {
      require: true,
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      errorImg: false,
      downLoadShow: false,
      previewData: {},
      ocxShow: true,
      playBackData: {},
      playbackRequestData: [],
      cameraData: {},
      previewAllData: {},
      manufacturer: 2,
      ptzDatas: ['A50F0108005F001C', 'A50F0104005F0018', 'A50F01025F000016', 'A50F01015F000015', 'A50F0110000010D5', 'A50F0120000010E5']
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
        try {
          let Plugin = this.$refs.prewviewOcx
          // 创建视频接口
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 0,
            width: 1056,
            height: 594
          }))
          // 处理回调
          Plugin.OCX_SetCallback((data) => {
            this.funOnEvent(data)
          })
        } catch (e) {
          this.downLoadShow = true
          this.$emit('changeOcxPreviewShow')
        }
      })
    },
    // 角度操作发送到ocx
    sendPtzOcx () {
      console.log(this.previewData.deviceID)
      try {
        let Plugin = this.$refs.prewviewOcx
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 4,
          deviceId: this.previewData.deviceID
        }))
      } catch (e) {
        this.ocxShow = false
      }
    },
    // 角度操作发送到云平台
    sendPtzCmd (ptzCmd) {
      postPtzCmdData({
        id: 0,
        method: 'DeviceControl',
        ptzCmdParams: {
          deviceId: this.previewData.deviceID,
          parentId: this.previewData.parentID,
          ptzCmd: this.ptzDatas[ptzCmd]
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 播放预览
    playPreview () {
      try {
        let Plugin = this.$refs.prewviewOcx
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 2,
          data: [this.previewData]
        }))
        this.getPlaybackList()
      } catch (e) { }
    },
    // 重新播放
    rePlayPreview () {
      try {
        let Plugin = this.$refs.prewviewOcx
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 2,
          data: [this.previewData]
        }))
      } catch (e) { }
    },
    // 关闭视频推流
    stopPreview () {
      try {
        let Plugin = this.$refs.prewviewOcx
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 3,
          data: [this.previewData]
        }))
      } catch (e) { }
    },
    // 释放ocx资源
    releaseOcx () {
      this.playbackRequestData = []
      try {
        let Plugin = this.$refs.prewviewOcx
        Plugin.OCX_CloseFrame(JSON.stringify({ cmd: 9 }))
      } catch (e) { }
    },
    // 抓拍
    setCapture () {
      try {
        let Plugin = this.$refs.prewviewOcx
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 6,
          deviceId: this.previewData.deviceID,
          capturePath: this.previewAllData.capturePath
        }))
      } catch (e) { }
    },
    // ocx回调函数
    funOnEvent (data) {
      let callBackdata = JSON.parse(data)
      switch (callBackdata.cmd) {
        case 1:
          if (callBackdata.result === 'ok') {
            this.getVideoData()
            window.setTimeout(() => { window.focus() }, 500)
          }
          break
        case 4:
          this.sendPtzCmd(callBackdata.ptzCmd)
          break
        case 10:
          this.setLayer(callBackdata.cmd)
          break
        case 11:
          this.setLayer(callBackdata.cmd)
          break
      }
    },
    // 预览回放切换
    setLayer (data) {
      this.$emit('changeLayer', data)
    },
    // 获取视频数据
    getVideoData () {
      this.cameraData = {}
      this.$nextTick(() => {
        getDeviceByCameraData({ cameraCode: this.deviceId }).then(res => {
          this.previewAllData = res.data
          this.cameraData = {
            cameraKind: Number(res.data.deviceTypeCode) || 2001,
            parentId: res.data.parentID || ''
          }
          this.previewData = {
            deviceID: res.data.deviceID,
            parentID: res.data.parentID,
            mediaIP: res.data.mediaIP,
            mediaPort: res.data.mediaPort,
            streamProfile: 0
          }
          // 获取回放接口所需的数据
          this.playBackData = {
            startTime: moment(new Date() - 1000 * 60 * 60 * 24).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            ip: res.data.deviceIP,
            port: Number(res.data.devicePort),
            pageNo: 1,
            pageSize: 64
          }
          this.playPreview()
          this.$emit('getCamareKind', this.cameraData)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    // 获取ocx所需回放的数据
    getPlaybackList () {
      getPlaybackData(this.playBackData).then(res => {
        this.playbackRequestData = this.playbackRequestData.concat(res.data.rows)
        this.manufacturer = res.data.manufacturer || ''
        if (res.data.hasMore === true) {
          this.playBackData.pageNo++
          this.getPlaybackList()
        } else {
          if (this.playbackRequestData.length > 0) {
            this.setPlayback()
          } else {
            console.log('novideo')
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeStream (streamCode) {
      this.stopPreview()
      // 回放资源也需要释放
      this.previewData.streamProfile = streamCode
      console.log(this.previewData)
      this.rePlayPreview()
    },
    // 回放
    setPlayback () {
      console.log(this.playbackRequestData)
      let Plugin = this.$refs.prewviewOcx
      try {
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 7,
          play: 0,
          manufacturer: this.manufacturer,
          data: this.playbackRequestData
        }))
      } catch (e) {
      }
    }
  }
}
</script>
<style scoped lang='less'>
.ocx {
  position: relative;
  .ocx-show {
    margin-left: 52px;
    height: 594px;
    object {
      float: left;
    }
  }
  .error-img {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 100;
    width: 1056px;
    height: 594px;
    margin-left: -528px;
  }
}
</style>



