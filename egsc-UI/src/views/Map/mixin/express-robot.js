import icoRobot from '@/views/Map/assets/images/u923.png'
import icoRobotWarn from '@/assets/images/ico-local-abnormal.png'
const expressRobots = {
  data () {
    return {
      robotsList: []
    }
  },
  computed: {
    websocketMessage () {
      return this.$store.getters.getWebsocketMessage
    }
  },
  watch: {
    websocketMessage (data) {
      console.log(this.$store.state.mutations.websocketMessage)
      let msg = this.$store.state.mutations.websocketMessage
      if (typeof (msg.type) !== 'string') {
        return
      }
      if (msg.type >= 93001 && msg.type <= 94000) {
        console.log('robot')
        // let robotInfoList[j] = JSON.parse(msgObj.info)
        let robotInfoList = JSON.parse(this.$store.state.mutations.websocketMessage.info)
        for (let j = 0; j < robotInfoList.length; j++) {
          let robotPositionXY = this.mapObj.transfromWGSToBitMap(
            [robotInfoList[j].lon, robotInfoList[j].lat]
          )
          for (let i = 0; i < this.robotsList.length; i++) {
            if (robotInfoList[j].robot === this.robotsList[i].id) {
              this.robotsList[i].position = robotPositionXY
              this.robotsList[i].imgUrl = (robotInfoList[j].error === 'E00' ? icoRobot : icoRobotWarn)
              this.mapObj.updateMarker(this.robotsList[i])
              return
            }
          }
          let robotMarker = {}
          robotMarker.status = robotInfoList[j].status
          robotMarker.battery = robotInfoList[j].battery
          robotMarker.error = robotInfoList[j].error
          robotMarker.id = robotInfoList[j].robot
          robotMarker.position = robotPositionXY
          robotMarker.markerType = 'robot'
          robotMarker.markerName = robotInfoList[j].robot
          robotMarker.imgUrl = (robotInfoList[j].error === 'E00' ? icoRobot : icoRobotWarn)
          this.robotsList.push(robotMarker)
          this.mapObj.addMarker(robotMarker, { scale: 0.4 })
        }
      } else if (msg.type >= 94001 && msg.type <= 95000) {
        console.log('指路牌')
      }
    }
  }
}
export default expressRobots
