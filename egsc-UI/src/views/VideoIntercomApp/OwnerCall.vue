<template>
  <div class="owner-call-contain">
    <ajb-dialog :visible.sync="display" class="call call-record" :modal=false :lock-scroll="true" :close-on-click-modal="false" @close="onDialogClose" :videoIntercomOwnerRecordData="videoIntercomOwnerRecordData" size="tiny" width="950px" center>
      <!-- <div class='recored-box' v-tableLoadMore='tableLoadMore' v-loading='tableloading'> -->
      <div slot="title">{{videoIntercomData.dialogTitle+'('+allOwnerCallNum+')'}}</div>
      <!-- dialog body begin -->
      <div class='recored-box' v-loading='tableloading'>
        <transition name="el-fade-in">
          <div>
            <div v-if='callRecord.length>0'>
              <el-row :gutter='20' v-for='item in callRecord' :key='item.callId'>
                <el-col :span='16'>
                  <div class='content'>
                    <span class='spe' v-if="item.inviteTime">{{item.inviteTime|formatDate}}</span>分来自
                    <span class='spe'>{{item.deviceAddress}}</span>的呼叫
                  </div>
                </el-col>
                <el-col :span='8'>
                  <el-button type='success' class='btn btn-jt' size='small' v-if='item.status === "invite"' @click='videoPlay(item.callId,item.deviceCode,item.videoIp,item.videoPort,item.audioIp,item.audioPort,item.localAudioCatchPort,item.receiveDevVoiceIp,item.receiveDevVoicePort,item.receiveCltVoiceIp,item.receiveCltVoicePort,item.receiveDevVideoIp,item.receiveDevVideoPort,item.allSdp,item.devSdp)'>立即接听</el-button>
                  <el-button type='primary' class='btn btn-hb' size='small' v-if='item.answer==="0" && item.status === "bye"' @click='recall(item.callId,item.deviceCode,item.from,item.to,item.devSdp,item.devSdp)'>回拨电话</el-button>
                  <el-button type='info' class='btn btn-unanswer' size='small' v-if='(item.answer==="1" && item.status === "bye")||(item.answer==="1" && item.status === "accept") ' disabled>已接听</el-button>
                </el-col>
              </el-row>
            </div>
            <EmptyIcon v-else></EmptyIcon>
          </div>
        </transition>
        <transition name="el-fade-in">
          <div v-if="showOcxException" style="height:100%;width:100%;position:absolute;top:60px;left:0px;bottom:0px;">
            <DownloadOcx></DownloadOcx>
          </div>
        </transition>
        <object style="display:none" type='application/x-vlc-plugin' ref='PlayOcx' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...'>
          <param name='wmode' value='transparent'>
        </object>
      </div>
      <!-- dialog body end -->
      <span slot="footer" class="dialog-footer"></span>
    </ajb-dialog>
    <!--通话详情modal-->
    <ajb-dialog class="call video-detail" :visible.sync='videoDialogVisible' size='tiny' width='950px' :before-close="beforeDialogClose" :show-close="false" :modal="true" :close-on-click-modal="false" :lock-scroll="true" center>
      <div slot="title">业主呼叫</div>
      <!--dialog body begin-->
      <div class='hb-box' v-show='hbVideoDialog'>
        <div class='content'>
          <div v-if="!showOcxException">
            <img class='microphone-icon' src='./assets/images/u3422.png' />
            <div class='demonstration'>正在回拨中...</div>
          </div>
          <transition v-else name="el-fade-in">
            <DownloadOcx></DownloadOcx>
          </transition>
        </div>
      </div>
      <div class='video-detail-box' v-show='!hbVideoDialog'>
        <div v-if="!showOcxException">
          <div class='play-ocx'>
            <img class='microphone-icon' src='./assets/images/u3422.png' />
          </div>
          <div class='dem demonstration' style='text-align:center;' v-show="!isHangUpTextShow">
            <span><img src='./assets/images/u687.gif' class='icon' />正在通话中&nbsp;{{countTime}}</span>
          </div>
          <div class='dem demonstration' style='text-align:center;' v-show="isHangUpTextShow">
            <span><img src='./assets/images/u687.gif' class='icon' />通话已结束</span>
          </div>
        </div>
        <div v-else>
          <transition name="el-fade-in">
            <DownloadOcx></DownloadOcx>
          </transition>
        </div>
      </div>
      <!-- dialog body end -->
      <span slot='footer' class='dialog-footer'>
        <div class='block' :disabled="!isHangUpClickable">
          <el-button @click='hangupVideo($index)' round class='hangup'></el-button>
          <span class='demonstration'>挂断</span>
        </div>
      </span>
    </ajb-dialog>
  </div>
</template>
<script>
import DownloadOcx from './DownloadOcx'
import EmptyIcon from '../../components/EmptyIcon'
import store from '@/stores/index'
import { mapActions } from 'vuex'
// 时间格式化方法
import { formatDate } from './assets/js/date.js'
import {
  callinConfirm,
  getCallRecordData,
  offHook,
  onHook,
  callout,
  calloutConfirm,
  ringing,
  callLogStatusUpdate
} from './apis/index'
export default {
  name: 'AJBVideoDialog',
  components: {
    DownloadOcx,
    EmptyIcon
  },
  props: {
    open: {
      require: true,
      type: Boolean,
      default: false
    },
    videoIntercomData: {
      type: Object,
      validator (param) {
        // 用来验证传入的数据对象
        return param
      }
    },
    videoIntercomOwnerRecordData: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      display: this.open,
      timer: '', // 计时器
      countTime: '',
      videoDialogVisible: false, // 视频音频窗口是否显示
      hbVideoDialog: false, // 回拨
      showCallingMicrophone: false,
      showModal: false, // dialog是否需要遮罩层
      showRecoredBox: true, // 回拨记录列表是否显示
      isHangUpTextShow: false,
      showOcxException: false,
      callRecord: [], // 呼叫记录
      tableloading: false, // 表格正在加载
      isScrollIntoZero: false, // 监听是否进入距离底部距离为0的区域
      originCallId: '',   // 回拨原始的callId
      callId: '', // 记录当前接通的呼叫id
      deviceCode: '', // 记录当前接通的呼叫的设备编码
      localAudioCatchPort: '', // 记录当前回拨的音频采集端口
      receiveCltVoiceIp: '', // 视频组件接收可视对讲音频流的IP
      receiveCltVoicePort: '', // 视频组件接收可视对讲音频流的端口
      receiveDevVoiceIp: '', // 视频组件接收设备端音频流的IP
      receiveDevVoicePort: '', // 视频组件接收设备端音频流端口
      localIp: '', // 本机ip
      audioIp: '', // 本地ip
      audioPort: 0, // 本地音频接收端口
      videoIp: '', // 本地ip
      videoPort: 0, // 本地视频接收端口
      audioSdp: '', // 音频sdp
      videoSdp: '', // 视频sdp
      allSdp: '', // 包含视频、音频信息的sdp
      isHangUpClickable: false, // 挂断按钮是否可以点击
      isRecallSuccess: false,   // 回拨是否成功
      isAcceptSuccess: false,  // 回拨是否接听

      callTypes: [1], // PC与设备的呼叫
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      pageNum: 0, // 当前页码
      pageSize: 6,
      answer: '', // 0为未接听
      queryMode: 'normal',
      direction: '2', // 呼入
      isNext: true, // 是否还有下一页数据
      callNum: 0 // 业主呼叫正在呼叫数量
    }
  },
  created () {
    clearInterval(this.timer)
    this.initDataList()
  },
  // 当前页面渲染完毕，但不会保证子组件被渲染
  mounted () {
    // 判断插件是否异常
    let that = this
    setTimeout(() => {
      try {
        that.$refs.PlayOcx.GetLocalIP()
      } catch (e) {
        console.log(e)
        console.log(that.$refs.PlayOcx)
        that.showOcxException = true
      }
    }, 100)
    clearInterval(this.timer)
    // beforeunload，监听页面刷新或者关闭
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    // 必须加入这句话，否则弹窗初次出现，但没有实时记录
    this.videoIntercomOwnerRecordData.forEach((item, index) => {
      this.onSocketMessage(item)
      this.videoIntercomOwnerRecordData.splice(index, 1)
    })
  },
  destroyed () {
    // 移除beforeunload，停止监听页面刷新或者关闭
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  methods: {
    ...mapActions(['updateWarmingNum', 'updateAllCallNum', 'updateOnCallNum']),
    initDataList () {
      // 获取当天未接听数
      let startTime = new Date()
      this.startTime = formatDate(startTime, 'yyyy-MM-dd') + ' 00:00:00'
      this.endTime = formatDate(startTime, 'yyyy-MM-dd') + ' 23:59:59'
      this.pageNum = 0
      // 加载最多6条呼叫记录
      this.getCallRecordData(
        this.callTypes,
        this.startTime,
        this.endTime,
        this.pageNum,
        this.pageSize,
        this.answer,
        this.queryMode,
        this.direction
      )
      this.tableloading = false
    },
    /**
     * @description 监听websocket实时推送消息
     * @param {object} data
     */
    onSocketMessage (data) {
      var that = this
      let callId = data.callId
      let status = data.status
      let direction = data.direction
      let sdp = data.sdp
      // 初始化业主呼叫未接听数
      this.callNum = this.onOwnerCallNum
      console.log('onSocketMessage: ' + data)
      if (status === 'invite') {
        // 将最新的呼叫插入到记录最前
        this.insertPreCallRecord(callId, data)
        console.log(this.callRecord)
        // 正在呼入或回拨，不响应呼叫
        // if (!this.callId) {
        try {
          setTimeout(function () {
            // 调用OCX控件方法获取ip和空闲端口 播放音视频
            let audioIp = that.$refs.PlayOcx.GetLocalIP()
            let audioPort = that.$refs.PlayOcx.GetFreePort()
            let videoIp = that.$refs.PlayOcx.GetLocalIP()
            let videoPort = that.$refs.PlayOcx.GetFreePort()
            let localAudioCatchPort = that.$refs.PlayOcx.GetFreePort() // 本地音频采集的端口
            console.log(
              '本地this.audioIp:' +
              audioIp +
              'this.audioPort: ' +
              audioPort +
              'this.videoIp: ' +
              videoIp +
              'this.videoPort: ' +
              videoPort
            )
            that.callinConfirm(
              callId,
              audioIp,
              audioPort,
              localAudioCatchPort,
              videoIp,
              videoPort,
              sdp
            )
          }, 100)
        } catch (e) {
          console.log('onSocketMessage:' + e)
          this.showOcxException = true
        }
        // }
      } else if (status === 'ringing') {
        // 外拨振铃
        console.log('外拨振铃返回,callId:' + callId)
        console.log('' + sdp)
        this.isRecallSuccess = true
        // 30秒后不接听
        let that = this
        setTimeout(function () {
          if (!that.isAcceptSuccess) {
            that.recallHangupVideo()
            // 更新未接听回拨记录状态
            that.updateCallRecordStatus('bye', callId)
            that.initDialog(callId)
          }
        }, 30000)
      } else if (status === 'accept') {
        // 接听
        this.isAcceptSuccess = true
        // 更新未接听记录状态
        this.updateCallRecordStatus('accept', callId)
        // 回拨成功
        if (direction === 'call_out') {
          // 正在回拨过渡隐藏
          this.hbVideoDialog = false
          this.countTimeFun()
          try {
            console.log('呼出接听返回,callId:' + callId)
            this.callNum--
            this.updateWarming()
            // 外拨接听，创建音频双向通道
            console.log(
              this.localAudioCatchPort,
              this.audioPort,
              this.receiveCltVoicePort,
              this.receiveCltVoiceIp
            )
            // 音频播放 （本地播放端口、远程服务器端口、远程服务器IP）
            this.$refs.PlayOcx.OpenAudio(
              this.audioPort,
              this.receiveCltVoicePort,
              this.receiveCltVoiceIp
            )
            // 更新回拨记录状态
            this.callLogStatusUpdate(this.originCallId)
          } catch (e) {
            console.log('call_out accept 出错~~~')
          }
        }
      } else if (status === 'bye') {
        if (direction === 'call_out') {
          // 更新未接听记录状态
          this.updateCallRecordStatus(status, callId)
        } else if (direction === 'call_in') {
          // 更新未接听记录状态
          this.updateCallRecordStatus(status, callId)
        }
        // 挂机
        this.callNum--
        this.updateWarming()
        if (this.callId === callId) {
          // 挂机成功，关闭视频、音频双向通道
          this.$refs.PlayOcx.CloseAudio() // 音频挂断方法
          this.$refs.PlayOcx.CloseVideo() // 视频挂断方法
          // 通话已结束文本出现
          this.isHangUpTextShow = true
          let that = this
          setTimeout(() => {
            that.initDialog(callId)
          }, 500)
          console.log('挂机返回,callId:' + callId)
        }
      }
    },
    /**
     * @description pc端响应门口机呼叫调用接口(pc端接收到门口机的呼叫信息后，调用的接口 )
     * @param {String} callId 呼叫id
     * @param {String} audioIp 本地音频播放ip
     * @param {Number} audioPort 本地音频播放端口
     * @param {Number} localAudioCatchPort 本地音频采集端口
     * @param {String} audioIp 本地视频播放ip
     * @param {Number} videoPort 本地视频播放端口
     * @param {String} sdp 设备sdp信息
     */
    callinConfirm (
      callId,
      audioIp,
      audioPort,
      localAudioCatchPort,
      videoIp,
      videoPort,
      devSdp
    ) {
      this.callId = callId
      callinConfirm(callId, audioIp, audioPort, videoIp, videoPort)
        // callinConfirm(callId, '172.16.10.110', '5000', '172.16.10.110', '5001')
        .then(result => {
          console.log(' pc端响应门口机呼叫调用接口:')
          console.log(result)
          if (result.success) {
            let data = result.data
            // OCX处理发送给设备的sdp信息，告诉设备该往哪里发送音频数据
            let allSdp = this.$refs.PlayOcx.GetSdp(
              devSdp,
              data.receiveDevVoiceIp,
              data.receiveDevVideoPort,
              data.receiveDevVoicePort
            )
            this.allSdp = allSdp
            console.log('this.allSdp' + allSdp)
            // 振铃
            ringing(callId, allSdp)
              .then(result => {
                console.log(result)
                if (result.success) {
                  let tempRecord = []
                  this.callRecord.forEach(item => {
                    let tempItem = item
                    if (callId === item.callId) {
                      tempItem.videoIp = videoIp
                      tempItem.videoPort = videoPort
                      tempItem.audioIp = audioIp
                      tempItem.audioPort = audioPort
                      tempItem.localAudioCatchPort = localAudioCatchPort
                      tempItem.receiveDevVoiceIp = data.receiveDevVoiceIp // 视频组件接收设备端音频流的IP
                      tempItem.receiveDevVoicePort = data.receiveDevVoicePort // 视频组件接收设备端音频流端口
                      tempItem.receiveCltVoicePort = data.receiveCltVoicePort
                      tempItem.receiveCltVoiceIp = data.receiveCltVoiceIp
                      tempItem.receiveDevVideoIp = data.receiveDevVideoIp
                      tempItem.receiveDevVideoPort = data.receiveDevVideoPort
                      tempItem.allSdp = allSdp
                      tempItem.devSdp = devSdp
                    }
                    tempRecord.push(tempItem)
                  })
                  this.callRecord = tempRecord
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            console.log(result.errMsg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @description 接听呼叫
     * @param {String} callId 呼叫id
     * @param {String} sdp 设备sdp信息
     * @param {String} deviceCode
     */
    videoPlay (
      callId,
      deviceCode,
      videoIp,
      videoPort,
      audioIp,
      audioPort,
      localAudioCatchPort,
      receiveDevVoiceIp,
      receiveDevVoicePort,
      receiveCltVoiceIp,
      receiveCltVoicePort,
      receiveDevVideoIp,
      receiveDevVideoPort,
      allSdp,
      devSdp
    ) {
      // 记住当前接听的callId、deviceCode，用于开门，挂机
      // let that = this
      this.callId = callId
      console.log('接听callId：' + this.callId)
      this.deviceCode = deviceCode
      this.showRecoredBox = false
      this.isHangUpTextShow = false
      // 视频窗口显示
      this.videoDialogVisible = true
      this.hbVideoDialog = true
      // 判断用户是否采用IE11打开
      if (!/Trident\/7\./.test(navigator.userAgent)) {
        return false
      }
      // PC可视对讲应用点提机接口
      offHook(this.callId, allSdp)
        .then(result => {
          console.log('PC可视对讲应用点提机接口:')
          console.log(result)
          if (!result.success) {
            return false
          }
          this.hbVideoDialog = false
          this.countTimeFun()
          // 挂断按钮可用
          this.isHangUpClickable = true
          this.updateCallRecordStatus('accept', this.callId)
          //  提机成功，创建音频双向通道
          console.log(
            audioPort,
            receiveCltVoicePort,
            receiveCltVoiceIp
          )
          // 播放音频
          this.$refs.PlayOcx.OpenAudio(
            audioPort,
            receiveCltVoicePort,
            receiveCltVoiceIp
          )
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @description 被动呼叫挂断，音频或视频结束并停止接收视频或音频流
     * @param {String} callId 呼叫id
     */
    hangupVideo () {
      // debugger
      // 通话已结束文本出现
      this.isHangUpTextShow = true
      // 挂机成功，关闭视频、音频双向通道
      this.$refs.PlayOcx.CloseAudio() // 音频挂断方法
      this.$refs.PlayOcx.CloseVideo() // 视频挂断方法
      let that = this
      setTimeout(() => {
        that.initDialog(that.callId)
      }, 200)
      console.log('挂机callId:' + this.callId)
      // PC可视对讲应用点挂机接口
      onHook(this.callId)
        .then(result => {
          console.log('PC可视对讲应用点挂机接口:')
          console.log(result)
          if (result.success) {
            this.updateCallRecordStatus('accept', this.callId)
            // 更新业主呼叫预警数量
            this.callNum--
            this.updateWarming()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @description 回拨
     * @param {String} callId 呼叫id
     * @param {String} sdp ocx生成的sdp信息
     * @param {String} deviceCode 设备编号
     */
    recall (callId, deviceCode, from, to, devSdp) {
      this.isHangUpTextShow = false
      this.originCallId = callId
      console.log('回拨：' + callId, deviceCode, from, to, devSdp)
      // 20 character ID (base=10)
      this.callId = this.getuuid(20, 10) // 生成随机的callId
      // 将原始callid替换成回拨的callid
      let tempRecord = []
      this.callRecord.forEach((item, index) => {
        if (item.callId === callId) {
          let tempItem = item
          tempItem.callId = this.callId
          tempRecord.push(tempItem)
        } else {
          tempRecord.push(item)
        }
      })
      this.showRecoredBox = false
      this.videoDialogVisible = true
      this.hbVideoDialog = true // 正在回拨过渡显示
      let that = this
      try {
        // 10秒后不振铃，自动退出
        setTimeout(function () {
          if (!that.isRecallSuccess) {
            that.recallHangupVideo()
          }
        }, 10000)
        // 调用OCX控件方法获取本地ip和空闲端口
        console.log(that.$refs.PlayOcx)
        that.audioIp = that.$refs.PlayOcx.GetLocalIP()
        that.audioPort = that.$refs.PlayOcx.GetFreePort() // 本地音频播放端口
        that.videoPort = that.$refs.PlayOcx.GetFreePort()
        that.localAudioCatchPort = that.$refs.PlayOcx.GetFreePort() // 本地音频采集的端口
        console.log('获取本机，创建本机空闲端口')
        console.log(
          'this.callId:' + that.callId,
          'this.audioIp:' + that.audioIp,
          'audioPort:' + that.audioPort,
          'this.localAudioCatchPort:' + that.localAudioCatchPort
        )
        // 呼出
        callout(that.callId, deviceCode, to, from, that.audioIp, that.audioPort)
          .then(result => {
            console.log('')
            console.log(that.callId)
            console.log('PC 未接呼叫回拨:\n 回拨callid:' + that.callId)
            console.log(result)
            // 回拨成功
            if (result.success) {
              let data = result.data
              console.log('回拨成功')
              console.log(data)
              that.receiveCltVoiceIp = data.reClientVoiceip // 视频组件接收可视对讲音频流的IP
              that.receiveCltVoicePort = data.reClientVoicePort // 视频组件接收可视对讲音频流的端口
              that.receiveDevVoiceIp = data.reDevVoiceip // 视频组件接收设备端音频流的IP
              that.receiveDevVoicePort = data.reDevVoicePort // 视频组件接收设备端音频流端口
              // OCX处理发送给设备的sdp信息，告诉设备该往哪里发送音频数据
              that.allSdp = that.$refs.PlayOcx.GetSdp(
                devSdp,
                that.receiveDevVoiceIp,
                that.videoPort,
                that.receiveDevVoicePort
              )
              console.log('allSdp' + that.allSdp)
              that.calloutConfirm(that.callId, that.allSdp)
            } else {
            }
          })
          .catch(error => {
            console.log('回拨出错')
            console.log(error)
          })
      } catch (e) {
        console.log(e)
        this.$message({
          message: '回拨响应出错',
          type: 'warning',
          center: true
        })
      }
    },
    /**
     * @description 可视对讲应用返回门口机音频的SDP信息接口
     * @param {String} callId 呼叫id
     * @param {String} sdp ocx生成的sdp信息
     * @param {String} deviceCode 设备编号
     */
    calloutConfirm (callId, allSdp) {
      // 可视对讲应用外拨、回拨时，需要发送音频的SDP信息给门口机
      calloutConfirm(callId, allSdp)
        .then(result => {
          console.log('业主回拨/外拨确认:')
          console.log(result)
        })
        .catch(error => {
          console.log('回拨响应出错')
          console.log(error)
          this.$message({
            message: '回拨响应出错',
            type: 'warning',
            center: true
          })
          let that = this
          // 10秒后不振铃，自动退出
          setTimeout(() => {
            if (!that.isRecallSuccess) {
              that.recallHangupVideo()
            }
          }, 10000)
        })
    },
    /**
     * @description 回拨挂断，音频或视频结束并停止接收视频或音频流,与被动呼叫的区别在于回拨挂断不需要讲正在回拨数量-1
     */
    recallHangupVideo () {
      // 通话已结束文本出现
      this.isHangUpTextShow = true
      // 挂机成功，关闭视频、音频双向通道
      this.$refs.PlayOcx.CloseAudio() // 音频挂断方法
      this.$refs.PlayOcx.CloseVideo() // 视频挂断方法
      let that = this
      setTimeout(() => {
        that.initDialog(that.callId)
      }, 200)
      console.log('挂机callId:' + this.callId)
      // PC可视对讲应用点挂机接口
      onHook(this.callId)
        .then(result => {
          console.log('PC可视对讲应用点挂机接口:')
          console.log(result)
          if (result.success) {
            this.updateCallRecordStatus('bye', this.callId)
            this.updateWarming()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @description 更新回拨状态
     * @param {String} callId 呼叫id
     */
    callLogStatusUpdate (callId) {
      callLogStatusUpdate(callId)
        .then(result => {
          console.log('更新回拨状态:')
          console.log(result)
        }).catch(error => {
          console.log('更新回拨状态错误')
          console.log(error)
        })
    },
    //  接听dialog弹窗关闭事件
    beforeDialogClose () {
      this.$confirm('确认结束通话？')
        .then(_ => {
          this.hangupVideo()
          // 挂机成功，关闭视频、音频双向通道
          this.$refs.PlayOcx.CloseAudio() // 音频挂断方法
          this.$refs.PlayOcx.CloseVideo() // 视频挂断方法
        })
        .catch(_ => { })
    },
    /**
     * @description 初始化通话详情dialog
     * @param {String} callId 呼叫id
     */
    initDialog (callId) {
      clearInterval(this.timer)
      // 重新初始化全局变量
      this.countTime = ''
      this.showRecoredBox = true
      this.videoDialogVisible = false // videoDialog不显示
      this.callId = ''
      this.originCallId = ''  // 回拨记录原始的callid
      this.deviceCode = ''
      this.localIp = '' // 记录当前回拨的音频ip
      this.localAudioCatchPort = 0 // 记录当前回拨的音频采集端口
      this.receiveCltVoiceIp = '' // 视频组件接收 web端音频流的IP
      this.receiveCltVoicePort = 0 // 视频组件接收 web端音频流的端口
      this.receiveDevVoiceIp = '' // 视频组件接收 设备端音频流的IP
      this.receiveDevVoicePort = 0 // 视频组件接收 设备端音频流端口
      this.receiveDevVideoIp = '' // 视频组件接收设备端视频流的IP
      this.receiveDevVideoPort = 0 // 视频组件接收设备端视频流端口
      this.audioIp = '' // 本地ip
      this.audioPort = 0 // 本地音频接收端口
      this.videoIp = '' // 本地ip
      this.videoPort = 0 // 本地视频接收端口
      this.audioSdp = '' // 音频sdp
      this.videoSdp = '' // 视频sdp
      this.isAcceptSuccess = false
      this.isRecallSuccess = false
    },
    /**
     * @description  列表dialog弹窗关闭事件
     */
    onDialogClose () {
      console.log('弹窗关闭')
      let args = []
      this.callRecord.forEach(item => {
        if (item.status === 'invite') {
          args.push(item)
        }
      })
      // 调用homepage.vue的方法
      this.$emit('onOwnerCallDialogClose', args)
      try {
        this.$refs.PlayOcx.CloseAudio() // 音频挂断方法
        this.$refs.PlayOcx.CloseVideo() // 视频挂断方法
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * @description  监听页面刷新或者关闭函数
     */
    beforeunloadHandler (e) {
      // 更新vuex变量的状态
      this.updateAllCallNum(['allOwnerCallNum', 0])
      this.updateOnCallNum(['onOwnerCallNum', 0])
      try {
        this.$refs.PlayOcx.CloseAudio() // 音频挂断方法
        this.$refs.PlayOcx.CloseVideo() // 视频挂断方法
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * @description  无限加载
     */
    tableLoadMore () {
      console.log('el-table无限加载')
      let that = this
      let tableScroll = document.querySelector('.recored-box')
      console.log(tableScroll)
      tableScroll.addEventListener('scroll', function () {
        let sign = 0
        const scrollDistance =
          this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance <= sign && !that.isScrollIntoZero) {
          that.isScrollIntoZero = true
          if (that.isNext) {
            for (let i = 0; i < 3 && that.isNext; i++) {
              that.getCallRecordData(
                that.callTypes,
                that.startTime,
                that.endTime,
                that.pageNum,
                that.pageSize,
                that.answer,
                that.queryMode,
                that.direction
              )
            }
            that.tableloading = false
            that.isScrollIntoZero = false
          }
        }
      })
    },
    /**
     * @description 获取设备与pc端呼叫记录
     * @param {String} callTypes 呼叫类型
     * @param {String} startTime 开始时间
     * @param {String} endTime 结束时间
     * @param {String} pageNum 页码
     * @param {String} pageSize 每页记录条数
     * @param {String} answer 是否接听
     * @param {String} queryMode 查询模式
     * @param {String} direction 呼叫方向（呼入、呼出）
     */
    getCallRecordData (
      callTypes,
      startTime,
      endTime,
      pageNum,
      pageSize,
      answer,
      queryMode,
      direction
    ) {
      console.log('this.pageNum' + this.pageNum)
      this.pageNum++
      getCallRecordData(
        callTypes,
        startTime,
        endTime,
        this.pageNum,
        pageSize,
        answer,
        queryMode,
        direction
      )
        .then(result => {
          console.log(result)
          if (result) {
            if (!result.success) {
              // 失败
              return false
            }
            let data = result.data
            // 更新未处理业主呼叫数量
            console.log('this.callNum' + this.callNum)
            if (this.pageNum === 1) {
              this.tableLoadMore()
            }
            if (data.pageData.length) {
              data.pageData.forEach(element => {
                this.callRecord.push(element)
              })
              this.isNext = true
            } else {
              this.isNext = false
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @description 获取设备与pc端呼叫记录
     * @param {Number'} len 生成uuid的位数
     * @param {String} radix 进制
     */
    getuuid (len, radix) {
      let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
        ''
      )
      let uuid = []
      let i = 0
      radix = radix || chars.length

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
      } else {
        // rfc4122, version 4 form
        var r
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16)
            uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      console.log(
        uuid
          .join('')
          .split('-')
          .join('')
      )
      return uuid.join('')
    },
    /**
    * @description 计时器函数
    */
    countTimeFun () {
      var minutes = 0
      var seconds = 0
      if (this.videoDialogVisible) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          seconds++
          if (seconds >= 60) {
            seconds = 0
            minutes += 1
          }
          this.countTime =
            (minutes >= 10 ? minutes : '0' + minutes) +
            ':' +
            (seconds >= 10 ? seconds : '0' + seconds)
        }, 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    /**
    * @description 更新预警数量
    */
    updateWarming () {
      this.updateOnCallNum(['onOwnerCallNum', this.callNum])
      let that = this
      setTimeout(() => {
        that.$emit('getAllCallRecordData', [1], 'allOwnerCallNum')
        that.$emit('getCallRecordData', [1], 'ownerCallNum')
      }, 1500)
    },
    /**
    * @description 更新呼叫记录状态
    * @param {String} status 状态
    * @param {String} callId 呼叫id
    */
    updateCallRecordStatus (status, callId) {
      let tempRecord = [] // 用于临时保存未处理呼叫记录
      this.callRecord.forEach(item => {
        if (item.callId === callId) {
          let tempItem = item
          if (status === 'accept') {
            tempItem.answer = '1' // 已接听
            tempItem.status = 'accept'
            tempRecord.push(tempItem)
          } else if (status === 'bye') {
            let tempItemStatus = tempItem.status
            if (tempItemStatus === 'accept') {
              // 已接听
              tempItem.answer = '1' // 已接听
              tempItem.status = 'bye'
              tempRecord.push(tempItem)
            } else {
              // 未接听，更新状态
              tempItem.status = 'bye'
              tempItem.answer = '0'
              tempRecord.push(tempItem)
            }
          } else {
            tempItem.status = 'bye'
            tempItem.answer = '0'
            tempRecord.push(tempItem)
          }
        } else {
          tempRecord.push(item)
        }
      })
      this.callRecord = tempRecord
      console.log('updateCallRecordStatus this.callRecord:')
      console.log(this.callRecord)
    },
    /**
    * @description 将最新的记录插入到呼叫记录最前面，保证时间倒序排列
    * @param {String} callId 呼叫id
    * @param {Object} data 呼叫数据
    */
    insertPreCallRecord (callId, data) {
      this.callRecord.forEach(item => {
        if (item.callId === callId) {
          return false
        }
      })
      if (this.callRecord.length > 0) {
        this.callRecord.splice(0, 0, data)
      } else {
        this.callRecord.push(data)
      }
      console.log('ownercall:insertPreCallRecord' + this.callRecord)
    },
    /**
     * @description 获取可视对讲设备与pc端呼叫记录
     * @param {String} callTypes 呼叫类型
     * @param {Object} param 需要更新的呼叫vuex变量名称
     */
    getAllCallRecordData (callTypes, param) {
      console.log('getAllCallRecordData:' + param)
      let time = new Date()
      let startTime = formatDate(time, 'yyyy-MM-dd') + ' 00:00:00'
      let endTime = formatDate(time, 'yyyy-MM-dd') + ' 23:59:59'
      let pageNum = 1
      let pageSize = 6
      let answer = ''
      let queryMode = 'normal'
      let direction = '2'
      // 初始化用于临时保存正在呼叫记录数量的变量
      this.ownerCallNum = this.onOwnerCallNum
      this.cellGateCallNum = this.onCellGateCallNum
      getCallRecordData(
        callTypes,
        startTime,
        endTime,
        pageNum,
        pageSize,
        answer,
        queryMode,
        direction
      )
        .then(result => {
          console.log(result)
          if (result) {
            if (!result.success) {
              // 失败
              return false
            }
            console.log('getCallRecord')
            console.log('this.' + param + this[param])
            console.log('this.onOwnerCallNum' + this.onOwnerCallNum)
            let warmingNum = 0
            if (param === 'allOwnerCallNum') {
              warmingNum = result.data.totalRows + this.onOwnerCallNum
            } else if (param === 'allCellGateCallNum') {
              warmingNum = result.data.totalRows + this.onOwnerCallNum
            }
            this.updateAllCallNum([param, warmingNum])
            console.log('this.' + param + this[param])
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  filters: {
    formatDate (time) {
      let date = ''
      if (time) {
        date = new Date(parseInt(time))
      } else {
        date = new Date()
      }
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  computed: {
    allOwnerCallNum () {
      return this.$store.state.mutations.allOwnerCallNum
    },
    onOwnerCallNum () {
      return this.$store.state.mutations.onOwnerCallNum
    }
  },
  watch: {
    open () {
      this.display = this.open
    },
    display () {
      this.$emit('update:open', this.display)
    },
    videoIntercomOwnerRecordData () {
      this.videoIntercomOwnerRecordData.forEach((item, index) => {
        this.onSocketMessage(item)
        this.videoIntercomOwnerRecordData.splice(index, 1)
      })
    }
  },
  store
}
</script>
<style lang="less">
@import url('./assets/css/videointercomdialog.less');
</style>
