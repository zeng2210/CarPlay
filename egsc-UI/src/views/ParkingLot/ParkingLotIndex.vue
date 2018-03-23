<template>
  <el-container class='park-control'>
    <!-- 左边区域 -->
    <el-aside width="1420px" class="data-area" style='position:relative'>
      <!-- <div style='background:#757575;width:55px;height:55px'><i class="el-icon-arrow-left"></i></div> -->
      <img class='back' src="./assets/images/back.png" @click="back(indexOption)" v-show="backVisible">
      <!-- 引入地图 -->
      <div id="map" class='mapClass'>
      </div>
      <!-- 车辆信息弹窗 -->
      <div id="carInfo" v-show="carInfoVisible" data="carInfoData" class='carInfoClass'>
      <!-- <div id="carInfo" data="carInfoData" class='carInfoClass'> -->
        <el-container class='containerClass'>
          <el-aside style="width:150px;float:left;padding-top:21px;padding-left:15px;">
            <img :src='car_picImg'>
            <img :src='monitorImg' @click="handleCarVideo" class="carVideo">
            <!-- <img src="carInfoData.carPic" alt="没有图片"> -->
          </el-aside>
          <el-main class='mainClass'>
            <div><i class="el-icon-close" style='position:absolute;top:0px;right:0px;' @click="closePopup"></i></div>
            <div><span class='carKeyFont'>车牌</span> <span class='carTitleFont'>{{carInfoData.carNo}}</span></div>
            <div><span class='carKeyFont'>车位</span> <span class='carTitleFont'>{{carInfoData.parkSeatCode}}</span> <span class='carKeyFont'>{{carInfoData.parkSeatType}}</span></div>
            <div><img :src='personImg' class='img'> <span class='carDetailFont'>{{carInfoData.ownerName}}</span></div>
            <div><img :src='phoneImg' class='img'> <span class='carDetailFont'>{{carInfoData.phone}}</span></div>
            <div><img :src='inImg' class='img'> <span class='carDetailFont'>入场{{carInfoData.entryTime}}</span></div>
            <div><img :src='moneyImg' class='img'> <span class='carDetailFont'>{{formatMoney(carInfoData.payMoney)}}元/{{formatCharge(carInfoData.chargeType)}}</span></div>
          </el-main>
        </el-container>
      </div>
    </el-aside>
    <!-- 右边区域 -->
    <span class='lineClass' id='line'></span>
    <el-main>
      <el-container class='rightClass'>
        <el-header>
          <el-row class='selectClass'>
            <!-- 停车场联动下拉 -->
            <el-col :span="24">
              <!-- style='border-style: none none none none;' -->
              <el-select v-model="value" placeholder="请选择停车场" v-on:change="getDistinct($event)" style="width: 200px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="selectFloor" placeholder="请选择楼层" v-on:change="getfloor($event)" style="width: 200px">
                <el-option v-for="item in floors" :key="item.value" :label="item.label" :value="item.orgId + ',' + item.value">
                </el-option>  
              </el-select>  
            </el-col>
          </el-row>
          <hr class="hr"/>
        </el-header>
        <div style='margin-top:-20px;'>
          <el-row>
            <el-col :span="24">
              <div class="font">{{areaName}}预警信息</div>
            </el-col>
          </el-row>
          <el-row class="margin-top">
            <el-col :span="6">
              <center @click="onWarmingButtonClick('onArrearsWarnDialog')">
                <!-- <div class="red-dot" v-html="warmingNums.arrearsWarnNum" v-if="warmingNums.arrearsWarnNum>0"></div> -->
                <img src="./assets/images/w2.png" class="img1"/>
                <div class='typeClass'>车位欠费</div>
              </center>
            </el-col>
            <el-col :span="6">
              <center @click="onWarmingButtonClick('onParkTimeEndWarming')">
                <!-- <div class="red-dot" v-html="warmingNums.parkTimeEndWarnNum" v-if="warmingNums.parkTimeEndWarnNum>0"></div> -->
                <img src="./assets/images/w4.png" class="img1"/>
                <div class='typeClass'>车位即将到期</div>
              </center>
            </el-col>            
           <el-col :span="6">
              <center @click="onWarmingButtonClick('onParkingOccupiedWarming')">
                 <div class="red-dot" v-html="warmingNums.occupiedWarnNum" v-if="warmingNums.occupiedWarnNum>0"></div> 
                <img src="./assets/images/w1.png" class="img1"/>
                <div class='typeClass'>车位占用</div>
              </center>
            </el-col>
            <el-col :span="6">
              <center @click="onWarmingButtonClick('onCarExceptionWarming')">
                <!-- <div class="red-dot" v-html="warmingNums.carExceptionWarnNum" v-if="warmingNums.carExceptionWarnNum>0"></div> -->
                <img src="./assets/images/w3.png" class="img1"/>
                <div class='typeClass'>临停车长时停放</div>
              </center>
            </el-col>
          </el-row>
          <el-row class="margin-top" >
            <el-col :span="8">
              <div class="font">{{areaName}}车位信息</div>
            </el-col>
            <el-col :span="16">
              <div class='partSeatClass'><span style="width:110px;display:inline-block;">车位总数&nbsp;&nbsp;{{carportInfoData.totalCarport}}</span>
                <span style="width:149px;display:inline-block;">空余临停车位&nbsp;&nbsp;{{carportInfoData.spareTotal}}</span></div>
            </el-col>
          </el-row>
          <hr class="hr" style='margin-top:16px;'/>
        </div>
        <div style='margin-top:24px;'>
          <el-row>
            <el-col :span="12">
              <div class='margin-left'><img src="./assets/images/car_.png" class="img"/><span class='span'>车辆总数</span><span class='span'>{{carportInfoData.totalCar}}</span></div>
            </el-col>
          </el-row>
          <el-row class="margin-top">
            <el-col :span="12">
              <div class='margin-left'><img src="./assets/images/1.png" class="img"/><span class='span'>固定车位</span><span class='span'>{{carportInfoData.fixPlace}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class='margin-left'><img src="./assets/images/2.png" class="img"/><span class='span'>月保车位</span><span class='span'>{{carportInfoData.mounthlyPlace}}</span></div>
            </el-col>
          </el-row>
          <el-row class="margin-top">
            <el-col :span="12">
              <div class='margin-left'><img src="./assets/images/3.png" class="img"/><span class='span'>临停车位</span><span class='span'>{{carportInfoData.templatePlace}}</span></div>
            </el-col>
            <el-col :span="12">
              <div class='margin-left'><img src="./assets/images/4.png" class="img"/><span class='span'>不可用车位</span><span class='span'>{{carportInfoData.disablePlace}}</span></div>
            </el-col>
          </el-row>
          <!--模拟推送消息 -->
          <!-- <el-row class="margin-top">
            <el-button class='margin-left' type="primary" round @click="mockSendMsg()">模拟推送</el-button>
          </el-row> -->
        </div>
      </el-container>
    </el-main>
    <ParkinglotDialog :parkinglotData="parkinglotData" :open.sync="isParkinglotDialogVisible" v-if="isParkinglotDialogVisible" @dismissOuter="rightResresh"></ParkinglotDialog>
    <!-- 监控对话框 -->
    <MonitorDialog :warningData="monitorDialogData" :monitorVisible.sync="isMonitorDialogVisible" @dismissRefresh="refreshInnerMap"></MonitorDialog>
    <!-- 摄像头弹窗 -->
    <video-dialog :previewData="previewData" :open.sync="previewVisible" @close="handleVideoClose"></video-dialog>
  </el-container>
</template>
<script>
  import { getParkinglot, getParkinglotFloor, getParkinglotArea, queryCarInfo,
  getParkinglotOccupied, getParkinglotCarException, getParkArrearsWarn, getParkTimeEndWarn} from './apis/index'
  import ParkinglotDialog from '@/globalcomponents/parkinglot_dialog/src/ParkinglotDialog.vue'
  import MonitorDialog from '@/globalcomponents/parkinglot_dialog/src/MonitorDialog.vue'
  import carPicImg from '@/views/ParkingLot/assets/images/car_pic.png'
  import monitorImg from '@/views/ParkingLot/assets/images/monitor.png'
  import personImg from '@/views/ParkingLot/assets/images/person.png'
  import phoneImg from '@/views/ParkingLot/assets/images/phone.png'
  import inImg from '@/views/ParkingLot/assets/images/in.png'
  import moneyImg from '@/views/ParkingLot/assets/images/money.png'
  import carImg from '@/views/ParkingLot/assets/images/car.png'
  import cameraImg from '@/views/ParkingLot/assets/images/ico_local_camera.png'
  import w1Img from '@/views/ParkingLot/assets/images/w1.png'
  import w2Img from '@/views/ParkingLot/assets/images/w2.png'
  import w3Img from '@/views/ParkingLot/assets/images/w3.png'
  import w4Img from '@/views/ParkingLot/assets/images/w4.png'
  import triangleImg from '@/views/ParkingLot/assets/images/u484.png'
  import redImg from '@/views/ParkingLot/assets/images/u659.png'
  // import { loadWebsocket, sendMessage } from '@/websocket/index'
  // import { getWebSocketUrl } from '@/assets/js/index'
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'ParkingLot',
    components: {
      ParkinglotDialog,
      MonitorDialog
    },
    //  页面加载方法
    mounted() {
      // setInterval(this.queryAreaList, 2000)
      this.isIE()
      this.getParkinglot()
      // this.initData()
       // 启动 websocket
      // let webSocketUrl = getWebSocketUrl()
      // console.log('websocket prefix: ' + webSocketUrl)
      // loadWebsocket(
      //   webSocketUrl + '/sockjs/readData',
      //   this.onWebsocketMessageReceived
      // )
    },
    computed: mapState({
      websocketMessage () {
        return this.$store.getters.getWebsocketMessage
      },
      warmingNums: state => state.mutations.warmingNums
    }),
    data() {
      return {
        car_picImg: carPicImg,
        monitorImg: monitorImg,
        personImg: personImg,
        phoneImg: phoneImg,
        inImg: inImg,
        moneyImg: moneyImg,
        carImg: carImg,
        cameraImg: cameraImg,
        w1Img: w1Img,
        w2Img: w2Img,
        w3Img: w3Img,
        w4Img: w4Img,
        triangleImg: triangleImg,
        redImg: redImg,
        options: [],              //  第一个下拉option
        value: '',                //  第一个下拉选中的值
        floors: [],               //  第二个下拉
        selectFloor: '',          //  第二个下拉选中的值
        listDialogVisible: false, //  列表对话框是否显示
        sels: [],                 //  列表对话框选中的行数据
        mapObj: null,             //  地图对象
        carInfoData: {},          //  点击左边地图对应坐标显示车辆数据
        carportInfoData: {        //  右边车位信息
          totalCarport: '',
          spareTotal: '',
          totalCar: '',
          fixPlace: '',
          mounthlyPlace: '',
          templatePlace: '',
          disablePlace: ''
        },
        carInfoVisible: false,    //  车辆对话框是否显示
        parkingSelectData: null,  //  车场下拉数据
        backVisible: false,       //  返回键是否显示
        markerList: [],           //  点位数组
        indexOption: {},          //  上次打开的首页
        carInfoFlag: false,       //  弹出carInfo必须在初始化首页地图前执行一次this.mapObj.addPopup('carInfo')
        indexData: {},            //  地图首页数据
        innerData: {},            //  地图内页数据
        parkinglotData: {}, // 右侧预警信息弹框数据
        monitorDialogData: {}, // 地图预警弹框数据
        isParkinglotDialogVisible: false, // 显示右侧预警弹框
        isMonitorDialogVisible: false, // 显示地图弹框
        parkOrgId: '',   // 车场组织ID
        parkAreaId: '',   // 车场片区id
        isOnMap: false, // 是否打开地图标志
        parkPortCountInfo: {},  // 车位统计信息对象
        allAlarmInfo: {},   // 预警信息统计对象
        previewVisible: false, // 显示摄像头
        previewData: {}, // 摄像头数据
        areaName: '',
        // 首页地图区域鼠标放入样式
        indexStyleList: [{
          fillColor: 'rgba(192,218,251, 0.5)',    //  填充色 选填
          strokeColor: '#3E88E2',  //  边框色 选填
          strokeWidth: 4        //  边框宽度 选填
        }, {
          fillColor: 'rgba(217,239,203, 0.5)',    //  填充色 选填
          strokeColor: '#82CA5A', //  边框色 选填
          strokeWidth: 4       //  边框宽度 选填
        }, {
          fillColor: 'rgba(253,241,181, 0.5)',    //  填充色 选填
          strokeColor: '#FCCE18',  //  边框色 选填
          strokeWidth: 4        //  边框宽度 选填
        }, {
          fillColor: 'rgba(252,203,188, 0.5)', //  填充色 选填
          strokeColor: '#F8591B', //  边框色 选填
          strokeWidth: 4          //  边框宽度 选填
        }],
        innerStyleList: [{
          fillColor: 'rgba(229,205,248, 0.5)',    //  填充色 选填
          strokeColor: '#BB74F4',  //  边框色 选填
          strokeWidth: 2,       //  边框宽度 选填
          lineDash: [0, 0]      //  边框是否实线
        }, {
          fillColor: 'rgba(241,218,212, 0.5)',    //  填充色 选填
          strokeColor: '#E8B1A6',  //  边框色 选填
          strokeWidth: 2,       //  边框宽度 选填
          lineDash: [0, 0]      //  边框是否实线
        }, {
          fillColor: 'rgba(220,238,217, 0.5)',    //  填充色 选填
          strokeColor: '#A8D8A0',  //  边框色 选填
          strokeWidth: 2,       //  边框宽度 选填
          lineDash: [0, 0]      //  边框是否实线
        }, {
          fillColor: 'rgba(227,227,227, 0.5)',    //  填充色灰色
          strokeColor: '#B4B4B4',  //  边框色 选填
          strokeWidth: 2,       //  边框宽度 选填
          lineDash: [0, 0]      //  边框是否实线
        }]
      }
    },
    methods: {
      ...mapActions(['updateWarmingNum']),
      // onWebsocketMessageReceived (data) {
      //   try {
      //     let subData = JSON.parse(data).data
      //     this.$store.state.mutations.websocketMessage = subData
      //     this.processWebsocketData(subData)
      //   } catch (e) {
      //     console.warn(e)
      //   }
      // },
      // processWebsocketData (data) {
      //   console.log('停车场页面接收websocket消息：')
      //   console.log(data)
      //   if (data.type >= 0 && data.type <= 19999) {
      //     // var countInfo = JSON.parse(data.info)
      //     // {"deviceId":"","extAttributes":{},"info":"{\"mapId\":\"100\",\"carportCode\":\"CW002\",\"carNum\":\"粤B-8S5WE\",\"alarmType\":2,\"latestId\":\"null\"}","time":"2018-02-08 10:14:04","type":"00002"}
      //     console.log('判断组织还是地图：' + this.isOnMap)
      //     if (this.isOnMap) {
      //       this.getParkinglotArea(this.parkAreaId) // 刷新地图及右侧信息
      //     } else {
      //       this.getParkinglotFloor() // 刷新楼层主图及右侧信息
      //     }
      //   }
      // },
      /* 模拟服务器推送消息 */
      // mockSendMsg () {
      //   sendMessage()
      // },
      // 统计片区预警数量
      initAlarmEventCount() {
        var alarmInfo = this.allAlarmInfo
        if (alarmInfo) {
          this.updateWarmingNum(['arrearsWarnNum', alarmInfo.countExpired])
          this.updateWarmingNum(['carExceptionNum', alarmInfo.countLongTime])
          this.updateWarmingNum(['parkingOccupiedNum', alarmInfo.countOccupy])
          this.updateWarmingNum(['parkTimeEndWarnNum', alarmInfo.countExpiring])
        }
      },
      // 统计片区车位总数
      initParkLotCount() {
        var parkInfo = this.parkPortCountInfo
        if (parkInfo) {
          this.carportInfoData.fixPlace = parkInfo.fixedParkSeatCount
          this.carportInfoData.mounthlyPlace = parkInfo.monthParkSeatCount
          this.carportInfoData.templatePlace = parkInfo.tempParkSeatCount
          this.carportInfoData.disablePlace = parkInfo.unavailableParkSeatCount
          this.carportInfoData.totalCarport = parkInfo.totalParkSeatCount
          this.carportInfoData.totalCar = parkInfo.totalCarCount
          this.carportInfoData.spareTotal = parkInfo.idleTempParkSeatCount
        }
      },
      noMessageTip() {
        this.$message({
          message: '暂无数据',
          type: 'warning',
          center: true
        })
      },
      onWarmingButtonClick(warnmingName) {
        console.log(this.warmingNums)
        let openFlag = true
        if (this.parkOrgId) {
          if (warnmingName === 'onArrearsWarnDialog') {
            // if (this.warmingNums.arrearsWarnNum > 0) {
            this.parkinglotData.type = 'parkingArrears'
            this.parkinglotData.dialogTitle = '车位欠费预警'
            // } else {
            //   openFlag = false
            //   this.noMessageTip()
            // }
          } else if (warnmingName === 'onParkingOccupiedWarming') {
            // if (this.warmingNums.parkingOccupiedNum > 0) {
            this.parkinglotData.type = 'parkinglotoccupied'
            this.parkinglotData.dialogTitle = '固定车位被占预警'
            // } else {
            //   openFlag = false
            //   this.noMessageTip()
            // }
          } else if (warnmingName === 'onCarExceptionWarming') {
            // if (this.warmingNums.carExceptionNum > 0) {
            this.parkinglotData.type = 'carexception'
            this.parkinglotData.dialogTitle = '车辆异常（长时停放）'
            // } else {
            //   openFlag = false
            //   this.noMessageTip()
            // }
          } else if (warnmingName === 'onParkTimeEndWarming') {
            // if (this.warmingNums.parkTimeEndWarnNum > 0) {
            this.parkinglotData.type = 'parkTimeEnd'
            this.parkinglotData.dialogTitle = '车位即将到期'
            // } else {
            //   openFlag = false
            //   this.noMessageTip()
            // }
          }
          if (openFlag) {
            this.parkinglotData.parkId = this.parkOrgId
            this.parkinglotData.areaId = this.parkAreaId
            this.parkinglotData.isOnMap = this.isOnMap
            this.isParkinglotDialogVisible = true
          }
        } else {
          this.$message({
            message: '停车场为空，请稍后重试~',
            type: 'warning',
            center: true
          })
        }
      },
      // 关闭地图车辆信息弹窗
      closePopup() {
        this.carInfoVisible = false
        this.mapObj.closePopup()
      },
      //  初始化数据
      // initData() {
      //   let _this = this
      //   queryStyleData().then(
      //     function(result) {
      //       _this.indexStyleList = result.indexStyleList
      //       _this.innerStyleList = result.innerStyleList
      //     }
      //   )
      // },
      // 初始化地图信息
      initMapData(mapData) {
        let id
        let mapUrl
        if (typeof (mapData.parkingFloorSceneMap) !== 'undefined' && mapData.parkingFloorSceneMap !== null) {
          id = mapData.parkingFloorSceneMap.sceneId
          mapUrl = mapData.parkingFloorSceneMap.sceneImageUrl
        } else if (typeof (mapData.floorAreaSceneMap) !== 'undefined' && mapData.floorAreaSceneMap !== null) {
          id = mapData.floorAreaSceneMap.sceneId
          mapUrl = mapData.floorAreaSceneMap.sceneImageUrl
        }
        let option = {
          id: id,
          gisEngine: 'bitmap',
          sizeW: 1920,
          sizeH: 1080,
          domId: 'map',
          mapUrl: mapUrl,
          maxZoom: 2.38,
          minZoom: 2.38,
          controlZoom: false,
          dragPan: false
        }
        return option
      },
      //  查询车场下拉数据
      getParkinglot() {
        let _this = this
        getParkinglot().then(
          function(result) {
            if (result.code === '0' && result.data.floors !== undefined) {
              _this.parkingSelectData = result.data
              _this.options = _this.parkingSelectData.parkinglots
              _this.value = _this.parkingSelectData.parkinglots[0].value
              _this.getDistinct(_this.value)
              // _this.getParkinglotFloor()
            } else {
              _this.$message({
                message: '查询停车场信息异常，请稍后重试~',
                type: 'warning',
                center: true
              })
            }
          }
        )
      },
      //  查询车场首页数据
      getParkinglotFloor() {
        let _this = this
        getParkinglotFloor(_this.parkOrgId).then(
          function(result) {
            if (result.code === '0' && result.data !== null) {
              _this.indexData = result.data
              _this.indexOption = _this.initMapData(_this.indexData)
              _this.allAlarmInfo = result.data.allAlarm
              _this.parkPortCountInfo = result.data.totalParkSeat
              _this.initAlarmEventCount()
              _this.initParkLotCount()
              if (!_this.carInfoFlag) {
                _this.initDiv()
              }
              if (typeof (_this.indexOption.id) !== 'undefined' && typeof (_this.indexOption.mapUrl) !== 'undefined') {
                _this.initIndexMap(_this.indexOption)
              }
            } else {
              _this.$message({
                message: '查询楼层信息异常，请稍后重试~',
                type: 'warning',
                center: true
              })
            }
          }
        )
      },
      //  查询车场内页数据
      getParkinglotArea(sceneId) {
        let _this = this
        _this.isOnMap = true
        getParkinglotArea(sceneId).then(
          function(result) {
            if (result.code === '0' && result.data !== null) {
              _this.innerData = result.data
              _this.initInnerMap(_this.innerData)
              _this.allAlarmInfo = result.data.allAlarm
              _this.parkPortCountInfo = result.data.totalParkSeat
              _this.areaName = result.data.floorAreaSceneMap.sceneName
              _this.initParkLotCount()
              _this.initAlarmEventCount()
            } else {
              _this.$message({
                message: '查询区域信息异常，请稍后重试~',
                type: 'warning',
                center: true
              })
            }
          }
        )
      },
      //  二级联动选择楼层车场
      getDistinct: function(value) {
        this.backVisible = false
        let tempfloor = []
        this.floors = []
        let allfloor = this.parkingSelectData.floors
        this.selectFloor = ''
        for (let val of allfloor) {
          if (value === val.value) {
            tempfloor.push({label: val.label, value: val.label, orgId: val.orgId})
          }
        }
        this.floors = tempfloor
        console.log('第一个下拉选中值为：' + value + ',第二个下拉值：' + tempfloor)
        if (typeof (this.floors) !== 'undefined' && this.floors.length > 0) {
          this.selectFloor = this.floors[0].value
          this.parkOrgId = this.floors[0].orgId
          console.log('第二个下拉选中值：' + this.selectFloor + ',当前的组织ID是：' + this.parkOrgId)
          this.getfloor(this.selectFloor)
        }
        // 统计预警信息
        // this.queryAlarmEventCount()
        // 统计车位信息
        // this.queryParkLotCount()
      },
      //  第二个下拉改变事件
      getfloor: function(floor) {
        if (floor.indexOf(',') > -1) {
          this.parkOrgId = floor.split(',')[0]
          floor = floor.split(',')[1]
        }
        // 加载不同地图
        // if (typeof (this.indexOption.mapUrl) !== 'undefined') {
          // alert(this.parkOrgId)
        this.getParkinglotFloor()
        // }
      },
      // 初始化地图弹出的div信息
      initDiv() {
        this.carInfoFlag = true
        if (this.mapObj) {
          // this.mapObj.removeLayers()
          this.mapObj.clearMap()
          this.mapObj.getMap().setTarget(null)
        }
        let option = {
          id: 1,
          gisEngine: 'bitmap',
          sizeW: 1920,
          sizeH: 1080,
          domId: 'map',
          mapUrl: 'src/assets/images/map.png',
          maxZoom: 2.38,
          minZoom: 2.38,
          controlZoom: false,
          dragPan: false
        }
        // eslint-disable-next-line
        this.mapObj = new hdmap.initMap(option)
        this.mapObj.getMap().setTarget('map')
        // this.mapObj.addPopup('carInfo')
        this.mapObj.addPopup({ domId: 'carInfo', visible: true, arrow: true })
      },
      back(mapOption) {
        // this.initIndexMap(mapOption)
        this.getParkinglotFloor()
      },
      // 初始化首页地图
      initIndexMap(mapOption) {
        this.isOnMap = false
        this.indexOption = mapOption
        this.backVisible = false
        this.areaName = ''
        if (this.mapObj) {
          // this.mapObj.removeLayers()
          this.mapObj.clearMap()
          this.mapObj.saveOutterPopup(['carInfo'])
          this.mapObj.getMap().setTarget(null)
        }
        // eslint-disable-next-line
        this.mapObj = new hdmap.initMap(mapOption)
        this.mapObj.getMap().setTarget('map')
        let areaInfo = this.indexData.parkingFloorSceneMap.areaInfoVos
        if (areaInfo !== null && areaInfo.length > 0) {
          for (let i = 0; i < areaInfo.length; i++) {
            this.mapObj.addArea(
              {
                id: areaInfo[i].areaId,
                name: areaInfo[i].areaName,
                areaType: areaInfo[i].areaType,
                borderPoints: areaInfo[i].borderPoints,
                linkSceneId: areaInfo[i].linkSceneId
                // visible: true
              }
            )
            if (areaInfo[i].alarmCount > 0) {
              this.mapObj.addCountMarker(
                {
                  id: areaInfo[i].areaId + 'warn',
                  name: areaInfo[i].areaId,
                  markerType: 'countWarning',
                  linkSceneId: areaInfo[i].linkSceneId,
                  position: hdmap.utils.getAreaCenter(areaInfo[i].borderPoints[0]),
                  url: this.triangleImg,
                  baseUrl: this.redImg,
                  warnNum: areaInfo[i].alarmCount + ''
                }
              )
            }
          }
        }
        let that = this
        // 鼠标移动事件
        this.mapObj.regEventListener('pointermove', function(respones) {
          if (respones.feature) {
            let tempIndex = 0
            for (let y = 0; y < areaInfo.length; y++) {
              if (typeof (areaInfo[y].areaId) !== 'undefined' && areaInfo[y].areaId === respones.feature.id_) {
                tempIndex = y
                break
              }
            }
            if (typeof (that.indexStyleList[tempIndex]) !== 'undefined' && that.indexStyleList[tempIndex] !== null) {
              respones.feature.setStyle(hdmap.commonConfig.getMouseOverAreaStyle(that.indexStyleList[tempIndex]))
            }
          }
        })
        // 鼠标单击事件
        this.mapObj.regEventListener('singleclick', function(respones) {
          if (respones.feature) {
            that.mapObj.getMap().setTarget(null)
            that.backVisible = true
            that.parkAreaId = respones.feature.linkSceneId
            console.log(that.parkAreaId)
            that.getParkinglotArea(that.parkAreaId)
          } else {
            // 关闭弹窗
            that.mapObj.closePopup()
          }
        })
      },
      // 初始化内页地图信息
      initInnerMap(option) {
        // this.carInfoFlag = true
        try {
          if (this.mapObj) {
            // this.mapObj.removeLayers()
            this.mapObj.clearMap()
            this.mapObj.saveOutterPopup(['carInfo'])
            this.mapObj.getMap().setTarget(null)
          }
          let innerOption = this.initMapData(option)
          // eslint-disable-next-line
          this.mapObj = new hdmap.initMap(innerOption)
          this.mapObj.getMap().setTarget('map')
          // this.mapObj.addPopup('carInfo')
          // if (!this.innerCarInfoFlag) {
          this.mapObj.addPopup({ domId: 'carInfo', visible: true, arrow: true })
          // }
          let childAreaList = option.floorAreaSceneMap.areaInfoVos
          if (childAreaList !== null) {
            for (let i = 0; i < childAreaList.length; i++) {
              // 地图描绘车位区域
              this.mapObj.addArea(
                {
                  id: childAreaList[i].areaId,
                  name: childAreaList[i].areaId,
                  areaType: childAreaList[i].areaType,
                  visible: true,
                  borderPoints: childAreaList[i].borderPoints
                },
                this.innerStyleList[childAreaList[i].parkSeatType]
              )
              // console.log(childAreaList[i].borderPoints)
              if (childAreaList[i].carNum !== null) {
                // 车位区域上放入车辆
                this.mapObj.addMarker(
                  {
                    id: childAreaList[i].carNum,
                    markerType: 'car',
                    position: childAreaList[i].centerPoint,
                    name: childAreaList[i].areaName,
                    imgUrl: this.carImg
                    // parkSeatType: childAreaList[i].parkSeatType   // 查询车辆信息时增加车位类型参数
                  },
                  {
                    // 图标的弧度 传入的角度要变成弧度
                    rotation: childAreaList[i].angle * Math.PI / 180,
                    // 图片缩放比例
                    scale: 0.7
                  }
                )
              }
            }
          }
          let cameraList = option.floorAreaSceneMap.deviceMarkerVos
          if (cameraList !== null) {
            //  地图上放入摄像头
            for (let c = 0; c < cameraList.length; c++) {
              this.mapObj.addMarker(
                {
                  id: cameraList[c].deviceId,
                  markerType: 'camera',
                  position: cameraList[c].point,
                  name: cameraList[c].markerId,
                  imgUrl: this.cameraImg
                },
                {
                  // 图标的弧度
                  rotation: 0,
                  // 图片缩放比例
                  scale: 1
                }
              )
            }
          }
          // 延迟描绘警告图标
          setInterval(this.writeAlarm(childAreaList), 100)
          let that = this
          //  地图点击事件
          this.mapObj.regEventListener('singleclick', function(respones) {
            if (respones.feature) {
              // 车牌号取respones.feature.id
              if (respones.feature.markerType === 'car') {
                // 查询车辆信息时增加车位类型参数
                queryCarInfo(respones.feature.id, respones.feature.name).then(result => {
                  // if (result.code === '0') {
                  that.carInfoData = result.data
                  // }
                })
                // var tempDiv = document.getElementById('carInfo')
                // if (tempDiv.style.height === 0 || tempDiv.style.height === '') {
                //   tempDiv.style.height = '177px' // 设置高度
                // }
                // if (document.getElementById('carInfo-wrapper') !== 'undefined') {
                //   document.getElementById('carInfo-wrapper').setAttribute('class', '')
                // }
                // that.mapObj.showPopup('carInfo', [-200, 200])
                // let tempPoint = respones.feature.position
                // let top = 90
                // let left
                // if (tempPoint[0] > 720) {
                //   left = -240
                //   top = 90
                //   if (tempPoint[1] > 400) {
                //     top = 120
                //   }
                //   if (tempPoint[1] < -400) {
                //     top = -240
                //   }
                // } else if (tempPoint[0] < -700) {
                //   left = 50
                //   top = 0
                //   if (tempPoint[1] > 400) {
                //     top = 120
                //   }
                //   if (tempPoint[1] < -400) {
                //     top = -240
                //   }
                // } else {
                //   left = -200
                //   if (tempPoint[1] < -300) {
                //     top = -240
                //   } else if (tempPoint[1] > 150) {
                //     top = 240
                //   }
                // }
                that.carInfoVisible = true
                // that.mapObj.showPopup('carInfo', respones.feature.position, { top: -50, left: -750 })
                that.mapObj.showPopup('carInfo', [-200, 150])
              // 警告id取respones.feature.id 警告类型取respones.feature.name
              } else if (respones.feature.markerType === 'warn') {
                if (respones.feature.name === '1') {
                  that.monitorDialogData.titleName = '车位占用预警'
                  that.monitorDialogData.type = 'parkinglotoccupied'
                  getParkinglotOccupied(respones.feature.id).then(result => {
                    that.monitorDialogData.data = result.data
                    that.isMonitorDialogVisible = true
                  })
                } else if (respones.feature.name === '2') {
                  that.monitorDialogData.titleName = '车位欠费预警'
                  that.monitorDialogData.type = 'parkingArrears'
                  getParkArrearsWarn(respones.feature.id).then(result => {
                    that.monitorDialogData.data = result.data
                    that.isMonitorDialogVisible = true
                  })
                } else if (respones.feature.name === '3') {
                  that.monitorDialogData.titleName = '临停车长时停放预警'
                  that.monitorDialogData.type = 'carexception'
                  getParkinglotCarException(respones.feature.id).then(result => {
                    that.monitorDialogData.data = result.data
                    that.isMonitorDialogVisible = true
                  })
                } else if (respones.feature.name === '4') {
                  that.monitorDialogData.titleName = '车位即将到期预警'
                  that.monitorDialogData.type = 'parkTimeEnd'
                  getParkTimeEndWarn(respones.feature.id).then(result => {
                    that.monitorDialogData.data = result.data
                    that.isMonitorDialogVisible = true
                  })
                }
              // 设备ID取respones.feature.id
              } else if (respones.feature.markerType === 'camera') {
                console.log('当前摄像头id：', that.carInfoData.equipId)
                if (respones.feature.id === null || respones.feature.id === '' || respones.feature.id === 'undefined') {
                  that.$message({
                    message: '未发现相关摄像头设备',
                    type: 'warning'
                  })
                } else {
                  that.previewData = { deviceId: respones.feature.id }
                  that.previewVisible = true
                }
              }
            } else {
              // 关闭弹窗
              that.carInfoVisible = false
              that.mapObj.closePopup()
            }
          })
        } catch (e) {
          console.log(e)
        }
      },
      // 解除预警成功后刷新区域地图
      refreshInnerMap () {
        // this.getParkinglotArea(this.parkAreaId)
      },
      // 刷新整个地图
      refreshAllMap () {
        // this.getParkinglotFloor()
      },
      // 右侧区域解除预警刷新
      rightResresh () {
        if (this.areaName === null || this.areaName === '' || this.areaName === undefined) {
          this.refreshAllMap()
        } else {
          this.refreshInnerMap()
        }
      },
      // 关闭摄像头弹窗
      handleVideoClose () {
        this.previewVisible = false
      },
      // 点击车辆信息图片查看监控信息
      handleCarVideo () {
        let that = this
        console.log('当前摄像头id：', that.carInfoData.equipId)
        if (that.carInfoData.equipId === null || that.carInfoData.equipId === '' || that.carInfoData.equipId === undefined) {
          that.$message({
            message: '未发现相关摄像头设备',
            type: 'warning'
          })
        } else {
          that.previewData = {deviceId: that.carInfoData.equipId}
          that.previewVisible = true
        }
      },
      //  改变选中列表的checkbox
      changeButton(sels) {
        this.sels = sels
      },
      // 判断是否是IE浏览器
      isIE() {
        if (!!window.ActiveXObject || 'ActiveXObject' in window) {
          document.getElementById('line').setAttribute('class', 'ieLineClass')
          // document.getElementsByTagName('el-select').addClass('size', '15')
        } else {
          document.getElementById('line').setAttribute('class', 'lineClass')
        }
      },
      writeAlarm(childAreaList) {
        let tempAlarmType
        let warnImg
        if (childAreaList !== null) {
          for (let m = 0; m < childAreaList.length; m++) {
            if (childAreaList[m].alarmId !== '' && childAreaList[m].alarmId !== null) {
              tempAlarmType = childAreaList[m].alarmType
              if (tempAlarmType === 1) {
                warnImg = this.w1Img
              }
              if (tempAlarmType === 2) {
                warnImg = this.w2Img
              }
              if (tempAlarmType === 3) {
                warnImg = this.w3Img
              }
              if (tempAlarmType === 4) {
                warnImg = this.w4Img
              }
              if (warnImg !== undefined && warnImg !== null && warnImg !== '') {
                this.mapObj.addMarker(
                  {
                    id: childAreaList[m].alarmId,
                    markerType: 'warn',
                    position: childAreaList[m].centerPoint,
                    name: tempAlarmType + '',
                    imgUrl: warnImg
                  },
                  {
                    // 图标的弧度
                    rotation: 0,
                    // 图片缩放比例
                    scale: 1
                  }
                )
              }
            }
          }
        }
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
        } else if (val === 'ONCE') {
          return '次'
        }
      }
    },
    watch: {
      websocketMessage (data) {
        if (data.type >= 0 && data.type <= 19999) {
          console.log('停车场页面接收websocket消息：' + JSON.stringify(data))
          // var countInfo = JSON.parse(data.info)
          // {"deviceId":"","extAttributes":{},"info":"{\"mapId\":\"100\",\"carportCode\":\"CW002\",\"carNum\":\"粤B-8S5WE\",\"alarmType\":2,\"latestId\":\"null\"}","time":"2018-02-08 10:14:04","type":"00002"}
          console.log('判断组织还是地图：' + this.isOnMap)
          if (this.isOnMap) {
            this.getParkinglotArea(this.parkAreaId) // 刷新地图及右侧信息
          } else {
            this.getParkinglotFloor() // 刷新楼层主图及右侧信息
          }
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .red-dot {
    background-image: url(./assets/images/u3243.png);
    background-size: 22px 22px;
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    margin-top: -4px;
    padding-top: 5px;
    margin-left: 70px;
    position: absolute;
    color: white;
    font-size: 0.7em;
    z-index: 100;
  }
  .park-control {
    margin: 0;
    padding: 0;
    height: 737px;
  }
  .data-area {
    /* height: 687px!important; */
    align-content: center;
  }
  .right-area {
    height: 687px!important;
    padding: 0;
  }
  .rightClass {
    position:absolute;
    width:530px;right:0px;
  }
  .margin-top {
    position: relative;;
    margin-top: 35px;
  }
  .hr{
    position:absolute;
    right: 0px;
    width: 510px;
    height:1px;
    border:none;
    border-top:1px solid #ddd;
  }
  .font{
    color: #aaa;margin-left:30px; font-size:14px;width:250px;
  }
  .img{
    vertical-align:middle;
  }
  .img1{
    text-align: center;
  }
  .testclass {
    width: 450px;
    height:150px;
    padding: 10px;
    background: white;
    color: black;
    border-radius: 10px;
    text-align: left;
  }
  .carKeyFont{
    color: #aaa;
    font-size: 11px;;
  }
  .carTitleFont{
    font-size: 14px;
  }
  .carDetailFont{
    font-size:12px;
  }
  .carInfoClass{
    width: 380px;
    background:white;
    /* border-style:solid;
    border-width:1px;
    border-color:#E4E4E4; */
    border: 1px solid #E4E4E4;
    cursor: pointer;
  }
  .containerClass{
    position:relative;
    width: 380px;
  }
  .carVideo{
    position:absolute;
    top:22px;
    left:126px;
    background-color:#FFFFFF
  }
  .mainClass{
    width: 170px;
    float: left;
    position: relative;
    text-align: left;
    line-height: 22px;
  }
  .back{
    position:absolute;
    left: 10px;
    top: 10px;
    z-index:999;
    opacity: 0.95;
  }
  .mapClass{
    width:1420px;
    z-index:99;
    height:796px;
  }
  .lineClass{
    width:0;
    height:803px;
    position:absolute;
    right:510px;
    border-left:1px solid #E4E4E4;
  }
  .ieLineClass{
    width:0;
    height:814px;
    position:absolute;
    right:510px;
    border-left:1px solid #E4E4E4;
  }
  .selectClass{
    margin-top:-12px;
    margin-left:10px;
  }
  .margin-left{
    margin-left:35px;
  }
  .span{
    margin-left:18px;
    color:#22A9FF;
  }
  .typeClass{
    font-size:14px;
    color:#666666;
  }
  .partSeatClass{
    position:absolute;
    right: 0;
    font-size:15px;
  }
</style>
