import * as types from '../types/common.js'
export default {
  namespaced: true,
  state: {
    mainContainHeight: 780
  },
  mutations: {
    [types.UPDATE_MAIN_HEIGHT] (state, val) {
      state.mainContainHeight = val
    }
  }
}
