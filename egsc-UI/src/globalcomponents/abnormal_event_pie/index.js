import AbnormalEventPie from './src/index'
/* istanbul ignore next */
AbnormalEventPie.install = function (Vue) {
  Vue.component(AbnormalEventPie.name, AbnormalEventPie)
}
export default AbnormalEventPie
