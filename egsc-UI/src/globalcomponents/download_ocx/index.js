import DownloadOcx from './src/DownloadOcx'

/* istanbul ignore next */
DownloadOcx.install = function (Vue) {
  Vue.component(DownloadOcx.name, DownloadOcx)
}
export default DownloadOcx
