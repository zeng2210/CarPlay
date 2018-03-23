<template>
  <div>
    <el-dialog :visible.sync="dialogOpen" class="parkinglot-dialog" style="width: 100%" :lock-scroll="true" :close-on-click-modal="true" top="20vh" :modal="false">
      <ParkinglotTable :parkinglotData.sync="parkinglotData" @showMonitorDialog="handleShowMonitorDialog" @dismissRefresh="dismissOuter"></ParkinglotTable>
    </el-dialog>
    <!-- 监控对话框 -->
    <MonitorDialog :warningData="monitorDialogData" :monitorVisible.sync="isMonitorDialogVisible" @dismissRefresh="dismissOuter"></MonitorDialog>
  </div>
</template>
<script>
  import ParkinglotTable from './ParkinglotTable.vue'
  import MonitorDialog from './MonitorDialog.vue'
  export default {
    name: 'ParkinglogDialog',
    components: {
      ParkinglotTable,
      MonitorDialog
    },
    props: {
      open: {
        require: true,
        type: Boolean,
        default: false
      },
      parkinglotData: {
        type: Object
      }
    },
    data() {
      return {
        // parkinglotData: this.parkinglotData,
        dialogOpen: this.open,
        isMonitorDialogVisible: false,
        monitorDialogData: {}
      }
    },
    methods: {
      handleShowMonitorDialog(val) {
        this.monitorDialogData = val
        this.isMonitorDialogVisible = true
      },
      dismissOuter () {
        this.$emit('dismissOuter')
      }
    },
    watch: {
      open() {
        this.dialogOpen = this.open
      },
      dialogOpen(val) {
        this.$emit('update:open', this.dialogOpen)
      }
    }
  }
</script>

<style lang='less'>
  @import url("./assets/css/parkwarn.less");
</style>
