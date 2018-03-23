<template>
  <div class="global-component-contain">
    <el-container>
      <el-header>公共组件测试入口</el-header>
      <el-collapse v-model="activeName" @change="handleChange" accordion>
        <el-collapse-item title="公共弹窗组件" name="1" style="display:none">
          <el-button type="primary" @click="alertDialog('videoDetail')">视频弹窗</el-button>
          <el-button type="success" @click="alertDialog('warningDetail')">预警弹窗</el-button>
          <el-button type="success" @click="alertBroadcastDialog('broadcastView')">广播</el-button>
        </el-collapse-item>
        <el-collapse-item title="保安弹窗" name="2">
          <el-button type="info" @click="gurdDialog">保安信息</el-button>
        </el-collapse-item>
        <el-collapse-item title="预警弹窗" name="3">
          <el-button type="primary" @click="parkSafeDialog('onGardenPerimeterWarming')">园区周界</el-button>
          <el-button type="primary" @click="parkSafeDialog('onLakePerimeterWarming')">人工湖周界</el-button>
          <el-button type="primary" @click="parkSafeDialog('onGardenActionWarming')">园区行为</el-button>
          <el-button type="primary" @click="parkSafeDialog('onChannelOccupiedWarming')">通道占用</el-button>
        </el-collapse-item>
        <el-collapse-item title="人员管理弹出" name="5">
          <el-button type="success" @click="personManaDialog('onSecurityGuardWarming')">保安异常</el-button>
          <el-button type="success" @click="personManaDialog('onCleanerWarming')">保洁异常</el-button>
          <el-button type="success" @click="personoffDialog">人员脱岗</el-button>
          <el-button type="success" @click="partolabnorDialog">巡更设备</el-button>
        </el-collapse-item>
        <el-collapse-item title="报表-异常事件饼图展示" name="6">
          <div class="demo8">
            <abnormal-event-pie :width="710" :height="410" class="abnormal-event-pie" ref="abnormalEventPie"></abnormal-event-pie>
          </div>
        </el-collapse-item>
        <el-collapse-item title="其他组件待更新" name="7">
          <div>更新中...</div>
        </el-collapse-item>
      </el-collapse>
      <!-- </el-main> -->
      <el-footer>恒大智慧小区组件测试入口</el-footer>
      <VideoDialog :commonData="commonData" :open.sync="outerVisible"></VideoDialog>
      <!-- <SecurityDialog :gurdData="gurdData" :open.sync="display"></SecurityDialog> -->
      <ParkDialog :warnData="warnData" :open.sync="isWarnOut" @closeEvent="closeEvent"></ParkDialog>
      <PersonDialog :personData="personData" :open.sync="isPersonWarn"></PersonDialog>
      <BroadcastDialog :broadcastData="broadcastData" :open.sync="broadcastVisible"></BroadcastDialog>
      <personoff-dialog :open.sync="personoffVisible" :personoffData="personoffData"></personoff-dialog>
      <Partolabnor-Dialog :open.sync="partolabnorVisible"></Partolabnor-Dialog>
    </el-container>
  </div>
</template>
<script>
import moment from 'moment'
import { getBroadcastVolumeData } from '../../globalcomponents/dhbroadcastdialog/apis/index'
export default {
  data () {
    return {
      activeName: '1',
      outerVisible: false,
      // 传入自组件的类型类型 videoDetail/warningDetail 显示对应的信息框
      commonData: {},
      display: false,
      gurdData: {},
      // 广播弹框
      broadcastData: {},
      broadcastVisible: false,
      isAbnormalChart: false,
      volValue: null,
      isWarnOut: false,
      warnData: {},
      isPersonWarn: false,
      personData: {},
      personoffVisible: false,
      personoffData: {},
      partolabnorVisible: false
    }
  },
  methods: {
    alertDialog (type) {
      this.outerVisible = true
      this.commonData.type = type
      this.commonData.monitorID = '1'
    },
    gurdDialog () {
      this.display = !this.display
      this.gurdData.gurdID = 'f5996571fda0587c7a1'
      this.gurdData.deviceId = '10032017784f4586ee3f'
      this.gurdData.position = [20, 20]
    },
    // 广播弹框
    alertBroadcastDialog (type) {
      // 查询当前区域音量值,参数为playAreaId, 更改volValue的值后显示广播弹窗
      getBroadcastVolumeData(0).then(
        (result) => {
          this.volValue = result.data.vol
          this.broadcastVisible = true
          this.broadcastData.type = type
          this.broadcastData.monitorID = '1'
        }
      )
    },
    parkSafeDialog (type) {
      this.isWarnOut = true
      this.warnData.type = type
      this.warnData.clickTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    personManaDialog (person) {
      this.isPersonWarn = true
      this.personData.type = person
      if (person === 'onSecurityGuardWarming') {
        this.personData.title = '保安异常信息'
      }
      if (person === 'onCleanerWarming') {
        this.personData.title = '保洁异常信息'
      }
      // console.log(this.personData)
    },
    abnormalChartDialog () {
      this.isAbnormalChart = true
    },
    closeEvent () {
      this.warnData.type = ''
    },
    personoffDialog () {
      this.personoffVisible = true
      this.personoffData.clickTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    handleChange (val) {
      if (val === '6') {
        this.$nextTick(() => {
          this.$refs.abnormalEventPie.resize()
        })
      }
    },
    partolabnorDialog () {
      this.partolabnorVisible = true
    }
  }
}
</script>
 <style lang="less" scoped>
.global-component-contain {
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-collapse {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .abnormal-event-pie {
    margin: 0 auto;
  }
}
</style>
