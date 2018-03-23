<template>
  <div>
    <el-dialog :visible.sync="open" @close="handleMonitorClose">
      <div v-if="warningData.data != null" class="warning-box">
        <h3>
          <span>{{warningData.titleName}}</span>
        </h3>
        <!-- 监控弹出框要显示的数据 -->
        <!-- 车位占用 -->
        <div v-if="warningData.type=='parkinglotoccupied'" class="warn-data">
          <div class="carinfo-main">
            {{timeFormat(warningData.data.occupiedTime)}}&nbsp;
            <span style="color: #FF0000;">{{warningData.data.parkSeatCode}}</span>车位被占用
          </div>
        </div>
        <!-- 临时车长时停放 -->
        <div v-else-if="warningData.type=='carexception'" class="warn-data">
          <div class="carinfo-main">
            <span style="color: #FF0000;">{{warningData.data.carNum}}已停放{{warningData.data.parkDays}}天</span>
          </div>
          <div>
            <div class="carinfo-span">
              <span class="carinfo-label">车位</span>
              <span class="carinfo-content">{{warningData.data.parkSeatCode}}</span>
            </div>
            <div class="carinfo-span">
              <span class="carinfo-label">车牌</span>
              <span class="carinfo-content">{{warningData.data.carNum}}</span>
            </div>
            <div class="carinfo-span">
              <span class="carinfo-label">车型</span>
              <span class="carinfo-content">{{warningData.data.carMark}}</span>
            </div>
          </div>
          <div>
            <div class="carinfo-span">
              <span class="carinfo-label">费用</span>
              <span class="carinfo-content">{{formatMoney(warningData.data.feeAmount)}}（{{warningData.data.parkDays}}天）</span>
            </div>
            <div class="carinfo-span">
              <span class="carinfo-label">入场时间</span>
              <span class="carinfo-content">{{timeFormat(warningData.data.inTime)}}</span>
            </div>
          </div>
        </div>
        <!-- 车位即将到期 -->
        <div v-else-if="warningData.type=='parkTimeEnd'" class="warn-data">
          <div class="carinfo-main">
            {{timeFormat(warningData.data.alarmTime)}}&nbsp;
            <span style="color: #FF0000;">{{warningData.data.parkSeatCode}}</span>车位{{warningData.data.remainingDay}}天后即将到期
          </div>
        </div>
        <!-- 车位欠费 -->
        <div v-else-if="warningData.type=='parkingArrears'" class="warn-data">
          <div class="carinfo-main">
            <span style="color: #FF0000;">{{warningData.data.parkSeatCode}}</span>车位{{arreaTimeFormat(warningData.data.startTime)}}至{{arreaTimeFormat(warningData.data.endTime)}}欠费，
            <span style="color: #FF0000;">共{{warningData.data.arrears}}元</span>
          </div>
          <div style="padding-top: 10px">
            <span class="carinfo-span">
              <span class="carinfo-label">车位</span>
              <span class="carinfo-content">{{warningData.data.parkSeatCode}}</span>
            </span>
            <span class="carinfo-span">
              <span class="carinfo-label">车牌</span>
              <span class="carinfo-content">{{warningData.data.carNo}}</span>
            </span>
            <span class="carinfo-span">
              <span class="carinfo-label">车主</span>
              <span class="carinfo-content">{{warningData.data.ownerName}}</span>
            </span>
            <span class="carinfo-span">
              <span class="carinfo-label">类型</span>
              <span class="carinfo-content">{{warningData.data.parkSeatTypeString}}</span>
            </span>
            <span class="carinfo-span">
              <span class="carinfo-label">费用</span>
              <span class="carinfo-content">{{formatMoney(warningData.data.payMoney)}}元/{{formatCharge(warningData.data.chargeType)}}</span>
            </span>
          </div>
        </div>
        <div class="warn-content">
          <div class="aside">
            <div class="ocx" v-show="warnOcxShow">
              <ocx-playback :deviceData="{devideId: warningData.data.equipId}" ref='warnOcx' style="display:none;"></ocx-playback>
            </div>
            <iframe src="about:blank" frameborder="0" class="ocx-iframe"></iframe>
            <i @click='handleVideoView' class='warn-imgup'>
              <img src="../images/imgup_icon.png" alt="">
            </i>
          </div>
          <div class="main">
            <img :src="warningData.data.pictureUrl" alt="没有图片">
            <!-- <img src="../images/warnpic.png" alt="" v-else>              -->
          </div>
        </div>
        <div>
          <el-button plain @click="sendMessage" class="self-btn-style leftbtn" :disabled="warningData.data.alarmState==0" v-if="warningData.type=='parkingArrears' || warningData.type=='parkTimeEnd'">发送短信通知车主</el-button>
          <el-button plain @click="dispatchPerson" class="self-btn-style leftbtn" :disabled="warningData.data.dispatchState==1" v-else>派遣保安</el-button>
          <el-button @click="showDismissDialog" class="self-btn-style rightbtn" v-if="warningData.data.alarmState==1">解除预警</el-button>
          <el-button type="info" disabled class="self-btn-style" v-else>解除预警</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 摄像头弹窗 -->
    <video-dialog :previewData="previewData" :open.sync="previewVisible" @close="handleVideoClose"></video-dialog>
    <!-- 派遣保安对话框 -->
    <gurdList :isdispatchShow="isdispatch" @closeGurd="closeGurdEvent"></gurdList>
    <!-- 解除预警对话框 -->
    <dismissWarn :isWarnShow="isWarnShow" :dissmissType="dissmissType" :dismissArray.sync="dismissArray" @closeWarn="closeWarnEvent" @closeParent="handleMonitorClose" @dismissWarnSucc="dismissWarnSucc"></dismissWarn>
    <!-- 发送短信结果提示 -->
    <transition>
      <p class="show-msg" v-show="isMsgVisible" v-html="tipsMsg"></p>
    </transition>
    <!-- 解除警告结果提示 -->
    <transition>
      <p class="show-msg" v-show="dismissResultVisible" v-html="dismissResult"></p>
    </transition>
  </div>
</template>
<script>
import GurdList from './components/GurdList.vue'
import DismissWarnDialog from './components/DismissWarnDialog.vue'
import ocxPlayback from '@/globalcomponents/warning_dialog/components/OcxPlayback.vue'
import { getDeviceByCameraData } from '@/globalcomponents/video_dialog/src/apis/index'
import { sendPhoneMsg } from './apis/index'
import { formatDate } from '@/views/VideoIntercomApp/assets/js/date.js'
export default {
  name: 'MonitorDialog',
  components: {
    gurdList: GurdList,
    ocxPlayback: ocxPlayback,
    dismissWarn: DismissWarnDialog
  },
  props: {
    monitorVisible: {
      require: true,
      type: Boolean,
      default: false
    },
    warningData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      isdispatch: false, // 显示派遣保安对话框
      isWarnShow: false, // 显示解除预警对话框
      dissmissType: '', // 预警类型
      dismissArray: [], // 解除预警的数组
      dismissResult: '解除警报成功', // 解除预警结果
      dismissResultVisible: false, // 显示解除警报结果
      tipsMsg: '', // 发送短信结果提示
      isMsgVisible: false, // 显示发送短信结果
      previewVisible: false, // 显示摄像头
      previewData: {}, // 摄像头数据
      warnOcxShow: true,
      ocxPlaybackShow: false,
      deviceData: {},
      open: this.monitorVisible
    }
  },
  methods: {
    // 监控视频放大
    handleVideoView () {
      this.previewVisible = true
      this.previewData = { deviceId: this.warningData.data.equipId }
    },
    // chrome时显示下载
    changeOcxPlaybackShow () {
      this.ocxPlaybackShow = false
    },
    // 发送短信
    sendMessage () {
      let that = this
      let msg = ''
      if (that.warningData.type === 'parkingArrears') {
        msg = '尊敬的业主，您的车位' + that.warningData.data.parkSeatCode + '已欠费' + that.warningData.data.arrears + '元，请及时缴费'
      } else if (that.warningData.type === 'parkTimeEnd') {
        msg = '尊敬的业主，您的车位' + that.warningData.data.parkSeatCode + '即将到期，请及时处理'
      }
      sendPhoneMsg(that.warningData.data.ownerPhone, msg).then(response => {
        console.log('response:' + response.code)
        if (response.code === '0') {
          that.tipsMsg = '短信发送成功'
        } else {
          that.tipsMsg = '短信发送失败'
        }
        that.isMsgVisible = true
        var timer = setTimeout(() => {
          that.isMsgVisible = false
          clearTimeout(timer)
        }, 1500)
      }).catch(error => {
        console.log(error)
        that.tipsMsg = '短信发送异常'
      })
    },
    // 1."派遣保安"--点击相关操作
    dispatchPerson () {
      this.isdispatch = true
    },
    closeGurdEvent () {
      this.isdispatch = false
    },
    // 解除警告
    showDismissDialog () {
      this.dismissArray = [this.warningData.data]
      this.dissmissType = this.warningData.type
      this.isWarnShow = true
    },
    // 获取解除警告结果
    dismissWarnSucc (result) {
      if (result === '0') {
        for (let dismiss of this.dismissArray) {
          dismiss.alarmState = 0
        }
        this.$emit('dismissRefresh')
      } else {
        this.dismissResult = '解除警报失败'
      }
      this.dismissResultVisible = true
      var timer = setTimeout(() => {
        this.dismissResultVisible = false
        clearTimeout(timer)
      }, 1000)
    },
    // 关闭警告
    closeWarnEvent () {
      this.isWarnShow = false
    },
    // 点击关闭按钮
    handleMonitorClose () {
      this.$emit('update:monitorVisible', false)
      this.$refs.warnOcx.releaseOcx()
    },
    // 关闭摄像头弹窗
    handleVideoClose () {
      this.previewVisible = false
    },
    // 时间格式化
    timeFormat: function (val) {
      let createTime = val
      let date = ''
      if (createTime) {
        date = new Date(parseInt(createTime))
      } else {
        date = new Date()
      }
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    },
    // 时间格式化
    vedioTimeFormat: function (eventTime) {
      let date = ''
      if (eventTime) {
        date = new Date(parseInt(eventTime))
      } else {
        date = new Date()
      }
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    // 车位欠费时间格式化
    arreaTimeFormat: function (val) {
      let createTime = val
      let date = ''
      if (createTime) {
        date = new Date(parseInt(createTime))
      } else {
        date = new Date()
      }
      return formatDate(date, 'yyyy-MM')
    },
    // 格式化金额
    formatMoney: function (val) {
      return val / 100
    },
    // 格式化缴费类型
    formatCharge: function (val) {
      if (val === 'MONTH') {
        return '月'
      } else if (val === 'THREE') {
        return '季'
      } else if (val === 'SIX') {
        return '半年'
      } else if (val === 'YEAR') {
        return '年'
      }
    }
  },
  mounted () {
  },
  watch: {
    monitorVisible () {
      this.open = this.monitorVisible
    },
    open () {
      this.$emit('update:monitorVisible', this.open)
      let startTimeStr = this.vedioTimeFormat(this.warningData.data.occupiedTime)
      this.$nextTick(() => {
        console.log(this.warningData)
        this.ocxPlaybackShow = true
        getDeviceByCameraData({ cameraCode: this.warningData.data.equipId }).then(res => {
          this.deviceData = {
            startTime: startTimeStr,
            endTime: startTimeStr,
            ip: res.data.deviceIP,
            port: Number(res.data.devicePort)
          }
          this.$refs.warnOcx.initOcx()
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>
<style lang='less' scoped>
.warning-box {
  padding-bottom: 50px;
  text-align: center;
  & > h3 {
    font-size: 24px;
    // padding: 40px;
    margin: 0;
    // border-bottom: 1px solid #ccc;
  }
  .warn-data {
    padding: 20px 40px;
    text-align: left;
    font-family: '微软雅黑';
    font-weight: 400;
    .carinfo-main {
      color: #333333;
      font-size: 18px;
      padding-top: 20px;
    }
    .carinfo-span {
      width: 200px;
      display: inline-block;
      font-size: 14px;
      .carinfo-label {
        color: #999999;
        padding-right: 10px;
      }
      .carinfo-content {
        color: #000000;
      }
    }
  }
  .warn-content {
    overflow: hidden;
    padding: 20px 40px 60px;
  }
  .aside,
  .main {
    width: 48%;
    height: 297px;
  }
  .aside {
    float: right;
  }
  .main {
    float: left;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
.el-button.self-btn-style {
  font-size: 18px;
  font-weight: 400;
  width: 180px;
  height: 60px;
  border-color: #13d5dc;
}
.el-button.leftbtn {
  color: #13d5dc;
}
.el-button.rightbtn {
  color: #ffffff;
  background-color: #13d5dc;
}
.el-button:disabled,
.el-button:disabled:hover {
  border-color: #f0f0f0;
}
.el-button.is-plain.selfBtnStyle {
  color: #409eff;
  background: #fff;
  border-color: #409eff;
}
.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: opacity 1s;
}
.v-leave-to {
  opacity: 0;
}
.warning-box {
  .aside {
    position: relative;
  }
  .ocx-iframe {
    display: block;
    cursor: pointer;
    position: absolute;
    width: 51px;
    height: 51px;
    right: 4%;
    bottom: 4%;
    background-color: #fff;
    z-index: 100;
  }
  .warn-imgup {
    display: block;
    cursor: pointer;
    position: absolute;
    width: 51px;
    height: 51px;
    right: 4%;
    bottom: 4%;
    background-color: #fff;
    border-radius: 50%;
    z-index: 101;
    & > img {
      margin-top: 10px;
    }
  }
}
.aside {
  .ocx {
    width: 100%;
    height: 100%;
  }
}
.show-msg {
  color: #fff;
  background: rgba(23, 23, 24, 0.9);
  border-radius: 2px;
  width: 300px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -20%);
  z-index: 2100;
}
</style>
