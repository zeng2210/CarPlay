import ParkDialog from './src/ParkWarnDialog'

/* istanbul ignore next */
ParkDialog.install = function (Vue) {
  Vue.component(ParkDialog.name, ParkDialog)
}

export default ParkDialog
