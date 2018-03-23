import BroadcastDialog from './src/index'

// istanbul ignore next
BroadcastDialog.install = function(Vue) {
  Vue.component(BroadcastDialog.name, BroadcastDialog)
}
export default BroadcastDialog
