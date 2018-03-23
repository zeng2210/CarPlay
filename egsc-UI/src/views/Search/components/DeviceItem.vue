<template>
  <!-- 搜索设备 搜索结果的每个item -->
  <div class="result-item">
    <div class="result-item-left">
      <div>
        <img :src="defaultImage">
      </div>
    </div>
    <div class="result-item-right">
      <el-row>
        <el-col :span="6" class="key">设备</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.patrolEqpmNum}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">设备状态</el-col>
        <el-col :span="17" :offset="1"  class="value">
          <span v-show="item.patrolEqpmStatus == 'true'"><span class="fc-g">启用</span></span>
          <span v-show="item.patrolEqpmStatus == 'false'"><span class="fc-r">关闭</span></span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">巡逻保安</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.patrolEqpmSecurity}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="key">手机号</el-col>
        <el-col :span="17" :offset="1"  class="value">{{item.tel}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div v-show="item.patrolEqpmStatus == 'true'">
            <button class="opt-btn bg-green" @click="openLocationDialog(item)">查看设备位置</button>
            <button class="opt-btn bg-blue" style="margin-left: 20px" @click="openMsgDialog(item)">发送消息</button>
          </div>
          <div v-show="item.patrolEqpmStatus == 'false'">
            <button class="opt-btn bg-green" disabled>查看设备位置</button>
            <button class="opt-btn bg-blue" style="margin-left: 20px" disabled>发送消息</button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { isBlank } from '../assets/js/index'
export default {
  name: 'device-item',
  props: {
    item: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      defaultImage: require('../assets/images/device.png')
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
        this.$message.error('请传入子设备id')
        return
      }
      this.$emit('onShowVideoBtnClick', item.subDeviceId)
    },
    openMsgDialog(item) {
      this.$emit('onShowMsgBtnClick', item.deviceId)
    },
    openLocationDialog(item) {
      if (isBlank(item, 'longitude') || isBlank(item, 'latitude')) {
        this.$message.error('未获取到设备的坐标')
        return
      }
      this.$emit('onShowLocationBtnClick', item)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/css/index";
.opt-btn {
  margin-top: 10px;
  border-radius:2px;
  height:28px;
  line-height: 28px;
  padding-left: 10px;
  padding-right: 10px;
  font-size:12px;
  color:#ffffff;
  border: none;

  &:hover {
    cursor: pointer;
  }
}
.bg-green {
  background-color:#0d912c;
}
.bg-blue {
  background-color:#144ea1;
}
.bg-green:disabled {
  background-color: #8FCA9D;
  color: #ECECEC;
  cursor: not-allowed;
}
.bg-blue:disabled {
  background-color: #98ABC7;
  color: #ECECEC;
  cursor: not-allowed;
}
</style>
