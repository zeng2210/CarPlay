import * as types from './mutation-types'
import getters from './getters'

const state = {
  headerStatus: true,
  windowHeight: window.innerHeight,
  /* 未处理的预警事件数量 */
  warmingNums: {
    gardenPerimeterNum: 0, // 园区周界
    lakePerimeterNum: 0, // 人工湖周界
    gardenActionNum: 0, // 园区行为
    channelOccupiedNum: 0, // 通道占用
    entranceDeviceNum: 0, // 门禁
    sidewalkDeviceNum: 0, // 人行道闸
    patrolDeviceNum: 0, // 巡更设备
    parkingOccupiedNum: 0, // 车位占用
    carExceptionNum: 0, // 车辆异常
    parkingLockNum: 0, // 地锁异常
    securityGuardNum: 0, // 保安异常
    cleanerNum: 0, // 保洁异常
    cellGateCallNum: 0, // 单元门呼叫
    ownerCallNum: 0, // 业主呼叫
    personnelOffserviceNum: 0, // 人员脱岗
    brakeCallNum: 0, // 车闸呼叫
    arrearsWarnNum: 0, // 车位欠费
    // carExceptionWarnNum: 0, // 车辆长时间停放
    // occupiedWarnNum: 0, // 车位占用
    parkTimeEndWarnNum: 0 // 车位超时

  },
  /* websocket 推送的消息数据 */
  websocketMessage: {},
  /* 是否显示顶部返回按钮 */
  showReturnBtn: false,
  /* 顶部返回按钮的自定义点击事件 */
  returnFunc: null,
  /* 可视对讲单元门呼叫弹窗未处理呼叫数量 */
  allCellGateCallNum: 0,
  /* 可视对讲业主呼叫弹窗未处理呼叫数量 */
  allOwnerCallNum: 0,
  /* 可视对讲业主正在呼叫的数量 */
  onOwnerCallNum: 0,
  /* 可视对讲单元门正在呼叫的数量 */
  onCellGateCallNum: 0
}

const mutations = {
  [types.SHOW_HEADER] (state) {
    state.headerStatus = true
  },
  [types.HIDE_HEADER] (state) {
    state.headerStatus = false
  },
  [types.UPDATE_WARMING_NUM] (state, params) {
    if (params && params.length > 1) {
      state.warmingNums[params[0]] = params[1]
    }
  },
  [types.SHOW_RETURN_BTN] (state, isShow) {
    state.showReturnBtn = isShow
  },
  [types.SET_RETURN_FUNC] (state, func) {
    state.returnFunc = func
  },
  [types.UPDATE_ALL_CALL_NUM] (state, params) {
    if (params && params.length > 1) {
      if (params[0] === 'allCellGateCallNum') {
        state.allCellGateCallNum = params[1]
      } else if (params[0] === 'allOwnerCallNum') {
        state.allOwnerCallNum = params[1]
      }
    }
  },
  [types.UPDATE_ON_CALL_NUM] (state, params) {
    if (params && params.length > 1) {
      if (params[0] === 'onCellGateCallNum') {
        state.onCellGateCallNum = params[1]
      } else if (params[0] === 'onOwnerCallNum') {
        state.onOwnerCallNum = params[1]
      }
    }
  }
}

export default {
  state,
  mutations,
  getters
}
