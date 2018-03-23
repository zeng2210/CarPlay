<template>
  <div class="dialog-box" v-loading="loading">
    <div class="broadcast-head" v-html="title"></div>
    <div class="broadcast-content">
      <div class="content-btn">
        <el-checkbox @change="onAllArea" v-model="checked">广播全部区域</el-checkbox>
      </div>
      <div class="vol">
        <span @click="onVolchange"><img src="../images/u3463.png" alt="" v-show="isVolShow">
          <img src="../images/u3300.svg" alt="" v-show="!isVolShow"></span>
        <input type="range" min="0" max="19" class="cast-range" @mouseup="onControlvol" v-model="volValue">
        <span class="vol-value">{{volValue}}</span>
      </div>
    </div>
    <div class="broadcast-footer">
      <div class="foot-head">{{status}}</div>
      <div class="foot-content">
        <span>{{songlist.songname}}</span>
      </div>
      <div class="foot-levl clearfix">
        <img src="../images/u3454.png" alt="" @click="onChangeUpBroadcast(1)">
        <span @click="onStatuschange"><img src="../images/u3450.png" alt="" v-if="isStatusShow">
          <img src="../images/u3452.png" alt="" v-else>
        </span>
        <img src="../images/u3456.png" alt="" class="foot-right" @click="onChangeUpBroadcast(2)">
      </div>
    </div>
  </div>
</template>
<script>
import { postBroadcastVolumeData, postGetBroadcast, playBroadcast, changePlayState } from '../apis/index'
/* eslint-disable */
export default {
  props: ['volumeValue', 'deviceId'],
  data () {
    return {
      status: '暂未播放',
      isStatusShow: true,
      isVolShow: true,
      volValue: 10,
      songlist: {
        songname: ''
      },
      allPlayArea: 2,
      checked: '',
      title: '广播',
      operationplay: 1,
      loading: false,
      sessionId: '',
      mute: 1,
      requestBroadcast: null,
      deviceIdSpare: ''
    }
  },
  created: function () {
    this.volValue = this.volumeValue
    this.getBroadcast()
    this.clearBroadcast()
    this.setBroadcast()
  },
  methods: {
    /**
     * @description 计时器每隔10秒请求一次正在播放的歌曲
     */
    setBroadcast () {
      this.requestBroadcast = setInterval(() => { this.getBroadcast('alltime') }, 10000)
    },
    /**
     * @description 清除计时器
     */
    clearBroadcast () {
      clearInterval(this.requestBroadcast)
    },
    /**
     * @description 查询音量以及正在播放歌曲
     */
    getBroadcast (isallTime) {
      if (!isallTime) {
        this.loading = true
      }
      var getBroadcastData = this.deviceIdSpare ? this.deviceIdSpare : this.deviceId
      postGetBroadcast({ deviceId: getBroadcastData }).then(
        res => {
          if (res.data.code == '00000') {
            this.songlist.songname = res.data.data.audioclipName
            this.volValue = res.data.data.vol
            if (this.volValue == 0) {
              this.isVolShow = false
            } else {
              this.isVolShow = true
            }
            this.mute = this.volValue
            this.sessionId = res.data.data.sessionId
            if (res.data.data.status == 1) {
              this.isStatusShow = false
              this.status = '正在播放'
            } else {
              this.isStatusShow = true
              this.status = '暂未播放'
            }
            if (!res.data.data.audioclipName) {
              this.status = '暂无播放任务'
            }
          } else {
            this.status = '暂无播放任务'
            this.songlist.songname = ''
          }
          this.loading = false
        }
      ).catch(err => {
        this.loading = false
        console.warn(err)
      })
    },
    /**
     * @description 播放
     */
    onStatuschange () {
      this.operationplay = this.isStatusShow ? 2 : 1
      this.loading = true
      var playBroadcastMsg = {
        sessionId: this.sessionId,
        operation: this.operationplay,
        deviceId: this.deviceId,
        allPlayArea: this.allPlayArea
      }
      playBroadcast(playBroadcastMsg).then(
        res => {
          if (res.data.code == '00000' && res.data.data.audioclipName) {
            this.songlist.songname = res.data.data.audioclipName
            this.sessionId = res.data.data.sessionId
            if (res.data.data.status == '1') {
              this.isStatusShow = false
              this.status = '正在播放'
            } else if (res.data.data.status == '2') {
              this.isStatusShow = true
              this.status = '暂未播放'
            }
          } else {
            this.songlist.songname = ''
            this.isStatusShow = true
            this.status = '暂无播放任务'
          }
          this.loading = false
        }
      ).catch(err => {
        this.songlist.songname = ''
        this.isStatusShow = true
        this.loading = false
        this.status = '暂无播放任务'
        console.warn(err)
      })
    },
    /**
     * @description 静音与否
     */
    onVolchange () {
      this.loading = true
      this.isVolShow = !this.isVolShow
      var changeVolume = {}
      if (!this.isVolShow) {
        this.volValue = 0
        changeVolume = {
          deviceId: this.deviceId,
          vol: 0,
          allPlayArea: this.allPlayArea
        }
      } else {
        this.volValue = this.mute
        changeVolume = {
          deviceId: this.deviceId,
          vol: this.mute,
          allPlayArea: this.allPlayArea
        }
      }
      postBroadcastVolumeData(changeVolume).then(
        res => {
          this.loading = false
        }).catch(err => {
          this.loading = false
          console.warn(err)
        })
    },
    /**
     * @description 调节音量
     */
    onControlvol () {
      this.loading = true
      if (this.volValue == 0) {
        this.isVolShow = false
      } else {
        this.isVolShow = true
      }
      // 更新后台广播音量值
      var changeVolume = {
        deviceId: this.deviceId,
        vol: this.volValue,
        allPlayArea: this.allPlayArea
      }
      this.mute = this.volValue
      postBroadcastVolumeData(changeVolume).then(
        res => {
          this.loading = false
        }
      ).catch(err => {
        this.loading = false
        console.warn(err)
      })
    },
    /**
     * @description 广播全部区域
     */
    onAllArea () {
      this.allPlayArea = this.checked ? 1 : 2
    },
    /**
     * @description 上一首下一首切换
     * @param {num} 1或2 判断点击的是上一首或下一首
     */
    onChangeUpBroadcast (param) {
      if (this.status == '暂无播放任务' || this.status == '暂未播放') {
        return
      }
      this.loading = true
      var changePlayStateMsg = {
        sessionId: this.sessionId,
        operation: param,
        deviceId: this.deviceId,
        allPlayArea: this.allPlayArea
      }
      changePlayState(changePlayStateMsg).then(
        res => {
          if (res.data.code == '00000' && res.data.data.audioclipName) {
            this.songlist.songname = res.data.data.audioclipName
            this.sessionId = res.data.data.sessionId
          } else {
            this.songlist.songname = ''
            this.isStatusShow = true
            this.status = '暂无播放任务'
          }
          this.loading = false
        }
      ).catch(err => {
        this.songlist.songname = ''
        this.isStatusShow = true
        this.status = '暂无播放任务'
        this.loading = false
        console.warn(err)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.clearfix {
  zoom: 1;
  &:after {
    clear: both;
    content: ".";
    display: block;
    height: 0;
    width: 0;
    visibility: hidden;
  }
}
.dialog-box {
  position: relative;
}
.broadcast-head {
  text-align: center;
  padding: 16px;
  margin: 0;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
}
.broadcast-content {
  text-align: center;
  position: relative;
  height: 150px;
  background: white;
  .content-btn {
    margin-top: 60px;
  }
}
.vol {
  padding: 30px;
  height: 160px;
  img {
    width: 24px;
    height: 24px;
  }
  .cast-range {
    margin-left: 5px;
    width: 150px;
    padding: 0;
    height: 21px;
  }
  .vol-value {
    display: inline-block;
    margin-left: 2px;
    height: 20px;
    line-height: 26px;
    vertical-align: top;
  }
}
.broadcast-footer {
  text-align: center;
  position: relative;
  height: 200px;
  background: rgba(242, 242, 242, 1);
  .foot-head {
    height: 36px;
    border-bottom: 1px solid #aaa;
    line-height: 36px;
  }
  .foot-content {
    height: 50px;
    line-height: 50px;
    span {
      display: inline-block;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .foot-levl {
    height: 100px;
    position: relative;
    padding: 20px;
    img {
      width: 38px;
      height: 38px;
    }
    .foot-right {
      float: right;
    }
    & > img {
      float: left;
      display: block;
      height: 38px;
      width: 38px;
    }
    & > span {
      position: absolute;
      left: 50%;
      width: 38px;
      margin-left: -19px;
      height: 38px;
    }
  }
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
</style>
