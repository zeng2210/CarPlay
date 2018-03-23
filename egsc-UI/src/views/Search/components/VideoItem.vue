<template>
  <!-- 搜索摄像头 搜索结果的每个item -->
  <div class="result-item">
    <div class="result-item-left">
      <div>
        <img :src="item.cameraImageUrl">
      </div>
    </div>
    <div class="result-item-right">
      <el-row>
        <el-col :span="24" class="key">&nbsp;</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">名称</el-col>
        <el-col :span="17" :offset="1" class="value">{{item.cameraName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">所在地点</el-col>
        <el-col :span="17" :offset="1" class="value">{{item.cameraLocation}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">运行状态</el-col>
        <el-col :span="17" :offset="1" class="value">
          <span v-show="item.cameraStatus === 'true'">正常</span>
          <span v-show="item.cameraStatus === 'false'">不正常</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="key">&nbsp;</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="key">&nbsp;</el-col>
      </el-row>
    </div>
    <div class="camera" @click="showVideo(item)">
      <img :src="camera" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'video-item',
  props: {
    item: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      camera: require('../assets/images/itemcamera.png')
    }
  },
  methods: {
    showVideo (item) {
      console.log(JSON.stringify(item))
      if (item.cameraStatus === 'false') {
        this.$message.warning('该设备已停用')
        return
      }
      if ((typeof item.subDeviceId) === 'undefined') {
        this.$message.warning('该设备注册异常或设备已被移除')
        return
      }
      // if (isNull(item, 'longitude') || isNull(item, 'latitude')) {
      //   this.$message.error('没有获取到该设备的位置')
      //   return
      // }
      this.$emit('onShowVideoBtnClick', item.subDeviceId)
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/css/index";
</style>
