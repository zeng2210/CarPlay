<template>
  <div>
    <el-dialog :visible.sync="display" class="park-safe-dialog" :close-on-click-modal="true" :modal="false" :lock-scroll="true" top="23vh">
      <component :is="warnData.type" :warnType="warnData.type" :clickTime="warnData.clickTime" @warningDialog="warningDialogShow" @dismissWarn="dismissWarnShow" :dissWarnSucc="dissWarnSucc" ref="parkSafeList">
      </component>
    </el-dialog>
    <!-- 解除警告对话框 -->
    <dismiss-warn :isWarnShow="isWarnShowDialog" @closeWarn="closeWarnEvent" @dismissWarnSucc="dismissWarnSucc" :dismissArray="selectArry"></dismiss-warn>
  </div>
</template>
<script>
import warndialog from './ParkDialogWarnList.vue'
import dismisswarndialog from '../src/components/DismissWarnDialog'
export default {
  name: 'ParkDialog',
  components: {
    onGardenPerimeterWarming: warndialog,
    onLakePerimeterWarming: warndialog,
    onGardenActionWarming: warndialog,
    onChannelOccupiedWarming: warndialog,
    dismissWarn: dismisswarndialog
  },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    warnData: {
      type: Object
    }
  },

  data () {
    return {
      display: this.open,
      warningData: {},
      isWarnShowDialog: false,
      dissWarnSucc: false,
      selectArry: []
    }
  },

  methods: {
    // 预警框弹出
    warningDialogShow (wanrInfoObj) {
      this.warningData = {
        eventName: wanrInfoObj.eventName,
        titleName: wanrInfoObj.titleName,
        imgUrl: wanrInfoObj.imgUrl,
        selectArry: wanrInfoObj.currentArray,
        deviceId: wanrInfoObj.currentArray[0].cameraCode,
        startTime: wanrInfoObj.currentArray[0].startTime,
        endTime: wanrInfoObj.currentArray[0].endTime,
        deviceIp: wanrInfoObj.currentArray[0].deviceIp,
        devicePort: wanrInfoObj.currentArray[0].devicePort
      }
      this.$emit('warningDialogOn', this.warningData)
    },
    // 解除警告框弹出
    dismissWarnShow (val) {
      if (val) {
        this.selectArry = val
      }
      this.isWarnShowDialog = true
    },
    // 解除警告框关闭
    closeWarnEvent () {
      this.isWarnShowDialog = false
    },
    // 解除警告成功提示
    dismissWarnSucc () {
      this.dissWarnSucc = true
      this.$refs.parkSafeList.multiDisWarnSucc()
      let timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 解除预警成功
    monitordisWarnSucc () {
      this.dissWarnSucc = true
      this.$refs.parkSafeList.minitorDissWarnSucc()
      let timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 派遣成功后更新列表保安状态
    updateGuardStatus () {
      this.$refs.parkSafeList.updateGuardStatus()
    }
  },
  watch: {
    open () {
      this.display = this.open
      // 弹窗打开
      if (this.display) {
        this.$nextTick(function () {
          this.$refs.parkSafeList.init()
        })
      }
    },
    display () {
      this.$emit('update:open', this.display)
    }
  }
}
</script>
<style lang='less'>
@import url("./assets/css/parkwarn.less");
</style>