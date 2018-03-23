<template>
  <el-container id="app">
    <div class="header">
      <el-header>
        <keep-alive>
          <home-header></home-header>
        </keep-alive>
      </el-header>
    </div>
    <div class="content" ref="mainContain">
      <router-view style="height: 100%"></router-view>
      <!-- 可视对讲组件 begin -->
      <!-- <div style="border:0px;width: 100%;height:100%;position:absolute;z-index:1;"> -->
      <CellGateCall ref="call" :videoIntercomData="videoIntercomData" :videoIntercomCellGateRecordData="videoIntercomCellGateRecordData" @onCellGateCallDialogClose="onCellGateCallDialogClose" @getAllCallRecordData="getAllCallRecordData" @getCallRecordData="getCallRecordData" v-if="showAJBCellGateDialog" :open.sync="showAJBCellGateDialog"></CellGateCall>
      <OwnerCall ref="call" :videoIntercomData="videoIntercomData" :videoIntercomOwnerRecordData="videoIntercomOwnerRecordData" @onOwnerCallDialogClose="onOwnerCallDialogClose" @getAllCallRecordData="getAllCallRecordData" @getCallRecordData="getCallRecordData" v-if="showAJBOwnerDialog" :open.sync="showAJBOwnerDialog"></OwnerCall>
      <div v-show="showAjbOcx">
        <object type='application/x-vlc-plugin' ref='PlayOcx_2' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...'>
          <param name='wmode' value='transparent'>
        </object>
      </div>
      <!-- </div> -->
      <!-- 可视对讲组件 end -->
    </div>
    <div class="footer">
      <keep-alive>
        <home-footer></home-footer>
      </keep-alive>
    </div>
  </el-container>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CellGateCall from '@/views/VideoIntercomApp/CellGateCall.vue'
import OwnerCall from '@/views/VideoIntercomApp/OwnerCall.vue'
import { getCallRecordData, ipList } from '@/views/VideoIntercomApp/apis/index'
import { mapActions } from 'vuex'
// 时间格式化方法
import { formatDate } from './assets/js/date.js'
import resize from './mixins/resize' // 增加resize mixin, 实现页面resize获取最新主容器高度
import { loadWebsocket } from '@/websocket/index'
import { getWebSocketUrl } from '@/assets/js/index'
export default {
  name: 'app',
  components: {
    HomeHeader: Header,
    HomeFooter: Footer,
    CellGateCall: CellGateCall,
    OwnerCall: OwnerCall
  },
  mixins: [resize],
  data () {
    return {
      msg: '这是首页的地图页面！请添加相应的功能',
      // 可视对讲
      showAJBCellGateDialog: false,
      showAJBOwnerDialog: false,
      // 传入自组件的类型类型 OwnerCall/CellGateCall 显示对应的信息框
      videoIntercomData: {},
      videoIntercomCellGateRecordData: [], // websocket推送的单元门呼叫
      videoIntercomOwnerRecordData: [], // websocket推送的业主呼叫
      showAjbOcx: false
    }
  },
  methods: {
    ...mapActions(['updateWarmingNum', 'updateAllCallNum', 'updateOnCallNum']),
    onWebsocketMessageReceived (data) {
      try {
        let subData = JSON.parse(data).data
        this.$store.state.mutations.websocketMessage = subData
        if (subData.type) {
          let type = subData.type
          console.log(type)
          if (type >= 40000 && type <= 49999) {
            // 可视对讲呼叫websocket消息
            // 初始化用于临时保存正在呼叫记录数量的变量
            this.ownerCallNum = this.onOwnerCallNum
            this.cellGateCallNum = this.onCellGateCallNum
            try {
              // 匹配当前的ip是否已添加到ip配置列表
              let localIp = this.$refs.PlayOcx_2.GetLocalIP()
              console.log('本地ip:' + localIp)
              ipList()
                .then(result => {
                  console.log(result)
                  if (result) {
                    if (!result.success) {
                      // 失败
                      return false
                    }
                    let ipArary = result.data
                    ipArary.forEach((item) => {
                      if (localIp === item) {
                        this.processWebsocketData(subData)
                      }
                    })
                  }
                })
                .catch(error => {
                  console.log(error)
                })
            } catch (e) {
              // 未安装插件
              let info = JSON.parse(data.info)
              let status = info.status
              let dialogType = info.from.slice(0, 2)
              // let callId = info.callId
              if (status === 'invite') {
                if (dialogType === '04') {
                  this.$root.Bus.$emit('onOwnerCallWarming')
                } else if (dialogType === '02' || dialogType === '03') {
                  this.$root.Bus.$emit('onCellGateCallWarming')
                }
              } else if (status === 'bye') {

              }
            }
          }
        }
      } catch (e) {
        console.warn(e)
      }
    },
    /**
     * @description 处理可视对讲呼叫消息
     * @param {Object} data
     */
    processWebsocketData (data) {
      console.log('processWebsocketData:' + data.info)
      let info = JSON.parse(data.info)
      let status = info.status
      let dialogType = info.from.slice(0, 2)
      let callId = info.callId
      // 呼叫号码 02  03 开头是单元门  04开头是业主呼叫
      if (status === 'invite') {
        // 调起单元门或业主弹窗
        if (dialogType === '04') {
          this.videoIntercomOwnerRecordData.push(info)
          this.updateOnCallNum(['onOwnerCallNum', this.onOwnerCallNum + 1])
          this.updateAllCallNum([
            'allOwnerCallNum',
            this.onOwnerCallNum + this.allOwnerCallNum
          ])
          if (!this.showAJBCellGateDialog) {
            this.$root.Bus.$emit('onOwnerCallWarming')
          }
        } else if (dialogType === '02' || dialogType === '03') {
          this.videoIntercomCellGateRecordData.push(info)
          this.updateOnCallNum(['onCellGateCallNum', this.onCellGateCallNum + 1])
          this.updateAllCallNum([
            'allCellGateCallNum',
            this.onCellGateCallNum + this.allCellGateCallNum
          ])
          if (!this.showAJBOwnerDialog) {
            this.$root.Bus.$emit('onCellGateCallWarming')
          }
        }
      } else if (status === 'bye') {
        // 更新右侧预警红点呼叫数量
        let that = this
        setTimeout(() => {
          let callTypes = []
          callTypes = [2, 3, 4]
          that.getCallRecordData(callTypes, 'cellGateCallNum')
          callTypes = [1]
          that.getCallRecordData(callTypes, 'ownerCallNum')
        }, 2000)
        if (dialogType === '04') {
          if (this.showAJBOwnerDialog) {
            // 弹窗正在打开，只需要调用子组件的方法
            console.log('app.vue test' + this.$refs)
            this.$nextTick(() => {
              try {
                this.$refs.call.onSocketMessage(info)
              } catch (e) {
                console.log(e)
              }
            })
          } else {
            this.videoIntercomOwnerRecordData.forEach((item, index) => {
              if (item.callId === callId) {
                this.videoIntercomOwnerRecordData.splice(index, 1)
                this.updateOnCallNum(['onOwnerCallNum', this.onOwnerCallNum - 1])
                this.updateAllCallNum([
                  'allOwnerCallNum',
                  this.onOwnerCallNum + this.allOwnerCallNum
                ])
              }
            })
          }
        } else if (dialogType === '02' || dialogType === '03') {
          if (this.showAJBCellGateDialog) {
            // 弹窗正在打开，只需要调用子组件的方法
            console.log('app.vue test' + this.$refs)
            this.$nextTick(() => {
              try {
                this.$refs.call.onSocketMessage(info)
              } catch (e) {
                console.log(e)
              }
            })
          } else {
            this.videoIntercomCellGateRecordData.forEach((item, index) => {
              if (item.callId === callId) {
                this.videoIntercomCellGateRecordData.splice(index, 1)
                this.updateOnCallNum(['onCellGateCallNum', this.onCellGateCallNum - 1])
                this.updateAllCallNum([
                  'allCellGateCallNum',
                  this.onCellGateCallNum + this.allCellGateCallNum
                ])
              }
            })
          }
        }
      } else {
        // 非呼叫、挂断websocket消息，只需要更新记录状态
        if (dialogType === '04') {
          if (this.showAJBOwnerDialog) {
            // 弹窗正在打开，只需要调用子组件的方法
            console.log('app.vue test' + this.$refs)
            this.$nextTick(() => {
              try {
                this.$refs.call.onSocketMessage(info)
              } catch (e) {
                console.log(e)
              }
            })
          } else {
            let tempRecord = this.videoIntercomOwnerRecordData
            this.videoIntercomOwnerRecordData.forEach(item => {
              let tempItem = item
              if (item.callId === callId) {
                tempItem.status = status
              }
            })
            this.videoIntercomOwnerRecordData = tempRecord
          }
        } else if (dialogType === '02' || dialogType === '03') {
          if (this.showAJBCellGateDialog) {
            // 弹窗正在打开，只需要调用子组件的方法
            this.$nextTick(() => {
              try {
                this.$refs.call.onSocketMessage(info)
              } catch (e) {
                console.log(e)
              }
            })
          } else {
            let tempRecord = this.videoIntercomCellGateRecordData
            this.videoIntercomCellGateRecordData.forEach(item => {
              let tempItem = item
              if (item.callId === callId) {
                tempItem.status = status
              }
            })
            this.videoIntercomCellGateRecordData = tempRecord
          }
        }
      }
    },
    /**
     * @description 获取当天可视对讲设备与pc端未接听的呼叫记录
     * @param {String} callTypes  呼叫类型
     * @param {String} warmingName 预警的vuex全局变量名称
     */
    getCallRecordData (callTypes, warmingName) {
      let time = new Date()
      let startTime = formatDate(time, 'yyyy-MM-dd') + ' 00:00:00'
      let endTime = formatDate(time, 'yyyy-MM-dd') + ' 23:59:59'
      let pageNum = 1
      let pageSize = 6
      let answer = 0
      let queryMode = 'normal'
      let direction = '2'
      // // 初始化用于临时保存正在呼叫记录数量的变量
      // this.ownerCallNum = this.onOwnerCallNum
      // this.cellGateCallNum = this.onCellGateCallNum
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
            // warmingName指预警名称
            console.log(
              'this.warmingNums[' +
              warmingName +
              ']' +
              this.warmingNums[warmingName]
            )
            let warmingNum = result.data.totalRows
            this.updateWarmingNum([warmingName, warmingNum])
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @description 单元门弹窗关闭回调
     * @param {Object} data  实时呼叫并未接听（状态为invite）的记录
     */
    onCellGateCallDialogClose (data) {
      this.showAJBCellGateDialog = false
      data.forEach(item => {
        this.videoIntercomCellGateRecordData.push(item)
      })
    },
    /**
     * @description 业主弹窗关闭回调
     * @param {Object} data  实时呼叫并未接听（状态为invite）的记录
     */
    onOwnerCallDialogClose (data) {
      this.showAJBOwnerDialog = false
      data.forEach(item => {
        this.videoIntercomOwnerRecordData.push(item)
      })
    },
    /**
     * @description 获取当天可视对讲设备与pc端所有的呼叫记录
     * @param {String} callTypes  呼叫类型
     * @param {String} param 预警的vuex全局变量名称
     */
    getAllCallRecordData (callTypes, param) {
      console.log('getAllCallRecordData' + param)
      let time = new Date()
      let startTime = formatDate(time, 'yyyy-MM-dd') + ' 00:00:00'
      let endTime = formatDate(time, 'yyyy-MM-dd') + ' 23:59:59'
      let pageNum = 1
      let pageSize = 6
      let answer = ''
      let queryMode = 'normal'
      let direction = '2'
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
            let warmingNum = 0
            if (param === 'allOwnerCallNum') {
              warmingNum = result.data.totalRows + this.onOwnerCallNum
            } else if (param === 'allCellGateCallNum') {
              warmingNum = result.data.totalRows + this.onCellGateCallNum
            }
            this.updateAllCallNum([param, warmingNum])
            console.log('this.' + param + this[param])
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @description 初次加载 查询预警部分可视对讲单元门呼叫与业主呼叫未处理数量
     */
    initVideoIntercomLog () {
      let callTypes = []
      callTypes = [2, 3, 4]
      this.getCallRecordData(callTypes, 'cellGateCallNum')
      callTypes = [1]
      this.getCallRecordData(callTypes, 'ownerCallNum')
      // 初始化弹窗中未接听数
      callTypes = [2, 3, 4]
      this.getAllCallRecordData(callTypes, 'allCellGateCallNum')
      callTypes = [1]
      this.getAllCallRecordData(callTypes, 'allOwnerCallNum')
    }
  },
  mounted: function () {
    // 启动 websocket
    let webSocketUrl = getWebSocketUrl()
    console.log('websocket prefix: ' + webSocketUrl)
    loadWebsocket(
      webSocketUrl + '/sockjs/readData',
      this.onWebsocketMessageReceived
    )
    // 初始化用于临时保存正在呼叫记录数量的变量
    this.ownerCallNum = this.onOwnerCallNum
    this.cellGateCallNum = this.onCellGateCallNum
    // 初次加载 查询预警部分可视对讲单元门呼叫与业主呼叫未处理数量
    this.initVideoIntercomLog()
    setInterval(() => {
      this.initVideoIntercomLog()
    }, 30000)
    this.$root.Bus.$on('onCellGateCallWarming', () => {
      console.log('点击单元门呼叫')
      this.showAJBCellGateDialog = true
      this.videoIntercomData.type = 'cellgatecall'
      // console.log(this.videoIntercomData.type)
      this.videoIntercomData.dialogTitle = '单元门呼叫'
    })
    this.$root.Bus.$on('onOwnerCallWarming', () => {
      console.log('点击业主呼叫')
      this.showAJBOwnerDialog = true
      this.videoIntercomData.type = 'ownercall'
      // console.log(this.videoIntercomData.type)
      this.videoIntercomData.dialogTitle = '业主呼叫'
    })
  },
  computed: {
    // websocketMessage () {
    //   return this.$store.getters.getWebsocketMessage
    // },
    warmingNums () {
      return this.$store.state.mutations.warmingNums
    },
    allCellGateCallNum () {
      return this.$store.state.mutations.allCellGateCallNum
    },
    allOwnerCallNum () {
      return this.$store.state.mutations.allOwnerCallNum
    },
    onCellGateCallNum () {
      return this.$store.state.mutations.onCellGateCallNum
    },
    onOwnerCallNum () {
      return this.$store.state.mutations.onOwnerCallNum
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './assets/css/animate.css';
/*@import '/static/css/font.css';*/
@import './assets/css/ui.css';
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
#app {
  /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
  /*font-family: PingFangSC-Medium;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-header {
  color: #333;
  text-align: center;
  line-height: 50px;
  height: 50px !important;
  padding: 0 !important;
  margin: 0 !important;
}

.content {
  flex: 1;
  overflow: auto;
}
.header {
  width: 100%;
  background-image: linear-gradient(-180deg, #ffffff 0%, #f1f4f6 100%);
  box-shadow: 0 1px 0 0 #d4d8dc;
  margin-bottom: 1px;
}
.footer {
  height: 100px;
  background-image: linear-gradient(-180deg, #ffffff 0%, #f5f9fb 100%);
}
.content {
  flex: 1;
  overflow: auto;
}
.header {
}
.footer {
  height: 100px;
}
</style>
