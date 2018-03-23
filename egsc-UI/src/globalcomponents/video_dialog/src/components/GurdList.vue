<template>
  <!-- 派遣保安对话框 -->
  <div class="dispath-dialog">
    <el-dialog :visible="isdispatchShow" class="guard-dialog" @close="closeEvent">
      <div class="dispatch">
        <iframe src="about:blank" frameborder="0"></iframe>
      </div>
      <h3>
        <span>选择派遣人员</span>
      </h3>
      <el-scrollbar :native="false" :noresize="true" ref="SecurityTreeScroll" class="parksafe-table">
        <el-table :show-header="false" :data="guardInfoList" stripe style="width: 100%">
          <EmptyIcon slot="empty"></EmptyIcon>
          <el-table-column prop="userName" align="left" class="user-name">
          </el-table-column>
          <el-table-column prop="statusDetail" class-name="selcol-style" align="left">
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="dispatchControl(scope.$index,$event)" v-if="scope.row.beasyNormal===0">派遣</el-button>
              <el-button size="mini" type="primary" v-html="scope.row.updateTime + ' 已派遣'" v-else class="hasDispatchBtn" disabled></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <transition>
        <p class="show-msg" v-show="isclickDispatch" v-html="tipsMsg"></p>
      </transition>
    </el-dialog>
  </div>
</template>
<script>
// import moment from 'moment'
import { getGuardlistData, postDispatchData } from '../apis/index'
import EmptyIcon from '@/components/EmptyIcon'
export default {
  name: 'gurdList',
  components: {
    EmptyIcon: EmptyIcon
  },
  props: {
    isdispatchShow: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      isShowList: false,
      isclickDispatch: false,
      tipsMsg: '',
      btnText: '派遣',
      guardInfoList: [],
      currentWarnData: {},
      previeDeviceId: '', // 视频预览页面摄像头deviceId
      userName: ''
    }
  },
  methods: {
    /** @params 当前预警事件数据 视频预览页面deviceId
     *@params 视频预览页面派遣
     */
    getGuardList (params, deviceId) {
      if (deviceId) {
        this.previeDeviceId = params
      } else {
        // 预警弹窗当前预警数据
        this.currentWarnData = params
      }
      getGuardlistData().then(res => {
        if (res.code === '00000') {
          this.guardInfoList = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // "派遣"--点击相关操作
    dispatchControl (index, e) {
      this.userName = this.guardInfoList[index].userName
      // 视频预览页面派遣保安
      if (this.previeDeviceId) {
        postDispatchData({
          deviceId: this.guardInfoList[index].deviceId,
          deviceCode: this.previeDeviceId
        }).then(res => {
          if (res.code === '00000') {
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        postDispatchData({
          deviceId: this.guardInfoList[index].deviceId,
          content: this.currentWarnData.startTime + '  ' + this.currentWarnData.content,
          deviceCode: this.currentWarnData.deviceCode,
          picUrl: this.currentWarnData.imgUrl,
          eventId: this.currentWarnData.eventLogId
        }).then(res => {
          if (res.code === '00000') {
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 点击派遣成功后显示
    // dispathSuccess (el, index) {
    //   el.style.backgroundColor = '#b0b1b2'
    //   el.innerHTML = moment(new Date()).format('MM-DD mm:ss') + ' 派遣'
    //   el.disabled = true
    //   this.tipsMsg = '已派遣' + this.guardInfoList[index].userName
    //   this.guardInfoList[index].statusDetail = '忙碌'
    //   this.isclickDispatch = true
    //   let timer = setTimeout(() => {
    //     this.isclickDispatch = false
    //     clearTimeout(timer)
    //   }, 1000)
    // },
    closeEvent () {
      this.$emit('closeGurd')
    }
  },
  computed: {
    websocketMessage () {
      return this.$store.getters.getWebsocketMessage
    }
  },
  watch: {
    // 接收websocket任务派遣成功消息
    websocketMessage (data) {
      if (data.type === '70010') {
        let dataInfo = JSON.parse(data.info)
        if (dataInfo.code === '0') {
          this.tipsMsg = '已派遣' + this.userName
          // 视频预览页面派遣成功
          if (this.previeDeviceId) {
            this.getGuardList(this.previeDeviceId, 'previewData')
          } else {
            // 预警页面派遣成功
            this.getGuardList(this.currentWarnData)
            // 更新预警列表页面保安状态
            this.$emit('updateGuardStatus')
          }
          this.isclickDispatch = true
          let timer = setTimeout(() => {
            this.isclickDispatch = false
            clearTimeout(timer)
          }, 1000)
        } else {
          this.$message({
            message: dataInfo.message,
            type: 'error',
            center: true
          })
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.dispath-dialog {
  .dispatch {
    iframe {
      width: 950px;
      height: 580px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
  .guard-dialog {
    h3 {
      padding: 0;
      margin: 0;
      text-align: center;
      background-image: linear-gradient(-180deg, #ffffff 0%, #f1f4f6 100%);
      box-shadow: 0 1px 0 0 #d9dce0;
      border-bottom: 1px solid #d9dce0;
      border-radius: 6px 6px 0 0;
      height: 60px;
      line-height: 60px;
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
    .el-button.is-plain.selfBtnStyle:hover,
    .el-button.is-plain.selfBtnStyle:focus {
      background: #ecf5ff;
      border-color: #b3d8ff;
    }
    .selcol-style div.cell,
    .selcol-style div.cell {
      color: #b0b1b2;
    }
    .el-table__row .el-button--primary {
      font-size: 14px;
      width: 150px;
      padding: 7px 10px;
      height: 36px;
      background-color: #0d912c;
      &:hover {
        background-color: #85ce61;
      }
    }
    .show-msg {
      color: #fff;
      background: rgba(23, 23, 24, 0.9);
      border-radius: 2px;
      width: 160px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -20%);
    }
    .el-scrollbar {
      height: 450px;
      .el-table {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        tr {
          height: 56px;
          line-height: 56px;
        }
      }
      .hasDispatchBtn {
        background: #b0b1b2;
        border: none;
      }
      .hasDispatchBtn:hover {
        background: #b0b1b2;
      }
    }
  }
}
</style>
<style lang='less'>
.dispath-dialog {
  .el-table__empty-block {
    height: 420px;
    overflow: hidden;
  }
  .el-scrollbar > .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .el-table::before {
    height: 0;
  }
  .el-dialog {
    width: 950px !important;
    height: 580px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0px;
  }
  div.cell {
    font-size: 16px;
  }
  div.cell:first-child {
    padding-left: 40px;
  }
}
</style>

