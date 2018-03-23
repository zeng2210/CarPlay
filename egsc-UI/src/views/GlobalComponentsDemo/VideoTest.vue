<template>
  <div class="video-test-contain">
    <el-container>
      <el-header>公共组件测试入口</el-header>
      <el-main>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="公共弹窗组件" name="1">
            <el-button type="primary" @click="alertDialog('videoDetail')">视频弹窗</el-button>
            <el-button type="success" @click="warnDialog('warningDetail')">预警弹窗</el-button>
            <el-button type="warning" @click="abnormalDialog('abnormalDetail')">异常视频</el-button>
          </el-collapse-item>
          <el-collapse-item title="保安弹窗" name="2">
            <el-button type="info" @click="gurdDialog">保安信息</el-button>
          </el-collapse-item>
        </el-collapse>
      </el-main>
      <el-footer>恒大智慧小区组件测试入口</el-footer>
      <video-dialog :previewData="previewData" :warnShow="warnShow" :abnormalShow="abnormalShow" :open.sync="previewVisible" @close="handleVideoClose" @onPreviewBackToWarn="handlePreviewBackToWarn" @onPreviewBackToAbnormal="handlePreviewBackToAbnormal"></video-dialog>
      <warn-dialog :warningData="warningData" :open.sync="warningVisible" @close="handleWarnClose" @onWarnToPreview="handleWarnToPreview"></warn-dialog>
      <!-- <SecurityDialog :gurdData="gurdData" :open.sync="display"></SecurityDialog> -->
      <abnormal-dialog :abnormalData="abnormalDate" :open.sync="abnormalVisible" @close="handleAbnormalClose" @onAbnormalToVideo="handleAbnormalToPreview"> </abnormal-dialog>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '1',
      previewVisible: false,
      warningVisible: false,
      abnormalVisible: false,
      // 传入自组件的类型类型 videoDetail/warningDetail 显示对应的信息框
      previewData: {},
      display: false,
      gurdData: {},
      isWarnOut: false,
      warnData: {},
      isPersonWarn: false,
      warnShow: false,
      personData: {},
      warningData: {},
      abnormalDate: {},
      abnormalShow: false
    }
  },
  methods: {
    // 弹出预览框
    alertDialog (type) {
      this.previewVisible = true
      this.previewData = { deviceId: '30411572828910320001' }
    },
    // 弹出预警款
    warnDialog (type) {
      this.warningVisible = true
      this.warningData = { deviceId: '30411572828910320001' }
    },
    // 派遣
    gurdDialog () {
      this.display = true
      this.gurdData.gurdID = '1'
    },
    // 弹出异常视频框
    abnormalDialog () {
      this.abnormalVisible = true
      this.abnormalData = { pageSize: '1', pageNo: '10' }
      // this.abnormalData = { deviceId: '30011689649931720001' }
    },
    // 关闭异常视频
    handleAbnormalClose () {
      this.abnormalVisible = false
    },
    // 关闭预览
    handleVideoClose () {
      this.previewVisible = false
      this.warnShow = false
      this.abnormalShow = false
    },
    // 预览回到预警
    handlePreviewBackToWarn () {
      this.previewVisible = false
      this.warningVisible = true
    },
    // 关闭预警
    handleWarnClose () {
      this.warningVisible = false
    },
    // 预警转入预览
    handleWarnToPreview () {
      this.warningVisible = false
      this.previewVisible = true
      this.warnShow = true
      this.abnormalShow = false
      this.previewData = { deviceId: this.warningData.deviceId }
    },
    // 异常视频转入预览
    handleAbnormalToPreview () {
      this.abnormalVisible = false
      this.previewVisible = true
      this.abnormalShow = true
      this.previewData = {
        deviceId: this.warningData.deviceId
      }
    },
    // 点击返回异常视屏或者预警的时候关闭视频弹窗
    handlePreviewBackToAbnormal () {
      this.abnormalVisible = true
      this.previewVisible = false
      this.abnormalShow = false
      this.warnShow = true
    }
  }
}
</script>
<style lang="less" scoped>
.video-test-contain {
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

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
    flex-basis: auto;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
