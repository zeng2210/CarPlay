<template>
  <!-- 搜索车 搜索结果的每个item -->
  <div class="result-item">
    <div class="result-item-left">
      <div>
        <img :src="item.vehicleIMGUrl">
      </div>
    </div>
    <div class="result-item-right">
      <el-row>
        <el-col :span="6" class="key">车牌</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.vehicleNum}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">车位</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.parkingNum}}
          <span v-show="item.parkingType && item.parkingType !== ''">（{{item.parkingType}}）</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">车主</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.vehicleOwnerName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">手机号</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.vehicleOwnerTel}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">入场时间</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.inTime | carInTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">费用</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.parkingFee}}</el-col>
      </el-row>
    </div>
    <div class="camera" @click="showVideo(item)" v-show="item.subDeviceId">
      <img :src="camera">
    </div>
  </div>
</template>
<script>
import { formatCarInTime } from '../assets/js/index'
export default {
  name: 'car-item',
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
      // console.log(JSON.stringify(item))
      // if (item.cameraStatus === 'false') {
      //   this.$message.warning('该设备已停用')
      //   return
      // }
      if ((typeof item.subDeviceId) === 'undefined' || item.subDeviceId === '') {
        this.$message.warning('该车位的摄像头未安装或已被移除')
        return
      }
      this.$emit('onShowVideoBtnClick', item.subDeviceId)
    }
  },
  filters: {
    carInTime(txt) {
      return formatCarInTime(txt)
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/css/index";
</style>
