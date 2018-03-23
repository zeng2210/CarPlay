<template>
  <el-container id="app">
    <build-plan-init @singleClickEvent="singleClickEvent" ref="buildPlanInit"></build-plan-init>
    <!-- <VideoDialog :commonData="commonData" :open.sync="outerVisible"></VideoDialog> -->
    <video-dialog :previewData="previewData" :warnShow="warnShow" :open="previewVisible" @close="handleVideoClose" @onPreviewBackToWarn="handlePreviewBackToWarn"></video-dialog>
    <warn-dialog :warningData="warningData" :open.sync="warningVisible" @close="handleWarnClose" @onWarnToPreview="handleWarnToPreview" @dismissWarnSuccShow="dismissWarnSuccShow"></warn-dialog>
    <broadcast-dialog :broadcastData="broadcastData" :open.sync="broadcastVisible" :deviceId="deviceId"></broadcast-dialog>
  </el-container>

</template>

<script>
import BuildPlanInit from '@/views/Map/BuildPlanInit'
import { mapActions } from 'vuex'
import parkWarnCode from '@/views/Home/mixin/parkwarn_code'

export default {
  name: 'Home',
  components: {
    BuildPlanInit
  },
  data () {
    return {
      activeName: '1',
      // outerVisible: false,
      // 传入自组件的类型类型 videoDetail/warningDetail 显示对应的信息框
      // commonData: {},
      deviceId: '',
      // 广播弹框
      broadcastData: {},
      broadcastVisible: false
    }
  },
  mixins: [parkWarnCode],
  mounted: function () {
    this.showReturn(() => {
      this.$refs.buildPlanInit.backUp()
    })
  },
  methods: {
    ...mapActions(['updateWarmingNum', 'showReturn', 'hideReturn']),
    /**
     * @description 点击打开弹窗
     * @param {Object} params 点击的点位信息
     */
    singleClickEvent (params) {
      switch (params.feature.markerType) {
        case 'camera':
        case 'warning':
          this.showOcxDialog(params.feature)
          break
        case 'video':
          this.deviceId = params.feature.deviceId
          this.alertBroadcastDialog('broadcastView')
          break
      }
    },
    /**
     * @description 广播弹框
     * @param {string} type 类型
     */
    alertBroadcastDialog (type) {
      this.broadcastVisible = true
      this.broadcastData.type = type
      this.broadcastData.monitorID = '1'
    }
  },
  computed: {
    websocketMessage () {
      return this.$store.getters.getWebsocketMessage
    }
  },
  watch: {
    websocketMessage (data) {
      console.log(this.$store.state.mutations.websocketMessage.type)
      var msgObj = this.$store.state.mutations.websocketMessage
      // 门禁范围
      if (msgObj.type >= 30000 && msgObj.type <= 39999) {
        var infoObj = JSON.parse(msgObj.info)
        this.updateWarmingNum(['entranceDeviceNum', infoObj[1]])
        this.updateWarmingNum(['sidewalkDeviceNum', infoObj[2]])
      } else if (msgObj.type >= 20000 && msgObj.type <= 29999) {
        this.$refs.buildPlanInit.createMap(this.$refs.buildPlanInit.option)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '/assets/css/animate.css';

body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100%;
  background-color: #fff !important;
}
</style>
