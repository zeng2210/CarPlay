import SecurityDialog from './src/SecurityCard'

/* istanbul ignore next */
SecurityDialog.install = function (Vue) {
  Vue.component(SecurityDialog.name, SecurityDialog)
}
export default SecurityDialog
