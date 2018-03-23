import WarningDialog from './src/WarningDialog'

/* istanbul ignore next */
WarningDialog.install = function (Vue) {
  Vue.component(WarningDialog.name, WarningDialog)
}
export default WarningDialog
