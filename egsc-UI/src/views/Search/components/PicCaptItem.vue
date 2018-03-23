<template>
  <!-- 以图搜图 抓拍库的每个item -->
  <div class="result-item">
    <div class="result-item-left">
      <div>
        <img :src="item.imageURL">
      </div>
    </div>
    <div class="result-item-right">
      <el-row>
        <el-col :span="24" class="key">&nbsp;</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">相似度</el-col>
        <el-col :span="17" :offset="1" class="value">{{item.imageSimilarity}}%</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">拍摄时间</el-col>
        <el-col :span="17" :offset="1" class="value">{{item.triggerTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">拍摄地点</el-col>
        <el-col :span="17" :offset="1" class="value">{{item.cameraLocation}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="key">&nbsp;</el-col>
      </el-row>
    </div>
    <div class="camera" @click="playVideo(item)">
      <img :src="camera" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'pic-capt-item',
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
    playVideo (item) {
      if ((typeof item.subDeviceId) === 'undefined') {
        this.$message.error('请传入子设备id')
        return
      }
      this.$emit('onPlayVideoBtnClick', item)
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/css/index";
</style>
