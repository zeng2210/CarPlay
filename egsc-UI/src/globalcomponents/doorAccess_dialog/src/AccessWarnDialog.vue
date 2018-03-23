<template>
  <div>
    <el-dialog :visible.sync="display" :before-close="PreClose"  class="access-warn-dialog" top="22vh" :modal="false">
      <component :is="alarmData.type" :warnType="alarmData.type" :clickTime="alarmData.clickTime" @warningDialog="warningDialogShow" @dismissWarn="dismissWarnShow" :dissWarnSucc="dissWarnSucc" :statuIndex="statuIndex" :isDismissWarnIndex="isDismissWarnIndex">
        <slot></slot>
      </component>
    </el-dialog>
    <!-- 警告对话框 -->
    <VideoDialog :previewData="commonData" :open.sync="PreviewVisible"  :warnShow="warnShow" @dismissWarnSuccShow="dismissWarnSucc" @close="handleVideoClose" @hasDispatchGurd="hasDispatchGurd"  @onPreviewBackToWarn="handleOnPreviewBackToWarn"></VideoDialog>
    <monitor-dialog :warningData="warningData" :open.sync="warningVisible" @close="handleWarnClose" @onWarnToPreview="handleWarnToPreview" @dismissWarnSuccShow="dismissWarnSucc"></monitor-dialog>
    
    <!-- 解除警告对话框 -->
    <dismiss-warn :isWarnShow="isWarnShowDialog" @closeWarn="closeWarnEvent" prop="dismisswarndialog" ref="dismisswarndialog" @dismissWarnSucc="dismissWarnSucc"></dismiss-warn>
  </div>
</template>
<script>
import accessDialog from './AccessDialogWarnList.vue'
import dismissdialog from './DismissWarnDialog.vue'
import MonitorDialog from './MonitorDialog.vue'
export default {
  name: 'AccessDialog',
  components: {
    dismissWarn: dismissdialog,
    onEntranceDeviceWarming: accessDialog,
    onSidewalkDeviceWarming: accessDialog,
    monitorDialog: MonitorDialog
  },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    alarmData: {
      type: Object
      // validator: function (param) {
      //   // 用来验证传入的数据对象
      //   return param
      // }
    }
  },

  data () {
    return {
      display: this.open,
      outerVisible: false,
      commonData: {},
      isWarnShowDialog: false,
      dissWarnSucc: false,
      statuIndex: -1,
      isDismissWarnIndex: -1,
      selectWarnData: [],
      warningData: {},
      warningVisible: false,
      PreviewVisible: false,
      warnShow: false
    }
  },

  methods: {
    PreClose (done) {
      this.selectWarnData = []
      this.$root.Bus.$emit('PreClose', done)
    },
    // 预警框弹出
    warningDialogShow (wanrInfoObj) {
      /* this.commonData.index = wanrInfoObj.index
      this.commonData.eventName = wanrInfoObj.eventName
      this.commonData.titleName = wanrInfoObj.titleName
      this.commonData.eventId = wanrInfoObj.eventId
      this.alertDialog(this.commonData) */
      this.warningData = {
        eventName: wanrInfoObj.eventName,
        eventStatus: wanrInfoObj.eventStatus,
        titleName: wanrInfoObj.titleName,
        imgUrl: wanrInfoObj.imgUrl,
        selectArry: wanrInfoObj.currentArray,
        deviceID: wanrInfoObj.currentArray[0].cameraCode,
        parentID: wanrInfoObj.currentArray[0].deviceCode,
        startTime: wanrInfoObj.startTime
      }
      this.alertDialog(this.warningData)
    },
    alertDialog (warningData) {
      this.warningData.mapVideoId = this.warningData.deviceID
      this.warningData = warningData
      this.warningVisible = true
    },
    // 解除警告框弹出
    dismissWarnShow (alarmData) {
      console.log(alarmData)
      this.selectWarnData = alarmData
      this.isWarnShowDialog = true
    },
    // 解除警告框关闭
    closeWarnEvent () {
      this.isWarnShowDialog = false
    },
    // 解除警告成功提示
    dismissWarnSucc () {
      this.dissWarnSucc = true
      var timer = setTimeout(() => {
        this.dissWarnSucc = false
        clearTimeout(timer)
      }, 1000)
    },
    // 监控派遣保安后操作列表页操作
    hasDispatchGurd () {
      this.statuIndex = this.commonData.index
      // console.log(this.statuIndex)
    },
    handleWarnClose () {
      this.warningVisible = false
    },
    handleWarnToPreview () {
      this.warningVisible = false
      this.PreviewVisible = true
      this.warnShow = true
      this.commonData = { deviceId: this.warningData.mapVideoId }
    },
    handleVideoClose () {
      this.warnShow = false
      this.PreviewVisible = false
    },
    handleOnPreviewBackToWarn () {
      this.warningVisible = true
      this.PreviewVisible = false
      this.warnShow = false
    }
  },
  computed: {
  },
  watch: {
    open () {
      this.display = this.open
    },
    display () {
      this.$emit('update:open', this.display)
    }
  }
}
</script>
<style  lang='less'>
@import url("./assets/css/parkwarn.less");
</style>
