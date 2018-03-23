import moment from 'moment'
import { getParkWarnCountData, getVideoWarningInfoData, getGuardWarnCountData, getPartolAbnorCountData } from '../apis/parkwarn'
const parkWarnCode = {
  data () {
    return {
      isWarnOut: false,
      warnData: {},
      personData: {},
      warningData: {},
      previewData: {},
      isPersonWarn: false,
      previewVisible: false,
      warningVisible: false,
      warnShow: false,
      dissWarnSucc: false,
      // personoffVisible: false,
      // personoffData: {},
      partolabnorVisible: false
    }
  },
  mounted: function () {
    // 初始化预警总数
    getParkWarnCountData().then(res => {
      if (res.data.code === '200') {
        let warnCount = res.data.data
        this.updateWarmingNum(['gardenPerimeterNum', warnCount[0].warningCount])
        this.updateWarmingNum(['lakePerimeterNum', warnCount[1].warningCount])
        this.updateWarmingNum(['gardenActionNum', warnCount[2].warningCount])
        this.updateWarmingNum(['channelOccupiedNum', warnCount[3].warningCount])
        // this.updateWarmingNum(['personnelOffserviceNum', warnCount[4].warningCount])
      }
    }).catch(err => {
      console.log(err)
    })
    // 初始化保安异常条数
    getGuardWarnCountData().then(res => {
      if (res.data.code === '00000') {
        let guardWarnCount = res.data.data
        this.updateWarmingNum(['securityGuardNum', guardWarnCount])
      }
    }).catch(err => {
      console.log(err)
    })
    // 初始化巡更设备异常条数
    getPartolAbnorCountData().then(res => {
      if (res.data.code === '00000') {
        let guardWarnCount = res.data.data
        this.updateWarmingNum(['patrolDeviceNum', guardWarnCount])
      }
    }).catch(err => {
      console.log(err)
    })
    // 园区预警点击事件
    this.$root.Bus.$on('onGardenPerimeterWarming', () => {
      this.parkSafeDialog('onGardenPerimeterWarming')
    })
    this.$root.Bus.$on('onLakePerimeterWarming', () => {
      this.parkSafeDialog('onLakePerimeterWarming')
    })
    this.$root.Bus.$on('onGardenActionWarming', () => {
      this.parkSafeDialog('onGardenActionWarming')
    })
    this.$root.Bus.$on('onChannelOccupiedWarming', () => {
      this.parkSafeDialog('onChannelOccupiedWarming')
    })
    // 人员管理
    this.$root.Bus.$on('onSecurityGuardWarming', () => {
      this.personManaDialog('onSecurityGuardWarming')
    })
    // this.$root.Bus.$on('onCleanerWarming', () => {
    //   this.personManaDialog('onCleanerWarming')
    // })
    // this.$root.Bus.$on('onPersonnelOffserviceWarning', () => {
    //   this.personoffDialog('onPersonnelOffserviceWarning')
    // })
    // 巡更设备
    this.$root.Bus.$on('onPatrolDeviceWarming', () => {
      this.partolabnorDialog('onPatrolDeviceWarming')
    })
  },
  methods: {
    // 园区安全预警弹窗
    parkSafeDialog (type) {
      this.isWarnOut = true
      this.warnData.type = type
      this.warnData.clickTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    // 人员管理预警弹窗
    personManaDialog (person) {
      this.isPersonWarn = true
      this.personData.type = person
      this.personData.clickTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      if (person === 'onSecurityGuardWarming') {
        this.personData.title = '保安异常信息'
      }
      // if (person === 'onPersonnelOffserviceWarning') {
      //   this.personData.title = '人员脱岗'
      // }
    },
    // 显示预警弹窗
    warningDialogOn (warningData) {
      this.warningData = warningData
      this.warnDialog()
    },
    // 显示地图视频弹窗
    showOcxDialog (pointInfo) {
      if (String(pointInfo.markerStatus).slice(-2) === '01') {
        this.previewData = { deviceId: pointInfo.deviceId }
        this.previewVisible = true
      } else {
        this.warningData.deviceId = pointInfo.deviceId
        this.warningDialogOut()
      }
    },
    // 预警弹窗
    warnDialog () {
      this.warningVisible = true
    },
    // 关闭预警弹窗
    handleWarnClose () {
      this.warningVisible = false
    },
    // 关闭使用预览弹窗
    handleVideoClose () {
      this.previewVisible = false
      this.warnShow = false
    },
    // 返回预警弹窗
    handlePreviewBackToWarn () {
      this.previewVisible = false
      this.warningVisible = true
    },
    // 返回视频预览
    handleWarnToPreview () {
      this.previewData = { deviceId: this.warningData.deviceId }
      this.warningVisible = false
      this.previewVisible = true
      this.warnShow = true
    },
    // 园区预警解除预警成功后关闭预警对话框
    dismissWarnSuccShow () {
      this.warningVisible = false   // 关闭预警窗口
      if (this.isWarnOut) {
        this.$refs.warnList.monitordisWarnSucc()   // 园区预警显示解除预警成功
      } else {
        this.dissWarnSucc = true
        var timer = setTimeout(() => {
          this.dissWarnSucc = false
          clearTimeout(timer)
        }, 1000)
      }
    },
    // 地图点击预警后
    warningDialogOut () {
      getVideoWarningInfoData({
        cameraCode: this.warningData.deviceId
      }).then(res => {
        if (res.data.data) {
          var data = res.data.data
          this.warningData.eventName = data.startTime + '  ' + data.content
          this.warningData.imgUrl = data.imgUrl
          this.warningData.startTime = data.startTime
          this.warningData.endTime = data.endTime
          this.warningData.deviceIp = data.deviceIp
          this.warningData.devicePort = data.devicePort
          this.warningData.selectArry = [data]
          if (data.subEventType === 1) {
            this.warningData.titleName = '园区周界预警'
          }
          if (data.subEventType === 2) {
            this.warningData.titleName = '人工湖周界预警'
          }
          if (data.subEventType === 3) {
            this.warningData.titleName = '人员徘徊预警'
          }
          if (data.subEventType === 4) {
            this.warningData.titleName = '通道占用预警'
          }
          this.warnDialog()
        } else {
          this.$message({
            message: '该预警可能已被解除，请刷新重试',
            type: 'warning',
            center: true
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 人员异常弹窗
    // personoffDialog () {
    //   this.personoffVisible = true
    //   this.personoffData.clickTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    // },
    partolabnorDialog () {
      this.partolabnorVisible = true
    },
    // 派遣成功更新保安状态
    updateGuardStatus () {
      this.$refs.warnList.updateGuardStatus()
    }
  },
  watch: {
    websocketMessage (data) {
      let dataInfo
      if (data.type === '25019' || data.type === '25020') { // 25022人员徘徊  25306违停   25311脱岗
        dataInfo = JSON.parse(data.info)
        if (dataInfo.subEventType === 1) {
          this.updateWarmingNum(['gardenPerimeterNum', dataInfo.warningCount])
        }
        if (dataInfo.subEventType === 2) {
          this.updateWarmingNum(['lakePerimeterNum', dataInfo.warningCount])
        }
      }
      if (data.type === '25022') {
        dataInfo = JSON.parse(data.info)
        if (dataInfo.subEventType === 3) {
          this.updateWarmingNum(['gardenActionNum', dataInfo.warningCount])
        }
      }
      if (data.type === '20119' || data.type === '25020' || data.type === '25306') {
        dataInfo = JSON.parse(data.info)
        if (dataInfo.subEventType === 4) {
          this.updateWarmingNum(['channelOccupiedNum', dataInfo.warningCount])
        }
      }
      // if (data.type === '25311') {
      //   if (JSON.parse(data.info).subEventType === 5) {
      //     this.updateWarmingNum(['personnelOffserviceNum', JSON.parse(data.info).warningCount])
      //   }
      // }
      // 保安异常数量更新
      if (data.type === '70020') {
        dataInfo = JSON.parse(data.info)
        this.updateWarmingNum(['securityGuardNum', dataInfo])
      }
      // 设备异常数量更新
      if (data.type === '70021') {
        dataInfo = JSON.parse(data.info)
        this.updateWarmingNum(['patrolDeviceNum', dataInfo])
      }
    }
  }
}
export default parkWarnCode
