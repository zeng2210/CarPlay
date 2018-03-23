/**
 * 用于监听页面resize 更新主容器高度
 */
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('common')
export default {
  mounted () {
    this.onResize()
  },
  methods: {
    ...mapMutations(['UPDATE_MAIN_HEIGHT']),
    onResize () {
      window.onresize = () => {
        this.updateHeight()
      }
    },
    updateHeight () {
      this.$nextTick(() => {
        this.UPDATE_MAIN_HEIGHT(this.$refs.mainContain.clientHeight)
      })
    }
  }
}
