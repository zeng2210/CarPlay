<template>
  <img :src='imageData' @error="handleImgOnErr"/>
</template>
<script>
import image404 from '@/views/AccessControlApp/assets/images/photo-default.png'
// import {imageUrl} from '@/views/AccessControlApp/apis'

export default {
  data() {
    return {
      imageData: image404
    }
  },
  props: ['imageId'],
  methods: {
    handleImgOnErr () {
      this.imageData = image404
    }
  },
  watch: {
    imageId: function (newImageId, oldImageId) {
      console.log(newImageId)
      let that = this
      if (!newImageId || newImageId.indexOf('404_') === 0) {
        that.imageData = image404
      } else {
        // imageUrl({
        //   imageId: newImageId
        // }).then(result => {
        //   if (result) {
        //     that.imageData = 'data:image/png;base64,' + result
        //   } else {
        //     that.imageData = image404
        //   }
        // }).catch(function(error) {
        //   that.imageData = image404
        //   console.log(error)
        // })
        this.imageData = newImageId
      }
    }
  }
}
</script>
<style scoped lang="less">
</style>