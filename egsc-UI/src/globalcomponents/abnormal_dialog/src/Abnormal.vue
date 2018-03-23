<template>
  <div class="boxDialog">
    <el-dialog title="异常视频" :visible="open" id="el-dialog" :close-on-click-modal="false" @close="closeDialog">
      <div class="box">
        <el-button class='btn' @click="handleAbnormaToVideo">
          <img src="../images/u16218.png" alt="">
          <span> 查看实时监控</span>
        </el-button>
        <div class="imgbox">
          <div class="ocx-box">
            <abnormal-ocx :deviceData="deviceData" ref="abnormal"></abnormal-ocx>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import abnormalOcx from './components/AbnormalOcx'
import { getDeviceByCameraData } from '../../video_dialog/src/apis/index'
export default {
  name: 'abnormalDialog',
  components: {
    abnormalOcx
  },
  data () {
    return {
      deviceData: {}
    }
  },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    modalProperty: {
      type: Boolean,
      default: true
    },
    abnormalData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 释放ocx操作
    closeDialog () {
      this.$refs.abnormal.releaseOcx()
      this.$emit('close')
    },
    // 异常视频调至预览
    handleAbnormaToVideo () {
      this.$emit('onAbnormalToVideo')
    }
  },
  watch: {
    open (val) {
      if (val) {
        this.$nextTick(() => {
          // 异常视频数据
          getDeviceByCameraData({ cameraCode: this.abnormalData.deviceId }).then(res => {
            this.deviceData = {
              startTime: this.abnormalData.startTime,
              endTime: this.abnormalData.startTime,
              ip: res.data.deviceIP,
              port: Number(res.data.devicePort)
            }
            this.$refs.abnormal.initOcx()
          }).catch(err => {
            console.log(err)
          })
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "./assets/css/preview";
</style> 
 <style lang='less'>
@import "./assets/css/abnormal";
</style>



