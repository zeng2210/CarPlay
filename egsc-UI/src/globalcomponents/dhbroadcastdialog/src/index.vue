<template>
  <el-dialog :visible.sync="display" class="broadcast-dialog" :before-close="handleClose">
    <dialog :is="broadcastData.type" ref="broadcastview" :volumeValue="vol" :deviceId="deviceId"></dialog>
  </el-dialog>
</template>
<script>
import broadcastview from './BroadCastItem.vue'
export default {
  name: 'BroadcastDialog',
  components: { broadcastView: broadcastview },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    broadcastData: {
      type: Object,
      validator: function (param) {
        // 用来验证传入的数据对象
        return param
      }
    },
    vol: {
      type: Number,
      default: 1
    },
    deviceId: ''
  },
  data () {
    return {
      display: this.open,
      bbb: 'broadcastView'
    }
  },
  methods: {
    /**
     * @description 关闭前取消广播计时器
     * @param done 关闭广播弹窗方法
     */
    handleClose (done) {
      this.$refs.broadcastview.clearBroadcast()
      done()
    }
  },
  watch: {
    /**
     * @description 打开广播弹窗
     */
    open () {
      this.display = this.open
      if (this.open) {
        if (this.$refs.broadcastview) {
          this.$refs.broadcastview.deviceIdSpare = this.deviceId
          this.$refs.broadcastview.getBroadcast()
          this.$refs.broadcastview.setBroadcast()
        }
      }
    },
    display () {
      this.$emit('update:open', this.display)
    }
  }
}
</script>
<style lang="less">
.broadcast-dialog > .el-dialog {
  width: 365px;
}
.broadcast-dialog .el-dialog__headerbtn {
  z-index: 99;
  font-size: 18px;
  top: 25px;
}
.broadcast-dialog .el-dialog__close {
  font-weight: 700;
}
.broadcast-dialog .el-dialog__header {
  padding: 0;
}
.broadcast-dialog .el-dialog__body {
  padding: 0;
}
</style>

