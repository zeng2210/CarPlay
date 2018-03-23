import { getEntranceWarnCount } from '../apis/accesswarn'
import moment from 'moment'
const accessWarnCode = {
  data() {
    return {
      isPopOut: false,
      alarmData: {}
    }
  },
  mounted: function () {
    // 初次加载 查询门禁预警数量
    getEntranceWarnCount(1).then(res => {
      this.updateWarmingNum(['entranceDeviceNum', res.data])
    }).catch(err => {
      console.warn(err)
    })
    // 初次加载 查询人行道闸预警数量
    getEntranceWarnCount(2).then(res => {
      this.updateWarmingNum(['sidewalkDeviceNum', res.data])
    }).catch(err => {
      console.warn(err)
    })
    this.$root.Bus.$on('onEntranceDeviceWarming', () => {
      this.accessWarnDialog('onEntranceDeviceWarming')
    })
    this.$root.Bus.$on('onSidewalkDeviceWarming', () => {
      console.log('点击人行道闸按钮')
      this.accessWarnDialog('onSidewalkDeviceWarming')
    })
  },
  methods: {
    accessWarnDialog(type) {
      this.isPopOut = true
      this.alarmData.type = type
      this.alarmData.clickTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  watch: {

  }
}
export default accessWarnCode
