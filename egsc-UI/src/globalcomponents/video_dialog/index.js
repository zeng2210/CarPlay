import VideoDialog from './src/index'

/* istanbul ignore next */
VideoDialog.install = function (Vue) {
  Vue.component(VideoDialog.name, VideoDialog)
}
export default VideoDialog
