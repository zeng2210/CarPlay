import PersonDialog from './src/PersonWarnDialog'

/* istanbul ignore next */
PersonDialog.install = function (Vue) {
  Vue.component(PersonDialog.name, PersonDialog)
}

export default PersonDialog
