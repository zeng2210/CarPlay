<template>
  <div id="sidebar">
    <!-- <img src="../assets/images/u3080.png" style="float: right; padding: 0px 15px; width=28"> -->
    <div id="alert" class="text-left">
      <p>预警</p>
    </div>
    <div class="text item">
      <div id="grid">
        <div class="title text-left">
          <div class="left-icon">&nbsp;</div>
          <div>园区安防</div>
        </div>
        <div class="warming-item-container">
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onGardenPerimeterWarming', warmingNums.gardenPerimeterNum)">
            <div class="red-dot" v-html="warmingNums.gardenPerimeterNum" v-if="warmingNums.gardenPerimeterNum>0 && warmingNums.gardenPerimeterNum<100"></div>
            <div class="red-dot" v-if="warmingNums.gardenPerimeterNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/01_garden_perimeter.png" v-show="'onGardenPerimeterWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/01_garden_perimeter.png" v-show="'onGardenPerimeterWarming' === this.warnmingName">
          </div>
          <div class="grid-content-sidebar " @click="onWarmingItemClick('onLakePerimeterWarming', warmingNums.lakePerimeterNum)">
            <div class="red-dot" v-html="warmingNums.lakePerimeterNum" v-if="warmingNums.lakePerimeterNum>0 && warmingNums.lakePerimeterNum<100"></div>
            <div class="red-dot" v-if="warmingNums.lakePerimeterNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/02_lake_perimeter.png" v-show="'onLakePerimeterWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/02_lake_perimeter.png" v-show="'onLakePerimeterWarming' === this.warnmingName">
          </div>

          <div class="grid-content-sidebar " @click="onWarmingItemClick('onGardenActionWarming', warmingNums.gardenActionNum)">
            <div class="red-dot" v-html="warmingNums.gardenActionNum" v-if="warmingNums.gardenActionNum>0 && warmingNums.gardenActionNum<100"></div>
            <div class="red-dot" v-if="warmingNums.gardenActionNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/03_garden_action_new.png" v-show="'onGardenActionWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/03_garden_action_new.png" v-show="'onGardenActionWarming' === this.warnmingName">
          </div>

          <div class="grid-content-sidebar " @click="onWarmingItemClick('onChannelOccupiedWarming', warmingNums.channelOccupiedNum)">
            <div class="red-dot" v-html="warmingNums.channelOccupiedNum" v-if="warmingNums.channelOccupiedNum>0 && warmingNums.channelOccupiedNum<100"></div>
            <div class="red-dot" v-if="warmingNums.channelOccupiedNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/04_channel_occupied.png" v-show="'onChannelOccupiedWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/04_channel_occupied.png" v-show="'onChannelOccupiedWarming' === this.warnmingName">
          </div>
        </div>

        <div class="title text-left">
          <div class="left-icon">&nbsp;</div>
          <div>园区设备</div>
        </div>
        <div class="warming-item-container">
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onEntranceDeviceWarming', warmingNums.entranceDeviceNum)">
            <div class="red-dot" v-html="warmingNums.entranceDeviceNum" v-if="warmingNums.entranceDeviceNum>0 && warmingNums.entranceDeviceNum<100"></div>
            <div class="red-dot" v-if="warmingNums.entranceDeviceNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/11_entrance_device.png" v-show="'onEntranceDeviceWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/11_entrance_device.png" v-show="'onEntranceDeviceWarming' === this.warnmingName">
          </div>
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onSidewalkDeviceWarming', warmingNums.sidewalkDeviceNum)">
            <div class="red-dot" v-html="warmingNums.sidewalkDeviceNum" v-if="warmingNums.sidewalkDeviceNum>0 && warmingNums.sidewalkDeviceNum<100"></div>
            <div class="red-dot" v-if="warmingNums.sidewalkDeviceNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/12_sidewalk_device.png" v-show="'onSidewalkDeviceWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/12_sidewalk_device.png" v-show="'onSidewalkDeviceWarming' === this.warnmingName">
          </div>
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onPatrolDeviceWarming', warmingNums.patrolDeviceNum)">
            <div class="red-dot" v-html="warmingNums.patrolDeviceNum" v-if="warmingNums.patrolDeviceNum>0 && warmingNums.patrolDeviceNum<100"></div>
            <div class="red-dot" v-if="warmingNums.patrolDeviceNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/13_patrol_device.png" v-show="'onPatrolDeviceWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/13_patrol_device.png" v-show="'onPatrolDeviceWarming' === this.warnmingName">
          </div>
        </div>

        <div class="title text-left">
          <div class="left-icon">&nbsp;</div>
          <div>停车场</div>
        </div>
        <div class="warming-item-container">
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onParkingOccupiedWarming', warmingNums.parkingOccupiedNum)">
            <div class="red-dot" v-html="warmingNums.parkingOccupiedNum" v-if="warmingNums.parkingOccupiedNum>0 && warmingNums.parkingOccupiedNum<100"></div>
            <div class="red-dot" v-if="warmingNums.parkingOccupiedNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/21_parking_occupied.png" v-show="'onParkingOccupiedWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/21_parking_occupied.png" v-show="'onParkingOccupiedWarming' === this.warnmingName">
          </div>
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onCarExceptionWarming', warmingNums.carExceptionNum)">
            <div class="red-dot" v-html="warmingNums.carExceptionNum" v-if="warmingNums.carExceptionNum>0 && warmingNums.carExceptionNum<100"></div>
            <div class="red-dot" v-if="warmingNums.carExceptionNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/22_car_exception.png" v-show="'onCarExceptionWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/22_car_exception.png" v-show="'onCarExceptionWarming' === this.warnmingName">
          </div>
          <!--
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onParkingLockWarming', warmingNums.parkingLockNum)">
            <div class="red-dot" v-html="warmingNums.parkingLockNum" v-if="warmingNums.parkingLockNum>0 && warmingNums.parkingLockNum<100"></div>
            <div class="red-dot" v-if="warmingNums.parkingLockNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/23_parking_lock.png" v-show="'onParkingLockWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/23_parking_lock.png" v-show="'onParkingLockWarming' === this.warnmingName">
          </div>
          -->
        </div>

        <div class="title text-left">
          <div class="left-icon">&nbsp;</div>
          <div>人员管理</div>
        </div>
        <div class="warming-item-container">
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onSecurityGuardWarming', warmingNums.securityGuardNum)">
            <div class="red-dot" v-html="warmingNums.securityGuardNum" v-if="warmingNums.securityGuardNum>0 && warmingNums.securityGuardNum<100"></div>
            <div class="red-dot" v-if="warmingNums.securityGuardNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/31_security_guard.png" v-show="'onSecurityGuardWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/31_security_guard.png" v-show="'onSecurityGuardWarming' === this.warnmingName">
          </div>
          <!--
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onCleanerWarming', warmingNums.cleanerNum)">
            <div class="red-dot" v-html="warmingNums.cleanerNum" v-if="warmingNums.cleanerNum>0 && warmingNums.cleanerNum<100"></div>
            <div class="red-dot" v-if="warmingNums.cleanerNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/32_cleaner.png" v-show="'onCleanerWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/32_cleaner.png" v-show="'onCleanerWarming' === this.warnmingName">
          </div>
          -->
          <!--
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onPersonnelOffserviceWarning', warmingNums.personnelOffserviceNum)">
            <div class="red-dot" v-html="warmingNums.personnelOffserviceNum" v-if="warmingNums.personnelOffserviceNum>0 && warmingNums.personnelOffserviceNum<100"></div>
            <div class="red-dot" v-if="warmingNums.personnelOffserviceNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/33_personnel_offservice.png" v-show="'onPersonnelOffserviceWarning' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/33_personnel_offservice.png" v-show="'onPersonnelOffserviceWarning' === this.warnmingName">
          </div>
          -->
        </div>

        <div class="title text-left">
          <div class="left-icon">&nbsp;</div>
          <div>社区求助</div>
        </div>
        <div class="warming-item-container">
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onCellGateCallWarming')">
            <div class="red-dot" v-html="warmingNums.cellGateCallNum" v-if="warmingNums.cellGateCallNum>0 && warmingNums.cellGateCallNum<100"></div>
            <div class="red-dot" v-if="warmingNums.cellGateCallNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/41_cell_gate_call.png" v-show="'onCellGateCallWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/41_cell_gate_call.png" v-show="'onCellGateCallWarming' === this.warnmingName">
          </div>
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onOwnerCallWarming')">
            <div class="red-dot" v-html="warmingNums.ownerCallNum" v-if="warmingNums.ownerCallNum>0 && warmingNums.ownerCallNum<100"></div>
            <div class="red-dot" v-if="warmingNums.ownerCallNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/42_owner_call.png" v-show="'onOwnerCallWarming' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/42_owner_call.png" v-show="'onOwnerCallWarming' === this.warnmingName">
          </div>
          <div class="grid-content-sidebar" @click="onWarmingItemClick('onBrakeCallWarning')">
            <div class="red-dot" v-html="warmingNums.brakeCallNum" v-if="warmingNums.brakeCallNum>0 && warmingNums.brakeCallNum<100"></div>
            <div class="red-dot" v-if="warmingNums.brakeCallNum>99">99+</div>
            <img src="../assets/images/sidebar/normal/43_brake_call.png" v-show="'onBrakeCallWarning' !== this.warnmingName">
            <img src="../assets/images/sidebar/active/43_brake_call.png" v-show="'onBrakeCallWarning' === this.warnmingName">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParkDialog from '@/globalcomponents/warn_dialog/src/ParkWarnDialog'
import store from '@/stores/index'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      warnmingName: undefined
    }
  },
  name: 'SideBar',
  mounted () { },
  components: { ParkDialog },
  computed: mapState({
    warmingNums: state => state.mutations.warmingNums
  }),
  methods: {
    onWarmingItemClick (warnmingName, count) {
      // Fix defect [EGSCDT-1881] 无论是否有预警均开放点击事件
      console.log('onWarmingItemClick : ' + warnmingName)
      if (((typeof count) === 'undefined') || count >= 0) {
        this.warnmingName = warnmingName
        this.$root.Bus.$emit(warnmingName)
      }
    }
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
body {
  padding: 0;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5a6b78;
  height: 100%;
}
.warming-item-container {
  margin-top: 18px;
  margin-bottom: 2px;
  margin-left: 5px;
  display: flex;
}
.el-aside,
#sidebar {
  /*background-color: white;*/
  /*color: #333;*/
  /*text-align: center;*/
  width: 518px !important;
}
#sidebar {
  /*width: 518px !important;*/
  font-size: 0.9em;
  background-color: #f5f9fb;
  height: 100%;
  /*border-bottom: 1px solid #dedede;*/
  border-right: 1px solid #dedede;
  border-left: 1px solid #d4d8dc;
  width: 518px;
  overflow-y: auto;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  cursor: pointer;
}
.grid-content-sidebar {
  cursor: pointer;
  width: 102px;
  height: 102px;
  padding-bottom: 0px;
  margin-right: 16px;
  position: relative;
}
.grid-content-sidebar img {
  width: 102px;
  height: 102px;
}
.grid-content-empty {
  cursor: default;
  background-color: white;
}

.text-left {
  text-align: left;
}

#collapseOff,
#collapseOn {
  margin-left: 30px;
  width: 60px;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  z-index: 10;
  font-size: 0.7em;
  cursor: pointer;
  color: #666;
  border-radius: 2px;
  background-color: #f2f2f2;
}

#alert {
  height: 28px;
  line-height: 28px;
  /*font-size: 1.1em;*/
  border-bottom: 1px solid #c7d1d9;
  padding-bottom: 21px;
  margin-left: 22px;
  margin-right: 22px;
  color: #5a6b78;
  /*font-weight: bold;*/
  padding-top: 21px;
  /*font-family:PingFangSC-Medium;*/
  font-size: 20px;
}
.title {
  margin-top: 20px;
  margin-left: 5px;
  /*margin-bottom: -8px;*/
  height: 22px;
  line-height: 22px;
  color: #5a6b78;
  /*font-weight: bold;*/
  /*font-family:PingFangSC-Medium;*/
  font-size: 16px;
  display: flex;
  align-items: center;

  .left-icon {
    width: 4px;
    height: 14px;
    background-color: #49a2de;
    margin-right: 6px;
    margin-left: -4px;
  }
}
.red-dot {
  min-width: 32px;
  height: 32px;
  line-height: 32px;
  /*background-color: red;*/
  border-radius: 100%;
  margin-top: -10px;
  margin-left: 80px;
  position: absolute;
  font-size: 18px;
  color: #ffffff;
  z-index: 100;
  background: #f15a4a;
  box-shadow: 1px 2px 4px 0 rgba(241, 90, 74, 0.3);
}
#grid {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
