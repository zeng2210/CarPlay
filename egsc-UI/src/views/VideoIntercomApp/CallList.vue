<template>
  <div class="cellgate-call-contain">
    <el-dialog :visible.sync="display" class="call call-record" style="z-index:9999;" :lock-scroll=true :close-on-click-modal=false :modal=false @close="close" size="tiny" width="950px" center>
      <div slot="title">{{videoIntercomData.dialogTitle+'('+allCellGateCallNum+')'}}</div>
      <!-- <div class='recored-box' v-tableLoadMore='tableLoadMore' v-loading='tableloading'> -->
      <el-scrollbar :native="false" :noresize="true" v-loading='tableloading'>
        <el-table class='recored-box' :show-header="true" :data="callRecord" stripe @selection-change="handleSelectionChange">
          <EmptyIcon slot="empty"></EmptyIcon>
          <el-table-column type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="inviteTime" width="180" label="时间" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="deviceAddress" width="180" label="位置" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="deviceAddress" width="180" label="门禁位置" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="answer" width="180" label="是否连通" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="answer" width="180" label="通话时间" align="center" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      callRecord: [] // 呼叫记录
    }
  }
}
</script>
<style lang="less">
@import url("./assets/css/videointercomdialog.less");
</style>

