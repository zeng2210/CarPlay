import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import monitor from './modules/monitor'
import common from './modules/common'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mutations,
    monitor,
    common
  },
  actions
})
