import * as types from '../mutation-types'
export default {
  namespaced: true,
  state: {
    asideLoading: false
  },
  mutations: {
    [types.UPDATE_ASIDE_LOADING] (state, bool) {
      state.asideLoading = bool
    }
  }
}
