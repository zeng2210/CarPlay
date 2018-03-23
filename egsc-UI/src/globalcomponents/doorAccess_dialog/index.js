import AccessDialog from './src/AccessWarnDialog'

/* istanbul ignore next */
AccessDialog.install = function (Vue) {
  Vue.component(AccessDialog.name, AccessDialog)
}

export default AccessDialog
