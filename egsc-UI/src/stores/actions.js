import * as types from './mutation-types'

export default {
  showHeader: ({ commit }) => {
    commit(types.SHOW_HEADER)
  },
  hideHeader: ({ commit }) => {
    commit(types.HIDE_HEADER)
  },

  setWindowHeight ({ commit }, windowHeight) {
    commit('SET_WINDOWHEIGHT', windowHeight)
  },
  updateWarmingNum ({ commit }, params) {
    commit(types.UPDATE_WARMING_NUM, params)
  },
  /**
   * 设置是否显示顶部返回按钮
   * @param isShow  true-显示，false-不显示
   */
  setShowReturnBtn ({ commit }, isShow) {
    commit(types.SHOW_RETURN_BTN, isShow)
  },
  /**
   * 设置顶部返回按钮的点击事件
   * @param func  null-默认的返回行为
   */
  setReturnFunc ({ commit }, func) {
    commit(types.SET_RETURN_FUNC, func)
  },
  /**
   * 显示顶部返回按钮
   * @param func 传入回调参数表示自定义，不传回调即直接用路由
   */
  showReturn ({ commit }, func) {
    commit(types.SHOW_RETURN_BTN, true)
    console.log('func: ' + (typeof func))
    if (typeof func === 'undefined' || func === null) {
      commit(types.SET_RETURN_FUNC, null)
    } else {
      commit(types.SET_RETURN_FUNC, func)
    }
  },
  /**
   * 隐藏顶部返回按钮
   */
  hideReturn ({ commit }) {
    commit(types.SHOW_RETURN_BTN, false)
    commit(types.SET_RETURN_FUNC, null)
  },
  /* 修改单元门或者业主呼叫弹窗未处理数量 */
  updateAllCallNum ({ commit }, params) {
    commit(types.UPDATE_ALL_CALL_NUM, params)
  },
  /* 修改单元门、业主正在呼叫的数量 */
  updateOnCallNum ({ commit }, params) {
    commit(types.UPDATE_ON_CALL_NUM, params)
  }
}
